import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("contact_messages")
    .insert({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    await sendContactNotification({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    });
  } catch (err) {
    console.error("Email notification failed:", err);
  }

  return NextResponse.json({ id: data.id });
}
