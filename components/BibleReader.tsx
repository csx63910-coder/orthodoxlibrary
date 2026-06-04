import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { bibleService, BibleTranslation, BibleBook, BibleChapter } from '../services/BibleService';
import { ChevronLeft, ChevronRight, BookOpen, Type, Minus, Plus } from 'lucide-react';
import Card from './Card';
import SectionDivider from './SectionDivider';
import LocalizedText from './LocalizedText';

interface Props {
  tradition: 'orthodox';
  initialSection?: 'OT' | 'NT';
}

export default function BibleReader({ tradition, initialSection }: Props) {
  const [searchParams] = useSearchParams();
  const [translations, setTranslations] = useState<BibleTranslation[]>([]);
  const [selectedTranslation, setSelectedTranslation] = useState('');
  const [books, setBooks] = useState<BibleBook[]>([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [chapterData, setChapterData] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState(112.5); // 112.5% is approximately 1.125rem (prose-lg default)

  // 1. Load available translations and handle initial params
  useEffect(() => {
    const init = async () => {
      let transList = await bibleService.getAvailableTranslations();
      
      // Filter based on initialSection (OT or NT)
      // Strictly separate: OT only shows OT scope, NT only shows NT scope
      // Full Bibles and non-matching scopes are excluded from specific testament tabs
      if (initialSection === 'OT') {
        transList = transList.filter(t => t.scope === 'OT');
      } else if (initialSection === 'NT') {
        transList = transList.filter(t => t.scope === 'NT');
      } else {
        // If no initialSection (Full Bible page), we show ONLY Full scope Bibles
        transList = transList.filter(t => t.scope === 'Full');
      }
      
      setTranslations(transList);
      
      const paramTrans = searchParams.get('trans');
      const defaultTrans = bibleService.getDefaultTranslation(tradition);
      
      // Ensure default translation is available in filtered list
      const finalTrans = (paramTrans && transList.find(t => t.id === paramTrans)) 
        ? paramTrans 
        : (transList.find(t => t.id === defaultTrans) ? defaultTrans : (transList[0]?.id || ''));
        
      setSelectedTranslation(finalTrans);

      const paramBook = searchParams.get('book');
      if (paramBook) setSelectedBookId(paramBook);

      const paramChapter = searchParams.get('chapter');
      if (paramChapter) setSelectedChapter(Number(paramChapter));
    };
    init();
  }, [tradition, searchParams, initialSection]);

  // 2. Load books when translation changes
  useEffect(() => {
    if (selectedTranslation) {
      setLoading(true);
      bibleService.getBooks(selectedTranslation).then((loadedBooks) => {
        // Filter books based on OT/NT if necessary
        let filtered = loadedBooks;
        if (initialSection === 'OT') {
          const otIds = ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA', '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO', 'ECC', 'SNG', 'ISA', 'JER', 'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO', 'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL'];
          filtered = loadedBooks.filter(b => otIds.includes(b.id) || b.id.match(/^[1-4]MA|BAR|BEL|DAG|ESG|JDT|LJE|MAN|SIR|SUS|TOB|WIS|S3Y$/)); // Include common Deuterocanon
        } else if (initialSection === 'NT') {
          const ntIds = ['MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS', '1PE', '2PE', '1JO', '2JO', '3JO', 'JUD', 'REV'];
          filtered = loadedBooks.filter(b => ntIds.includes(b.id));
        }

        setBooks(filtered);
        if (filtered.length > 0) {
          // If we don't have a book selected from params, pick first
          if (!selectedBookId || !filtered.find(b => b.id === selectedBookId)) {
            setSelectedBookId(filtered[0].id);
            setSelectedChapter(1);
          }
        }
        setLoading(false);
      });
    }
  }, [selectedTranslation, initialSection]);

  // 3. Load chapter data
  useEffect(() => {
    if (selectedTranslation && selectedBookId) {
      setLoading(true);
      bibleService.getChapter(selectedTranslation, selectedBookId, selectedChapter)
        .then(setChapterData)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [selectedTranslation, selectedBookId, selectedChapter]);

  const selectedBook = useMemo(() => books.find(b => b.id === selectedBookId), [books, selectedBookId]);

  const handleNextChapter = () => {
    if (selectedBook && selectedChapter < selectedBook.numberOfChapters) {
      setSelectedChapter(prev => prev + 1);
    } else {
      // Go to next book
      const currentIndex = books.findIndex(b => b.id === selectedBookId);
      if (currentIndex < books.length - 1) {
        setSelectedBookId(books[currentIndex + 1].id);
        setSelectedChapter(1);
      }
    }
  };

  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(prev => prev - 1);
    } else {
      // Go to prev book
      const currentIndex = books.findIndex(b => b.id === selectedBookId);
      if (currentIndex > 0) {
        const prevBook = books[currentIndex - 1];
        setSelectedBookId(prevBook.id);
        setSelectedChapter(prevBook.numberOfChapters);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Settings & Selection */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:items-end lg:grid-cols-4">
        <div className="flex flex-col">
          <label className="mb-2 block text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            <LocalizedText text="Translation" />
          </label>
          <select
            value={selectedTranslation}
            onChange={(e) => setSelectedTranslation(e.target.value)}
            className="w-full rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-3 py-2 text-[10px] text-[var(--text-secondary)] outline-none hover:bg-[var(--bg-secondary)]"
          >
            {translations.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.language.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 block text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            <LocalizedText text="Book" />
          </label>
          <div className="relative">
            <select
              value={selectedBookId}
              onChange={(e) => {
                setSelectedBookId(e.target.value);
                setSelectedChapter(1);
              }}
              className="w-full rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-3 py-2 text-[10px] text-[var(--text-secondary)] outline-none hover:bg-[var(--bg-secondary)]"
            >
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 block text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            <LocalizedText text="Chapter" />
          </label>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(Number(e.target.value))}
            className="w-full rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-3 py-2 text-[10px] text-[var(--text-secondary)] outline-none hover:bg-[var(--bg-secondary)]"
          >
            {selectedBook && Array.from({ length: selectedBook.numberOfChapters }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size Controls */}
        <div className="flex flex-col">
          <label className="mb-2 block text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            <LocalizedText text="Font Size" />
          </label>
          <div className="flex h-[38px] items-center justify-between rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 p-1">
            <button
              onClick={() => setFontSize(prev => Math.max(75, prev - 12.5))}
              className="flex h-full w-full items-center justify-center rounded text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)]"
              title="Decrease font size"
            >
              <Minus size={14} />
            </button>
            <div className="flex h-6 w-px bg-[var(--border)]/30 mx-1 shrink-0" />
            <div className="flex h-full w-full items-center justify-center text-[var(--text-secondary)]">
              <Type size={14} />
            </div>
            <div className="flex h-6 w-px bg-[var(--border)]/30 mx-1 shrink-0" />
            <button
              onClick={() => setFontSize(prev => Math.min(250, prev + 12.5))}
              className="flex h-full w-full items-center justify-center rounded text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)]"
              title="Increase font size"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      <SectionDivider label={`${selectedBook?.name || ''} ${selectedChapter}`} />

      {/* Reader Content */}
      <Card className="relative min-h-[400px] overflow-hidden bg-[var(--card)]/50 p-8 shadow-inner">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--card)]/80 backdrop-blur-sm">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent"></div>
          </div>
        )}

        <div className="mx-auto max-w-3xl">
          {chapterData ? (
            <div className="space-y-6">
              <div className="mb-12 text-center">
                <h2 className="font-heading text-4xl text-[var(--text-secondary)]">
                  {chapterData.book} {chapterData.chapter}
                </h2>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none" style={{ fontSize: `${fontSize}%` }}>
                {chapterData.verses.map((v) => (
                  <p key={v.verse} className="group relative flex gap-4 leading-relaxed">
                    <span className="mt-1 block h-fit shrink-0 select-none text-xs font-bold text-[var(--accent)] opacity-50" style={{ fontSize: '0.75rem' }}>
                      {v.verse}
                    </span>
                    <span className="text-[var(--text-primary)]/90">
                      {v.text}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          ) : !loading && (
            <div className="flex h-full flex-col items-center justify-center py-20 text-[var(--text-primary)]/40">
              <BookOpen size={48} className="mb-4 opacity-20" />
              <p>
                <LocalizedText text="Select a book and chapter to start reading." />
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrevChapter}
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 py-2 text-[10px] font-heading text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-secondary)]"
        >
          <ChevronLeft size={16} /> <LocalizedText text="Previous" />
        </button>
        <button
          onClick={handleNextChapter}
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 py-2 text-[10px] font-heading text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-secondary)]"
        >
          <LocalizedText text="Next" /> <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
