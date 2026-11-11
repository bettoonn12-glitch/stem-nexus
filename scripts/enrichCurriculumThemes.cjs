const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/masterQuestions.json');
const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function makeQ(qEn, qId, optionsEn, optionsId, correctIdx, expEn, expId) {
  return {
    qEn,
    qId,
    optionsEn,
    optionsId,
    correctIndex: correctIdx,
    expEn,
    expId
  };
}

const PACKS = {};

// ==========================================
// SD 2 SCIENCE
// ==========================================
PACKS['sd-2::science::Needs of Living Things'] = [
  makeQ("What do all living animals need to drink to stay alive and hydrated?", "Apa yang perlu diminum semua hewan agar tetap hidup dan tidak dehidrasi?",
    ["Clean water", "Salt", "Gasoline", "Colored ink"], ["Air bersih", "Garam", "Minyak bensin", "Tinta warna"], 0,
    "Water is essential for cellular hydration and metabolic functions.", "Air sangat penting untuk melarutkan zat makanan dan menjaga cairan tubuh makhluk hidup."),
  makeQ("What gas in the air do humans and land animals breathe in to survive?", "Gas apakah di udara yang dihirup manusia dan hewan darat untuk bernapas?",
    ["Oxygen", "Helium", "Carbon dioxide only", "Smoke"], ["Oksigen (O2)", "Gas helium", "Hanya karbon dioksida", "Asap knalpot"], 0,
    "Oxygen is required for cellular respiration to produce energy from food.", "Oksigen dihirup masuk ke paru-paru untuk pembakaran sari makanan menjadi energi."),
  makeQ("What do green plants absorb from the soil to nourish their stems and leaves?", "Apa yang diserap tumbuhan hijau dari dalam tanah untuk menyuburkan batang dan daunnya?",
    ["Water and mineral nutrients", "Plastic beads", "Coins", "Glass shards"], ["Air dan unsur hara (mineral)", "Manik-manik plastik", "Uang logam", "Pecahan kaca"], 0,
    "Plant roots take up water and dissolved minerals from fertile soil.", "Akar tumbuhan menyerap air dan zat hara tanah untuk proses pertumbuhan."),
  makeQ("Why do wild animals need shelters such as nests, burrows, and dens?", "Mengapa hewan liar membutuhkan tempat berlindung seperti sarang, liang, atau gua?",
    ["To protect themselves from bad weather and predators", "To play computer games", "To avoid sunlight forever", "To build cities"], ["Melindungi diri dari cuaca buruk dan serangan pemangsa", "Untuk bermain game komputer", "Menghindari matahari selamanya", "Membangun kota"], 0,
    "Shelters provide safety, temperature regulation, and a secure place to raise young.", "Tempat berlindung menjaga keselamatan hewan dan anak-anaknya dari bahaya dan hujan."),
  makeQ("What energy source from space do green plants require to perform photosynthesis?", "Sumber energi dari luar angkasa apakah yang diperlukan tumbuhan hijau untuk berfotosintesis?",
    ["Sunlight", "Starlight only", "Moonlight only", "Street lamp"], ["Sinar matahari", "Hanya cahaya bintang", "Hanya sinar bulan", "Lampu jalan"], 0,
    "Sunlight powers the chlorophyll reaction converting carbon dioxide and water into glucose.", "Cahaya matahari memberi energi bagi klorofil daun untuk memasak makanannya."),
  makeQ("Which living thing creates its own food using sunlight, water, and air?", "Makhluk hidup manakah yang mampu membuat makanannya sendiri dengan bantuan matahari, air, dan udara?",
    ["A green mango tree", "A brown bear", "A lion", "An eagle"], ["Pohon mangga hijau", "Beruang cokelat", "Singa", "Burung elang"], 0,
    "Green plants are autotrophic producers that manufacture food via photosynthesis.", "Tumbuhan hijau adalah produsen yang memasak makanan sendiri melalui fotosintesis."),
  makeQ("What happens to a potted plant if it is kept in a dark cupboard without water for weeks?", "Apa yang terjadi pada tanaman pot jika disimpan di lemari gelap tanpa disiram berminggu-minggu?",
    ["It wilts, turns yellow, and eventually dies", "It grows taller and produces flowers", "It turns into plastic", "It starts singing"], ["Tanaman akan layu, daun menguning, dan akhirnya mati", "Tumbuh makin subur dan berbunga", "Berubah menjadi plastik", "Mulai bernyanyi riang"], 0,
    "Plants deprive of light and water cannot produce energy, leading to cell death.", "Tanpa cahaya dan air, tumbuhan tidak bisa berfotosintesis sehingga layu dan kering."),
  makeQ("What do human bodies need from wholesome meals every day to grow and stay active?", "Apa yang dibutuhkan tubuh manusia dari makanan bergizi setiap hari agar tumbuh dan bertenaga?",
    ["Nutrients, proteins, and vitamins", "Plastic wrappers", "Sand grains", "Ice cream only"], ["Zat gizi, protein, dan vitamin", "Bungkus plastik", "Butiran pasir", "Hanya es krim manis"], 0,
    "Nutritious food supplies calories, proteins for growth, and vitamins for immunity.", "Makanan sehat menyediakan energi untuk beraktivitas dan zat pembangun tubuh."),
  makeQ("Why do polar bears have thick layers of blubber fat and dense fur in the Arctic?", "Mengapa beruang kutub memiliki lapisan lemak tebal dan bulu lebat di Kutub Utara?",
    ["To retain body heat in freezing sub-zero weather", "To help them swim backwards", "To attract bees", "To make them look funny"], ["Memerangkap panas tubuh agar tidak kedinginan di cuaca beku", "Membantu berenang mundur", "Menarik perhatian lebah", "Agar terlihat lucu"], 0,
    "Thick blubber and dense fur serve as insulation against Arctic cold.", "Lapisan lemak tebal di bawah kulit berfungsi sebagai isolator penahan dingin alami."),
  makeQ("All living things can reproduce, which means they can:", "Semua makhluk hidup dapat berkembang biak, yang berarti mereka dapat:",
    ["Produce offspring (babies or seeds) of their own kind", "Stop breathing forever", "Turn into stones", "Dissolve in water"], ["Menghasilkan keturunan (anak atau biji) serupa jenisnya", "Berhenti bernapas selamanya", "Berubah menjadi batu keras", "Larut di dalam air"], 0,
    "Reproduction ensures the continuity of living species from one generation to the next.", "Berkembang biak bertujuan melestarikan keturunan agar jenis makhluk hidup tidak punah.")
];

PACKS['sd-2::science::Animal Life Cycles'] = [
  makeQ("What is the first stage of a frog's life cycle after eggs are laid in water?", "Apakah tahapan pertama dalam daur hidup katak setelah telur menetas di dalam air?",
    ["A tadpole (kecebong)", "An adult frog", "A flying frog", "A caterpillar"], ["Kecebong (berudu)", "Katak dewasa berkaki", "Katak terbang", "Ulat bulu"], 0,
    "Frog eggs hatch in ponds into aquatic tadpoles with gills and swimming tails.", "Telur katak menetas menjadi berudu berekor yang bernapas dengan insang di air."),
  makeQ("What does a butterfly caterpillar form around itself before transforming into a winged butterfly?", "Benda apakah yang dibentuk oleh ulat sebelum berubah menjadi kupu-kupu bersayap?",
    ["A chrysalis (pupa / cocoon)", "A bird nest", "A mud burrow", "A spider web"], ["Kepompong (krisalis / pupa)", "Sarang burung ranting", "Liang tanah", "Jaring laba-laba"], 0,
    "During the pupal stage inside a chrysalis, tissues reorganize into an adult butterfly.", "Di dalam kepompong, ulat mengalami metamorfosis menjadi kupu-kupu dewasa yang indah."),
  makeQ("Which animal hatches directly from an egg laid in a warm chicken coop?", "Hewan manakah yang menetas langsung dari telur yang dierami di kandang ayam?",
    ["A chick (baby chicken)", "A puppy", "A kitten", "A calf"], ["Anak ayam (chick)", "Anak anjing", "Anak kucing", "Anak sapi"], 0,
    "Hens incubate eggs until baby chicks peck through the shell to hatch.", "Induk ayam mengerami telurnya selama 21 hari hingga menetas menjadi anak ayam."),
  makeQ("What is the complete series of growth stages an animal undergoes from birth to adulthood called?", "Rangkaian seluruh tahapan perubahan bentuk dan pertumbuhan hewan sejak lahir hingga dewasa disebut:",
    ["A life cycle", "A weather forecast", "A computer clock", "A food recipe"], ["Daur hidup (Life cycle)", "Prakiraan cuaca", "Jam komputer digital", "Resep makanan"], 0,
    "A life cycle describes development from egg or birth through reproductive maturity.", "Daur hidup adalah siklus tahapan pertumbuhan makhluk hidup dari awal hingga dewasa."),
  makeQ("How do mammals such as cats, dogs, and horses give birth to their young?", "Bagaimana cara mamalia seperti kucing, anjing, dan kuda melahirkan anak-anaknya?",
    ["They give birth to live babies and nurse them with milk", "They lay soft eggs in lakes", "They plant seeds in dirt", "They hatch from cocoons"], ["Melahirkan anak hidup dan menyusuinya dengan susu induk", "Bertelur di dalam danau", "Menanam biji di tanah", "Menetas dari kepompong"], 0,
    "Mammals are viviparous; mothers carry embryos internally and produce milk for infants.", "Mamalia melahirkan anaknya (vivipar) dan memiliki kelenjar susu untuk menyusui."),
  makeQ("What hatches out of a tiny butterfly egg laid underneath a green leaf?", "Makhluk apakah yang menetas dari sebutir telur kecil kupu-kupu di bawah daun?",
    ["A caterpillar (larva)", "A winged moth", "A dragonfly", "A grasshopper"], ["Ulat (larva)", "Ngengat bersayap besar", "Capung jarum", "Belalang sembah"], 0,
    "Butterfly eggs hatch into larvae known as caterpillars that voraciously feed on leaves.", "Telur kupu-kupu menetas menjadi larva atau ulat pemakan daun tumbuhan."),
  makeQ("What changes occur as a tadpole grows into an adult frog?", "Perubahan apa saja yang dialami kecebong saat tumbuh menjadi katak dewasa?",
    ["It develops back legs, then front legs, absorbs its tail, and develops lungs", "It grows wings and feathers", "It turns into a fish", "It becomes smaller than an egg"], ["Tumbuh kaki belakang, lalu kaki depan, ekor menyusut, dan tumbuh paru-paru", "Tumbuh sayap berbulu", "Berubah menjadi ikan mas", "Mengecil lebih kecil dari telur"], 0,
    "Metamorphosis transforms an aquatic gill-breathing tadpole into a land-adapted frog.", "Metamorfosis mengubah kecebong air menjadi katak berkaki empat yang bernapas dengan paru-paru dan kulit."),
  makeQ("Which of these animals lays eggs in underground sandy nests on sea beaches?", "Manakah dari hewan berikut yang mengubur telurnya di sarang pasir pantai?",
    ["A sea turtle", "A blue whale", "A sea lion", "A polar bear"], ["Penyu laut", "Paus biru", "Singa laut", "Beruang kutub"], 0,
    "Female sea turtles crawl onto beaches to dig nests in sand and lay clutches of eggs.", "Penyu laut betina naik ke pantai berpasir untuk menggali lubang dan bertelur."),
  makeQ("Which young baby animal looks almost identical to its adult parents, just much smaller?", "Anak hewan manakah yang bentuk tubuhnya sudah sangat mirip dengan induknya sejak lahir?",
    ["A puppy (baby dog)", "A butterfly larva", "A frog tadpole", "A mosquito wriggler"], ["Anak anjing (puppy)", "Ulat kupu-kupu", "Kecebong katak", "Jentik nyamuk"], 0,
    "Dogs undergo direct development without radical metamorphosis, resembling adults.", "Anjing tidak mengalami metamorfosis; anak anjing lahir dengan bentuk tubuh seperti induknya."),
  makeQ("What provides food and nutrition to an unhatched bird chick inside its eggshell?", "Apa yang menyediakan makanan dan nutrisi bagi calon anak burung di dalam cangkang telur?",
    ["The egg yolk and albumen", "Leaves from trees", "Insects brought by parents", "Rainwater"], ["Kuning telur dan putih telur (albumen)", "Dedaunan dari pohon", "Serangga tangkapan induk", "Air hujan yang meresap"], 0,
    "The yolk sack stores rich proteins, fats, and water to sustain embryonic development.", "Kuning telur mengandung cadangan makanan bergizi untuk perkembangan janin burung.")
];

PACKS['sd-2::science::States and Changes of Matter'] = [
  makeQ("What are the three common physical states of matter found on Earth?", "Apakah tiga wujud materi yang paling umum dijumpai di Bumi?",
    ["Solid, liquid, and gas", "Fire, dust, and light", "Wood, plastic, and glass", "Hot, cold, and warm"], ["Padat, cair, dan gas", "Api, debu, dan cahaya", "Kayu, plastik, dan kaca", "Panas, dingin, dan hangat"], 0,
    "Matter predominantly exists in three physical phases: solid, liquid, or gaseous states.", "Tiga wujud zat yang utama adalah zat padat, zat cair, dan gas."),
  makeQ("Which state of matter has a fixed, definite shape and keeps its volume?", "Wujud materi manakah yang memiliki bentuk tetap dan tidak berubah mengikuti wadahnya?",
    ["A solid (such as a wooden block)", "A liquid (water)", "A gas (air)", "Smoke"], ["Zat padat (seperti balok kayu)", "Zat cair (air minum)", "Zat gas (udara)", "Asap"], 0,
    "Solids maintain a rigid crystalline or molecular structure with fixed shape and volume.", "Zat padat memiliki partikel yang rapat sehingga bentuk dan volumenya selalu tetap."),
  makeQ("Which state of matter flows freely and takes the exact shape of whatever container holds it?", "Wujud zat manakah yang mengalir bebas dan bentuknya mengikuti bentuk wadah yang menampungnya?",
    ["A liquid", "A solid rock", "A wooden desk", "An iron coin"], ["Zat cair", "Batu padat", "Meja kayu", "Koin logam besi"], 0,
    "Liquids possess a definite volume but deform to take the shape of their container.", "Zat cair memiliki volume tetap, namun bentuknya berubah-ubah sesuai wadahnya."),
  makeQ("What invisible state of matter expands to fill the entire space of a room or balloon?", "Wujud zat apakah yang menyebar memenuhi seluruh ruangan atau mengisi balon udara?",
    ["A gas (such as air)", "A solid brick", "Liquid water", "A ceramic bowl"], ["Zat gas (seperti udara)", "Bata padat", "Air cair", "Mangkuk keramik"], 0,
    "Gas particles have weak intermolecular forces, expanding to fill available volumes.", "Partikel gas bergerak sangat bebas dan renggang sehingga mengisi seluruh volume wadah."),
  makeQ("What process occurs when solid butter is heated gently in a warm frying pan?", "Proses apakah yang terjadi saat mentega padat dipanaskan di atas wajan penggorengan?",
    ["It melts into liquid oil", "It freezes into rock", "It turns into dry wood", "It vanishes into stone"], ["Meleleh (mencair) menjadi cairan mentega", "Membeku menjadi batu", "Berubah menjadi kayu kering", "Menjadi batu"], 0,
    "Melting occurs when added thermal energy breaks solid bonds into a liquid state.", "Pemanasan mentega menyebabkan perubahan wujud dari padat menjadi cair (mencair)."),
  makeQ("What happens when liquid water is placed inside a freezing cold freezer compartment?", "Apa yang terjadi saat air minum cair dimasukkan ke dalam ruang pembeku (freezer) yang sangat dingin?",
    ["It freezes into solid ice", "It boils into steam", "It catches fire", "It turns into fruit juice"], ["Membeku menjadi es batu padat", "Mendidih menjadi uap panas", "Terbakar mengeluarkan api", "Berubah jadi jus buah"], 0,
    "Freezing removes thermal energy, turning liquid water into solid ice crystals at 0°C.", "Pendinginan di bawah 0°C menyebabkan air cair melepaskan kalor dan membeku menjadi es."),
  makeQ("When a pot of water boils on a stove, what is the rising vapor steam called?", "Saat air di panci mendidih di atas kompor, uap panas yang membubung ke atas disebut zat berwujud:",
    ["Water vapor (gas)", "Solid ice blocks", "Cold syrup", "Frozen rocks"], ["Uap air (gas)", "Balok es padat", "Sirup dingin", "Batu beku"], 0,
    "Evaporation and boiling convert liquid water into gaseous water vapor.", "Penguapan saat air mendidih mengubah wujud air dari cair menjadi gas (uap air)."),
  makeQ("What process causes tiny water droplets to form on the outside of a cold glass of soda?", "Proses apakah yang menyebabkan terbentuknya tetes-tetes embun di dinding luar gelas es yang dingin?",
    ["Condensation (gas turning into liquid)", "Freezing", "Melting", "Burning"], ["Kondensasi / Pengembunan (gas menjadi cair)", "Pembekuan", "Peleburan", "Pembakaran"], 0,
    "Moist air cooling against the chilled glass condenses from vapor into liquid droplets.", "Uap air di udara sekitar yang menyentuh permukaan gelas dingin melepaskan panas dan mengembun."),
  makeQ("Which of these everyday objects is a clear example of a solid?", "Benda sehari-hari manakah di bawah ini yang merupakan contoh nyata zat padat?",
    ["A plastic pencil case", "Orange juice", "Cooking oil", "Oxygen gas"], ["Kotak pensil plastik", "Jus jeruk segar", "Minyak goreng", "Gas oksigen"], 0,
    "A pencil case maintains its own rigid shape without requiring a holding container.", "Kotak pensil memiliki bentuk kaku dan padat yang tidak berubah saat dipindahkan."),
  makeQ("When clothes hang wet on a sunny clothesline, where does the water go as they dry?", "Ketika pakaian basah dijemur di bawah terik matahari, ke manakah perginya air saat baju mengering?",
    ["It evaporates into invisible water vapor in the air", "It sinks underground", "It turns into salt", "It transforms into thread"], ["Menguap menjadi uap air yang tak kasat mata di udara", "Meresap ke inti bumi", "Berubah menjadi butiran garam", "Berubah menjadi benang baju"], 0,
    "Solar heat provides energy for water molecules to evaporate into the atmosphere.", "Panas matahari mempercepat penguapan partikel air dari serat kain ke udara bebas.")
];

PACKS['sd-2::science::Earth, the Sun, and Weather'] = [
  makeQ("Which star is at the center of our solar system and warms the planet Earth?", "Bintang apakah yang berada di pusat tata surya kita dan menghangatkan planet Bumi?",
    ["The Sun", "The North Star (Polaris)", "Sirius", "Betelgeuse"], ["Matahari", "Bintang Utara (Polaris)", "Bintang Sirius", "Bintang Betelgeuse"], 0,
    "The Sun is our closest star, generating abundant light and heat energy.", "Matahari adalah bintang terdekat yang memancarkan panas dan cahaya penopang kehidupan Bumi."),
  makeQ("What causes day and night to alternate every 24 hours on Earth?", "Apa yang menyebabkan pergantian siang dan malam setiap 24 jam di Bumi?",
    ["The rotation of Earth spinning on its axis", "Clouds covering the sun", "The Sun turning on and off", "The ocean waves"], ["Bumi berputar pada porosnya (rotasi Bumi)", "Awan menutupi matahari", "Matahari menyala dan mati", "Gelombang ombak laut"], 0,
    "As Earth rotates eastwards, the side facing the Sun experiences day while the opposite side is in night.", "Rotasi Bumi mengakibatkan bagian yang menghadap matahari mengalami siang dan sebaliknya malam."),
  makeQ("In which general compass direction does the Sun appear to rise every morning?", "Di arah mata angin manakah matahari tampak terbit setiap pagi hari?",
    ["The East", "The West", "The North", "The South"], ["Timur", "Barat", "Utara", "Selatan"], 0,
    "Due to Earth's counter-clockwise rotation, the Sun appears to rise in the eastern horizon.", "Karena Bumi berputar dari barat ke timur, matahari selalu tampak terbit dari sebelah timur."),
  makeQ("In which direction does the Sun set in the evening as daylight fades?", "Di arah mata angin manakah matahari terbenam saat senja tiba?",
    ["The West", "The East", "The North", "The South"], ["Barat", "Timur", "Utara", "Selatan"], 0,
    "The Sun sets in the western horizon as that region turns away from the Sun.", "Matahari terbenam di ufuk barat saat bagian Bumi mulai berputar membelakangi matahari."),
  makeQ("What weather instrument is used to measure how hot or cold the outdoor air is?", "Alat pengukur cuaca apakah yang digunakan untuk mengukur seberapa panas atau dinginnya suhu udara?",
    ["A thermometer", "A wind chime", "A rain barrel", "A looking glass"], ["Termometer", "Lonceng angin", "Tong penampung air", "Kaca pembesar"], 0,
    "A thermometer measures thermal temperature in degrees Celsius or Fahrenheit.", "Termometer mengukur derajat suhu udara dalam satuan derajat Celsius."),
  makeQ("What happens to your shadow at noon when the Sun is directly overhead?", "Apa yang terjadi pada bayangan tubuhmu saat tengah hari ketika matahari tepat berada di atas kepala?",
    ["The shadow becomes very short right beneath your feet", "The shadow stretches 50 meters long", "The shadow flies in the sky", "The shadow disappears forever"], ["Bayangan menjadi sangat pendek tepat di bawah telapak kaki", "Bayangan memanjang 50 meter", "Bayangan melayang ke langit", "Bayangan hilang selamanya"], 0,
    "When sunlight strikes from straight above, shadows cast minimal horizontal length.", "Matahari tepat di atas kepala menghasilkan bayangan tegak terpendek tepat di bawah tubuh."),
  makeQ("What do we call fluffy white masses of tiny water droplets floating high in the sky?", "Gumpalan putih lembut mirip kapas yang melayang tinggi di langit dan terbentuk dari titik air disebut:",
    ["Clouds", "Smoke plumes", "Cotton fields", "Fog blankets"], ["Awan", "Kepulan asap pabrik", "Ladang kapas", "Selimut debu"], 0,
    "Clouds form when rising water vapor cools and condenses into suspended droplets.", "Awan terbentuk dari uap air yang naik lalu mengembun menjadi butiran air di ketinggian."),
  makeQ("What causes shadows to form on the ground during a sunny day?", "Apa yang menyebabkan terbentuknya bayangan hitam di tanah pada siang hari yang cerah?",
    ["An opaque object blocks sunlight from passing through", "Light creates darkness", "The ground burns", "Wind pushes light away"], ["Benda padat yang tidak tembus cahaya menghalangi jalannya sinar matahari", "Cahaya menciptakan kegelapan", "Tanah terbakar", "Angin meniup cahaya"], 0,
    "Light travels in straight lines; when an opaque body obstructs rays, a shadow is cast behind it.", "Cahaya merambat lurus sehingga ketika terhalang benda padat akan membentuk daerah gelap (bayangan)."),
  makeQ("Which weather condition is characterized by air full of moisture and reduced visibility near the ground?", "Kondisi cuaca apakah yang ditandai dengan kabut tebal dekat tanah sehingga jarak pandang berkurang?",
    ["Fog or mist", "Bright sunshine", "Dry drought", "Clear blue sky"], ["Kabut (fog / mist)", "Terik matahari cerah", "Kemarau gersang", "Langit biru bersih"], 0,
    "Fog is simply a low cloud formed when air temperature near ground drops to dew point.", "Kabut adalah uap air yang mengembun dekat permukaan tanah sehingga membatasi jarak pandang."),
  makeQ("How does rain benefit farmers and agriculture?", "Bagaimana hujan memberikan manfaat besar bagi para petani dan tanaman perkebunan?",
    ["It waters crops, replenishes groundwater, and nourishes plants", "It makes fields dry like sand", "It burns leaves", "It stops plants from growing"], ["Mengairi sawah, mengisi air tanah, dan memberi minum tanaman", "Membuat tanah kering tandus", "Membakar dedaunan", "Menghentikan pertumbuhan tumbuhan"], 0,
    "Rainfall provides freshwater essential for crop irrigation and vegetation health.", "Air hujan adalah sumber irigasi alami yang menyuburkan tanaman pangan di sawah.")
];

console.log("Writing SD 2 science packs...");

// Iterate through PACKS and assign into questions
for (const [key, pack] of Object.entries(PACKS)) {
  const [gradeLevel, subject, theme] = key.split('::');
  const matched = questions.filter(q => q.gradeLevel === gradeLevel && q.subject === subject && q.theme === theme);
  if (matched.length > 0) {
    matched.forEach((q, idx) => {
      if (pack[idx]) {
        const item = pack[idx];
        q.question = item.qEn;
        q.questionText = item.qEn;
        q.questionIdText = item.qId;
        q.options = [...item.optionsEn];
        q.optionsId = [...item.optionsId];
        q.correctIndex = item.correctIndex;
        q.answerLetter = ['A', 'B', 'C', 'D'][item.correctIndex];
        q.correctAnswer = item.optionsEn[item.correctIndex];
        q.correctAnswerId = item.optionsId[item.correctIndex];
        q.explanation = item.expEn;
        q.explanationId = item.expId;
      }
    });
  }
}

fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), 'utf8');
console.log("SD 2 science updated.");
