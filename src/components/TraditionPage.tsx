import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { PageContent } from "../app/siteData";
import Card from "./Card";
import SectionDivider from "./SectionDivider";
import LocalizedText from "./LocalizedText";
import LivePrayerView from "./LivePrayerView";

type TraditionPageProps = {
  content: PageContent;
  patternClassName: string;
};

export default function TraditionPage({ content, patternClassName }: TraditionPageProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const isPrayersPage = location.pathname.includes("/prayers");
  const tradition = "orthodox";

  // Determine i18n key base
  const pathParts = location.pathname.split('/').filter(Boolean);
  const pageType = pathParts[pathParts.length - 1] || 'dashboard';
  const i18nBase = `content.${tradition}.${pageType}`;

  // Check if we have i18n translations, if not we will use LocalizedText for dynamic translation
  const hasTitleTranslation = t(`${i18nBase}.title`) !== `${i18nBase}.title`;
  const hasSubtitleTranslation = t(`${i18nBase}.subtitle`) !== `${i18nBase}.subtitle`;
  
  const displayTitle = hasTitleTranslation ? t(`${i18nBase}.title`) : content.title;
  const displaySubtitle = hasSubtitleTranslation ? t(`${i18nBase}.subtitle`) : content.subtitle;

  return (
    <main className={`min-h-screen px-4 py-8 md:px-8 ${patternClassName}`}>
      <section>
        <h1 className="font-heading text-3xl leading-tight text-[var(--text-secondary)] md:text-5xl">
          <LocalizedText text={hasTitleTranslation ? displayTitle : content.title} />
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/90">
          <LocalizedText text={hasSubtitleTranslation ? displaySubtitle : content.subtitle} />
        </p>
      </section>

      {isPrayersPage && (
        <section className="mt-8">
          <LivePrayerView />
        </section>
      )}

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
                        className="block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-center text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                      >
                        <LocalizedText text={j} />
                      </Link>
                    ))}
                  </div>
                </Card>
              );
            }

            const slug = item.title.toLowerCase().replace(/\s+/g, "-");
            let target = item.path || `/${tradition}/prayers/${slug}`;
            
            if (item.title === "Prayer Rope Guide") {
              target = "/orthodox/prayers/prayer-rope/interactive";
            }
            
            // If the path is relative, prefix it with the current page path
            if (item.path && !item.path.startsWith('/')) {
              target = `/${tradition}/prayers/${item.path}`;
            }

            return (
              <Link key={item.title} to={target} className="group">
                <Card className="h-full transition-colors group-hover:border-[var(--accent)]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-lg text-[var(--text-secondary)]">
                      <LocalizedText text={item.title} />
                    </h3>
                    <div className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)]">
                      <LocalizedText text="Open" />
                    </div>
                  </div>
                  <LocalizedText as="p" className="mt-2 text-sm text-[var(--text-primary)]/85" text={item.description} />
                </Card>
              </Link>
            );
          }

          const slug = item.title.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-").replace(/[()]/g, "");
          let target = item.path ? item.path : `/${tradition}/${pageType}/${slug}`;
          
          // If the path is relative, prefix it with the current page path
          if (item.path && !item.path.startsWith('/')) {
            target = `/${tradition}/${pageType}/${item.path}`;
          }

          return (
            <Link key={item.title} to={target} className="group">
              <Card className="h-full transition-colors group-hover:border-[var(--accent)]">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl text-[var(--text-secondary)]">
                    <LocalizedText text={item.title} />
                  </h3>
                  <div className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)]">
                    <LocalizedText text="Open" />
                  </div>
                </div>
                <LocalizedText as="p" className="mt-2 text-[var(--text-primary)]/85" text={item.description} />
              </Card>
            </Link>
          );
        })}
      </section>
    </main>
  );
}