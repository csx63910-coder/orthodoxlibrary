import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";
import LocalizedText from "./LocalizedText";

const tabs = [
  { label: "Recommended Books", to: "/orthodox/resources/books" },
  { label: "Podcasts & Lectures", to: "/orthodox/resources/podcasts" },
  { label: "Monastery Directory", to: "/orthodox/resources/monasteries" },
  { label: "Pilgrimage Sites", to: "/orthodox/resources/pilgrimages" },
  { label: "Downloadable PDFs", to: "/orthodox/resources/pdfs" },
];

export default function OrthodoxResourceTabs() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tabs.map((tab) => (
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
          <LocalizedText text={tab.label} />
        </NavLink>
      ))}
    </div>
  );
}
