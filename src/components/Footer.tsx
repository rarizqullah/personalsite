// components/Footer.tsx
export default function Footer() {
  const year = new Date().getFullYear(); // dibekukan saat build (SSG)
  return (
    <footer className="siteFooter" aria-label="Footer">
      <p className="copyright">© {year} Rafi Risqullah Putra</p>
      <nav className="social" aria-label="Social links">
        <a
          href="https://www.linkedin.com/in/rafirisqullahputra"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <span aria-hidden="true" className="dot">·</span>
        <a
          href="https://github.com/rarizqullah"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </nav>
    </footer>
  );
}
