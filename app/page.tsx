import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionDivider from "../components/SectionDivider";
import LocalizedText from "../components/LocalizedText";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="sacred-surface min-h-screen">
      <Header />
      <main>
        <section className="smoke-background relative flex min-h-[92vh] items-center justify-center px-4 text-center">
          <div className="max-w-4xl">
            <div className="mb-6 text-7xl text-[var(--text-secondary)] drop-shadow-[0_0_18px_rgba(201,168,76,0.45)] md:text-9xl">✠</div>
            <p className="font-accent text-xl text-[var(--text-secondary)]">{t('landing.tagline')}</p>
            <h1 className="font-heading text-5xl leading-tight md:text-7xl">{t('landing.title')}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-xl text-[var(--text-primary)]/92">
              {t('landing.description')}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/orthodox"
                className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-6 py-2 text-[10px] font-semibold text-[var(--text-secondary)] shadow-lg hover:bg-[var(--bg-secondary)]"
              >
                {t('landing.enter_orthodox')}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h2 className="font-heading text-4xl text-[var(--text-secondary)]">{t('landing.dialogue_title')}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-xl text-[var(--text-primary)]/86">{t('landing.dialogue_desc')}</p>
          <div className="mt-12 flex justify-center">
            <Link to="/orthodox" className="w-full max-w-2xl">
              <Card className="hover:scale-[1.02] transition-transform duration-300">
                <h3 className="font-heading text-2xl text-[var(--text-secondary)]">{t('landing.orthodox_card_title')}</h3>
                <p className="mt-3 text-lg text-[var(--text-primary)]/85">{t('landing.orthodox_card_desc')}</p>
              </Card>
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20">
          <SectionDivider label={t('landing.highlights_title')} />
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h3 className="font-heading text-lg text-[var(--text-secondary)]">{t('landing.saint_title')}</h3>
              <LocalizedText as="p" className="mt-2" text="St. John Chrysostom: Teacher of repentance, mercy, and liturgical beauty." />
            </Card>
            <Card>
              <h3 className="font-heading text-lg text-[var(--text-secondary)]">{t('landing.scripture_title')}</h3>
              <LocalizedText as="p" className="mt-2" text='John 1:1-18 and Psalm 51. "Create in me a clean heart, O God."' />
            </Card>
            <Card>
              <h3 className="font-heading text-lg text-[var(--text-secondary)]">{t('landing.fasting_title')}</h3>
              <p className="mt-2">{t('landing.fasting_desc')}</p>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}