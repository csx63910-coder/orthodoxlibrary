/**
 * A simple translation service that uses a free translation API.
 * This can be used to dynamically translate content that doesn't have a local translation.
 */

const CACHE_KEY = 'translation_cache';

interface TranslationCache {
  [key: string]: {
    [lang: string]: string;
  };
}

class TranslationService {
  private cache: TranslationCache = {};
  private staticCache: TranslationCache = {};

  constructor() {
    this.loadCache();
    this.loadStaticCache();
  }

  private async loadStaticCache() {
    try {
      const response = await fetch('/data/translation/translations.json');
      if (response.ok) {
        this.staticCache = await response.json();
      }
    } catch (e) {
      console.warn('Failed to load static translation cache', e);
    }
  }

  private loadCache() {
    try {
      const saved = localStorage.getItem(CACHE_KEY);
      if (saved) {
        this.cache = JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load translation cache', e);
    }
  }

  private saveCache() {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(this.cache));
    } catch (e) {
      console.error('Failed to save translation cache', e);
    }
  }

  /**
   * Translates text using a free API.
   * Note: This is an asynchronous operation.
   */
  async translate(text: string, targetLang: string, sourceLang: string = 'auto'): Promise<string> {
    if (!text || (sourceLang !== 'auto' && targetLang === sourceLang)) return text;

    // Check static cache first
    if (this.staticCache[text] && this.staticCache[text][targetLang]) {
      return this.staticCache[text][targetLang];
    }

    // Check local cache
    if (this.cache[text] && this.cache[text][targetLang]) {
      return this.cache[text][targetLang];
    }

    try {
      // Using a free Google Translate endpoint (unofficial)
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data && data[0] && data[0][0] && data[0][0][0]) {
        const translatedText = data[0].map((s: any) => s[0]).join('');
        
        // Save to cache
        if (!this.cache[text]) this.cache[text] = {};
        this.cache[text][targetLang] = translatedText;
        this.saveCache();
        
        return translatedText;
      }
      
      return text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }

  /**
   * Synchronous version for use in render functions.
   * This will return the cached version or the original text and trigger a background translation.
   */
  getTranslationSync(text: string, targetLang: string, sourceLang: string = 'auto', onComplete?: (translated: string) => void): string {
    if (!text || (sourceLang !== 'auto' && targetLang === sourceLang)) return text;

    if (this.cache[text] && this.cache[text][targetLang]) {
      return this.cache[text][targetLang];
    }

    // Trigger background translation
    this.translate(text, targetLang, sourceLang).then(translated => {
      if (onComplete && translated !== text) {
        onComplete(translated);
      }
    });

    return text; // Return original while translating
  }
}

export const translationService = new TranslationService();
