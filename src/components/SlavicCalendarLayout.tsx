import { useRef, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import Card from "./Card";
import SectionDivider from "./SectionDivider";
import { X, Sparkles } from "lucide-react";
import { orthodoxNamedays } from "../data/namedayData";
import { useTranslation } from "react-i18next";
import LocalizedText from "./LocalizedText";

type SlavicCalendarLayoutProps = {
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
  breadcrumbTo: string;
  fasts: { fastName: string; civilDates: string; fastingType: string }[];
  greatFeasts: string[];
  dailyCommemorations: Record<string, string[]>;
  uniqueSaints: { title: string; description: string }[];
  uniqueTraditions: { title: string; description: string }[];
  fastingVariation: string;
  summaryChecklist: string[];
};

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
  Jan: "January",
  Feb: "February",
  Mar: "March",
  March: "March",
  Apr: "April",
  April: "April",
  May: "May",
  Jun: "June",
  June: "June",
  Jul: "July",
  July: "July",
  Aug: "August",
  Sept: "September",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toneClass = (events: string[]) => {
  const combined = events.join(" ").toLowerCase();
  if (combined.includes("strict fast")) return "bg-red-900/35 border-red-600/60";
  if (combined.includes("pascha") || combined.includes("fast-free")) return "bg-green-900/35 border-green-600/60";
  if (combined.includes("fish allowed")) return "bg-yellow-700/25 border-yellow-500/60";
  if (combined.includes("fast")) return "bg-orange-800/25 border-orange-500/60";
  return "bg-[var(--bg-secondary)]/55 border-[var(--border)]/25";
};

export default function SlavicCalendarLayout({
  title,
  subtitle,
  breadcrumbLabel,
  breadcrumbTo,
  fasts,
  greatFeasts,
  dailyCommemorations,
  uniqueSaints,
  uniqueTraditions,
  fastingVariation,
  summaryChecklist,
}: SlavicCalendarLayoutProps) {
  const { t } = useTranslation();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date();
  const todayMonth = now.getMonth();
  const todayDay = now.getDate();
  const monthRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [selectedDayEvents, setSelectedDayEvents] = useState<{
    day: number;
    month: string;
    events: string[];
  } | null>(null);

  const eventMap: Record<string, Record<number, string[]>> = Object.fromEntries(
    monthOrder.map((month) => [month, {}])
  ) as Record<string, Record<number, string[]>>;

  Object.entries(dailyCommemorations).forEach(([month, entries]) => {
    entries.forEach((entry) => {
      const match = entry.match(/^([A-Za-z]+)\s(\d+):\s(.+)$/);
      if (!match) return;
      const monthName = shortToLong[match[1]] ?? month;
      const day = Number(match[2]);
      const text = match[3];
      eventMap[monthName][day] = [...(eventMap[monthName][day] ?? []), text];
    });
  });

  greatFeasts.forEach((feast) => {
    const match = feast.match(/^([A-Za-z]+)\s(\d+):\s(.+)$/);
    if (!match) return;
    const monthName = shortToLong[match[1]] ?? match[1];
    const day = Number(match[2]);
    eventMap[monthName][day] = [...(eventMap[monthName][day] ?? []), `Great Feast: ${match[3]}`];
  });

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
            { label: breadcrumbLabel, to: breadcrumbTo },
          ]}
        />

        <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">
          <LocalizedText text={title} />
        </h1>
        <p className="mt-3 max-w-4xl text-lg text-[var(--text-primary)]/88">
          <LocalizedText text={subtitle} />
        </p>
        <p className="mt-2 text-sm text-[var(--text-primary)]/75">
          {t('calendar.local_timezone', { timezone })}
        </p>

        <div className="mb-8 flex flex-wrap gap-2 rounded-xl border border-[var(--border)]/30 bg-[var(--card)]/50 p-4 backdrop-blur-sm">
          <button
            onClick={() => scrollToMonth(monthOrder[todayMonth])}
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

        <SectionDivider label={t('calendar.view')} />

        <div className="grid gap-4 xl:grid-cols-2">
          {monthOrder.map((month, monthIndex) => {
            const daysInMonth = new Date(2026, monthIndex + 1, 0).getDate();
            const firstDay = new Date(2026, monthIndex, 1).getDay();
            const cells: Array<number | null> = [
              ...Array.from({ length: firstDay }, () => null),
              ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
            ];
            while (cells.length % 7 !== 0) cells.push(null);

            return (
              <div
                key={month}
                ref={(element) => {
                  monthRefs.current[month] = element;
                }}
              >
                <Card>
                  <h2 className="font-heading text-2xl text-[var(--text-secondary)]">
                    {t(`calendar.months.${month}`)}
                  </h2>
                  <div className="mt-3 overflow-x-auto">
                    <div className="min-w-[280px]">
                      <div className="grid grid-cols-7 gap-1 text-center text-xs text-[var(--text-primary)]/70">
                        {weekdays.map((weekday) => (
                          <div key={weekday} className="py-1 font-semibold">
                            {t(`calendar.weekdays.${weekday}`)}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {cells.map((day, index) => {
                          if (!day) return <div key={`${month}-empty-${index}`} className="h-16 rounded border border-transparent" />;
                          const events = eventMap[month][day] ?? [];
                          const namedays = orthodoxNamedays[month]?.[day] ?? [];
                          const isToday = monthIndex === todayMonth && day === todayDay;
                          return (
                            <div
                              key={`${month}-${day}`}
                              className={`group relative h-16 cursor-pointer rounded border p-1 transition-all hover:ring-2 hover:ring-[var(--accent)]/50 ${toneClass(
                                events
                              )} ${
                                isToday ? "ring-2 ring-[var(--accent)] shadow-[0_0_0_2px_rgba(201,168,76,0.25)]" : ""
                              }`}
                              onClick={() => setSelectedDayEvents({ day, month, events: [...events, ...namedays.map(n => `${t('calendar.namedays')} ${n}`)] })}
                            >
                              <div className="flex items-center justify-between">
                                <p className="text-[11px] font-semibold text-[var(--text-secondary)]">
                                  {day} {isToday ? `• ${t('landing.highlights_title')}` : ""}
                                </p>
                                {namedays.length > 0 && <Sparkles size={10} className="text-[var(--accent)] opacity-60" />}
                              </div>
                              <p className="line-clamp-2 text-[10px] leading-tight text-[var(--text-primary)]/88">
                                {events[0] ? <LocalizedText text={events[0]} /> : (namedays.length > 0 ? `${t('calendar.namedays')} ${namedays[0]}` : "")}
                              </p>
                              
                              {/* Quick Hover Tooltip */}
                              {(events.length > 0 || namedays.length > 0) && (
                                <div className="pointer-events-none absolute left-0 top-full z-20 mt-1 hidden w-48 rounded-lg bg-[var(--card)] p-2 shadow-xl border border-[var(--border)] group-hover:block">
                                  <p className="mb-1 text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider">
                                    {t(`calendar.months.${month}`)} {day}
                                  </p>
                                  <div className="space-y-1">
                                    {events.map((e, i) => (
                                      <p key={i} className="text-[10px] leading-tight text-[var(--text-primary)] border-b border-[var(--border)]/10 pb-1 last:border-0">
                                        <LocalizedText text={e} />
                                      </p>
                                    ))}
                                    {namedays.length > 0 && (
                                      <div className="pt-1">
                                        <p className="text-[9px] font-bold text-[var(--accent)] uppercase">{t('calendar.namedays')}</p>
                                        <p className="text-[10px] text-[var(--text-primary)]">{namedays.join(", ")}</p>
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

        <SectionDivider label={t('calendar.fasting_overview')} />
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]/35 text-[var(--text-secondary)]">
                <th className="px-2 py-2 font-heading">{t('calendar.fast_name')}</th>
                <th className="px-2 py-2 font-heading">{t('calendar.civil_dates')}</th>
                <th className="px-2 py-2 font-heading">{t('calendar.fasting_type')}</th>
              </tr>
            </thead>
            <tbody>
              {fasts.map((row) => (
                <tr key={row.fastName} className="border-b border-[var(--border)]/20">
                  <td className="px-2 py-2"><LocalizedText text={row.fastName} /></td>
                  <td className="px-2 py-2"><LocalizedText text={row.civilDates} /></td>
                  <td className="px-2 py-2"><LocalizedText text={row.fastingType} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <SectionDivider label={t('calendar.great_feasts')} />
        <div className="grid gap-3 md:grid-cols-2">
          {greatFeasts.map((feast) => (
            <Card key={feast}><LocalizedText text={feast} /></Card>
          ))}
        </div>

        <SectionDivider label={t('calendar.national_local_saints')} />
        <div className="grid gap-4 md:grid-cols-2">
          {uniqueSaints.map((saint) => (
            <Card key={saint.title}>
              <h3 className="font-heading text-xl text-[var(--text-secondary)]">
                <LocalizedText text={saint.title} />
              </h3>
              <p className="mt-2">
                <LocalizedText text={saint.description} />
              </p>
            </Card>
          ))}
        </div>

        <SectionDivider label={t('calendar.unique_traditions')} />
        <div className="grid gap-4 md:grid-cols-2">
          {uniqueTraditions.map((item) => (
            <Card key={item.title}>
              <h3 className="font-heading text-xl text-[var(--text-secondary)]">
                <LocalizedText text={item.title} />
              </h3>
              <p className="mt-2">
                <LocalizedText text={item.description} />
              </p>
            </Card>
          ))}
        </div>

        <SectionDivider label={t('calendar.fasting_variations')} />
        <Card>
          <p><LocalizedText text={fastingVariation} /></p>
        </Card>

        <SectionDivider label={t('calendar.summary_checklist')} />
        <Card>
          <ul className="space-y-2">
            {summaryChecklist.map((item) => (
              <li key={item}><LocalizedText text={item} /></li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Event Details Modal */}
      {selectedDayEvents && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg animate-in fade-in zoom-in duration-200">
            <Card className="relative overflow-hidden shadow-2xl border-[var(--accent)]/30">
              <button 
                onClick={() => setSelectedDayEvents(null)}
                className="absolute right-4 top-4 text-[var(--text-primary)]/40 hover:text-[var(--accent)] transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-6">
                <p className="text-sm font-bold text-[var(--accent)] uppercase tracking-[0.2em]">
                  {t('calendar.liturgical_commemorations')}
                </p>
                <h3 className="font-heading text-3xl text-[var(--text-secondary)] mt-1">
                  {t(`calendar.months.${selectedDayEvents.month}`)} {selectedDayEvents.day}, 2026
                </h3>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {selectedDayEvents.events.length > 0 ? (
                  selectedDayEvents.events.map((event, i) => (
                    <div key={i} className="rounded-lg bg-[var(--bg-secondary)]/40 p-4 border border-[var(--border)]/10">
                      <p className="text-[var(--text-primary)] leading-relaxed">
                        <LocalizedText text={event} />
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-[var(--text-primary)]/40 italic">
                    {t('calendar.no_commemorations')}
                  </p>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedDayEvents(null)}
                  className="rounded-md border border-[var(--border)]/45 bg-[var(--accent)] px-8 py-2 text-[10px] font-heading text-[var(--bg-primary)] shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  Close
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
