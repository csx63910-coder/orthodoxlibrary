const fs = require('fs');
const https = require('https');

const items = [
  "Old Testament", "New Testament", "Daily Scripture Readings", "Commandments",
  "Greek Orthodox Calendar", "Serbian Orthodox Calendar", "Russian Orthodox Calendar", "Armenian Apostolic Calendar", "Antiochian Orthodox Calendar", "Fasting Calendar", "Feast Days & Saints", "Pascha Calculator",
  "Morning Prayers", "Evening Prayers", "Midnight Office", "Akathist Hymns", "Jesus Prayer Guide", "Prayers Before Communion", "Prayer Rope Guide", "Prayers by Jurisdiction: Greek, Slavonic, Serbian, Armenian, Antiochian",
  "Liturgy of St. John Chrysostom", "Liturgy of St. Basil the Great", "Liturgy of St. James", "Presanctified Liturgy", "Armenian Badarak", "Liturgical Texts (Original + English)",
  "Byzantine Chant", "Znamenny Chant (Russian)", "Serbian Chant", "Armenian Sharakan", "Antiochian Orthodox Chant", "Arabic Liturgical Hymns",
  "Icon Gallery", "Theology of Icons", "Iconography by Tradition", "Miraculous Icons", "Home Icon Corner Guide",
  "What is Orthodoxy?", "Seven Ecumenical Councils", "Church Fathers Library", "Philokalia Excerpts", "Holy Mysteries (Sacraments)", "Jurisdictional Differences", "Convert's Guide",
  "Lives of the Saints (Synaxarion)", "Saint of the Day", "Name Saint", "Patron Saints",
  "Prayer Corner Setup", "Family Devotions", "Fasting Guidelines", "Preparing for Confession", "Preparing for Communion",
  "Greek Orthodox", "Serbian Orthodox", "Russian Orthodox (ROCOR/OCA/MP)", "Armenian Apostolic", "Antiochian Orthodox",
  "Recommended Books", "Podcasts & Lectures", "Monastery Directory", "Pilgrimage Sites", "Downloadable PDFs",
  "Early Church History", "The Undivided Church (First 1000 Years)", "The Great Schism Explained", "Shared Saints (Pre-1054)", "Ecumenical Councils", "Nicene Creed and Filioque", "Shared Scripture", "Ecumenical Dialogue Today",
  "Explore resources", "Explore {item} resources."
];

async function translateText(text, targetLang) {
  if (!text || text.trim() === '') return text;
  return new Promise((resolve) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json && json[0]) {
            const translated = json[0].map(s => s[0]).join('');
            resolve(translated);
          } else { resolve(text); }
        } catch (e) { resolve(text); }
      });
    }).on('error', () => resolve(text));
  });
}

async function run() {
  const result = {};
  for (const lang of ['el', 'ru']) {
    console.log(`Translating dashboard items to ${lang}...`);
    result[lang] = {};
    for (const item of items) {
      result[lang][item] = await translateText(item, lang);
    }
  }
  fs.writeFileSync('dashboard_translations.json', JSON.stringify(result, null, 2));
}

run();
