import { PageShell, Crumbs, SectionTitle, Faqs, CtaBand } from '@/components/PageShell';
import { useSeoMeta, combineSchemas, breadcrumbSchema, faqPageSchema, webPageSchema } from '@/lib/seo';

const faqs = [
  { q: 'Does Fincile have SOC 2, ISO 27001 or HIPAA certification?', a: 'No. Fincile has no SOC 2, ISO 27001, HIPAA or similar assessment, and has not had an independent penetration test. If your client contracts require one, Fincile is not ready for that work yet.' },
  { q: 'Can I upload payroll files or health billing data?', a: 'Not yet. Fincile is not set up for regulated health data or for payroll files that contain bank account numbers or government IDs. Use an employee ID, leave out account numbers, and do not upload protected health information.' },
  { q: 'Who can see my data?', a: 'Members of your workspace, by role. Another workspace cannot read your runs. Fincile staff can reach the database as part of running the service. Stored rows are encrypted, but the key is held by the service, so this is not end-to-end encryption.' },
  { q: 'How do I report a security problem?', a: 'Email support@getfincile.com with the details. Please do not include customer data in the report.' },
];
const DESC = 'How Fincile protects uploaded files and results, and what it does not claim: encryption before storage, workspace separation, retention, deletion, and no certifications.';

const facts: [string, string][] = [
  ['Encrypted before storage', 'Uploaded rows, exceptions, notes and accounting-system connection tokens are encrypted with AES-256-GCM before they are written to the database. The service will not start storing workspace data without its encryption key, and it reports a missing or malformed key instead of falling back to plain text.'],
  ['Key rotation', 'Each stored value records which key sealed it. A new key can be added while the old one stays readable, and a scheduled job re-encrypts stored values under the new key.'],
  ['Passwords and sessions', 'Passwords are hashed with PBKDF2-SHA256 and never stored in readable form. Repeated failed sign-ins lock the account for a while. Session cookies are signed, HttpOnly, SameSite=Lax and Secure. Requests that change data must come from the Fincile site itself.'],
  ['Workspace separation and roles', 'Every record belongs to one workspace. A member of another workspace gets a not-found response, not a permission error. Roles are owner, admin, analyst and viewer. Only owners manage billing and only owners and admins connect accounting systems or delete runs.'],
  ['Read-only connections', 'The QuickBooks Online connection, which is in beta and not switched on yet, asks for read access only. Fincile never posts entries or moves money in your other systems.'],
  ['Retention and deletion', 'Run history is kept for a period set by your plan: 90 days on Free and Starter, one year on Growth, and until you delete it on Scale. A daily job removes older runs. You can delete any run, and the workspace owner can delete the whole workspace, which removes its runs, exceptions, notes, templates, connections, receipts and audit trail from the live database. Backups of the database are managed by the hosting provider and we have not published how long they keep deleted rows.'],
  ['Audit trail', 'Status changes, assignments, notes, exports and plan changes are recorded with who and when, and you can export the trail on paid plans.'],
  ['Hosting', 'Fincile runs on Cloudflare Workers with a Cloudflare database. Traffic is over HTTPS.'],
];

export default function Security() {
  useSeoMeta({
    title: 'Security and Data Handling | Fincile',
    description: DESC,
    path: '/security',
    structuredData: combineSchemas(
      webPageSchema({ name: 'Fincile security', description: DESC, path: '/security' }),
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Security', path: '/security' }]),
      faqPageSchema(faqs),
    ),
  });
  return (
    <PageShell>
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Crumbs items={[{ name: 'Home', path: '/' }, { name: 'Security' }]} />
        <h1 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight mb-4">Security and data handling</h1>
        <p className="text-lg text-text-secondary mb-6">What Fincile does with the files you upload, in plain terms.</p>
        <p className="text-sm bg-teal-light text-navy rounded-lg px-4 py-3 mb-10">Fincile has no SOC 2, ISO 27001 or HIPAA certification and has not had an independent security audit. Everything below is something we built and tested ourselves.</p>
        <section className="mb-12">
          <SectionTitle eyebrow="What we do">Controls in place</SectionTitle>
          <div className="space-y-3">
            {facts.map(([t, d]) => (
              <div key={t} className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-navy mb-1">{t}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-12">
          <SectionTitle eyebrow="Limits">What Fincile does not do</SectionTitle>
          <ul className="list-disc pl-5 text-text-secondary space-y-2">
            <li>No third-party certification or audit report.</li>
            <li>No end-to-end encryption: the service holds the encryption key, so it can read stored rows when it processes them.</li>
            <li>No single sign-on, no two-factor sign-in and no IP allow-lists yet.</li>
            <li>Not set up for regulated health data or for payroll files with bank account numbers.</li>
          </ul>
        </section>
        <section>
          <SectionTitle eyebrow="FAQ">Questions</SectionTitle>
          <Faqs faqs={faqs} />
        </section>
        <CtaBand />
      </div>
    </PageShell>
  );
}
