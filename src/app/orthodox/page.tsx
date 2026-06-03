import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../components/Breadcrumbs";
import Card from "../../components/Card";
import LocalizedText from "../../components/LocalizedText";
import { getLocalized } from "../../utils/cn";
import { orthodoxSections } from "../siteData";

export default function OrthodoxDashboardPage() {
  const { t } = useTranslation();

  const getSectionKey = (title: string) => {
    return title.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_').replace(/'/g, '');
  };

  const getDashboardItemKey = (item: string) => {
    return item;
  };

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">{t('orthodox_page.title')}</h1>
      <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/88">
        {t('orthodox_page.description')}
      </p>

      <div className="mt-10 space-y-12">
        {orthodoxSections.map((section) => (
          <section key={section.path}>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-[var(--accent)]/10 p-2 text-[var(--accent)]">
                <section.icon size={24} />
              </div>
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">
                <LocalizedText text={getSectionKey(section.title)} />
              </h2>
            </div>
            
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
              {section.subItems.map((item) => {
                return (
                  <Card key={item.title} className="group hover:border-[var(--accent)] transition-all">
                    <Link to={item.path} className="flex h-full flex-col p-2">
                      <span className="font-heading text-lg text-[var(--text-secondary)] group-hover:text-[var(--accent)]">
                        <LocalizedText text={getDashboardItemKey(item.title)} />
                      </span>
                      <span className="mt-1 text-sm text-[var(--text-primary)]/70">
                        <LocalizedText text={t('dashboard_items.explore_resources', { item: getLocalized(getDashboardItemKey(item.title)) })} />
                      </span>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}