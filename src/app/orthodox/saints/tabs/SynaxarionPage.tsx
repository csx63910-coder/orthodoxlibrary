import { useEffect, useState, useCallback, useMemo } from "react";
import { Search, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import OrthodoxSaintTabs from "../../../../components/OrthodoxSaintTabs";
import LocalizedText from "../../../../components/LocalizedText";
import { getLocalized } from "../../../../utils/cn";
import orthodoxCalendarData from "../../../../data/orthodox_calendar_data.json";
import i18next from "i18next";

export default function SynaxarionPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      const [m, d] = dateParam.split("-").map(Number);
      if (!isNaN(m) && !isNaN(d)) {
        const date = new Date();
        date.setMonth(m - 1);
        date.setDate(d);
        return date;
      }
    }
    return new Date();
  });

  const fetchDay = useCallback(async (d: Date) => {
    setLoading(true);
    try {
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const day = d.getDate();

      const lang = (i18next.language || 'en').split('-')[0];
      const langFolder = ['el', 'ru'].includes(lang) ? lang : 'en';

      // Try local first
      try {
        const localRes = await fetch(`/data/saints/${langFolder}/${y}_${m}.json`);
        if (localRes.ok) {
          const monthData = await localRes.json();
          const dayData = monthData.find((item: any) => item.day === day);
          if (dayData) {
            setData(dayData);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn("Local data not found, falling back to API", e);
      }

      const res = await fetch(`https://orthocal.info/api/gregorian/${y}/${m}/${day}/`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDay(selectedDate);
    // Update URL without reloading
    const m = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const d = selectedDate.getDate().toString().padStart(2, '0');
    setSearchParams({ date: `${m}-${d}` }, { replace: true });
  }, [selectedDate, fetchDay, setSearchParams]);

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return (orthodoxCalendarData as any[]).filter(day => 
      day.saintsAndFeast.toLowerCase().includes(searchQuery.toLowerCase()) ||
      day.summary.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 10);
  }, [searchQuery]);

  const handleSelectDay = (month: string, date: string) => {
    const d = new Date();
    d.setMonth(parseInt(month) - 1);
    d.setDate(parseInt(date));
    setSelectedDate(d);
    setSearchQuery("");
  };

  const adjustDay = (amount: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + amount);
    setSelectedDate(newDate);
  };

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs 
          items={[
            { label: 'home', to: "/" }, 
            { label: 'orthodox', to: "/orthodox" }, 
            { label: 'saints', to: "/orthodox/saints" }, 
            { label: 'Lives of the Saints (Synaxarion)', to: "/orthodox/saints/synaxarion" }
          ]} 
        />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)]">
          <LocalizedText text="Lives of the Saints (Synaxarion)" />
        </h1>
        <OrthodoxSaintTabs />

        <div className="mt-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-primary)]/40 h-5 w-5" />
            <input
              type="text"
              placeholder={getLocalized('Search the Synaxarion (e.g., Silouan, Herman, Mary)...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] py-4 pl-12 pr-4 text-lg outline-none focus:border-[var(--accent)]"
            />
            
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-xl">
                {searchResults.map((res, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectDay(res.month, res.date)}
                    className="flex w-full flex-col p-3 text-left hover:bg-[var(--accent)]/5 rounded-lg"
                  >
                    <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest">
                      {new Date(2024, parseInt(res.month) - 1, parseInt(res.date)).toLocaleDateString(undefined, { month: "long", day: "numeric" })}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)] line-clamp-1">{res.saintsAndFeast}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button 
            onClick={() => adjustDay(-1)}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-bold text-[var(--text-secondary)] hover:bg-[var(--accent)]/5"
          >
            <ChevronLeft size={18} /> <LocalizedText text="Previous Day" />
          </button>
          <div className="text-center">
            <h2 className="font-heading text-2xl text-[var(--accent)]">
              {selectedDate.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
            </h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-primary)]/40 font-bold mt-1">
              Gregorian Calendar
            </p>
          </div>
          <button 
            onClick={() => adjustDay(1)}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-bold text-[var(--text-secondary)] hover:bg-[var(--accent)]/5"
          >
            <LocalizedText text="Next Day" /> <ChevronRight size={18} />
          </button>
        </div>

        {loading ? (
          <div className="mt-12 py-20 text-center animate-pulse">
            <BookOpen className="mx-auto h-12 w-12 text-[var(--accent)]/30 mb-4" />
            <p className="text-lg text-[var(--text-primary)]/50">
              <LocalizedText text="Loading the Synaxarion..." />
            </p>
          </div>
        ) : data ? (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="bg-[var(--accent)]/5 border-l-4 border-l-[var(--accent)]">
              <h3 className="font-heading text-2xl text-[var(--text-secondary)]">{data.summary_title}</h3>
              <p className="mt-1 text-[var(--text-primary)]/70 italic">{data.fast_level_desc}</p>
            </Card>

            {data.stories && data.stories.length > 0 ? (
              data.stories.map((story: any, idx: number) => (
                <Card key={idx} className="group hover:border-[var(--accent)]/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="h-6 w-6 text-[var(--accent)]/60" />
                    <h4 className="font-heading text-xl text-[var(--text-secondary)]">{story.title}</h4>
                  </div>
                  <div className="prose prose-stone max-w-none text-[var(--text-primary)]/90 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: story.story }} />
                </Card>
              ))
            ) : (
              <Card className="text-center py-12">
                <p className="text-[var(--text-primary)]/60 italic">Detailed biographies for this feast are currently being gathered. Please check other resources for the Life of the Saint.</p>
              </Card>
            )}
          </div>
        ) : null}
      </div>
    </main>
  );
}
