import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { PageContent } from "../app/siteData";
import Card from "./Card";
import SectionDivider from "./SectionDivider";
import LocalizedText from "./LocalizedText";

type TraditionPageProps = {
  content: PageContent;
  patternClassName: string;
};

export default function TraditionPage({ content, patternClassName }: TraditionPageProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const isPrayersPage = location.pathname.includes("/prayers");
  const isCatechismPage = location.pathname.includes("/catechism") && !location.pathname.includes("/fathers") && !location.pathname.includes("/councils") && !location.pathname.includes("/mysteries");
  const tradition = location.pathname.includes("/orthodox") ? "orthodox" : "catholic";

  // Determine i18n key base
  const pageType = location.pathname.split('/').pop() || 'dashboard';
  const i18nBase = `content.${tradition}.${pageType}`;

  // Check if we have i18n translations, if not we will use LocalizedText for dynamic translation
  const hasTitleTranslation = t(`${i18nBase}.title`) !== `${i18nBase}.title`;
  const hasSubtitleTranslation = t(`${i18nBase}.subtitle`) !== `${i18nBase}.subtitle`;
  
  const displayTitle = hasTitleTranslation ? t(`${i18nBase}.title`) : content.title;
  const displaySubtitle = hasSubtitleTranslation ? t(`${i18nBase}.subtitle`) : content.subtitle;

  return (
    <main className={`min-h-screen px-4 py-8 md:px-8 ${patternClassName}`}>
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <h1 className="font-heading text-3xl leading-tight text-[var(--text-secondary)] md:text-5xl">
          <LocalizedText text={hasTitleTranslation ? displayTitle : content.title} />
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/90">
          <LocalizedText text={hasSubtitleTranslation ? displaySubtitle : content.subtitle} />
        </p>
      </motion.section>

      <SectionDivider label={t('sidebar.kyrie') || "Kyrie Eleison"} />

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {content.paragraphs.map((paragraph, idx) => {
            const key = `${i18nBase}.p${idx + 1}`;
            const translated = t(key);
            const hasTranslation = translated !== key;
            return (
              <p key={idx} className="drop-cap text-lg leading-relaxed text-[var(--text-primary)]/88">
                <LocalizedText text={hasTranslation ? translated : paragraph} />
              </p>
            );
          })}
        </div>
        {content.quote && (
          <blockquote className="h-fit rounded-xl border-l-4 border-[var(--accent)] bg-[var(--card)]/90 p-5 italic text-[var(--text-primary)]">
            <LocalizedText as="p" text={content.quote} />
            {content.quoteSource && (
              <footer className="mt-3 text-sm text-[var(--text-secondary)]">
                <LocalizedText text={content.quoteSource} />
              </footer>
            )}
          </blockquote>
        )}
      </section>

      <SectionDivider label={isPrayersPage ? t('sections.prayer_library') || "Prayer Library" : t('sections.sacred_library') || "Sacred Library"} />

      <section className={isPrayersPage ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"}>
        {content.items.map((item) => {
          if (isPrayersPage) {
            if (item.title.startsWith("Prayers by Jurisdiction")) {
              const jurisdictions = ["Greek", "Slavonic", "Serbian", "Armenian", "Antiochian"];
              return (
                <Card key={item.title} className="flex flex-col">
                  <LocalizedText as="h3" className="mb-3 font-heading text-lg text-[var(--text-secondary)]" text="Jurisdictional Prayers" />
                  <div className="grid grid-cols-2 gap-2">
                    {jurisdictions.map((j) => (
                      <Link
                        key={j}
                        to={`/${tradition}/prayers?jurisdiction=${j.toLowerCase()}`}
                        className="rounded-lg border border-[var(--border)]/40 bg-[var(--bg-secondary)] px-3 py-2 text-center text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--accent)]/10"
                      >
                        <LocalizedText text={j} />
                      </Link>
                    ))}
                  </div>
                </Card>
              );
            }

            const slug = item.title.toLowerCase().replace(/\s+/g, "-");
            let target = `/${tradition}/prayers/${slug}`;
            
            if (item.title === "Prayer Rope Guide") {
              target = "/orthodox/prayers/prayer-rope/interactive";
            } else if (item.title === "The Holy Rosary") {
              target = "/catholic/prayers/rosary/interactive";
            }

            return (
              <Link key={item.title} to={target} className="group">
                <Card className="h-full transition-colors group-hover:border-[var(--accent)]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-lg text-[var(--text-secondary)]">
                      <LocalizedText text={item.title} />
                    </h3>
                    <div className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[10px] uppercase tracking-wider text-[var(--accent)]">
                      <LocalizedText text="Open" />
                    </div>
                  </div>
                  <LocalizedText as="p" className="mt-2 text-sm text-[var(--text-primary)]/85" text={item.description} />
                </Card>
              </Link>
            );
          }

          const slug = item.title.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-").replace(/[()]/g, "");
          return (
            <Link key={item.title} to={`/${tradition}/${slug}`} className="group">
              <Card className="h-full transition-colors group-hover:border-[var(--accent)]">
                <h3 className="font-heading text-xl text-[var(--text-secondary)]">
                  <LocalizedText text={item.title} />
                </h3>
                <LocalizedText as="p" className="mt-2 text-[var(--text-primary)]/85" text={item.description} />
              </Card>
            </Link>
          );
        })}
      </section>
    </main>
  );
}