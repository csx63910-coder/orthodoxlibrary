import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { SidebarSection } from "../app/siteData";
import { cn } from "../utils/cn";
import LanguageTranslator from "./LanguageTranslator";
import LocalizedText from "./LocalizedText";

type SidebarProps = {
  title: string;
  titleHref?: string;
  sections: SidebarSection[];
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export default function Sidebar({ title, titleHref, sections, mobileOpen, onCloseMobile }: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const getSectionKey = (title: string) => {
    return `sections.${title.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_').replace(/'/g, '')}`;
  };
  const defaultOpen = useMemo(() => new Set(sections.map((section) => section.path)), [sections]);
  const [openSections, setOpenSections] = useState(defaultOpen);

  const getSubItemTarget = (_sectionPath: string, item: { title: string; path: string }) => {
    return item.path;
  };

  return (
    <>
      {mobileOpen && <button onClick={onCloseMobile} className="fixed inset-0 z-30 bg-black/40 md:hidden" aria-label="Close menu overlay" />}

      <aside
        className={cn(
          "fixed left-0 top-[var(--header-h)] z-40 h-[calc(100vh-var(--header-h))] w-[min(88vw,var(--sidebar-w))] overflow-y-auto border-r border-[var(--border)]/45 bg-[var(--sidebar)] px-3 pb-6 pt-4 md:sticky md:top-[var(--header-h)] md:w-[var(--sidebar-w)]",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {titleHref ? (
          <NavLink
            to={titleHref}
            onClick={onCloseMobile}
            className="mb-4 flex items-center gap-2 rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-3 py-2.5 text-sm font-heading text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-secondary)]"
          >
            {title}
          </NavLink>
        ) : (
          <h2 className="mb-4 border-b border-[var(--border)]/30 pb-3 font-heading text-xl text-[var(--text-secondary)]">{title}</h2>
        )}
        <div className="space-y-2">
          {sections.map((section) => {
            const isOpen = openSections.has(section.path);
            return (
              <div key={section.path} className="rounded-lg border border-[var(--border)]/20 bg-[var(--bg-secondary)]/40">
                <button
                  onClick={() => {
                    setOpenSections((prev) => {
                      const next = new Set(prev);
                      if (next.has(section.path)) next.delete(section.path);
                      else next.add(section.path);
                      return next;
                    });
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]",
                    isOpen && "font-bold text-[var(--accent)]"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <section.icon size={14} className={cn("text-[var(--accent)]", !isOpen && "opacity-70")} />
                    {String(t(getSectionKey(section.title)))}
                  </span>
                  <ChevronDown size={14} className={cn("transition-transform duration-200 opacity-50", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <div className="mt-2 space-y-1.5 px-1 pb-2">
                    <NavLink
                      to={section.path}
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 px-3 py-1 text-[10px] text-[var(--text-secondary)]/70 transition-all hover:text-[var(--accent)]",
                          isActive ? "font-bold text-[var(--accent)]" : ""
                        )
                      }
                    >
                      {String(t('sidebar.open'))} {String(t(getSectionKey(section.title)))}
                    </NavLink>
                    {section.subItems.map((item) => (
                      <NavLink
                        key={item.title}
                        to={getSubItemTarget(section.path, item)}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2 rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-secondary)]",
                            isActive
                              ? "border-[var(--accent)] bg-[var(--bg-secondary)] font-medium text-[var(--accent)]"
                              : ""
                          )
                        }
                        onClick={onCloseMobile}
                      >
                        <LocalizedText text={item.title} />
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Bottom Actions */}
          <div className="mt-4 border-t border-[var(--border)]/30 pt-4 px-2 pb-6">
            <div className="flex flex-col gap-4">
              <div className="px-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)]/40 mb-3">
                  {t('sidebar.system_settings')}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-secondary)]">{t('sidebar.language')}</span>
                  <LanguageTranslator />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}