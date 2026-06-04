import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-40 rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 p-2 text-[var(--text-secondary)] shadow-lg hover:bg-[var(--bg-secondary)]"
    >
      <ArrowUp size={16} />
    </button>
  );
}
