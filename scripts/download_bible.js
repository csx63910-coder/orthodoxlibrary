import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.join(__dirname, '../public/data/bible');
const API_BASE = 'https://bible.helloao.org/api';

const TRANSLATIONS = [
  'eng_kjv',
  'eng_lxx',
  'grc_bre',
  'grc_byz',
  'eng_web'
];

async function downloadFile(url, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log(`Downloading ${url} to ${dest}...`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  const data = await response.json();
  fs.writeFileSync(dest, JSON.stringify(data, null, 2));
  return data;
}

async function main() {
  try {
    // 1. Download available translations
    await downloadFile(`${API_BASE}/available_translations.json`, path.join(BASE_DIR, 'available_translations.json'));

    for (const transId of TRANSLATIONS) {
      console.log(`\nProcessing translation: ${transId}`);
      
      // 2. Download books.json
      const booksData = await downloadFile(`${API_BASE}/${transId}/books.json`, path.join(BASE_DIR, transId, 'books.json'));

      // 3. Download all chapters for each book
      for (const book of booksData.books) {
        console.log(`  Downloading chapters for book: ${book.name} (${book.id})`);
        
        let subDir = '';
         const fullBibles = ['eng_kjv', 'rus_syn', 'srp_865'];
         if (fullBibles.includes(transId)) {
           const ot1 = ["GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA", "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST"];
           const ot2 = ["JOB", "PSA", "PRO", "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO", "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "ZEC", "MAL"];
           const nt = ["MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH", "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS", "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV"];

           if (ot1.includes(book.id)) subDir = 'Old Testament 1';
           else if (ot2.includes(book.id)) subDir = 'Old Testament 2';
           else if (nt.includes(book.id)) subDir = 'New Testament';
         }

        for (let i = 1; i <= book.numberOfChapters; i++) {
          const chapterUrl = `${API_BASE}/${transId}/${book.id}/${i}.json`;
          const chapterPath = path.join(BASE_DIR, transId, subDir, book.id, `${i}.json`);
          
          if (fs.existsSync(chapterPath)) {
            // console.log(`    Chapter ${i} already exists, skipping.`);
            continue;
          }

          try {
            await downloadFile(chapterUrl, chapterPath);
          } catch (e) {
            console.error(`    Error downloading chapter ${i}: ${e.message}`);
          }
        }
      }
    }

    console.log('\nAll downloads completed successfully!');
  } catch (error) {
    console.error('Download failed:', error);
  }
}

main();
