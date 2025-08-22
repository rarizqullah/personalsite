import HeroWrapper from '@/components/HeroWrapper';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import Sentinel from '@/components/Sentinel';
import { READING_LIST, CONCEPT_DIVES, RESOURCES } from '@/data/learn';

// Force static generation for optimal performance
export const dynamic = 'force-static';

const getStatusBadgeColor = (status: string) => {
  const colors = {
    Queued: 'bg-slate-100 text-slate-700 border-slate-200',
    Reading: 'bg-blue-100 text-blue-700 border-blue-200', 
    Done: 'bg-emerald-100 text-emerald-700 border-emerald-200'
  };
  const darkColors = {
    Queued: 'dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600',
    Reading: 'dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700',
    Done: 'dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-700'
  };
  const lightColor = colors[status as keyof typeof colors] || colors.Queued;
  const darkColor = darkColors[status as keyof typeof darkColors] || darkColors.Queued;
  return `${lightColor} ${darkColor} border`;
};

const getResourceKindIcon = (kind: string) => {
  const icons = {
    Article: '📄',
    Video: '🎥',
    Repo: '📁',
    Tool: '🔧'
  };
  return icons[kind as keyof typeof icons] || '📄';
};

export default function LearnPage() {
  return (
    <HeroWrapper>
      <main className="hero min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <PageHeader 
          title="Learn"
          subtitle="Reading, Concepts, Resources"
        />
        
        {/* Reading List Section */}
        <section className="w-full mb-16">
          <h2 className="text-2xl md:text-3xl font-light text-[var(--text)] mb-8 text-center">
            Reading List
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {READING_LIST.map((item) => (
              <Card
                key={item.id}
                title={item.title}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  
                  {item.note && (
                    <p className="text-sm text-[var(--muted)]">
                      {item.note}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Concept Dives Section */}
        <section className="w-full mb-16">
          <h2 className="text-2xl md:text-3xl font-light text-[var(--text)] mb-8 text-center">
            Concept Dives
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONCEPT_DIVES.map((concept) => (
              <Card
                key={concept.id}
                title={concept.topic}
                meta={`~${concept.estReadMin} min read`}
              >
                <p className="text-[var(--muted)]">
                  {concept.summary}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className="w-full mb-16">
          <h2 className="text-2xl md:text-3xl font-light text-[var(--text)] mb-8 text-center">
            Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESOURCES.map((resource) => (
              <div
                key={resource.id}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--brand)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg" role="img" aria-label={resource.kind}>
                    {getResourceKindIcon(resource.kind)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-[var(--text)] leading-tight">
                      {resource.label}
                    </h3>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      {resource.kind}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <Sentinel context="learn" />
        <Footer />
      </main>
    </HeroWrapper>
  );
}
