"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { BookingRequest } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Loader2, RefreshCw } from "lucide-react";

interface BookingRow extends BookingRequest {
  supplier_name: string;
  supplier_slug: string;
  deal_value: number | null;
  commission_amount: number | null;
  commission_status: "not_applicable" | "pending_invoice" | "invoiced" | "paid";
  admin_notes: string;
}

const STATUS_OPTIONS = ["pending", "quoted", "confirmed", "declined"] as const;
const COMMISSION_OPTIONS = ["not_applicable", "pending_invoice", "invoiced", "paid"] as const;

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function loadBookings() {
    setLoading(true);
    const { data } = await supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setBookings((data as BookingRow[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function updateBooking(id: string, updates: Partial<BookingRow>) {
    setSavingId(id);
    const payload = { ...updates };
    if (updates.status === "confirmed") {
      payload.confirmed_at = new Date().toISOString();
    }
    await supabase.from("booking_requests").update(payload).eq("id", id);
    await loadBookings();
    setSavingId(null);
  }

  async function handleDealValueChange(id: string, value: string) {
    const dealValue = parseFloat(value);
    if (isNaN(dealValue)) return;
    const commission = Math.round(dealValue * 0.15 * 100) / 100;
    await updateBooking(id, {
      deal_value: dealValue,
      commission_amount: commission,
      commission_status: "pending_invoice",
    });
  }

  async function sendInvoice(id: string) {
    setSavingId(id);
    await fetch("/api/admin/send-invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_id: id }),
    });
    await loadBookings();
    setSavingId(null);
  }

  const totalCommission = bookings
    .filter((b) => b.commission_status === "paid")
    .reduce((sum, b) => sum + (b.commission_amount || 0), 0);

  const pendingCommission = bookings
    .filter((b) => b.commission_status === "pending_invoice" || b.commission_status === "invoiced")
    .reduce((sum, b) => sum + (b.commission_amount || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Booking Requests
          </h1>
          <p className="text-muted mt-1">{bookings.length} total requests</p>
        </div>
        <button
          onClick={loadBookings}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-card-hover transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-2xl border border-border p-5">
          <p className="text-sm text-muted">Total Bookings</p>
          <p className="text-2xl font-bold text-foreground mt-1">{bookings.length}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-5">
          <p className="text-sm text-muted">Commission Pending</p>
          <p className="text-2xl font-bold text-foreground mt-1">{formatPrice(pendingCommission)}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-5">
          <p className="text-sm text-muted">Commission Collected</p>
          <p className="text-2xl font-bold text-accent mt-1">{formatPrice(totalCommission)}</p>
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <p className="font-mono text-xs text-muted">{booking.reference}</p>
                <h3 className="font-semibold text-foreground mt-1">
                  {booking.supplier_name}
                </h3>
                <p className="text-sm text-muted mt-0.5">
                  {booking.contact_name} · {booking.contact_email} · {booking.contact_phone}
                </p>
              </div>
              <div className="text-right text-sm text-muted">
                <p>{booking.event_type} · {booking.guest_count} guests</p>
                <p>{booking.event_date} · {booking.venue_location}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-4 border-t border-border">
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">
                  Status
                </label>
                <select
                  value={booking.status}
                  onChange={(e) => updateBooking(booking.id, { status: e.target.value as BookingRow["status"] })}
                  disabled={savingId === booking.id}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">
                  Deal Value (R)
                </label>
                <input
                  type="number"
                  defaultValue={booking.deal_value || ""}
                  onBlur={(e) => e.target.value && handleDealValueChange(booking.id, e.target.value)}
                  placeholder="e.g. 25000"
                  disabled={savingId === booking.id}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">
                  Commission (15%)
                </label>
                <p className="px-3 py-2 text-sm font-medium text-foreground">
                  {booking.commission_amount ? formatPrice(booking.commission_amount) : "—"}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">
                  Commission Status
                </label>
                <select
                  value={booking.commission_status}
                  onChange={(e) => updateBooking(booking.id, { commission_status: e.target.value as BookingRow["commission_status"] })}
                  disabled={savingId === booking.id}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  {COMMISSION_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s.replace("_", " ")}</option>
                  ))}
                </select>
              </div>
            </div>

            {booking.commission_status === "pending_invoice" && booking.commission_amount && (
              <button
                onClick={() => sendInvoice(booking.id)}
                disabled={savingId === booking.id}
                className="mt-3 text-sm text-accent hover:text-accent-dark transition-colors font-medium"
              >
                Send Commission Invoice →
              </button>
            )}

            {booking.notes && (
              <p className="mt-3 text-sm text-muted bg-card-hover rounded-lg p-3">
                {booking.notes}
              </p>
            )}
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-20 text-muted">
            No booking requests yet.
          </div>
        )}
      </div>
    </div>
  );
}
