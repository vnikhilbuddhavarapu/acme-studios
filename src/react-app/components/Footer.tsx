import React from 'react'
import { useTranslation } from 'react-i18next'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

function Modal({ open, onClose, title, children }: ModalProps) {
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm border border-[var(--border)] hover:bg-[var(--surface-2)]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="mt-4 text-[var(--fg)]">{children}</div>
      </div>
    </div>
  )
}

export default function Footer() {
  const { t } = useTranslation('common')
  const [open, setOpen] = React.useState<'privacy' | 'terms' | null>(null)

  // Listen for custom event from CookieBanner to open Privacy modal
  React.useEffect(() => {
    const handleOpenPrivacy = () => setOpen('privacy')
    window.addEventListener('openPrivacy', handleOpenPrivacy)
    return () => window.removeEventListener('openPrivacy', handleOpenPrivacy)
  }, [])

  return (
    <>
      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-10 text-base text-neutral-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-medium">© {new Date().getFullYear()} {t('footer.copyright')}</p>
            <div className="flex items-center gap-6">
              <button className="font-medium hover:text-neutral-200 transition" onClick={() => setOpen('privacy')}>
                {t('footer.privacy')}
              </button>
              <button className="font-medium hover:text-neutral-200 transition" onClick={() => setOpen('terms')}>
                {t('footer.terms')}
              </button>
              <a 
                className="font-medium hover:text-neutral-200 transition" 
                href="https://github.com/vnikhilbuddhavarapu/acme-studios" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      <Modal open={open === 'privacy'} onClose={() => setOpen(null)} title="Privacy Policy">
        <div className="space-y-4 text-sm text-[var(--muted)]">
          <p className="text-[var(--fg)]">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>
          
          <section>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-2">Information We Collect</h3>
            <p>
              We collect information you provide directly to us, including your name, email address, and any other 
              information you choose to provide when using our services.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-2">How We Use Your Information</h3>
            <ul className="list-disc ms-5 space-y-1">
              <li>To provide, maintain, and improve our services</li>
              <li>To communicate with you about products, services, and events</li>
              <li>To monitor and analyze trends, usage, and activities</li>
              <li>To detect, prevent, and address technical issues</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-2">Data Security</h3>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit 
              and at rest using industry-standard protocols.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-2">Cookies and Tracking</h3>
            <p>
              We use cookies and similar tracking technologies to track activity on our service and hold certain 
              information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-2">Your Rights</h3>
            <ul className="list-disc ms-5 space-y-1">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-2">Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our contact form.
            </p>
          </section>
        </div>
      </Modal>

      {/* Terms Modal */}
      <Modal open={open === 'terms'} onClose={() => setOpen(null)} title="Terms of Service">
        <div className="space-y-4 text-sm text-[var(--muted)]">
          <p className="text-[var(--fg)]">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>
          
          <section>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-2">Acceptance of Terms</h3>
            <p>
              By accessing and using ACME Studios services, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-2">Use License</h3>
            <p>
              Permission is granted to temporarily access the materials on ACME Studios for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
            <p className="mt-2">Under this license you may not:</p>
            <ul className="list-disc ms-5 space-y-1 mt-1">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-2">User Accounts</h3>
            <p>
              When you create an account with us, you must provide accurate, complete, and current information. 
              Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding your password 
              and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-2">Service Availability</h3>
            <p>
              We strive to provide reliable services, but we do not guarantee that our services will be uninterrupted, 
              timely, secure, or error-free. We reserve the right to modify or discontinue services at any time 
              without notice.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-2">Limitation of Liability</h3>
            <p>
              In no event shall ACME Studios or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
              to use our services.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-2">Governing Law</h3>
            <p>
              These terms shall be governed and construed in accordance with applicable laws, without regard to its 
              conflict of law provisions.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-2">Changes to Terms</h3>
            <p>
              We reserve the right to modify or replace these Terms at any time. We will provide notice of any 
              material changes by posting the new Terms on this page with an updated revision date.
            </p>
          </section>
        </div>
      </Modal>
    </>
  )
}
  