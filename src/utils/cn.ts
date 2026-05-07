import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import i18next from "i18next";
import { useState, useEffect } from "react";
import { translationService } from "./translationService";

export type LocalizedString = {
  en: string;
  el?: string;
  ru?: string;
  sr?: string;
  ro?: string;
  bg?: string;
  ar?: string;
  ka?: string;
  it?: string;
  fr?: string;
  de?: string;
  es?: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalized(value: any): string {
  if (!value) return "";
  
  const lang = (i18next.language || 'en').split('-')[0];

  if (typeof value === "string") {
    // Check i18next first (direct key)
    if (i18next.exists(value)) {
      return i18next.t(value);
    }
    // Check with 'dashboard_items.' prefix
    if (i18next.exists(`dashboard_items.${value}`)) {
      return i18next.t(`dashboard_items.${value}`);
    }
    // Check with 'sections.' prefix
    if (i18next.exists(`sections.${value}`)) {
      return i18next.t(`sections.${value}`);
    }
    // Check with 'nav.' prefix
    if (i18next.exists(`nav.${value}`)) {
      return i18next.t(`nav.${value}`);
    }
    // Check with 'landing.' prefix
    if (i18next.exists(`landing.${value}`)) {
      return i18next.t(`landing.${value}`);
    }
    // Check with 'books.' prefix
    if (i18next.exists(`books.${value}`)) {
      return i18next.t(`books.${value}`);
    }

    // If it's a key with a prefix but wasn't found, strip the prefix for display
    if (value.startsWith('sections.')) return value.replace('sections.', '');
    if (value.startsWith('dashboard_items.')) return value.replace('dashboard_items.', '');
    if (value.startsWith('nav.')) return value.replace('nav.', '');
    if (value.startsWith('landing.')) return value.replace('landing.', '');

    // Check for common suffixes if they appear as raw keys
    if (value.endsWith('.nav')) return value.replace('.nav', '');
    if (value.endsWith('.sections')) return value.replace('.sections', '');
    
    return value;
  }
  
  return (value as any)[lang] || (value as any)['en'] || "";
}

/**
 * A hook that returns a localized string and handles dynamic translation if needed.
 */
export function useLocalized(value: string | LocalizedString | undefined) {
  const [localized, setLocalized] = useState<string>(() => getLocalized(value));
  const lang = (i18next.language || 'en').split('-')[0];

  useEffect(() => {
    const currentLocalized = getLocalized(value);
    setLocalized(currentLocalized);

    // If the value is a string or a LocalizedString object
    // Try to translate it if we don't have a specific translation for the current language
    const textToTranslate = typeof value === 'string' ? value : (value?.en || '');
    const hasSpecificTranslation = typeof value === 'object' && (value as any)[lang];

    if (!hasSpecificTranslation && textToTranslate) {
      // Use 'auto' for source language detection
      translationService.translate(textToTranslate, lang).then(translated => {
        setLocalized(translated);
      });
    }
  }, [value, lang]);

  return localized;
}
