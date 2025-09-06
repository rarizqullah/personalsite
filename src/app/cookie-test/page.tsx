'use client';

import Container from "@/components/Container";

export default function CookieTest() {
  const resetCookie = () => {
    localStorage.removeItem('cookie-consent');
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-16">
      <Container>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">Cookie Consent Test Page</h1>
          <p className="text-[color:var(--muted)] mb-6">
            Buka Developer Tools dan jalankan command berikut di Console untuk reset cookie consent:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 font-mono text-sm">
            <code>localStorage.removeItem(&apos;cookie-consent&apos;); location.reload();</code>
          </div>
          <p className="text-[color:var(--muted)]">
            Setelah menjalankan command tersebut, cookie notice akan muncul kembali dengan design yang baru.
          </p>
          
          <div className="mt-12">
            <button 
              onClick={resetCookie}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Cookie Consent & Reload
            </button>
          </div>
        </div>
      </Container>
    </main>
  );
}
