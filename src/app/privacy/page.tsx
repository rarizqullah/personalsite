import type { Metadata } from "next";
import Link from "next/link";
import Container from "@ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy - Rafi Risqullah Putra",
  description: "Privacy Policy for Rafi Risqullah Putra's personal website and services.",
};

export default function Privacy() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-16">
      <Container>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-[color:var(--muted)] text-sm">
            Last updated: September 6, 2025
          </p>
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">1. Information We Collect</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              We collect information you provide directly to us, such as when you contact us through our website or engage with our services. This may include:
            </p>
            <ul className="text-[color:var(--muted)] leading-relaxed mb-4 ml-6">
              <li className="mb-2">• Name and contact information</li>
              <li className="mb-2">• Messages and communications</li>
              <li className="mb-2">• Any other information you choose to provide</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">2. Automatic Information Collection</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              When you visit our website, we may automatically collect certain information, including:
            </p>
            <ul className="text-[color:var(--muted)] leading-relaxed mb-4 ml-6">
              <li className="mb-2">• IP address and device information</li>
              <li className="mb-2">• Browser type and version</li>
              <li className="mb-2">• Pages visited and time spent on our site</li>
              <li className="mb-2">• Referring website or source</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">3. Cookies and Tracking Technologies</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience. These include:
            </p>
            <ul className="text-[color:var(--muted)] leading-relaxed mb-4 ml-6">
              <li className="mb-2">• <strong>Essential cookies:</strong> Required for the website to function properly</li>
              <li className="mb-2">• <strong>Analytics cookies:</strong> Help us understand how visitors use our website</li>
              <li className="mb-2">• <strong>Preference cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              You can control cookie preferences through our cookie consent banner or your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">4. How We Use Your Information</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="text-[color:var(--muted)] leading-relaxed mb-4 ml-6">
              <li className="mb-2">• Provide and improve our services</li>
              <li className="mb-2">• Respond to your inquiries and requests</li>
              <li className="mb-2">• Analyze website usage and performance</li>
              <li className="mb-2">• Protect against fraudulent or malicious activity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">5. Information Sharing</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </p>
            <ul className="text-[color:var(--muted)] leading-relaxed mb-4 ml-6">
              <li className="mb-2">• With your explicit consent</li>
              <li className="mb-2">• To comply with legal obligations</li>
              <li className="mb-2">• To protect our rights and safety</li>
              <li className="mb-2">• With trusted service providers who assist in operating our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">6. Data Security</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">7. Your Rights</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="text-[color:var(--muted)] leading-relaxed mb-4 ml-6">
              <li className="mb-2">• Right to access your personal information</li>
              <li className="mb-2">• Right to correct inaccurate information</li>
              <li className="mb-2">• Right to delete your personal information</li>
              <li className="mb-2">• Right to restrict processing</li>
              <li className="mb-2">• Right to data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">8. Third-Party Services</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">9. Vendor List</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              We may work with the following types of service providers:
            </p>
            <ul className="text-[color:var(--muted)] leading-relaxed mb-4 ml-6">
              <li className="mb-2">• Web hosting services (Vercel)</li>
              <li className="mb-2">• Analytics providers (when applicable)</li>
              <li className="mb-2">• Content delivery networks</li>
              <li className="mb-2">• Security services</li>
            </ul>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4 text-sm">
              This list may be updated periodically. Please check this privacy policy regularly for updates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">10. Children&apos;s Privacy</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">11. Changes to This Policy</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              We may update this privacy policy from time to time. We will notify you of any material changes by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text)]">12. Contact Information</h2>
            <p className="text-[color:var(--muted)] leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us through our official channels.
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
