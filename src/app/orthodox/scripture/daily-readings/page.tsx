import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import SectionDivider from "../../../../components/SectionDivider";
import LocalizedText from "../../../../components/LocalizedText";
import { bibleService } from "../../../../services/BibleService";

type ReadingPick = {
  translationId: string;
  bookId: string;
  bookName: string;
  chapter: number;
};

export default function DailyScriptureReadingsPage() {
  const [otReading, setOtReading] = useState<ReadingPick | null>(null);
  const [ntReading, setNtReading] = useState<ReadingPick | null>(null);
  const [loading, setLoading] = useState(true);

  const pickRandomReading = async (testament: "OT" | "NT"): Promise<ReadingPick> => {
    // Pick an appropriate strictly-scoped translation for the testament
    const translationId = testament === 'OT' ? 'grc_bre' : 'grc_byz';
    const books = await bibleService.getBooks(translationId);
    
    // Simple filter for OT/NT (this is a heuristic, HelloAO doesn't explicitly flag OT/NT in books.json usually, 
    // but we can infer from position or ID)
    // Most Bible APIs have GEN-MAL for OT and MAT-REV for NT
    const otIds = ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA', '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO', 'ECC', 'SNG', 'ISA', 'JER', 'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO', 'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL'];
    const ntIds = ['MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS', '1PE', '2PE', '1JO', '2JO', '3JO', 'JUD', 'REV'];

    const candidates = books.filter(b => testament === 'OT' ? otIds.includes(b.id) : ntIds.includes(b.id));
    const randomBook = candidates[Math.floor(Math.random() * candidates.length)];
    const randomChapter = Math.floor(Math.random() * randomBook.numberOfChapters) + 1;

    return {
      translationId,
      bookId: randomBook.id,
      bookName: randomBook.name,
      chapter: randomChapter
    };
  };

  const refreshOT = async () => {
    const pick = await pickRandomReading("OT");
    setOtReading(pick);
  };

  const refreshNT = async () => {
    const pick = await pickRandomReading("NT");
    setNtReading(pick);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([refreshOT(), refreshNT()]);
      setLoading(false);
    };
    init();
  }, []);

  const combinedReference = useMemo(
    () => otReading && ntReading ? `${otReading.bookName} ${otReading.chapter} and ${ntReading.bookName} ${ntReading.chapter}` : "",
    [otReading, ntReading]
  );

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "home", to: "/" },
            { label: "orthodox", to: "/orthodox" },
            { label: "holy_scripture", to: "/orthodox/scripture" },
            { label: "Daily Scripture Readings", to: "/orthodox/scripture/daily-readings" },
          ]}
        />

        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">
          <LocalizedText text="Daily Scripture Readings" />
        </h1>
        <p className="mt-3 text-lg text-[var(--text-primary)]/88">
          <LocalizedText text="Each refresh gives one Old Testament chapter and one New Testament chapter for prayerful reading." />
        </p>

        <SectionDivider label={loading ? "Loading..." : "Today's Random Reading"} />

        {loading ? (
          <div className="py-20 text-center animate-pulse text-[var(--text-primary)]/40">Picking readings...</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {otReading && (
              <Card>
                <p className="text-sm text-[var(--text-primary)]/70">Old Testament</p>
                <h2 className="mt-2 font-heading text-2xl text-[var(--text-secondary)]">
                  {otReading.bookName} {otReading.chapter}
                </h2>
                <Link
                  to={`/orthodox/scripture/old-testament?book=${otReading.bookId}&chapter=${otReading.chapter}&trans=${otReading.translationId}`}
                  className="mt-3 inline-block rounded-md border border-[var(--border)] px-3 py-2 text-sm transition-all hover:bg-[var(--accent)]/5 hover:border-[var(--accent)]"
                >
                  Read Chapter
                </Link>
              </Card>
            )}

            {ntReading && (
              <Card>
                <p className="text-sm text-[var(--text-primary)]/70">New Testament</p>
                <h2 className="mt-2 font-heading text-2xl text-[var(--text-secondary)]">
                  {ntReading.bookName} {ntReading.chapter}
                </h2>
                <Link
                  to={`/orthodox/scripture/new-testament?book=${ntReading.bookId}&chapter=${ntReading.chapter}&trans=${ntReading.translationId}`}
                  className="mt-3 inline-block rounded-md border border-[var(--border)] px-3 py-2 text-sm transition-all hover:bg-[var(--accent)]/5 hover:border-[var(--accent)]"
                >
                  Read Chapter
                </Link>
              </Card>
            )}
          </div>
        )}

        {!loading && (
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={refreshOT} className="rounded-md border border-[var(--border)] px-3 py-2 text-sm hover:bg-[var(--accent)]/5">
              New Old Testament Reading
            </button>
            <button onClick={refreshNT} className="rounded-md border border-[var(--border)] px-3 py-2 text-sm hover:bg-[var(--accent)]/5">
              New New Testament Reading
            </button>
          </div>
        )}

        <p className="mt-4 text-sm text-[var(--text-primary)]/75">Current pair: {combinedReference}</p>
      </div>
    </main>
  );
}
