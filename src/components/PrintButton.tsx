import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print-hide inline-flex items-center gap-2 rounded-md border border-[var(--border)]/45 bg-[var(--card)]/85 px-2 py-1 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
    >
      <Printer size={15} /> Print this page
    </button>
  );
}
