import { Link } from "react-router-dom";
import { getLocalized } from "../utils/cn";

type Crumb = { label: string; to: string };

type Props = { items: Crumb[] };

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--text-primary)]/80">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.to} className="flex items-center gap-2">
            {index > 0 && <span className="text-[var(--text-secondary)]/70">&gt;</span>}
            <Link to={item.to} className="rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-0.5 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">
              {getLocalized(item.label)}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
