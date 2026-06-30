alter table booking_requests
  add column deal_value numeric,
  add column commission_amount numeric,
  add column commission_status text default 'not_applicable' check (commission_status in ('not_applicable', 'pending_invoice', 'invoiced', 'paid')),
  add column admin_notes text default '',
  add column confirmed_at timestamptz;

create policy "Anyone can update bookings"
  on booking_requests for update
  to public
  using (true)
  with check (true);
