'use client';

import { useState, useMemo } from 'react';
import { useQuery } from 'convex/react';
import { anyApi } from 'convex/server';
import { money, shortDate, Skeleton, EmptyState, Icon, downloadCsv } from './ui';

type Customer = {
  email: string;
  name: string;
  phone?: string;
  city: string;
  country: string;
  orders: number;
  spent: number;
  firstOrder: number;
  lastOrder: number;
};

export default function Customers({ adminKey }: { adminKey: string }) {
  const customers = useQuery(anyApi.admin.listCustomers, { adminKey }) as Customer[] | undefined;
  const [search, setSearch] = useState('');

  const rows = useMemo(() => {
    if (!customers) return [];
    const q = search.trim().toLowerCase();
    return q
      ? customers.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.city.toLowerCase().includes(q)
        )
      : customers;
  }, [customers, search]);

  if (!customers) return <Skeleton rows={6} />;

  const repeat = customers.filter((c) => c.orders > 1).length;
  const totalSpent = customers.reduce((s, c) => s + c.spent, 0);

  return (
    <div className="adm-stack">
      <div className="adm-stats">
        <div className="adm-stat">
          <span className="adm-stat-label">Customers</span>
          <span className="adm-stat-value">{customers.length}</span>
        </div>
        <div className="adm-stat">
          <span className="adm-stat-label">Repeat buyers</span>
          <span className="adm-stat-value">{repeat}</span>
          <span className="adm-stat-sub">
            {customers.length ? `${Math.round((repeat / customers.length) * 100)}% of base` : '—'}
          </span>
        </div>
        <div className="adm-stat">
          <span className="adm-stat-label">Lifetime value</span>
          <span className="adm-stat-value">
            {money(customers.length ? totalSpent / customers.length : 0)}
          </span>
          <span className="adm-stat-sub">average per customer</span>
        </div>
      </div>

      <div className="adm-toolbar">
        <div className="adm-search">
          <span className="adm-search-icon"><Icon.search /></span>
          <label htmlFor="adm-cust-search" className="adm-sr">Search customers</label>
          <input
            id="adm-cust-search"
            className="adm-input"
            placeholder="Name, email or city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="adm-btn adm-btn-ghost"
          disabled={customers.length === 0}
          onClick={() =>
            downloadCsv('jessaura-customers.csv', [
              ['Name', 'Email', 'Phone', 'City', 'Country', 'Orders', 'Total spent', 'First order', 'Last order'],
              ...customers.map((c) => [
                c.name, c.email, c.phone ?? '', c.city, c.country,
                c.orders, c.spent.toFixed(2),
                new Date(c.firstOrder).toISOString().slice(0, 10),
                new Date(c.lastOrder).toISOString().slice(0, 10),
              ]),
            ])
          }
        >
          <Icon.download /> Export CSV
        </button>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title={customers.length === 0 ? 'No customers yet' : 'No customers match'}
          body={
            customers.length === 0
              ? 'Customer records build automatically from placed orders — no separate signup needed.'
              : 'Try a different search term.'
          }
        />
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Location</th>
                <th>Orders</th>
                <th>Total spent</th>
                <th>Last order</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.email}>
                  <td>
                    <span className="adm-name">{c.name}</span>
                    <span className="adm-muted">
                      <a href={`mailto:${c.email}`}>{c.email}</a>
                      {c.phone && ` · ${c.phone}`}
                    </span>
                  </td>
                  <td>{c.city}, {c.country}</td>
                  <td>
                    <span className="adm-num">{c.orders}</span>
                    {c.orders > 1 && <span className="adm-tagline">repeat</span>}
                  </td>
                  <td className="adm-num">{money(c.spent)}</td>
                  <td>{shortDate(c.lastOrder)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
