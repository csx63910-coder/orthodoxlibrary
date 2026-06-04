import { useEffect, useState } from "react";
import { Search, BookCopy, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import OrthodoxSaintTabs from "../../../../components/OrthodoxSaintTabs";
import LocalizedText from "../../../../components/LocalizedText";
import { getLocalized } from "../../../../utils/cn";
import i18next from "i18next";

// Mapping of Greeklish/Common variants to search terms
const NAME_VARIANTS: Record<string, string[]> = {
  "sotirios": ["sotirios", "sotiris", "soterios", "soter", "σωτήριος", "σωτήρης"],
  "sotiris": ["sotirios", "sotiris", "soterios", "soter", "σωτήριος", "σωτήρης"],
  "john": ["john", "ioannis", "yanis", "yiannis", "ιωάννης", "γιάννης"],
  "george": ["george", "georgios", "yiorgos", "yorgos", "γεώργιος", "γιώργος"],
  "nicholas": ["nicholas", "nicolaos", "nikolaos", "nikos", "νικόλαος", "νίκος"],
  "catherine": ["catherine", "katerina", "ekaterina", "aikaterini", "κατερίνα", "αικατερίνη"],
  "mary": ["mary", "maria", "panagia", "theotokos", "μαρία", "παναγία"],
  "peter": ["peter", "petros", "πέτρος"],
  "paul": ["paul", "pavlos", "παύλος"],
  "spyridon": ["spyridon", "spyros", "spiros", "σπυρίδων", "σπύρος"],
  "demetrios": ["demetrios", "dimitrios", "dimitris", "jimmy", "δημήτριος", "δημήτρης"],
  "konstantinos": ["konstantinos", "constantine", "costas", "kostas", "κωνσταντίνος", "κώστας"],
  "eleni": ["eleni", "helen", "elena", "ελένη"],
  "athanasios": ["athanasios", "thanasis", "nasos", "αθανάσιος", "θανάσης"],
  "vasilios": ["vasilios", "basil", "vassilis", "bill", "βασίλειος", "βασίλης"],
  "gregory": ["gregory", "grigorios", "γρηγόριος"],
  "andrew": ["andrew", "andreas", "ανδρέας"],
  "philip": ["philip", "philippos", "φίλιππος"],
  "thomas": ["thomas", "thomass", "θωμάς"],
  "stylianos": ["stylianos", "stelios", "στυλιανός", "στέλιος"],
  "paraskevi": ["paraskevi", "voula", "vivian", "παρασκευή"],
  "anastasia": ["anastasia", "tasia", "anastasios", "anastasis", "αναστασία", "αναστάσιος", "τάσος"],
  "theodore": ["theodore", "theodoros", "thodoris", "θεόδωρος", "θοδωρής"],
  "christos": ["christos", "chris", "χρήστος"],
  "panteleimon": ["panteleimon", "pantelis", "παντελεήμων", "παντελής"],
  "nektarios": ["nektarios", "nectarios", "νεκτάριος"],
  "paisios": ["paisios", "παΐσιος"],
  "porphyrios": ["porphyrios", "porfirios", "πορφύριος"],
  "iacovos": ["iacovos", "iakovo", "james", "ιάκωβος"],
};

export default function NameDayLookupPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [nameSaintsData, setNameSaintsData] = useState<any[]>([]);

  useEffect(() => {
    const lang = (i18next.language || 'en').split('-')[0];
    const dataPath = ['el', 'ru'].includes(lang) 
      ? `/data/namesaint/${lang}/namesaint.json`
      : `/data/namesaint/en/namesaint.json`;

    fetch(dataPath)
      .then(res => res.json())
      .then(data => setNameSaintsData(data))
      .catch(err => console.error("Error loading name saints data:", err));
  }, [i18next.language]);

  const handleSearch = (q: string) => {
    setQuery(q);
    const lowQ = q.toLowerCase().trim();
    
    if (lowQ.length < 2 || nameSaintsData.length === 0) {
      setResults([]);
      return;
    }

    // Find all potential search terms (the query itself + any aliases)
    const searchTerms = new Set([lowQ]);
    
    // Add variants if found
    Object.entries(NAME_VARIANTS).forEach(([key, variants]) => {
      if (lowQ.includes(key) || variants.some(v => lowQ.includes(v))) {
        variants.forEach(v => searchTerms.add(v));
        searchTerms.add(key);
      }
    });

    const filtered = nameSaintsData.filter((item: any) => {
      const text = (item.name + " " + item.summary).toLowerCase();
      return Array.from(searchTerms).some(term => text.includes(term));
    }).slice(0, 50);

    setResults(filtered);
  };

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs 
          items={[
            { label: 'home', to: "/" }, 
            { label: 'orthodox', to: "/orthodox" }, 
            { label: 'saints', to: "/orthodox/saints" }, 
            { label: 'Name Saint', to: "/orthodox/saints/name-day-lookup" }
          ]} 
        />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)]">
          <LocalizedText text="Name Saint" />
        </h1>
        <OrthodoxSaintTabs />

        <div className="mt-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-primary)]/40 h-5 w-5" />
            <input
              type="text"
              placeholder={getLocalized('Search for your baptismal name (e.g., Nicholas, Catherine, John)...')}
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] py-4 pl-12 pr-4 text-lg outline-none focus:border-[var(--accent)]"
            />
          </div>
          
          <p className="mt-3 text-sm text-[var(--text-primary)]/60">
            <LocalizedText text="Lookup your Patron Saint and Name Day" />
          </p>
        </div>

        {results.length > 0 && (
          <div className="mt-4 text-sm font-medium text-[var(--accent)]">
            {getLocalized('Found')} {results.length} {getLocalized('matching saints')}
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.length === 0 && query.length >= 2 && (
            <div className="col-span-full py-12 text-center text-[var(--text-primary)]/50">
              No results found for "{query}". Try another variant.
            </div>
          )}

          {results.length === 0 && query.length < 2 && (
            <div className="col-span-full py-12 text-center text-[var(--text-primary)]/40">
              <LocalizedText text="Start typing to find your patron saint..." />
            </div>
          )}

          {results.map((item, idx) => (
            <Card key={idx} className="flex flex-col h-full border-[var(--border)]/40 bg-[var(--card)]/60">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  {item.feast_date}
                </span>
                <BookCopy className="h-4 w-4 text-[var(--text-primary)]/20" />
              </div>
              <h2 className="font-heading text-2xl text-[var(--text-secondary)]">{item.name}</h2>
              <p className="mt-3 flex-grow text-sm leading-relaxed text-[var(--text-primary)]/80">
                {item.summary}
              </p>
              <div className="mt-6 border-t border-[var(--border)]/10 pt-4">
                <Link
                  to={`/orthodox/saints/${item.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] hover:underline"
                >
                  Full Life & Icon <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
