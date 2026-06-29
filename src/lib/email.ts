import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingNotification {
  reference: string;
  supplier_name: string;
  supplier_slug: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  event_date: string;
  event_type: string;
  guest_count: number;
  venue_location: string;
  equipment_needed: string[];
  notes: string;
}

export async function sendBookingNotification(booking: BookingNotification): Promise<{ data: unknown; error: unknown }> {
  const equipmentList = booking.equipment_needed.length
    ? booking.equipment_needed.join(", ")
    : "Not specified";

  const { data, error } = await resend.emails.send({
    from: "Hlela Bookings <onboarding@resend.dev>",
    to: ["capitalvest@gmail.com", "info@hlela.co.za"],
    subject: `New Booking Request: ${booking.supplier_name} — ${booking.reference}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <div style="background: #0d9488; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New Booking Request</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">Reference: ${booking.reference}</p>
        </div>

        <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; padding: 32px;">
          <h2 style="font-size: 16px; color: #0d9488; margin: 0 0 16px;">Supplier</h2>
          <p style="margin: 0 0 24px; font-size: 18px; font-weight: 600;">${booking.supplier_name}</p>

          <h2 style="font-size: 16px; color: #0d9488; margin: 0 0 16px;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 6px 0; color: #6b7280; width: 120px;">Name</td><td style="padding: 6px 0; font-weight: 500;">${booking.contact_name}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Email</td><td style="padding: 6px 0;"><a href="mailto:${booking.contact_email}" style="color: #0d9488;">${booking.contact_email}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Phone</td><td style="padding: 6px 0;"><a href="tel:${booking.contact_phone}" style="color: #0d9488;">${booking.contact_phone}</a></td></tr>
          </table>

          <h2 style="font-size: 16px; color: #0d9488; margin: 0 0 16px;">Event Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 6px 0; color: #6b7280; width: 120px;">Date</td><td style="padding: 6px 0; font-weight: 500;">${booking.event_date}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Type</td><td style="padding: 6px 0;">${booking.event_type}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Guests</td><td style="padding: 6px 0;">${booking.guest_count}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Venue</td><td style="padding: 6px 0;">${booking.venue_location}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Equipment</td><td style="padding: 6px 0;">${equipmentList}</td></tr>
          </table>

          ${booking.notes ? `
            <h2 style="font-size: 16px; color: #0d9488; margin: 0 0 12px;">Notes</h2>
            <p style="margin: 0; padding: 16px; background: #f9fafb; border-radius: 8px; font-size: 14px; line-height: 1.6;">${booking.notes}</p>
          ` : ""}

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
            <a href="https://www.hlela.co.za/suppliers/${booking.supplier_slug}" style="display: inline-block; padding: 12px 24px; background: #0d9488; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">View Supplier Profile</a>
          </div>
        </div>

        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 24px;">
          Hlela — South Africa's first event hire marketplace<br>
          www.hlela.co.za
        </p>
      </div>
    `,
  });
  return { data, error };
}
