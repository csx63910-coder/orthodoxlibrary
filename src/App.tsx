import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import BackToTop from "./components/BackToTop";
import CandlePage from "./app/candle/page";
import OrthodoxLayout from "./app/orthodox/OrthodoxLayout";
import OrthodoxCalendarPage from "./app/orthodox/calendar/page";
import OrthodoxFastingCalendarPage from "./app/orthodox/calendar/fasting-calendar/page";
import FeastDaysSaintsPage from "./app/orthodox/calendar/feast-days-saints/page";
import PaschaCalculatorPage from "./app/orthodox/calendar/pascha-calculator/page";
import OrthodoxCatechismPage from "./app/orthodox/catechism/page";
import OrthodoxChantPage from "./app/orthodox/chant/page";
import ByzantineChantPage from "./app/orthodox/chant/byzantine/page";
import ZnamennyChantPage from "./app/orthodox/chant/znamenny/page";
import SerbianChantPage from "./app/orthodox/chant/serbian/page";
import ArmenianSharakanPage from "./app/orthodox/chant/armenian/page";
import AntiochianChantPage from "./app/orthodox/chant/antiochian/page";
import ArabicChantPage from "./app/orthodox/chant/arabic/page";
import OrthodoxHomeWorshipPage from "./app/orthodox/home-worship/page";
import OrthodoxIconsPage from "./app/orthodox/icons/page";
import IconGalleryPage from "./app/orthodox/icons/icon-gallery/page";
import TheologyOfIconsPage from "./app/orthodox/icons/theology-of-icons/page";
import IconographyByTraditionPage from "./app/orthodox/icons/iconography-by-tradition/page";
import MiraculousIconsPage from "./app/orthodox/icons/miraculous-icons/page";
import HomeIconCornerGuidePage from "./app/orthodox/icons/home-icon-corner-guide/page";
import OrthodoxLiturgyPage from "./app/orthodox/liturgy/page";
import OrthodoxParishesPage from "./app/orthodox/parishes/page";
import OrthodoxPrayersPage from "./app/orthodox/prayers/page";
import OrthodoxPhilosophyPage from "./app/orthodox/philosophy/page";
import OrthodoxArticleDetailPage from "./app/orthodox/philosophy/ArticleDetail";
import OrthodoxResourcesPage from "./app/orthodox/resources/page";
import OrthodoxSaintsPage from "./app/orthodox/saints/page";
import OrthodoxScripturePage from "./app/orthodox/scripture/page";
import OldTestamentPage from "./app/orthodox/scripture/old-testament/page";
import OrthodoxNewTestamentPage from "./app/orthodox/scripture/new-testament/page";
import FullBiblePage from "./app/orthodox/scripture/full-bible/page";
import DailyScriptureReadingsPage from "./app/orthodox/scripture/daily-readings/page";
import CommandmentsPage from "./app/orthodox/scripture/commandments/page";
import PrayerCornerSetupPage from "./app/orthodox/home-worship/prayer-corner-setup";
import FamilyDevotionsPage from "./app/orthodox/home-worship/family-devotions";
import FastingGuidelinesPage from "./app/orthodox/home-worship/fasting-guidelines";
import PreparingForConfessionPage from "./app/orthodox/home-worship/preparing-for-confession";
import PreparingForCommunionPage from "./app/orthodox/home-worship/preparing-for-communion";
import OrthodoxDashboardPage from "./app/orthodox/page";
import LandingPage from "./app/page";
import {
  AdminBibleImportPage,
  BookDetailPage,
  ConvertGuidePage,
  CouncilDetailPage,
  CouncilsIndexPage,
  FatherDetailPage,
  FathersIndexPage,
  FastingPage,
  FeastDetailPage,
  GlossaryDetailPage,
  GlossaryIndexPage,
  JurisdictionalDifferencesPage,
  MysteryPage,
  OrthodoxDeepIndex,
  PhilokaliaExcerptsPage,
  PrayerDetailPage,
  PrayerRopeInteractivePage,
  SaintDetailPage,
  ScriptureReader,
  SearchPage,
  TodayDashboard,
  WhatIsOrthodoxyPage,
  LivePrayerViewPage,
  LiturgyDetailPage,
  OrthodoxResourceSubPage,
} from "./app/addonPages";
import SynaxarionPage from "./app/orthodox/saints/tabs/SynaxarionPage";
import SaintOfDayPage from "./app/orthodox/saints/tabs/SaintOfDayPage";
import NameDayLookupPage from "./app/orthodox/saints/tabs/NameDayLookupPage";
import PatronSaintsPage from "./app/orthodox/saints/tabs/PatronSaintsPage";

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/candle" element={<CandlePage />} />
          <Route path="/glossary" element={<GlossaryIndexPage />} />
          <Route path="/glossary/:termSlug" element={<GlossaryDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin/import-bible" element={<AdminBibleImportPage />} />

          <Route path="/orthodox" element={<OrthodoxLayout />}>
            <Route index element={<OrthodoxDashboardPage />} />
            <Route path="today" element={<TodayDashboard tradition="orthodox" />} />
            <Route path="fasting" element={<FastingPage tradition="orthodox" />} />
            <Route path="scripture" element={<OrthodoxScripturePage />} />
            <Route path="scripture/old-testament" element={<OldTestamentPage />} />
            <Route path="scripture/new-testament" element={<OrthodoxNewTestamentPage />} />
            <Route path="scripture/full-bible" element={<FullBiblePage />} />
            <Route path="scripture/daily-readings" element={<DailyScriptureReadingsPage />} />
            <Route path="scripture/commandments" element={<CommandmentsPage />} />

            <Route path="scripture/reader" element={<ScriptureReader tradition="orthodox" />} />
            <Route path="scripture/:bookSlug/:chapterNumber" element={<ScriptureReader tradition="orthodox" />} />
            <Route path="calendar" element={<OrthodoxCalendarPage />} />
            <Route path="calendar/fasting-calendar" element={<OrthodoxFastingCalendarPage />} />
            <Route path="calendar/feast-days-saints" element={<FeastDaysSaintsPage />} />
            <Route path="calendar/pascha-calculator" element={<PaschaCalculatorPage />} />
            <Route path="calendar/feasts/:feastSlug" element={<FeastDetailPage tradition="orthodox" />} />
            <Route path="prayers" element={<OrthodoxPrayersPage />} />
            <Route path="prayers/live" element={<LivePrayerViewPage />} />
            <Route path="prayers/prayer-rope/interactive" element={<PrayerRopeInteractivePage />} />
            <Route path="prayers/:prayerSlug" element={<PrayerDetailPage tradition="orthodox" />} />
            <Route path="liturgy" element={<OrthodoxLiturgyPage />} />
            <Route path="liturgy/:liturgySlug" element={<LiturgyDetailPage />} />
            <Route path="chant" element={<OrthodoxChantPage />} />
            <Route path="chant/byzantine" element={<ByzantineChantPage />} />
            <Route path="chant/znamenny" element={<ZnamennyChantPage />} />
            <Route path="chant/serbian" element={<SerbianChantPage />} />
            <Route path="chant/armenian" element={<ArmenianSharakanPage />} />
            <Route path="chant/antiochian" element={<AntiochianChantPage />} />
            <Route path="chant/arabic" element={<ArabicChantPage />} />
            <Route path="icons" element={<OrthodoxIconsPage />} />
            <Route path="icons/icon-gallery" element={<IconGalleryPage />} />
            <Route path="icons/theology-of-icons" element={<TheologyOfIconsPage />} />
            <Route path="icons/iconography-by-tradition" element={<IconographyByTraditionPage />} />
            <Route path="icons/miraculous-icons" element={<MiraculousIconsPage />} />
            <Route path="icons/home-icon-corner-guide" element={<HomeIconCornerGuidePage />} />
            <Route path="catechism" element={<OrthodoxCatechismPage />} />
            <Route path="catechism/what-is-orthodoxy" element={<WhatIsOrthodoxyPage />} />
            <Route path="catechism/fathers" element={<FathersIndexPage />} />
            <Route path="catechism/fathers/:fatherSlug" element={<FatherDetailPage />} />
            <Route path="catechism/councils" element={<CouncilsIndexPage />} />
            <Route path="catechism/councils/:councilSlug" element={<CouncilDetailPage />} />
            <Route path="catechism/philokalia" element={<PhilokaliaExcerptsPage />} />
            <Route path="catechism/mysteries" element={<Navigate to="/orthodox/catechism" replace />} />
            <Route path="catechism/mysteries/:mysterySlug" element={<MysteryPage tradition="orthodox" />} />
            <Route path="catechism/jurisdictions" element={<JurisdictionalDifferencesPage />} />
            <Route path="catechism/convert-guide" element={<ConvertGuidePage />} />
            <Route path="saints" element={<OrthodoxSaintsPage />} />
            <Route path="saints/synaxarion" element={<SynaxarionPage />} />
            <Route path="saints/saint-of-the-day" element={<SaintOfDayPage />} />
            <Route path="saints/name-day-lookup" element={<NameDayLookupPage />} />
            <Route path="saints/patron-saints" element={<PatronSaintsPage />} />
            <Route path="saints/:saintSlug" element={<SaintDetailPage tradition="orthodox" />} />
            <Route path="home-worship" element={<OrthodoxHomeWorshipPage />} />
            <Route path="home-worship/prayer-corner-setup" element={<PrayerCornerSetupPage />} />
            <Route path="home-worship/family-devotions" element={<FamilyDevotionsPage />} />
            <Route path="home-worship/fasting-guidelines" element={<FastingGuidelinesPage />} />
            <Route path="home-worship/preparing-for-confession" element={<PreparingForConfessionPage />} />
            <Route path="home-worship/preparing-for-communion" element={<PreparingForCommunionPage />} />
            <Route path="parishes" element={<OrthodoxParishesPage />} />
            <Route path="philosophy" element={<OrthodoxPhilosophyPage />} />
            <Route path="philosophy/:articleSlug" element={<OrthodoxArticleDetailPage />} />
            <Route path="resources" element={<OrthodoxResourcesPage />} />
            <Route path="resources/books" element={<OrthodoxResourceSubPage contentKey="resources-books" />} />
            <Route path="resources/podcasts" element={<OrthodoxResourceSubPage contentKey="resources-podcasts" />} />
            <Route path="resources/monasteries" element={<OrthodoxResourceSubPage contentKey="resources-monasteries" />} />
            <Route path="resources/pilgrimages" element={<OrthodoxResourceSubPage contentKey="resources-pilgrimages" />} />
            <Route path="resources/pdfs" element={<OrthodoxResourceSubPage contentKey="resources-pdfs" />} />
            <Route path="resources/books/:bookSlug" element={<BookDetailPage tradition="orthodox" />} />
            <Route path="deep-links" element={<OrthodoxDeepIndex />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BackToTop />
      </HashRouter>
    </ThemeProvider>
  );
}
