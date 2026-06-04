import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "brand": "The Ancient Path",
      "nav": {
        "home": "Home",
        "orthodox": "Orthodox",
        "search": "Search Hub",
        "candle": "Virtual Candle"
      },
      "landing": {
        "tagline": "Sanctuary of the East",
        "title": "The Ancient Path",
        "description": "A Digital Sanctuary for Orthodox Faith",
        "enter_orthodox": "Enter the Orthodox Temple ☦",
        "dialogue_title": "Traditions in Reverent Dialogue",
        "dialogue_desc": "The ancient path keeps a living memory of the apostolic faith while witnessing to Christ in distinct liturgical tones.",
        "orthodox_card_title": "Orthodox Traditions ☦",
        "orthodox_card_desc": "Byzantine, Slavic, and ancient Eastern worship rooted in councils, fathers, and mystical theology.",
        "highlights_title": "Daily Highlight",
        "saint_title": "Today's Saint",
        "scripture_title": "Today's Scripture Reading",
        "fasting_title": "Fasting Information",
        "fasting_desc": "Observe with prayer, almsgiving, and gentleness. Consult your parish calendar for local guidance."
      },
      "orthodox_page": {
        "title": "Orthodox Temple",
        "description": "Enter by the ancient path of prayer, Scripture, liturgy, and the witness of the saints. Explore our complete collection of resources below."
      },
      "sections": {
        "holy_scripture": "Holy Scripture",
        "liturgical_calendar": "Liturgical Calendar",
        "prayer_book": "Prayer Book",
        "divine_liturgy": "Divine Liturgy",
        "hymns_chant": "Hymns & Chant",
        "iconography": "Iconography",
        "catechism_teaching": "Catechism & Teaching",
        "saints": "Saints",
        "home_worship": "Home Worship",
        "parish_finder": "Parish Finder",
        "philosophy_faith": "Philosophy & Faith",
        "resources": "Resources",
        "prayer_library": "Prayer Library",
        "sacred_library": "Sacred Library"
      },
      "dashboard_items": {
        "Old Testament": "Old Testament",
        "New Testament": "New Testament",
        "Orthodox Calendar": "Orthodox Calendar",
        "King James Version (KJV)": "King James Version (KJV)",
        "Daily Scripture Readings": "Daily Scripture Readings",
        "Commandments": "Commandments",
        "Scripture Paths": "Scripture Paths",
        "Curated patristic notes and liturgical reading guides.": "Curated patristic notes and liturgical reading guides.",
        "Holy Services": "Holy Services",
        "About Divine Liturgy": "About Divine Liturgy",
        "Open Liturgy →": "Open Liturgy →",
        "Explore jurisdiction calendars, fasting rhythms, feast cycles, and daily commemorations.": "Explore jurisdiction calendars, fasting rhythms, feast cycles, and daily commemorations.",
        "Open Liturgical Calendar": "Open Liturgical Calendar",
        "Holy Images": "Holy Images",
        "About Orthodox Iconography": "About Orthodox Iconography",
        "Explore →": "Explore →",
        "Browse sacred icons from the ICONSAINT dataset.": "Browse sacred icons from the ICONSAINT dataset.",
        "Understand the spiritual significance and defense of holy images.": "Understand the spiritual significance and defense of holy images.",
        "Explore Byzantine, Russian, Greek, and other regional styles.": "Explore Byzantine, Russian, Greek, and other regional styles.",
        "Stories of wonderworking icons throughout Church history.": "Stories of wonderworking icons throughout Church history.",
        "Practical help for setting up a prayer space in your home.": "Practical help for setting up a prayer space in your home.",
        "Jurisdictional Prayers": "Jurisdictional Prayers",
        "Sacred Library": "Sacred Library",
        "Prayer Library": "Prayer Library",
        "Search for your baptismal name (e.g., Nicholas, Catherine, John)...": "Search for your baptismal name (e.g., Nicholas, Catherine, John)...",
        "Lookup your Patron Saint and Name Day": "Lookup your Patron Saint and Name Day",
        "Found": "Found",
        "matching saints": "matching saints",
        "Start typing to find your patron saint...": "Start typing to find your patron saint...",
        "Patron Saint": "Patron Saint",
        "Search the Synaxarion (e.g., Silouan, Herman, Mary)...": "Search the Synaxarion (e.g., Silouan, Herman, Mary)...",
        "Loading the Synaxarion...": "Loading the Synaxarion...",
        "Previous Day": "Previous Day",
        "Next Day": "Next Day",
        "Lives of the Saints (Synaxarion)": "Lives of the Saints (Synaxarion)",
        "Fetching today's commemoration...": "Fetching today's commemoration...",
        "Today's Feast": "Today's Feast",
        "Detailed stories for today are currently being gathered.": "Detailed stories for today are currently being gathered.",
        "Daily Readings": "Daily Readings",
        "Search patron saints by name or patronage...": "Search patron saints by name or patronage...",
        "All Categories": "All Categories",
        "All Countries": "All Countries",
        "Grid View": "Grid View",
        "World Map": "World Map",
        "Universal": "Universal",
        "Profession": "Profession",
        "Ailment": "Ailment",
        "Nation": "Nation",
        "General": "General",
        "Addiction": "Addiction",
        "Prayer": "Prayer",
        "Healing": "Healing",
        "Select Book": "Select Book",
        "Translation": "Translation",
        "Book": "Book",
        "Chapter": "Chapter",
        "Previous": "Previous",
        "Next": "Next",
        "Greek Orthodox Calendar": "Greek Orthodox Calendar",
        "Serbian Orthodox Calendar": "Serbian Orthodox Calendar",
        "Russian Orthodox Calendar": "Russian Orthodox Calendar",
        "Armenian Apostolic Calendar": "Armenian Apostolic Calendar",
        "Antiochian Orthodox Calendar": "Antiochian Orthodox Calendar",
        "Fasting Calendar": "Fasting Calendar",
        "Feast Days & Saints": "Feast Days & Saints",
        "Pascha Calculator": "Pascha Calculator",
        "Morning Prayers": "Morning Prayers",
        "Evening Prayers": "Evening Prayers",
        "Midnight Office": "Midnight Office",
        "Akathist Hymns": "Akathist Hymns",
        "Jesus Prayer Guide": "Jesus Prayer Guide",
        "Prayers Before Communion": "Prayers Before Communion",
        "Prayer Rope Guide": "Prayer Rope Guide",
        "Prayers by Jurisdiction: Greek, Slavonic, Serbian, Armenian, Antiochian": "Prayers by Jurisdiction: Greek, Slavonic, Serbian, Armenian, Antiochian",
        "Liturgy of St. John Chrysostom": "Liturgy of St. John Chrysostom",
        "Liturgy of St. Basil the Great": "Liturgy of St. Basil the Great",
        "Liturgy of St. James": "Liturgy of St. James",
        "Presanctified Liturgy": "Presanctified Liturgy",
        "Armenian Badarak": "Armenian Badarak",
        "Liturgical Texts (Original + English)": "Liturgical Texts (Original + English)",
        "Explore the rich musical traditions of the Orthodox Church through our curated media libraries.": "Explore the rich musical traditions of the Orthodox Church through our curated media libraries.",
        "Chant Collections": "Chant Collections",
        "Russian Znamenny Chant": "Russian Znamenny Chant",
        "Full curated media library featuring recordings from Mount Athos and other venerable sources.": "Full curated media library featuring recordings from Mount Athos and other venerable sources.",
        "Ancient monophonic \"hook\" notation style preserved by monasteries and Old Believer communities.": "Ancient monophonic \"hook\" notation style preserved by monasteries and Old Believer communities.",
        "Serbian Byzantine chant, the \"warrior\" monastic style, and traditional choral arrangements.": "Serbian Byzantine chant, the \"warrior\" monastic style, and traditional choral arrangements.",
        "Ancient hymns of the Armenian Apostolic Church, including works of Mesrop Mashtots and Komitas.": "Ancient hymns of the Armenian Apostolic Church, including works of Mesrop Mashtots and Komitas.",
        "Liturgical hymns of the Antiochian tradition, featuring mixed Arabic and English arrangements.": "Liturgical hymns of the Antiochian tradition, featuring mixed Arabic and English arrangements.",
        "Ancient and contemporary Byzantine hymns in the Arabic language.": "Ancient and contemporary Byzantine hymns in the Arabic language.",
        "Byzantine Chant": "Byzantine Chant",
        "Znamenny Chant (Russian)": "Znamenny Chant (Russian)",
        "Serbian Chant": "Serbian Chant",
        "Armenian Sharakan": "Armenian Sharakan",
        "Antiochian Orthodox Chant": "Antiochian Orthodox Chant",
        "Arabic Liturgical Hymns": "Arabic Liturgical Hymns",
        "Icon Gallery": "Icon Gallery",
        "Theology of Icons": "Theology of Icons",
        "Iconography by Tradition": "Iconography by Tradition",
        "Miraculous Icons": "Miraculous Icons",
        "Home Icon Corner Guide": "Home Icon Corner Guide",
        "What is Orthodoxy?": "What is Orthodoxy?",
        "Seven Ecumenical Councils": "Seven Ecumenical Councils",
        "Church Fathers Library": "Church Fathers Library",
        "Philokalia Excerpts": "Philokalia Excerpts",
        "Holy Mysteries (Sacraments)": "Holy Mysteries (Sacraments)",
        "Jurisdictional Differences": "Jurisdictional Differences",
        "Convert's Guide": "Convert's Guide",
        "Saint of the Day": "Saint of the Day",
        "Name Saint": "Name Saint",
        "Orthodox Saints": "Orthodox Saints",
        "Select a dedicated saints tab for daily or searchable use.": "Select a dedicated saints tab for daily or searchable use.",
        "Saint Tools": "Saint Tools",
        "Name Day Lookup": "Name Day Lookup",
        "Patron Saints": "Patron Saints",
        "Prayer Corner Setup": "Prayer Corner Setup",
        "Family Devotions": "Family Devotions",
        "Fasting Guidelines": "Fasting Guidelines",
        "Preparing for Confession": "Preparing for Confession",
        "Preparing for Communion": "Preparing for Communion",
        "Greek Orthodox": "Greek Orthodox",
        "Serbian Orthodox": "Serbian Orthodox",
        "Russian Orthodox (ROCOR/OCA/MP)": "Russian Orthodox (ROCOR/OCA/MP)",
        "Armenian Apostolic": "Armenian Apostolic",
        "Antiochian Orthodox": "Antiochian Orthodox",
        "Philosophy & Faith": "Philosophy & Faith",
        "Orthodox Philosophy": "Orthodox Philosophy",
        "Comparative Theology": "Comparative Theology",
        "Modern Critiques": "Modern Critiques",
        "Denominations": "Denominations",
        "Recommended Books": "Recommended Books",
        "Podcasts & Lectures": "Podcasts & Lectures",
        "Monastery Directory": "Monastery Directory",
        "Pilgrimage Sites": "Pilgrimage Sites",
        "Downloadable PDFs": "Downloadable PDFs",
        "Parish Finder": "Parish Finder",
        "explore_resources": "Explore {{item}} resources and articles."
      },
      "sidebar": {
        "system_settings": "System Settings",
        "language": "Language",
        "theme": "Theme",
        "choose_atmosphere": "Choose Atmosphere",
        "open": "Open",
        "kyrie": "Kyrie Eleison"
      },
      "calendar": {
        "view": "Calendar View",
        "jump_to_today": "Jump to Today",
        "local_timezone": "Local timezone: {{timezone}}. Today's date is highlighted automatically.",
        "tip_hover": "Tip: Hover any day cell to preview full commemorations for that date.",
        "namedays": "Namedays:",
        "liturgical_commemorations": "Liturgical Commemorations",
        "close": "Close",
        "fasting_overview": "Fasting Overview",
        "great_feasts": "Great Feasts",
        "fast_name": "Fast Name",
        "civil_dates": "2026 Dates (Civil)",
        "fasting_type": "Fasting Type",
        "national_local_saints": "National and Local Saints",
        "unique_traditions": "Unique Liturgical Traditions",
        "fasting_variations": "Fasting Variations",
        "summary_checklist": "Summary Checklist",
        "no_commemorations": "No specific commemorations listed for this day.",
        "months": {
          "January": "January",
          "February": "February",
          "March": "March",
          "April": "April",
          "May": "May",
          "June": "June",
          "July": "July",
          "August": "August",
          "September": "September",
          "October": "October",
          "November": "November",
          "December": "December"
        },
        "weekdays": {
          "Sun": "Sun",
          "Mon": "Mon",
          "Tue": "Tue",
          "Wed": "Wed",
          "Thu": "Thu",
          "Fri": "Fri",
          "Sat": "Sat"
        },
        "fast_types": {
          "strict_fast": "Strict fast",
          "fast_day": "Fast day / fast season",
          "fish_allowed": "Fish allowed",
          "fast_free": "Fast-free"
        }
      },
      "footer": {
        "about": "About",
        "contact": "Contact",
        "prayer_requests": "Prayer Requests",
        "donate": "Donate",
        "glory": "Built for the Glory of God",
        "copyright": "© {{year}} The Ancient Path"
      },
      "translator": {
        "title": "Global Translation",
        "info": "Translations include Bible verses, full life stories, and all tabs across the entire hub."
      },
      "content": {
        "orthodox": {
          "dashboard": {
            "title": "Orthodox Temple",
            "subtitle": "Standing in the unbroken life of prayer, sacrament, and holy tradition.",
            "p1": "The Orthodox Church preserves the apostolic faith in worship, doctrine, and ascetic life. This space gathers liturgical texts, daily prayers, and sacred teaching in one contemplative setting.",
            "p2": "Move through Scripture, calendar, saints, and hymnody as you would walk through the narthex into the nave: slowly, reverently, and with the expectation of encounter."
          }
        }
      },
      "books": {
        "Genesis": "Genesis",
        "Exodus": "Exodus",
        "Leviticus": "Leviticus",
        "Numbers": "Numbers",
        "Deuteronomy": "Deuteronomy",
        "Joshua (Jesus of Nave)": "Joshua (Jesus of Nave)",
        "Judges": "Judges",
        "Ruth": "Ruth",
        "1 Kingdoms (1 Samuel)": "1 Kingdoms (1 Samuel)",
        "2 Kingdoms (2 Samuel)": "2 Kingdoms (2 Samuel)",
        "3 Kingdoms (1 Kings)": "3 Kingdoms (1 Kings)",
        "4 Kingdoms (2 Kings)": "4 Kingdoms (2 Kings)",
        "1 Paralipomenon (1 Chronicles)": "1 Paralipomenon (1 Chronicles)",
        "2 Paralipomenon (2 Chronicles)": "2 Paralipomenon (2 Chronicles)",
        "1 Esdras (Greek Ezra)": "1 Esdras (Greek Ezra)",
        "2 Esdras (Ezra and Nehemiah)": "2 Esdras (Ezra and Nehemiah)",
        "Tobit": "Tobit",
        "Judith": "Judith",
        "Esther (with Greek additions)": "Esther (with Greek additions)",
        "1 Maccabees": "1 Maccabees",
        "2 Maccabees": "2 Maccabees",
        "3 Maccabees": "3 Maccabees",
        "Psalms (including Psalm 151)": "Psalms (including Psalm 151)",
        "Prayer of Manasseh": "Prayer of Manasseh",
        "Job": "Job",
        "Proverbs": "Proverbs",
        "Ecclesiastes": "Ecclesiastes",
        "Song of Solomon": "Song of Solomon",
        "Wisdom of Solomon": "Wisdom of Solomon",
        "Wisdom of Sirach (Ecclesiasticus)": "Wisdom of Sirach (Ecclesiasticus)",
        "Hosea": "Hosea",
        "Joel": "Joel",
        "Amos": "Amos",
        "Obadiah": "Obadiah",
        "Jonah": "Jonah",
        "Micah": "Micah",
        "Nahum": "Nahum",
        "Habakkuk": "Habakkuk",
        "Zephaniah": "Zephaniah",
        "Haggai": "Haggai",
        "Zechariah": "Zechariah",
        "Malachi": "Malachi",
        "Isaiah": "Isaiah",
        "Jeremiah": "Jeremiah",
        "Baruch": "Baruch",
        "Lamentations": "Lamentations",
        "Letter of Jeremiah": "Letter of Jeremiah",
        "Ezekiel": "Ezekiel",
        "Daniel (with Susanna and Bel and the Dragon)": "Daniel (with Susanna and Bel and the Dragon)",
        "Matthew": "Matthew",
        "Mark": "Mark",
        "Luke": "Luke",
        "John": "John",
        "Acts": "Acts",
        "Romans": "Romans",
        "1 Corinthians": "1 Corinthians",
        "2 Corinthians": "2 Corinthians",
        "Galatians": "Galatians",
        "Ephesians": "Ephesians",
        "Philippians": "Philippians",
        "Colossians": "Colossians",
        "1 Thessalonians": "1 Thessalonians",
        "2 Thessalonians": "2 Thessalonians",
        "1 Timothy": "1 Timothy",
        "2 Timothy": "2 Timothy",
        "Titus": "Titus",
        "Philemon": "Philemon",
        "Hebrews": "Hebrews",
        "James": "James",
        "1 Peter": "1 Peter",
        "2 Peter": "2 Peter",
        "1 John": "1 John",
        "2 John": "2 John",
        "3 John": "3 John",
        "Jude": "Jude",
        "Revelation": "Revelation"
      }
    }
  },
  el: {
    translation: {
      "brand": "Το Αρχαίο Μονοπάτι",
      "nav": {
        "home": "Αρχική",
        "orthodox": "Ορθόδοξα",
        "search": "Αναζήτηση",
        "candle": "Εικονικό Κερί"
      },
      "landing": {
        "tagline": "Καταφύγιο της Ανατολής",
        "title": "Το Αρχαίο Μονοπάτι",
        "description": "Ένα Ψηφιακό Καταφύγιο για την Ορθόδοξη Πίστη",
        "enter_orthodox": "Είσοδος στον Ορθόδοξο Ναό ☦",
        "dialogue_title": "Παραδόσεις σε Ευλαβικό Διάλογο",
        "dialogue_desc": "Το αρχαίο μονοπάτι διατηρεί μια ζωντανή μνήμη της αποστολικής πίστης μαρτυρώντας τον Χριστό με ξεχωριστούς λειτουργικούς τόνους.",
        "orthodox_card_title": "Ορθόδοξες Παραδόσεις ☦",
        "orthodox_card_desc": "Βυζαντινή, σλαβική και αρχαία ανατολική λατρεία ριζωμένη σε συνόδους, πατέρες και μυστική θεολογία.",
        "highlights_title": "Σημερινό Στιγμιότυπο",
        "saint_title": "Ο Άγιος της Ημέρας",
        "scripture_title": "Σημερινό Ανάγνωσμα",
        "fasting_title": "Πληροφορίες Νηστείας",
        "fasting_desc": "Τηρήστε με προσευχή, ελεημοσύνη και πραότητα. Συμβουλευτείτε το ημερολόγιο της ενορίας σας."
      },

      "orthodox_page": {
        "title": "Ορθόδοξος Ναός",
        "description": "Εισέλθετε στο αρχαίο μονοπάτι της προσευχής, της Γραφής, της λειτουργίας και της μαρτυρίας των αγίων."
      },
      "sections": {
        "holy_scripture": "Αγία Γραφή",
        "liturgical_calendar": "Λειτουργικό Ημερολόγιο",
        "prayer_book": "Προσευχητάριο",
        "divine_liturgy": "Θεία Λειτουργία",
        "hymns_chant": "Ύμνοι & Ψαλμωδία",
        "iconography": "Εικονογραφία",
        "catechism_teaching": "Κατήχηση & Διδασκαλία",
        "saints": "Άγιοι",
        "home_worship": "Κατ' οίκον Λατρεία",
        "parish_finder": "Ενορίες",
        "philosophy_faith": "Φιλοσοφία & Πίστη",
        "resources": "Πηγές",
        "prayer_library": "Βιβλιοθήκη Προσευχών",
        "sacred_library": "Ιερή Βιβλιοθήκη"
      },
      "sidebar": {
        "system_settings": "Ρυθμίσεις Συστήματος",
        "language": "Γλώσσα",
        "theme": "Θέμα",
        "choose_atmosphere": "Επιλέξτε Ατμόσφαιρα",
        "open": "Άνοιγμα",
        "kyrie": "Κύριε Ελέησον"
      },
      "content": {
        "orthodox": {
          "dashboard": {
            "title": "Ορθόδοξος Ναός",
            "subtitle": "Στεκόμενοι στην αδιάλειπτη ζωή της προσευχής, των μυστηρίων και της ιεράς παράδοσης.",
            "p1": "Η Ορθόδοξη Εκκλησία διατηρεί την αποστολική πίστη στη λατρεία, το δόγμα και την ασκητική ζωή.",
            "p2": "Περιηγηθείτε στη Γραφή, το ημερολόιο, τους αγίους και την υμνωδία όπως θα περπατούσατε από τον νάρθηκα στον κυρίως ναό."
          }
        }
      }
    }
  },
  ru: {
    translation: {
      "brand": "Древний Путь",
      "nav": {
        "home": "Главная",
        "orthodox": "Православие",
        "search": "Поиск",
        "candle": "Виртуальная свеча"
      },
      "landing": {
        "tagline": "Убежище Востока",
        "title": "Древний Путь",
        "description": "Цифровое убежище для православной веры",
        "enter_orthodox": "Войти в православный храм ☦",
        "dialogue_title": "Традиции в благоговейном диалоге",
        "dialogue_desc": "Древний путь хранит живую память об апостольской вере, свидетельствуя о Христе в различных литургических тонах.",
        "orthodox_card_title": "Православные традиции ☦",
        "orthodox_card_desc": "Византийское, славянское и древневосточное богослужение, уходящее корнями в соборы, отцов и мистическое богословие.",
        "highlights_title": "Главное за день",
        "saint_title": "Святой дня",
        "scripture_title": "Сегодняшнее чтение Писания",
        "fasting_title": "Информация о посте",
        "fasting_desc": "Соблюдайте с молитвой, милостыней и кротостью. Обратитесь к календарю вашего прихода за руководством."
      },
      "orthodox_page": {
        "title": "Православный храм",
        "description": "Вступите на древний путь молитвы, Писания, литургии и свидетельства святых."
      },
      "sections": {
        "holy_scripture": "Священное Писание",
        "liturgical_calendar": "Литургический календарь",
        "prayer_book": "Молитвослов",
        "divine_liturgy": "Божественная литургия",
        "hymns_chant": "Песнопения",
        "iconography": "Иконопись",
        "catechism_teaching": "Катехизис и учение",
        "saints": "Святые",
        "home_worship": "Домашнее богослужение",
        "parish_finder": "Поиск прихода",
        "philosophy_faith": "Философия и вера",
        "resources": "Ресурсы",
        "prayer_library": "Библиотека молитв",
        "sacred_library": "Священная библиотека"
      },
      "sidebar": {
        "system_settings": "Системные настройки",
        "language": "Язык",
        "theme": "Тема",
        "choose_atmosphere": "Выбор атмосферы",
        "open": "Открыть",
        "kyrie": "Господи помилуй"
      },
      "content": {
        "orthodox": {
          "dashboard": {
            "title": "Православный храм",
            "subtitle": "Пребывание в непрерывной жизни молитвы, таинств и святого предания.",
            "p1": "Православная Церковь сохраняет апостольскую веру в богослужении, доктрине и аскетической жизни.",
            "p2": "Пройдите через Писание, календарь, жития святых и песнопения, как если бы вы входили из притвора в храм."
          }
        }
      }
    }
  },
  sr: {
    translation: {
      "brand": "Древни Пут",
      "nav": {
        "home": "Почетна",
        "orthodox": "Православље",
        "search": "Претрага",
        "candle": "Виртуелна свећа"
      },
      "sidebar": {
        "language": "Језик",
        "theme": "Тема",
        "system_settings": "Подешавања"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
