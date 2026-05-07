import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import BibleReader from "../../../../components/BibleReader";
import LocalizedText from "../../../../components/LocalizedText";

export default function OrthodoxNewTestamentPage() {
  const { t } = useTranslation();

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "home", to: "/" },
            { label: "orthodox", to: "/orthodox" },
            { label: "holy_scripture", to: "/orthodox/scripture" },
            { label: "new_testament", to: "/orthodox/scripture/new-testament" },
          ]}
        />
        
        <div className="mb-8">
          <h1 className="font-heading text-4xl text-[var(--text-secondary)] md:text-5xl">
            <LocalizedText text="new_testament" />
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/88">
            <LocalizedText text="The Gospels, the Epistles, and the Revelation - the new and everlasting covenant of our Lord and Savior Jesus Christ." />
          </p>
        </div>

        <BibleReader tradition="orthodox" initialSection="NT" />
      </div>
    </main>
  );
}
