"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

interface EventBrief {
  id: string;
  reference: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  company: string | null;
  event_type: string;
  event_date: string;
  guest_range: string;
  venue: string;
  budget_range: string | null;
  equipment_needed: string[];
  additional_notes: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

const STATUS_OPTIONS = ["new", "contacted", "quoted", "confirmed", "closed"] as const;

const STATUS_COLOURS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  quoted: "bg-purple-100 text-purple-700",
  confirmed: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

export default function AdminBriefsPage() {
  const [briefs, setBriefs] = useState<EventBrief[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  async function loadBriefs() {
    setLoading(true);
    const { data } = await supabase
      .from("event_briefs")
      .select("*")
      .order("created_at", { ascending: false });
    const rows = (data as EventBrief[]) || [];
    setBriefs(rows);
    const initialNotes: Record<string, string> = {};
    rows.forEach((b) => { initialNotes[b.id] = b.admin_notes || ""; });
    setNotes(initialNotes);
    setLoading(false);
  }

  useEffect(() => { loadBriefs(); }, []);

  async function updateStatus(id: string, status: string) {
    setSavingId(id);
    await supabase.from("event_briefs").update({ status }).eq("id", id);
    await loadBriefs();
    setSavingId(null);
  }

  async function saveNotes(id: string) {
    setSavingId(id);
    await supabase.from("event_briefs").update({ admin_notes: notes[id] }).eq("id", id);
    setSavingId(null);
  }

  const stats = {
    total: briefs.length,
    new: briefs.filter((b) => b.status === "new").length,
    contacted: briefs.filter((b) => b.status === "contacted").length,
    confirmed: briefs.filter((b) => b.status === "confirmed").length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Event Briefs</h1>
          <p className="text-muted text-sm mt-1">All quote requests submitted through Hlela</p>
        </div>
        <button
          onClick={loadBriefs}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm hover:bg-card transition-colors cursor-pointer"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Briefs", value: stats.total },
          { label: "New", value: stats.new, colour: "text-blue-600" },
          { label: "Contacted", value: stats.contacted, colour: "text-yellow-600" },
          { label: "Confirmed", value: stats.confirmed, colour: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-5">
            <p className={`text-3xl font-bold ${s.colour || "text-foreground"}`}>{s.value}</p>
            <p className="text-sm text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent" size={28} />
        </div>
      ) : briefs.length === 0 ? (
        <div className="text-center py-20 text-muted">No briefs submitted yet.</div>
      ) : (
        <div className="space-y-3">
          {briefs.map((brief) => (
            <div key={brief.id} className="bg-card rounded-2xl border border-border overflow-hidden">
              {/* Row header */}
              <div
                className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-background/50 transition-colors"
                onClick={() => setExpanded(expanded === brief.id ? null : brief.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-foreground text-sm">{brief.contact_name}</span>
                    {brief.company && <span className="text-muted text-sm">· {brief.company}</span>}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOURS[brief.status] || "bg-gray-100 text-gray-600"}`}>
                      {brief.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 flex-wrap">
                    <span className="text-xs text-muted">{brief.event_type}</span>
                    <span className="text-xs text-muted">·</span>
                    <span className="text-xs text-muted">{brief.event_date}</span>
                    <span className="text-xs text-muted">·</span>
                    <span className="text-xs text-muted">{brief.guest_range} guests</span>
                    <span className="text-xs text-muted">·</span>
                    <span className="text-xs text-muted">{brief.venue}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted">{new Date(brief.created_at).toLocaleDateString("en-ZA")}</span>
                  {expanded === brief.id ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
                </div>
              </div>

              {/* Expanded detail */}
              {expanded === brief.id && (
                <div className="border-t border-border px-6 py-6 bg-background/30">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Contact</p>
                      <p className="text-sm font-medium text-foreground">{brief.contact_name}</p>
                      <a href={`mailto:${brief.contact_email}`} className="text-sm text-accent block">{brief.contact_email}</a>
                      <a href={`tel:${brief.contact_phone}`} className="text-sm text-accent block">{brief.contact_phone}</a>
                      {brief.company && <p className="text-sm text-muted">{brief.company}</p>}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Event</p>
                      <p className="text-sm text-foreground">{brief.event_type}</p>
                      <p className="text-sm text-muted">{brief.event_date}</p>
                      <p className="text-sm text-muted">{brief.guest_range} guests</p>
                      <p className="text-sm text-muted">{brief.venue}</p>
                      {brief.budget_range && <p className="text-sm text-muted">Budget: {brief.budget_range}</p>}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Equipment Needed</p>
                      <div className="flex flex-wrap gap-1.5">
                        {brief.equipment_needed.map((item) => (
                          <span key={item} className="px-2 py-1 bg-accent/10 text-accent rounded-lg text-xs font-medium">{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {brief.additional_notes && (
                    <div className="mb-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Client Notes</p>
                      <p className="text-sm text-muted bg-card rounded-xl p-3">{brief.additional_notes}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Status update */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Update Status</p>
                      <div className="flex flex-wrap gap-2">
                        {STATUS_OPTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(brief.id, s)}
                            disabled={savingId === brief.id}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                              brief.status === s
                                ? "bg-accent text-white"
                                : "bg-card border border-border text-muted hover:border-accent hover:text-accent"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Admin notes */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Admin Notes</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={notes[brief.id] || ""}
                          onChange={(e) => setNotes({ ...notes, [brief.id]: e.target.value })}
                          placeholder="Internal notes..."
                          className="flex-1 px-3 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                        />
                        <button
                          onClick={() => saveNotes(brief.id)}
                          disabled={savingId === brief.id}
                          className="px-4 py-2 bg-accent text-white rounded-xl text-xs font-medium hover:bg-accent-dark transition-colors cursor-pointer"
                        >
                          {savingId === brief.id ? <Loader2 size={12} className="animate-spin" /> : "Save"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quick action links */}
                  <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                    <a
                      href={`mailto:${brief.contact_email}?subject=Your Hlela Event Brief — ${brief.reference}&body=Hi ${brief.contact_name},%0D%0A%0D%0AThank you for submitting your event brief on Hlela.%0D%0A%0D%0AWe have matched your brief to suppliers and are collecting quotes for your ${brief.event_type} on ${brief.event_date}.%0D%0A%0D%0AYou can expect to hear from us shortly with matched quotes.%0D%0A%0D%0AKind regards,%0D%0AThe Hlela Team`}
                      className="text-xs text-accent hover:text-accent-dark font-medium"
                    >
                      ✉ Email client
                    </a>
                    <a
                      href={`tel:${brief.contact_phone}`}
                      className="text-xs text-accent hover:text-accent-dark font-medium"
                    >
                      📞 Call client
                    </a>
                    <span className="text-xs text-muted">Ref: {brief.reference}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
