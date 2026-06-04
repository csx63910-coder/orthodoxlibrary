import Breadcrumbs from "../../../components/Breadcrumbs";
import Card from "../../../components/Card";
import ChantTabs from "../../../components/ChantTabs";
import SectionDivider from "../../../components/SectionDivider";
import LocalizedText from "../../../components/LocalizedText";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function OrthodoxChantPage() {
  const { t } = useTranslation();
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: 'home', to: "/" },
            { label: 'orthodox', to: "/orthodox" },
            { label: 'hymns_chant', to: "/orthodox/chant" },
          ]}
        />

        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">
          <LocalizedText text="hymns_chant" />
        </h1>
        <p className="mt-3 max-w-4xl text-lg text-[var(--text-primary)]/88">
          <LocalizedText text="Explore the rich musical traditions of the Orthodox Church through our curated media libraries." />
        </p>
        <ChantTabs />

        <SectionDivider label={t('dashboard_items.Chant Collections')} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/orthodox/chant/byzantine">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">
                <LocalizedText text="Byzantine Chant" />
              </h2>
              <p className="mt-2 text-sm">
                <LocalizedText text="Full curated media library featuring recordings from Mount Athos and other venerable sources." />
              </p>
            </Card>
          </Link>
          <Link to="/orthodox/chant/znamenny">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">
                <LocalizedText text="Russian Znamenny Chant" />
              </h2>
              <p className="mt-2 text-sm">
                <LocalizedText text={`Ancient monophonic "hook" notation style preserved by monasteries and Old Believer communities.`} />
              </p>
            </Card>
          </Link>
          <Link to="/orthodox/chant/serbian">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">
                <LocalizedText text="Serbian Orthodox Chant" />
              </h2>
              <p className="mt-2 text-sm">
                <LocalizedText text={`Serbian Byzantine chant, the "warrior" monastic style, and traditional choral arrangements.`} />
              </p>
            </Card>
          </Link>
          <Link to="/orthodox/chant/armenian">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">
                <LocalizedText text="Armenian Sharakan" />
              </h2>
              <p className="mt-2 text-sm">
                <LocalizedText text="Ancient hymns of the Armenian Apostolic Church, including works of Mesrop Mashtots and Commission." />
              </p>
            </Card>
          </Link>
          <Link to="/orthodox/chant/antiochian">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">
                <LocalizedText text="Antiochian Orthodox Chant" />
              </h2>
              <p className="mt-2 text-sm">
                <LocalizedText text="Liturgical hymns of the Antiochian tradition, featuring mixed Arabic and English arrangements." />
              </p>
            </Card>
          </Link>
          <Link to="/orthodox/chant/arabic">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">
                <LocalizedText text="Arabic Liturgical Hymns" />
              </h2>
              <p className="mt-2 text-sm">
                <LocalizedText text="Ancient and contemporary Byzantine hymns in the Arabic language." />
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}