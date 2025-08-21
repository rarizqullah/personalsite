# PRD --- Personal Site (Hero Only) Berbasis Next.js, Fokus Performance

## 1) Ringkasan

Sebuah **single-page personal site** yang hanya berisi **Hero section**
untuk "About Me" dan daftar **Tech Stack**. Halaman bersifat **statis**
(SSG), dengan animasi ringan memakai **Framer Motion**, dan tipografi
**Cormorant** dimuat melalui tag `<link>` Google Fonts yang sudah
ditentukan. **Tidak ada navigasi/menu**.

## 2) Tujuan & Sasaran

-   **Tujuan utama:** Menyampaikan profil singkat dan kompetensi teknis
    dalam 1 layar, **load sangat cepat** dan responsif.
-   **Hasil yang diharapkan:** Pengunjung langsung paham siapa Anda dan
    teknologi yang dikuasai, tanpa gangguan elemen lain.

## 3) KPI & Target Kinerja (Core Web Vitals)

-   **LCP ≤ 1.5s** (Mobile 4G, CPU Throttle x4, 75th percentile).
-   **CLS ≤ 0.01**.
-   **INP ≤ 200ms** (interaksi kecil: hover/focus).
-   **First Contentful Paint ≤ 1.2s**.
-   **Lighthouse Performance ≥ 95** (Mobile).
-   **Total JS yang dihadrasi di client ≤ 60 kB gzip** (ideal ≤ 40 kB).
-   **Total transfer awal (HTML + CSS + JS + font CSS) ≤ 200 kB gzip**
    (tidak termasuk file font binernya).

## 4) Ruang Lingkup

**Dalam scope**

-   1 halaman: `/` menampilkan Hero (headline, deskripsi singkat, daftar
    stack).

-   Animasi entri ringan (fade/slide kecil) pada headline, paragraf, dan
    chip stack.

-   Responsif (mobile-first, 320px s/d ≥1440px).

-   Tipografi memakai **Cormorant** dengan tag `<link>` berikut (harus
    dipakai):

    ``` html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet">
    ```

-   Tanpa navigasi/menu, tanpa footer kompleks.

**Di luar scope**

-   Halaman tambahan (blog/portfolio).
-   Formulir kontak/CRM.
-   CMS/headless content.

## 5) Prinsip Desain & UX

-   **Single-screen focus:** semua konten inti terlihat dalam 1--1.5
    viewport.
-   **Kejernihan visual:** hierarki tipografi jelas; warna kontras AA.
-   **Animasi hemat:** halus, cepat, dan menghormati
    `prefers-reduced-motion`.
-   **Tidak ada distraksi:** tanpa CTA berlebihan; jika perlu, satu CTA
    "Contact/Email" opsional.

## 6) Persyaratan Fungsional

1.  **Hero Section**

    -   **Heading**: nama + peran (mis. "Frontend / Full-stack
        Developer").
    -   **Subcopy**: 1--2 kalimat ringkas tentang fokus/keahlian.
    -   **Tech Stack**: daftar 6--12 teknologi sebagai chip/badge.

2.  **Animasi (Framer Motion)**

    -   Fade-in + translate-y kecil untuk heading/subcopy.
    -   Stagger untuk chip stack (≤0.06s per item).
    -   Menghormati `prefers-reduced-motion`: animasi dinonaktifkan.

3.  **Aksesibilitas**

    -   Struktur semantik: `h1`, `p`, `ul > li`.
    -   Kontras warna teks ≥ 4.5:1 pada body text.
    -   Focus ring terlihat untuk navigasi keyboard (walau tanpa menu).

4.  **SEO Dasar**

    -   `title`, `meta description` singkat & relevan.
    -   `lang="id"` pada `<html>`.
    -   Open Graph minimal (title/description).

## 7) Persyaratan Non-Fungsional (Performance-First)

-   **Rendering:** **SSG** (App Router) ---
    `export const dynamic = 'force-static'`.
-   **Arsitektur RSC:** Layout & page sebagai **Server Components**;
    hanya bagian animasi menjadi **Client Component** terpisah agar **JS
    client minimal**.
-   **Code-splitting animasi:** client component di-**dynamic import**
    (`ssr: false`) agar HTML bisa tampil duluan.
-   **CSS minimal:** gunakan CSS Modules/vanilla global kecil (\<10 kB).
    Hindari framework berat.
-   **Fonts:** pakai **link** yang diberikan (preconnect +
    `display=swap`). (Catatan optimalisasi opsional: self-host di masa
    depan, tapi **tidak untuk rilis awal**.)
-   **Gambar:** jika ada avatar, gunakan `next/image` dengan ukuran
    tetap, `priority` untuk LCP, dan **dimensi eksplisit** agar
    **CLS=0**.
-   **Caching:** aset statis hashed; HTML SSG served dari edge/CDN.
-   **Third-party:** hanya **Framer Motion** + **Google Fonts CSS**.
    Tidak menambah skrip lain.

## 8) Arsitektur Teknis

-   **Stack:** Next.js (App Router, React 18), TypeScript opsional,
    Framer Motion.

-   **Struktur:**

        app/
          layout.tsx   // Server Component, sisipkan <link> font di <head>
          page.tsx     // Server Component: markup statis (tanpa motion)
          components/
            HeroMotionClient.tsx // "use client": animasi ringan
          globals.css  // gaya global minimal

-   **Pola implementasi animasi (ringkas):**

    -   `page.tsx` merender konten hero **statis** (SEO & LCP cepat).
    -   `HeroMotionClient` di-import dinamis untuk menambahkan motion
        pada elemen yang sudah ada (progressive enhancement).

-   **Konfigurasi build:** default Next 14+; tidak perlu runtime server.

-   **Deployment:** Vercel (direkomendasikan) atau hosting statis
    kompatibel.

## 9) Konten

-   **Heading (h1):** "Halo, saya {Nama}."
-   **Subcopy (p):** 1--2 kalimat tentang spesialisasi dan nilai yang
    diberi.
-   **Stack (ul/li):** contoh: Next.js, TypeScript, React, Node.js,
    PostgreSQL/MongoDB, Tailwind CSS (opsional untuk disebut, bukan
    dipakai).

## 10) Performance Budget (rilis v1)

-   **HTML** awal ≤ 18 kB gzip.
-   **CSS** total ≤ 10 kB gzip.
-   **JS** client (termasuk Framer Motion + komponen) ≤ 60 kB gzip.
-   **Font CSS** (stylesheets dari Google) ≤ 10 kB.
-   **LCP asset** (teks/hero) muncul tanpa blocking resource (font pakai
    `swap`).

## 11) QA & Validasi

-   **Lighthouse (Mobile) di CI/dev & staging**:

    -   Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥
        95.

-   **Web Vitals real-user monitoring** (opsional): aktifkan pengiriman
    metrik ke endpoint sederhana/log console.

-   **Tes throttling** (Chrome DevTools): Fast 3G/Slow 4G, CPU 4×.

-   **CLS audit:** tidak ada pergeseran saat font loading (gunakan
    fallback font-serifs yang dekat dengan Cormorant).

## 12) Risiko & Mitigasi

-   **Risiko:** Framer Motion menambah ukuran JS.

    -   **Mitigasi:** isolate ke 1 client component + **dynamic
        import**, animasi sederhana saja.

-   **Risiko:** Render blocking dari stylesheet Google Fonts.

    -   **Mitigasi:** sudah **preconnect** dan `display=swap`; hindari
        `@import` di CSS.

-   **Risiko:** CLS akibat dimensi tak tetap (jika ada gambar).

    -   **Mitigasi:** selalu set width/height; gunakan `next/image`.

## 13) Pelacakan & Telemetri

-   **Minimalis:** tidak ada analytics umum pada v1.
-   **Opsional**: logging Web Vitals ke console/endpoint sendiri untuk
    memantau LCP/CLS/INP pasca rilis.

## 14) Kriteria Penerimaan (Acceptance Criteria)

-   [ ] Halaman `/` ter-render **statis** (tanpa server runtime).
-   [ ] `layout.tsx` memuat 3 tag `<link>` Google Fonts **persis**
    seperti spesifikasi.
-   [ ] Markup semantik (h1, p, ul/li) lulus inspeksi a11y dasar.
-   [ ] Animasi aktif pada browser normal dan **otomatis nonaktif** saat
    `prefers-reduced-motion`.
-   [ ] Lighthouse Mobile Performance ≥ 95; **LCP ≤ 1.5s**, **CLS ≤
    0.01**.
-   [ ] **Bundle JS client ≤ 60 kB gzip**.
-   [ ] Tidak ada dependensi selain Next/React/Framer Motion.

## 15) Rencana Rilis

-   **D1**: Struktur proyek + markup statis + gaya dasar.
-   **D2**: Integrasi link Google Fonts + fine-tune tipografi.
-   **D3**: Tambah Framer Motion via client component terpisah + dynamic
    import.
-   **D4**: QA performance (Lighthouse, throttling) + perbaikan.
-   **D5**: Deploy ke produksi (Vercel) + verifikasi Web Vitals.

------------------------------------------------------------------------

### Catatan Implementasi Cepat (opsional)

-   **Isolasi JS animasi:**

    -   `page.tsx` render markup hero statis.
    -   `HeroMotionClient` (client) hanya menambahkan efek `motion.*`
        pada elemen yang diberi `data-anim`/selector---HTML tetap sama
        jika JS gagal.

-   **Font fallback:**

    -   Set
        `font-family: "Cormorant", Georgia, "Times New Roman", serif;`
    -   Pastikan metrik fallback mendekati Cormorant untuk meminimalkan
        CLS.

Kalau kamu mau, aku bisa langsung turunkan PRD ini menjadi **task list
teknis** (issue checklist) + contoh potongan **kode struktur "server
page + client motion"** sesuai PRD di atas.


About Me :
From an early age I was the kid who dismantled gadgets to map their logic, and that curiosity steadily set me on a path into software development. I started with rudimentary HTML pages, explored CSS for layout, grids, and type, then layered in JavaScript to add progressive interactions. I treated each attempt as a small experiment: define a hypothesis, build a prototype, note what worked, what failed, and why. That discipline made web innovation a repeatable loop—ideate, prototype, validate with users, then iterate quickly. To sharpen my craft I built projects: a progressive to-do app, a multi-step form with accessible validation, and a lightweight dashboard to watch site performance. Curiosity pulled me server-side too: REST and GraphQL APIs, authentication and authorization, schema design, and caching strategies to keep responses snappy. I learned to measure what matters—LCP, CLS, TTFB—and to improve them with prefetching, code splitting, and server-side rendering when appropriate. I explored PWAs, React Server Components, edge functions, and WebAssembly, but carried a single compass: use technology because it solves a real problem. Today that approach shapes how I work: start from the user problem, quantify impact, choose the simplest effective architecture, and keep a bias for clarity. I practice TDD where it adds confidence, write unit and integration tests, and maintain CI/CD with feature flags and observability. With code reviews, Architecture Decision Records, and living documentation, experiments graduate into dependable products that are secure, fast, and maintainable. I document patterns and edge cases so future changes remain predictable and safe.

As Co-Founder of Heppo.Tech, I am responsible for turning manual, error-prone operations into scalable automation. Every engagement begins with concise discovery: stakeholder interviews, workflow mapping, and a quantified estimate of cost of delay. From there we design end-to-end solutions—system integrations, event-driven orchestration, and dashboards that surface real-time KPIs. Exploration is our engine for growth, so we run targeted technical spikes to evaluate message brokers, rule engines, AI agents, and architectural approaches such as event sourcing or CQRS. We choose tools only when metrics justify them: cycle time, defect rate, infrastructure cost, and user satisfaction. To protect quality, we uphold clear engineering principles—clean domain modeling, documented API contracts, schema versioning, and automated tests that guard behavior. Our CI/CD pipeline isolates builds, runs tests and security audits, and supports progressive delivery through feature flags. Observability combines structured logs, metrics, and traces so incidents can be diagnosed quickly and lessons feed back into design. Operationally, we standardize infrastructure provisioning with Infrastructure as Code, maintain project templates, and curate a reusable component catalog to accelerate time-to-value. Exploration does not stop at technology; we experiment with service models and collaboration patterns to improve the fit between solution and business context. We prioritize compliance and security: secrets managed centrally, least-privilege access, encryption in transit and at rest, and audit trails. Lightweight governance keeps innovation fast but controlled, and retrospectives make improvement continuous. That habit of deliberate exploration keeps the team evolving—not by chasing trends, but by understanding the highest-value problems and delivering safe, fast paths to solve them.

Keeping pace with the times means reading the wave before it breaks. Over the next five years (2025–2030), I expect automation to evolve from scheduled scripts into autonomous agents that observe events, understand business context, and execute cross-system actions under human oversight. Edge computing and compact models will push inference closer to data sources, reducing latency and cutting costs. Integration will become event-centric with governed schemas, limiting domino effects when teams ship changes. Identity, permissions, and audit will embrace zero-trust design. At the interface, natural language will become a primary control surface: users state goals, systems plan, execute, and ask for clarification when ambiguity appears. No-code and pro-code will converge; engineers will concentrate on guardrails, rules, and data quality while generators handle repetitive scaffolding. My roadmap to prepare is practical. First, strengthen foundations: domain modeling, event-driven patterns, observability, security, and responsible AI practices. Second, build pragmatic data competence: reliable pipelines, explicit ownership, measurable quality, and managed lineage. Third, practice short experiments: craft a hypothesis, prototype, define success metrics, and decide fast. Fourth, invest in documentation that runs—ADRs, living architecture diagrams, and executable tests that explain behavior. Finally, share in public—writing and code—because outside feedback compounds learning. With these habits, transformation stops feeling like magic; it becomes a sequence of simple, consistent practices. Organizations can harvest automation’s benefits without losing control, security, or accountability, even as the pace of change accelerates. My aim is technology that is inclusive, resource-efficient, maintainable, and—above all—measurably valuable to the people who use it.
