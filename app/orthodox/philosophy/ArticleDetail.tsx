import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Card from "../../../components/Card";
import PrintButton from "../../../components/PrintButton";
import { ArrowLeft, ExternalLink, BookOpen } from "lucide-react";
import oodegrData from "../../../data/oodegrData.json";
import { useLocalized } from "../../../utils/cn";

interface ArticleData {
  title: string | any;
  author?: string | any;
  source?: string | any;
  content: string | any;
  category: string | any;
}

export default function ArticleDetail() {
  const { articleSlug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const localizedTitle = useLocalized(article?.title);
  const localizedAuthor = useLocalized(article?.author);
  const localizedContent = useLocalized(article?.content);
  const localizedCategory = useLocalized(article?.category);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // Find the article metadata in oodegrData
        let articleMeta = null;
        for (const category of oodegrData) {
          const found = (category as any).articles.find((a: any) => a.slug === articleSlug);
          if (found) {
            articleMeta = found;
            break;
          }
        }

        if (!articleMeta) {
          throw new Error("Article not found");
        }

        // Fetch the local JSON file
        const response = await fetch(articleMeta.dataPath);
        if (!response.ok) {
          throw new Error("Failed to load article content");
        }
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleSlug]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <main className="px-4 py-8 md:px-8">
        <Card className="bg-red-50 p-8 text-center border-red-200">
          <h2 className="text-2xl font-heading text-red-700">Error</h2>
          <p className="mt-2 text-red-600">{error || "Article not found"}</p>
          <button
            onClick={() => navigate("/orthodox/philosophy")}
            className="mt-6 flex items-center gap-2 mx-auto rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-all"
          >
            <ArrowLeft size={18} />
            Back to Philosophy
          </button>
        </Card>
      </main>
    );
  }

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <Breadcrumbs
        items={[
          { label: "home", to: "/" },
          { label: "orthodox", to: "/orthodox" },
          { label: "philosophy", to: "/orthodox/philosophy" },
          { label: localizedTitle, to: `/orthodox/philosophy/${articleSlug}` },
        ]}
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => navigate("/orthodox/philosophy")}
          className="flex items-center gap-2 rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-3 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-all"
        >
          <ArrowLeft size={18} />
          Back to Index
        </button>
        <PrintButton />
      </div>

      <article className="max-w-4xl mx-auto">
        <Card className="p-6 md:p-10 shadow-lg border-[var(--accent)]/20">
          <div className="mb-8 border-b border-[var(--accent)]/10 pb-8">
            <div className="flex items-center gap-3 text-[var(--accent)] mb-4">
              <BookOpen size={24} />
              <span className="text-sm font-medium uppercase tracking-wider">{localizedCategory}</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[var(--text-secondary)] leading-tight">
              {localizedTitle}
            </h1>
            {localizedAuthor && (
              <p className="mt-4 text-lg font-medium text-[var(--accent)]">
                By {localizedAuthor}
              </p>
            )}
            {article.source && (
              <a
                href={article.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-xs text-[var(--text-primary)]/50 hover:text-[var(--accent)] transition-colors"
              >
                Original Source: {new URL(article.source).hostname}
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          <div className="prose prose-sacred max-w-none">
            {/* Split content by double newlines and render as paragraphs */}
            {localizedContent.split('\n\n').map((paragraph: string, idx: number) => {
              if (paragraph.startsWith('###')) {
                return <h3 key={idx} className="font-heading text-2xl text-[var(--text-secondary)] mt-8 mb-4">{paragraph.replace('###', '').trim()}</h3>;
              }
              if (paragraph.startsWith('####')) {
                return <h4 key={idx} className="font-heading text-xl text-[var(--text-secondary)] mt-6 mb-3">{paragraph.replace('####', '').trim()}</h4>;
              }
              if (paragraph.startsWith('*')) {
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-2 my-4">
                    {paragraph.split('\n').map((li, liIdx) => (
                      <li key={liIdx} className="text-[var(--text-primary)]/90 leading-relaxed">
                        {li.replace('*', '').trim()}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="mb-4 text-lg leading-relaxed text-[var(--text-primary)]/90 whitespace-pre-wrap">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </Card>
      </article>

      <footer className="mt-16 text-center text-sm text-[var(--text-primary)]/60 max-w-2xl mx-auto">
        <p className="italic">
          This article is preserved locally for offline study as part of the Orthodox Library initiative. 
          All intellectual property belongs to the original authors and the Orthodox Outlet for Dogmatic Enquiries.
        </p>
      </footer>
    </main>
  );
}
