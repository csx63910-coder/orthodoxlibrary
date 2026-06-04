import {
  BookOpen,
  CalendarDays,
  Church,
  Compass,
  GraduationCap,
  HandHeart,
  Landmark,
  MapPinned,
  Music,
  Paintbrush,
  Search,
  Sparkles,
  TentTree,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SidebarSection = {
  title: string;
  path: string;
  icon: LucideIcon;
  subItems: { title: string; path: string }[];
};

export type PageContent = {
  title: string;
  subtitle: string;
  paragraphs: string[];
  quote?: string;
  quoteSource?: string;
  items: { title: string; description: string; path?: string }[];
};

export const orthodoxSections: SidebarSection[] = [
  {
    title: "Holy Scripture",
    path: "/orthodox/scripture",
    icon: BookOpen,
    subItems: [
      { title: "Old Testament", path: "/orthodox/scripture/old-testament" },
      { title: "New Testament", path: "/orthodox/scripture/new-testament" },
      { title: "Full Bible", path: "/orthodox/scripture/full-bible" },
      { title: "Daily Scripture Readings", path: "/orthodox/scripture/daily-readings" },
      { title: "Commandments", path: "/orthodox/scripture/commandments" },
    ],
  },
  {
    title: "Liturgical Calendar",
    path: "/orthodox/calendar",
    icon: CalendarDays,
    subItems: [
      { title: "Greek Orthodox Calendar", path: "/orthodox/calendar" },
      { title: "Fasting Calendar", path: "/orthodox/calendar/fasting-calendar" },
      { title: "Feast Days & Saints", path: "/orthodox/calendar/feast-days-saints" },
      { title: "Pascha Calculator", path: "/orthodox/calendar/pascha-calculator" },
    ],
  },
  {
    title: "Prayer Book",
    path: "/orthodox/prayers",
    icon: HandHeart,
    subItems: [
      { title: "Live Prayer", path: "/orthodox/prayers/live" },
      { title: "Evening Prayers", path: "/orthodox/prayers/before-sleep" },
      { title: "Midnight Office", path: "/orthodox/prayers/compline" },
      { title: "Akathist Hymns", path: "/orthodox/prayers/akathist-to-theotokos" },
      { title: "Jesus Prayer Guide", path: "/orthodox/prayers/jesus-prayer" },
      { title: "Prayers Before Communion", path: "/orthodox/prayers/prayer-before-communion" },
      { title: "Prayer Rope Guide", path: "/orthodox/prayers/prayer-rope/interactive" },
      { title: "Prayers by Jurisdiction: Greek, Slavonic, Serbian, Armenian, Antiochian", path: "/orthodox/prayers" },
    ],
  },
  {
    title: "Divine Liturgy",
    path: "/orthodox/liturgy",
    icon: Church,
    subItems: [
      { title: "Liturgy of St. John Chrysostom", path: "/orthodox/liturgy/st-john-chrysostom" },
      { title: "Liturgy of St. Basil the Great", path: "/orthodox/liturgy/st-basil-the-great" },
      { title: "Liturgy of St. James", path: "/orthodox/liturgy/st-james" },
      { title: "Presanctified Liturgy", path: "/orthodox/liturgy/presanctified" },
      { title: "Armenian Badarak", path: "/orthodox/liturgy/armenian-badarak" },
      { title: "Liturgical Texts (Original + English)", path: "/orthodox/liturgy/liturgical-texts" },
    ],
  },
  {
    title: "Hymns & Chant",
    path: "/orthodox/chant",
    icon: Music,
    subItems: [
      { title: "Byzantine Chant", path: "/orthodox/chant/byzantine" },
      { title: "Znamenny Chant (Russian)", path: "/orthodox/chant/znamenny" },
      { title: "Serbian Chant", path: "/orthodox/chant/serbian" },
      { title: "Armenian Sharakan", path: "/orthodox/chant/armenian" },
      { title: "Antiochian Orthodox Chant", path: "/orthodox/chant/antiochian" },
      { title: "Arabic Liturgical Hymns", path: "/orthodox/chant/arabic" },
    ],
  },
  {
    title: "Iconography",
    path: "/orthodox/icons",
    icon: Paintbrush,
    subItems: [
      { title: "Icon Gallery", path: "/orthodox/icons/icon-gallery" },
      { title: "Theology of Icons", path: "/orthodox/icons/theology-of-icons" },
      { title: "Iconography by Tradition", path: "/orthodox/icons/iconography-by-tradition" },
      { title: "Miraculous Icons", path: "/orthodox/icons/miraculous-icons" },
      { title: "Home Icon Corner Guide", path: "/orthodox/icons/home-icon-corner-guide" },
    ],
  },
  {
    title: "Catechism & Teaching",
    path: "/orthodox/catechism",
    icon: GraduationCap,
    subItems: [
      { title: "What is Orthodoxy?", path: "/orthodox/catechism/what-is-orthodoxy" },
      { title: "Seven Ecumenical Councils", path: "/orthodox/catechism/councils" },
      { title: "Church Fathers Library", path: "/orthodox/catechism/fathers" },
      { title: "Philokalia Excerpts", path: "/orthodox/catechism/philokalia" },
      { title: "Holy Mysteries (Sacraments)", path: "/orthodox/catechism" },
      { title: "Jurisdictional Differences", path: "/orthodox/catechism/jurisdictions" },
      { title: "Convert's Guide", path: "/orthodox/catechism/convert-guide" },
    ],
  },
  {
    title: "Saints",
    path: "/orthodox/saints",
    icon: Sparkles,
    subItems: [
      { title: "Lives of the Saints (Synaxarion)", path: "/orthodox/saints/synaxarion" },
      { title: "Saint of the Day", path: "/orthodox/saints/saint-of-the-day" },
      { title: "Name Saint", path: "/orthodox/saints/name-day-lookup" },
      { title: "Patron Saints", path: "/orthodox/saints/patron-saints" },
    ],
  },
  {
    title: "Home Worship",
    path: "/orthodox/home-worship",
    icon: TentTree,
    subItems: [
      { title: "Prayer Corner Setup", path: "/orthodox/home-worship/prayer-corner-setup" },
      { title: "Family Devotions", path: "/orthodox/home-worship/family-devotions" },
      { title: "Fasting Guidelines", path: "/orthodox/home-worship/fasting-guidelines" },
      { title: "Preparing for Confession", path: "/orthodox/home-worship/preparing-for-confession" },
      { title: "Preparing for Communion", path: "/orthodox/home-worship/preparing-for-communion" },
    ],
  },
  {
    title: "Parish Finder",
    path: "/orthodox/parishes",
    icon: MapPinned,
    subItems: [
      { title: "Greek Orthodox", path: "/orthodox/parishes" },
      { title: "Serbian Orthodox", path: "/orthodox/parishes" },
      { title: "Russian Orthodox (ROCOR/OCA/MP)", path: "/orthodox/parishes" },
      { title: "Armenian Apostolic", path: "/orthodox/parishes" },
      { title: "Antiochian Orthodox", path: "/orthodox/parishes" },
    ],
  },
  {
    title: "Philosophy & Faith",
    path: "/orthodox/philosophy",
    icon: Search,
    subItems: [
      { title: "Orthodox Philosophy", path: "/orthodox/philosophy" },
      { title: "Comparative Theology", path: "/orthodox/philosophy" },
      { title: "Modern Critiques", path: "/orthodox/philosophy" },
      { title: "Denominations", path: "/orthodox/philosophy" },
      { title: "Islam", path: "/orthodox/philosophy" },
      { title: "Paganism, Occult & Freemasonry", path: "/orthodox/philosophy" },
      { title: "Bioethics & Society", path: "/orthodox/philosophy" },
      { title: "Conversion Testimonies", path: "/orthodox/philosophy" },
      { title: "Ecumenism & Syncretism", path: "/orthodox/philosophy" },
      { title: "Monasticism", path: "/orthodox/philosophy" },
    ],
  },
  {
    title: "Resources",
    path: "/orthodox/resources",
    icon: Compass,
    subItems: [
      { title: "Recommended Books", path: "/orthodox/resources/books" },
      { title: "Podcasts & Lectures", path: "/orthodox/resources/podcasts" },
      { title: "Monastery Directory", path: "/orthodox/resources/monasteries" },
      { title: "Pilgrimage Sites", path: "/orthodox/resources/pilgrimages" },
      { title: "Downloadable PDFs", path: "/orthodox/resources/pdfs" },
    ],
  },
];

const scriptureQuote = "In the beginning was the Word, and the Word was with God, and the Word was God. - John 1:1";

export const orthodoxContent: Record<string, PageContent> = {
  dashboard: {
    title: "Orthodox Temple",
    subtitle: "Standing in the unbroken life of prayer, sacrament, and holy tradition.",
    paragraphs: [
      "The Orthodox Church preserves the apostolic faith in worship, doctrine, and ascetic life. This space gathers liturgical texts, daily prayers, and sacred teaching in one contemplative setting.",
      "Move through Scripture, calendar, saints, and hymnody as you would walk through the narthex into the nave: slowly, reverently, and with the expectation of encounter.",
    ],
    quote: "O Heavenly King, Comforter, Spirit of Truth, come and abide in us.",
    quoteSource: "Trisagion Prayers",
    items: orthodoxSections.slice(0, 6).map((section) => ({ title: String(section.title), description: String(section.subItems[0].title), path: section.path })),
  },
  scripture: {
    title: "Holy Scripture",
    subtitle: "Septuagint witness and apostolic proclamation in daily prayer.",
    paragraphs: [
      "Orthodox reading of Scripture is ecclesial and liturgical. The Septuagint remains the primary Old Testament source in the Church's hymnography and lectionary life.",
      "Sample reading: John 1:1-18 speaks of the eternal Logos who became flesh, while Psalm 50(51) forms the daily cry of repentance: 'Have mercy on me, O God, according to Thy great mercy.'",
      "The Gospel is interpreted with the Fathers, preserving the mind of the Church in humility and doxology.",
    ],
    quote: scriptureQuote,
    quoteSource: "Divine Liturgy Gospel Reading",
    items: orthodoxSections[0].subItems.map((item) => ({ title: String(item.title), description: "Curated patristic notes and liturgical reading guides.", path: item.path })),
  },
  calendar: {
    title: "Liturgical Calendar",
    subtitle: "Sanctifying time through feasts, fasts, and daily remembrance of saints.",
    paragraphs: [
      "Orthodox calendars differ by jurisdiction and reckoning, yet they are united in rhythm: Pascha as the radiant center, the Twelve Great Feasts, and weekly commemorations.",
      "Fasting seasons train the heart through simplicity and mercy. The cycle of saints teaches us that holiness is lived in every land and century.",
    ],
    items: orthodoxSections[1].subItems.map((item) => ({ title: String(item.title), description: "Current observance notes and concise pastoral guidance.", path: item.path })),
  },
  prayers: {
    title: "Prayer Book",
    subtitle: "The breath of the Church in morning, evening, and ceaseless invocation.",
    paragraphs: [
      "Begin with the Trisagion prayers, continue with psalmody, and end with thanksgiving. A classic Orthodox rule includes morning and evening prayers with the Jesus Prayer throughout the day.",
      "Jesus Prayer: 'Lord Jesus Christ, Son of God, have mercy on me, a sinner.' Pray with attention and repentance, often using a prayer rope.",
    ],
    quote: "Our Father, Who art in heaven, hallowed be Thy name...",
    quoteSource: "The Lord's Prayer",
    items: [
      { title: "Live Prayer", description: "Real-time prayer recommendation based on the current hour." },
      { title: "Evening Prayers", path: "/orthodox/prayers/evening-prayers" },
      { title: "Midnight Office", path: "/orthodox/prayers/midnight-office" },
      { title: "Akathist Hymns", path: "/orthodox/prayers/akathist-hymns" },
      { title: "Jesus Prayer Guide", path: "/orthodox/prayers/jesus-prayer-guide" },
      { title: "Prayers Before Communion", path: "/orthodox/prayers/prayers-before-communion" },
      { title: "Prayer Rope Guide", description: "Interactive guide to using the Chotki or Komboskini for prayer." },
      { title: "Prayers by Jurisdiction: Greek, Slavonic, Serbian, Armenian, Antiochian", description: "Specific jurisdictional variations and traditional prayer rules." },
    ],
  },
  liturgy: {
    title: "Divine Liturgy",
    subtitle: "The Eucharistic ascent of the Church in thanksgiving and glory.",
    paragraphs: [
      "The Divine Liturgy is the heart of Orthodox life, where heaven and earth meet in the celebration of the Holy Eucharist.",
      "The Liturgy of St. John Chrysostom is the ordinary eucharistic service on most Sundays and weekdays, while St. Basil's liturgy appears on appointed great days.",
      "The Presanctified Liturgy marks Great Lent with compunction and solemn beauty, revealing a profoundly ascetical Eucharistic atmosphere.",
    ],
    items: [
      { 
        title: "Liturgy of St. John Chrysostom", 
        description: "The primary Eucharistic service of the Orthodox Church, celebrated on most Sundays.",
        path: "st-john-chrysostom"
      },
      { 
        title: "Liturgy of St. Basil the Great", 
        description: "A majestic and cosmic service used on the Sundays of Great Lent and other specific feasts.",
        path: "st-basil-the-great"
      },
      { 
        title: "Liturgy of St. James", 
        description: "The most ancient liturgy, celebrated on the feast day of the Brother of the Lord.",
        path: "st-james"
      },
      { 
        title: "Presanctified Liturgy", 
        description: "A unique Lenten service for the distribution of previously consecrated Holy Gifts.",
        path: "presanctified"
      },
      { 
        title: "Armenian Badarak", 
        description: "The distinct and soaring liturgical tradition of the Armenian Apostolic Church.",
        path: "armenian-badarak"
      },
      { 
        title: "Liturgical Texts (Original + English)", 
        description: "Bilingual and parallel texts for study and liturgical participation.",
        path: "liturgical-texts"
      },
    ],
  },
  chant: {
    title: "Hymns & Chant",
    subtitle: "The sung theology of the Church across languages and traditions.",
    paragraphs: [
      "Byzantine and Slavic chant systems carry doctrine through melody, preserving scriptural and patristic language in communal memory.",
      "The Octoechos cycle offers eight tones that color weekly worship, inviting attentive listening and active participation.",
    ],
    items: orthodoxSections[4].subItems.map((item) => ({ title: String(item.title), description: "Audio references and short historical notes.", path: item.path })),
  },
  philosophy: {
    title: "Philosophy & Faith",
    subtitle: "Engaging the mind in the light of the Uncreated Grace.",
    paragraphs: [
      "Orthodox philosophy is not a mere intellectual exercise but a path toward understanding the world in relation to its Creator. It bridges the gap between reason and revelation, often surpassing classical philosophy through the experience of Theology.",
      "In this section, we explore the Orthodox engagement with philosophical traditions, modern critiques like Nihilism, and the comparative study of various denominations and faiths.",
    ],
    quote: "Philosophy has been surpassed by Theology, yet it remains a useful tool for those seeking the Truth.",
    quoteSource: "OODE",
    items: [
      { title: "Orthodox Philosophy", description: "The encounter between Hellenic thought and Christian revelation.", path: "/orthodox/philosophy#philosophy" },
      { title: "Comparative Theology", description: "Understanding the differences between Orthodoxy and other Christian traditions.", path: "/orthodox/philosophy#dogmatics-theosis" },
      { title: "Modern Critiques", description: "Addressing Nihilism, Secularism, and the challenges of the modern age.", path: "/orthodox/philosophy#modern-critiques" },
      { title: "Denominations", description: "Detailed studies on Papacy, Protestantism, and other faiths.", path: "/orthodox/philosophy#papacy-protestantism" },
      { title: "Islam", description: "Orthodox responses to Islam and Oriental religions.", path: "/orthodox/philosophy#islam-oriental-religions" },
      { title: "Paganism, Occult & Freemasonry", description: "Analyzing alternative spiritualities and secret societies.", path: "/orthodox/philosophy#paganism-occult-freemasonry" },
      { title: "Bioethics & Society", description: "Orthodox perspectives on medical ethics and social issues.", path: "/orthodox/philosophy#bioethics-society" },
      { title: "Conversion Testimonies", description: "Stories of those who found the Ancient Path.", path: "/orthodox/philosophy#conversion-testimonies" },
      { title: "Ecumenism & Syncretism", description: "The Orthodox stance on inter-faith dialogue.", path: "/orthodox/philosophy#ecumenism-syncretism" },
      { title: "Monasticism", description: "The angelic life as a philosophical pursuit.", path: "/orthodox/philosophy#monasticism" },
    ],
  },
  icons: {
    title: "Iconography",
    subtitle: "Windows into the Kingdom through matter transfigured by grace.",
    paragraphs: [
      "Icons are not merely illustrations but theological testimony to the Incarnation. Because the Word became flesh, sacred image can proclaim the Gospel.",
      "A home icon corner anchors daily prayer and teaches the faith through beauty and reverence.",
    ],
    items: orthodoxSections[5].subItems.map((item) => ({ title: String(item.title), description: "Guides to icon symbolism and devotional use.", path: item.path })),
  },
  "icon-gallery": {
    title: "Icon Gallery",
    subtitle: "A collection of sacred images from the ICONSAINT dataset.",
    paragraphs: [
      "This gallery presents icons of Christ, the Theotokos, and saints from the Orthodox tradition. Each image carries theological meaning and invites veneration.",
      "Icons are written according to ancient canons, using natural materials and time-honored techniques that have been passed down through generations.",
    ],
    quote: "The icon is a window to heaven.",
    quoteSource: "St. John of Damascus",
    items: [
      { title: "Christ Pantocrator", description: "The Almighty Ruler of All, depicted in majesty." },
      { title: "The Theotokos", description: "Icons of the Mother of God in various traditional styles." },
      { title: "Saints of the Church", description: "Martyrs, confessors, and holy ascetics." },
      { title: "Feast Day Icons", description: "Icons depicting the twelve Great Feasts." },
    ],
  },
  "theology-of-icons": {
    title: "Theology of Icons",
    subtitle: "Understanding the spiritual significance of sacred images.",
    paragraphs: [
      "The Seventh Ecumenical Council defended the veneration of icons against iconoclasm, affirming that Christ can be depicted because He became incarnate.",
      "Icons are not worshipped but venerated with relative honor, which passes to the prototype they represent.",
    ],
    quote: "The honor given to the image passes to the prototype.",
    quoteSource: "St. Basil the Great",
    items: [
      { title: "Incarnation and Image", description: "Why the Word becoming flesh makes sacred images possible." },
      { title: "Veneration vs Worship", description: "The theological distinction between latria and proskynesis." },
      { title: "Icon as Scripture", description: "How icons teach theology through color and form." },
      { title: "Council of Nicaea II", description: "The definitive defense of icons in 787 AD." },
    ],
  },
  "iconography-by-tradition": {
    title: "Iconography by Tradition",
    subtitle: "Distinct styles across the Orthodox world.",
    paragraphs: [
      "Different cultures have developed unique iconographic styles while maintaining theological unity. Byzantine, Russian, Greek, and Coptic traditions each contribute to the richness of Orthodox art.",
      "Understanding these traditions helps appreciate the universal yet diverse expression of Orthodox faith.",
    ],
    items: [
      { title: "Byzantine Style", description: "The classical tradition originating in Constantinople." },
      { title: "Russian Style", description: "Distinctive features of Novgorod, Moscow, and St. Petersburg schools." },
      { title: "Greek Style", description: "Cretan and Macedonian traditions of icon writing." },
      { title: "Other Traditions", description: "Serbian, Romanian, Armenian, and Ethiopian iconography." },
    ],
  },
  "miraculous-icons": {
    title: "Miraculous Icons",
    subtitle: "Icons through which God has worked wonders.",
    paragraphs: [
      "Throughout history, certain icons have been associated with miracles, healings, and divine intervention. These wonderworking icons are venerated with special reverence.",
      "The stories of miraculous icons testify to God's continuing presence and power in the world through sacred images.",
    ],
    quote: "The icon is not dead matter, but a living presence.",
    quoteSource: "Orthodox Tradition",
    items: [
      { title: "The Vladimir Icon", description: "One of the most revered icons of the Theotokos." },
      { title: "The Iveron Icon", description: "The Portaitissa, guardian of Mount Athos." },
      { title: "The Pantanassa", description: "Wonderworking icon of the Theotokos." },
      { title: "Other Miraculous Icons", description: "Stories of icons associated with miracles." },
    ],
  },
  "home-icon-corner-guide": {
    title: "Home Icon Corner Guide",
    subtitle: "Creating a sacred space for family prayer.",
    paragraphs: [
      "Every Orthodox home should have a prayer corner with icons as its focal point. This sacred space becomes the heart of domestic spiritual life.",
      "A well-arranged icon corner includes an icon of Christ, the Theotokos, the patron saint of the family, and a vigil lamp or candle.",
    ],
    items: [
      { title: "Essential Icons", description: "Which icons every home should have." },
      { title: "Arrangement", description: "How to organize icons in the prayer corner." },
      { title: "Vigil Lamp", description: "The significance of the eternal flame." },
      { title: "Prayer Practices", description: "Daily prayers before the icons." },
    ],
  },
  catechism: {
    title: "Catechism & Teaching",
    subtitle: "Receiving doctrine as life in Christ, not abstract theory.",
    paragraphs: [
      "Orthodox catechesis joins doctrinal clarity with liturgical participation and ascetical practice. The Fathers are read with prayerful attention.",
      "The Seven Ecumenical Councils defend the confession that Christ is fully God and fully man, and that true worship follows true doctrine.",
    ],
    items: orthodoxSections[6].subItems.map((item) => ({ title: String(item.title), description: "Foundational texts and concise introductions.", path: item.path })),
  },
  saints: {
    title: "Saints",
    subtitle: "A cloud of witnesses from martyrs, monastics, hierarchs, and holy families.",
    paragraphs: [
      "The Synaxarion forms daily memory of sanctity. Saints such as St. Basil the Great, St. Mary of Egypt, and St. Seraphim of Sarov reveal the many paths of repentance and love.",
      "Name day observance roots identity in baptismal vocation and ecclesial belonging.",
    ],
    items: orthodoxSections[7].subItems.map((item) => ({ title: String(item.title), description: "Biographies, prayers, and commemoration notes.", path: item.path })),
  },
  "home-worship": {
    title: "Home Worship",
    subtitle: "Bringing liturgical rhythm into family and domestic life.",
    paragraphs: [
      "A prayer corner with icons, vigil lamp, and Scripture can become the spiritual heart of the home. Begin simply and remain consistent.",
      "Family devotions, fasting disciplines, and preparation for confession and communion cultivate gentleness, patience, and joy.",
    ],
    items: orthodoxSections[8].subItems.map((item) => ({ title: String(item.title), description: "Step-by-step practical guides for faithful households.", path: item.path })),
  },
  parishes: {
    title: "Parish Finder (WIP)",
    subtitle: "Sacramental communities near you — Coming Soon.",
    paragraphs: [
      "The Parish Finder is currently under development. We are working on a comprehensive directory to help you find canonical Orthodox communities and liturgical schedules in your region.",
      "In the meantime, please refer to official jurisdictional websites (GOARCH, OCA, ROCOR, etc.) to find a local parish and connect with a priest.",
    ],
    items: [
      { title: "Jurisdictional Directories", description: "Links to official parish search tools for major Orthodox jurisdictions." },
      { title: "Visit Preparation", description: "Tips for visiting a new parish and speaking with clergy." },
    ],
  },
  resources: {
    title: "Resources",
    subtitle: "A curated library of formation materials to support your spiritual growth.",
    paragraphs: [
      "Our resource library includes trusted books, lectures, and pilgrimage tools selected to align with Holy Tradition.",
      "Explore the categories below to find reliable and soul-profiting content for your journey in the Ancient Path.",
    ],
    items: [
      { title: "Recommended Books", description: "Essential patristic texts, modern spiritual guides, and theological works.", path: "/orthodox/resources/books" },
      { title: "Podcasts & Lectures", description: "Audio series and educational talks from trusted Orthodox voices.", path: "/orthodox/resources/podcasts" },
      { title: "Monastery Directory", description: "Directories of monasteries in North America and international spiritual pillars.", path: "/orthodox/resources/monasteries" },
      { title: "Pilgrimage Sites", description: "Holy sites in the Holy Land, Greece, Europe, and the Americas.", path: "/orthodox/resources/pilgrimages" },
      { title: "Downloadable PDFs", description: "Digital libraries, liturgical texts, and theological papers for offline study.", path: "/orthodox/resources/pdfs" },
    ],
  },
  "resources-books": {
    title: "Recommended Books",
    subtitle: "Essential reading for the Orthodox spiritual life.",
    paragraphs: [
      "This curated list covers patristic fundamentals, modern spirituality, lives of saints, and theological studies. These works have guided countless faithful on the path to the Kingdom.",
    ],
    items: [
      { title: "The Philokalia (Volumes 1-5)", description: "The core text on inner prayer and the practice of hesychasm." },
      { title: "On the Incarnation", description: "St. Athanasius the Great's foundational work on Christology." },
      { title: "The Ladder of Divine Ascent", description: "St. John Climacus's classic guide to the ascetical life." },
      { title: "The Orthodox Way", description: "Metr. Kallistos Ware's beautiful introduction to Orthodox faith." },
      { title: "The Orthodox Church", description: "Metr. Kallistos Ware's comprehensive history and doctrine." },
      { title: "For the Life of the World", description: "Fr. Alexander Schmemann's profound look at the sacraments." },
      { title: "The Didache", description: "The earliest post-biblical Christian writing on the two ways." },
      { title: "Catechetical Talks", description: "Fr. Daniel Sysoev's clear and traditional teachings." },
      { title: "The Law of God", description: "Fr. Daniel Sysoev's comprehensive guide to the faith." },
      { title: "Indication of the Way into the Kingdom of Heaven", description: "St. Innocent of Alaska's simple yet deep guide." },
      { title: "Wounded by Love", description: "The life and wisdom of St. Porphyrios of Kavsokalyvia." },
      { title: "Our Thoughts Determine Our Lives", description: "The profound teachings of Elder Thaddeus of Vitovnica." },
      { title: "Everyday Saints and Other Stories", description: "Metr. Tikhon Shevkunov's best-selling stories of Russian monks." },
      { title: "St. Silouan the Athonite", description: "Archimandrite Sophrony's account of the holy elder's life." },
      { title: "The Mountain of Silence", description: "Kyriacos Markides's journey to the monasteries of Cyprus." },
      { title: "The Way of a Pilgrim", description: "The classic story of a pilgrim practicing the Jesus Prayer." },
      { title: "Spiritual Counsels (Vols 1-5)", description: "The practical and compassionate wisdom of St. Paisios." },
      { title: "The Arena", description: "St. Ignatius Brianchaninov's guide for monastics and laypeople." },
      { title: "Beginning to Pray", description: "Metr. Anthony Bloom's classic introduction to the prayer of the heart." },
      { title: "Way of the Ascetics", description: "Tito Colliander's concise guide to spiritual struggle." },
      { title: "Great Lent", description: "Fr. Alexander Schmemann's explanation of the Lurgical journey." },
      { title: "The Northern Thebaid", description: "Fr. Seraphim Rose's exploration of Russian monasticism." },
      { title: "God's Revelation to the Human Heart", description: "Fr. Seraphim Rose's talk on the search for truth." },
      { title: "The Soul After Death", description: "Fr. Seraphim Rose's study of the afterlife in tradition." },
      { title: "The Apostolic Fathers", description: "Writings of the immediate successors to the Apostles." },
      { title: "Christ the Conqueror of Hell", description: "Metr. Hilarion Alfeyev's study of the Descent into Hades." },
      { title: "Bread & Water, Wine & Oil", description: "Archimandrite Meletios Webber's look at Orthodox psychology." },
      { title: "Thinking Orthodox", description: "Dr. Jeannie Constantinou's guide to the Orthodox phronema." },
      { title: "The Religion of the Apostles", description: "Fr. Stephen De Young's look at the biblical roots of Orthodoxy." },
      { title: "Reflections on the Divine Liturgy", description: "Nikolai Gogol's meditative commentary on the service." },
      { title: "Life of St. Anthony the Great", description: "The foundational life of the first monk by St. Athanasius." },
    ],
  },
  "resources-podcasts": {
    title: "Podcasts & Lectures",
    subtitle: "Audio resources for daily nourishment and deep study.",
    paragraphs: [
      "Listen to homilies, verse-by-verse Bible studies, and discussions on connecting the ancient faith with modern life.",
    ],
    items: [
      { title: "The Arena", description: "Powerful homilies and lectures by Fr. Josiah Trenham." },
      { title: "Lord of Spirits", description: "Deep dives into the biblical world with Fr. Stephen and Fr. Andrew." },
      { title: "Orthodoxy Live", description: "Call-in Q&A sessions with Fr. Evan Armatas." },
      { title: "Daily Orthodox Scriptures", description: "Fr. Alexis Kouri's daily reading of the Bible." },
      { title: "Saint of the Day", description: "Brief accounts of the saints from Ancient Faith Radio." },
      { title: "The Path", description: "Daily Epistle and Gospel readings and reflections." },
      { title: "Speaking the Truth in Love", description: "The late Fr. Thomas Hopko's profound reflections." },
      { title: "The Morning Offering", description: "Daily wisdom from Abbot Tryphon." },
      { title: "A Word from the Holy Mountain", description: "Wisdom translated from the monks of Mt. Athos." },
      { title: "Words of Life", description: "Daily discipleship and spiritual encouragement." },
      { title: "The Orthodox Ethos", description: "Fr. Peter Heers's lectures on the mind of the Church." },
      { title: "Search the Scriptures Live", description: "Interactive Bible study with Dr. Jeannie Constantinou." },
      { title: "Ammos Tenebris", description: "Exploring the desert fathers and early monasticism." },
      { title: "Whole Counsel of God", description: "Verse-by-verse study with Fr. Stephen De Young." },
      { title: "Pop Culture Coffee Hour", description: "Connecting faith and modern media stories." },
      { title: "Global Orthodoxy", description: "Interviews and perspectives from around the world." },
      { title: "Faith Encouraged Live", description: "Fr. Barnabas Powell's call to intentional living." },
      { title: "Our Life in Christ", description: "Two converts discuss their journey and the faith." },
      { title: "The Illumined Heart", description: "Kevin Allen's interviews on spiritual topics." },
      { title: "Paradoxes of the Faith", description: "Classic lectures by Metr. Kallistos Ware." },
      { title: "Fr. Seraphim Rose Archive", description: "Recordings of the beloved American priest and monk." },
      { title: "Metr. Anthony Bloom Archive", description: "Recordings of the visionary bishop and man of prayer." },
      { title: "The Names of Jesus", description: "Fr. Thomas Hopko's series on Christology." },
      { title: "Through a Glass Darkly", description: "Fr. Seraphim Rose's lectures on the modern world." },
      { title: "All Is Well", description: "Fr. Stephen Freeman's reflections on gratitude and grace." },
      { title: "Orthodox Engagement", description: "Engaging modern culture with the mind of the Fathers." },
      { title: "Be Transfigured", description: "Fr. Ted Pisarchuk's encouraging spiritual talks." },
      { title: "Transfigured Through Love", description: "Fr. Anthony Kadloubovsky's pastoral guidance." },
      { title: "The Shorter Catechism", description: "Series based on the work of St. Philaret of Moscow." },
      { title: "Daily Prayer with Holy Cross Monastery", description: "Live streams of liturgical services from West Virginia." },
    ],
  },
  "resources-monasteries": {
    title: "Monastery Directory",
    subtitle: "Sacred spaces for retreat, prayer, and spiritual guidance.",
    paragraphs: [
      "Monasteries are the lungs of the Church. This directory lists significant communities in North America and historical pillars worldwide.",
    ],
    items: [
      { title: "Holy Trinity Monastery (Jordanville, NY)", description: "The spiritual center of ROCOR and a major publishing hub." },
      { title: "St. Anthony's Monastery (Florence, AZ)", description: "The largest of Elder Ephraim's Athonite-style foundations." },
      { title: "Holy Cross Monastery (Wayne, WV)", description: "An English-speaking ROCOR monastery in the Appalachian hills." },
      { title: "St. Tikhon's Monastery (South Canaan, PA)", description: "The oldest Orthodox monastery in North America (OCA)." },
      { title: "St. John of San Francisco (Cobleskill, NY)", description: "A monastic community dedicated to the beloved wonderworker." },
      { title: "St. Paisius Monastery (Safford, AZ)", description: "A women's monastery following the Athonite tradition." },
      { title: "Monastery of the Transfiguration (Ellwood City, PA)", description: "A women's monastery under the OCA." },
      { title: "Dormition of the Mother of God (Rives Junction, MI)", description: "A vibrant women's community with a guest house." },
      { title: "Holy Myrrhbearers Monastery (Otego, NY)", description: "A small and prayerful women's monastery." },
      { title: "All-Merciful Saviour (Vashon Island, WA)", description: "A ROCOR monastery known for its coffee and hospitality." },
      { title: "St. Herman of Alaska (Platina, CA)", description: "Founded by Fr. Seraphim Rose in the remote California wilderness." },
      { title: "New Skete Monasteries (Cambridge, NY)", description: "Known for their dog training and liturgical reforms." },
      { title: "Protection of the Holy Virgin (Lake George, CO)", description: "A remote and beautiful women's monastery." },
      { title: "St. Barbara Monastery (Santa Paula, CA)", description: "A community of nuns in Southern California." },
      { title: "Holy Ascension Monastery (Resaca, GA)", description: "A monastery serving the faithful in the Southeast." },
      { title: "St. Gregory Palamas Monastery (Etna, CA)", description: "A community dedicated to the defense of hesychasm." },
      { title: "All Saints of North America (Dewdney, BC, Canada)", description: "A peaceful community in Western Canada." },
      { title: "Hermitage of the Annunciation (New Glasgow, NS, Canada)", description: "A small hermitage in Eastern Canada." },
      { title: "Simonopetra (Mt. Athos, Greece)", description: "A majestic monastery built on a towering cliff." },
      { title: "Vatopedi (Mt. Athos, Greece)", description: "One of the oldest and largest monasteries on the Holy Mountain." },
      { title: "St. Panteleimon (Mt. Athos, Greece)", description: "The massive Russian monastery on Mt. Athos." },
      { title: "St. Catherine's (Sinai, Egypt)", description: "The site of the Burning Bush and a vast icon collection." },
      { title: "Mar Saba (Judean Desert, Israel)", description: "The cradle of the Church's liturgical tradition." },
      { title: "Kiev Pechersk Lavra (Kyiv, Ukraine)", description: "The famous Monastery of the Caves." },
      { title: "Pochaev Lavra (Ukraine)", description: "A historical bastion of Orthodoxy in Western Ukraine." },
      { title: "Valaam Monastery (Russia)", description: "The 'Athos of the North' on Lake Ladoga." },
      { title: "Optina Pustyn (Russia)", description: "Famous for its lineage of holy elders (startsy)." },
      { title: "St. John the Baptist (Essex, UK)", description: "Founded by Archimandrite Sophrony, a haven of prayer." },
      { title: "Simonos Petras (France dependency)", description: "A dependency of the Athonite monastery in France." },
      { title: "Kovilj Monastery (Serbia)", description: "A vibrant center of liturgical renewal in Serbia." },
      { title: "Putna Monastery (Romania)", description: "The 'Jerusalem of the Romanian People' founded by St. Stephen." },
    ],
  },
  "resources-pilgrimages": {
    title: "Pilgrimage Sites",
    subtitle: "Journeying to the places where God's grace has been revealed.",
    paragraphs: [
      "Pilgrimage is an act of prayer with the whole body. Visit the sites of the biblical narrative and the shrines of the saints.",
    ],
    items: [
      { title: "Church of the Holy Sepulchre (Jerusalem)", description: "The site of the Crucifixion and the Resurrection of Christ." },
      { title: "Church of the Nativity (Bethlehem)", description: "The cave where the Savior was born." },
      { title: "Mount Tabor", description: "The Church of the Transfiguration on the holy mountain." },
      { title: "Garden of Gethsemane", description: "The Church of Mary Magdalene and the place of Christ's agony." },
      { title: "The Jordan River (Qasr el Yahud)", description: "The traditional site of the Baptism of the Lord." },
      { title: "Jacob's Well (Nablus)", description: "Where Christ spoke with the Samaritan woman." },
      { title: "Monastery of the Temptation (Jericho)", description: "The cliffside monastery where Christ fasted forty days." },
      { title: "Mount Athos (Greece)", description: "The self-governing monastic republic of the Holy Mountain." },
      { title: "Meteora (Greece)", description: "The 'Monasteries in the Sky' perched on towering rock pillars." },
      { title: "Areopagus (Mars Hill, Athens)", description: "Where St. Paul preached to the Athenians." },
      { title: "Patmos (Greece)", description: "The Cave of the Apocalypse where St. John received the Revelation." },
      { title: "Aegina (Greece)", description: "The Monastery of St. Nektarios, a place of many healings." },
      { title: "Evia (Greece)", description: "The shrine of St. John the Russian, the incorrupt confessor." },
      { title: "Thessaloniki (Greece)", description: "The Basilica of St. Demetrios, patron of the city." },
      { title: "Solovki Islands (Russia)", description: "A remote northern monastery and place of 20th-century martyrdom." },
      { title: "Diveyevo (Russia)", description: "The monastery founded by St. Seraphim of Sarov." },
      { title: "The Black Church (Romania)", description: "A historical landmark in Brasov." },
      { title: "Rila Monastery (Bulgaria)", description: "The spiritual center of Bulgaria founded by St. John of Rila." },
      { title: "Ostrog Monastery (Montenegro)", description: "The cliffside shrine of St. Basil of Ostrog." },
      { title: "Bari, Italy", description: "The Basilica of St. Nicholas, where his holy relics rest." },
      { title: "Ravenna, Italy", description: "Home to the world's most beautiful Byzantine mosaics." },
      { title: "Mont Saint-Michel (France)", description: "An ancient site of Western Orthodox monasticism." },
      { title: "Lindisfarne (UK)", description: "The 'Holy Island' of St. Cuthbert and northern monasticism." },
      { title: "St. Albans Cathedral (UK)", description: "Site of the first British martyr." },
      { title: "Spruce Island, Alaska", description: "The site of St. Herman's hermitage and his holy grave." },
      { title: "Kodiak, Alaska", description: "The Cathedral where the relics of St. Herman rest." },
      { title: "San Francisco, CA", description: "The Cathedral of St. John Maximovitch, wonderworker of Shanghai." },
      { title: "Springfield, IL", description: "Shrine of St. Elizabeth the New Martyr." },
      { title: "Mexico City", description: "The Cathedral of the Ascension, serving the Orthodox in Mexico." },
      { title: "Iona (Scotland)", description: "The island of St. Columba and Celtic monasticism." },
    ],
  },
  "resources-pdfs": {
    title: "Downloadable PDFs & Resources",
    subtitle: "A digital library for study, prayer, and formation.",
    paragraphs: [
      "Access public domain classics, liturgical texts, and theological papers for your personal study and use.",
    ],
    items: [
      { title: "CCEL (Christian Classics Ethereal Library)", description: "A vast collection of patristic texts in the public domain." },
      { title: "OrthodoxEbooks.org", description: "A dedicated site for free and paid Orthodox digital texts." },
      { title: "Holy Trinity Publications", description: "Offers sample PDFs of high-quality liturgical books." },
      { title: "St. Tikhon's Seminary Library", description: "Online access to theological resources and papers." },
      { title: "Scribd (Orthodox Section)", description: "A community-driven repository of rare texts and studies." },
      { title: "Project Gutenberg", description: "Provides public domain spiritual classics for free." },
      { title: "Monachos.net Archive", description: "A treasure trove of patristic and liturgical studies." },
      { title: "Ancient Faith Store", description: "Occasional free eBook downloads of modern titles." },
      { title: "The Uncut Mountain Press", description: "Digital samplers of monastic and patristic texts." },
      { title: "The Jordanville Prayer Book", description: "Digital versions of the standard English prayer book." },
      { title: "The Akathist Hymn to the Theotokos", description: "PDF text of the classic service of praise." },
      { title: "The Divine Liturgy of St. John Chrysostom", description: "Multi-lingual texts for liturgical participation." },
      { title: "The Lenten Triodion (Select portions)", description: "Key texts for the journey of Great Lent." },
      { title: "The Pentecostarion", description: "Service texts for the period from Pascha to Pentecost." },
      { title: "Daily Lives of Saints", description: "Digital portions of the Prologue of Ohrid." },
      { title: "Psalter according to the Seventy", description: "The Orthodox numbering of the Psalms." },
      { title: "Morning and Evening Prayers", description: "Printable rules from OCA and GOARCH sites." },
      { title: "Service for the Burial of a Layman", description: "The comforting prayers of the Orthodox funeral." },
      { title: "Preparation for Holy Communion", description: "The rule of prayers before the chalice." },
      { title: "The Longer Catechism of St. Philaret", description: "The standard Russian catechism in PDF format." },
      { title: "St. John of Damascus: On the Holy Images", description: "The definitive defense of iconography." },
      { title: "The Decree of the Seventh Ecumenical Council", description: "The official text on the veneration of icons." },
      { title: "Orthodox Wiki", description: "Offers many articles in downloadable and printable formats." },
      { title: "St. Vladimir's Seminary Press", description: "Catalog excerpts and scholarly introductions." },
      { title: "Patristic Nectar Transcripts", description: "PDF transcripts of Fr. Josiah Trenham's lectures." },
      { title: "Pravoslavie.ru", description: "English section PDFs on monasticism and spiritual life." },
      { title: "Orthodox Christian Information Center", description: "A massive database of essays and historical documents." },
      { title: "Agia Sophia Academy", description: "Educational PDFs for children and families." },
      { title: "GOARCH Resource Center", description: "Digital tools and pamphlets from the Greek Archdiocese." },
      { title: "OCA Handbooks", description: "Parish and administrative handbooks in PDF." },
    ],
  },
  "prayer-corner-setup": {
    title: "Prayer Corner Setup",
    subtitle: "Carving out a spiritual sanctuary within the walls of a busy household.",
    paragraphs: [
      "Creating a prayer corner is more than a simple home improvement project; it is the intentional act of carving out a 'spiritual sanctuary' within the walls of a busy household. This topic explores how to designate a specific area—traditionally known as an 'icon corner' or a 'little church'—that serves as a visual and physical anchor for the family’s daily life. It asks the reader to look at their living space not just as a place of rest or entertainment, but as a site of active devotion, providing a roadmap to transform a quiet corner into a dedicated portal for reflection and peace.",
      "The practical guide focuses on the selection of a location that balances accessibility with solemnity. It isn’t enough to just find an empty shelf; the topic delves into how to choose a spot that is prominent enough to remind the household of their values throughout the day, yet secluded enough to offer a reprieve from the noise of televisions or kitchen chores. By clearing this space of secular clutter—like mail, keys, or electronics—the household creates a 'holy threshold' that signals to the mind and body that it is time to transition from worldly stress to a state of spiritual presence.",
      "Beyond the physical location, the topic covers the 'sensory architecture' of the space, including the arrangement of icons, oil lamps, and incense. These elements are not merely decorative; they are tools meant to engage all the senses. The guide explains the hierarchy of placement—positioning central figures of faith at eye level to draw the focus inward—and the use of a 'lampada' (oil lamp) or candle to represent an unextinguished light of hope. This approach turns a static corner into a living, breathing part of the home that requires regular care and attention.",
      "Consistency and stewardship are also major themes of this setup. The guide emphasizes that a prayer corner is a space that must be 'kept,' much like a garden. This involves the daily ritual of lighting the lamp, refreshing any flowers, and keeping the area clean as an expression of reverence. By establishing these small, repeatable actions, the household reinforces the idea that their spiritual life is a continuous thread woven through their daily routine, rather than a separate activity reserved only for specific days of the week.",
      "The Question Everyone Asks: 'Why does it have to face East?' When setting up a prayer corner, almost everyone inevitably asks why the Eastward orientation is so heavily emphasized. The Symbolic Reason: The East is traditionally associated with the 'Dayspring' or the rising sun. Just as the sun chases away the darkness of night, the direction represents the light of truth and the hope of a new beginning. It is a symbolic way for the household to align themselves with the source of light. The Practicality: While the guide encourages an East-facing setup to mirror the architecture of historic churches, it also provides a 'grace clause.' If the layout of an apartment or house makes a true Eastern orientation impossible (for example, if the only available corner faces North or West), the guide clarifies that the intent of the heart and the sincerity of the space are far more important than a compass reading. The goal is to face toward a sense of peace, wherever that may be located in your specific floor plan.",
      "Ultimately, the topic serves as a bridge between abstract belief and tangible practice. It provides a framework that is grounded in tradition but flexible enough for modern living, ensuring that anyone—regardless of the size of their home—can create a dignified space for quietude. By following these steps, a household doesn't just decorate a room; they establish a permanent reminder that even in the midst of a chaotic world, there is always a place to return to for stillness.",
    ],
    items: [
      { 
        title: "The Question Everyone Asks: 'Why does it have to face East?'", 
        description: "The Symbolic Reason: The East is traditionally associated with the 'Dayspring' or the rising sun. Just as the sun chases away the darkness of night, the direction represents the light of truth and the hope of a new beginning. It is a symbolic way for the household to align themselves with the source of light." 
      },
      { 
        title: "The Practicality of Orientation", 
        description: "While the guide encourages an East-facing setup to mirror church architecture, it provides a 'grace clause.' If the layout of your house makes a true Eastern orientation impossible, the intent of the heart and the sincerity of the space are far more important than a compass reading." 
      },
      { 
        title: "Sensory Architecture", 
        description: "Positioning central figures of faith at eye level and using a 'lampada' (oil lamp) or candle to represent an unextinguished light of hope." 
      },
      { 
        title: "A Holy Threshold", 
        description: "Clearing the space of secular clutter—like mail, keys, or electronics—signals to the mind and body that it is time to transition from worldly stress to spiritual presence." 
      }
    ],
  },
  "family-devotions": {
    title: "Family Devotions",
    subtitle: "The heartbeat of a household, acting as a vital bridge between communal worship and private life.",
    paragraphs: [
      "Family devotions are the heartbeat of a household, acting as a vital bridge between communal worship and the private interior life. This topic provides a practical roadmap for transforming a home into a 'domestic church' where faith is lived out in real-time, rather than just discussed on Sundays. It focuses on the intentional gathering of the family to pray, read, and reflect, establishing a collective rhythm that aligns everyone’s focus toward a shared purpose. By carving out this time, a household moves from being a collection of busy individuals to a cohesive spiritual unit grounded in a common tradition.",
      "The guide emphasizes the importance of a structured but flexible routine, moving away from the pressure of 'spontaneous inspiration' which often fails during a stressful work week. Instead, it suggests leaning on established tools—such as a prayer book, a daily reading from a liturgical calendar, or the lives of the saints—to provide a consistent framework. This takes the burden of 'performance' off the parents, allowing the family to step into a pre-existing stream of wisdom. By anchoring these moments to existing habits, like immediately after dinner or right before bed, the ritual becomes as natural and expected as a shared meal.",
      "Engagement across different ages is a primary focus of this roadmap. For households with children, the guide moves away from dry, academic lectures and toward active, tactile participation. This might include a child being responsible for lighting the beeswax candles, a teenager reading a short passage, or everyone joining in a familiar chant or hymn. The goal is to cultivate an environment where faith is 'caught, not taught,' allowing younger members to witness their parents in a state of genuine reverence, which provides a far more powerful witness than words alone.",
      "Creating a sensory-rich environment is essential for keeping the family grounded during these moments. Utilizing the home’s established prayer corner, the guide suggests incorporating physical actions—like standing together, bowing, or using incense—to signal to the brain that this time is 'set apart' from the noise of the day. These physical cues help transition the mind away from digital distractions and into a state of communal presence. It turns the devotion from a mere mental exercise into a holistic experience that involves the body, the eyes, and even the sense of smell.",
      "Finally, the topic addresses the reality of modern fatigue and the inevitable 'off days.' It offers strategies for maintaining consistency without falling into a spirit of legalism or guilt. If the family is exhausted or getting home late, the guide suggests a 'short-form' version—perhaps just a single prayer and a moment of silence—rather than skipping the practice entirely. This approach fosters resilience, teaching that the rhythm of devotion is a safety net to fall into during hard times, rather than a heavy burden to carry.",
      "The Question Everyone Asks: 'How do I handle kids who won't sit still or keep interrupting?' When starting family devotions, 100% of parents will eventually ask this, often out of a sense of frustration or a fear that they are 'failing' at the ritual. The Reason: We often have an idealized, 'picture-perfect' image of devotions where everyone is silent and solemn. In reality, children are sensory learners and have high energy; their movement is a natural part of their development, not necessarily a sign of disrespect. The Practicality: The guide reframes this as an opportunity rather than a distraction. Instead of demanding a 'statue-like' stillness that leads to resentment, it suggests giving restless children a physical task (like holding an icon or a candle) or allowing them to stand or prostrate. By integrating their energy into the prayer rather than fighting against it, the household learns that 'faithful' doesn't have to mean 'perfectly quiet.'",
    ],
    items: [
      { 
        title: "The Question Everyone Asks: 'How do I handle kids who won't sit still?'", 
        description: "Children are sensory learners and have high energy; their movement is a natural part of their development, not necessarily a sign of disrespect. Instead of demanding 'statue-like' stillness, give them physical tasks like holding an icon or a candle." 
      },
      { 
        title: "Integrating Energy", 
        description: "By integrating a child's energy into the prayer rather than fighting against it, the household learns that 'faithful' doesn't have to mean 'perfectly quiet.'" 
      },
      { 
        title: "Caught, Not Taught", 
        description: "Allowing younger members to witness their parents in a state of genuine reverence provides a far more powerful witness than words alone." 
      },
      { 
        title: "Resilience Over Legalism", 
        description: "On 'off days,' a 'short-form' version—perhaps just a single prayer and a moment of silence—is better than skipping the practice entirely, fostering resilience over guilt." 
      }
    ],
  },
  "fasting-guidelines": {
    title: "Fasting Guidelines",
    subtitle: "A spiritual 'reboot' designed to lighten the body so the soul can focus on things above.",
    paragraphs: [
      "Fasting Guidelines: A Practical Path for the Home. Fasting is far more than a restrictive diet; it is a spiritual 'reboot' designed to lighten the body so the soul can focus on things above. This guide provides a roadmap for households to navigate the various fasting seasons, turning the kitchen and the dining table into tools for self-discipline. It moves the focus away from 'what we can’t have' and toward 'why we are doing it,' helping families use physical hunger as a reminder of their spiritual hunger for a more meaningful life.",
      "Practical implementation starts with the household calendar. The guide suggests marking out fasting periods—whether they are the major seasonal fasts or the regular weekly observances—to help the family prepare mentally and logistically. By stocking the pantry with simple, plant-based staples ahead of time, a household removes the stress of 'emergency' meal planning, which often leads to frustration. The goal is to simplify life, reducing the time spent on elaborate cooking so that more time can be dedicated to prayer and acts of kindness.",
      "Engaging children in fasting requires a balance of firmness and gentleness. The guide emphasizes that fasting should never become a source of resentment or 'performative' suffering. Instead, it suggests age-appropriate adjustments, such as giving up a specific favorite treat or a form of entertainment, rather than following a strict adult regimen. This teaches the core lesson of fasting—prioritizing spiritual growth over immediate physical gratification—without overwhelming a child’s developing relationship with their faith.",
      "A successful fasting household also focuses on 'fasting of the tongue' and the eyes. The guide explains that abstaining from certain foods is meaningless if the home remains filled with gossip, arguments, or excessive digital noise. By pairing the physical fast with a 'media fast' or a renewed commitment to kind speech, the household ensures that the external discipline leads to an internal transformation. It turns the fasting period into a time of domestic peace and intentional silence.",
      "The Common Question: 'What if I accidentally eat something I wasn't supposed to?' This is the number one source of anxiety for anyone trying to follow a fast, especially for families with young children or those attending social events. The Reason: We often view fasting as a 'pass/fail' exam where one mistake ruins the entire effort. This creates a spirit of legalism that can lead to giving up entirely after a single slip-up. The Practicality: The guide clarifies that fasting is a marathon, not a sprint. If you accidentally eat something restricted, the advice is simple: don't dwell on it, don't let it become a source of prideful guilt, and simply resume the fast at the very next meal. The focus remains on the effort and the direction of the heart rather than a perfect 'clean sheet' record.",
    ],
    items: [
      { 
        title: "The Common Question: 'What if I accidentally eat something restricted?'", 
        description: "We often view fasting as a 'pass/fail' exam where one mistake ruins the entire effort. This creates a spirit of legalism that can lead to giving up entirely after a single slip-up." 
      },
      { 
        title: "A Marathon, Not a Sprint", 
        description: "If you accidentally eat something restricted, don't dwell on it or let it become a source of prideful guilt. Simply resume the fast at the very next meal. The focus is on the effort and the direction of the heart." 
      },
      { 
        title: "Fasting of the Tongue", 
        description: "Abstaining from food is meaningless if the home remains filled with gossip. External discipline must lead to internal transformation through kind speech and intentional silence." 
      },
      { 
        title: "Simplifying Life", 
        description: "Reducing time spent on elaborate cooking so that more time can be dedicated to prayer and acts of kindness is a core goal of the fast." 
      }
    ],
  },
  "preparing-for-confession": {
    title: "Preparing for Confession",
    subtitle: "A 'spiritual hospital' where we identify and treat the wounds of the soul.",
    paragraphs: [
      "Preparing for Confession: The Spiritual Hospital. Preparing for confession is the act of taking an honest 'inventory' of one’s life in a supportive, healing environment. Rather than a courtroom where one is judged, this topic frames confession as a 'spiritual hospital' where the household learns to identify and treat the wounds caused by mistakes and shortcomings. The guide provides a step-by-step approach to help family members approach this ritual with a sense of relief rather than dread, emphasizing that the goal is the restoration of peace and clarity.",
      "The preparation begins with a quiet examination of conscience. This isn't about wallowing in shame, but about looking at one’s relationships—with family, friends, and the self—and identifying where things have gone off-track. The guide suggests using a list of prompts or a prayer of reflection to help surface things that may have been buried under the busyness of life. By writing these points down, an individual can enter the session with a clear mind, ensuring that the most pressing burdens are addressed.",
      "For a household, preparation also involves reconciliation at home. The guide emphasizes that before one can seek forgiveness in a formal setting, they should first seek it from those they live with. This might mean a parent apologizing to a child for a loss of temper, or siblings resolving a long-standing argument. By making reconciliation a normal, household habit, the formal act of confession becomes a natural extension of a life lived in a state of constant 'turning back' toward what is good.",
      "Finally, the guide covers the 'aftercare' of the experience. It explains that the feeling of lightness following confession should be protected. It suggests a period of quiet reflection or a family meal to celebrate the 'fresh start.' This reinforces the idea that confession is a positive, life-giving tool that helps the family stay spiritually healthy and connected, rather than a heavy or frightening obligation.",
      "The Common Question: 'What if I forget to mention a specific mistake?' Almost everyone approaching confession worries that a forgotten detail will 'invalidate' the process or leave them stuck with the weight of that error. The Reason: This stems from a fear that the ritual is a mechanical process where the 'right words' act as a key, and forgetting one word keeps the door locked. The Practicality: The guide reassures the household that if a mistake was truly forgotten—not intentionally hidden—it is covered by the general sincerity of the act. If you remember it later, you can simply mention it the next time you go. The focus is on the honesty of the current moment, not on a perfect memory of every single past event.",
    ],
    items: [
      { 
        title: "The Question Everyone Asks: 'What if I forget to mention a specific mistake?'", 
        description: "Almost everyone worries that a forgotten detail will 'invalidate' the process. This stems from a fear that the ritual is mechanical, where forgetting one word keeps the door locked." 
      },
      { 
        title: "Sincerity Over Perfection", 
        description: "If a mistake was truly forgotten—not intentionally hidden—it is covered by the general sincerity of the act. You can simply mention it the next time you go. The focus is on the honesty of the current moment." 
      },
      { 
        title: "The Spiritual Hospital", 
        description: "Confession is not a courtroom for judgment, but a healing environment where the soul's wounds are treated to restore peace and clarity." 
      },
      { 
        title: "Home Reconciliation", 
        description: "Before seeking formal forgiveness, practice it at home by apologizing to those you live with, making reconciliation a natural extension of your daily life." 
      }
    ],
  },
  "preparing-for-communion": {
    title: "Preparing for Communion",
    subtitle: "Readying the 'home of the soul' for a significant spiritual encounter.",
    paragraphs: [
      "Preparing for Communion: Welcoming the Guest. Preparing for Communion is the practice of readying the 'home of the soul' for a significant spiritual encounter. This guide treats the approach to the chalice as the focal point of the week, helping the household align their physical and spiritual lives to receive this gift with awareness and awe. It moves beyond the mechanical 'going to church' and provides a roadmap for a deep, intentional preparation that begins days in advance.",
      "Practical preparation involves a 'rhythm of readiness' that includes specific prayers and a physical fast. The guide explains the tradition of the 'Eucharistic Fast'—abstaining from food and drink from a certain point (usually midnight) before receiving—as a way of physically making room for what is spiritual. This isn't meant to be a grueling endurance test but a sensory reminder that the upcoming event is the most important part of the day, taking priority even over our most basic needs.",
      "The guide also emphasizes the 'prayer of the heart' during the days leading up to the service. It suggests reading specific 'Prayers of Preparation' as a family, which help to foster a spirit of humility and gratitude. These prayers act as a bridge, moving the family’s focus from the chores and stresses of the work week toward a state of quiet expectation. By reading them aloud together, the household creates a shared atmosphere of reverence that carries over into the communal worship.",
      "Equally important is the social preparation. The guide notes that one cannot truly participate in a communal ritual while harboring ill will toward a neighbor or family member. It encourages a 'clearing of the air' within the household, ensuring that any lingering tensions are resolved before approaching the service. This ensures that when the family stands together in worship, they do so with a 'clean heart' and a unified spirit, making the experience a true act of community.",
      "The Common Question: 'Am I ever \"good enough\" to participate?' This is the most frequent question asked by those who feel overwhelmed by their own imperfections or a sense of unworthiness. The Reason: It’s easy to feel that we must achieve a state of 'perfection' before we are allowed to participate in such a sacred event. This often leads to people staying away because they feel they haven't 'earned' it. The Practicality: The guide reframes the entire concept: no one is ever truly 'worthy' in a transactional sense. Instead, we approach because we are needy. Just as a sick person doesn't wait to be healthy before going to the doctor, the household is encouraged to see the ritual as a source of strength and healing for the imperfect, rather than a reward for the perfect. The only real requirement is a sincere desire and a heart that is trying to turn toward the light.",
    ],
    items: [
      { 
        title: "The Common Question: 'Am I ever \"good enough\" to participate?'", 
        description: "It’s easy to feel that we must achieve a state of 'perfection' before we are allowed to participate. This often leads to people staying away because they feel they haven't 'earned' it." 
      },
      { 
        title: "Approaching in Need", 
        description: "No one is ever truly 'worthy' in a transactional sense. We approach because we are needy. Just as a sick person goes to the doctor, the chalice is a source of strength for the imperfect." 
      },
      { 
        title: "Eucharistic Fast", 
        description: "Abstaining from food and drink is a sensory reminder that receiving the Guest is the day's highest priority, physically making room for what is spiritual." 
      },
      { 
        title: "Unified Worship", 
        description: "By resolving tensions at home before the service, the family stands in worship with a unified spirit, making the experience a true act of communal love." 
      }
    ],
  },
};

export const topNavLinks = [
  { label: "Home", path: "/", icon: Landmark },
  { label: "Orthodox", path: "/orthodox", icon: Church },
  { label: "Search", path: "/search", icon: Search },
  { label: "Candle", path: "/candle", icon: Sparkles },
];
