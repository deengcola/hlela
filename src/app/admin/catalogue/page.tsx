"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { suppliers } from "@/data/suppliers";
import { Loader2, Plus, Trash2, RefreshCw } from "lucide-react";

interface CatalogueItem {
  id: string;
  supplier_slug: string;
  title: string;
  description: string | null;
  price: number | null;
  unit: string;
  category: string | null;
  image_url: string | null;
  available: boolean;
  sort_order: number;
}

const BLANK_ITEM = {
  supplier_slug: "",
  title: "",
  description: "",
  price: "",
  unit: "per item",
  category: "",
  image_url: "",
};

export default function AdminCataloguePage() {
  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(BLANK_ITEM);
  const [filterSlug, setFilterSlug] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadItems() {
    setLoading(true);
    const query = supabase.from("catalogue_items").select("*").order("supplier_slug").order("sort_order");
    const { data } = filterSlug ? await query.eq("supplier_slug", filterSlug) : await query;
    setItems((data as CatalogueItem[]) || []);
    setLoading(false);
  }

  useEffect(() => { loadItems(); }, [filterSlug]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.supplier_slug || !form.title) {
      setError("Supplier and title are required.");
      return;
    }
    setSaving(true);
    const { error: dbError } = await supabase.from("catalogue_items").insert({
      supplier_slug: form.supplier_slug,
      title: form.title,
      description: form.description || null,
      price: form.price ? parseFloat(form.price) : null,
      unit: form.unit || "per item",
      category: form.category || null,
      image_url: form.image_url || null,
      available: true,
      sort_order: items.filter((i) => i.supplier_slug === form.supplier_slug).length,
    });
    setSaving(false);
    if (dbError) {
      setError("Failed to save item. Try again.");
    } else {
      setSuccess(`"${form.title}" added to ${form.supplier_slug}.`);
      setForm({ ...BLANK_ITEM, supplier_slug: form.supplier_slug });
      loadItems();
    }
  }

  async function toggleAvailable(item: CatalogueItem) {
    await supabase.from("catalogue_items").update({ available: !item.available }).eq("id", item.id);
    loadItems();
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this item?")) return;
    await supabase.from("catalogue_items").delete().eq("id", id);
    loadItems();
  }

  async function activateSupplier(slug: string, active: boolean) {
    await supabase.from("suppliers").update({ subscription_active: active }).eq("slug", slug);
    setSuccess(active ? `${slug} catalogue unlocked.` : `${slug} catalogue locked.`);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Supplier Catalogues</h1>
          <p className="text-muted text-sm mt-1">Manage catalogue items for subscribed suppliers</p>
        </div>
        <button onClick={loadItems} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm hover:bg-card transition-colors cursor-pointer">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Subscription control */}
      <div className="bg-card rounded-2xl border border-border p-6 mb-8">
        <p className="text-sm font-semibold text-foreground mb-4">Supplier Subscription Status</p>
        <p className="text-xs text-muted mb-4">Toggle to unlock/lock a supplier's full catalogue profile. Only activate for paying subscribers.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {suppliers.slice(0, 12).map((s) => (
            <div key={s.slug} className="flex items-center justify-between p-3 rounded-xl border border-border bg-background">
              <span className="text-sm text-foreground truncate mr-2">{s.name}</span>
              <button
                onClick={() => activateSupplier(s.slug, !s.subscription_active)}
                className={`shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  s.subscription_active
                    ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700"
                    : "bg-gray-100 text-gray-500 hover:bg-accent/10 hover:text-accent"
                }`}
              >
                {s.subscription_active ? "Active" : "Inactive"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Add Item Form */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border border-border p-6 sticky top-6">
            <h2 className="text-base font-semibold text-foreground mb-5">Add Catalogue Item</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Supplier *</label>
                <select
                  required
                  value={form.supplier_slug}
                  onChange={(e) => setForm({ ...form, supplier_slug: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                >
                  <option value="">Select supplier...</option>
                  {suppliers.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Item Title *</label>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Tiffany Chair"
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Furniture"
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Price (R)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="45"
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Unit</label>
                  <select
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  >
                    <option>per item</option>
                    <option>per day</option>
                    <option>per event</option>
                    <option>per metre</option>
                    <option>per table</option>
                    <option>per set</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Image URL</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short description..."
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
                />
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              {success && <p className="text-green-600 text-xs">{success}</p>}
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                Add Item
              </button>
            </form>
          </div>
        </div>

        {/* Items List */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 mb-4">
            <select
              value={filterSlug}
              onChange={(e) => setFilterSlug(e.target.value)}
              className="px-3 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="">All suppliers</option>
              {suppliers.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
            <span className="text-sm text-muted">{items.length} items</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-accent" size={24} />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 text-muted text-sm">No catalogue items yet. Add the first one.</div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-card rounded-xl border border-border px-4 py-3">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted">{item.supplier_slug} · {item.category || "Uncategorised"} · {item.price ? `R${item.price} ${item.unit}` : "No price"}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleAvailable(item)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                        item.available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.available ? "Live" : "Hidden"}
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-1.5 rounded-lg text-muted hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
