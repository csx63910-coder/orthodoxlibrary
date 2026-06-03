import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Breadcrumbs from "../components/Breadcrumbs";
import Card from "../components/Card";
import CrossReferenceLink from "../components/CrossReference";
import PrintButton from "../components/PrintButton";
import SectionDivider from "../components/SectionDivider";
import TableOfContents from "../components/TableOfContents";
import {
  churchFathers,
  councils,
  feastByTradition,
  findSaint,
  glossaryTerms,
  orthodoxBooks,
  orthodoxMysteries,
  orthodoxSaints,
  prayerByTradition,
} from "../data/hubData";
import { findIconSaintBySlug, iconSaintUrl } from "../data/iconSaintMap";
import { orthodoxTranslations, scriptureReferencePreview } from "../data/scriptureData";
import { orthodoxContent } from "./siteData";
import { getLocalized } from "../utils/cn";
import LocalizedText from "../components/LocalizedText";
import TraditionPage from "../components/TraditionPage";
import OrthodoxResourceTabs from "../components/OrthodoxResourceTabs";

import LivePrayerView from "../components/LivePrayerView";

const byId = <T extends { slug: string }>(items: T[], slug?: string) => items.find((item) => item.slug === slug);

export function LivePrayerViewPage() {
  const { t } = useTranslation();
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: "/" },
          { label: t('nav.orthodox'), to: "/orthodox" },
          { label: t('sections.prayer_book'), to: "/orthodox/prayers" },
          { label: "Live Prayer", to: "/orthodox/prayers/live" },
        ]}
      />
      <div className="mb-6">
        <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Live Prayer</h1>
        <p className="mt-2 text-lg text-[var(--text-primary)]/80">
          Real-time prayer recommendation based on the current hour of the day.
        </p>
      </div>
      <LivePrayerView />
    </main>
  );
}

const allSearchItems: Array<{ type: string; title: string; path: string; description?: string }> = [
  ...orthodoxSaints.map((item) => ({ type: "Saint", title: getLocalized(item.name), path: `/orthodox/saints/${item.slug}`, description: getLocalized(item.title) })),
  ...prayerByTradition("orthodox").map((item) => ({ type: "Prayer", title: getLocalized(item.title), path: `/orthodox/prayers/${item.slug}` })),
  ...glossaryTerms.map((item) => ({ type: "Glossary", title: getLocalized(item.term), path: `/glossary/${item.slug}`, description: getLocalized(item.definition) })),
  ...councils.map((item) => ({ type: "Catechism", title: getLocalized(item.name), path: `/orthodox/catechism/councils/${item.slug}` })),
  ...churchFathers.map((item) => ({ type: "Church Father", title: getLocalized(item.name), path: `/orthodox/catechism/fathers/${item.slug}` })),
  
  // Dynamic Page/Tab Search
  ...Object.entries(orthodoxContent).map(([slug, content]) => {
    let path = `/orthodox/${slug}`;
    if (slug === "dashboard") path = "/orthodox";
    if (["prayer-corner-setup", "family-devotions", "fasting-guidelines", "preparing-for-confession", "preparing-for-communion"].includes(slug)) {
      path = `/orthodox/home-worship/${slug}`;
    }
    return { type: "Orthodox Section", title: content.title, path, description: content.subtitle };
  }),
  
  // Specific Sub-Items from Content
  ...Object.entries(orthodoxContent).flatMap(([slug, content]) => 
    content.items.map(item => {
      let path = `/orthodox/${slug}`;
      if (["prayer-corner-setup", "family-devotions", "fasting-guidelines", "preparing-for-confession", "preparing-for-communion"].includes(slug)) {
        path = `/orthodox/home-worship/${slug}`;
      }
      return { type: "Topic", title: item.title, path, description: item.description };
    })
  ),
];

export function SaintDetailPage({ tradition }: { tradition: "orthodox" }) {
  const { saintSlug } = useParams();
  const saint = findSaint(saintSlug ?? "", tradition);
  if (!saint) return <NotFoundContent title="Saint not found" />;

  const crumbs = [
    { label: 'home', to: "/" },
    { label: tradition, to: `/${tradition}` },
    { label: 'saints', to: `/${tradition}/saints` },
    { label: getLocalized(saint.name), to: `/${tradition}/saints/${saint.slug}` },
  ];

  const iconEntry = findIconSaintBySlug(saint.slug);
  const iconImage = iconEntry
    ? iconSaintUrl(iconEntry.folder, iconEntry.sampleImages[0])
    : null;

  return (
    <main className="saint-print-page px-4 py-8 md:px-8">
      <Breadcrumbs items={crumbs} />
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{getLocalized(saint.name)}</h1>
          <p className="mt-2 text-lg">{getLocalized(saint.title)}</p>
        </div>
        <PrintButton />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {iconImage ? (
            <Card className="overflow-hidden">
              <img
                src={iconImage}
                alt={`Icon of ${getLocalized(saint.name)}`}
                className="mx-auto max-h-[60vh] w-auto rounded-md object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <p className="mt-2 text-center text-xs text-[var(--text-primary)]/60">
                Icon from the ICONSAINT dataset
              </p>
            </Card>
          ) : (
            <Card>
              <p className="font-accent text-2xl">Sacred Art Placeholder</p>
              <p className="mt-2 text-sm text-[var(--text-primary)]/80">Icon panel or painting slot for devotional focus.</p>
            </Card>
          )}
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Feast Day</h2>
            <p>{getLocalized(saint.feastDay)}</p>
            {saint.calendarNote && <p className="text-sm text-[var(--text-primary)]/75">{getLocalized(saint.calendarNote)}</p>}
          </Card>
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">
              Troparion / Kontakion
            </h2>
            <p className="italic">{getLocalized(saint.hymnOrCollect)}</p>
          </Card>
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Biography</h2>
            {saint.biography.map((paragraph: any, idx: number) => (
              <p className="mt-3 leading-relaxed" key={idx}>
                {getLocalized(paragraph)}
              </p>
            ))}
          </Card>
          {saint.quote && (
            <Card>
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">Notable Quote</h2>
              <blockquote className="mt-2 border-l-2 border-[var(--accent)] pl-3 italic">"{getLocalized(saint.quote)}"</blockquote>
            </Card>
          )}
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Associated Prayers</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {saint.prayers.map((prayer: any) => (
                <Link
                  key={prayer.path}
                  to={prayer.path}
                  className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-3 py-2 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                >
                  {getLocalized(prayer.label)}
                </Link>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          {saint.patronage && (
            <Card>
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">Patronage</h2>
              <p className="mt-2">{getLocalized(saint.patronage)}</p>
            </Card>
          )}
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Related Saints</h2>
            <ul className="mt-2 space-y-2">
              {saint.related.map((slug: string) => {
                const related = findSaint(slug, tradition);
                if (!related) return null;
                return (
                  <li key={slug}>
                    <Link
                      to={`/${tradition}/saints/${slug}`}
                      className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-3 py-2 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] inline-block"
                    >
                      {getLocalized(related.name)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
          <Card>
            <Link to={`/${tradition}/saints`} className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-4 py-2 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] inline-block">
              Back to Saints
            </Link>
          </Card>
        </div>
      </div>
    </main>
  );
}

export function PrayerDetailPage({ tradition }: { tradition: "orthodox" }) {
  const { t } = useTranslation();
  const { prayerSlug } = useParams();
  const prayer = prayerByTradition(tradition).find((item) => item.slug === prayerSlug);
  if (!prayer) return <NotFoundContent title="Prayer not found" />;

  const isCategory = ["evening-prayers", "midnight-office", "akathist-hymns", "morning-prayers"].includes(prayer.slug);

  const toc = [
    { id: "text", label: isCategory ? "Overview" : "Prayer Text" },
    { id: "history", label: "History" },
    { id: "rubrics", label: "Rubrics" },
  ];

  const categoryRelated = isCategory ? prayer.related : [];

  return (
    <main className="prayer-print-page px-4 py-8 md:px-8">
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: "/" },
          { label: t('nav.orthodox'), to: `/${tradition}` },
          { label: t('sections.prayer_book'), to: `/${tradition}/prayers` },
          { label: getLocalized(prayer.title), to: `/${tradition}/prayers/${prayer.slug}` },
        ]}
      />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{getLocalized(prayer.title)}</h1>
        <PrintButton />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="space-y-4">
          <div id="text">
            <Card className="leading-relaxed">
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">
                {isCategory ? "Category Overview" : "Complete Prayer Text"}
              </h2>
              <p className="mt-3 text-lg">{getLocalized(prayer.text)}</p>
              
              {isCategory && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {categoryRelated.map((slug) => {
                    const subPrayer = prayerByTradition(tradition).find((p) => p.slug === slug);
                    if (!subPrayer) return null;
                    return (
                      <Link
                        key={slug}
                        to={`/${tradition}/prayers/${slug}`}
                        className="group flex flex-col rounded-lg border border-[var(--border)]/40 bg-[var(--bg-secondary)] p-3 transition-colors hover:border-[var(--accent)]"
                      >
                        <span className="font-heading text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)]">
                          {getLocalized(subPrayer.title)}
                        </span>
                        <span className="mt-1 text-xs text-[var(--text-primary)]/70 line-clamp-1">
                          {getLocalized(subPrayer.text).substring(0, 60)}...
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>
          {prayer.original && (
            <Card>
              <h2 className="font-heading text-xl text-[var(--text-secondary)]">Original Language ({prayer.language})</h2>
              <p className="mt-3">{prayer.original}</p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">
                Listen (audio placeholder)
              </button>
            </Card>
          )}
          {prayer.history && prayer.history.length > 0 && (
            <div id="history">
              <Card>
                <h2 className="font-heading text-xl text-[var(--text-secondary)]">Background</h2>
                {prayer.history.map((text, idx) => (
                  <p key={idx} className="mt-2">
                    {getLocalized(text)}
                  </p>
                ))}
              </Card>
            </div>
          )}
          {(prayer.when || prayer.rubrics) && (
            <div id="rubrics">
              <Card>
                <h2 className="font-heading text-xl text-[var(--text-secondary)]">When and How to Pray</h2>
                {prayer.when && <p className="mt-2">{getLocalized(prayer.when)}</p>}
                {prayer.rubrics && <p className="mt-2">{getLocalized(prayer.rubrics)}</p>}
                <div className="mt-4">
                  <h3 className="font-heading text-lg">Related</h3>
                  <ul className="mt-2 space-y-2">
                    {prayer.related.map((slug) => {
                      const related = prayerByTradition(tradition).find((item) => item.slug === slug);
                      if (!related) return null;
                      return (
                        <li key={slug}>
                          <Link className="xref-link xref-prayer" to={`/${tradition}/prayers/${slug}`}>
                            {getLocalized(related.title)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Card>
            </div>
          )}
        </div>
        <TableOfContents items={toc} />
      </div>
    </main>
  );
}

export function FeastDetailPage({ tradition }: { tradition: "orthodox" }) {
  const { t } = useTranslation();
  const { feastSlug } = useParams();
  const feast = feastByTradition(tradition).find((item) => item.slug === feastSlug);
  if (!feast) return <NotFoundContent title={t('errors.feast_not_found') || "Feast not found"} />;

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: "/" },
          { label: t('nav.orthodox'), to: `/${tradition}` },
          { label: t('nav.calendar'), to: `/${tradition}/calendar` },
          { label: getLocalized(feast.name), to: `/${tradition}/calendar/feasts/${feast.slug}` },
        ]}
      />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{getLocalized(feast.name)}</h1>
      <p className="mt-2 text-lg">{getLocalized(feast.date)}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Celebrated By" />
          <p className="mt-2">{getLocalized(feast.traditions)}</p>
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Liturgical Readings" />
          {feast.readings.map((reading) => (
            <p key={reading} className="mt-2">
              <CrossReferenceLink
                to={`/${tradition}/scripture/reader`}
                label={reading}
                type="scripture"
                preview={<LocalizedText as="p" text={scriptureReferencePreview[reading] ?? "Open in scripture reader."} />}
                fullChapterLink={`/${tradition}/scripture/reader`}
              />
            </p>
          ))}
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Hymn / Proper" />
          <p className="mt-2 italic">{getLocalized(feast.hymnOrCollect)}</p>
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Fasting & Preparation" />
          <p className="mt-2">{getLocalized(feast.fasting)}</p>
        </Card>
      </div>
      <SectionDivider label={t('sections.historical_background') || "Historical Background"} />
      <div className="space-y-3">
        {feast.history.map((item, idx) => (
          <p key={idx}>{getLocalized(item)}</p>
        ))}
      </div>
    </main>
  );
}

function scriptureSource() {
  return orthodoxTranslations;
}

const slugifyBook = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const BYZ_JSON_URL = "/byz/Byz.json";
const KJV_BASE = "kjv";

type KJVBook = { slug: string; name: string; file: string };
type KJVChapter = { chapter: number; verses: Array<{ verse: number; text: string }> };
type KJVBookPayload = { book: string; chapters: Array<{ chapter: string; verses: Array<{ verse: string; text: string }> }> };

const ntBookNames = new Set([
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "I Corinthians", "II Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "I Thessalonians", "II Thessalonians", "I Timothy", "II Timothy", "Titus", "Philemon", "Hebrews", "James", "I Peter", "II Peter", "I John", "II John", "III John", "Jude", "Revelation", "Revelation of John",
]);

const greekResourcesBooks = [
  { slug: "genesis", name: "Genesis", file: "Gen" }, { slug: "exodus", name: "Exodus", file: "Exod" }, { slug: "leviticus", name: "Leviticus", file: "Lev" }, { slug: "numbers", name: "Numbers", file: "Num" }, { slug: "deuteronomy", name: "Deuteronomy", file: "Deut" }, { slug: "joshua", name: "Joshua (Jesus of Nave)", file: "JoshB" }, { slug: "judges", name: "Judges", file: "JudgB" }, { slug: "ruth", name: "Ruth", file: "Ruth" }, { slug: "1-kingdoms", name: "1 Kingdoms (1 Samuel)", file: "1Sam" }, { slug: "2-kingdoms", name: "2 Kingdoms (2 Samuel)", file: "2Sam" }, { slug: "3-kingdoms", name: "3 Kingdoms (1 Kings)", file: "1Kgs" }, { slug: "4-kingdoms", name: "4 Kingdoms (2 Kings)", file: "2Kgs" }, { slug: "1-paralipomenon", name: "1 Paralipomenon (1 Chronicles)", file: "1Chr" }, { slug: "2-paralipomenon", name: "2 Paralipomenon (2 Chronicles)", file: "2Chr" }, { slug: "1-esdras", name: "1 Esdras (Greek Ezra)", file: "1Esd" }, { slug: "2-esdras", name: "2 Esdras (Ezra and Nehemiah)", file: "2Esd" }, { slug: "judith", name: "Judith", file: "Jdt" }, { slug: "esther", name: "Esther (with Greek additions)", file: "Esth" }, { slug: "1-maccabees", name: "1 Maccabees", file: "1Macc" }, { slug: "2-maccabees", name: "2 Maccabees", file: "2Macc" }, { slug: "3-maccabees", name: "3 Maccabees", file: "3Macc" }, { slug: "psalms", name: "Psalms (including Psalm 151)", file: "Ps" }, { slug: "job", name: "Job", file: "Job" }, { slug: "proverbs", name: "Proverbs", file: "Prov" }, { slug: "ecclesiastes", name: "Ecclesiastes", file: "Eccl" }, { slug: "song-of-solomon", name: "Song of Solomon", file: "Song" }, { slug: "wisdom-of-solomon", name: "Wisdom of Solomon", file: "Wis" }, { slug: "wisdom-of-sirach", name: "Wisdom of Sirach (Ecclesiasticus)", file: "Sir" }, { slug: "hosea", name: "Hosea", file: "Hos" }, { slug: "joel", name: "Joel", file: "Joel" }, { slug: "amos", name: "Amos", file: "Amos" }, { slug: "obadiah", name: "Obadiah", file: "Obad" }, { slug: "jonah", name: "Jonah", file: "Jonah" }, { slug: "micah", name: "Mic", file: "Mic" }, { slug: "nahum", name: "Nah", file: "Nah" }, { slug: "habakkuk", name: "Hab", file: "Hab" }, { slug: "zephaniah", name: "Zeph", file: "Zeph" }, { slug: "haggai", name: "Hag", file: "Hag" }, { slug: "zechariah", name: "Zech", file: "Zech" }, { slug: "malachi", name: "Mal", file: "Mal" }, { slug: "isaiah", name: "Isa", file: "Isa" }, { slug: "jeremiah", name: "Jer", file: "Jer" }, { slug: "baruch", name: "Bar", file: "Bar" }, { slug: "lamentations", name: "Lam", file: "Lam" }, { slug: "letter-of-jeremiah", name: "EpJer", file: "EpJer" }, { slug: "ezekiel", name: "Ezek", file: "Ezek" }, { slug: "daniel", name: "DanTh", file: "DanTh" },
];

const ntSlugs = new Set([
  "matthew", "mark", "luke", "john", "acts", "romans", "1-corinthians", "2-corinthians", "galatians", "ephesians", "philippians", "colossians", "1-thessalonians", "2-thessalonians", "1-timothy", "2-timothy", "titus", "philemon", "hebrews", "james", "1-peter", "2-peter", "1-john", "2-john", "3-john", "jude", "revelation",
]);

export function ScriptureReader({ tradition }: { tradition: "orthodox" }) {
  const { t } = useTranslation();
  const { bookSlug, chapterNumber } = useParams();
  const [searchParams] = useSearchParams();
  const source = scriptureSource();
  const initialTranslation = useMemo(() => {
    const v = searchParams.get("version");
    if (v === "kjv") return "King James Version";
    if (v === "lxx") return "Septuagint";
    return getLocalized(source[0].translation);
  }, [searchParams, source]);
  const [translation, setTranslation] = useState<string>(initialTranslation);

  useEffect(() => {
    setTranslation(initialTranslation);
  }, [initialTranslation]);

  const [fontSize, setFontSize] = useState<"text-sm" | "text-base" | "text-lg" | "text-xl">("text-base");
  const [lxxBooks, setLxxBooks] = useState<Array<{ slug: string; name: string; file: string }>>([]);
  const [lxxBookCache, setLxxBookCache] = useState<Record<string, Record<string, Array<{ key: string; lemma: string }>>>>({});
  const [lxxChapters, setLxxChapters] = useState<number[]>([]);
  const [lxxVerses, setLxxVerses] = useState<{ verse: number; text: string }[]>([]);
  const [byzBooks, setByzBooks] = useState<
    Array<{ slug: string; name: string; chapters: Array<{ chapter: number; verses: Array<{ verse: number; text: string }> }> }>
  >([]);
  const [kjvBooks, setKjvBooks] = useState<KJVBook[]>([]);
  const [kjvBookCache, setKjvBookCache] = useState<Record<string, KJVChapter[]>>({});
  const [kjvChapters, setKjvChapters] = useState<number[]>([]);
  const [kjvVerses, setKjvVerses] = useState<Array<{ verse: number; text: string }>>([]);

  const selectedSlug = bookSlug ?? "genesis";
  const isRemoteByz = tradition === "orthodox" && translation === "Septuagint" && ntSlugs.has(selectedSlug);
  const isRemoteLxx = tradition === "orthodox" && translation === "Septuagint" && !isRemoteByz;
  const isRemoteKJV = translation === "King James Version";

  useEffect(() => {
    if (!isRemoteLxx || lxxBooks.length > 0) return;
    setLxxBooks(greekResourcesBooks);
  }, [isRemoteLxx, lxxBooks.length]);

  useEffect(() => {
    if (!isRemoteByz || byzBooks.length > 0) return;
    let active = true;

    const loadByz = async () => {
      try {
        const response = await fetch(BYZ_JSON_URL);
        if (!response.ok) throw new Error("Could not fetch Byz.json");
        const payload = await response.json();
        const parsedBooks = (payload.books ?? [])
          .filter((book: any) => ntBookNames.has(book.name))
          .map((book: any) => {
            const slug = slugifyBook(book.name.replace(" of John", ""));
            return { ...book, slug };
          });
        if (!active) return;
        setByzBooks(parsedBooks);
      } catch (error) {
        console.error(error);
      }
    };

    loadByz();
    return () => { active = false; };
  }, [isRemoteByz, byzBooks.length]);

  useEffect(() => {
    if (!isRemoteKJV || kjvBooks.length > 0) return;
    let active = true;

    const loadKjvBooks = async () => {
      try {
        const lang = (i18next.language || 'en').split('-')[0];
        const langPath = ['el', 'ru'].includes(lang) ? `/data/kjv/${lang}` : `/${KJV_BASE}`;
        const response = await fetch(`${langPath}/books.json`);
        if (!response.ok) throw new Error("Could not fetch KJV books.json");
        const books = (await response.json()) as KJVBook[];
        if (!active) return;
        setKjvBooks(books);
      } catch (error) {
        console.error(error);
      }
    };

    loadKjvBooks();
    return () => { active = false; };
  }, [isRemoteKJV, kjvBooks.length]);

  useEffect(() => {
    if (!isRemoteLxx || lxxBooks.length === 0) {
      setLxxChapters([]);
      setLxxVerses([]);
      return;
    }

    const selectedSlug = bookSlug ?? "genesis";
    const selectedBook = lxxBooks.find((book) => book.slug === selectedSlug) ?? lxxBooks[0];
    const chapterNum = Number(chapterNumber) || 1;

    const buildChapterData = (bookData: Record<string, Array<{ key: string; lemma: string }>>) => {
      const chapterSet = new Set<number>();
      const verseRows: { verse: number; text: string }[] = [];

      Object.entries(bookData).forEach(([reference, tokens]) => {
        const parts = reference.split(".");
        if (parts.length < 3) return;
        const chapter = Number(parts[1]);
        const verse = Number(parts[2]);
        if (Number.isNaN(chapter) || Number.isNaN(verse)) return;
        chapterSet.add(chapter);
        if (chapter === chapterNum) {
          const text = tokens.map((token) => token.lemma || token.key).join(" ");
          verseRows.push({ verse, text });
        }
      });

      verseRows.sort((a, b) => a.verse - b.verse);
      setLxxChapters(Array.from(chapterSet).sort((a, b) => a - b));
      setLxxVerses(verseRows);
    };

    const cached = lxxBookCache[selectedBook.slug];
    if (cached) {
      buildChapterData(cached);
      return;
    }

    let active = true;
    const loadBook = async () => {
      try {
        const response = await fetch(`/lxx/${selectedBook.file}.js`);
        if (!response.ok) throw new Error(`Could not fetch ${selectedBook.file}.js`);
        const jsText = (await response.text()).trim();
        const parsed = new Function(`return (${jsText});`)() as Record<string, Array<{ key: string; lemma: string }>>;
        if (!active) return;
        setLxxBookCache((prev) => ({ ...prev, [selectedBook.slug]: parsed }));
        buildChapterData(parsed);
      } catch (error) {
        console.error(error);
        setLxxChapters([]);
        setLxxVerses([]);
      }
    };

    loadBook();
    return () => { active = false; };
  }, [isRemoteLxx, lxxBooks, lxxBookCache, bookSlug, chapterNumber]);

  useEffect(() => {
    if (!isRemoteKJV || kjvBooks.length === 0) {
      setKjvChapters([]);
      setKjvVerses([]);
      return;
    }

    const chapterNum = Number(chapterNumber) || 1;
    const currentSlug = bookSlug ?? "genesis";
    const selectedBook = kjvBooks.find((book) => book.slug === currentSlug) ?? kjvBooks[0];
    if (!selectedBook) return;

    const cached = kjvBookCache[selectedBook.slug];
    if (cached) {
      setKjvChapters(cached.map((ch) => ch.chapter));
      setKjvVerses(cached.find((ch) => ch.chapter === chapterNum)?.verses ?? []);
      return;
    }

    let active = true;
    const loadKjvBook = async () => {
      try {
        const lang = (i18next.language || 'en').split('-')[0];
        const langPath = ['el', 'ru'].includes(lang) ? `/data/kjv/${lang}` : `/${KJV_BASE}`;
        const response = await fetch(`${langPath}/${selectedBook.file}`);
        if (!response.ok) throw new Error(`Could not fetch ${selectedBook.file}`);
        const payload = (await response.json()) as KJVBookPayload;
        const normalized: KJVChapter[] = (payload.chapters ?? []).map((ch) => ({
          chapter: Number(ch.chapter),
          verses: (ch.verses ?? []).map((verse) => ({ verse: Number(verse.verse), text: verse.text })),
        }));
        if (!active) return;
        setKjvBookCache((prev) => ({ ...prev, [selectedBook.slug]: normalized }));
        setKjvChapters(normalized.map((ch) => ch.chapter));
        setKjvVerses(normalized.find((ch) => ch.chapter === chapterNum)?.verses ?? []);
      } catch (error) {
        console.error(error);
        setKjvChapters([]);
        setKjvVerses([]);
      }
    };

    loadKjvBook();
    return () => { active = false; };
  }, [isRemoteKJV, kjvBooks, kjvBookCache, bookSlug, chapterNumber]);

  const translationData = source.find((item) => getLocalized(item.translation) === translation) ?? source[0];
  const loadedBook = translationData.books.find((book) => book.slug === bookSlug) ?? translationData.books[0];
  const chapter = loadedBook.chapters.find((item) => item.chapter === Number(chapterNumber)) ?? loadedBook.chapters[0];
  const currentChapter = Number(chapterNumber) || chapter.chapter;
  
  const byzBook = byzBooks.find((book) => book.slug === selectedSlug);
  const byzChapters = byzBook?.chapters.map((item) => item.chapter) ?? [];
  const byzVerses = byzBook?.chapters.find((item) => item.chapter === currentChapter)?.verses ?? [];
  
  const activeVerses = isRemoteByz ? byzVerses : isRemoteKJV ? kjvVerses : isRemoteLxx && lxxVerses.length > 0 ? lxxVerses : chapter.verses;
  
  const chapterSequence = isRemoteByz && byzChapters.length > 0 ? byzChapters : isRemoteKJV && kjvChapters.length > 0 ? kjvChapters : isRemoteLxx && lxxChapters.length > 0 ? lxxChapters : loadedBook.chapters.map((item) => item.chapter);
  
  const prevChapterNum = chapterSequence[chapterSequence.indexOf(currentChapter) - 1];
  const nextChapterNum = chapterSequence[chapterSequence.indexOf(currentChapter) + 1];
  const versionQuery = isRemoteKJV ? "?version=kjv" : isRemoteByz ? "?version=byz" : isRemoteLxx ? "?version=lxx" : "";

  return (
    <main className="scripture-print-page px-4 py-8 md:px-8">
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: "/" },
          { label: t('nav.orthodox'), to: `/${tradition}` },
          { label: t('sections.holy_scripture'), to: `/${tradition}/scripture` },
          { label: "Reader", to: `/${tradition}/scripture/reader` },
        ]}
      />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)]" text="Scripture Reader" />
        <div className="flex items-center gap-2">
          <select value={translation} onChange={(event) => setTranslation(event.target.value)} className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)]">
            {source.map((item) => (
              <option key={getLocalized(item.translation)} value={getLocalized(item.translation)}>
                {getLocalized(item.translation)}
              </option>
            ))}
          </select>
          <PrintButton />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[260px_1fr_240px]">
        <Card className="max-h-[72vh] overflow-y-auto">
          <LocalizedText as="h2" className="font-heading text-lg text-[var(--text-secondary)]" text="Books" />
          <div className="mt-2 space-y-1">
            {translationData.books.map((book) => (
              <Link
                key={book.slug}
                to={`/${tradition}/scripture/${book.slug}/1${versionQuery}`}
                className={`block rounded-md px-2 py-1 text-sm ${book.slug === bookSlug ? "bg-[var(--accent)]/10 text-[var(--accent)] font-medium" : "hover:bg-[var(--bg-secondary)]"}`}
              >
                {getLocalized(book.name)}
              </Link>
            ))}
          </div>
        </Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl text-[var(--text-secondary)]">
              {getLocalized(loadedBook.name)} {currentChapter}
            </h2>
            <div className="flex gap-2">
              <button onClick={() => setFontSize("text-sm")} className={`rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] ${fontSize === "text-sm" ? "border-[var(--accent)] bg-[var(--bg-secondary)]" : ""}`}>A</button>
              <button onClick={() => setFontSize("text-base")} className={`rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] ${fontSize === "text-base" ? "border-[var(--accent)] bg-[var(--bg-secondary)]" : ""}`}>A</button>
              <button onClick={() => setFontSize("text-lg")} className={`rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] ${fontSize === "text-lg" ? "border-[var(--accent)] bg-[var(--bg-secondary)]" : ""}`}>A</button>
              <button onClick={() => setFontSize("text-xl")} className={`rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] ${fontSize === "text-xl" ? "border-[var(--accent)] bg-[var(--bg-secondary)]" : ""}`}>A</button>
            </div>
          </div>
          <Card className={`${fontSize} leading-relaxed`}>
            {activeVerses.map((v) => (
              <p key={v.verse} className="mb-3">
                <span className="mr-2 select-none text-xs font-bold text-[var(--text-primary)]/40">{v.verse}</span>
                {getLocalized(v.text)}
              </p>
            ))}
          </Card>
          <div className="flex justify-between mt-6">
            {prevChapterNum ? (
              <Link to={`/${tradition}/scripture/${bookSlug}/${prevChapterNum}${versionQuery}`} className="flex items-center gap-1 text-[var(--accent)]">
                ← Chapter {prevChapterNum}
              </Link>
            ) : <div />}
            {nextChapterNum ? (
              <Link to={`/${tradition}/scripture/${bookSlug}/${nextChapterNum}${versionQuery}`} className="flex items-center gap-1 text-[var(--accent)]">
                Chapter {nextChapterNum} →
              </Link>
            ) : <div />}
          </div>
        </div>
        <Card className="max-h-[72vh] overflow-y-auto">
          <LocalizedText as="h2" className="font-heading text-lg text-[var(--text-secondary)]" text="Chapters" />
          <div className="mt-2 grid grid-cols-4 gap-1">
            {chapterSequence.map((num) => (
              <Link
                key={num}
                to={`/${tradition}/scripture/${bookSlug}/${num}${versionQuery}`}
                className={`flex h-8 items-center justify-center rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] ${num === currentChapter ? "border-[var(--accent)] bg-[var(--bg-secondary)]" : ""}`}
              >
                {num}
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}

export function MysteryPage({ tradition }: { tradition: "orthodox" }) {
  const { mysterySlug } = useParams();
  const mystery = orthodoxMysteries.find((m) => m.slug === mysterySlug);
  if (!mystery) return <NotFoundContent title="Mystery not found" />;

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: tradition, to: `/${tradition}` }, { label: 'catechism', to: `/${tradition}/catechism` }, { label: mystery.name, to: `/${tradition}/catechism/sacraments/${mystery.slug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{mystery.name}</h1>
      <Card className="mt-6">
        <p className="text-lg leading-relaxed">The mysteries (sacraments) are holy rites through which the Grace of God is imparted to the faithful. {mystery.name} is a central part of the Church's life.</p>
      </Card>
      <SectionDivider label="Details" />
      <p>Further theological explanation and liturgical rubrics for {mystery.name} are available in the full catechism library.</p>
    </main>
  );
}

export function BookDetailPage({ tradition }: { tradition: "orthodox" }) {
  const { bookSlug } = useParams();
  const book = orthodoxBooks.find((b) => b.toLowerCase().replace(/\s+/g, "-") === bookSlug);
  if (!book) return <NotFoundContent title="Book not found" />;

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: tradition, to: `/${tradition}` }, { label: 'resources', to: `/${tradition}/resources` }, { label: book, to: `/${tradition}/resources/books/${bookSlug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{book}</h1>
      <Card className="mt-6">
        <p className="text-lg leading-relaxed">This recommended book provides deep insights into the spiritual life and traditions of the {tradition} Church.</p>
      </Card>
    </main>
  );
}

export function CouncilDetailPage() {
  const { councilSlug } = useParams();
  const council = byId(councils, councilSlug);
  if (!council) return <NotFoundContent title="Council not found" />;

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'catechism', to: "/orthodox/catechism" }, { label: council.name, to: `/orthodox/catechism/councils/${council.slug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{council.name}</h1>
      <Card className="mt-6">
        <p className="text-lg leading-relaxed">{council.details}</p>
      </Card>
    </main>
  );
}

export function FatherDetailPage() {
  const { fatherSlug } = useParams();
  const father = byId(churchFathers, fatherSlug);
  if (!father) return <NotFoundContent title="Father not found" />;

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'catechism', to: "/orthodox/catechism" }, { label: father.name, to: `/orthodox/catechism/fathers/${father.slug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{father.name}</h1>
      <Card className="mt-6">
        <p className="text-lg leading-relaxed">{father.details}</p>
      </Card>
    </main>
  );
}

export function GlossaryDetailPage() {
  const { glossarySlug } = useParams();
  const term = byId(glossaryTerms, glossarySlug);
  if (!term) return <NotFoundContent title="Term not found" />;

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'glossary', to: "/glossary" }, { label: getLocalized(term.term), to: `/glossary/${term.slug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{getLocalized(term.term)}</h1>
      <p className="mt-2 text-lg italic text-[var(--text-primary)]/70">{term.original} ({term.pronunciation})</p>
      <Card className="mt-6">
        <p className="text-lg leading-relaxed">{getLocalized(term.definition)}</p>
      </Card>
    </main>
  );
}

export function TodayDashboard({ tradition: _tradition }: { tradition: "orthodox" }) {
  const { t } = useTranslation();
  const today = new Date();
  const saint = orthodoxSaints[today.getDate() % orthodoxSaints.length];
  const feast = feastByTradition("orthodox")[today.getDate() % (feastByTradition("orthodox").length || 1)];
  const [jurisdiction, setJurisdiction] = useState("Greek");
  const readings = ["John 1:1-18", "Psalm 50"];

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: "orthodox", to: "/orthodox" }, { label: 'today', to: "/orthodox/today" }]} />
      <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)]" text="Daily Dashboard" />
      <p className="mt-2">
        <LocalizedText text={today.toDateString()} /> {t('dashboard.julian_equivalent') || "- Julian equivalent shown in jurisdictional calendars."}
      </p>
      <select className="mt-3 rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)]" value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}>
        {["Greek", "Serbian", "Russian", "Armenian", "Antiochian"].map((item) => (
          <option key={item}><LocalizedText text={item} /></option>
        ))}
      </select>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Today's Saint" />
          <CrossReferenceLink to={`/orthodox/saints/${saint.slug}`} label={getLocalized(saint.name)} type="saint" preview={<LocalizedText as="p" text={getLocalized(saint.title)} />} />
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Today's Readings" />
          {readings.map((reading) => (
            <p key={reading}>
              <CrossReferenceLink to={`/orthodox/scripture/reader`} label={reading} type="scripture" preview={<LocalizedText as="p" text={scriptureReferencePreview[reading] ?? "Open chapter in reader."} />} fullChapterLink={`/orthodox/scripture/reader`} />
            </p>
          ))}
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Fasting Rule" />
          <LocalizedText as="p" text="Wine and oil allowed" />
          <Link className="mt-2 inline-block rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]" to={`/orthodox/fasting`}>
            <LocalizedText text="Open fasting guide" />
          </Link>
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Liturgical Season" />
          <LocalizedText as="p" text="Great Lent - Purple" />
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Feast Day" />
          {feast && <CrossReferenceLink to={`/orthodox/calendar/feasts/${feast.slug}`} label={getLocalized(feast.name)} type="feast" preview={<LocalizedText as="p" text={getLocalized(feast.date)} />} />}
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Prayer of the Day" />
          <CrossReferenceLink to={`/orthodox/prayers/jesus-prayer`} label="Jesus Prayer" type="prayer" preview={<LocalizedText as="p" text="Open full prayer text and rubrics." />} />
        </Card>
      </div>
      <LocalizedText as="blockquote" className="mt-6 border-l-2 border-[var(--accent)] pl-4 italic" text='"Let us become all flame for Christ by prayer and mercy."' />
      <div className="mt-4 flex gap-4">
        <Link to={`/orthodox/prayers/morning-prayers`} className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-4 py-2 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">
          <LocalizedText text="Morning Prayer" />
        </Link>
        <Link to={`/orthodox/prayers/prayer-after-communion`} className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-4 py-2 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">
          <LocalizedText text="Evening Prayer" />
        </Link>
      </div>
      <p className="mt-3 text-sm text-[var(--text-primary)]/75"><LocalizedText text="Current jurisdiction:" /> <LocalizedText text={jurisdiction} /></p>
    </main>
  );
}

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const results = allSearchItems.filter(item => item.title.toLowerCase().includes(query) || (item.description?.toLowerCase().includes(query)));

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'search', to: "/search" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Search Hub</h1>
      <div className="mt-6 space-y-4">
        {results.length > 0 ? results.map((item, idx) => (
          <Card key={idx}>
            <Link to={item.path} className="group">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">{item.type}</span>
              <h2 className="font-heading text-xl text-[var(--text-secondary)] group-hover:underline">{item.title}</h2>
              {item.description && <p className="mt-1 text-sm text-[var(--text-primary)]/80">{item.description}</p>}
            </Link>
          </Card>
        )) : <p>No results found for "{query}".</p>}
      </div>
    </main>
  );
}

export function OrthodoxDeepIndex() {
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'deep-links', to: "/orthodox/deep-links" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Deep Index</h1>
      <Card className="mt-6">
        <ul className="space-y-2">
          {allSearchItems.filter(i => i.path.startsWith("/orthodox")).map((item, idx) => (
            <li key={idx}>
              <Link to={item.path} className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] inline-block">
                {item.title} ({item.type})
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </main>
  );
}

export function GlossaryIndexPage() {
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'glossary', to: "/glossary" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Glossary</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {glossaryTerms.map((term) => (
          <Card key={term.slug}>
            <Link to={`/glossary/${term.slug}`} className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-3 py-2 text-[10px] font-heading text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] inline-block mb-2">
              {getLocalized(term.term)}
            </Link>
            <p className="mt-2 text-sm italic">{term.original}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}

export function CouncilsIndexPage() {
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'catechism', to: "/orthodox/catechism" }, { label: 'councils', to: "/orthodox/catechism/councils" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Ecumenical Councils</h1>
      <div className="mt-6 space-y-4">
        {councils.map((council) => (
          <Card key={council.slug}>
            <Link to={`/orthodox/catechism/councils/${council.slug}`} className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-3 py-2 text-[10px] font-heading text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] inline-block mb-2">
              {council.name}
            </Link>
            <p className="mt-2">{council.details}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}

export function FathersIndexPage() {
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'catechism', to: "/orthodox/catechism" }, { label: 'fathers', to: "/orthodox/catechism/fathers" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Church Fathers</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {churchFathers.map((father) => (
          <Card key={father.slug}>
            <Link to={`/orthodox/catechism/fathers/${father.slug}`} className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-3 py-2 text-[10px] font-heading text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] inline-block mb-2">
              {father.name}
            </Link>
            <p className="mt-2 text-sm">{father.details}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}

export function FastingPage({ tradition }: { tradition: "orthodox" }) {
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: tradition, to: `/${tradition}` }, { label: 'fasting', to: `/${tradition}/fasting` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Fasting Guide</h1>
      <Card className="mt-6">
        <p className="text-lg leading-relaxed">Fasting is a spiritual tool for discipline and preparation. In the {tradition} tradition, it involves abstaining from certain foods and activities during specific seasons.</p>
      </Card>
    </main>
  );
}

export function ConvertGuidePage() {
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'catechism', to: "/orthodox/catechism" }, { label: "Convert's Guide", to: "/orthodox/catechism/convert-guide" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Convert's Guide</h1>
      <Card className="mt-6">
        <p className="text-lg leading-relaxed">Entering the Orthodox Church is a journey of discovery and transformation. This guide offers practical advice for those on the path to conversion.</p>
      </Card>
    </main>
  );
}

export function PhilokaliaExcerptsPage() {
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'catechism', to: "/orthodox/catechism" }, { label: "Philokalia", to: "/orthodox/catechism/philokalia" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Philokalia Excerpts</h1>
      <Card className="mt-6">
        <p className="text-lg leading-relaxed">The Philokalia is a collection of texts by spiritual masters of the Orthodox hesychast tradition.</p>
      </Card>
    </main>
  );
}

export function JurisdictionalDifferencesPage() {
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'catechism', to: "/orthodox/catechism" }, { label: "Jurisdictions", to: "/orthodox/catechism/jurisdictions" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Jurisdictional Differences</h1>
      <Card className="mt-6">
        <p className="text-lg leading-relaxed">While sharing the same faith, Orthodox jurisdictions have different administrative structures and liturgical variations.</p>
      </Card>
    </main>
  );
}

export function PrayerRopeInteractivePage() {
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'prayers', to: "/orthodox/prayers" }, { label: "Prayer Rope", to: "/orthodox/prayers/prayer-rope" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Interactive Prayer Rope</h1>
      <Card className="mt-6 text-center">
        <p className="text-xl mb-4 italic">Lord Jesus Christ, Son of God, have mercy on me, a sinner.</p>
        <div className="flex justify-center gap-2">
          {[...Array(33)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-[var(--accent)]/40" />
          ))}
        </div>
      </Card>
    </main>
  );
}

export function LiturgyDetailPage() {
  const { liturgySlug } = useParams();
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'liturgy', to: "/orthodox/liturgy" }, { label: liturgySlug ?? "Liturgy", to: `/orthodox/liturgy/${liturgySlug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{liturgySlug?.replace(/-/g, " ")}</h1>
      <Card className="mt-6">
        <p className="text-lg leading-relaxed">Full liturgical text and commentary for the {liturgySlug?.replace(/-/g, " ")}.</p>
      </Card>
    </main>
  );
}

export function AdminBibleImportPage() {
  return <div className="p-8">Bible Import Admin Dashboard (Placeholder)</div>;
}

export function ConvertGuide() {
  return <div className="p-8">Convert's Guide (Placeholder)</div>;
}

export function WhatIsOrthodoxyPage() {
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'catechism', to: "/orthodox/catechism" }, { label: "What is Orthodoxy?", to: "/orthodox/catechism/what-is-orthodoxy" }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">What is Orthodoxy?</h1>
      <Card className="mt-6">
        <p className="text-lg leading-relaxed">Orthodoxy is the ancient Christian faith, preserving the teachings of the Apostles and the early Church Fathers.</p>
      </Card>
    </main>
  );
}

export function OrthodoxResourceSubPage({ contentKey }: { contentKey: string }) {
  const content = (orthodoxContent as any)[contentKey];
  if (!content) return <NotFoundContent title="Resource not found" />;
  
  return (
    <div className="space-y-6">
      <OrthodoxResourceTabs />
      <TraditionPage content={content} patternClassName="orthodox-pattern" />
    </div>
  );
}

function NotFoundContent({ title }: { title: string }) {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Link to="/" className="mt-4 inline-block text-[var(--accent)] underline">Return Home</Link>
    </div>
  );
}
