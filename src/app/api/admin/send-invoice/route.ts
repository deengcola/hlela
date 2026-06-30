import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendCommissionInvoice } from "@/lib/email";
import { suppliers } from "@/data/suppliers";

export async function POST(request: Request) {
  const body = await request.json();
  const { booking_id } = body;

  const { data: booking, error } = await supabase
    .from("booking_requests")
    .select("*")
    .eq("id", booking_id)
    .single();

  if (error || !booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  if (!booking.deal_value || !booking.commission_amount) {
    return NextResponse.json(
      { error: "Deal value and commission must be set first" },
      { status: 400 }
    );
  }

  const supplier = suppliers.find((s) => s.slug === booking.supplier_slug);
  const supplierEmail = supplier?.email || "info@hlela.co.za";

  try {
    await sendCommissionInvoice({
      reference: booking.reference,
      supplier_name: booking.supplier_name,
      supplier_email: supplierEmail,
      deal_value: booking.deal_value,
      commission_amount: booking.commission_amount,
    });
  } catch (err) {
    console.error("Invoice email failed:", err);
    return NextResponse.json({ error: "Failed to send invoice email" }, { status: 500 });
  }

  await supabase
    .from("booking_requests")
    .update({ commission_status: "invoiced" })
    .eq("id", booking_id);

  return NextResponse.json({ success: true });
}
