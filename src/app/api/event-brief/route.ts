import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEventBriefNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    contact_name,
    contact_email,
    contact_phone,
    company,
    event_type,
    event_date,
    guest_range,
    venue,
    budget_range,
    equipment,
    additional_notes,
  } = body;

  if (!contact_name || !contact_email || !contact_phone || !event_type || !event_date || !guest_range || !venue || !equipment?.length) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const reference = `HLE-BRIEF-${Date.now()}`;

  // Silently create/update planner record
  await supabase.from("planners").upsert(
    { email: contact_email, full_name: contact_name, phone: contact_phone, company: company || null, last_seen_at: new Date().toISOString() },
    { onConflict: "email", ignoreDuplicates: false }
  );

  const { error: dbError } = await supabase.from("event_briefs").insert({
    reference,
    contact_name,
    contact_email,
    contact_phone,
    company: company || null,
    event_type,
    event_date,
    guest_range,
    venue,
    budget_range: budget_range || null,
    equipment_needed: equipment,
    additional_notes: additional_notes || null,
    status: "new",
  });

  if (dbError) {
    console.error("Supabase error:", dbError);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  await sendEventBriefNotification({
    reference,
    contact_name,
    contact_email,
    contact_phone,
    company,
    event_type,
    event_date,
    guest_range,
    venue,
    budget_range,
    equipment,
    additional_notes,
  });

  return NextResponse.json({ success: true, reference });
}
