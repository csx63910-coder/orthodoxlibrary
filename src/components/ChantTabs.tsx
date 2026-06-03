import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";

const chantTabs = [
  { label: "Byzantine Chant", to: "/orthodox/chant/byzantine" },
  { label: "Znamenny Chant", to: "/orthodox/chant/znamenny" },
  { label: "Serbian Chant", to: "/orthodox/chant/serbian" },
  { label: "Armenian Sharakan", to: "/orthodox/chant/armenian" },
  { label: "Antiochian Orthodox Chant", to: "/orthodox/chant/antiochian" },
  { label: "Arabic Liturgical Hymns", to: "/orthodox/chant/arabic" },
];

export default function ChantTabs() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {chantTabs.map((tab) => (
        <NavLink
          key={tab.label}
          to={tab.to}
          className={({ isActive }) =>
            cn(
              "rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-3 py-2 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]",
              isActive && "border-[var(--accent)] bg-[var(--bg-secondary)]"
            )
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
