import Breadcrumbs from "../../../../components/Breadcrumbs";
import BibleReader from "../../../../components/BibleReader";
import LocalizedText from "../../../../components/LocalizedText";

export default function FullBiblePage() {
  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: 'home', to: "/" },
            { label: 'orthodox', to: "/orthodox" },
            { label: 'holy_scripture', to: "/orthodox/scripture" },
            { label: 'Full Bible', to: "/orthodox/scripture/full-bible" },
          ]}
        />
        
        <div className="mb-8">
          <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">
            <LocalizedText text="Full Bible" />
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/88">
            <LocalizedText text="The complete Holy Scriptures, containing both the Old and New Testaments." />
          </p>
        </div>

        <BibleReader tradition="orthodox" />
      </div>
    </main>
  );
}
