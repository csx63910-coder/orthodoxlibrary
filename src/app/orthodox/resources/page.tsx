import TraditionPage from "../../../components/TraditionPage";
import OrthodoxResourceTabs from "../../../components/OrthodoxResourceTabs";
import { orthodoxContent } from "../../siteData";

export default function OrthodoxResourcesPage() {
  return (
    <div className="space-y-6">
      <OrthodoxResourceTabs />
      <TraditionPage content={orthodoxContent.resources} patternClassName="orthodox-pattern" />
    </div>
  );
}