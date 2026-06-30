import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendSupplierApplicationNotification } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("supplier_applications")
    .insert({
      company_name: body.company_name,
      contact_name: body.contact_name,
      contact_email: body.contact_email,
      contact_phone: body.contact_phone,
      website: body.website || "",
      area: body.area,
      categories: body.categories || [],
      years_in_business: body.years_in_business || 0,
      description: body.description,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    await sendSupplierApplicationNotification({
      company_name: body.company_name,
      contact_name: body.contact_name,
      contact_email: body.contact_email,
      contact_phone: body.contact_phone,
      website: body.website || "",
      area: body.area,
      categories: body.categories || [],
      years_in_business: body.years_in_business || 0,
      description: body.description,
    });
  } catch (err) {
    console.error("Email notification failed:", err);
  }

  return NextResponse.json({ id: data.id });
}
