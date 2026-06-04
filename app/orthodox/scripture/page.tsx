import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Card from "../../../components/Card";
import SectionDivider from "../../../components/SectionDivider";
import LocalizedText from "../../../components/LocalizedText";

export default function OrthodoxScripturePage() {
  const { t } = useTranslation();
  const buttons = [
    { label: "Old Testament", to: "/orthodox/scripture/old-testament" },
    { label: "New Testament", to: "/orthodox/scripture/new-testament" },
    { label: "Full Bible", to: "/orthodox/scripture/full-bible" },
    { label: "Daily Scripture Readings", to: "/orthodox/scripture/daily-readings" },
    { label: "Commandments", to: "/orthodox/scripture/commandments" },
  ];

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
      <Breadcrumbs
        items={[
          { label: 'home', to: "/" },
          { label: 'orthodox', to: "/orthodox" },
          { label: 'holy_scripture', to: "/orthodox/scripture" },
        ]}
      />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">
        <LocalizedText text="holy_scripture" />
      </h1>
      <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/88">
        <LocalizedText text="Orthodox reading of Scripture is ecclesial and liturgical, rooted in prayer and the witness of the Fathers." />
      </p>
      <SectionDivider label={t('dashboard_items.Scripture Paths')} />
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
        {buttons.map((button) => (
          <Card key={button.label}>
            <Link
              to={button.to}
              className="inline-flex w-full items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-3 text-center font-heading text-[clamp(1rem,1.4vw,1.15rem)] text-[var(--text-secondary)] hover:bg-[var(--card)]"
            >
              <LocalizedText text={button.label} />
            </Link>
            <p className="mt-3 text-[var(--text-primary)]/85">
              <LocalizedText text="Curated patristic notes and liturgical reading guides." />
            </p>
          </Card>
        ))}
      </div>
      </div>
    </main>
  );
}