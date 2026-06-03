import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Card from "../../../components/Card";
import SectionDivider from "../../../components/SectionDivider";
import { BookOpen, ShieldQuestion, Globe, MessageSquareQuote, FileText } from "lucide-react";
import oodegrData from "../../../data/oodegrData.json";
import { getLocalized } from "../../../utils/cn";

export default function OrthodoxPhilosophyPage() {
  const { t } = useTranslation();

  const getIcon = (category: any) => {
    const catStr = typeof category === 'string' ? category : (category.en || '');
    if (catStr.includes("Philosophy")) return <BookOpen size={24} />;
    if (catStr.includes("Papacy")) return <ShieldQuestion size={24} />;
    if (catStr.includes("Protestantism")) return <Globe size={24} />;
    return <MessageSquareQuote size={24} />;
  };

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <Breadcrumbs
        items={[
          { label: "home", to: "/" },
          { label: "orthodox", to: "/orthodox" },
          { label: "philosophy", to: "/orthodox/philosophy" },
        ]}
      />

      <div className="mb-10">
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">
          {t('sections.philosophy_faith')}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--text-primary)]/88">
          Exploring the encounter between Orthodox Theology and philosophical traditions, 
          as well as comparative studies of various Christian denominations and world faiths.
          All content is preserved locally from the <a href="https://oodegr.com" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] underline">Orthodox Outlet for Dogmatic Enquiries (OODE)</a>.
        </p>
      </div>

      <div className="space-y-12">
        {oodegrData.map((section: any) => (
          <section key={getLocalized(section.category)} id={section.category.en.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}>
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full bg-[var(--accent)]/10 p-2 text-[var(--accent)]">
                {getIcon(section.category)}
              </div>
              <div>
                <h2 className="font-heading text-2xl text-[var(--text-secondary)]">
                  {getLocalized(section.category)}
                </h2>
                <p className="text-sm text-[var(--text-primary)]/70">{getLocalized(section.description)}</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.articles.map((article: any) => (
                <Card key={article.slug} className="group flex flex-col justify-between hover:border-[var(--accent)] transition-all">
                  <div className="p-4">
                    <h3 className="font-heading text-xl text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                      {getLocalized(article.title)}
                    </h3>
                    {article.author && (
                      <p className="mt-1 text-xs font-medium text-[var(--accent)]/80">
                        By {getLocalized(article.author)}
                      </p>
                    )}
                    {article.summary && (
                      <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/80">
                        {getLocalized(article.summary)}
                      </p>
                    )}
                  </div>
                  <div className="border-t border-[var(--text-primary)]/10 p-4">
                    <Link
                      to={`/orthodox/philosophy/${article.slug}`}
                      className="inline-flex items-center gap-2 rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-3 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-all"
                    >
                      <FileText size={14} />
                      Read internal article
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
            <SectionDivider />
          </section>
        ))}
      </div>

      <footer className="mt-16 text-center text-sm text-[var(--text-primary)]/60">
        <p>
          Data provided by the Orthodox Outlet for Dogmatic Enquiries. 
          Visit <a href="https://oodegr.com" className="underline">oodegr.com</a> for the full library of research and articles.
        </p>
      </footer>
    </main>
  );
}
