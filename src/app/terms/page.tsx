import type { Metadata } from "next";
import Link from "next/link";
import Container from "@ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service - Rafi Risqullah Putra",
  description: "Terms of Service for Rafi Risqullah Putra's personal website and services.",
};

export default function Terms() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-16">
      <Container>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p className="text-[color:var(--muted)] text-sm">
            Last updated: September 6, 2025
          </p>
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">1. Acceptance of Terms</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              By accessing and using this website (rafirisqullah.com), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">2. Use License</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              Permission is granted to temporarily view the materials on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="text-[color:var(--muted)] leading-relaxed mb-4 ml-6">
              <li className="mb-2">• modify or copy the materials</li>
              <li className="mb-2">• use the materials for any commercial purpose or for any public display</li>
              <li className="mb-2">• attempt to reverse engineer any software contained on the website</li>
              <li className="mb-2">• remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">3. Disclaimer</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              The materials on this website are provided on an &apos;as is&apos; basis. Rafi Risqullah Putra makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">4. Limitations</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              In no event shall Rafi Risqullah Putra or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if Rafi Risqullah Putra or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">5. Accuracy of Materials</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              The materials appearing on this website could include technical, typographical, or photographic errors. Rafi Risqullah Putra does not warrant that any of the materials on its website are accurate, complete, or current.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">6. Links</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              Rafi Risqullah Putra has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Rafi Risqullah Putra of the site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">7. Modifications</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              Rafi Risqullah Putra may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">8. Governing Law</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of Indonesia and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">9. Contact Information</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us through our official channels.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[color:var(--border)]">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </Container>
    </main>
  );
}
