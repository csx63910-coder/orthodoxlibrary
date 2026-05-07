import { motion } from "framer-motion";
import {
  BookCopy,
  Bookmark,
  Search,
  Timer,
  Sparkles,
  HandHeart,
  Church,
  Landmark,
  Library,
  ExternalLink,
} from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../components/Breadcrumbs";
import Card from "../components/Card";
import CrossReferenceLink from "../components/CrossReference";
import PrintButton from "../components/PrintButton";
import SectionDivider from "../components/SectionDivider";
import TableOfContents from "../components/TableOfContents";
import {
  catholicBooks,
  catholicSacraments,
  catholicSaints,
  churchFathers,
  compareTopics,
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
import { allBookCatalog, catholicTranslations, orthodoxTranslations, scriptureReferencePreview } from "../data/scriptureData";
import { orthodoxContent, catholicContent, sharedHeritageItems } from "./siteData";
import { getLocalized } from "../utils/cn";
import LocalizedText from "../components/LocalizedText";

const byId = <T extends { slug: string }>(items: T[], slug?: string) => items.find((item) => item.slug === slug);

const allSearchItems = [
  ...orthodoxSaints.map((item) => ({ type: "Saint", title: getLocalized(item.name), path: `/orthodox/saints/${item.slug}` })),
  ...catholicSaints.map((item) => ({ type: "Saint", title: getLocalized(item.name), path: `/catholic/saints/${item.slug}` })),
  ...prayerByTradition("orthodox").map((item) => ({ type: "Prayer", title: getLocalized(item.title), path: `/orthodox/prayers/${item.slug}` })),
  ...prayerByTradition("catholic").map((item) => ({ type: "Prayer", title: getLocalized(item.title), path: `/catholic/prayers/${item.slug}` })),
  ...glossaryTerms.map((item) => ({ type: "Glossary", title: getLocalized(item.term), path: `/glossary/${item.slug}` })),
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
  
  ...Object.entries(catholicContent).map(([slug, content]) => {
    let path = `/catholic/${slug}`;
    if (slug === "dashboard") path = "/catholic";
    return { type: "Catholic Section", title: content.title, path, description: content.subtitle };
  }),

  ...sharedHeritageItems.map(item => ({ 
    type: "Shared Heritage", 
    title: item.title, 
    path: "/shared", 
    description: item.description 
  })),

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

function relatedCards(paths: string[]) {
  return paths.map((path) => ({ path, title: path.split("/").pop()?.replace(/-/g, " ") ?? path }));
}

export function SaintDetailPage({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
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
    ? iconSaintUrl(iconEntry.folder, 1, iconEntry.sampleImages[0])
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
            <p className="text-sm text-[var(--text-primary)]/75">{getLocalized(saint.calendarNote)}</p>
          </Card>
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">
              {tradition === "orthodox" ? "Troparion / Kontakion" : "Collect Prayer"}
            </h2>
            <p className="italic">{getLocalized(saint.hymnOrCollect)}</p>
          </Card>
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Biography</h2>
            {saint.biography.map((paragraph, idx) => (
              <p className="mt-3 leading-relaxed" key={idx}>
                {getLocalized(paragraph)}
              </p>
            ))}
          </Card>
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Notable Quote</h2>
            <blockquote className="mt-2 border-l-2 border-[var(--accent)] pl-3 italic">"{getLocalized(saint.quote)}"</blockquote>
          </Card>
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Associated Prayers</h2>
            <div className="mt-2 flex flex-wrap gap-3">
              {saint.prayers.map((prayer) => (
                <CrossReferenceLink key={prayer.path} to={prayer.path} label={getLocalized(prayer.label)} type="prayer" preview={<p>Open full prayer text and print layout.</p>} />
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Patronage</h2>
            <p className="mt-2">{getLocalized(saint.patronage)}</p>
          </Card>
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Related Saints</h2>
            <ul className="mt-2 space-y-2">
              {saint.related.map((slug) => {
                const related = findSaint(slug, tradition);
                if (!related) return null;
                return (
                  <li key={slug}>
                    <CrossReferenceLink
                      to={`/${tradition}/saints/${slug}`}
                      label={related.name}
                      type="saint"
                      preview={<p>{related.title}</p>}
                    />
                  </li>
                );
              })}
            </ul>
          </Card>
          <Card>
            <Link to={`/${tradition}/saints`} className="underline underline-offset-4">
              Back to Saints
            </Link>
          </Card>
        </div>
      </div>
    </main>
  );
}

export function SharedRelatedSection() {
  const links = relatedCards(["/shared/compare/creed", "/shared/compare/sacraments", "/shared/compare/liturgy", "/shared/compare/calendar"]);
  return (
    <section className="px-4 pb-8 md:px-8">
      <SectionDivider label="Related" />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {links.map((item) => (
          <Card key={item.path}>
            <Link to={item.path} className="font-heading text-[var(--text-secondary)] underline">
              {item.title}
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function PrayerDetailPage({ tradition }: { tradition: "orthodox" | "catholic" }) {
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
          { label: tradition === "orthodox" ? t('nav.orthodox') : t('nav.catholic'), to: `/${tradition}` },
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
          <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Original Language ({prayer.language})</h2>
            <p className="mt-3">{prayer.original}</p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-sm">
              <BookCopy size={14} /> Listen (audio placeholder)
            </button>
          </Card>
          <div id="history">
            <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">Background</h2>
            {prayer.history?.map((text, idx) => (
              <p key={idx} className="mt-2">
                {getLocalized(text)}
              </p>
            ))}
            </Card>
          </div>
          <div id="rubrics">
            <Card>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">When and How to Pray</h2>
            <p className="mt-2">{getLocalized(prayer.when)}</p>
            <p className="mt-2">{getLocalized(prayer.rubrics)}</p>
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
        </div>
        <TableOfContents items={toc} />
      </div>
    </main>
  );
}

export function FeastDetailPage({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const { feastSlug } = useParams();
  const feast = feastByTradition(tradition).find((item) => item.slug === feastSlug);
  if (!feast) return <NotFoundContent title={t('errors.feast_not_found') || "Feast not found"} />;

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: "/" },
          { label: tradition === "orthodox" ? t('nav.orthodox') : t('nav.catholic'), to: `/${tradition}` },
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
        {feast.history.map((item) => (
          <p key={item}>{getLocalized(item)}</p>
        ))}
      </div>
    </main>
  );
}

function scriptureSource(tradition: "orthodox" | "catholic") {
  return tradition === "orthodox" ? orthodoxTranslations : catholicTranslations;
}

const storageKey = (tradition: string, name: string) => `ancient-path-${tradition}-${name}`;
const slugifyBook = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const GREEK_RESOURCES_REPO = "https://github.com/openscriptures/GreekResources";
const GREEK_RESOURCES_BASE = "/lxx";
const BYZ_REPO = "https://github.com/scrollmapper/bible_databases/tree/master/sources/grc/Byz";
const BYZ_JSON_URL = "/byz/Byz.json";
const KJV_REPO = "https://github.com/farskipper/kjv";
const KJV_BASE = "kjv";

type KJVBook = { slug: string; name: string; file: string };
type KJVChapter = { chapter: number; verses: Array<{ verse: number; text: string }> };
type KJVBookPayload = { book: string; chapters: Array<{ chapter: string; verses: Array<{ verse: string; text: string }> }> };

const ntBookNames = new Set([
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "I Corinthians",
  "II Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "I Thessalonians",
  "II Thessalonians",
  "I Timothy",
  "II Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "I Peter",
  "II Peter",
  "I John",
  "II John",
  "III John",
  "Jude",
  "Revelation",
  "Revelation of John",
]);

const lxxBookNameBySlug: Record<string, string> = {
  genesis: "Genesis",
  exodus: "Exodus",
  leviticus: "Leviticus",
  numbers: "Numbers",
  deuteronomy: "Deuteronomy",
  joshua: "Joshua (Jesus of Nave)",
  judges: "Judges",
  ruth: "Ruth",
  "1-kingdoms": "1 Kingdoms (1 Samuel)",
  "2-kingdoms": "2 Kingdoms (2 Samuel)",
  "3-kingdoms": "3 Kingdoms (1 Kings)",
  "4-kingdoms": "4 Kingdoms (2 Kings)",
  "1-paralipomenon": "1 Paralipomenon (1 Chronicles)",
  "2-paralipomenon": "2 Paralipomenon (2 Chronicles)",
  "1-esdras": "1 Esdras (Greek Ezra)",
  "2-esdras": "2 Esdras (Ezra and Nehemiah)",
  judith: "Judith",
  esther: "Esther (with Greek additions)",
  "1-maccabees": "1 Maccabees",
  "2-maccabees": "2 Maccabees",
  "3-maccabees": "3 Maccabees",
  psalms: "Psalms (including Psalm 151)",
  job: "Job",
  proverbs: "Proverbs",
  ecclesiastes: "Ecclesiastes",
  "song-of-solomon": "Song of Solomon",
  "wisdom-of-solomon": "Wisdom of Solomon",
  "wisdom-of-sirach": "Wisdom of Sirach (Ecclesiasticus)",
  hosea: "Hosea",
  joel: "Joel",
  amos: "Amos",
  obadiah: "Obadiah",
  jonah: "Jonah",
  micah: "Micah",
  nahum: "Nahum",
  habakkuk: "Habakkuk",
  zephaniah: "Zephaniah",
  haggai: "Haggai",
  zechariah: "Zechariah",
  malachi: "Malachi",
  isaiah: "Isaiah",
  jeremiah: "Jeremiah",
  baruch: "Baruch",
  lamentations: "Lamentations",
  "letter-of-jeremiah": "Letter of Jeremiah",
  ezekiel: "Ezekiel",
  daniel: "Daniel (with Susanna and Bel and the Dragon)",
};

const greekResourcesBooks = [
  { slug: "genesis", name: "Genesis", file: "Gen" },
  { slug: "exodus", name: "Exodus", file: "Exod" },
  { slug: "leviticus", name: "Leviticus", file: "Lev" },
  { slug: "numbers", name: "Numbers", file: "Num" },
  { slug: "deuteronomy", name: "Deuteronomy", file: "Deut" },
  { slug: "joshua", name: "Joshua (Jesus of Nave)", file: "JoshB" },
  { slug: "judges", name: "Judges", file: "JudgB" },
  { slug: "ruth", name: "Ruth", file: "Ruth" },
  { slug: "1-kingdoms", name: "1 Kingdoms (1 Samuel)", file: "1Sam" },
  { slug: "2-kingdoms", name: "2 Kingdoms (2 Samuel)", file: "2Sam" },
  { slug: "3-kingdoms", name: "3 Kingdoms (1 Kings)", file: "1Kgs" },
  { slug: "4-kingdoms", name: "4 Kingdoms (2 Kings)", file: "2Kgs" },
  { slug: "1-paralipomenon", name: "1 Paralipomenon (1 Chronicles)", file: "1Chr" },
  { slug: "2-paralipomenon", name: "2 Paralipomenon (2 Chronicles)", file: "2Chr" },
  { slug: "1-esdras", name: "1 Esdras (Greek Ezra)", file: "1Esd" },
  { slug: "2-esdras", name: "2 Esdras (Ezra and Nehemiah)", file: "2Esd" },
  { slug: "judith", name: "Judith", file: "Jdt" },
  { slug: "esther", name: "Esther (with Greek additions)", file: "Esth" },
  { slug: "1-maccabees", name: "1 Maccabees", file: "1Macc" },
  { slug: "2-maccabees", name: "2 Maccabees", file: "2Macc" },
  { slug: "3-maccabees", name: "3 Maccabees", file: "3Macc" },
  { slug: "psalms", name: "Psalms (including Psalm 151)", file: "Ps" },
  { slug: "job", name: "Job", file: "Job" },
  { slug: "proverbs", name: "Proverbs", file: "Prov" },
  { slug: "ecclesiastes", name: "Ecclesiastes", file: "Eccl" },
  { slug: "song-of-solomon", name: "Song of Solomon", file: "Song" },
  { slug: "wisdom-of-solomon", name: "Wisdom of Solomon", file: "Wis" },
  { slug: "wisdom-of-sirach", name: "Wisdom of Sirach (Ecclesiasticus)", file: "Sir" },
  { slug: "hosea", name: "Hosea", file: "Hos" },
  { slug: "joel", name: "Joel", file: "Joel" },
  { slug: "amos", name: "Amos", file: "Amos" },
  { slug: "obadiah", name: "Obadiah", file: "Obad" },
  { slug: "jonah", name: "Jonah", file: "Jonah" },
  { slug: "micah", name: "Micah", file: "Mic" },
  { slug: "nahum", name: "Nahum", file: "Nah" },
  { slug: "habakkuk", name: "Habakkuk", file: "Hab" },
  { slug: "zephaniah", name: "Zephaniah", file: "Zeph" },
  { slug: "haggai", name: "Haggai", file: "Hag" },
  { slug: "zechariah", name: "Zechariah", file: "Zech" },
  { slug: "malachi", name: "Malachi", file: "Mal" },
  { slug: "isaiah", name: "Isaiah", file: "Isa" },
  { slug: "jeremiah", name: "Jeremiah", file: "Jer" },
  { slug: "baruch", name: "Baruch", file: "Bar" },
  { slug: "lamentations", name: "Lamentations", file: "Lam" },
  { slug: "letter-of-jeremiah", name: "Letter of Jeremiah", file: "EpJer" },
  { slug: "ezekiel", name: "Ezekiel", file: "Ezek" },
  { slug: "daniel", name: "Daniel (with Susanna and Bel and the Dragon)", file: "DanTh" },
];

const ntSlugs = new Set([
  "matthew",
  "mark",
  "luke",
  "john",
  "acts",
  "romans",
  "1-corinthians",
  "2-corinthians",
  "galatians",
  "ephesians",
  "philippians",
  "colossians",
  "1-thessalonians",
  "2-thessalonians",
  "1-timothy",
  "2-timothy",
  "titus",
  "philemon",
  "hebrews",
  "james",
  "1-peter",
  "2-peter",
  "1-john",
  "2-john",
  "3-john",
  "jude",
  "revelation",
]);

export function ScriptureReader({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const { bookSlug, chapterNumber } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const source = scriptureSource(tradition);
  const initialTranslation = useMemo(() => {
    const v = searchParams.get("version");
    if (v === "kjv") return "King James Version";
    if (v === "lxx") return "Septuagint";
    return source[0].translation;
  }, [searchParams, source]);
  const [translation, setTranslation] = useState(initialTranslation);

  useEffect(() => {
    setTranslation(initialTranslation);
  }, [initialTranslation]);

  const [fontSize, setFontSize] = useState<"text-sm" | "text-base" | "text-lg" | "text-xl">("text-base");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>(() => JSON.parse(localStorage.getItem(storageKey(tradition, "bookmarks")) ?? "[]"));
  const [readPlan, setReadPlan] = useState<string[]>(() => JSON.parse(localStorage.getItem(storageKey(tradition, "reading-plan")) ?? "[]"));
  const [highlightVerse, setHighlightVerse] = useState<number | null>(null);
  const [lxxBooks, setLxxBooks] = useState<Array<{ slug: string; name: string; file: string }>>([]);
  const [lxxBookCache, setLxxBookCache] = useState<Record<string, Record<string, Array<{ key: string; lemma: string }>>>>({});
  const [lxxChapters, setLxxChapters] = useState<number[]>([]);
  const [lxxVerses, setLxxVerses] = useState<{ verse: number; text: string }[]>([]);
  const [lxxLoading, setLxxLoading] = useState(false);
  const [lxxError, setLxxError] = useState<string | null>(null);
  const [byzBooks, setByzBooks] = useState<
    Array<{ slug: string; name: string; chapters: Array<{ chapter: number; verses: Array<{ verse: number; text: string }> }> }>
  >([]);
  const [byzLoading, setByzLoading] = useState(false);
  const [byzError, setByzError] = useState<string | null>(null);
  const [kjvBooks, setKjvBooks] = useState<KJVBook[]>([]);
  const [kjvBookCache, setKjvBookCache] = useState<Record<string, KJVChapter[]>>({});
  const [kjvChapters, setKjvChapters] = useState<number[]>([]);
  const [kjvVerses, setKjvVerses] = useState<Array<{ verse: number; text: string }>>([]);
  const [kjvLoading, setKjvLoading] = useState(false);
  const [kjvError, setKjvError] = useState<string | null>(null);
  const selectedSlug = bookSlug ?? "genesis";
  const isRemoteByz = tradition === "orthodox" && translation === "Septuagint" && ntSlugs.has(selectedSlug);
  const isRemoteLxx = tradition === "orthodox" && translation === "Septuagint" && !isRemoteByz;
  const isRemoteKJV = translation === "King James Version";

  useEffect(() => {
    localStorage.setItem(storageKey(tradition, "bookmarks"), JSON.stringify(bookmarks));
  }, [bookmarks, tradition]);

  useEffect(() => {
    localStorage.setItem(storageKey(tradition, "reading-plan"), JSON.stringify(readPlan));
  }, [readPlan, tradition]);

  useEffect(() => {
    if (!isRemoteLxx || lxxBooks.length > 0) return;
    let active = true;

    const loadRemoteLxx = async () => {
      setLxxLoading(true);
      setLxxError(null);
      try {
        if (!active) return;
        
        const lang = (i18next.language || 'en').split('-')[0];
        const langPath = ['el', 'ru'].includes(lang) ? `/data/kjv/${lang}` : `/${KJV_BASE}`;
        
        // Fetch localized book names if available
        try {
          const res = await fetch(`${langPath}/books.json`);
          if (res.ok) {
            const localizedBooks = await res.json();
            const mapped = greekResourcesBooks.map(b => {
              const loc = localizedBooks.find((lb: any) => lb.slug === b.slug);
              return loc ? { ...b, name: loc.name } : b;
            });
            setLxxBooks(mapped);
            return;
          }
        } catch (e) {
          console.warn("Could not load localized LXX book names", e);
        }

        setLxxBooks(greekResourcesBooks);
      } catch (error) {
        if (!active) return;
        setLxxError(error instanceof Error ? error.message : "Unable to load Septuagint source");
      } finally {
        if (active) setLxxLoading(false);
      }
    };

    loadRemoteLxx();
    return () => {
      active = false;
    };
  }, [isRemoteLxx, lxxBooks.length]);

  useEffect(() => {
    if (!isRemoteByz || byzBooks.length > 0) return;
    let active = true;

    const loadByz = async () => {
      setByzLoading(true);
      setByzError(null);
      try {
        const lang = (i18next.language || 'en').split('-')[0];
        const langPath = ['el', 'ru'].includes(lang) ? `/data/kjv/${lang}` : `/${KJV_BASE}`;
        
        const response = await fetch(BYZ_JSON_URL);
        if (!response.ok) {
          throw new Error("Could not fetch Byz.json");
        }
        const payload = await response.json();
        
        // Fetch localized names if available
        let localizedBooksMap: Record<string, string> = {};
        try {
          const res = await fetch(`${langPath}/books.json`);
          if (res.ok) {
            const list = await res.json();
            list.forEach((b: any) => localizedBooksMap[b.slug] = b.name);
          }
        } catch (e) {}

        const parsedBooks = (payload.books ?? [])
          .filter((book: { name: string }) => ntBookNames.has(book.name))
          .map((book: { name: string; chapters: Array<{ chapter: number; verses: Array<{ verse: number; text: string }> }> }) => {
            const slug = slugifyBook(book.name.replace(" of John", ""));
            return {
              ...book,
              name: localizedBooksMap[slug] || book.name,
              slug,
            };
          });
        if (!active) return;
        setByzBooks(parsedBooks);
      } catch (error) {
        if (!active) return;
        setByzError(error instanceof Error ? error.message : "Unable to load Byzantine NT source");
      } finally {
        if (active) setByzLoading(false);
      }
    };

    loadByz();
    return () => {
      active = false;
    };
  }, [isRemoteByz, byzBooks.length]);

  useEffect(() => {
    if (!isRemoteKJV || kjvBooks.length > 0) return;
    let active = true;

    const loadKjvBooks = async () => {
      setKjvLoading(true);
      setKjvError(null);
      try {
        const lang = (i18next.language || 'en').split('-')[0];
        const langPath = ['el', 'ru'].includes(lang) ? `/data/kjv/${lang}` : `/${KJV_BASE}`;
        
        const response = await fetch(`${langPath}/books.json`);
        if (!response.ok) throw new Error("Could not fetch KJV books.json");
        const books = (await response.json()) as KJVBook[];
        if (!active) return;
        setKjvBooks(books);
      } catch (error) {
        if (!active) return;
        setKjvError(error instanceof Error ? error.message : "Unable to load KJV books list");
      } finally {
        if (active) setKjvLoading(false);
      }
    };

    loadKjvBooks();
    return () => {
      active = false;
    };
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
      setLxxLoading(true);
      setLxxError(null);
      try {
        const lang = (i18next.language || 'en').split('-')[0];
        const langPath = ['el', 'ru'].includes(lang) ? `/data/kjv/${lang}` : `/${KJV_BASE}`;
        
        const response = await fetch(`${GREEK_RESOURCES_BASE}/${selectedBook.file}.js`);
        if (!response.ok) {
          throw new Error(`Could not fetch ${selectedBook.file}.js`);
        }
        const jsText = (await response.text()).trim();
        const parsed = new Function(`return (${jsText});`)() as Record<string, Array<{ key: string; lemma: string }>>;
        if (!active) return;
        setLxxBookCache((prev) => ({ ...prev, [selectedBook.slug]: parsed }));
        buildChapterData(parsed);
      } catch (error) {
        if (!active) return;
        setLxxError(error instanceof Error ? error.message : "Unable to load GreekResources LXX data");
        setLxxChapters([]);
        setLxxVerses([]);
      } finally {
        if (active) setLxxLoading(false);
      }
    };

    loadBook();
    return () => {
      active = false;
    };
  }, [isRemoteLxx, lxxBooks, lxxBookCache, bookSlug, chapterNumber]);

  useEffect(() => {
    if (!isRemoteKJV || kjvBooks.length === 0) {
      setKjvChapters([]);
      setKjvVerses([]);
      return;
    }

    const chapterNum = Number(chapterNumber) || 1;

    const hydrate = (chapters: KJVChapter[]) => {
      setKjvChapters(chapters.map((ch) => ch.chapter));
      setKjvVerses(chapters.find((ch) => ch.chapter === chapterNum)?.verses ?? []);
    };

    const currentSlug = bookSlug ?? "genesis";
    const selectedBook = kjvBooks.find((book) => book.slug === currentSlug) ?? kjvBooks[0];
    if (!selectedBook) return;

    const cached = kjvBookCache[selectedBook.slug];
    if (cached) {
      hydrate(cached);
      return;
    }

    let active = true;
    const loadKjvBook = async () => {
      setKjvLoading(true);
      setKjvError(null);
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
        hydrate(normalized);
      } catch (error) {
        if (!active) return;
        setKjvError(error instanceof Error ? error.message : "Unable to load KJV chapter data");
        setKjvChapters([]);
        setKjvVerses([]);
      } finally {
        if (active) setKjvLoading(false);
      }
    };

    loadKjvBook();
    return () => {
      active = false;
    };
  }, [isRemoteKJV, kjvBooks, kjvBookCache, bookSlug, chapterNumber]);

  const translationData = source.find((item) => item.translation === translation) ?? source[0];
  if (!translationData) return <div className="p-8 text-center">Translation data not found.</div>;

  const loadedBook = translationData.books.find((book) => book.slug === bookSlug) ?? translationData.books[0];
  if (!loadedBook) return <div className="p-8 text-center">Book not found in translation.</div>;

  const chapter = loadedBook.chapters.find((item) => item.chapter === Number(chapterNumber)) ?? loadedBook.chapters[0];
  if (!chapter) return <div className="p-8 text-center">Chapter not found.</div>;

  const currentChapter = Number(chapterNumber) || chapter.chapter;
  const remoteBookName =
    byzBooks.find((book) => book.slug === (bookSlug ?? ""))?.name ??
    lxxBooks.find((book) => book.slug === (bookSlug ?? ""))?.name ??
    kjvBooks.find((book) => book.slug === (bookSlug ?? ""))?.name ??
    lxxBookNameBySlug[bookSlug ?? ""] ??
    allBookCatalog.find((book) => book.slug === (bookSlug ?? ""))?.name ??
    loadedBook.name;
  const displayedVerses = isRemoteLxx && lxxVerses.length > 0 ? lxxVerses : chapter.verses;
  const byzBook = byzBooks.find((book) => book.slug === selectedSlug);
  const byzChapters = byzBook?.chapters.map((item) => item.chapter) ?? [];
  const byzVerses = byzBook?.chapters.find((item) => item.chapter === currentChapter)?.verses ?? [];
  const activeVerses = isRemoteByz ? byzVerses : isRemoteKJV ? kjvVerses : displayedVerses;
  const chapterSequence =
    isRemoteByz && byzChapters.length > 0
      ? byzChapters
      : isRemoteKJV && kjvChapters.length > 0
        ? kjvChapters
      : isRemoteLxx && lxxChapters.length > 0
        ? lxxChapters
        : loadedBook.chapters.map((item) => item.chapter);
  const activeBookSlug = isRemoteKJV ? selectedSlug : loadedBook.slug;
  const prevChapterNum = chapterSequence[chapterSequence.indexOf(currentChapter) - 1];
  const nextChapterNum = chapterSequence[chapterSequence.indexOf(currentChapter) + 1];
  const versionQuery = isRemoteKJV ? "?version=kjv" : isRemoteByz ? "?version=byz" : isRemoteLxx ? "?version=lxx" : "";

  const searchResults = useMemo(() => {
    if (isRemoteLxx || isRemoteByz || isRemoteKJV) return [];
    if (!searchQuery) return [];
    return translationData.books.flatMap((book) =>
      book.chapters.flatMap((ch) =>
        ch.verses
          .filter((verse) => verse.text.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((verse) => ({ book: book.slug, chapter: ch.chapter, verse: verse.verse, text: verse.text }))
      )
    );
  }, [searchQuery, translationData.books, isRemoteLxx, isRemoteByz, isRemoteKJV]);

  return (
    <main className="scripture-print-page px-4 py-8 md:px-8">
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: "/" },
          { label: tradition === "orthodox" ? t('nav.orthodox') : t('nav.catholic'), to: `/${tradition}` },
          { label: t('sections.holy_scripture'), to: `/${tradition}/scripture` },
          { label: t('sections.reader') || "Reader", to: `/${tradition}/scripture/reader` },
        ]}
      />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)]" text="Scripture Reader" />
        <div className="flex items-center gap-2">
          <select value={translation} onChange={(event) => setTranslation(event.target.value)} className="rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-2 text-sm">
            {source.map((item) => (
              <option key={getLocalized(item.translation)} value={getLocalized(item.translation)}>
                {getLocalized(item.translation)}
              </option>
            ))}
          </select>
          <PrintButton />
        </div>
      </div>
      {isRemoteLxx && (
        <Card className="mb-4 text-sm">
          <p>
            <LocalizedText text="Old Testament source loaded from" />
            <a className="ml-1 underline" href={GREEK_RESOURCES_REPO} target="_blank" rel="noreferrer">
              OpenScriptures GreekResources
            </a>
            . <LocalizedText text="OT lemma files are fetched from" />
            <a className="ml-1 underline" href={`${GREEK_RESOURCES_BASE}/Gen.js`} target="_blank" rel="noreferrer">
              LxxLemmas/*.js
            </a>
            .
          </p>
          {lxxLoading && <p className="mt-1 text-[var(--text-secondary)]"><LocalizedText text="Loading local Old Testament database..." /></p>}
          {lxxError && <p className="mt-1 text-red-300">{lxxError}</p>}
        </Card>
      )}
      {isRemoteByz && (
        <Card className="mb-4 text-sm">
          <p>
            <LocalizedText text="New Testament source loaded from" />
            <a className="ml-1 underline" href={BYZ_REPO} target="_blank" rel="noreferrer">
              scrollmapper Byz source
            </a>
            , <LocalizedText text="using" />
            <a className="ml-1 underline" href={BYZ_JSON_URL} target="_blank" rel="noreferrer">
              Byz.json
            </a>
            .
          </p>
          {byzLoading && <p className="mt-1 text-[var(--text-secondary)]"><LocalizedText text="Loading Byzantine NT data..." /></p>}
          {byzError && <p className="mt-1 text-red-300">{byzError}</p>}
        </Card>
      )}
      {isRemoteKJV && (
        <Card className="mb-4 text-sm">
          <p>
            <LocalizedText text="King James Version source loaded from" />
            <a className="ml-1 underline" href={KJV_REPO} target="_blank" rel="noreferrer">
              farskipper/kjv
            </a>
            .
          </p>
          {kjvLoading && <p className="mt-1 text-[var(--text-secondary)]"><LocalizedText text="Loading KJV text from local source..." /></p>}
          {kjvError && <p className="mt-1 text-red-300">{kjvError}</p>}
        </Card>
      )}
      <div className="grid gap-4 lg:grid-cols-[260px_1fr_240px]">
        <Card className="max-h-[72vh] overflow-y-auto">
          <LocalizedText as="h2" className="font-heading text-lg text-[var(--text-secondary)]" text="Books" />
          {isRemoteKJV ? (
            <div className="mt-2 space-y-1">
              {kjvBooks.map((book) => (
                <button
                  key={book.slug}
                  onClick={() => navigate(`/${tradition}/scripture/${book.slug}/1?version=kjv`)}
                  className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-[var(--bg-secondary)]"
                >
                  <LocalizedText text={book.name} />
                </button>
              ))}
            </div>
          ) : isRemoteByz ? (
            <div className="mt-2 space-y-1">
              {byzBooks.map((book) => (
                <button
                  key={book.slug}
                  onClick={() => navigate(`/${tradition}/scripture/${book.slug}/1?version=byz`)}
                  className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-[var(--bg-secondary)]"
                >
                  <LocalizedText text={book.name} />
                </button>
              ))}
            </div>
          ) : isRemoteLxx ? (
            <div className="mt-2 space-y-1">
              {lxxBooks.map((book) => {
                const slug = slugifyBook(book.name);
                return (
                  <button
                      key={book.name}
                      onClick={() => navigate(`/${tradition}/scripture/${slug}/1?version=lxx`)}
                      className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-[var(--bg-secondary)]"
                    >
                      <LocalizedText text={book.name} />
                    </button>
                );
              })}
            </div>
          ) : (
            (["OT", "NT", "DC"] as const).map((testament) => (
            <div key={testament} className="mt-3">
              <h3 className="text-sm text-[var(--text-primary)]/70">{testament}</h3>
              <div className="mt-1 space-y-1">
                {allBookCatalog
                  .filter((book) => book.testament === testament)
                  .map((book) => {
                    const loaded = translationData.books.some((item) => item.slug === book.slug);
                    return (
                      <button
                        key={book.slug}
                        onClick={() => {
                          if (loaded) navigate(`/${tradition}/scripture/${book.slug}/1`);
                        }}
                        className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-[var(--bg-secondary)]"
                      >
                        <LocalizedText text={book.name} />
                        {!loaded && <LocalizedText as="span" className="ml-1 text-xs text-[var(--text-primary)]/60" text="Full text loading - check back soon" />}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))
          )}
        </Card>
        <Card>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-2xl text-[var(--text-secondary)]">
              {isRemoteLxx || isRemoteKJV ? remoteBookName : getLocalized(loadedBook.name)} {currentChapter}
            </h2>
            <div className="flex items-center gap-2">
              <button
                disabled={!prevChapterNum}
                onClick={() => prevChapterNum && navigate(`/${tradition}/scripture/${activeBookSlug}/${prevChapterNum}${versionQuery}`)}
                className="rounded border border-[var(--border)] px-2 py-1 text-sm disabled:opacity-40"
              >
                <LocalizedText text="Prev" />
              </button>
              <button
                disabled={!nextChapterNum}
                onClick={() => nextChapterNum && navigate(`/${tradition}/scripture/${activeBookSlug}/${nextChapterNum}${versionQuery}`)}
                className="rounded border border-[var(--border)] px-2 py-1 text-sm disabled:opacity-40"
              >
                <LocalizedText text="Next" />
              </button>
              <div className="flex gap-1">
                {(["text-sm", "text-base", "text-lg", "text-xl"] as const).map((size) => (
                  <button key={size} onClick={() => setFontSize(size)} className={`rounded border px-2 py-1 text-xs ${fontSize === size ? "border-[var(--accent)]" : "border-[var(--border)]/40"}`}>
                    <LocalizedText text={size.replace("text-", "")} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className={`space-y-3 ${fontSize}`}>
            {activeVerses.map((verse) => {
              const key = `${activeBookSlug}-${currentChapter}-${verse.verse}`;
              const marked = bookmarks.includes(key);
              return (
                <p key={key} id={`verse-${verse.verse}`} className={highlightVerse === verse.verse ? "rounded bg-[var(--accent)]/15 p-1" : ""}>
                  <button
                    className="mr-1 font-semibold text-[var(--text-secondary)]"
                    onClick={() => {
                      navigator.clipboard.writeText(`${isRemoteLxx || isRemoteKJV ? remoteBookName : getLocalized(loadedBook.name)} ${currentChapter}:${verse.verse}`);
                      setHighlightVerse(verse.verse);
                    }}
                  >
                    {verse.verse}
                  </button>
                  <LocalizedText text={verse.text} />
                  <button
                    onClick={() =>
                      setBookmarks((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]))
                    }
                    className="ml-2 inline-flex"
                    aria-label={t('scripture.bookmark_verse') || "Bookmark verse"}
                  >
                    <Bookmark size={14} className={marked ? "text-[var(--text-secondary)]" : "text-[var(--text-primary)]/60"} />
                  </button>
                </p>
              );
            })}
          </div>
        </Card>
        <div className="space-y-4">
          <Card>
            <LocalizedText as="h3" className="font-heading text-lg text-[var(--text-secondary)]" text="Search" />
            <div className="mt-2 flex items-center gap-2 rounded border border-[var(--border)]/40 px-2 py-1">
              <Search size={14} />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={isRemoteLxx || isRemoteByz || isRemoteKJV ? t('scripture.search_disabled') || "Search disabled for remote source" : t('scripture.search_placeholder') || "Search scripture"}
                disabled={isRemoteLxx || isRemoteByz || isRemoteKJV}
                className="w-full bg-transparent text-sm outline-none disabled:opacity-50"
              />
            </div>
            <div className="mt-2 max-h-32 space-y-1 overflow-y-auto text-xs">
              {searchResults.slice(0, 8).map((result) => (
                <button key={`${result.book}-${result.chapter}-${result.verse}`} onClick={() => navigate(`/${tradition}/scripture/${result.book}/${result.chapter}`)} className="block w-full text-left hover:text-[var(--text-secondary)]">
                  <LocalizedText text={result.book} /> {result.chapter}:{result.verse} - <LocalizedText text={result.text} />
                </button>
              ))}
            </div>
          </Card>
          <Card>
            <LocalizedText as="h3" className="font-heading text-lg text-[var(--text-secondary)]" text="My Bookmarks" />
            <ul className="mt-2 space-y-1 text-xs">
              {bookmarks.slice(0, 8).map((item) => (
                <li key={item}><LocalizedText text={item.replace(/-/g, " ")} /></li>
              ))}
            </ul>
          </Card>
          <Card>
            <LocalizedText as="h3" className="font-heading text-lg text-[var(--text-secondary)]" text="Reading Plan" />
            {(isRemoteKJV ? kjvBooks : translationData.books).map((book) => (
              <label key={book.slug} className="mt-1 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={readPlan.includes(book.slug)}
                  onChange={() =>
                    setReadPlan((prev) => (prev.includes(book.slug) ? prev.filter((item) => item !== book.slug) : [...prev, book.slug]))
                  }
                />
                <LocalizedText text={book.name} />
              </label>
            ))}
          </Card>
        </div>
      </div>
    </main>
  );
}

export function TodayDashboard({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const today = new Date();
  const saint = (tradition === "orthodox" ? orthodoxSaints : catholicSaints)[today.getDate() % 5];
  const feast = feastByTradition(tradition)[today.getDate() % 3];
  const [jurisdiction, setJurisdiction] = useState("Greek");
  const readings = tradition === "orthodox" ? ["John 1:1-18", "Psalm 50"] : ["John 3:16", "Romans 8:28"];

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: tradition, to: `/${tradition}` }, { label: 'today', to: `/${tradition}/today` }]} />
      <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)]" text="Daily Dashboard" />
      <p className="mt-2">
        <LocalizedText text={today.toDateString()} /> {tradition === "orthodox" ? t('dashboard.julian_equivalent') || "- Julian equivalent shown in jurisdictional calendars." : t('dashboard.roman_calendar') || "- Roman Calendar observance."}
      </p>
      {tradition === "orthodox" && (
        <select className="mt-3 rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-2" value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}>
          {["Greek", "Serbian", "Russian", "Armenian", "Antiochian"].map((item) => (
            <option key={item}><LocalizedText text={item} /></option>
          ))}
        </select>
      )}
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Today's Saint" />
          <CrossReferenceLink to={`/${tradition}/saints/${saint.slug}`} label={saint.name} type="saint" preview={<LocalizedText as="p" text={saint.title} />} />
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Today's Readings" />
          {readings.map((reading) => (
            <p key={reading}>
              <CrossReferenceLink to={`/${tradition}/scripture/reader`} label={reading} type="scripture" preview={<LocalizedText as="p" text={scriptureReferencePreview[reading] ?? "Open chapter in reader."} />} fullChapterLink={`/${tradition}/scripture/reader`} />
            </p>
          ))}
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Fasting Rule" />
          <LocalizedText as="p" text={tradition === "orthodox" ? "Wine and oil allowed" : "Friday abstinence from meat"} />
          <Link className="mt-2 inline-block underline" to={`/${tradition}/fasting`}>
            <LocalizedText text="Open fasting guide" />
          </Link>
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Liturgical Season" />
          <LocalizedText as="p" text={tradition === "orthodox" ? "Great Lent - Purple" : "Ordinary Time - Green"} />
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Feast Day" />
          <CrossReferenceLink to={`/${tradition}/calendar/feasts/${feast.slug}`} label={feast.name} type="feast" preview={<LocalizedText as="p" text={feast.date} />} />
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Prayer of the Day" />
          <CrossReferenceLink to={`/${tradition}/prayers/${tradition === "orthodox" ? "jesus-prayer" : "hail-mary"}`} label={tradition === "orthodox" ? "Jesus Prayer" : "Hail Mary"} type="prayer" preview={<LocalizedText as="p" text="Open full prayer text and rubrics." />} />
        </Card>
      </div>
      <LocalizedText as="blockquote" className="mt-6 border-l-2 border-[var(--accent)] pl-4 italic" text='"Let us become all flame for Christ by prayer and mercy."' />
      <div className="mt-4 flex gap-4">
        <Link to={`/${tradition}/prayers/${tradition === "orthodox" ? "morning-prayers" : "morning-offering"}`} className="underline">
          <LocalizedText text="Morning Prayer" />
        </Link>
        <Link to={`/${tradition}/prayers/${tradition === "orthodox" ? "prayer-after-communion" : "act-of-contrition"}`} className="underline">
          <LocalizedText text="Evening Prayer" />
        </Link>
      </div>
      {tradition === "orthodox" && <p className="mt-3 text-sm text-[var(--text-primary)]/75"><LocalizedText text="Current jurisdiction:" /> <LocalizedText text={jurisdiction} /></p>}
    </main>
  );
}

export function FastingPage({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const levels = ["Strict fast", "Fish allowed", "Wine and oil allowed", "Fish, wine, oil allowed", "Fast-free"];
  const colors = ["bg-red-900", "bg-red-700", "bg-orange-600", "bg-yellow-500", "bg-green-600"];
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: tradition, to: `/${tradition}` }, { label: 'fasting', to: `/${tradition}/fasting` }]} />
      <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)]" text="Fasting Guide" />
      <Card className="mt-4">
        <p className="text-lg">
          <LocalizedText text="Today is a" /> <span className="font-semibold text-[var(--text-secondary)]"><LocalizedText text={tradition === "orthodox" ? "wine and oil allowed" : "Friday abstinence"} /></span> <LocalizedText text="day." />
        </p>
      </Card>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {Array.from({ length: 35 }).map((_, index) => (
          <div key={index} className={`h-8 rounded ${colors[index % colors.length]}`} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-xs">
        {levels.map((level, index) => (
          <span key={level} className="inline-flex items-center gap-2">
            <span className={`inline-block h-3 w-3 rounded ${colors[index]}`} /> <LocalizedText text={level} />
          </span>
        ))}
      </div>
      <SectionDivider label={t('sections.rules') || "Rules"} />
      <LocalizedText as="p" text={tradition === "orthodox" ? "Orthodox fasting includes Wednesday/Friday rhythm and major fasts with jurisdictional nuance." : "Catholic discipline includes Lenten obligations, Friday abstinence, and traditional ember customs."} />
      <SectionDivider label={t('sections.feasts_affecting_fast') || "Feasts Affecting Fast"} />
      <div className="flex flex-wrap gap-3">
        {feastByTradition(tradition).map((feast) => (
          <CrossReferenceLink key={feast.slug} to={`/${tradition}/calendar/feasts/${feast.slug}`} label={feast.name} type="feast" preview={<LocalizedText as="p" text={feast.fasting} />} />
        ))}
      </div>
      <SectionDivider label={t('sections.recipe_suggestions') || "Recipe Suggestions"} />
      <div className="grid gap-3 md:grid-cols-3">
        {["Lentil stew", "Olive oil chickpeas", "Baked fish with herbs"].map((item) => (
          <Card key={item}><LocalizedText text={item} /></Card>
        ))}
      </div>
    </main>
  );
}

export function GlossaryIndexPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "orthodox" | "catholic" | "shared">("all");
  const filtered = glossaryTerms.filter((term) => {
    const matchesQuery = getLocalized(term.term).toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || term.traditions.includes(filter);
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="sacred-surface min-h-screen px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'glossary', to: "/glossary" }]} />
      <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)]" text="Liturgical Glossary" />
      <div className="mt-4 flex flex-wrap gap-2">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('search.placeholder_glossary') || "Search terms..."} className="rounded border border-[var(--border)] bg-[var(--card)] px-3 py-2" />
        {(["all", "orthodox", "catholic", "shared"] as const).map((item) => (
          <button key={item} onClick={() => setFilter(item)} className={`rounded border px-3 py-2 text-sm ${filter === item ? "border-[var(--accent)]" : "border-[var(--border)]/40"}`}>
            <LocalizedText text={item} />
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((term) => (
          <Card key={term.slug}>
            <h2 className="font-heading text-xl text-[var(--text-secondary)]">{getLocalized(term.term)}</h2>
            <p className="mt-2 text-sm text-[var(--text-primary)]/75">{getLocalized(term.definition)}</p>
            <Link to={`/glossary/${term.slug}`} className="mt-3 inline-block underline">
              <LocalizedText text="Open entry" />
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function GlossaryDetailPage() {
  const { t } = useTranslation();
  const { termSlug } = useParams();
  const term = byId(glossaryTerms, termSlug);
  if (!term) return <NotFoundContent title={t('errors.glossary_entry_not_found') || "Glossary entry not found"} />;

  return (
    <div className="sacred-surface min-h-screen px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'glossary', to: "/glossary" }, { label: getLocalized(term.term), to: `/glossary/${term.slug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{getLocalized(term.term)}</h1>
      <p className="mt-2">{getLocalized(term.original)} | {getLocalized(term.pronunciation)}</p>
      <Card className="mt-4">
        <p>{getLocalized(term.definition)}</p>
      </Card>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Traditions" />
          <p className="mt-2">{term.traditions.map(tr => getLocalized(tr)).join(", ")}</p>
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Related Terms" />
          <div className="mt-2 flex flex-wrap gap-2">
            {term.related.map((item) => (
              <Link key={item} to={`/glossary/${item}`} className="xref-link xref-glossary">
                <LocalizedText text={item.replace(/-/g, " ")} />
              </Link>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-4">
        <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Scripture References" />
        {term.scripture.map((scripture) => (
          <p key={scripture.ref} className="mt-2">
            <CrossReferenceLink to={scripture.path} label={scripture.ref} type="scripture" preview={<LocalizedText as="p" text={getLocalized(scripture.preview)} />} fullChapterLink={scripture.path} />
          </p>
        ))}
      </Card>
    </div>
  );
}

export function SearchPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [includeBible, setIncludeBible] = useState(false);
  const [bibleResults, setBibleResults] = useState<Array<{ type: string; title: string; path: string; snippet?: string }>>([]);
  const [isSearchingBible, setIsSearchingBible] = useState(false);
  const navigate = useNavigate();

  const staticResults = useMemo(() => {
    if (query.length < 2) return [];
    const lowQ = query.toLowerCase();
    return allSearchItems.filter((item: any) => 
      item.title.toLowerCase().includes(lowQ) || 
      (item.description && item.description.toLowerCase().includes(lowQ))
    ).map((item: any) => ({
      ...item,
      snippet: item.description
    }));
  }, [query]);

  // Bible search logic
  useEffect(() => {
    if (query.length < 3) {
      setBibleResults([]);
      return;
    }

    const searchBible = async () => {
      setIsSearchingBible(true);
      const results: typeof bibleResults = [];
      const lowQ = query.toLowerCase();

      // 1. Check for reference match (e.g. "John 3")
      const refMatch = query.match(/^([1-3]?\s?[A-Za-z]+)\s?(\d+)?$/i);
      if (refMatch) {
        const bookName = refMatch[1].trim();
        const chapter = refMatch[2];
        const book = allBookCatalog.find(b => b.name.toLowerCase() === bookName.toLowerCase() || b.slug.toLowerCase() === bookName.toLowerCase());
        
        if (book) {
          results.push({
            type: "Bible Reference",
            title: `${book.name}${chapter ? " " + chapter : ""}`,
            path: `/orthodox/scripture/${book.slug}/${chapter || 1}`,
          });
        }
      }

      // 2. Keyword search in loaded samples (fast)
      if (includeBible) {
        [...orthodoxTranslations, ...catholicTranslations].forEach(trans => {
          trans.books.forEach(book => {
            book.chapters.forEach(ch => {
              ch.verses.forEach(v => {
                if (v.text.toLowerCase().includes(lowQ)) {
                  results.push({
                    type: `Verse (${trans.translation})`,
                    title: `${book.name} ${ch.chapter}:${v.verse}`,
                    path: `/${trans.translation.toLowerCase().includes("catholic") ? "catholic" : "orthodox"}/scripture/${book.slug}/${ch.chapter}`,
                    snippet: v.text
                  });
                }
              });
            });
          });
        });
      }

      setBibleResults(results.slice(0, 50));
      setIsSearchingBible(false);
    };

    const timer = setTimeout(searchBible, 300);
    return () => clearTimeout(timer);
  }, [query, includeBible]);

  const allResults = useMemo(() => [...staticResults, ...bibleResults], [staticResults, bibleResults]);
  const grouped = useMemo(() => allResults.reduce<Record<string, typeof allResults>>((acc, item) => {
    acc[item.type] = [...(acc[item.type] ?? []), item];
    return acc;
  }, {}), [allResults]);

  const getIcon = (type: string) => {
    if (type.includes("Saint")) return <Sparkles className="h-4 w-4 text-amber-400" />;
    if (type.includes("Verse") || type.includes("Bible")) return <BookCopy className="h-4 w-4 text-blue-400" />;
    if (type.includes("Prayer")) return <HandHeart className="h-4 w-4 text-rose-400" />;
    if (type.includes("Orthodox")) return <Church className="h-4 w-4 text-[var(--accent)]" />;
    if (type.includes("Catholic")) return <Landmark className="h-4 w-4 text-orange-400" />;
    if (type.includes("Catechism") || type.includes("Topic") || type.includes("Glossary")) return <Library className="h-4 w-4 text-emerald-400" />;
    return <Search className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className="sacred-surface min-h-screen px-3 py-6 md:px-8 md:py-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'search', to: "/search" }]} />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
        <LocalizedText as="h1" className="font-heading text-3xl md:text-4xl text-[var(--text-secondary)]" text="Universal Hub Search" />
        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-[var(--text-primary)]/40 uppercase tracking-widest">
          <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <LocalizedText text="Live Site Index" />
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 md:h-5 md:w-5 text-[var(--text-primary)]/30 group-focus-within:text-[var(--accent)] transition-colors" />
          </div>
          <input 
            value={query} 
            onChange={(event) => setQuery(event.target.value)} 
            placeholder={t('search.placeholder') || "Search EVERYTHING..."} 
            className="w-full rounded-xl md:rounded-2xl border border-[var(--border)]/50 bg-[var(--card)] py-4 md:py-5 pl-10 md:pl-12 pr-4 text-base md:text-xl outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 transition-all placeholder:text-[var(--text-primary)]/20 shadow-sm" 
          />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 sm:items-center px-2">
          <label className="flex items-center gap-2 text-xs md:text-sm font-medium cursor-pointer text-[var(--text-primary)]/70 hover:text-[var(--text-primary)] transition-colors">
            <input 
              type="checkbox" 
              checked={includeBible} 
              onChange={(e) => setIncludeBible(e.target.checked)}
              className="w-3.5 h-3.5 md:w-4 md:h-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
            />
            <LocalizedText text="Deep Bible Search" />
          </label>
          <div className="hidden sm:block h-4 w-px bg-[var(--border)]/30"></div>
          <p className="text-[10px] md:text-xs text-[var(--text-primary)]/50 font-medium">
            <LocalizedText text="Indexing" /> {allSearchItems.length} <LocalizedText text="curated spiritual resources" />
          </p>
        </div>
      </div>

      {isSearchingBible && (
        <div className="mt-8 flex items-center gap-2 md:gap-3 text-[var(--text-secondary)] animate-pulse justify-center py-3 md:py-4 bg-[var(--card)]/30 rounded-lg md:rounded-xl border border-dashed border-[var(--border)]/30">
          <Timer className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
          <LocalizedText as="span" className="text-[10px] md:text-sm font-heading tracking-widest uppercase" text="Consulting Holy Tradition..." />
        </div>
      )}

      <div className="mt-10 md:mt-12 space-y-8 md:space-y-12 pb-24">
        {Object.entries(grouped).length > 0 ? (
          Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-2 bg-[var(--card)] px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[var(--border)]/30 shadow-sm shrink-0">
                  <div className="scale-90 md:scale-100">
                    {getIcon(category)}
                  </div>
                  <h2 className="font-heading text-[10px] md:text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                    <LocalizedText text={category} />
                  </h2>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)]/30 to-transparent"></div>
              </div>
              
              <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item, idx) => (
                  <Link 
                    key={`${item.path}-${idx}`} 
                    to={item.path} 
                    className="group block"
                  >
                    <Card className="h-full hover:border-[var(--accent)] transition-all hover:-translate-y-1 bg-[var(--card)]/40 backdrop-blur-md border-[var(--border)]/20 hover:shadow-xl flex flex-col p-4 md:p-5">
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-heading text-base md:text-lg text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-tight">
                            <LocalizedText text={item.title} />
                          </h3>
                          <ExternalLink className="h-3 w-3 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-1" />
                        </div>
                        {item.snippet && (
                          <p className="mt-2 md:mt-3 text-[11px] md:text-xs text-[var(--text-primary)]/70 line-clamp-3 md:line-clamp-4 leading-relaxed font-medium">
                            <LocalizedText text={item.snippet} />
                          </p>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-[var(--border)]/10 flex items-center justify-between">
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)]/30 group-hover:text-[var(--accent)] transition-colors">
                          <LocalizedText text="Access Resource" />
                        </span>
                        <div className="bg-[var(--accent)]/5 p-1.5 rounded-lg group-hover:bg-[var(--accent)]/10 transition-colors scale-90 md:scale-100">
                          {getIcon(category)}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : query.length >= 2 && !isSearchingBible && (
          <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center animate-in zoom-in duration-300 px-4">
            <div className="h-16 w-16 md:h-24 md:w-24 rounded-full bg-[var(--card)] flex items-center justify-center mb-4 md:mb-6 shadow-inner border border-[var(--border)]/30">
              <Search className="h-6 w-6 md:h-10 md:w-10 text-[var(--text-primary)]/10" />
            </div>
            <LocalizedText as="h3" className="text-xl md:text-2xl font-heading text-[var(--text-secondary)]" text="No matches found" />
            <LocalizedText as="p" className="mt-2 text-xs md:text-sm text-[var(--text-primary)]/40 max-w-xs md:max-w-md mx-auto leading-relaxed" text="We couldn't find any spiritual resources matching your search. Try adjusting your query or exploring categories directly." />
          </div>
        )}
      </div>
    </div>
  );
}

export function BookDetailPage({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const { bookSlug } = useParams();
  const data = tradition === "orthodox" ? orthodoxBooks : catholicBooks;
  const book = byId(data, bookSlug);
  if (!book) return <NotFoundContent title={t('errors.book_not_found') || "Book not found"} />;
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: tradition, to: `/${tradition}` }, { label: 'resources', to: `/${tradition}/resources` }, { label: getLocalized(book.title), to: `/${tradition}/resources/books/${book.slug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{getLocalized(book.title)}</h1>
      <p className="mt-1">{getLocalized(book.author)} • {getLocalized(book.era)}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Book Cover Placeholder" />
          <LocalizedText as="p" className="mt-2" text="Sacred text illustration slot." />
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Description" />
          <p className="mt-2">
            <LocalizedText text="A formative spiritual and theological work within" /> {tradition === "orthodox" ? t('nav.orthodox') : t('nav.catholic')} <LocalizedText text="tradition." />
          </p>
          <LocalizedText as="p" className="mt-2" text="It is recommended for prayerful reading with pastoral guidance." />
        </Card>
      </div>
      <Card className="mt-4">
        <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Key Excerpts" />
        <blockquote className="mt-2 border-l-2 border-[var(--accent)] pl-3 italic">"{getLocalized(book.excerpt)}"</blockquote>
        <LocalizedText as="blockquote" className="mt-2 border-l-2 border-[var(--accent)] pl-3 italic" text='"Seek repentance and humility in every chapter."' />
      </Card>
    </main>
  );
}

export function MysteryPage({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const { mysterySlug } = useParams();
  const list = tradition === "orthodox" ? orthodoxMysteries : catholicSacraments;
  if (!list.includes(mysterySlug ?? "")) return <NotFoundContent title={t('errors.sacrament_not_found') || "Sacrament not found"} />;
  const title = (mysterySlug ?? "").replace(/-/g, " ");

  const orthodoxMysteryData: Record<string, any> = {
    "baptism": {
      desc: "The entrance into the Church, dying to the old self and being born again of water and Spirit.",
      details: "Full immersion three times in the name of the Father, Son, and Holy Spirit."
    },
    "chrismation": {
      desc: "The believer receives the 'Seal of the Gift of the Holy Spirit.' It is the personal Pentecost of every Christian.",
      details: "Immediately follows Baptism; the priest anoints the body with Holy Chrism."
    },
    "eucharist": {
      desc: "Not a symbol or a memorial, but the Literal Body and Blood of Christ. It is the 'Medicine of Immortality' that unites the believer to the Divine Nature.",
      details: "Received under both species (bread and wine) from a common chalice."
    },
    "confession": {
      desc: "Metanoia (change of mind). It is viewed as a spiritual hospital where the soul is healed by Christ the Physician, with the priest acting as a witness.",
      details: "Performed before an icon of Christ, with the priest's stole (epitrachelion) placed on the penitent's head during the prayer of absolution."
    },
    "marriage": {
      desc: "Unique in Orthodoxy for the 'Crowning.' The couple is crowned as martyrs (witnesses) to Christ and as the king and queen of a new 'domestic church.'",
      details: "Includes the exchange of rings, the crowning, and the common cup."
    },
    "holy-unction": {
      desc: "For the healing of soul and body, and the forgiveness of sins.",
      details: "Anointing with blessed oil, usually during Holy Week or in times of illness."
    },
    "priesthood": {
      desc: "The laying on of hands to continue the apostolic ministry of the Church.",
      details: "Three ranks: Deacon, Priest, and Bishop."
    }
  };

  const data = tradition === "orthodox" ? orthodoxMysteryData[mysterySlug ?? ""] : null;

  return (
    <main className={`${tradition === 'orthodox' ? 'orthodox-pattern' : 'catholic-pattern'} min-h-screen px-4 py-8 md:px-8`}>
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: tradition, to: `/${tradition}` }, { label: 'catechism', to: `/${tradition}/catechism` }, { label: title, to: "#" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl capitalize"><LocalizedText text={title} /></h1>
        
        {tradition === "orthodox" && (
          <p className="mt-3 text-lg text-[var(--text-primary)]/90 italic">
            <LocalizedText text="Orthodoxy uses the word" /> <span className="font-semibold text-[var(--text-secondary)]"><LocalizedText text="Mysterion" /></span> <LocalizedText text="(Mystery) rather than 'Sacrament.' A Mystery is where the physical and spiritual worlds intersect." />
          </p>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="border-l-4 border-l-[var(--accent)]">
            <LocalizedText as="h2" className="font-heading text-2xl text-[var(--text-secondary)]" text="Theological Meaning" />
            <p className="mt-3 leading-relaxed text-[var(--text-primary)]/85">
              {data ? <LocalizedText text={data.desc} /> : <LocalizedText text="English and Greek/Latin liturgical usage are presented for catechetical clarity." />}
            </p>
          </Card>

          <Card>
            <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Scriptural Basis" />
            <div className="mt-3">
              <CrossReferenceLink to={`/${tradition}/scripture/john/3`} label="John 3:5" type="scripture" preview={<LocalizedText as="p" text="Unless one is born of water and Spirit..." />} fullChapterLink={`/${tradition}/scripture/john/3`} />
            </div>
            <LocalizedText as="p" className="mt-2 text-sm text-[var(--text-primary)]/70 italic" text='"Go therefore and make disciples of all nations, baptizing them..."' />
          </Card>
        </div>

        <div className="mt-6 space-y-6">
          <Card>
            <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="How It Is Performed" />
            <p className="mt-3 text-[var(--text-primary)]/85 leading-relaxed">
              {data ? <LocalizedText text={data.details} /> : <LocalizedText text="Detailed liturgical sequence with jurisdictional or ritual distinctions." />}
            </p>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Associated Prayers" />
              <div className="mt-3">
                <CrossReferenceLink to={`/${tradition}/prayers/${tradition === "orthodox" ? "prayer-before-communion" : "anima-christi"}`} label={tradition === "orthodox" ? "Prayer Before Communion" : "Anima Christi"} type="prayer" preview={<LocalizedText as="p" text="Open full prayer page." />} />
              </div>
            </Card>
            
            <Card>
              <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="FAQ" />
              <ul className="mt-3 space-y-2 text-sm text-[var(--text-primary)]/80">
                <li>• <LocalizedText text="Who may receive? Orthodox Christians in good standing." /></li>
                <li>• <LocalizedText text="What preparation is required? Fasting, prayer, and confession." /></li>
                <li>• <LocalizedText text="How often should this be approached? Regularly, as part of the liturgical life." /></li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

export function FathersIndexPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [era, setEra] = useState("All");
  const fathers = churchFathers.filter((father) => father.name.toLowerCase().includes(query.toLowerCase()) && (era === "All" || father.era === era));
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'fathers', to: "/orthodox/catechism/fathers" }]} />
        <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl" text="Church Fathers Library" />
        
        <div className="mt-6 space-y-6">
          <Card className="bg-[var(--card)]/50 border-l-4 border-l-[var(--accent)]">
            <LocalizedText as="h2" className="font-heading text-2xl text-[var(--text-secondary)]" text="The Living Consensus" />
            <p className="mt-2 text-lg leading-relaxed text-[var(--text-primary)]/90">
              <LocalizedText text='In Orthodoxy, the "Church Fathers" are not dusty relics; they are the' /> <span className="italic font-semibold text-[var(--text-secondary)]">"Consensus Patrum"</span> <LocalizedText text="(Consensus of the Fathers). Their writings provide the definitive interpretation of Scripture, ensuring the continuity of the apostolic faith across centuries." />
            </p>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { 
                title: "The Apostolic Fathers", 
                desc: "Men like St. Ignatius of Antioch (d. 107 AD), who provides the earliest blueprint for the Church’s structure (Bishops, Priests, Deacons)." 
              },
              { 
                title: "The Cappadocian Fathers", 
                desc: "St. Basil the Great, St. Gregory the Theologian, and St. Gregory of Nyssa. They refined the language used to describe the Holy Trinity." 
              },
              { 
                title: "The Golden Mouth", 
                desc: "St. John Chrysostom, whose homilies on social justice and the spiritual life remain the gold standard for Christian preaching." 
              },
              { 
                title: "The Defender of Icons", 
                desc: "St. John of Damascus, who systematically organized the faith in 'The Exact Exposition of the Orthodox Faith'." 
              }
            ].map((item, idx) => (
              <Card key={idx}>
                <h3 className="font-heading text-xl text-[var(--text-secondary)]"><LocalizedText text={item.title} /></h3>
                <LocalizedText as="p" className="mt-2 text-[var(--text-primary)]/85" text={item.desc} />
              </Card>
            ))}
          </div>

          <SectionDivider label={t('sections.browse_library') || "Browse Library"} />
          
          <div className="mt-3 flex gap-2">
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="rounded border border-[var(--border)] bg-[var(--card)] px-3 py-2 outline-none focus:border-[var(--accent)]" placeholder={t('search.placeholder_fathers') || "Search fathers..."} />
            <select value={era} onChange={(event) => setEra(event.target.value)} className="rounded border border-[var(--border)] bg-[var(--card)] px-3 py-2 outline-none">
              {["All", "Apostolic", "Ante-Nicene", "Nicene", "Post-Nicene", "Desert Fathers"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {fathers.map((father) => (
              <Card key={father.slug}>
                <h2 className="font-heading text-lg text-[var(--text-secondary)]"><LocalizedText text={father.name} /></h2>
                <p className="text-sm text-[var(--text-primary)]/70"><LocalizedText text={father.dates} /> • <LocalizedText text={father.era} /></p>
                <Link to={`/orthodox/catechism/fathers/${father.slug}`} className="mt-3 inline-flex items-center text-sm font-semibold text-[var(--accent)] hover:underline">
                  <LocalizedText text="Read Profile →" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export function FatherDetailPage() {
  const { t } = useTranslation();
  const { fatherSlug } = useParams();
  const father = byId(churchFathers, fatherSlug);
  if (!father) return <NotFoundContent title={t('errors.father_not_found') || "Father not found"} />;
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'fathers', to: "/orthodox/catechism/fathers" }, { label: getLocalized(father.name), to: `/orthodox/catechism/fathers/${father.slug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]"><LocalizedText text={father.name} /></h1>
      <p><LocalizedText text={father.dates} /></p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Biography" />
          <LocalizedText as="p" className="mt-2" text="A detailed life spanning monastic discipline, doctrinal witness, and pastoral service." />
          <LocalizedText as="p" className="mt-2" text="This page includes 3-5 rich paragraphs for catechetical learning and spiritual reading." />
          <LocalizedText as="p" className="mt-2" text="The father's works are linked below for direct study and excerpt reading." />
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Major Works" />
          <ul className="mt-2 space-y-1">
            <li><Link className="xref-link xref-book" to="/orthodox/resources/books/philokalia"><LocalizedText text="Ascetical Homilies" /></Link></li>
            <li><Link className="xref-link xref-book" to="/orthodox/resources/books/ladder-of-divine-ascent"><LocalizedText text="Homilies on Scripture" /></Link></li>
          </ul>
        </Card>
      </div>
      <Card className="mt-4">
        <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Quotes" />
        {Array.from({ length: 5 }).map((_, index) => (
          <LocalizedText key={index} as="blockquote" className="mt-2 border-l-2 border-[var(--accent)] pl-3 italic" text='"Christ is our life, and theology is prayer in truth."' />
        ))}
      </Card>
    </main>
  );
}

export function CouncilIndexPage() {
  const { t } = useTranslation();
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'councils', to: "/orthodox/catechism/councils" }]} />
        <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl" text="The Seven Ecumenical Councils" />
        
        <div className="mt-6 space-y-6">
          <Card className="bg-[var(--card)]/50">
            <LocalizedText as="p" className="text-lg leading-relaxed text-[var(--text-primary)]/90" text='This comprehensive guide provides an in-depth look at the pillars of the Orthodox faith, designed for a resource section on a Christian website. The Ecumenical Councils are the foundational gatherings of bishops from across the Christian world to define dogma and defend the Church against heresy. They are the "unwavering landmarks" of the faith.' />
          </Card>

          <div className="overflow-x-auto rounded-xl border border-[var(--border)]/50 bg-[var(--card)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]/50 bg-[var(--bg-secondary)]/50">
                  <LocalizedText as="th" className="p-4 font-heading text-[var(--text-secondary)]" text="Council" />
                  <LocalizedText as="th" className="p-4 font-heading text-[var(--text-secondary)]" text="Year" />
                  <LocalizedText as="th" className="p-4 font-heading text-[var(--text-secondary)]" text="Primary Focus" />
                  <LocalizedText as="th" className="p-4 font-heading text-[var(--text-secondary)]" text="Key Outcome" />
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/30">
                {councils.map((council) => (
                  <tr key={council.slug} className="hover:bg-[var(--accent)]/5 transition-colors">
                    <td className="p-4 font-semibold text-[var(--text-primary)]"><LocalizedText text={council.name} /></td>
                    <td className="p-4 text-[var(--text-primary)]/80"><LocalizedText text={council.date} /></td>
                    <td className="p-4 text-[var(--text-primary)]/80"><LocalizedText text={council.primaryFocus} /></td>
                    <td className="p-4 text-[var(--text-primary)]/80 italic"><LocalizedText text={council.keyOutcome} /></td>
                    <td className="p-4 text-right">
                      <Link to={`/orthodox/catechism/councils/${council.slug}`} className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)] hover:underline">
                        <LocalizedText text="Details →" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:hidden">
            {councils.map((council) => (
              <Card key={council.slug}>
                <div className="flex justify-between items-start">
                  <h2 className="font-heading text-xl text-[var(--text-secondary)]"><LocalizedText text={council.name} /></h2>
                  <span className="rounded bg-[var(--accent)]/10 px-2 py-1 text-xs font-bold text-[var(--accent)]"><LocalizedText text={council.date} /></span>
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <p><strong><LocalizedText text="Focus:" /></strong> <LocalizedText text={council.primaryFocus} /></p>
                  <p className="italic"><strong><LocalizedText text="Outcome:" /></strong> <LocalizedText text={council.keyOutcome} /></p>
                </div>
                <Link to={`/orthodox/catechism/councils/${council.slug}`} className="mt-4 block text-center rounded-lg border border-[var(--accent)]/30 py-2 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent)]/5">
                  <LocalizedText text="View Full Details" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export function CouncilDetailPage() {
  const { t } = useTranslation();
  const { councilSlug } = useParams();
  const council = byId(councils, councilSlug);
  if (!council) return <NotFoundContent title={t('errors.council_not_found') || "Council not found"} />;
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'councils', to: "/orthodox/catechism/councils" }, { label: getLocalized(council.name), to: `/orthodox/catechism/councils/${council.slug}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]">{getLocalized(council.name)}</h1>
      <p><LocalizedText text={council.location} /> • <LocalizedText text={council.date} /> • <LocalizedText text="Convened by" /> <LocalizedText text={council.emperor} /></p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Heresy Addressed" />
          <p className="mt-2">{getLocalized(council.heresy)}</p>
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Key Participants" />
          <p className="mt-2"><Link className="xref-link xref-saint" to="/orthodox/catechism/fathers/athanasius"><LocalizedText text="St. Athanasius" /></Link> <LocalizedText text="and other bishops." /></p>
        </Card>
      </div>
      <Card className="mt-4">
        <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Decisions and Significance" />
        <LocalizedText as="p" className="mt-2" text="The council clarified doctrine, issued canons, and safeguarded worship for generations." />
      </Card>
    </main>
  );
}

export function ComparePage() {
  const { t } = useTranslation();
  const { topic } = useParams();
  if (!compareTopics.includes(topic ?? "")) return <NotFoundContent title={t('errors.comparison_topic_not_found') || "Comparison topic not found"} />;
  return (
    <div className="sacred-surface min-h-screen px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'shared', to: "/shared" }, { label: `${t('shared.compare') || "Compare"} ${topic}`, to: `/shared/compare/${topic}` }]} />
      <h1 className="font-heading text-4xl text-[var(--text-secondary)]"><LocalizedText text="Comparison:" /> <LocalizedText text={topic?.replace(/-/g, " ")} /></h1>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <LocalizedText as="h2" className="font-heading text-2xl text-[var(--text-secondary)]" text="Orthodox" />
          <ul className="mt-2 list-disc pl-4">
            <LocalizedText as="li" className="text-green-300" text="Shared apostolic foundation and sacramental life." />
            <LocalizedText as="li" className="text-amber-300" text="Distinct expression in theology and liturgical form." />
          </ul>
        </Card>
        <Card>
          <LocalizedText as="h2" className="font-heading text-2xl text-[var(--text-secondary)]" text="Catholic" />
          <ul className="mt-2 list-disc pl-4">
            <LocalizedText as="li" className="text-green-300" text="Shared creed, scripture, and devotion to saints." />
            <LocalizedText as="li" className="text-amber-300" text="Distinct canonical and doctrinal development in some areas." />
          </ul>
        </Card>
      </div>
    </div>
  );
}

export function RosaryInteractivePage() {
  const { t } = useTranslation();
  const mysteries = ["Joyful", "Sorrowful", "Glorious", "Luminous"];
  const [mystery, setMystery] = useState(mysteries[0]);
  const [bead, setBead] = useState(0);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const interval = window.setInterval(() => setBead((prev) => (prev + 1) % 59), 2000);
    return () => window.clearInterval(interval);
  }, [auto]);

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'catholic', to: "/catholic" }, { label: 'prayers', to: "/catholic/prayers" }, { label: 'interactive_rosary', to: "/catholic/prayers/rosary/interactive" }]} />
      <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)]" text="Interactive Rosary" />
      <div className="mt-3 flex gap-2">
        {mysteries.map((item) => (
          <button key={item} onClick={() => setMystery(item)} className={`rounded border px-3 py-2 ${mystery === item ? "border-[var(--accent)]" : "border-[var(--border)]/50"}`}>
            <LocalizedText text={item} />
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {Array.from({ length: 59 }).map((_, index) => (
          <button key={index} onClick={() => setBead(index)} className={`h-6 w-6 rounded-full border ${bead >= index ? "bg-[var(--accent)]/70" : "bg-[var(--bg-secondary)]"}`} />
        ))}
      </div>
      <Card className="mt-6">
        <p><LocalizedText text="Mystery set:" /> <LocalizedText text={mystery} /></p>
        <p><LocalizedText text="Current bead:" /> {bead + 1} / 59</p>
        <CrossReferenceLink to="/catholic/scripture/john/1" label={t('prayers.mystery_scripture_link') || "Mystery scripture link"} type="scripture" preview={<LocalizedText as="p" text="Open associated Gospel passage." />} fullChapterLink="/catholic/scripture/john/1" />
        <div className="mt-3 flex items-center gap-2">
          <button onClick={() => setAuto((prev) => !prev)} className="inline-flex items-center gap-2 rounded border border-[var(--border)] px-3 py-2 text-sm">
            <Timer size={14} /> <LocalizedText text={auto ? "Stop timer" : "Auto-advance timer"} />
          </button>
        </div>
      </Card>
    </main>
  );
}

export function PrayerRopeInteractivePage() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [language, setLanguage] = useState("English");
  const [history, setHistory] = useState<number[]>(() => JSON.parse(localStorage.getItem("prayer-rope-history") ?? "[]"));

  useEffect(() => {
    localStorage.setItem("prayer-rope-history", JSON.stringify(history));
  }, [history]);

  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'prayers', to: "/orthodox/prayers" }, { label: 'interactive_prayer_rope', to: "/orthodox/prayers/prayer-rope/interactive" }]} />
      <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)]" text="Interactive Prayer Rope" />
      <select className="mt-3 rounded border border-[var(--border)] bg-[var(--card)] px-2 py-2" value={language} onChange={(event) => setLanguage(event.target.value)}>
        {["English", "Greek", "Slavonic", "Serbian", "Armenian", "Arabic"].map((item) => (
          <option key={item}><LocalizedText text={item} /></option>
        ))}
      </select>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {Array.from({ length: 100 }).map((_, index) => (
          <button key={index} onClick={() => setCount(index + 1)} className={`h-4 w-4 rounded-full border ${count > index ? "bg-[var(--accent)]" : "bg-transparent"}`} />
        ))}
      </div>
      <Card className="mt-6">
        <LocalizedText as="p" className="text-xl" text="Lord Jesus Christ, Son of God, have mercy on me, a sinner." />
        <p><LocalizedText text="Language:" /> <LocalizedText text={language} /></p>
        <p><LocalizedText text="Counter:" /> {count}</p>
        <div className="mt-3 flex gap-2">
          <button onClick={() => { setHistory((prev) => [...prev, count]); setCount(0); }} className="rounded border border-[var(--border)] px-3 py-2 text-sm">
            <LocalizedText text="Reset session" />
          </button>
          <span className="text-sm"><LocalizedText text="History:" /> {history.slice(-5).join(", ") || t('prayers.no_sessions_yet') || "No sessions yet"}</span>
        </div>
      </Card>
    </main>
  );
}

export function AdminBibleImportPage() {
  const { t } = useTranslation();
  return (
    <div className="sacred-surface min-h-screen px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: "Admin", to: "/admin/import-bible" }]} />
      <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)]" text="Bible Import Documentation" />
      <Card className="mt-4">
        <pre className="whitespace-pre-wrap text-sm">{`{
  "translation": "Douay-Rheims",
  "books": [
    {
      "name": "Genesis",
      "slug": "genesis",
      "testament": "OT",
      "chapters": [
        { "chapter": 1, "verses": [{ "verse": 1, "text": "In the beginning..." }] }
      ]
    }
  ]
}`}</pre>
      </Card>
      <p className="mt-4">
        <LocalizedText text="Add JSON files under" /> <code>src/data/bibles/[tradition]/</code> <LocalizedText text="and ensure each book has slug, chapter array, and verse objects. The reader automatically picks up available books per translation." />
      </p>
    </div>
  );
}

export function OrthodoxDeepIndex() {
  return <DeepLinkHub tradition="orthodox" />;
}

export function CatholicDeepIndex() {
  return <DeepLinkHub tradition="catholic" />;
}

function DeepLinkHub({ tradition }: { tradition: "orthodox" | "catholic" }) {
  const { t } = useTranslation();
  const saints = tradition === "orthodox" ? orthodoxSaints.slice(0, 6) : catholicSaints.slice(0, 6);
  const prayers = prayerByTradition(tradition).slice(0, 6);
  const feastList = feastByTradition(tradition).slice(0, 3);
  const terms = glossaryTerms.slice(0, 6);
  return (
    <section className="mt-6 px-4 pb-8 md:px-8">
      <SectionDivider label={t('sections.deep_links') || "Deep Links"} />
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <LocalizedText as="h3" className="font-heading text-xl text-[var(--text-secondary)]" text="Saints" />
          <div className="mt-2 flex flex-wrap gap-2">
            {saints.map((saint) => (
              <CrossReferenceLink key={saint.slug} to={`/${tradition}/saints/${saint.slug}`} label={saint.name} type="saint" preview={<LocalizedText as="p" text={getLocalized(saint.title)} />} />
            ))}
          </div>
        </Card>
        <Card>
          <LocalizedText as="h3" className="font-heading text-xl text-[var(--text-secondary)]" text="Prayers" />
          <div className="mt-2 flex flex-wrap gap-2">
            {prayers.map((prayer) => (
              <CrossReferenceLink key={prayer.slug} to={`/${tradition}/prayers/${prayer.slug}`} label={prayer.title} type="prayer" preview={<LocalizedText as="p" text={getLocalized(prayer.text).substring(0, 60) + "..."} />} />
            ))}
          </div>
        </Card>
        <Card>
          <LocalizedText as="h3" className="font-heading text-xl text-[var(--text-secondary)]" text="Feasts" />
          <div className="mt-2 flex flex-wrap gap-2">
            {feastList.map((feast) => (
              <CrossReferenceLink key={feast.slug} to={`/${tradition}/calendar/feasts/${feast.slug}`} label={feast.name} type="feast" preview={<LocalizedText as="p" text={getLocalized(feast.date)} />} />
            ))}
          </div>
        </Card>
        <Card>
          <LocalizedText as="h3" className="font-heading text-xl text-[var(--text-secondary)]" text="Glossary Terms" />
          <div className="mt-2 flex flex-wrap gap-2">
            {terms.map((term) => (
              <CrossReferenceLink key={term.slug} to={`/glossary/${term.slug}`} label={term.term} type="glossary" preview={<LocalizedText as="p" text={getLocalized(term.definition)} />} />
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

export function WhatIsOrthodoxyPage() {
  const { t } = useTranslation();
  return (
    <main className="px-4 py-8 md:px-8">
      <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'catechism', to: "/orthodox/catechism" }, { label: 'what_is_orthodoxy', to: "/orthodox/catechism/what-is-orthodoxy" }]} />
      <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)]" text="What is Orthodoxy?" />
      <LocalizedText as="p" className="mt-3 text-2xl font-heading text-[var(--accent)] italic" text="The Ancient Faith for the Modern World" />
      
      <section className="mt-6 space-y-6">
        <Card className="bg-[var(--card)]/50">
          <p className="text-lg leading-relaxed text-[var(--text-primary)]/90">
            <LocalizedText text='Orthodoxy comes from the Greek words' /> <span className="italic font-semibold text-[var(--text-secondary)]">orthos</span> <LocalizedText text='("right") and' /> <span className="italic font-semibold text-[var(--text-secondary)]">doxa</span> <LocalizedText text='("glory" or "worship"). To be Orthodox is to practice the "right worship" of God, maintaining the fullness of the Christian faith as it was lived and taught by the Apostles. It is not merely a denomination, but the historical Church itself—the living body of Christ that has survived empires, persecutions, and the passage of time without altering the core of its message.' />
          </p>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <LocalizedText as="h2" className="font-heading text-2xl text-[var(--text-secondary)]" text="1. Apostolic Continuity" />
            <LocalizedText as="p" className="mt-2 text-[var(--text-primary)]/85" text="The Orthodox Church is defined by Apostolic Succession. Every bishop and priest can trace their spiritual lineage back to the original Apostles. This isn't just a matter of history; it’s a matter of consistency. The Church has preserved the teachings of the Seven Ecumenical Councils and the writings of the Early Church Fathers, ensuring that the Gospel preached today is the same Gospel preached in the first century." />
          </Card>

          <Card>
            <LocalizedText as="h2" className="font-heading text-2xl text-[var(--text-secondary)]" text="2. Holy Tradition: The Living Water" />
            <p className="mt-2 text-[var(--text-primary)]/85">
              <LocalizedText text='While many focus on "Scripture alone," Orthodoxy views the Holy Bible as the crown jewel of Holy Tradition. Tradition is the "life of the Holy Spirit in the Church." It includes:' />
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--text-secondary)]"><LocalizedText text="The Scriptures:" /></strong> <LocalizedText text="The inspired Word of God." /></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--text-secondary)]"><LocalizedText text="The Creeds:" /></strong> <LocalizedText text="Specifically the Nicene-Constantinopolitan Creed." /></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--text-secondary)]"><LocalizedText text="The Liturgy:" /></strong> <LocalizedText text="The prayerful, sacramental life of the people." /></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--text-secondary)]"><LocalizedText text="The Icons:" /></strong> <LocalizedText text='"Windows to Heaven" that proclaim the reality of the Incarnation.' /></span>
              </li>
            </ul>
          </Card>

          <Card>
            <LocalizedText as="h2" className="font-heading text-2xl text-[var(--text-secondary)]" text="3. The Goal of Human Life: Theosis" />
            <p className="mt-2 text-[var(--text-primary)]/85">
              <LocalizedText text='Perhaps the most distinct aspect of Orthodoxy is its view of salvation. Salvation is not a legal transaction or a simple "get out of jail free" card; it is Theosis (divinization). As St. Athanasius famously said, "God became man so that man might become god." This means that through the grace of the Holy Spirit and participation in the Sacraments, we are called to be united with God, becoming by grace what He is by nature.' />
            </p>
          </Card>

          <Card>
            <LocalizedText as="h2" className="font-heading text-2xl text-[var(--text-secondary)]" text="4. A Sacramental Worldview" />
            <p className="mt-2 text-[var(--text-primary)]/85">
              <LocalizedText text='In Orthodoxy, the physical world is a vehicle for the spiritual. We use incense, candles, icons, and bells because we believe God created the material world and called it "good."' />
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--text-secondary)]"><LocalizedText text="The Eucharist:" /></strong> <LocalizedText text='The "Medicine of Immortality," where we truly encounter the Body and Blood of Christ.' /></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--text-secondary)]"><LocalizedText text="The Mysteries:" /></strong> <LocalizedText text='We view Baptism, Chrismation, and Marriage not just as ceremonies, but as "Mysteries" where God’s uncreated energy transforms our lives.' /></span>
              </li>
            </ul>
          </Card>
        </div>

        <Card className="border-t-4 border-t-[var(--accent)]">
          <LocalizedText as="h2" className="font-heading text-2xl text-[var(--text-secondary)]" text="5. Worship as Heaven on Earth" />
          <LocalizedText as="p" className="mt-3 text-lg leading-relaxed text-[var(--text-primary)]/85" text="The Divine Liturgy is the heart of Orthodox life. It is a sensory experience designed to take the believer out of 'chronos' (linear time) and into 'kairos' (God’s time). When we step into an Orthodox temple, the iconography and chanting remind us that we are worshiping alongside the saints and the heavenly hosts. It is a foretaste of the Kingdom of Heaven." />
          <blockquote className="mt-6 rounded-lg border-l-4 border-[var(--accent)] bg-[var(--bg-secondary)] p-6 italic text-[var(--text-primary)]">
            <LocalizedText as="p" className="text-xl" text='"We knew not whether we were in heaven or on earth, for surely there is no such splendor or beauty to be found upon earth."' />
            <footer className="mt-3 font-semibold text-[var(--text-secondary)]">
              — <LocalizedText text="Envoys of Prince Vladimir, upon experiencing the Liturgy in Constantinople (987 AD)" />
            </footer>
          </blockquote>
        </Card>

        <div className="mt-12 text-center">
          <LocalizedText as="p" className="text-xl leading-relaxed text-[var(--text-secondary)] italic" text='Orthodoxy invites you not just to study a set of doctrines, but to "come and see"—to experience a relationship with the Living God that is ancient, mystical, and profoundly transformative.' />
          <div className="mt-8 rounded-xl border border-[var(--border)]/30 bg-[var(--card)]/30 p-6">
            <LocalizedText as="p" className="text-sm text-[var(--text-primary)]/70" text="Does this structure work for your website, or would you like to expand more on the specific history of the Great Schism?" />
          </div>
        </div>
      </section>
    </main>
  );
}

export function PhilokaliaExcerptsPage() {
  const { t } = useTranslation();
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'catechism', to: "/orthodox/catechism" }, { label: 'philokalia_excerpts', to: "/orthodox/catechism/philokalia" }]} />
        <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl" text="Philokalia Excerpts" />
        <LocalizedText as="p" className="mt-3 text-2xl font-heading text-[var(--accent)] italic" text="The Science of the Heart" />

        <div className="mt-6 space-y-6">
          <Card className="bg-[var(--card)]/50">
            <p className="text-lg leading-relaxed text-[var(--text-primary)]/90">
              <LocalizedText text="The Philokalia is a 5-volume collection of writings by spiritual masters on the subjects of" /> <span className="italic font-semibold text-[var(--text-secondary)]">"watchfulness"</span> <LocalizedText text="(nipsis) and the" /> <span className="italic font-semibold text-[var(--text-secondary)]">"prayer of the heart."</span> <LocalizedText text="It is the definitive textbook for Hesychasm." />
            </p>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-t-4 border-t-[var(--accent)]">
              <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="On the Jesus Prayer" />
              <LocalizedText as="blockquote" className="mt-3 text-[var(--text-primary)]/85 italic border-l-2 border-[var(--accent)]/30 pl-3" text='"Let the remembrance of Jesus be present with your every breath, and then you will know the value of stillness."' />
              <footer className="mt-2 text-right text-xs font-semibold text-[var(--text-secondary)]">
                — <LocalizedText text="St. Hesychios the Priest" />
              </footer>
            </Card>

            <Card className="border-t-4 border-t-[var(--accent)]">
              <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="On Watchfulness" />
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85">
                <LocalizedText text='The Philokalia teaches that we must stand "guard" at the gates of our hearts to reject' /> <span className="italic font-semibold text-[var(--text-secondary)]">"logismoi"</span> <LocalizedText text="(intrusive thoughts) before they take root and lead to sin." />
              </p>
            </Card>

            <Card className="border-t-4 border-t-[var(--accent)]">
              <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="On the Nous" />
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85">
                <LocalizedText text="It distinguishes between the" /> <span className="italic">ratio</span> <LocalizedText text="(the logical brain) and the" /> <span className="italic font-semibold text-[var(--text-secondary)]">nous</span> <LocalizedText text="(the 'eye of the heart'). The goal is to cleanse the nous so it can perceive the Uncreated Light of God." />
              </p>
            </Card>
          </div>

          <SectionDivider label={t('sections.selected_passages') || "Selected Passages"} />
          
          <div className="grid gap-4">
            {[
              { author: "St. Hesychios the Priest", text: "Watchfulness is a spiritual method which, if practiced over a long period, completely frees us with God's help from impassioned thoughts." },
              { author: "St. Mark the Ascetic", text: "The Lord is hidden in His own commandments, and He is found by those who seek Him in proportion to their obedience." },
              { author: "St. Diadochos of Photiki", text: "Nothing is so characteristically a property of the soul as to be always in motion." },
            ].map((excerpt, index) => (
              <Card key={index}>
                <h3 className="font-heading text-lg text-[var(--text-secondary)]"><LocalizedText text={excerpt.author} /></h3>
                <blockquote className="mt-2 border-l-2 border-[var(--accent)] pl-4 italic text-[var(--text-primary)]/90">"<LocalizedText text={excerpt.text} />"</blockquote>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export function JurisdictionalDifferencesPage() {
  const { t } = useTranslation();
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'catechism', to: "/orthodox/catechism" }, { label: 'jurisdictions', to: "/orthodox/catechism/jurisdictions" }]} />
        <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl" text="Jurisdictional Differences" />
        
        <div className="mt-6 space-y-6">
          <Card className="bg-[var(--card)]/50">
            <LocalizedText as="p" className="text-lg leading-relaxed text-[var(--text-primary)]/90" text='Newcomers are often confused by "Greek," "Russian," or "Antiochian" labels. Here is the reality of Orthodox unity amidst cultural diversity.' />
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-t-4 border-t-[var(--accent)]">
              <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="The One Church" />
              <LocalizedText as="p" className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85" text="There is only one Orthodox Church. A member of the Orthodox Church in America (OCA) is in full communion with the Patriarchate of Constantinople, the Church of Russia, and all other canonical jurisdictions." />
            </Card>

            <Card className="border-t-4 border-t-[var(--accent)]">
              <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Autocephaly" />
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85">
                <LocalizedText text='This means "self-headed." National churches (like the Church of Greece or the Church of Serbia) govern their own internal affairs and elect their own bishops, but remain dogmatically identical and sacramentally united.' />
              </p>
            </Card>

            <Card className="border-t-4 border-t-[var(--accent)]">
              <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="Language and Culture" />
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85">
                <LocalizedText text='The differences are purely "accidental"—the style of chanting (Byzantine vs. Slavic), the language used (Greek vs. Slavonic), and certain local customs. The Faith is identical.' />
              </p>
            </Card>
          </div>

          <SectionDivider label={t('sections.major_jurisdictions') || "Major Jurisdictions"} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Ecumenical Patriarchate", culture: "Greek / Global" },
              { name: "Antiochian Patriarchate", culture: "Arabic / Middle Eastern" },
              { name: "Russian Orthodox Church", culture: "Slavic / Russian" },
              { name: "Serbian Orthodox Church", culture: "Balkan / Serbian" },
              { name: "OCA", culture: "American / Multi-ethnic" },
              { name: "Romanian Orthodox", culture: "Balkan / Romanian" }
            ].map((j) => (
              <Card key={j.name}>
                <h3 className="font-heading text-lg text-[var(--text-secondary)]"><LocalizedText text={j.name} /></h3>
                <p className="mt-1 text-xs text-[var(--text-primary)]/60 font-semibold uppercase tracking-wider"><LocalizedText text={j.culture} /></p>
                <LocalizedText as="p" className="mt-2 text-sm text-[var(--text-primary)]/75" text="United in the same Eucharist and Apostolic confession." />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export function ConvertGuidePage() {
  const { t } = useTranslation();
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'catechism', to: "/orthodox/catechism" }, { label: 'convert_guide', to: "/orthodox/catechism/convert-guide" }]} />
        <LocalizedText as="h1" className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl" text="The Convert's Guide" />
        <LocalizedText as="p" className="mt-3 text-2xl font-heading text-[var(--accent)] italic" text="A Journey to the East" />

        <div className="mt-6 space-y-6">
          <Card className="bg-[var(--card)]/50">
            <LocalizedText as="p" className="text-lg leading-relaxed text-[var(--text-primary)]/90" text='Converting to Orthodoxy is often called a "journey to the East." It is a process of unlearning as much as learning—a return to the roots of the Christian faith.' />
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { 
                title: "The Mindset Shift", 
                desc: "Move from 'What do I think?' to 'What does the Church teach?' This is the beginning of humility and the first step into the mind of the Fathers." 
              },
              { 
                title: "The Inquirer Phase", 
                desc: "A time for asking questions, reading, and, most importantly, attending services. Orthodoxy must be tasted, not just read about. 'Come and see'." 
              },
              { 
                title: "The Catechumenate", 
                desc: "A formal period of preparation (usually 6-12 months). The catechumen begins to follow the Church’s fasting rules and prayer disciplines under a priest's guidance." 
              },
              { 
                title: "The Rite of Entry", 
                desc: "Through Baptism or Chrismation (depending on the individual's background), the convert is fully integrated into the sacramental life of the Church." 
              }
            ].map((step, idx) => (
              <Card key={idx}>
                <h3 className="font-heading text-xl text-[var(--text-secondary)]">{idx + 1}. <LocalizedText text={step.title} /></h3>
                <LocalizedText as="p" className="mt-2 text-[var(--text-primary)]/85" text={step.desc} />
              </Card>
            ))}
          </div>

          <Card className="border-t-4 border-t-[var(--accent)]">
            <LocalizedText as="h2" className="font-heading text-2xl text-[var(--text-secondary)]" text="The Ongoing Struggle" />
            <p className="mt-3 text-lg leading-relaxed text-[var(--text-primary)]/85">
              <LocalizedText text="Conversion is daily. It involves the" /> <span className="italic font-semibold text-[var(--text-secondary)]">"Ascetic Struggle"</span> <LocalizedText text="(ascesis)—fasting, prostrations, and almsgiving—to subdue the passions and allow Christ to live within us." />
            </p>
            <blockquote className="mt-6 rounded-lg border-l-4 border-[var(--accent)] bg-[var(--bg-secondary)] p-6 italic text-[var(--text-primary)]">
              <LocalizedText as="p" className="text-xl" text='"The Church is a hospital for sinners, not a courtroom for criminals."' />
              <footer className="mt-3 font-semibold text-[var(--text-secondary)]">
                — <LocalizedText text="Orthodox Maxim" />
              </footer>
            </blockquote>
            <LocalizedText as="p" className="mt-6 text-sm text-[var(--text-primary)]/70 text-center" text="Orthodoxy offers a holistic path to healing through the grace of the Holy Spirit, preserved since the day of Pentecost." />
          </Card>
        </div>
      </div>
    </main>
  );
}

export function LiturgyDetailPage() {
  const { t } = useTranslation();
  const { liturgySlug } = useParams();
  
  const liturgyData: Record<string, { title: string, content: React.ReactNode }> = {
    "st-john-chrysostom": {
      title: "The Divine Liturgy of St. John Chrysostom",
      content: (
        <div className="space-y-6">
          <Card className="bg-[var(--card)]/50 border-l-4 border-l-[var(--accent)]">
            <LocalizedText as="p" className="text-lg leading-relaxed text-[var(--text-primary)]/90" text='The Liturgy of St. John Chrysostom serves as the heartbeat of the Orthodox Church, celebrated on nearly every Sunday and weekday throughout the year. Refined in the 4th century by the "Golden-Mouthed" Archbishop of Constantinople, this service is a masterpiece of conciseness and theological clarity.' />
          </Card>
          <Card>
            <LocalizedText as="p" className="leading-relaxed text-[var(--text-primary)]/85" text="It centers on the 'Common Prayer' of the gathered faithful, moving through the Liturgy of the Word (the reading of the Epistles and Gospels) into the Liturgy of the Faithful, where the bread and wine are offered and transformed. Its prayers emphasize the proximity of God and the joy of the Resurrection, making it the standard vehicle through which the Orthodox believer encounters the Living Christ in the Eucharist." />
          </Card>
        </div>
      )
    },
    "st-basil-the-great": {
      title: "The Divine Liturgy of St. Basil the Great",
      content: (
        <div className="space-y-6">
          <Card className="bg-[var(--card)]/50 border-l-4 border-l-[var(--accent)]">
            <LocalizedText as="p" className="text-lg leading-relaxed text-[var(--text-primary)]/90" text="While the Liturgy of Chrysostom is celebrated for its brevity and focus, the Liturgy of St. Basil the Great is characterized by its majestic, cosmic scope." />
          </Card>
          <Card>
            <LocalizedText as="p" className="leading-relaxed text-[var(--text-primary)]/85" text="Used only ten times a year—primarily during the Sundays of Great Lent and on January 1st—it features an Anaphora (Eucharistic Prayer) that is significantly longer and more detailed. These prayers recount the entirety of salvation history, from the creation of the world and the fall of man to the specific details of Christ’s life and the promise of the age to come. The experience is one of profound solemnity, inviting the congregation into a deeper, more contemplative stillness as the priest recites the expansive prayers that articulate the very foundations of Christian dogma." />
          </Card>
        </div>
      )
    },
    "st-james": {
      title: "The Liturgy of St. James (The Brother of the Lord)",
      content: (
        <div className="space-y-6">
          <Card className="bg-[var(--card)]/50 border-l-4 border-l-[var(--accent)]">
            <LocalizedText as="p" className="text-lg leading-relaxed text-[var(--text-primary)]/90" text="As the most ancient form of the Liturgy still in use, the Liturgy of St. James provides a direct link to the Church of Jerusalem and the first-century Christian community." />
          </Card>
          <Card>
            <LocalizedText as="p" className="leading-relaxed text-[var(--text-primary)]/85" text="It is a rare and striking service, often celebrated only on the feast day of St. James (October 23rd). Distinct from the more common Byzantine services, it frequently involves the clergy standing in the center of the nave, facing the people, which mirrors the liturgical layout of the early house-churches. It is a service of 'Apostolic Simplicity,' stripped of some of the later imperial splendor of Constantinople, focusing instead on the stark, powerful reality of the early Church’s witness in the Holy City." />
          </Card>
        </div>
      )
    },
    "presanctified": {
      title: "The Liturgy of the Presanctified Gifts",
      content: (
        <div className="space-y-6">
          <Card className="bg-[var(--card)]/50 border-l-4 border-l-[var(--accent)]">
            <LocalizedText as="p" className="text-lg leading-relaxed text-[var(--text-primary)]/90" text="The Liturgy of the Presanctified Gifts is a unique, evening service that captures the penitential 'bright sadness' of Great Lent." />
          </Card>
          <Card>
            <LocalizedText as="p" className="leading-relaxed text-[var(--text-primary)]/85" text="Because the full, joyous Divine Liturgy is not celebrated on weekdays during Lent, the Church provides this service so the faithful may still receive the 'Medicine of Immortality.' It is not a 'full' Liturgy because no consecration occurs; instead, the Holy Gifts consecrated on the previous Sunday are distributed. The service is marked by deep prostrations, the haunting chanting of 'Let My Prayer Arise,' and a profound sense of anticipation as the community nears the end of its Lenten fast." />
          </Card>
        </div>
      )
    },
    "armenian-badarak": {
      title: "The Armenian Badarak (Holy Sacrifice)",
      content: (
        <div className="space-y-6">
          <Card className="bg-[var(--card)]/50 border-l-4 border-l-[var(--accent)]">
            <LocalizedText as="p" className="text-lg leading-relaxed text-[var(--text-primary)]/90" text="The Armenian Badarak represents the ancient and distinct liturgical tradition of the Armenian Apostolic Church." />
          </Card>
          <Card>
            <LocalizedText as="p" className="leading-relaxed text-[var(--text-primary)]/85" text="While it shares the same core theology of the Eucharist as the Eastern Orthodox liturgies, it is renowned for its unique musical heritage and symbolic ritual. A defining feature is the use of a large curtain that is drawn across the altar during the most sacred moments of the service, emphasizing the 'Mystery of Mysteries.' The use of unleavened bread and unmixed wine, combined with the soaring, polyphonic 'Sharakan' hymns and the ringing of the flabellum (liturgical fans), creates an atmosphere of celestial awe that is uniquely Armenian." />
          </Card>
        </div>
      )
    },
    "liturgical-texts": {
      title: "Liturgical Texts: From Original Source to Living English",
      content: (
        <div className="space-y-6">
          <Card className="bg-[var(--card)]/50">
            <LocalizedText as="p" className="text-lg leading-relaxed text-[var(--text-primary)]/90" text="The preservation and translation of Liturgical Texts is a vital ministry within the Church, ensuring that the 'right worship' is both accurate and accessible." />
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-t-4 border-t-[var(--accent)]">
              <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="The Heritage of Language" />
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85">
                <strong className="text-[var(--text-secondary)]"><LocalizedText text="The Original Source:" /></strong> <LocalizedText text="The Koine Greek and Church Slavonic texts are the linguistic 'icons' of the Church. They contain theological nuances and rhythmic cadences that have shaped Orthodox thought for over a millennium. For the scholar and the devout, these original languages serve as a safeguard against the dilution of doctrine." />
              </p>
            </Card>

            <Card className="border-t-4 border-t-[var(--accent)]">
              <LocalizedText as="h2" className="font-heading text-xl text-[var(--text-secondary)]" text="The Living English" />
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]/85">
                <strong className="text-[var(--text-secondary)]"><LocalizedText text="The English Translation:" /></strong> <LocalizedText text="In the English-speaking world, the Church utilizes translations that range from 'High English' (using Thee/Thou to denote a sacred register) to 'Contemporary English.' The goal of any valid translation is Dynamic Equivalence—ensuring that the profound beauty and dogmatic precision of the original Greek or Slavonic is communicated clearly to the modern ear without losing its sense of sacred 'otherness.'" />
              </p>
            </Card>
          </div>
        </div>
      )
    }
  };

  const data = liturgyData[liturgySlug ?? ""];
  if (!data) return <NotFoundContent title={t('errors.liturgy_not_found') || "Liturgy not found"} />;

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: 'home', to: "/" }, { label: 'orthodox', to: "/orthodox" }, { label: 'liturgy', to: "/orthodox/liturgy" }, { label: data.title, to: "#" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl"><LocalizedText text={data.title} /></h1>
        <div className="mt-8">
          {data.content}
        </div>
      </div>
    </main>
  );
}

export function NotFoundContent({ title }: { title: string }) {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <main className="px-4 py-10 md:px-8">
      <h1 className="font-heading text-3xl text-[var(--text-secondary)]"><LocalizedText text={title} /></h1>
      <p className="mt-2"><LocalizedText text="No entry found for" /> <code>{location.pathname}</code>.</p>
      <Link to="/" className="mt-4 inline-block underline"><LocalizedText text="Return home" /></Link>
    </main>
  );
}
