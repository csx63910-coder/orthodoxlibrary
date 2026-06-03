import { useRef, useState, useMemo } from "react";
import Card from "../../../components/Card";
import SectionDivider from "../../../components/SectionDivider";
import { X, Sparkles, Info } from "lucide-react";
import { orthodoxNamedays } from "../../../data/namedayData";
import { useTranslation } from "react-i18next";
import LocalizedText from "../../../components/LocalizedText";
import Breadcrumbs from "../../../components/Breadcrumbs";

// Data Imports
import {
  greekCommemorations2026,
  greekFastingSeasons2026,
  greekMajorEvents2026,
} from "../../../data/greekOrthodoxCalendar2026";
import {
  slavicDailyCommemorations2026,
  slavicFasts2026,
  slavicGreatFeasts2026,
} from "../../../data/slavicCalendar2026";
import {
  slavicSummaryChecklist,
} from "../../../data/slavicCalendarData";

const monthOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const shortToLong: Record<string, string> = {
  Jan: "January", Feb: "February", Mar: "March", March: "March",
  Apr: "April", April: "April", May: "May", Jun: "June", June: "June",
  Jul: "July", July: "July", Aug: "August", Sept: "September", Sep: "September",
  Oct: "October", Nov: "November", Dec: "December",
};

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function UnifiedOrthodoxCalendar() {
  const { t } = useTranslation();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date();
  const todayMonthIndex = now.getMonth();
  const todayDay = now.getDate();
  const monthRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [selectedDayEvents, setSelectedDayEvents] = useState<{
    day: number;
    month: string;
    events: string[];
    namedays: string[];
  } | null>(null);

  const eventMap = useMemo(() => {
    const map: Record<string, Record<number, string[]>> = Object.fromEntries(
      monthOrder.map((month) => [month, {}])
    ) as Record<string, Record<number, string[]>>;

    // 1. Add Greek Commemorations
    Object.entries(greekCommemorations2026).forEach(([month, entries]) => {
      entries.forEach((entry) => {
        const match = entry.match(/^([A-Za-z]+)\s(\d+):\s(.+)$/);
        if (!match) return;
        const longMonth = shortToLong[match[1]] ?? month;
        const day = Number(match[2]);
        map[longMonth][day] = [...(map[longMonth][day] ?? []), `[Greek] ${match[3]}`];
      });
    });

    // 2. Add Slavic Commemorations
    Object.entries(slavicDailyCommemorations2026).forEach(([month, entries]) => {
      entries.forEach((entry) => {
        const match = entry.match(/^([A-Za-z]+)\s(\d+):\s(.+)$/);
        if (!match) return;
        const longMonth = shortToLong[match[1]] ?? month;
        const day = Number(match[2]);
        map[longMonth][day] = [...(map[longMonth][day] ?? []), `[Slavic] ${match[3]}`];
      });
    });

    // 3. Add Greek Major Events
    greekMajorEvents2026.forEach((item) => {
      const match = item.date.match(/^([A-Za-z]+)\s(\d+)/);
      if (!match) return;
      const monthName = shortToLong[match[1]] ?? match[1];
      const day = Number(match[2]);
      map[monthName][day] = [...(map[monthName][day] ?? []), `[Greek Feast] ${item.event}`];
    });

    // 4. Add Slavic Great Feasts
    slavicGreatFeasts2026.forEach((feast) => {
      const match = feast.match(/^([A-Za-z]+)\s(\d+):\s(.+)$/);
      if (!match) return;
      const monthName = shortToLong[match[1]] ?? match[1];
      const day = Number(match[2]);
      map[monthName][day] = [...(map[monthName][day] ?? []), `[Slavic Feast] ${match[3]}`];
    });

    return map;
  }, []);

  const toneClass = (events: string[]) => {
    const combined = events.join(" ").toLowerCase();
    if (combined.includes("strict fast")) return "bg-red-900/35 border-red-600/60";
    if (combined.includes("fast-free")) return "bg-green-900/35 border-green-600/60";
    if (combined.includes("fish allowed")) return "bg-yellow-700/25 border-yellow-500/60";
    if (combined.includes("fast begins") || combined.includes("fast")) return "bg-orange-800/25 border-orange-500/60";
    return "bg-[var(--bg-secondary)]/55 border-[var(--border)]/25";
  };

  const scrollToMonth = (month: string) => {
    monthRefs.current[month]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "home", to: "/" },
            { label: "orthodox", to: "/orthodox" },
            { label: "liturgical_calendar", to: "/orthodox/calendar" },
          ]}
        />

        <div className="mb-8">
          <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">
            {t('calendar.view')} 2026
          </h1>
          <p className="mt-3 max-w-4xl text-lg text-[var(--text-primary)]/88">
            Unified Liturgical Calendar combining Greek, Slavic, and Armenian traditions.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--text-primary)]/75">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-[var(--accent)]" />
              <span>{t('calendar.local_timezone', { timezone })}</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-8 flex flex-wrap gap-2 rounded-xl border border-[var(--border)]/30 bg-[var(--card)]/50 p-4 backdrop-blur-sm">
          <button
            onClick={() => scrollToMonth(monthOrder[todayMonthIndex])}
            className="rounded-md border border-[var(--border)]/45 bg-[var(--accent)] px-4 py-1 text-[10px] font-bold text-[var(--bg-primary)] shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            {t('calendar.jump_to_today')}
          </button>
          <div className="flex flex-wrap gap-1 ml-2">
            {monthOrder.map((month) => (
              <button
                key={month}
                onClick={() => scrollToMonth(month)}
                className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
              >
                {t(`calendar.months.${month}`).slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <Card className="mb-8 border-[var(--border)]/30">
          <div className="flex flex-wrap gap-4 text-xs">
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded border border-red-500 bg-red-900/40" /> {t('calendar.fast_types.strict_fast')}</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded border border-orange-500 bg-orange-800/30" /> {t('calendar.fast_types.fast_day')}</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded border border-yellow-500 bg-yellow-700/30" /> {t('calendar.fast_types.fish_allowed')}</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded border border-green-500 bg-green-900/40" /> {t('calendar.fast_types.fast_free')}</span>
          </div>
        </Card>

        {/* Calendar Grid */}
        <div className="grid gap-6 xl:grid-cols-2">
          {monthOrder.map((month, monthIndex) => {
            const daysInMonth = new Date(2026, monthIndex + 1, 0).getDate();
            const firstWeekday = new Date(2026, monthIndex, 1).getDay();
            const cells: Array<number | null> = [
              ...Array.from({ length: firstWeekday }, () => null),
              ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
            ];
            while (cells.length % 7 !== 0) cells.push(null);

            return (
              <div
                key={month}
                ref={(element) => {
                  monthRefs.current[month] = element;
                }}
                className="scroll-mt-24"
              >
                <Card className="h-full border-[var(--border)]/30 hover:border-[var(--accent)]/30 transition-colors">
                  <h2 className="font-heading text-2xl text-[var(--text-secondary)] mb-4">
                    {t(`calendar.months.${month}`)}
                  </h2>
                  <div className="overflow-x-auto">
                    <div className="min-w-[280px]">
                      <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[var(--text-primary)]/50 mb-2">
                        {weekdayLabels.map((weekday) => (
                          <div key={weekday} className="py-1 uppercase tracking-tighter">
                            {t(`calendar.weekdays.${weekday}`)}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {cells.map((day, index) => {
                          if (!day) return <div key={`${month}-empty-${index}`} className="h-16 rounded border border-transparent" />;
                          
                          const events = eventMap[month][day] ?? [];
                          const namedays = orthodoxNamedays[month]?.[day] ?? [];
                          const isToday = monthIndex === todayMonthIndex && day === todayDay;
                          
                          return (
                            <div
                              key={`${month}-${day}`}
                              className={`group relative h-16 cursor-pointer rounded border p-1 transition-all hover:ring-2 hover:ring-[var(--accent)]/50 ${toneClass(
                                events
                              )} ${
                                isToday ? "ring-2 ring-[var(--accent)] shadow-[0_0_0_2px_rgba(201,168,76,0.25)]" : ""
                              }`}
                              onClick={() => setSelectedDayEvents({ day, month, events, namedays })}
                            >
                              <div className="flex items-center justify-between">
                                <p className={`text-[11px] font-bold ${isToday ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}>
                                  {day}
                                </p>
                                {namedays.length > 0 && <Sparkles size={10} className="text-[var(--accent)] animate-pulse" />}
                              </div>
                              <div className="mt-1 space-y-0.5 overflow-hidden">
                                {events.slice(0, 2).map((e, i) => (
                                  <p key={i} className="truncate text-[9px] leading-tight text-[var(--text-primary)]/80">
                                    {e.replace(/^\[.*?\]\s/, '')}
                                  </p>
                                ))}
                                {events.length > 2 && (
                                  <p className="text-[8px] font-bold text-[var(--accent)]">+{events.length - 2} more</p>
                                )}
                              </div>

                              {/* Tooltip */}
                              {(events.length > 0 || namedays.length > 0) && (
                                <div className="pointer-events-none absolute left-0 top-full z-30 mt-1 hidden w-56 rounded-xl bg-[var(--card)] p-3 shadow-2xl border border-[var(--border)]/40 backdrop-blur-md group-hover:block animate-in fade-in zoom-in duration-150">
                                  <p className="mb-1 text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest border-b border-[var(--border)]/20 pb-1">
                                    {t(`calendar.months.${month}`)} {day}
                                  </p>
                                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                                    {events.map((e, i) => (
                                      <div key={i} className="flex gap-2 text-[10px] leading-tight text-[var(--text-primary)]">
                                        <span className="shrink-0 text-[var(--accent)]/60">•</span>
                                        <p><LocalizedText text={e} /></p>
                                      </div>
                                    ))}
                                    {namedays.length > 0 && (
                                      <div className="pt-2 border-t border-[var(--border)]/20">
                                        <p className="text-[9px] font-bold text-[var(--accent)] uppercase mb-1">{t('calendar.namedays')}</p>
                                        <p className="text-[10px] text-[var(--text-primary)] italic">{namedays.join(", ")}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Detailed Sections (Unified) */}
        <div className="mt-12 space-y-12">
          {/* Fasting Overview */}
          <section>
            <SectionDivider label={t('calendar.fasting_overview')} />
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="flex flex-col gap-3">
                <h3 className="font-heading text-lg text-[var(--text-secondary)]">Greek Traditions</h3>
                <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                  {greekFastingSeasons2026.map((season, i) => (
                    <p key={i} className="text-sm border-l-2 border-[var(--accent)]/30 pl-3 py-1">
                      <LocalizedText text={season} />
                    </p>
                  ))}
                </div>
              </Card>
              <Card className="flex flex-col gap-3">
                <h3 className="font-heading text-lg text-[var(--text-secondary)]">Slavic Traditions</h3>
                <div className="space-y-3">
                  {slavicFasts2026.map((fast, i) => (
                    <div key={i} className="border-l-2 border-[var(--accent)]/30 pl-3 py-1">
                      <p className="font-bold text-[var(--text-secondary)]"><LocalizedText text={fast.fastName} /></p>
                      <p className="text-xs text-[var(--text-primary)]/70"><LocalizedText text={fast.civilDates} /> — <LocalizedText text={fast.fastingType} /></p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* Great Feasts */}
          <section>
            <SectionDivider label={t('calendar.great_feasts')} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {greekMajorEvents2026.slice(0, 12).map((feast, i) => (
                <Card key={i} className="flex flex-col justify-between">
                  <h3 className="font-heading text-lg text-[var(--text-secondary)]"><LocalizedText text={feast.event} /></h3>
                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-[var(--accent)] uppercase">
                    <span><LocalizedText text={feast.date} /></span>
                    <span className="opacity-60">[Greek]</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Summary Checklist */}
          <section>
            <SectionDivider label={t('calendar.summary_checklist')} />
            <Card>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {slavicSummaryChecklist.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[var(--text-primary)]/90 italic">
                    <span className="text-[var(--accent)]">✓</span>
                    <LocalizedText text={item} />
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedDayEvents && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-2xl animate-in slide-in-from-bottom-8 duration-500">
            <Card className="relative overflow-hidden shadow-2xl border-[var(--accent)]/40 bg-[var(--bg-primary)]">
              <button 
                onClick={() => setSelectedDayEvents(null)}
                className="absolute right-6 top-6 z-10 rounded-full bg-[var(--bg-secondary)] p-2 text-[var(--text-primary)]/40 hover:text-[var(--accent)] hover:rotate-90 transition-all"
              >
                <X size={24} />
              </button>
              
              <div className="mb-8 border-b border-[var(--border)]/20 pb-6">
                <p className="text-xs font-bold text-[var(--accent)] uppercase tracking-[0.3em] mb-2">
                  {t('calendar.liturgical_commemorations')}
                </p>
                <h3 className="font-heading text-4xl text-[var(--text-secondary)]">
                  {t(`calendar.months.${selectedDayEvents.month}`)} {selectedDayEvents.day}, 2026
                </h3>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                {selectedDayEvents.events.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDayEvents.events.map((event, i) => {
                      const type = event.match(/^\[(.*?)\]/)?.[1] ?? "General";
                      const cleanEvent = event.replace(/^\[.*?\]\s/, '');
                      return (
                        <div key={i} className="group rounded-xl bg-[var(--bg-secondary)]/30 p-5 border border-[var(--border)]/10 hover:border-[var(--accent)]/30 transition-all">
                          <span className="inline-block px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] text-[9px] font-black uppercase mb-2">
                            {type}
                          </span>
                          <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                            <LocalizedText text={cleanEvent} />
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center py-12 text-[var(--text-primary)]/40 italic text-xl">
                    {t('calendar.no_commemorations')}
                  </p>
                )}

                {selectedDayEvents.namedays.length > 0 && (
                  <div className="mt-8 rounded-xl bg-[var(--accent)]/5 p-6 border border-[var(--accent)]/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="text-[var(--accent)]" size={20} />
                      <h4 className="font-heading text-xl text-[var(--accent)]">{t('calendar.namedays')}</h4>
                    </div>
                    <p className="text-[var(--text-primary)] text-lg italic leading-relaxed">
                      {selectedDayEvents.namedays.join(", ")}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-10 flex justify-end">
                <button 
                  onClick={() => setSelectedDayEvents(null)}
                  className="rounded-md border border-[var(--border)]/45 bg-[var(--accent)] px-10 py-2 text-[10px] font-heading text-[var(--bg-primary)] shadow-[0_10px_20px_-5px_rgba(201,168,76,0.4)] transition-all hover:scale-105 active:scale-95"
                >
                  {t('calendar.close')}
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
