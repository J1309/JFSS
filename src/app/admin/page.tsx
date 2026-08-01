'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { useQuery, useConvex } from 'convex/react';
import { anyApi } from 'convex/server';
import type { Product } from '@/data/products';

type ProductDoc = Product & { _id: string; productId: string };

const CONVEX_READY = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null);

  useEffect(() => {
    setAdminKey(sessionStorage.getItem('jessaura-admin-key'));
  }, []);

  if (!CONVEX_READY) {
    return (
      <div className="adm-shell adm-center">
        <div className="adm-panel">
          <h1 className="adm-brand">JessAura Admin</h1>
          <p className="adm-note">
            Backend not connected. Set <code>NEXT_PUBLIC_CONVEX_URL</code> in{' '}
            <code>.env.local</code> (your Convex deployment URL) to use the
            admin panel locally. It works automatically on the deployed site.
          </p>
          <Link href="/" className="adm-btn adm-btn-ghost">Back to store</Link>
        </div>
      </div>
    );
  }

  return adminKey ? (
    <Dashboard
      adminKey={adminKey}
      onLogout={() => {
        sessionStorage.removeItem('jessaura-admin-key');
        setAdminKey(null);
      }}
    />
  ) : (
    <Gate onAuthed={(key) => {
      sessionStorage.setItem('jessaura-admin-key', key);
      setAdminKey(key);
    }} />
  );
}

/* ---------- Passcode gate ---------- */

function Gate({ onAuthed }: { onAuthed: (key: string) => void }) {
  const convex = useConvex();
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await convex.query(anyApi.admin.verifyKey, { adminKey: key });
      onAuthed(key);
    } catch {
      setError('Wrong passcode. Check the ADMIN_KEY set in your Convex dashboard.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-shell adm-center">
      <form className="adm-panel" onSubmit={submit}>
        <img src="/images/JA logo.png" alt="" className="adm-gate-logo" />
        <h1 className="adm-brand">JessAura Admin</h1>
        <label className="adm-label" htmlFor="adm-pass">Admin passcode</label>
        <input
          id="adm-pass"
          type="password"
          className="adm-input"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          autoFocus
        />
        {error && <p className="adm-error" role="alert">{error}</p>}
        <button className="adm-btn adm-btn-primary" disabled={busy || !key}>
          {busy ? 'Checking…' : 'Enter'}
        </button>
      </form>
    </div>
  );
}

/* ---------- Dashboard ---------- */

function Dashboard({ adminKey, onLogout }: { adminKey: string; onLogout: () => void }) {
  const products = useQuery(anyApi.products.list) as ProductDoc[] | undefined;
  const convex = useConvex();
  const [editing, setEditing] = useState<ProductDoc | 'new' | null>(null);
  const [toast, setToast] = useState('');

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  }

  async function toggle(p: ProductDoc, flag: 'featured' | 'new' | 'bestSeller' | 'clearance') {
    await convex.mutation(anyApi.admin.updateProduct, {
      adminKey,
      id: p._id,
      patch: { [flag]: !p[flag] },
    });
  }

  async function remove(p: ProductDoc) {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    await convex.mutation(anyApi.admin.deleteProduct, { adminKey, id: p._id });
    notify(`Deleted ${p.name}`);
  }

  const stats = products
    ? {
        total: products.length,
        featured: products.filter((p) => p.featured).length,
        clearance: products.filter((p) => p.clearance).length,
        avg: products.length
          ? Math.round(products.reduce((s, p) => s + p.price, 0) / products.length)
          : 0,
      }
    : null;

  return (
    <div className="adm-shell">
      <header className="adm-header">
        <div className="adm-header-brand">
          <img src="/images/JA logo.png" alt="" className="adm-header-logo" />
          <div>
            <h1 className="adm-brand">JessAura Admin</h1>
            <span className="adm-sub">Product catalogue</span>
          </div>
        </div>
        <div className="adm-header-actions">
          <Link href="/" className="adm-btn adm-btn-ghost">View store</Link>
          <button className="adm-btn adm-btn-ghost" onClick={onLogout}>Log out</button>
          <button className="adm-btn adm-btn-primary" onClick={() => setEditing('new')}>
            + Add product
          </button>
        </div>
      </header>

      {stats && (
        <div className="adm-stats">
          <Stat label="Products" value={stats.total} />
          <Stat label="Featured" value={stats.featured} />
          <Stat label="On clearance" value={stats.clearance} />
          <Stat label="Avg price" value={`$${stats.avg}`} />
        </div>
      )}

      {!products ? (
        <div className="adm-panel adm-note">Loading catalogue…</div>
      ) : products.length === 0 ? (
        <div className="adm-panel adm-note">
          No products yet. Run the <code>seed:seed</code> function from the Convex
          dashboard to import the starter catalogue, or add products here.
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Flags</th>
                <th className="adm-th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="adm-cell-product">
                      <img src={p.images[0]} alt="" className="adm-thumb" />
                      <div>
                        <span className="adm-name">{p.name}</span>
                        <span className="adm-muted">{p.subcategory} · {p.fabric}</span>
                      </div>
                    </div>
                  </td>
                  <td className="adm-cap">{p.category}</td>
                  <td>
                    <span className="adm-price">${p.price}</span>
                    {p.originalPrice && (
                      <span className="adm-strike">${p.originalPrice}</span>
                    )}
                  </td>
                  <td>{p.rating} <span className="adm-muted">({p.reviews})</span></td>
                  <td>
                    <div className="adm-flags">
                      {(['featured', 'new', 'bestSeller', 'clearance'] as const).map((f) => (
                        <button
                          key={f}
                          className={`adm-chip ${p[f] ? 'on' : ''}`}
                          onClick={() => toggle(p, f)}
                          title={`Toggle ${f}`}
                        >
                          {f === 'bestSeller' ? 'best' : f}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <button className="adm-btn adm-btn-sm" onClick={() => setEditing(p)}>Edit</button>
                      <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => remove(p)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <ProductForm
          adminKey={adminKey}
          product={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={(name) => {
            setEditing(null);
            notify(`Saved ${name}`);
          }}
        />
      )}

      {toast && <div className="adm-toast" aria-live="polite">{toast}</div>}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="adm-stat">
      <span className="adm-stat-value">{value}</span>
      <span className="adm-stat-label">{label}</span>
    </div>
  );
}

/* ---------- Create / edit form ---------- */

function ProductForm({
  adminKey,
  product,
  onClose,
  onSaved,
}: {
  adminKey: string;
  product: ProductDoc | null;
  onClose: () => void;
  onSaved: (name: string) => void;
}) {
  const convex = useConvex();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: product?.name ?? '',
    price: product?.price ?? 0,
    originalPrice: product?.originalPrice ?? 0,
    category: product?.category ?? 'women',
    subcategory: product?.subcategory ?? '',
    type: product?.type ?? 'ready-to-wear',
    fabric: product?.fabric ?? '',
    shortDescription: product?.shortDescription ?? '',
    description: product?.description ?? '',
    sizes: (product?.sizes ?? ['XS', 'S', 'M', 'L', 'XL']).join(', '),
    tags: (product?.tags ?? []).join(', '),
    image: product?.images[0] ?? '/images/hero-casual.png',
    featured: product?.featured ?? false,
    isNew: product?.new ?? true,
    bestSeller: product?.bestSeller ?? false,
    clearance: product?.clearance ?? false,
  });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const shared = {
      name: form.name,
      price: Number(form.price),
      ...(Number(form.originalPrice) > 0 ? { originalPrice: Number(form.originalPrice) } : {}),
      category: form.category as 'men' | 'women',
      subcategory: form.subcategory,
      type: form.type as 'ready-to-wear' | 'semi-stitched',
      fabric: form.fabric,
      shortDescription: form.shortDescription,
      description: form.description,
      sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
      featured: form.featured,
      new: form.isNew,
      bestSeller: form.bestSeller,
      clearance: form.clearance,
    };
    try {
      if (product) {
        await convex.mutation(anyApi.admin.updateProduct, {
          adminKey,
          id: product._id,
          patch: shared,
        });
      } else {
        const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        await convex.mutation(anyApi.admin.createProduct, {
          adminKey,
          product: {
            ...shared,
            slug,
            colors: [{ name: 'Default', hex: '#1E2A4A', image: form.image }],
            images: [form.image],
            rating: 4.5,
            reviews: 0,
          },
        });
      }
      onSaved(form.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed — try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <form className="adm-modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h2 className="adm-modal-title">{product ? `Edit — ${product.name}` : 'New product'}</h2>

        <div className="adm-grid">
          <Field label="Name" required>
            <input className="adm-input" value={form.name} onChange={(e) => set('name', e.target.value)} required />
          </Field>
          <Field label="Fabric">
            <input className="adm-input" value={form.fabric} onChange={(e) => set('fabric', e.target.value)} />
          </Field>
          <Field label="Price ($)" required>
            <input className="adm-input" type="number" min="0" step="1" value={form.price} onChange={(e) => set('price', Number(e.target.value))} required />
          </Field>
          <Field label="Original price ($, 0 = none)">
            <input className="adm-input" type="number" min="0" step="1" value={form.originalPrice} onChange={(e) => set('originalPrice', Number(e.target.value))} />
          </Field>
          <Field label="Category">
            <select className="adm-input" value={form.category} onChange={(e) => set('category', e.target.value as 'men' | 'women')}>
              <option value="women">Women</option>
              <option value="men">Men</option>
            </select>
          </Field>
          <Field label="Subcategory">
            <input className="adm-input" value={form.subcategory} onChange={(e) => set('subcategory', e.target.value)} />
          </Field>
          <Field label="Type">
            <select className="adm-input" value={form.type} onChange={(e) => set('type', e.target.value as typeof form.type)}>
              <option value="ready-to-wear">Ready to wear</option>
              <option value="semi-stitched">Semi-stitched</option>
            </select>
          </Field>
          {!product && (
            <Field label="Image path">
              <input className="adm-input" value={form.image} onChange={(e) => set('image', e.target.value)} />
            </Field>
          )}
        </div>

        <Field label="Short description">
          <input className="adm-input" value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} />
        </Field>
        <Field label="Description">
          <textarea className="adm-input adm-textarea" value={form.description} onChange={(e) => set('description', e.target.value)} />
        </Field>

        <div className="adm-grid">
          <Field label="Sizes (comma separated)">
            <input className="adm-input" value={form.sizes} onChange={(e) => set('sizes', e.target.value)} />
          </Field>
          <Field label="Tags (comma separated)">
            <input className="adm-input" value={form.tags} onChange={(e) => set('tags', e.target.value)} />
          </Field>
        </div>

        <div className="adm-checks">
          {([
            ['featured', 'Featured'],
            ['isNew', 'New'],
            ['bestSeller', 'Best seller'],
            ['clearance', 'Clearance'],
          ] as const).map(([key, label]) => (
            <label key={key} className="adm-check">
              <input
                type="checkbox"
                checked={form[key]}
                onChange={(e) => set(key, e.target.checked)}
              />
              {label}
            </label>
          ))}
        </div>

        {error && <p className="adm-error" role="alert">{error}</p>}

        <div className="adm-modal-actions">
          <button type="button" className="adm-btn adm-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="adm-btn adm-btn-primary" disabled={busy}>
            {busy ? 'Saving…' : product ? 'Save changes' : 'Create product'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="adm-field">
      <span className="adm-label">{label}{required && ' *'}</span>
      {children}
    </label>
  );
}
