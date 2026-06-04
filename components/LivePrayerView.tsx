import { Timer, Sparkles, HandHeart, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import LocalizedText from "./LocalizedText";

export default function LivePrayerView() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getPrayerContext = () => {
    const hour = time.getHours();
    if (hour >= 5 && hour < 12) {
      return {
        title: "Morning Prayers",
        slug: "morning-prayers",
        description: "Begin the day with the Trisagion and prayers of thanksgiving.",
        tag: "Morning Rule"
      };
    } else if (hour >= 12 && hour < 18) {
      return {
        title: "Akathist Hymns",
        slug: "akathist-hymns",
        description: "Midday devotions and hymns of praise to Christ and the Saints.",
        tag: "Midday"
      };
    } else if (hour >= 18 && hour < 24) {
      return {
        title: "Evening Prayers",
        slug: "evening-prayers",
        description: "Close the day with repentance and examination of conscience.",
        tag: "Evening Rule"
      };
    } else {
      return {
        title: "Midnight Office",
        slug: "midnight-office",
        description: "The Mesonyktikon: Vigilance in the quiet of the night.",
        tag: "Night Vigil"
      };
    }
  };

  const context = getPrayerContext();

  return (
    <Card className="relative overflow-hidden border-[var(--accent)]/30 bg-[var(--card)]/90">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">Live</span>
            <span className="ml-2 text-xs text-[var(--text-primary)]/50">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <h2 className="font-heading text-2xl text-[var(--text-secondary)] mb-2">
            <LocalizedText text={context.title} />
          </h2>
          
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--accent)] mb-4 w-fit">
            <Timer size={12} />
            <LocalizedText text={context.tag} />
          </div>

          <p className="text-[var(--text-primary)]/85 mb-6 max-w-lg">
            <LocalizedText text={context.description} />
          </p>

          <Link
            to={`/orthodox/prayers/${context.slug}`}
            className="group mt-auto flex items-center gap-2 rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-4 py-2 text-[10px] font-heading text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] w-fit"
          >
            <HandHeart size={14} />
            <LocalizedText text="Pray Now" />
            <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="hidden md:flex w-1/3 items-center justify-center bg-[var(--accent)]/5 border-l border-[var(--border)]/10">
          <div className="text-[var(--accent)]/20">
            <Sparkles size={120} strokeWidth={0.5} />
          </div>
        </div>
      </div>
    </Card>
  );
}
