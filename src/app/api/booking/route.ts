import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateReference } from "@/lib/utils";
import { sendBookingNotification } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();

  const reference = generateReference();

  const { data, error } = await supabase
    .from("booking_requests")
    .insert({
      supplier_slug: body.supplier_slug,
      supplier_name: body.supplier_name,
      reference,
      contact_name: body.contact_name,
      contact_email: body.contact_email,
      contact_phone: body.contact_phone,
      event_date: body.event_date,
      event_type: body.event_type,
      guest_count: body.guest_count,
      venue_location: body.venue_location,
      equipment_needed: body.equipment_needed || [],
      notes: body.notes || "",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    await sendBookingNotification({
      reference,
      supplier_name: body.supplier_name,
      supplier_slug: body.supplier_slug,
      contact_name: body.contact_name,
      contact_email: body.contact_email,
      contact_phone: body.contact_phone,
      event_date: body.event_date,
      event_type: body.event_type,
      guest_count: body.guest_count,
      venue_location: body.venue_location,
      equipment_needed: body.equipment_needed || [],
      notes: body.notes || "",
    });
  } catch {
    // Email failure shouldn't block the booking
  }

  return NextResponse.json({ reference, id: data.id });
}
