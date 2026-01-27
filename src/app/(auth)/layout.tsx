import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender to-cream flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="text-2xl font-bold text-deep-purple">
          <span className="text-vibrant-yellow">W</span> Websuem
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Websuem. All rights reserved.
      </footer>
    </div>
  )
}
