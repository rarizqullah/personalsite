import HeroWrapper from '@/components/HeroWrapper';
import ProfileHeader from '@/components/ProfileHeader';
import TechStackItem from '@/components/TechStackItem';
import Footer from '@/components/Footer';
import Sentinel from '@/components/Sentinel';

// Force static generation for optimal performance
export const dynamic = 'force-static';

const techStack = [
  { name: 'Next.js', logo: '/next.svg' },
  { name: 'TypeScript', logo: '/typescript.svg' },
  { name: 'React', logo: '/react.svg' },
  { name: 'Node.js', logo: '/nodejs.svg' },
  { name: 'GraphQL', logo: '/graphql.svg' },
  { name: 'PostgreSQL', logo: '/postgresql.svg' },
  { name: 'Event-Driven Architecture', logo: '/event-driven.svg' },
  { name: 'System Integration', logo: '/system-integration.svg' },
  { name: 'CI/CD', logo: '/cicd.svg' },
  { name: 'Infrastructure as Code', logo: '/infrastructure.svg' },
  { name: 'Observability', logo: '/observability.svg' },
  { name: 'WebAssembly', logo: '/webassembly.svg' }
];

export default function Home() {
  return (
    <HeroWrapper>
      <main className="hero min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <ProfileHeader 
          name="Rafi Risqullah Putra"
          location="Indonesia"
          avatar="/avatar-placeholder.svg"
          isVerified={true}
          socialLinks={{
            discord: "#",
            wordpress: "#",
            twitter: "#",
            linkedin: "#"
          }}
        />
        
        <div data-anim="subtitle">
          <div className="hero-paragraph">
            <p className="hero-subtitle">
              From an early age I was the kid who dismantled gadgets to map their logic, and that curiosity steadily set me on a path into software development. I started with rudimentary HTML pages, explored CSS for layout, grids, and type, then layered in JavaScript to add progressive interactions. I treated each attempt as a small experiment: define a hypothesis, build a prototype, note what worked, what failed, and why. That discipline made web innovation a repeatable loop—ideate, prototype, validate with users, then iterate quickly. To sharpen my craft I built projects: a progressive to-do app, a multi-step form with accessible validation, and a lightweight dashboard to watch site performance. Curiosity pulled me server-side too: REST and GraphQL APIs, authentication and authorization, schema design, and caching strategies to keep responses snappy. I learned to measure what matters—LCP, CLS, TTFB—and to improve them with prefetching, code splitting, and server-side rendering when appropriate. I explored PWAs, React Server Components, edge functions, and WebAssembly, but carried a single compass: use technology because it solves a real problem. Today that approach shapes how I work: start from the user problem, quantify impact, choose the simplest effective architecture, and keep a bias for clarity. I practice TDD where it adds confidence, write unit and integration tests, and maintain CI/CD with feature flags and observability. With code reviews, Architecture Decision Records, and living documentation, experiments graduate into dependable products that are secure, fast, and maintainable. I document patterns and edge cases so future changes remain predictable and safe.
            </p>
          </div>

          <div className="hero-paragraph">
            <p className="hero-subtitle">
              As Co-Founder of Heppo.Tech, I am responsible for turning manual, error-prone operations into scalable automation. Every engagement begins with concise discovery: stakeholder interviews, workflow mapping, and a quantified estimate of cost of delay. From there we design end-to-end solutions—system integrations, event-driven orchestration, and dashboards that surface real-time KPIs. Exploration is our engine for growth, so we run targeted technical spikes to evaluate message brokers, rule engines, AI agents, and architectural approaches such as event sourcing or CQRS. We choose tools only when metrics justify them: cycle time, defect rate, infrastructure cost, and user satisfaction. To protect quality, we uphold clear engineering principles—clean domain modeling, documented API contracts, schema versioning, and automated tests that guard behavior. Our CI/CD pipeline isolates builds, runs tests and security audits, and supports progressive delivery through feature flags. Observability combines structured logs, metrics, and traces so incidents can be diagnosed quickly and lessons feed back into design. Operationally, we standardize infrastructure provisioning with Infrastructure as Code, maintain project templates, and curate a reusable component catalog to accelerate time-to-value. Exploration does not stop at technology; we experiment with service models and collaboration patterns to improve the fit between solution and business context. We prioritize compliance and security: secrets managed centrally, least-privilege access, encryption in transit and at rest, and audit trails. Lightweight governance keeps innovation fast but controlled, and retrospectives make improvement continuous. That habit of deliberate exploration keeps the team evolving—not by chasing trends, but by understanding the highest-value problems and delivering safe, fast paths to solve them.
            </p>
          </div>

          <div className="hero-paragraph">
            <p className="hero-subtitle">
              Keeping pace with the times means reading the wave before it breaks. Over the next five years (2025–2030), I expect automation to evolve from scheduled scripts into autonomous agents that observe events, understand business context, and execute cross-system actions under human oversight. Edge computing and compact models will push inference closer to data sources, reducing latency and cutting costs. Integration will become event-centric with governed schemas, limiting domino effects when teams ship changes. Identity, permissions, and audit will embrace zero-trust design. At the interface, natural language will become a primary control surface: users state goals, systems plan, execute, and ask for clarification when ambiguity appears. No-code and pro-code will converge; engineers will concentrate on guardrails, rules, and data quality while generators handle repetitive scaffolding. My roadmap to prepare is practical. First, strengthen foundations: domain modeling, event-driven patterns, observability, security, and responsible AI practices. Second, build pragmatic data competence: reliable pipelines, explicit ownership, measurable quality, and managed lineage. Third, practice short experiments: craft a hypothesis, prototype, define success metrics, and decide fast. Fourth, invest in documentation that runs—ADRs, living architecture diagrams, and executable tests that explain behavior. Finally, share in public—writing and code—because outside feedback compounds learning. With these habits, transformation stops feeling like magic; it becomes a sequence of simple, consistent practices. Organizations can harvest automation&apos;s benefits without losing control, security, or accountability, even as the pace of change accelerates. My aim is technology that is inclusive, resource-efficient, maintainable, and—above all—measurably valuable to the people who use it.
            </p>
          </div>
        </div>

        <ul className="tech-stack" data-anim="stack">
          {techStack.map((tech, index) => (
            <TechStackItem
              key={tech.name}
              name={tech.name}
              logo={tech.logo}
              index={index}
            />
          ))}
        </ul>
        
        <Sentinel context="home" />
        <Footer />
      </main>
    </HeroWrapper>
  );
}
