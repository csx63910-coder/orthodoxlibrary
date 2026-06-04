import { Book, ExternalLink, Download, FileText } from 'lucide-react';
import Card from '../../../components/Card';
import SectionDivider from '../../../components/SectionDivider';

interface BookItem {
  title: string;
  author: string;
  description?: string;
  links: { label: string; url: string; type: 'pdf' | 'archive' | 'site' }[];
}

const recommendedBooks: BookItem[] = [
  {
    title: "The Philokalia",
    author: "Palmer, Sherrard, Ware Translation",
    description: "A collection of texts written between the 4th and 15th centuries by spiritual masters of the Eastern Orthodox Hesychast tradition.",
    links: [
      { label: "Vol 1", url: "https://www.holybooks.com/wp-content/uploads/The-Philokalia-Volume-1.pdf", type: 'pdf' },
      { label: "Vol 2", url: "https://www.holybooks.com/wp-content/uploads/The-Philokalia-Volume-2.pdf", type: 'pdf' },
      { label: "Vol 3", url: "https://www.holybooks.com/wp-content/uploads/The-Philokalia-Volume-3.pdf", type: 'pdf' },
      { label: "Vol 4", url: "https://www.holybooks.com/wp-content/uploads/The-Philokalia-Volume-4.pdf", type: 'pdf' },
    ]
  },
  {
    title: "On the Incarnation",
    author: "St. Athanasius",
    description: "A foundational work of Christian theology, explaining the purpose of Christ's coming in the flesh.",
    links: [
      { label: "Read PDF", url: "https://www.ccel.org/ccel/athanasius/incarnation.pdf", type: 'pdf' }
    ]
  },
  {
    title: "The Ladder of Divine Ascent",
    author: "St. John Climacus",
    description: "An influential work on the monastic life and the struggle for spiritual perfection.",
    links: [
      { label: "Read PDF", url: "https://www.oca.org/files/PDF/Scripture/Ladder-of-Divine-Ascent.pdf", type: 'pdf' }
    ]
  },
  {
    title: "The Orthodox Way",
    author: "Metr. Kallistos Ware",
    description: "A general introduction to the Orthodox faith, focusing on the dynamic and experiential nature of theology.",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/the-orthodox-way-kallistos-ware", type: 'archive' }
    ]
  },
  {
    title: "The Orthodox Church",
    author: "Metr. Kallistos Ware",
    description: "The classic introductory text providing a history of the Orthodox Church and an explanation of its theology and worship.",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/orthodoxchurch0000ware", type: 'archive' }
    ]
  },
  {
    title: "For the Life of the World",
    author: "Fr. Alexander Schmemann",
    description: "A profound exploration of the sacraments and the liturgical vision of the world.",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/forlifeofworldsa0000schm", type: 'archive' }
    ]
  },
  {
    title: "The Didache",
    author: "Early Church Fathers",
    description: "The 'Teaching of the Twelve Apostles', a brief early Christian treatise on morals and church practice.",
    links: [
      { label: "Read PDF", url: "https://www.thedidache.com/Didache.pdf", type: 'pdf' }
    ]
  },
  {
    title: "Catechetical Talks",
    author: "Fr. Daniel Sysoev",
    description: "Missionary and catechetical instructions from a modern martyr.",
    links: [
      { label: "Official Site", url: "https://mission-shop.com/en/books/", type: 'site' }
    ]
  },
  {
    title: "The Law of God",
    author: "Fr. Daniel Sysoev",
    description: "A comprehensive guide to the Orthodox faith and practice.",
    links: [
      { label: "Official Site", url: "https://mission-shop.com/en/the-law-of-god/", type: 'site' }
    ]
  },
  {
    title: "Indication of the Way into the Kingdom of Heaven",
    author: "St. Innocent",
    description: "A simple and powerful guide to salvation, written for those beginning their spiritual journey.",
    links: [
      { label: "Read PDF", url: "https://www.st-seraphim.org/Indication_into_the_Way.pdf", type: 'pdf' }
    ]
  },
  {
    title: "The Way of a Pilgrim",
    author: "Anonymous",
    description: "A 19th-century Russian classic about a wanderer who wants to learn how to 'pray without ceasing.' It is the best introduction to the Jesus Prayer.",
    links: [
      { label: "Read PDF", url: "https://www.holybooks.com/wp-content/uploads/The-Way-of-a-Pilgrim.pdf", type: 'pdf' }
    ]
  },
  {
    title: "The Sayings of the Desert Fathers",
    author: "Apophthegmata Patrum",
    description: "Short, punchy anecdotes and wisdom from the 4th-century Egyptian monks.",
    links: [
      { label: "Read PDF", url: "https://www.monumentaltheology.com/uploads/1/3/4/2/134267676/desert_fathers_sayings.pdf", type: 'pdf' }
    ]
  },
  {
    title: "The Life of St. Antony",
    author: "St. Athanasius",
    description: "The biography that launched the monastic movement. It details Antony's literal and spiritual battles in the desert.",
    links: [
      { label: "Official Site", url: "https://www.newadvent.org/fathers/2811.htm", type: 'site' }
    ]
  },
  {
    title: "On the Holy Spirit",
    author: "St. Basil the Great",
    description: "A 4th-century defense of the divinity of the Holy Spirit. Essential for understanding the Trinity.",
    links: [
      { label: "Read PDF", url: "https://www.ccel.org/ccel/basil/spirit.pdf", type: 'pdf' }
    ]
  },
  {
    title: "The Exact Exposition of the Orthodox Faith",
    author: "St. John of Damascus",
    description: "The first real 'systematic theology' of the East, summarizing the teachings of the Fathers before him.",
    links: [
      { label: "Read PDF", url: "https://www.ccel.org/ccel/damascus/orthodox_faith.pdf", type: 'pdf' }
    ]
  },
  {
    title: "Wounded by Love",
    author: "St. Porphyrios",
    description: "The life and teachings of a modern Greek saint who emphasized love and 'gentleness' over harsh asceticism.",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/wounded-by-love-porphyrios", type: 'archive' }
    ]
  },
  {
    title: "Our Thoughts Determine Our Lives",
    author: "Elder Thaddeus of Vitovnica",
    description: "Practical advice on how inner peace depends entirely on our mental state and subduing intrusive thoughts.",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/our-thoughts-determine-our-lives", type: 'archive' }
    ]
  },
  {
    title: "St. Silouan the Athonite",
    author: "Elder Sophrony Sakharov",
    description: "The life of a simple monk who received the famous word: 'Keep thy mind in hell and despair not.'",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/saint-silouan-the-athonite", type: 'archive' }
    ]
  },
  {
    title: "The Arena",
    author: "St. Ignatius Brianchaninov",
    description: "Written for monastics but essential for laypeople; it’s a sober guide on how to navigate the modern spiritual 'arena.'",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/the-arena-ignatius-brianchaninov", type: 'archive' }
    ]
  },
  {
    title: "Beginning to Pray",
    author: "Metr. Anthony Bloom",
    description: "Perhaps the most accessible book on prayer ever written. It deals with the 'absence' of God and how to be honest in prayer.",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/beginning-to-pray-anthony-bloom", type: 'archive' }
    ]
  },
  {
    title: "The Mystical Theology of the Eastern Church",
    author: "Vladimir Lossky",
    description: "A dense but brilliant explanation of how theology and spirituality are inseparable in Orthodoxy.",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/mystical-theology-of-the-eastern-church-vladimir-lossky", type: 'archive' }
    ]
  },
  {
    title: "The Life in Christ",
    author: "St. Nicholas Cabasilas",
    description: "A 14th-century masterpiece on how the Sacraments (Baptism, Chrismation, Eucharist) transform the soul.",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/life-in-christ-nicholas-cabasilas", type: 'archive' }
    ]
  },
  {
    title: "The Hymns of Divine Love",
    author: "St. Symeon the New Theologian",
    description: "Intensely personal and poetic accounts of seeing the 'Uncreated Light' of God.",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/hymns-of-divine-love-symeon", type: 'archive' }
    ]
  },
  {
    title: "Being as Communion",
    author: "John Zizioulas",
    description: "A high-level theological work on how 'personhood' is found only in relationship with others and God.",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/being-as-communion-zizioulas", type: 'archive' }
    ]
  },
  {
    title: "The Mountain of Silence",
    author: "Kyriacos Markides",
    description: "A sociologist interviews an Athonite elder. It’s a bridge between the secular mind and the spiritual depth of Mt. Athos.",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/the-mountain-of-silence-markides", type: 'archive' }
    ]
  },
  {
    title: "The Great Canon of St. Andrew of Crete",
    author: "St. Andrew of Crete",
    description: "The longest hymn in the Church, sung during Lent. It is a massive walk-through of the Bible as a mirror for the soul.",
    links: [
      { label: "Official Site", url: "https://www.goarch.org/-/the-great-canon-of-st-andrew-of-crete", type: 'site' }
    ]
  },
  {
    title: "The Ethics of Beauty",
    author: "Timothy Patitsas",
    description: "A massive modern work arguing that the Church’s primary role is 'healing' through beauty rather than legalism.",
    links: [
      { label: "Official Site", url: "https://beautythehealingofthesoul.com/", type: 'site' }
    ]
  },
  {
    title: "The Scent of Holiness",
    author: "Constantina Palmer",
    description: "Insights into the lives of Orthodox nuns in Greece; it provides a much-needed female monastic perspective.",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/the-scent-of-holiness", type: 'archive' }
    ]
  },
  {
    title: "Common Ground",
    author: "Fr. Eric Tosi",
    description: "A guide to the 'why' behind the physical actions of the Church (icons, incense, candles).",
    links: [
      { label: "Official Site", url: "https://www.oca.org/questions/teaching/the-church-building", type: 'site' }
    ]
  },
  {
    title: "The Soul After Death",
    author: "Fr. Seraphim Rose",
    description: "A controversial but widely read modern text exploring the Orthodox view of the afterlife and the 'toll houses.'",
    links: [
      { label: "Archive.org", url: "https://archive.org/details/the-soul-after-death-seraphim-rose", type: 'archive' }
    ]
  }
];

export default function PatristicLibraryPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8 orthodox-pattern">
      <section>
        <h1 className="font-heading text-3xl leading-tight text-[var(--text-secondary)] md:text-5xl">
          Patristic Library
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/90">
          A collection of essential literature, patristic texts, and modern guides to the Orthodox faith.
        </p>
      </section>

      <SectionDivider label="Library" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommendedBooks.map((book) => (
          <Card key={book.title} className="h-full flex flex-col p-6">
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-heading text-xl text-[var(--text-secondary)] leading-tight">
                  {book.title}
                </h3>
                <Book className="w-5 h-5 text-[var(--accent)] shrink-0 mt-1" />
              </div>
              <p className="text-sm font-medium text-[var(--accent)]">
                {book.author}
              </p>
              {book.description && (
                <p className="text-sm text-[var(--text-primary)]/80 leading-relaxed">
                  {book.description}
                </p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)]/40">
              <div className="flex flex-wrap gap-2">
                {book.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all text-xs font-medium border border-[var(--accent)]/20"
                  >
                    {link.type === 'pdf' ? <Download className="w-3 h-3" /> : 
                     link.type === 'archive' ? <FileText className="w-3 h-3" /> : 
                     <ExternalLink className="w-3 h-3" />}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
