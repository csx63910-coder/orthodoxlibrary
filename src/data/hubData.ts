import { type LocalizedString } from "../utils/cn";
import { orthodoxDailyPrayers } from "./orthodox_daily_prayers";

export type Tradition = "orthodox";

export type SaintEntry = {
  slug: string;
  tradition: "orthodox";
  name: string | LocalizedString;
  title: string | LocalizedString;
  feastDay: string | LocalizedString;
  calendarNote?: string | LocalizedString;
  hymnOrCollect?: string | LocalizedString;
  biography: string[] | LocalizedString[];
  quote?: string | LocalizedString;
  prayers: { label: string | LocalizedString; path: string }[];
  patronage?: string | LocalizedString;
  related: string[];
};

export type PrayerEntry = {
  slug: string;
  tradition: "orthodox";
  title: string | LocalizedString;
  text: string | LocalizedString;
  original?: string;
  language?: string;
  history?: string[] | LocalizedString[];
  when?: string | LocalizedString;
  rubrics?: string | LocalizedString;
  related: string[];
};

export type FeastEntry = {
  slug: string;
  tradition: "orthodox";
  name: string | LocalizedString;
  date: string | LocalizedString;
  traditions: string | LocalizedString;
  readings: string[];
  hymnOrCollect: string | LocalizedString;
  history: string[] | LocalizedString[];
  hymns: string[] | LocalizedString[];
  fasting: string | LocalizedString;
};

export type GlossaryEntry = {
  slug: string;
  term: string | LocalizedString;
  original: string;
  pronunciation: string;
  definition: string | LocalizedString;
  related: string[];
  scripture: { ref: string; path: string; preview: string | LocalizedString }[];
};

export const orthodoxSaints: SaintEntry[] = [
  {
    slug: "john-chrysostom",
    tradition: "orthodox",
    name: { en: "St. John Chrysostom", el: "Άγιος Ιωάννης ο Χρυσόστομος", ru: "Свт. Иоанн Златоуст" },
    title: { en: "Archbishop of Constantinople", el: "Αρχιεπίσκοπος Κωνσταντινουπόλεως", ru: "Архиепископ Константинопольский" },
    feastDay: { en: "13 November", el: "13 Νοεμβρίου", ru: "13 ноября" },
    calendarNote: { en: "Old Calendar: 26 November; New Calendar: 13 November", el: "Παλαιό Ημερολόγιο: 26 Νοεμβρίου", ru: "Старый стиль: 26 ноября" },
    hymnOrCollect: {
      en: "Troparion (Tone 8): Grace shining forth from thy mouth like a beacon has illumined the universe.",
      el: "Απολυτίκιον: Η του στόματός σου καθάπερ πυρσός εκλάμψασα χάρις...",
      ru: "Тропарь: Уст твоих, якоже светлость огня возсиявши благодать..."
    },
    biography: [
      {
        en: "St. John Chrysostom was born in Antioch and became one of the most luminous preachers in Christian history. His ascetical discipline and scriptural depth earned him the title Chrysostom, meaning golden-mouthed.",
        el: "Ο Άγιος Ιωάννης ο Χρυσόστομος γεννήθηκε στην Αντιόχεια και έγινε ένας από τους πιο φωτεινούς κήρυκες της χριστιανικής ιστορίας.",
        ru: "Святитель Иоанн Златоуст родился в Антиохии и стал одним из самых выдающихся проповедников в христианской истории."
      },
      {
        en: "As archbishop he reformed liturgical life, confronted corruption, and defended the poor. His fearless preaching provoked imperial opposition and eventual exile.",
        el: "Ως αρχιεπίσκοπος αναμόρφωσε τη λειτουργική ζωή και υπερασπίστηκε τους φτωχούς.",
        ru: "Будучи архиепископом, он реформировал литургическую жизнь и защищал бедных."
      }
    ],
    quote: { en: "The road to the kingdom is paved with almsgiving.", el: "Η οδός προς τη βασιλεία είναι στρωμένη με ελεημοσύνη.", ru: "Путь в Царство вымощен милостыней." },
    prayers: [
      { label: { en: "Jesus Prayer", el: "Ευχή του Ιησού", ru: "Иисусова молитва" }, path: "/orthodox/prayers/jesus-prayer" },
      { label: { en: "Prayer Before Communion", el: "Προ της Θείας Μεταλήψεως", ru: "Молитва перед Причастием" }, path: "/orthodox/prayers/prayer-before-communion" },
    ],
    patronage: { en: "Preachers, teachers, and those suffering exile for truth", el: "Ιεροκήρυκες, δάσκαλοι", ru: "Проповедники, учители" },
    related: ["basil-the-great", "gregory-the-theologian", "nicholas-of-myra"],
  },
  {
    slug: "basil-the-great",
    tradition: "orthodox",
    name: { en: "St. Basil the Great", el: "Μέγας Βασίλειος", ru: "Василий Великий" },
    title: { en: "Archbishop of Caesarea in Cappadocia", el: "Αρχιεπίσκοπος Καισαρείας Καππαδοκίας", ru: "Архиепископ Кесарии Каппадокийской" },
    feastDay: { en: "1 January", el: "1 Ιανουαρίου", ru: "1 января" },
    calendarNote: { en: "Old Calendar: 14 January; New Calendar: 1 January", el: "Παλαιό Ημερολόγιο: 14 Ιανουαρίου", ru: "Старый стиль: 14 января" },
    hymnOrCollect: {
      en: "Kontakion: Thou hast appeared as a foundation of the Church, granting all men sure dominion.",
      el: "Κοντάκιον: Ὤφθης βάσις ἀκλόνητος τῆς Ἐκκλησίας...",
      ru: "Кондак: Явился еси основание непоколебимое Церкве..."
    },
    biography: [
      {
        en: "St. Basil received a classical education before dedicating his life to monastic discipline, doctrine, and pastoral service.",
        el: "Ο Άγιος Βασίλειος έλαβε κλασική μόρφωση πριν αφιερώσει τη ζωή του στον μοναχισμό.",
        ru: "Святитель Василий получил классическое образование, прежде чем посвятить жизнь монашеству."
      },
      {
        en: "He organized charitable centers for the poor and sick, showing that dogmatic clarity and practical mercy belong together.",
        el: "Οργάνωσε φιλανθρωπικά κέντρα για τους φτωχούς και τους αρρώστους (Βασιλειάδα).",
        ru: "Он организовал благотворительные центры для бедных и больных (Василиада)."
      }
    ],
    quote: { en: "A tree is known by its fruit; a man by his deeds.", el: "Το δέντρο από τον καρπό του γνωρίζεται, ο άνθρωπος από τις πράξεις του.", ru: "Дерево познается по плоду, а человек — по делам его." },
    prayers: [{ label: { en: "Trisagion Prayers", el: "Τρισάγιον", ru: "Трисвятое" }, path: "/orthodox/prayers/trisagion" }],
    patronage: { en: "Monastic communities, hospitals, and theologians", el: "Μοναστήρια, νοσοκομεία", ru: "Монашество, больницы" },
    related: ["john-chrysostom", "gregory-the-theologian"],
  },
  {
    slug: "gregory-the-theologian",
    tradition: "orthodox",
    name: { en: "St. Gregory the Theologian", el: "Άγιος Γρηγόριος ο Θεολόγος", ru: "Григорий Богослов" },
    title: { en: "Archbishop of Constantinople and Theologian", el: "Αρχιεπίσκοπος Κωνσταντινουπόλεως", ru: "Архиепископ Константинопольский" },
    feastDay: { en: "25 January", el: "25 Ιανουαρίου", ru: "25 января" },
    calendarNote: { en: "Old Calendar: 7 February; New Calendar: 25 January", el: "Παλαιό Ημερολόγιο: 7 Φεβρουαρίου", ru: "Старый стиль: 7 февраля" },
    hymnOrCollect: {
      en: "Troparion: O shepherd of Christ's flock and teacher of the Trinity, pray for us.",
      el: "Απολυτίκιον: Ο ποιμενικός αυλός της θεολογίας σου...",
      ru: "Тропарь: Пастырская свирель богословия твоего..."
    },
    biography: [
      {
        en: "Gregory of Nazianzus became one of the Cappadocian Fathers, revered for theological orations on the Trinity.",
        el: "Ο Γρηγόριος ο Ναζιανζηνός έγινε ένας από τους Καππαδόκες Πατέρες.",
        ru: "Григорий Назианзин стал одним из Каппадокийских отцов."
      }
    ],
    quote: { en: "What has not been assumed has not been healed.", el: "Το απρόσληπτον αθεράπευτον.", ru: "Что не воспринято, то не уврачевано." },
    prayers: [{ label: { en: "Symbol of Faith", el: "Πιστεύω", ru: "Символ веры" }, path: "/orthodox/prayers/symbol-of-faith" }],
    patronage: { en: "Theological students and preachers", el: "Θεολόγοι, σπουδαστές", ru: "Богословы, студенты" },
    related: ["basil-the-great", "john-chrysostom"],
  },
  {
    slug: "nicholas-of-myra",
    tradition: "orthodox",
    name: { en: "St. Nicholas of Myra", el: "Άγιος Νικόλαος", ru: "Николай Чудотворец" },
    title: { en: "Wonderworker and Archbishop of Myra", el: "Αρχιεπίσκοπος Μύρων της Λυκίας", ru: "Архиепископ Мир Ликийских" },
    feastDay: { en: "6 December", el: "6 Δεκεμβρίου", ru: "6 декабря" },
    calendarNote: { en: "Old Calendar: 19 December; New Calendar: 6 December", el: "Παλαιό Ημερολόγιο: 19 Δεκεμβρίου", ru: "Старый стиль: 19 декабря" },
    hymnOrCollect: {
      en: "Troparion: In truth you were revealed to your flock as a rule of faith.",
      el: "Απολυτίκιον: Κανόνα πίστεως και εικόνα πραότητος...",
      ru: "Тропарь: Правило веры и образ кротости..."
    },
    biography: [
      {
        en: "St. Nicholas is venerated for pastoral generosity, protection of the innocent, and steadfast confession of Christ.",
        el: "Ο Άγιος Νικόλαος τιμάται για την ποιμαντική του γενναιοδωρία και την προστασία των αθώων.",
        ru: "Святитель Николай почитается за пастырскую щедрость и защиту невинных."
      }
    ],
    quote: { en: "Let us imitate Christ in mercy without delay.", el: "Ας μιμηθούμε τον Χριστό στην ελεημοσύνη χωρίς καθυστέρηση.", ru: "Будем подражать Христу в милосердии без промедления." },
    prayers: [{ label: { en: "Our Father", el: "Πάτερ Ημών", ru: "Отче наш" }, path: "/orthodox/prayers/our-father" }],
    patronage: { en: "Sailors, children, travelers, and the poor", el: "Ναυτικοί, παιδιά, ταξιδιώτες", ru: "Моряки, дети, путешественники" },
    related: ["john-chrysostom", "seraphim-of-sarov"],
  },
  {
    slug: "seraphim-of-sarov",
    tradition: "orthodox",
    name: { en: "St. Seraphim of Sarov", el: "Άγιος Σεραφείμ του Σάρωφ", ru: "Серафим Саровский" },
    title: { en: "Wonderworker of Sarov", el: "Θαυματουργός του Σάρωφ", ru: "Чудотворец Саровский" },
    feastDay: { en: "2 January", el: "2 Ιανουαρίου", ru: "2 января" },
    calendarNote: { en: "Old Calendar: 15 January; New Calendar: 2 January", el: "Παλαιό Ημερολόγιο: 15 Ιανουαρίου", ru: "Старый стиль: 15 января" },
    hymnOrCollect: {
      en: "Kontakion: Leaving behind the vanity of this world, thou didst dwell in Sarov's wilderness.",
      el: "Κοντάκιον: Του κόσμου την τερπνότητα καταλιπών...",
      ru: "Кондак: Мира красоту и яже в нем тленная оставив..."
    },
    biography: [
      {
        en: "St. Seraphim lived as monk, hermit, and spiritual father in Russia, known for radiant joy and deep prayer.",
        el: "Ο Άγιος Σεραφείμ έζησε ως μοναχός και ερημίτης στη Ρωσία.",
        ru: "Преподобный Серафим жил как монах и затворник в России, был известен своей радостью и молитвой."
      }
    ],
    quote: { en: "Acquire the Spirit of peace, and thousands around you will be saved.", el: "Βρες την ειρήνη της ψυχής και χιλιάδες γύρω σου θα σωθούν.", ru: "Стяжи дух мирен, и тысячи вокруг тебя спасутся." },
    prayers: [{ label: { en: "Jesus Prayer", el: "Ευχή του Ιησού", ru: "Иисусова молитва" }, path: "/orthodox/prayers/jesus-prayer" }],
    patronage: { en: "Monastics and seekers of inner prayer", el: "Μοναχοί, αναζητητές της νοεράς προσευχής", ru: "Монашествующие, ищущие внутренней молитвы" },
    related: ["mary-of-egypt", "herman-of-alaska"],
  },
  {
    slug: "sava-of-serbia",
    tradition: "orthodox",
    name: "St. Sava of Serbia",
    title: "First Archbishop of the Serbian Church",
    feastDay: "27 January",
    calendarNote: "Old Calendar: 9 February; New Calendar: 27 January",
    hymnOrCollect: "Troparion: The way that leads to life wast thou, O Father Sava.",
    biography: [
      "St. Sava secured ecclesial stability for the Serbian Church and fostered monastic education.",
      "He balanced mission, diplomacy, and ascetic piety, becoming a national spiritual father.",
      "His typika and pastoral letters shaped liturgical and canonical life in the Balkans.",
    ],
    quote: "Faith is strengthened through prayer, humility, and charity.",
    prayers: [{ label: "Morning Prayers", path: "/orthodox/prayers/morning-prayers" }],
    patronage: "Serbia, schools, and clergy",
    related: ["raphael-of-brooklyn", "john-of-damascus"],
  },
  {
    slug: "gregory-of-narek",
    tradition: "orthodox",
    name: "St. Gregory of Narek",
    title: "Armenian Mystic and Doctor of Prayer",
    feastDay: "27 February",
    calendarNote: "Armenian commemoration with local variations",
    hymnOrCollect: "Prayer of Narek: O Lord, hear my voice from the depths of contrition.",
    biography: [
      "St. Gregory of Narek composed the Book of Lamentations, a monumental prayer text of repentance and hope.",
      "His work became central in Armenian devotion and is prized by both Orthodox and Catholic faithful.",
      "He articulates a theology of mercy where the sinner cries to God with unguarded honesty.",
    ],
    quote: "Remember me, O compassionate One, in the day of your mercy.",
    prayers: [{ label: "Prayer of St. Ephrem", path: "/orthodox/prayers/prayer-of-st-ephrem" }],
    patronage: "Armenian Christians and penitents",
    related: ["mary-of-egypt", "john-of-damascus"],
  },
  {
    slug: "john-of-damascus",
    tradition: "orthodox",
    name: "St. John of Damascus",
    title: "Monk and Defender of Holy Icons",
    feastDay: "4 December",
    calendarNote: "Old Calendar: 17 December; New Calendar: 4 December",
    hymnOrCollect: "Troparion: O champion of Orthodoxy and teacher of godliness, intercede for us.",
    biography: [
      "John served in Damascus before entering monastic life at Mar Saba near Jerusalem.",
      "He defended the veneration of icons during iconoclasm with scriptural and christological arguments.",
      "His hymns for Pascha and funerals continue to shape Orthodox worship.",
    ],
    quote: "I do not worship matter, but I worship the Creator of matter who became matter for my sake.",
    prayers: [{ label: "Akathist to the Theotokos", path: "/orthodox/prayers/akathist-to-theotokos" }],
    patronage: "Iconographers and sacred musicians",
    related: ["gregory-the-theologian", "herman-of-alaska"],
  },
  {
    slug: "mary-of-egypt",
    tradition: "orthodox",
    name: "St. Mary of Egypt",
    title: "Model of Radical Repentance",
    feastDay: "5th Sunday of Great Lent",
    calendarNote: "Commemorated also on 1 April",
    hymnOrCollect: "Kontakion: Having escaped the darkness of sin, thou didst shine with ascetic radiance.",
    biography: [
      "Mary's life moved from profound sin to profound repentance through the intercession of the Theotokos.",
      "She spent decades in the desert, transformed by prayer, fasting, and divine mercy.",
      "Her story is read in Great Lent as a call to return wholly to Christ.",
    ],
    quote: "He who seeks God with tears finds him near.",
    prayers: [{ label: "Psalm 50/51", path: "/orthodox/prayers/psalm-50-51" }],
    patronage: "Penitents and those struggling with addiction",
    related: ["seraphim-of-sarov", "gregory-of-narek"],
  },
  {
    slug: "herman-of-alaska",
    tradition: "orthodox",
    name: "St. Herman of Alaska",
    title: "Wonderworker of All America",
    feastDay: "13 December",
    calendarNote: "Old Calendar: 26 December; New Calendar: 13 December",
    hymnOrCollect: "Troparion: O Blessed Father Herman, pray unto our loving God for the salvation of our souls.",
    biography: [
      "St. Herman arrived in Alaska with missionary monks from Valaam and served native communities with compassion.",
      "He defended the oppressed and offered catechesis rooted in prayer and gentleness.",
      "His life shows Orthodoxy's missionary heart in the New World.",
    ],
    quote: "From this day, this hour, this minute, let us love God above all.",
    prayers: [{ label: "Our Father", path: "/orthodox/prayers/our-father" }],
    patronage: "North America and missionary work",
    related: ["raphael-of-brooklyn", "seraphim-of-sarov"],
  },
  {
    slug: "raphael-of-brooklyn",
    tradition: "orthodox",
    name: "St. Raphael of Brooklyn",
    title: "Bishop and Pastor of Arab Orthodox in America",
    feastDay: "First Saturday of November",
    calendarNote: "North American commemoration",
    hymnOrCollect: "Troparion: Thy proclamation has gone forth throughout North America.",
    biography: [
      "St. Raphael guided immigrant Orthodox communities in America with patient pastoral care.",
      "He established parishes, translated liturgical materials, and defended canonical unity.",
      "His service remains a model of missionary adaptation without compromise of faith.",
    ],
    quote: "Be all things to all men, that all may be saved.",
    prayers: [{ label: "Morning Prayers", path: "/orthodox/prayers/morning-prayers" }],
    patronage: "Orthodox diaspora communities",
    related: ["herman-of-alaska", "sava-of-serbia"],
  },
];

export const basePrayers: PrayerEntry[] = [
  {
    slug: "our-father",
    tradition: "orthodox",
    title: { en: "Our Father", el: "Πάτερ Ημών", ru: "Отче наш" },
    text: {
      en: "Our Father, Who art in heaven, hallowed be Thy Name. Thy Kingdom come. Thy will be done, on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil.",
      el: "Πάτερ ημών ο εν τοις ουρανοίς, αγιασθήτω το όνομά σου. Ελθέτω η βασιλεία σου. Γενηθήτω το θέλημά σου, ως εν ουρανώ, και επί της γης...",
      ru: "Отче наш, Иже еси на небесех! Да святится имя Твое, да приидет Царствие Твое, да будет воля Твоя, яко на небеси и на земли..."
    },
    original: "Pater hemon ho en tois ouranois...",
    language: "Greek",
    history: [
      {
        en: "Given by Christ in the Sermon on the Mount, this prayer forms the heart of Christian devotion in every tradition.",
        el: "Δόθηκε από τον Χριστό στην Επί του Όρους Ομιλία.",
        ru: "Дана Самим Христом в Нагорной проповеди."
      }
    ],
    when: { en: "Daily offices, private prayer, and every Divine Liturgy", el: "Καθημερινά, σε κάθε Θεία Λειτουργία", ru: "Ежедневно, на каждой Литургии" },
    rubrics: { en: "Pray slowly, pausing before 'forgive us' to examine your conscience.", el: "Προσευχηθείτε αργά και με κατάνυξη.", ru: "Молитесь медленно, со вниманием." },
    related: ["jesus-prayer", "trisagion"],
  },
  {
    slug: "jesus-prayer",
    tradition: "orthodox",
    title: { en: "Jesus Prayer", el: "Ευχή του Ιησού", ru: "Иисусова молитва" },
    text: {
      en: "Lord Jesus Christ, Son of God, have mercy on me, a sinner.",
      el: "Κύριε Ιησού Χριστέ, Υιέ του Θεού, ελέησόν με τον αμαρτωλόν.",
      ru: "Господи Иисусе Христе, Сыне Божий, помилуй мя грешнаго."
    },
    original: "Kyrie Iesou Christe, Yie tou Theou, eleison me ton hamartolon.",
    language: "Greek",
    history: [
      {
        en: "Rooted in the cry of the publican and blind men in the Gospels, this invocation is central to hesychast tradition.",
        el: "Ριζωμένη στην κραυγή του τελώνη και των τυφλών στα Ευαγγέλια.",
        ru: "Основана на вопле мытаря и слепцов в Евангелиях."
      }
    ],
    when: { en: "Throughout the day, especially in quiet prayer", el: "Καθ' όλη τη διάρκεια της ημέρας", ru: "В течение всего дня" },
    rubrics: { en: "Coordinate with gentle breathing and attention in the heart, without force.", el: "Συντονίστε με την αναπνοή και την προσοχή στην καρδιά.", ru: "Сочетайте с дыханием и вниманием в сердце." },
    related: ["morning-prayers", "prayer-of-st-ephrem"],
  },
  {
    slug: "trisagion",
    tradition: "orthodox",
    title: { en: "Trisagion Prayers", el: "Τρισάγιος Ύμνος", ru: "Трисвятое" },
    text: {
      en: "Holy God, Holy Mighty, Holy Immortal, have mercy on us. (thrice)",
      el: "Άγιος ο Θεός, Άγιος Ισχυρός, Άγιος Αθάνατος, ελέησον ημάς. (εκ τρίτου)",
      ru: "Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас. (трижды)"
    },
    original: "Agios o Theos, Agios Ischyros, Agios Athanatos, eleison imas.",
    language: "Greek",
    history: [
      {
        en: "The Trisagion has ancient liturgical roots and opens many Orthodox prayer sequences.",
        el: "Ο Τρισάγιος Ύμνος έχει αρχαίες λειτουργικές ρίζες.",
        ru: "Трисвятое имеет древние литургические корни."
      }
    ],
    when: { en: "Morning and evening rule, offices, and private devotions", el: "Πρωινή και βραδινή προσευχή", ru: "Утреннее и вечернее правило" },
    rubrics: { en: "Pray with bows if health permits, maintaining reverence.", el: "Προσευχηθείτε με μετάνοιες.", ru: "Молитесь с поклонами." },
    related: ["our-father", "symbol-of-faith"],
  },
  {
    slug: "prayer-of-st-ephrem",
    tradition: "orthodox",
    title: "Prayer of St. Ephrem",
    text: "O Lord and Master of my life, take from me the spirit of sloth, despair, lust of power, and idle talk...",
    original: "Kyrie kai despota tes zoes mou...",
    language: "Greek",
    history: ["A hallmark prayer of Great Lent, paired with prostrations and repentance."],
    when: "Weekdays of Great Lent",
    rubrics: "Pray with full prostrations after each petition.",
    related: ["psalm-50-51", "jesus-prayer"],
  },
  {
    slug: "prayer-before-communion",
    tradition: "orthodox",
    title: "Prayer Before Communion",
    text: "I believe, O Lord, and I confess that Thou art truly the Christ, the Son of the living God...",
    original: "Pistevo, Kyrie, kai omologo...",
    language: "Greek",
    history: ["Read before receiving the Holy Mysteries in many Orthodox jurisdictions."],
    when: "Before Divine Liturgy communion",
    rubrics: "Fast according to spiritual father and approach with confession and reconciliation.",
    related: ["prayer-after-communion", "our-father"],
  },
  {
    slug: "prayer-after-communion",
    tradition: "orthodox",
    title: "Prayer After Communion",
    text: "We give thanks unto Thee, O Master who lovest mankind, benefactor of our souls...",
    original: "Eucharistoumen soi, despota philanthrope...",
    language: "Greek",
    history: ["A thanksgiving sequence preserving Eucharistic gratitude after reception."],
    when: "Immediately after communion",
    rubrics: "Remain in prayerful silence and thanksgiving.",
    related: ["prayer-before-communion", "symbol-of-faith"],
  },
  {
    slug: "morning-prayers",
    tradition: "orthodox",
    title: "Morning Prayers (Orthodox Rule)",
    text: "Having arisen from sleep, I thank Thee, O Holy Trinity...",
    original: "Ekypheis ek tou hypnou, eucharisto soi...",
    language: "Greek",
    history: ["Orthodox prayer books preserve morning offices shaped by monastic practice."],
    when: "At waking, before beginning daily work",
    rubrics: "Stand before icons and begin with Trisagion prayers.",
    related: ["trisagion", "our-father", "symbol-of-faith", "psalm-50-51", "jesus-prayer"],
  },
  {
    slug: "akathist-to-theotokos",
    tradition: "orthodox",
    title: "Akathist to the Theotokos",
    text: "Rejoice, O Bride unwedded...",
    original: "Chaire, Nymphe anympefte...",
    language: "Greek",
    history: ["A beloved Byzantine hymn celebrating the mystery of the Incarnation."],
    when: "Fridays in Great Lent and Marian devotions",
    rubrics: "Traditionally prayed standing with candles or vigil lamp.",
    related: ["trisagion", "our-father"],
  },
  {
    slug: "psalm-50-51",
    tradition: "orthodox",
    title: "Psalm 50/51",
    text: "Have mercy upon me, O God, according to Thy loving-kindness...",
    original: "Eleeson me, o Theos, kata to mega eleos sou...",
    language: "Greek",
    history: ["The great penitential psalm used daily in Byzantine offices."],
    when: "Daily repentance and pre-communion preparation",
    rubrics: "Pray with compunction and pause at each petition.",
    related: ["prayer-of-st-ephrem", "jesus-prayer"],
  },
  {
    slug: "symbol-of-faith",
    tradition: "orthodox",
    title: "The Symbol of Faith (Nicene Creed)",
    text: "I believe in one God, the Father Almighty...",
    original: "Pisteuo eis ena Theon...",
    language: "Greek",
    history: ["Recited in liturgy and catechesis as the concise confession of apostolic faith."],
    when: "Divine Liturgy and personal catechesis",
    rubrics: "Recite attentively as confession, not mere recital.",
    related: ["our-father", "trisagion"],
  },
];

export const prayers: PrayerEntry[] = [...basePrayers, ...orthodoxDailyPrayers];

export const feasts: FeastEntry[] = [
  {
    slug: "pascha",
    tradition: "orthodox",
    name: "Holy Pascha (Resurrection of Christ)",
    date: "Variable (First Sunday after first full moon of spring)",
    traditions: "All-night vigil, blessing of baskets, 'Christ is Risen!' greeting.",
    readings: ["John 1:1-17", "Acts 1:1-8"],
    hymnOrCollect: "Paschal Troparion: Christ is risen from the dead, trampling down death by death...",
    history: ["The 'Feast of Feasts', celebrating Christ's victory over death and the renewal of creation."],
    hymns: ["The Paschal Canon", "The Angel Cried"],
    fasting: "Fast-free week follows Pascha.",
  },
  {
    slug: "nativity-of-christ",
    tradition: "orthodox",
    name: "Nativity of Our Lord",
    date: "25 December",
    traditions: "Nativity Fast, Royal Hours, Vigil, Liturgy.",
    readings: ["Matthew 2:1-12", "Galatians 4:4-7"],
    hymnOrCollect: "Troparion: Thy Nativity, O Christ our God, has shone to the world the light of knowledge...",
    history: ["Celebrating the Incarnation of the Word for our salvation."],
    hymns: ["Nativity Kontakion", "Many Years"],
    fasting: "Preceded by a 40-day fast.",
  },
  {
    slug: "theophany",
    tradition: "orthodox",
    name: "Theophany (Baptism of Christ)",
    date: "6 January",
    traditions: "Great Blessing of Waters, house blessings, diving for the cross.",
    readings: ["Matthew 3:13-17", "Titus 2:11-14; 3:4-7"],
    hymnOrCollect: "Troparion: When Thou, O Lord, wast baptized in the Jordan...",
    history: ["The manifestation of the Holy Trinity at the baptism of Jesus."],
    hymns: ["As Many as Have Been Baptized"],
    fasting: "Strict fast on the Eve of Theophany.",
  },
];

export const glossaryTerms: GlossaryEntry[] = [
  {
    slug: "icon",
    term: "Icon (Eikon)",
    original: "εἰκών",
    pronunciation: "ee-KOHN",
    definition: "A sacred image, typically painted on wood, used in religious devotion. Icons are considered 'windows into heaven' and are venerated, not worshipped.",
    related: ["iconostasis", "veneration"],
    scripture: [{ ref: "Colossians 1:15", path: "/orthodox/scripture/reader", preview: "He is the image (eikon) of the invisible God." }],
  },
  {
    slug: "liturgy",
    term: "Divine Liturgy",
    original: "θεία λειτουργία",
    pronunciation: "thee-ah lee-toor-YEE-ah",
    definition: "The primary worship service of the Orthodox Church, centered on the Eucharist (Holy Communion).",
    related: ["eucharist", "liturgy-of-st-john-chrysostom"],
    scripture: [{ ref: "Acts 2:42", path: "/orthodox/scripture/reader", preview: "They continued steadfastly in the breaking of bread." }],
  },
  {
    slug: "theotokos",
    term: "Theotokos",
    original: "Θεοτόκος",
    pronunciation: "theh-oh-TOH-kohs",
    definition: "A title of the Virgin Mary, meaning 'God-bearer' or 'Mother of God'. Confirmed at the Council of Ephesus (431).",
    related: ["annunciation", "incarnation"],
    scripture: [{ ref: "Luke 1:43", path: "/orthodox/scripture/reader", preview: "Why is this granted to me, that the mother of my Lord should come to me?" }],
  },
  {
    slug: "fasting",
    term: "Fasting",
    original: "νηστεία",
    pronunciation: "nee-STEE-ah",
    definition: "The practice of abstaining from certain foods and activities for spiritual discipline and preparation.",
    related: ["great-lent", "asceticism"],
    scripture: [{ ref: "Matthew 6:16", path: "/orthodox/scripture/reader", preview: "When you fast, do not be like the hypocrites." }],
  },
];

export const councils = [
  { slug: "nicea-i", name: "First Council of Nicaea (325)", details: "Defended Christ's divinity against Arianism; formulated the first part of the Creed." },
  { slug: "constantinople-i", name: "First Council of Constantinople (381)", details: "Defended the divinity of the Holy Spirit; completed the Nicene-Constantinopolitan Creed." },
];

export const churchFathers = [
  { slug: "athanasius", name: "St. Athanasius the Great", details: "Defender of Orthodoxy against Arianism; author of 'On the Incarnation'." },
  { slug: "basil-the-great", name: "St. Basil the Great", details: "One of the Cappadocian Fathers; author of the Divine Liturgy and monastic rules." },
];

export function prayerByTradition(tradition: Tradition) {
  return prayers.filter((p) => p.tradition === tradition);
}

export function feastByTradition(tradition: Tradition) {
  return feasts.filter((f) => f.tradition === tradition);
}

export function findSaint(slug: string, _tradition: "orthodox") {
  return orthodoxSaints.find((s) => s.slug === slug);
}

export const orthodoxBooks = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Kingdoms", "2 Kingdoms", "3 Kingdoms", "4 Kingdoms"
];

export const orthodoxMysteries = [
  { slug: "baptism", name: "Holy Baptism" },
  { slug: "chrismation", name: "Holy Chrismation" },
  { slug: "eucharist", name: "Holy Eucharist" },
  { slug: "confession", name: "Holy Confession" },
  { slug: "marriage", name: "Holy Matrimony" },
  { slug: "unction", name: "Holy Unction" },
  { slug: "priesthood", name: "Holy Priesthood" },
];
