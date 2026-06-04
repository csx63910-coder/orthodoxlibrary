import i18next from 'i18next';

export interface BibleTranslation {
  id: string;
  name: string;
  language: string;
  englishName: string;
  scope?: 'OT' | 'NT' | 'Full';
}

export interface BibleBook {
  id: string;
  name: string;
  numberOfChapters: number;
}

export interface BibleVerse {
  verse: number;
  text: string;
}

export interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

const API_BASE = 'https://bible.helloao.org/api';
const LOCAL_BASE = '/data/bible';

class BibleService {
  private availableTranslations: BibleTranslation[] = [];
  private booksCache: Record<string, BibleBook[]> = {};

  async getAvailableTranslations(): Promise<BibleTranslation[]> {
    if (this.availableTranslations.length > 0) return this.availableTranslations;
    
    // Hardcoded local translations that we know we have
    const localTranslations: BibleTranslation[] = [
      { id: 'BSB', name: 'Berean Standard Bible', language: 'eng', englishName: 'Berean Standard Bible', scope: 'Full' },
      { id: 'grc_bre', name: 'Brenton Septuagint', language: 'grc', englishName: 'Brenton Septuagint', scope: 'OT' },
      { id: 'grc_byz', name: 'Byzantine Greek NT', language: 'grc', englishName: 'Byzantine Greek NT', scope: 'NT' },
      { id: 'grc_gtr', name: 'Textus Receptus', language: 'grc', englishName: 'Textus Receptus', scope: 'NT' },
      { id: 'grc_sbl', name: 'SBL Greek NT', language: 'grc', englishName: 'SBL Greek NT', scope: 'NT' },
      { id: 'rus_syn', name: 'Russian Synodal Bible', language: 'rus', englishName: 'Russian Synodal Bible', scope: 'Full' },
      { id: 'srp_865', name: 'Sveta Biblija (Danicic-Vuk)', language: 'srp', englishName: 'Sveta Biblija', scope: 'Full' },
      { id: 'srp_onspc', name: 'New Serbian Translation (Cyrillic)', language: 'srp', englishName: 'New Serbian Translation', scope: 'Full' },
      { id: 'srp_onstl', name: 'New Serbian Translation (Latin)', language: 'srp', englishName: 'New Serbian Translation', scope: 'Full' },
      { id: 'eng_kjv', name: 'King James Version', language: 'eng', englishName: 'King James Version', scope: 'Full' },
      { id: 'eng_web', name: 'World English Bible', language: 'eng', englishName: 'World English Bible', scope: 'Full' },
      { id: 'eng_lxx', name: 'English Septuagint', language: 'eng', englishName: 'English Septuagint', scope: 'OT' },
      { id: 'eng_bre', name: 'Brenton English Septuagint', language: 'eng', englishName: 'Brenton English Septuagint', scope: 'OT' },
      { id: 'eng_tnt', name: 'Tyndale New Testament', language: 'eng', englishName: 'Tyndale New Testament', scope: 'NT' }
    ];

    try {
      // Try local first
      const response = await fetch(`${LOCAL_BASE}/available_translations.json`);
      if (response.ok) {
        const data = await response.json();
        // Ensure every translation has a scope, default to 'Full' if missing
        this.availableTranslations = data.translations.map((t: any) => ({
          ...t,
          scope: t.scope || localTranslations.find(lt => lt.id === t.id)?.scope || 'Full'
        }));
        return this.availableTranslations;
      }
    } catch (e) {
      console.warn('Local translations list not found, using hardcoded local list');
    }

    // Fallback to hardcoded local list if available_translations.json is missing
    this.availableTranslations = localTranslations;
    return this.availableTranslations;
  }

  async getBooks(translationId: string): Promise<BibleBook[]> {
    if (this.booksCache[translationId]) return this.booksCache[translationId];

    try {
      const response = await fetch(`${LOCAL_BASE}/${translationId}/books.json`);
      if (response.ok) {
        const data = await response.json();
        this.booksCache[translationId] = data.books;
        return data.books;
      }
    } catch (e) {
      console.warn(`Local books list for ${translationId} not found, falling back to API`);
    }

    const response = await fetch(`${API_BASE}/${translationId}/books.json`);
    const data = await response.json();
    this.booksCache[translationId] = data.books;
    return data.books;
  }

  async getChapter(translationId: string, bookId: string, chapter: number): Promise<BibleChapter> {
    try {
      let path = `${LOCAL_BASE}/${translationId}/${bookId}/${chapter}.json`;
      
      // Handle the new folder structure for full bibles
      const fullBibles = ['eng_kjv', 'rus_syn', 'srp_865'];
      if (fullBibles.includes(translationId)) {
        const ot1 = ["GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA", "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST"];
        const ot2 = ["JOB", "PSA", "PRO", "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO", "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "ZEC", "MAL"];
        const nt = ["MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH", "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS", "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV"];

        if (ot1.includes(bookId)) {
          path = `${LOCAL_BASE}/${translationId}/Old Testament 1/${bookId}/${chapter}.json`;
        } else if (ot2.includes(bookId)) {
          path = `${LOCAL_BASE}/${translationId}/Old Testament 2/${bookId}/${chapter}.json`;
        } else if (nt.includes(bookId)) {
          path = `${LOCAL_BASE}/${translationId}/New Testament/${bookId}/${chapter}.json`;
        }
      }

      const response = await fetch(path);
      if (response.ok) {
        const data = await response.json();
        
        // Handle HelloAO format if necessary
        if (data.chapter && data.chapter.content) {
          return {
            book: data.book.name,
            chapter: data.chapter.number,
            verses: data.chapter.content
              .filter((c: any) => c.type === 'verse')
              .map((v: any) => ({
                verse: v.number,
                text: Array.isArray(v.content) ? v.content.join(' ') : v.content
              }))
          };
        }
        return data;
      }
    } catch (e) {
      console.warn(`Local chapter ${chapter} for ${bookId} in ${translationId} not found, falling back to API`);
    }

    const response = await fetch(`${API_BASE}/${translationId}/${bookId}/${chapter}.json`);
    if (!response.ok) throw new Error(`Chapter not found: ${bookId} ${chapter}`);
    const data = await response.json();

    // Handle HelloAO format for API fallback too
    if (data.chapter && data.chapter.content) {
      return {
        book: data.book.name,
        chapter: data.chapter.number,
        verses: data.chapter.content
          .filter((c: any) => c.type === 'verse')
          .map((v: any) => ({
            verse: v.number,
            text: Array.isArray(v.content) ? v.content.join(' ') : v.content
          }))
      };
    }
    return data;
  }

  getDefaultTranslation(_tradition: 'orthodox'): string {
    const lang = (i18next.language || 'en').split('-')[0];
    
    if (lang === 'el' || lang === 'grc') {
      return 'grc_bre'; // Septuagint for Greek users
    }

    if (lang === 'ru') {
      return 'rus_syn'; // Russian Synodal for Russian users
    }

    if (lang === 'sr') {
      return 'srp_865'; // Serbian Danicic-Vuk for Serbian users
    }

    return 'grc_bre'; // Default to Brenton Septuagint for Orthodox
  }
}

export const bibleService = new BibleService();