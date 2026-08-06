'use client';

import { useQuery, useConvex } from 'convex/react';
import { anyApi } from 'convex/server';
import { shortDate, Skeleton, EmptyState, Icon, downloadCsv } from './ui';

type Subscriber = { _id: string; email: string; source: string; createdAt: number };

export default function Subscribers({
  adminKey,
  notify,
}: {
  adminKey: string;
  notify: (msg: string) => void;
}) {
  const subs = useQuery(anyApi.admin.listSubscribers, { adminKey }) as Subscriber[] | undefined;
  const convex = useConvex();

  if (!subs) return <Skeleton rows={5} />;

  async function remove(s: Subscriber) {
    if (!confirm(`Remove ${s.email} from the list?`)) return;
    await convex.mutation(anyApi.admin.deleteSubscriber, { adminKey, id: s._id });
    notify(`Removed ${s.email}`);
  }

  return (
    <div className="adm-stack">
      <div className="adm-toolbar">
        <p className="adm-toolbar-note">
          {subs.length} {subs.length === 1 ? 'subscriber' : 'subscribers'} collected from the storefront.
        </p>
        <button
          className="adm-btn adm-btn-ghost"
          disabled={subs.length === 0}
          onClick={() =>
            downloadCsv('jessaura-subscribers.csv', [
              ['Email', 'Source', 'Signed up'],
              ...subs.map((s) => [s.email, s.source, new Date(s.createdAt).toISOString().slice(0, 10)]),
            ])
          }
        >
          <Icon.download /> Export CSV
        </button>
      </div>

      {subs.length === 0 ? (
        <EmptyState
          title="No subscribers yet"
          body="Emails captured by the homepage newsletter form appear here, ready to export to your mailing tool."
        />
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Source</th>
                <th>Signed up</th>
                <th className="adm-th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s._id}>
                  <td><a href={`mailto:${s.email}`}>{s.email}</a></td>
                  <td className="adm-cap">{s.source}</td>
                  <td>{shortDate(s.createdAt)}</td>
                  <td>
                    <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => remove(s)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
