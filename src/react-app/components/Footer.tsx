export default function Footer() {
    return (
      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} ACME Studios. Built with Cloudflare Workers.</p>
            <div className="flex items-center gap-4">
              <a className="hover:text-neutral-200" href="#">Privacy</a>
              <a className="hover:text-neutral-200" href="#">Terms</a>
              <a className="hover:text-neutral-200" href="#">Status</a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  