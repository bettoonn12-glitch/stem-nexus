const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/masterQuestions.json');
const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Helper to construct a question entry
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

const CURATED_PACKS = {};

// ==========================================
// SD 1 SCIENCE
// ==========================================
CURATED_PACKS['sd-1::science::Body Parts and the Five Senses'] = [
  makeQ("Which body part helps us hear sounds and music?", "Bagian tubuh manakah yang membantu kita mendengar suara dan musik?",
    ["The ears", "The nose", "The eyes", "The tongue"], ["Telinga", "Hidung", "Mata", "Lidah"], 0,
    "The ears detect sound vibrations from the surrounding environment.", "Telinga mendeteksi getaran suara dari lingkungan sekitar."),
  makeQ("Which sense organ do we use to see colors, shapes, and light?", "Indra manakah yang kita gunakan untuk melihat warna, bentuk, dan cahaya?",
    ["The eyes", "The hands", "The ears", "The mouth"], ["Mata", "Tangan", "Telinga", "Mulut"], 0,
    "The eyes capture light to allow visual perception of our surroundings.", "Mata menangkap cahaya sehingga kita dapat melihat benda di sekitar kita."),
  makeQ("Which body part helps us smell flowers and food?", "Bagian tubuh manakah yang membantu kita mencium aroma bunga dan makanan?",
    ["The nose", "The eyes", "The ears", "The chin"], ["Hidung", "Mata", "Telinga", "Dagu"], 0,
    "The nose has olfactory receptors that detect scents in the air.", "Hidung memiliki reseptor penciuman yang mendeteksi aroma di udara."),
  makeQ("Which sense organ helps us taste sweet, sour, and salty flavors?", "Organ indra manakah yang membantu kita mengecap rasa manis, asam, dan asin?",
    ["The tongue", "The teeth", "The lips", "The throat"], ["Lidah", "Gigi", "Bibir", "Tenggorokan"], 0,
    "The tongue has taste buds that identify different flavors.", "Lidah memiliki kuncup pengecap yang membedakan aneka rasa makanan."),
  makeQ("Which part of our body allows us to feel if something is hot, cold, soft, or rough?", "Bagian tubuh manakah yang merasakan panas, dingin, lembut, atau kasar?",
    ["The skin", "The hair", "The bones", "The nails"], ["Kulit", "Rambut", "Tulang", "Kuku"], 0,
    "The skin contains nerve endings that sense touch, texture, and temperature.", "Kulit mengandung ujung saraf peraba yang mendeteksi sentuhan dan suhu."),
  makeQ("How many primary senses do humans have?", "Berapa banyak panca indra utama yang dimiliki manusia?",
    ["Five senses", "Three senses", "Ten senses", "Two senses"], ["Lima indra (Panca indra)", "Tiga indra", "Sepuluh indra", "Dua indra"], 0,
    "Humans have 5 main senses: sight, hearing, smell, taste, and touch.", "Manusia memiliki 5 indra utama: penglihatan, pendengaran, penciuman, pengecapan, dan peraba."),
  makeQ("Which body part bends in the middle of our leg to help us walk?", "Bagian tubuh manakah di tengah kaki yang dapat ditekuk untuk membantu kita berjalan?",
    ["The knee", "The elbow", "The wrist", "The shoulder"], ["Lutut", "Siku", "Pergelangan tangan", "Bahu"], 0,
    "The knee is the hinge joint in the leg that allows walking and bending.", "Lutut adalah sendi engsel pada kaki yang memungkinkan kita melangkah dan menekuk kaki."),
  makeQ("Which hard structure protects the brain inside our head?", "Struktur keras manakah yang melindungi otak di dalam kepala kita?",
    ["The skull (head bone)", "The ribs", "The spine", "The collarbone"], ["Tengkorak", "Tulang rusuk", "Tulang belakang", "Tulang selangka"], 0,
    "The skull is the bony cranium that protects the delicate brain.", "Tengkorak adalah tulang keras yang melindungi otak dari benturan."),
  makeQ("What should you use to clean your hands before eating?", "Apa yang sebaiknya kamu gunakan untuk mencuci tangan sebelum makan?",
    ["Soap and clean water", "Dry paper only", "Sand", "Cold oil"], ["Sabun dan air bersih mengalir", "Hanya kertas kering", "Pasir", "Minyak dingin"], 0,
    "Washing hands with soap and water removes harmful germs.", "Mencuci tangan dengan sabun dan air mengalir membersihkan kuman penyebab penyakit."),
  makeQ("Which sense helps you identify an alarm clock ringing in the morning?", "Indra manakah yang membantu kita mengenali bunyi jam weker di pagi hari?",
    ["Hearing (ears)", "Smell (nose)", "Taste (tongue)", "Touch (skin)"], ["Pendengaran (telinga)", "Penciuman (hidung)", "Pengecapan (lidah)", "Peraba (kulit)"], 0,
    "Our ears hear the sound of the alarm ringing.", "Telinga kita menangkap gelombang suara alarm yang berdering.")
];

CURATED_PACKS['sd-1::science::Animals and Plants'] = [
  makeQ("Which of these animals can fly through the air using wings?", "Manakah dari hewan berikut yang dapat terbang di udara menggunakan sayap?",
    ["A sparrow (bird)", "An elephant", "A goldfish", "A turtle"], ["Burung gereja", "Gajah", "Ikan mas", "Kura-kura"], 0,
    "Birds have feathered wings adapted for flying in the air.", "Burung memiliki sayap berbulu yang dirancang untuk terbang di udara."),
  makeQ("What do green plants need from the sky to make food and grow healthy?", "Apa yang dibutuhkan tumbuhan hijau dari langit untuk membuat makanan dan tumbuh subur?",
    ["Sunlight", "Darkness", "Colored paint", "Smoke"], ["Cahaya matahari", "Kegelapan", "Cat warna", "Asap"], 0,
    "Plants use sunlight for photosynthesis to produce their food.", "Tumbuhan memerlukan sinar matahari untuk fotosintesis agar menghasilkan energi makanan."),
  makeQ("Which part of a plant grows underground and absorbs water from the soil?", "Bagian tumbuhan manakah yang tumbuh di dalam tanah dan menyerap air?",
    ["The roots", "The flowers", "The leaves", "The fruit"], ["Akar", "Bunga", "Daun", "Buah"], 0,
    "Roots anchor the plant into soil and absorb moisture and nutrients.", "Akar menancap di tanah untuk menyerap air dan zat hara bagi tumbuhan."),
  makeQ("Which animal lives on a farm, eats grass, and provides fresh milk?", "Hewan manakah yang hidup di peternakan, makan rumput, dan menghasilkan susu segar?",
    ["A cow", "A tiger", "An eagle", "A dolphin"], ["Sapi", "Harimau", "Elang", "Lumba-lumba"], 0,
    "Cows are domesticated herbivores that produce milk for food.", "Sapi adalah hewan herbivora penghasil susu yang banyak dipelihara di peternakan."),
  makeQ("What part of a large tree holds up the branches and green leaves?", "Bagian pohon manakah yang menopang dahan dan daun-daun hijau tinggi di udara?",
    ["The trunk (stem)", "The petals", "The seeds", "The thorns"], ["Batang pohon", "Kelopak bunga", "Biji", "Duri"], 0,
    "The woody trunk provides strong support and transports water upwards.", "Batang pohon yang kokoh menopang ranting dan mengalirkan air ke daun."),
  makeQ("What organ do fish use to breathe underwater in an aquarium or ocean?", "Organ apakah yang digunakan ikan untuk bernapas di dalam air?",
    ["Gills", "Lungs", "Wings", "Beaks"], ["Insang", "Paru-paru", "Sayap", "Paruh"], 0,
    "Fish use gills to absorb dissolved oxygen directly from water.", "Ikan bernapas menggunakan insang untuk menyerap oksigen terlarut dalam air."),
  makeQ("Which animal starts its life swimming as a tiny tadpole?", "Hewan manakah yang memulai hidupnya berenang sebagai kecebong kecil di air?",
    ["A frog", "A rabbit", "A dog", "A butterfly"], ["Katak", "Kelinci", "Anjing", "Kupu-kupu"], 0,
    "Frogs hatch from eggs in water as tadpoles before growing legs into adult frogs.", "Katak menetas dari telur menjadi kecebong sebelum bermetamorfosis menjadi katak dewasa."),
  makeQ("Which colorful part of a plant attracts honeybees and butterflies?", "Bagian tumbuhan yang berwarna-warni dan menarik perhatian lebah serta kupu-kupu adalah:",
    ["The flower", "The root", "The bark", "The thorn"], ["Bunga", "Akar", "Kulit kayu", "Duri"], 0,
    "Colorful flower petals and sweet nectar attract pollinators.", "Mahkota bunga yang cerah dan nektar menarik serangga untuk membantu penyerbukan."),
  makeQ("Animals that eat only grass, leaves, and fruits are called:", "Hewan pemakan tumbuhan seperti rumput dan buah-buahan disebut hewan:",
    ["Herbivores", "Carnivores", "Predators", "Fish"], ["Herbivora", "Karnivora", "Predator pemangsa", "Ikan laut"], 0,
    "Herbivores are plant-eating animals such as rabbits, cows, and deer.", "Herbivora adalah hewan yang makanannya berasal dari tumbuh-tumbuhan."),
  makeQ("Which farm animal lays eggs inside a cozy nest?", "Hewan ternak manakah yang bertelur di dalam sarang yang hangat?",
    ["A chicken (hen)", "A horse", "A sheep", "A goat"], ["Ayam", "Kuda", "Domba", "Kambing"], 0,
    "Chickens and birds lay hard-shelled eggs in nests.", "Ayam dan unggas berkembang biak dengan cara bertelur di sarangnya.")
];

CURATED_PACKS['sd-1::science::Weather and the Environment'] = [
  makeQ("What falls from clouds to the ground on a rainy day?", "Apa yang jatuh dari awan ke tanah saat hari hujan?",
    ["Water drops (rain)", "Sand stones", "Leaves", "Paper"], ["Tetesan air (hujan)", "Batu pasir", "Daun-daun", "Kertas"], 0,
    "Rain occurs when condensed water droplets in clouds become heavy and fall.", "Hujan terjadi saat uap air yang mengembun di awan menjadi berat lalu jatuh ke bumi."),
  makeQ("Which bright celestial object warms the Earth and gives us daylight?", "Benda langit cerah manakah yang menghangatkan Bumi dan memberi cahaya di siang hari?",
    ["The Sun", "The Moon", "Comets", "Asteroids"], ["Matahari", "Bulan", "Komet", "Asteroid"], 0,
    "The Sun is the star that provides light and thermal energy to Earth.", "Matahari memancarkan cahaya dan panas yang membuat siang hari terang dan hangat."),
  makeQ("What is gentle or strong moving air around us called?", "Udara yang bergerak lembut atau berhembus kencang di sekitar kita disebut:",
    ["Wind", "Water", "Soil", "Flame"], ["Angin", "Air", "Tanah", "Api"], 0,
    "Wind is the horizontal movement of air across the atmosphere.", "Angin adalah udara yang bergerak dari tempat bertekanan tinggi ke rendah."),
  makeQ("What should you carry above your head when walking outside in heavy rain?", "Benda apa yang kamu bawa di atas kepala agar tidak basah saat berjalan di bawah hujan?",
    ["An umbrella", "A book", "A blanket", "A pillow"], ["Payung", "Buku tulis", "Selimut tidur", "Bantal"], 0,
    "An umbrella has a waterproof canopy to shield you from falling rain.", "Payung terbuat dari bahan kedap air untuk melindungi tubuh dari tetesan hujan."),
  makeQ("What colorful arch can sometimes appear in the sky after rain when the sun shines?", "Lengkungan warna-warni apakah yang kadang muncul di langit setelah hujan saat matahari bersinar?",
    ["A rainbow", "A black cloud", "A comet", "A storm"], ["Pelangi", "Awan mendung hitam", "Komet", "Badai angin"], 0,
    "A rainbow forms when sunlight is refracted and reflected by raindrops.", "Pelangi terbentuk dari pembiasan sinar matahari oleh butiran tetes air hujan."),
  makeQ("Where is the proper place to dispose of empty plastic bottles and snack wrappers?", "Di manakah tempat yang tepat untuk membuang botol plastik dan bungkus makanan ringan?",
    ["In the trash bin (garbage can)", "On the sidewalk", "In the river", "On the floor"], ["Di tempat sampah", "Di trotoar jalan", "Ke dalam sungai", "Di lantai kamar"], 0,
    "Putting waste into trash bins keeps our surroundings clean and prevents clogging.", "Membuang sampah pada tempatnya menjaga kebersihan lingkungan dan mencegah banjir."),
  makeQ("Why is keeping river water and air clean important for us?", "Mengapa menjaga kebersihan air sungai dan udara sangat penting bagi kita?",
    ["To keep living things healthy and safe", "To make it dark", "To waste money", "To make noise"], ["Agar makhluk hidup tetap sehat dan nyaman", "Agar lingkungan jadi gelap", "Untuk buang-buang uang", "Agar berisik"], 0,
    "Clean air and water prevent illness and protect wildlife habitats.", "Udara dan air yang bersih menjauhkan kita dari penyakit dan menjaga kelestarian alam."),
  makeQ("What type of weather brings dark clouds, heavy rain, lightning, and loud thunder?", "Cuaca jenis apakah yang membawa awan gelap tebal, kilatan petir, dan suara guruh menggelegar?",
    ["A thunderstorm", "A sunny calm day", "A foggy morning", "A starry night"], ["Badai petir (hujan badai)", "Hari cerah tanpa awan", "Pagi berkabut tipis", "Malam bertabur bintang"], 0,
    "Thunderstorms produce rain, electrical lightning discharges, and thunder claps.", "Hujan badai disertai kilatan petir dan gemuruh guntur yang keras di langit."),
  makeQ("How does planting trees and flowers help the environment?", "Bagaimana menanam pohon dan bunga membantu kelestarian lingkungan?",
    ["They produce clean oxygen and provide shade", "They create litter", "They make water disappear", "They heat up the road"], ["Menghasilkan oksigen segar dan memberi keteduhan", "Membuat banyak sampah", "Menghilangkan air tanah", "Membuat jalanan panas"], 0,
    "Trees absorb carbon dioxide and release fresh oxygen into the air.", "Pohon menyerap karbon dioksida dan melepaskan oksigen segar untuk kita hirup."),
  makeQ("On a hot sunny afternoon, what should you drink plenty of to stay refreshed?", "Pada siang hari yang panas terik, apa yang perlu banyak kita minum agar tidak dehidrasi?",
    ["Clean drinking water", "Hot oil", "Salty seawater", "Paint"], ["Air putih bersih", "Minyak goreng panas", "Air laut asin", "Cairan cat"], 0,
    "Drinking water keeps our bodies properly hydrated when it is hot outside.", "Minum air putih menjaga cairan tubuh tetap seimbang saat cuaca panas.")
];

CURATED_PACKS['sd-1::science::Objects and Their Properties'] = [
  makeQ("Which of these items feels soft, light, and fluffy when you touch it?", "Benda manakah yang terasa lembut, ringan, dan empuk saat disentuh?",
    ["A cotton pillow", "A stone pebble", "An iron wrench", "A glass cup"], ["Bantal kapas lembut", "Batu kerikil", "Kunci pas besi", "Gelas kaca"], 0,
    "Cotton fibers make pillows cushiony and gentle to the touch.", "Serat kapas bersifat lembut dan empuk sehingga nyaman digunakan untuk tidur."),
  makeQ("Which material is clear and transparent so we can see outside through windows?", "Bahan manakah yang bening dan tembus pandang sehingga kita bisa melihat keluar jendela?",
    ["Glass", "Clay", "Wood board", "Iron sheet"], ["Kaca", "Tanah liat", "Papan kayu", "Lempeng besi"], 0,
    "Glass allows light rays to pass directly through it without obstruction.", "Kaca bersifat transparan sehingga cahaya dapat menembusnya dengan bebas."),
  makeQ("Which material is hard, solid, and used to build sturdy house walls?", "Bahan keras dan padat manakah yang biasa dipakai untuk menyusun dinding rumah kokoh?",
    ["Bricks and stones", "Wet paper", "Cotton wool", "Foam sponges"], ["Bata dan batu", "Kertas basah", "Gumpalan kapas", "Busa spons"], 0,
    "Fired bricks and stones possess great compressive strength.", "Bata dan batu memiliki kekuatan tekan tinggi sehingga mampu menopang bangunan."),
  makeQ("Which flexible object can stretch long when pulled and snaps back to shape?", "Benda elastis manakah yang memanjang saat ditarik dan kembali ke bentuk semula?",
    ["A rubber band", "A dry twig", "A ceramic plate", "A glass bottle"], ["Karet gelang", "Ranting kayu kering", "Piring keramik", "Botol kaca"], 0,
    "Rubber is an elastic polymer that stretches and returns to original dimensions.", "Karet bersifat elastis sehingga dapat meregang tanpa mudah putus."),
  makeQ("Which object will float on the surface of water in a bathtub?", "Benda manakah yang akan mengapung di permukaan air bak mandi?",
    ["A yellow plastic toy duck", "A heavy steel coin", "A solid stone", "An iron nail"], ["Bebek mainan plastik", "Koin logam berat", "Batu padat", "Paku besi"], 0,
    "Hollow plastic ducks have lower average density than water, so they float.", "Benda plastik berongga memiliki massa jenis lebih kecil dari air sehingga mengapung."),
  makeQ("Which object will sink straight to the bottom when dropped into water?", "Benda manakah yang langsung tenggelam ke dasar saat dijatuhkan ke air?",
    ["A heavy iron nail", "A dry leaf", "A cork stopper", "A plastic ping-pong ball"], ["Paku besi berat", "Daun kering", "Tutup gabus", "Bola pingpong plastik"], 0,
    "Iron is dense and much heavier than the water it displaces, causing it to sink.", "Besi memiliki massa jenis lebih besar dari air sehingga langsung tenggelam."),
  makeQ("Which metal object is easily attracted by a strong magnet?", "Benda logam manakah yang dengan mudah menempel saat didekatkan ke magnet?",
    ["A steel paperclip", "A wooden stick", "A plastic ruler", "A cotton string"], ["Klip kertas baja/besi", "Batang kayu", "Penggaris plastik", "Tali benang kapas"], 0,
    "Steel and iron are ferromagnetic materials pulled strongly by magnetic fields.", "Baja dan besi adalah logam feromagnetik yang ditarik kuat oleh kutub magnet."),
  makeQ("Which waterproof material is used to make rainboots to keep feet dry?", "Bahan kedap air manakah yang dipakai membuat sepatu bot agar kaki tidak basah?",
    ["Waterproof rubber", "Paper towel", "Woven fabric", "Cardboard"], ["Karet kedap air", "Tisu kertas", "Kain tenun berpori", "Kardus karton"], 0,
    "Rubber does not absorb moisture, keeping water completely out.", "Karet bersifat kedap air dan tidak menyerap cairan sehingga melindungi kaki dari basah."),
  makeQ("What happens to a solid ice cube when it is left in warm sunshine?", "Apa yang terjadi pada balok es batu padat saat diletakkan di bawah terik matahari?",
    ["It melts into liquid water", "It turns into wood", "It catches fire", "It becomes heavier"], ["Mencair menjadi air", "Berubah menjadi kayu", "Terbakar membara", "Menjadi bertambah berat"], 0,
    "Thermal energy causes ice to absorb heat and melt from solid to liquid water.", "Panas matahari menaikkan suhu es sehingga es melebur atau mencair menjadi air."),
  makeQ("Which surface feels rough and scratchy when you run your fingers across it?", "Permukaan manakah yang terasa kasar dan berpasir saat diraba dengan jari tangan?",
    ["Coarse sandpaper", "Smooth silk cloth", "Polished mirror", "Wet ice block"], ["Kertas amplas kasar", "Kain sutra halus", "Kaca cermin licin", "Permukaan es basah"], 0,
    "Sandpaper has gritty mineral grains glued to its surface, creating roughness.", "Kertas amplas memiliki butiran pasir kasar yang menimbulkan gesekan saat diraba.")
];

// ==========================================
// SD 1 INTEGRATED (ENGINEERING)
// ==========================================
CURATED_PACKS['sd-1::integrated::Materials and Their Uses'] = [
  makeQ("Why is hard timber (wood) widely chosen to make study tables and chairs?", "Mengapa kayu yang kokoh banyak dipilih untuk membuat meja belajar dan kursi?",
    ["It is sturdy, strong, and can be shaped easily", "It melts in rain", "It breaks like thin glass", "It disappears overnight"], ["Kuat, kokoh, dan mudah dibentuk", "Mudah mencair saat kena hujan", "Rapuh seperti kaca tipis", "Bisa menghilang sendiri"], 0,
    "Wood has excellent structural durability and can be sawed, joined, and carved.", "Kayu memiliki kekuatan struktur yang baik serta mudah dipotong dan dirakit menjadi perabot."),
  makeQ("Why are eyeglasses and windshields made from clear glass or transparent acrylic?", "Mengapa lensa kacamata dan kaca depan mobil dibuat dari kaca atau akrilik bening?",
    ["They allow light to pass through clearly", "They block all vision", "They are as heavy as rocks", "They change colors randomly"], ["Meneruskan cahaya dengan jernih (transparan)", "Menghalangi semua pandangan", "Sangat berat seperti batu", "Berubah warna acak"], 0,
    "Transparent materials let light waves travel through without scattering vision.", "Bahan transparan memungkinkan cahaya lewat lurus sehingga mata dapat melihat jelas."),
  makeQ("Why are warm sweaters and coats typically made from wool or thick fleece?", "Mengapa jaket hangat dan sweter musim dingin terbuat dari wol atau kain tebal?",
    ["They trap air pockets to retain body heat", "They conduct cold instantly", "They are completely waterproof like metal", "They make ice cubes"], ["Memerangkap udara hangat di dekat tubuh", "Menghantarkan dingin seketika", "Kedap air seperti logam", "Membuat es batu"], 0,
    "Wool fibers have crimps that trap insulating dead air around the skin.", "Serat wol berpori memerangkap udara hangat tubuh sehingga mencegah kedinginan."),
  makeQ("Why are vehicle tires made from durable elastic rubber with tread patterns?", "Mengapa ban kendaraan terbuat dari karet elastis beralur?",
    ["Rubber grips pavement securely and absorbs road vibration", "Rubber is slippery as ice", "Rubber dissolves in water", "Rubber makes no friction"], ["Mencengkeram jalan dengan baik dan meredam getaran", "Sangat licin seperti es", "Mudah larut dalam air", "Sama sekali tanpa gesekan"], 0,
    "Rubber provides grip, friction, and flexibility across changing road terrains.", "Karet ban memberi daya cengkeram gesekan ke aspal dan meredam guncangan jalan."),
  makeQ("Why is metal (such as aluminum or stainless steel) used for cooking frying pans?", "Mengapa logam seperti aluminium atau baja tahan karat dipakai membuat wajan penggorengan?",
    ["Metal conducts heat rapidly and evenly to cook food", "Metal melts at body temperature", "Metal repels all heat", "Metal is soft like foam"], ["Logam cepat dan merata menghantarkan panas", "Logam meleleh pada suhu tubuh", "Logam menolak semua panas", "Logam empuk seperti busa"], 0,
    "Metals are exceptional thermal conductors that transfer heat from stove to meal.", "Logam adalah konduktor panas yang baik sehingga masakan matang merata."),
  makeQ("Why are pan handles covered with heat-resistant plastic or solid wood?", "Mengapa gagang wajan dilapisi plastik tahan panas atau kayu tebal?",
    ["To insulate the handle so hands do not get burned", "To make it heavier", "To attract magnets", "To melt onto food"], ["Sebagai isolator panas agar tangan tidak melepuh saat memegang", "Agar wajan makin berat", "Untuk menarik magnet", "Agar meleleh ke makanan"], 0,
    "Plastic and wood are thermal insulators that protect chefs from burns.", "Plastik dan kayu adalah isolator panas yang melindungi telapak tangan dari suhu tinggi."),
  makeQ("Why is smooth paper preferred for school notebooks and storybooks?", "Mengapa kertas halus dipilih untuk buku tulis dan buku cerita anak?",
    ["It is lightweight, smooth, and holds ink nicely", "It is heavier than steel", "It cannot be folded", "It reflects lightning"], ["Ringan, halus, dan menyerap tinta dengan baik", "Lebih berat dari baja", "Sama sekali tidak bisa dilipat", "Memantulkan kilat petir"], 0,
    "Paper provides an ideal flat, fibrous surface for pencil graphite and printer ink.", "Kertas tipis, ringan, dan memiliki serat yang menyerap tinta tulisan dengan rapi."),
  makeQ("Which waterproof material is ideal for making raincoats and umbrellas?", "Bahan kedap air manakah yang ideal digunakan untuk jas hujan dan payung?",
    ["Water-resistant synthetic fabric or plastic", "Cotton gauze", "Cardboard paper", "Rough gravel"], ["Kain sintetis antiair atau plastik nilon", "Kain kasa tipis", "Kertas karton", "Batu kerikil kasar"], 0,
    "Synthetic polymers shed rainwater without absorbing water into fibers.", "Polimer sintetis tidak memiliki pori tembus air sehingga menolak tetesan hujan."),
  makeQ("Why are playground slides made with smooth polished metal or molded plastic?", "Mengapa perosotan taman bermain dibuat dari plastik cetak licin atau logam halus?",
    ["To minimize friction so children can slide down smoothly", "To make sliding painful", "To stop anyone from moving", "To scratch knees"], ["Memperkecil gaya gesek agar anak dapat meluncur lancar", "Membuat meluncur terasa sakit", "Menahan agar anak diam di tempat", "Menggores lutut"], 0,
    "Low friction coefficients allow safe, smooth downward sliding under gravity.", "Permukaan licin mengurangi gesekan sehingga luncuran terasa mulus dan menyenangkan."),
  makeQ("Which material is soft, non-toxic, and safest for making baby stuffed toys?", "Bahan apakah yang lembut, aman, dan paling cocok untuk boneka mainan balita?",
    ["Plush cotton fabric stuffed with polyester", "Sharp iron nails", "Brittle glass shards", "Hard rough concrete"], ["Kain katun boneka empuk berisi serat poliester", "Paku besi tajam", "Pecahan kaca rapuh", "Beton kasar dan keras"], 0,
    "Soft fabrics prevent injuries and provide comfortable tactile comfort for toddlers.", "Kain boneka yang lembut dan empuk aman dipeluk tanpa risiko melukai anak.")
];

CURATED_PACKS['sd-1::integrated::Building Simple Structures'] = [
  makeQ("What ensures that a toy block tower stands upright without toppling over?", "Apa yang membuat menara balok mainan berdiri tegak tanpa mudah roboh?",
    ["A wide, heavy, and stable base at the bottom", "A tiny base with huge heavy top", "Leaving gaps everywhere", "Building on a slope"], ["Bagian dasar yang lebar, rata, dan seimbang", "Dasar kecil dengan puncak sangat berat", "Membuat banyak celah miring", "Membangun di tanah miring licin"], 0,
    "A broad base keeps the center of gravity low and stable.", "Dasar menara yang lebar menjaga titik tumpu gravitasi tetap stabil."),
  makeQ("If a stack of plastic cups keeps falling down, what is the best way to fix it?", "Jika susunan gelas plastik mainan sering tumbang, apa langkah perbaikan terbaik?",
    ["Arrange more cups at the bottom row like a pyramid", "Stack only 1 cup at the base", "Blow on it with a fan", "Use broken cups"], ["Susun lebih banyak gelas di baris paling bawah seperti piramida", "Gunakan hanya 1 gelas di paling bawah", "Nyalakan kipas angin ke arahnya", "Gunakan gelas yang retak"], 0,
    "Pyramidal arrangements naturally distribute weight across multiple support points.", "Bentuk piramida menyebarkan beban secara merata ke permukaan bawah."),
  makeQ("What tool do carpenters and builders use to verify that a table or shelf is level?", "Alat apakah yang dipakai tukang bangunan untuk memeriksa apakah rak meja sudah rata datar?",
    ["A spirit level with a fluid bubble", "A music whistle", "A paintbrush", "A paper scissors"], ["Waterpass (alat pengukur kedataran bergelembung)", "Peluit tiup", "Kuas cat", "Gunting kertas"], 0,
    "A spirit level indicates horizontal alignment when its centered bubble rests evenly.", "Waterpass memiliki tabung cairan bergelembung untuk memastikan bidang benar-benar datar."),
  makeQ("Why do houses in rainy tropical climates feature sloped gable roofs?", "Mengapa atap rumah di daerah beriklim tropis dibuat miring condong ke bawah?",
    ["To allow rainwater to run off quickly without ponding", "To catch leaves and dirt", "To make the house slide", "To trap heat inside"], ["Agar air hujan cepat mengalir turun tanpa menggenang", "Untuk menampung kotoran daun", "Agar rumah bergeser sendiri", "Untuk memerangkap hawa pengap"], 0,
    "Sloped roofs use gravity to shed rain rapidly, preventing roof leaks.", "Kemiringan atap memanfaatkan gaya gravitasi agar air hujan segera jatuh ke talang."),
  makeQ("What is the structural role of vertical pillars and columns in buildings?", "Apakah fungsi utama tiang pilar vertikal pada bangunan bertingkat?",
    ["To support vertical loads from the roof and ceiling", "To decorate only", "To attract lightning", "To absorb paint"], ["Menopang beban vertikal dari atap dan lantai di atasnya", "Hanya sebagai hiasan", "Untuk menarik sambaran petir", "Untuk menyerap cat dinding"], 0,
    "Columns carry compressive loads downwards from upper floors to foundations.", "Pilar menyalurkan beban tekanan ke bawah menuju pondasi dasar bangunan."),
  makeQ("Why are camping tents staked securely into the ground with ropes and pegs?", "Mengapa tenda kemah ditancapkan kuat ke tanah menggunakan pasak dan tali?",
    ["To anchor the tent securely against gusts of blowing wind", "To make it heavier to carry", "To dig underground holes", "To catch insects"], ["Mengikat tenda agar tidak terbang terhempas angin kencang", "Supaya makin berat saat dibawa", "Untuk melubangi tanah", "Untuk menangkap serangga"], 0,
    "Guy ropes and pegs counteract wind uplift forces on tent walls.", "Tali pengikat dan pasak memberikan gaya tarik penahan terhadap hembusan angin."),
  makeQ("Which geometric shape is considered the most rigid and strong in bridge trusses?", "Bentuk geometri manakah yang paling kokoh dan kaku pada rangka jembatan baja?",
    ["The triangle", "The rectangle", "The loose oval", "The wavy line"], ["Segitiga", "Persegi panjang", "Oval renggang", "Garis bergelombang"], 0,
    "Triangles cannot deform without changing side lengths, making them inherently rigid.", "Bentuk segitiga tidak mudah berubah bentuk saat ditekan, menjadikannya sangat kokoh."),
  makeQ("When assembling a cardboard model, which method gives a durable bonded joint?", "Saat merakit model kardus, cara manakah yang menghasilkan sambungan yang kuat?",
    ["Using strong adhesive glue or paper tape across tabs", "Just leaning them together loosely", "Using plain water", "Blowing air"], ["Mengoleskan lem rekat atau menempelkan selotip pada lipatan", "Hanya menempelkannya tanpa perekat", "Menyiramnya dengan air", "Meniupnya"], 0,
    "Adhesives form chemical and physical bonds across overlapping surfaces.", "Lem perekat menyatukan serat kardus sehingga sambungan tidak mudah lepas."),
  makeQ("What happens if a toy bridge has too long of an unsupported gap in the middle?", "Apa yang terjadi jika jembatan mainan memiliki bentang tengah yang terlalu panjang tanpa penyangga?",
    ["It sags and bends downwards under weight", "It floats upward like a balloon", "It turns into metal", "It starts singing"], ["Jembatan akan melengkung ke bawah dan berisiko patah saat dibebani", "Melayang ke atas seperti balon", "Berubah jadi logam emas", "Mulai bernyanyi"], 0,
    "Bending moments increase with span length, causing structural deflection.", "Bentang yang terlalu panjang menimbulkan momen lentur besar yang memicu defleksi."),
  makeQ("What is the essential first step before spending materials to build a new model?", "Apakah langkah awal yang paling penting sebelum mulai merakit suatu model baru?",
    ["Drawing a clear sketch and design plan on paper", "Throwing all blocks at the wall", "Painting without building", "Cutting without measuring"], ["Membuat sketsa rancangan dan rencana kerja di kertas", "Melempar balok ke tembok", "Mengecat sebelum ada benda", "Memotong tanpa mengukur"], 0,
    "Engineering sketches communicate dimensions, parts, and assembly steps before building.", "Gambar rancangan membantu merencanakan ukuran, bahan, dan cara pemasangan yang tepat.")
];

CURATED_PACKS['sd-1::integrated::Wheels and Motion'] = [
  makeQ("What shape is a wheel so it can roll continuously without sudden bumps?", "Bentuk apakah yang dimiliki roda agar dapat menggelinding mulus tanpa tersentak?",
    ["A round circle", "A sharp square", "A flat triangle", "A star shape"], ["Lingkaran bundar", "Persegi bersudut tajam", "Segitiga pipih", "Bintang bergerigi"], 0,
    "Circular wheels maintain a constant radius from axle to surface, rolling smoothly.", "Bentuk lingkaran memiliki jari-jari sama ke segala arah sehingga berputar stabil."),
  makeQ("What do we call the central rod or shaft around which a pair of wheels rotates?", "Apakah sebutan untuk batang atau poros tengah tempat berputarnya sepasang roda?",
    ["The axle", "The pedal", "The handlebar", "The rim"], ["Gandar / poros roda (axle)", "Pedal kayuh", "Stang kemudi", "Pelek luar"], 0,
    "An axle supports rotating wheels and transmits movement across the vehicle chassis.", "Gandar atau poros menghubungkan roda kiri dan kanan agar berputar selaras."),
  makeQ("Which wheeled transport vehicle carries groups of passengers safely on city roads?", "Kendaraan beroda manakah yang mengangkut banyak penumpang dengan aman di jalan kota?",
    ["A bus or car", "A rowing boat", "A submarine", "A hot air balloon"], ["Bus atau mobil", "Perahu dayung", "Kapal selam", "Balon udara"], 0,
    "Buses and automobiles utilize 4 or more wheels to travel efficiently on streets.", "Bus dan mobil bertumpu pada ban berputar untuk meluncur di atas aspal."),
  makeQ("What mechanism slows down and safely halts rolling wheels on a bicycle?", "Mekanisme apakah yang memperlambat dan menghentikan putaran roda sepeda dengan aman?",
    ["The brakes", "The bell", "The mirror", "The seat"], ["Rem (brakes)", "Bel sepeda", "Kaca spion", "Jok sadel"], 0,
    "Brake pads create friction against wheel rims to dissipate kinetic motion safely.", "Kampas rem menekan pelek roda sehingga gaya gesek menghentikan laju sepeda."),
  makeQ("If you give a toy wagon a gentle push versus a firm hard push, what happens?", "Jika kamu mendorong gerobak mainan dengan dorongan pelan dibanding dorongan kuat, apa yang terjadi?",
    ["The firm push makes it travel faster and farther", "The gentle push flies to space", "Both stop at 1 centimeter", "The wagon disappears"], ["Dorongan yang lebih kuat membuat gerobak melaju lebih cepat dan jauh", "Dorongan pelan terbang ke luar angkasa", "Keduanya berhenti di jarak 1 cm", "Gerobak menghilang"], 0,
    "Greater applied force produces greater acceleration in the direction of push.", "Gaya dorong yang lebih besar menghasilkan percepatan gerak yang lebih tinggi."),
  makeQ("Across which surface will a toy car roll the greatest distance with one push?", "Di atas permukaan manakah mobil mainan meluncur paling jauh dengan sekali dorong?",
    ["A smooth tiled floor", "A shaggy wool carpet", "A muddy patch of grass", "A tub of sand"], ["Lantai ubin keramik yang licin", "Karpet wol tebal dan berbulu", "Rumput berlumpur basah", "Bak pasir pantai"], 0,
    "Smooth surfaces exhibit minimal rolling resistance and friction.", "Permukaan ubin yang rata dan licin memiliki gesekan yang sangat kecil dibanding karpet."),
  makeQ("Why do roller skates enable people to glide faster than walking shoes?", "Mengapa sepatu roda membuat kita meluncur lebih cepat dibanding memakai sepatu biasa?",
    ["Rolling friction of wheels is much lower than sliding friction of shoe soles", "Skates have rocket thrusters", "Skates are made of clouds", "Shoes cannot bend"], ["Gaya gesek menggelinding pada roda jauh lebih kecil dari gesekan sol sepatu", "Sepatu roda memiliki pendorong roket", "Sepatu roda terbuat dari awan", "Sepatu biasa tidak bisa melangkah"], 0,
    "Wheels replace sliding friction with rolling friction, conserving forward energy.", "Roda menggantikan gesekan geser menjadi gesekan gelinding yang hemat energi."),
  makeQ("What part of a bicycle rotates when a rider pushes down on the foot pedals?", "Bagian sepeda manakah yang berputar saat pengendara menginjak pedal kayuh?",
    ["The chainring sprocket and wheels", "The headlight only", "The horn only", "The saddle"], ["Gir rantai dan roda sepeda", "Hanya lampu depan", "Hanya klakson", "Tempat duduk saja"], 0,
    "Pedals turn the front sprocket, pulling the chain to drive the rear wheel.", "Kayuhan pedal memutar gir depan yang menarik rantai untuk memutar roda belakang."),
  makeQ("What happens when a rolling rubber ball collides straight into a solid wall?", "Apa yang terjadi saat bola karet menggelinding menabrak tembok padat dengan lurus?",
    ["It bounces backward and changes direction", "It turns into mist", "It gets glued permanently", "It passes through the wall"], ["Bola memantul kembali dan berbalik arah", "Bola berubah jadi kabut", "Bola langsung menempel selamanya", "Bola menembus tembok"], 0,
    "The wall exerts an equal and opposite reaction force, rebounding the elastic ball.", "Dinding memberikan gaya reaksi yang memantulkan bola karet elastis ke arah sebaliknya."),
  makeQ("What do we call interlocking toothed wheels that transfer rotational power?", "Apakah sebutan untuk roda bergigi yang saling bertautan untuk meneruskan putaran mesin?",
    ["Gears", "Ropes", "Pillows", "Bricks"], ["Roda gigi (Gears)", "Tali tambang", "Bantal busa", "Batu bata"], 0,
    "Meshing gears transfer rotational speed and mechanical torque between shafts.", "Roda gigi yang saling mengait meneruskan putaran dan tenaga mekanik antargandar.")
];

CURATED_PACKS['sd-1::integrated::Designing and Testing Objects'] = [
  makeQ("Why do engineers test an experimental prototype before producing thousands of products?", "Mengapa insinyur menguji purwarupa terlebih dahulu sebelum memproduksi massal?",
    ["To discover design flaws early and improve safety", "To waste testing time", "To make it look dirty", "To break it on purpose"], ["Untuk menemukan kekurangan desain lebih awal dan meningkatkan keselamatan", "Hanya untuk membuang waktu", "Agar terlihat kotor", "Supaya sengaja rusak"], 0,
    "Testing identifies unexpected weaknesses before full-scale manufacturing.", "Uji coba mengungkap kelemahan rancangan sebelum produk dibuat dalam jumlah banyak."),
  makeQ("If a paper glider dives nose-first into the ground, what adjustment should you test?", "Jika pesawat kertas meluncur menukik tajam ke tanah, perbaikan apa yang sebaiknya dicoba?",
    ["Gently bend the rear wing flaps (elevators) slightly upward", "Rip the entire wing off", "Throw it directly at the floor", "Dip it in water"], ["Tekuk sedikit ujung belakang sayap ke arah atas", "Robek semua sayapnya", "Lempar langsung ke lantai", "Celupkan ke dalam air"], 0,
    "Upward elevators generate downward tail force, lifting the glider's nose level.", "Menekuk sedikit ujung belakang sayap ke atas menghasilkan gaya angkat pada hidung pesawat."),
  makeQ("In a fair race between two toy gravity cars down a ramp, what must remain identical?", "Dalam uji balap yang adil antara dua mobil mainan di lintasan miring, apa yang harus sama?",
    ["The starting height, ramp slope, and track surface", "Using two completely different ramps", "Pushing one car with your hand", "Starting at different times"], ["Ketinggian start, kemiringan lintasan, dan bahan landasan", "Memakai dua tanjakan berbeda sama sekali", "Mendorong salah satu mobil dengan tangan", "Waktu start yang berbeda jauh"], 0,
    "Controlled testing keeps all variables constant except the item under comparison.", "Semua kondisi pengujian harus dibuat sama agar hasil perbandingan akurat dan adil."),
  makeQ("Why is measuring with a marked ruler better than estimating with handspans?", "Mengapa mengukur dengan penggaris berskala lebih baik daripada sekadar menebak dengan jengkal?",
    ["A ruler provides standard, precise units everyone can verify", "A ruler is colorful", "A ruler bends in wind", "A ruler changes every day"], ["Penggaris memberikan satuan ukuran baku yang pasti dan diakui semua orang", "Penggaris memiliki banyak warna", "Penggaris mudah melengkung", "Penggaris berubah panjang setiap hari"], 0,
    "Standard measurement units (centimeters, inches) ensure reliable repeatability.", "Satuan baku seperti sentimeter memastikan ukuran yang diukur tetap sama bagi siapa pun."),
  makeQ("What is a preliminary working model built to experiment with an idea called?", "Model awal sederhana yang dibuat untuk menguji ide suatu rancangan disebut:",
    ["A prototype", "A final receipt", "A decorative sticker", "A museum relic"], ["Purwarupa (Prototype)", "Kuitansi belanja", "Stiker hiasan", "Benda purbakala"], 0,
    "A prototype allows creators to evaluate form, fit, and operational performance.", "Purwarupa adalah model percobaan untuk melihat apakah desain berfungsi sesuai rencana."),
  makeQ("When testing the strength of a paper bridge model, how should weights be applied?", "Saat menguji kekuatan jembatan kertas, bagaimana cara menambahkan beban uji?",
    ["Add small uniform weights one by one until it begins to deflect", "Drop a massive boulder from the roof", "Step on it with boots", "Blow air onto it"], ["Tambahkan beban kecil seragam satu demi satu hingga batas lentur", "Jatuhkan batu besar dari atap", "Injak dengan sepatu bot", "Cukup ditiup saja"], 0,
    "Gradually incrementing loads allows accurate measurement of maximum load capacity.", "Menambahkan beban bertahap memungkinkan kita mencatat batas beban maksimal jembatan."),
  makeQ("What is a key benefit of drawing concept sketches before assembling materials?", "Apa keuntungan utama menggambar sketsa rancangan sebelum mulai merakit bahan?",
    ["It lets you explore variations and calculate dimensions without wasting materials", "It makes a mess of paper", "It prevents you from building anything", "It takes all day"], ["Dapat mencoba berbagai ide dan menghitung ukuran tanpa membuang bahan", "Hanya mengotori kertas gambar", "Mencegah kita merakit benda", "Menghabiskan waktu seharian"], 0,
    "Sketching visualizes spatial relationships and identifies potential clearance issues early.", "Sketsa membantu menuangkan ide bentuk dan ukuran dengan jelas sebelum memotong bahan."),
  makeQ("If a structural joint cracks under moderate load during testing, what is learned?", "Jika sambungan struktur retak saat diberi beban uji sedang, pelajaran apa yang didapat?",
    ["The joint requires reinforcement like gussets, brackets, or stronger adhesive", "Building is impossible", "Throw everything away", "Pretend it never cracked"], ["Sambungan tersebut butuh diperkuat dengan plat penguat atau lem yang lebih rekat", "Membangun sesuatu itu mustahil", "Buang semua bahan yang ada", "Pura-pura tidak melihat keretakan"], 0,
    "Engineering failures reveal critical stress concentration points needing reinforcement.", "Kegagalan uji coba menunjukkan bagian mana yang mengalami tekanan tinggi dan butuh penguatan."),
  makeQ("What should you record in a test logbook during an engineering experiment?", "Apa yang perlu dicatat di buku catatan pengujian saat melakukan eksperimen teknik?",
    ["Quantitative measurements, observed behaviors, and trial numbers", "Random doodle drawings only", "The lunch menu", "Nothing at all"], ["Angka hasil pengukuran, pengamatan langsung, dan nomor percobaan", "Hanya coretan gambar acak", "Daftar menu makan siang", "Tidak mencatat apa pun"], 0,
    "Data logs provide evidence for evaluating whether engineering criteria were met.", "Catatan data percobaan menjadi bukti nyata untuk menilai keberhasilan suatu desain."),
  makeQ("Why is the engineering design process described as a continuous cycle?", "Mengapa proses desain rekayasa disebut sebagai siklus berulang (iterasi)?",
    ["Because designers continually test, learn from results, and improve their creations", "Because it is drawn as a circle", "Because engineers never finish any task", "Because wheels rotate"], ["Karena perancang terus menguji, belajar dari hasil, dan menyempurnakan karyanya", "Karena gambarnya berbentuk lingkaran", "Karena insinyur tidak pernah menyelesaikan tugas", "Karena roda selalu berputar"], 0,
    "Iteration drives innovation by refining prototypes based on empirical test feedback.", "Siklus perancangan mendorong penyempurnaan terus-menerus berdasarkan hasil evaluasi nyata.")
];

// ==========================================
// SD 1 ICT / TECHNOLOGY
// ==========================================
CURATED_PACKS['sd-1::ict::Introduction to Computer Devices'] = [
  makeQ("Which computer hardware component displays pictures, text, and videos on its screen?", "Perangkat keras komputer manakah yang menampilkan gambar, tulisan, dan video pada layarnya?",
    ["The monitor (screen)", "The mouse pad", "The power cable", "The printer paper"], ["Monitor (layar)", "Alas mouse", "Kabel daya", "Kertas cetak"], 0,
    "The monitor is an visual output display device that shows the graphic user interface.", "Monitor adalah perangkat keluaran visual yang menampilkan gambar dan teks kepada pengguna."),
  makeQ("Which palm-sized device do you roll on a desk to move the cursor pointer on screen?", "Perangkat genggam manakah yang digerakkan di meja untuk mengarahkan kursor di layar?",
    ["The computer mouse", "The keyboard", "The wall speaker", "The webcam"], ["Mouse komputer", "Papan ketik (keyboard)", "Pengeras suara dinding", "Kamera webcam"], 0,
    "A computer mouse detects hand movements to position the cursor on graphical displays.", "Mouse mendeteksi pergerakan tangan untuk memindahkan kursor dan memilih menu di layar."),
  makeQ("Which device contains letter keys, numbers, and spacebars for typing words?", "Perangkat manakah yang memiliki tombol huruf, angka, dan spasi untuk mengetik kalimat?",
    ["The keyboard", "The headphones", "The flash drive", "The cooling fan"], ["Papan ketik (keyboard)", "Headphone", "Flashdisk", "Kipas pendingin"], 0,
    "A keyboard provides input keys for entering alphanumeric characters and commands.", "Keyboard adalah perangkat masukan untuk mengetik huruf, angka, dan perintah ke komputer."),
  makeQ("Which portable computer folds open and includes a screen, keyboard, and battery together?", "Komputer jinjing manakah yang dapat dilipat dan dilengkapi layar, keyboard, serta baterai?",
    ["A laptop computer", "A desktop tower", "A television set", "A gaming arcade box"], ["Komputer laptop", "Casing CPU desktop", "Pesawat televisi", "Kotak mesin arkade"], 0,
    "Laptops integrate all computer hardware into a single battery-powered folding unit.", "Laptop menyatukan layar, keyboard, touchpad, dan baterai dalam satu perangkat portabel."),
  makeQ("Which flat touchscreen digital device can be operated by tapping directly with fingers?", "Perangkat digital layar datar manakah yang dioperasikan dengan menyentuh langsung memakai jari?",
    ["A tablet or smartphone", "A desktop monitor", "A mechanical typewriter", "A landline telephone"], ["Tablet atau smartphone", "Monitor tabung kuno", "Mesin tik mekanik", "Telepon rumah kabel"], 0,
    "Tablets feature capacitive touchscreens that register finger taps and gestures.", "Tablet memiliki layar sentuh responsif yang menerima perintah dari sentuhan jari tangan."),
  makeQ("What main case houses the motherboard, CPU processor, and storage drive in desktop setups?", "Kotak utama apakah yang memuat motherboard, prosesor CPU, dan memori pada komputer desktop?",
    ["The system unit (CPU tower case)", "The mouse pad", "The printer tray", "The keyboard cover"], ["Casing unit sistem (CPU desktop)", "Bantalan mouse", "Baki penampung kertas", "Penutup keyboard"], 0,
    "The system unit encloses the primary processing and power components of a computer.", "Casing CPU melindungi komponen inti komputer seperti prosesor, memori, dan kartu grafis."),
  makeQ("Which device outputs sound so you can listen to games, music, and instructional videos?", "Perangkat manakah yang mengeluarkan suara agar kamu dapat mendengar musik dan video belajar?",
    ["Speakers or headphones", "A digital scanner", "A mouse sensor", "A blank CD"], ["Speaker atau headphone", "Pemindai scanner", "Sensor optik mouse", "Keping CD kosong"], 0,
    "Speakers convert electrical audio signals from the computer into audible sound waves.", "Speaker mengubah sinyal audio digital menjadi gelombang suara yang terdengar telinga."),
  makeQ("Which physical button do you press to turn on a desktop or laptop computer?", "Tombol fisik manakah yang kamu tekan untuk menyalakan komputer desktop atau laptop?",
    ["The power button (with circle/line symbol)", "The volume down key", "The spacebar", "The eject button"], ["Tombol daya (Power button bersimbol lingkaran dan garis)", "Tombol volume kecil", "Tombol spasi", "Tombol pelepas disk"], 0,
    "The power switch initiates the computer's boot sequence and power delivery.", "Tombol power mengalirkan daya listrik dan memulai proses booting sistem komputer."),
  makeQ("What general name is given to digital games, web browsers, and drawing software?", "Apakah sebutan umum untuk permainan digital, peramban web, dan aplikasi menggambar?",
    ["Software / Applications (Apps)", "Hardware screws", "Power plugs", "Paper manuals"], ["Perangkat lunak / Aplikasi (Software / Apps)", "Baut perangkat keras", "Colokan stopkontak", "Buku panduan cetak"], 0,
    "Software consists of code instructions that tell computer hardware what tasks to run.", "Perangkat lunak adalah program digital berisi instruksi untuk menjalankan berbagai tugas."),
  makeQ("What component connects computer peripherals together or delivers power from wall sockets?", "Benda apakah yang menghubungkan perlengkapan komputer atau mengalirkan listrik dari stopkontak?",
    ["Cables and wires", "Pencils", "Wood pegs", "Sticker labels"], ["Kabel dan kawat penghubung", "Pensil tulis", "Pasak kayu", "Stiker label"], 0,
    "Cables transmit electrical currents and high-speed data signals between devices.", "Kabel bertugas mengalirkan arus listrik dan sinyal data antarperangkat komputer.")
];

CURATED_PACKS['sd-1::ict::Input and Output Devices'] = [
  makeQ("Is a computer keyboard classified as an input device or an output device?", "Apakah papan ketik (keyboard) tergolong sebagai perangkat masukan (input) atau keluaran (output)?",
    ["Input device (sends keystrokes into computer)", "Output device (displays letters on wall)", "Storage disk", "Power battery"], ["Perangkat masukan (input) untuk mengirim ketikan ke komputer", "Perangkat keluaran (output) proyektor", "Piringan penyimpan", "Baterai daya"], 0,
    "Keyboards provide input signals when users press letters, digits, and commands.", "Keyboard memasukkan karakter dan instruksi dari ketikan jari ke dalam sistem komputer."),
  makeQ("Is a desktop monitor classified as an input device or an output device?", "Apakah monitor komputer tergolong sebagai perangkat masukan (input) atau keluaran (output)?",
    ["Output device (displays visual graphics)", "Input device (types text)", "Network router", "Power supply"], ["Perangkat keluaran (output) untuk menampilkan gambar visual", "Perangkat masukan pengetik", "Router jaringan", "Penyuplai daya"], 0,
    "Monitors output processed graphical data from the computer to human eyes.", "Monitor mengeluarkan hasil olahan data grafis ke layar agar dapat dilihat mata manusia."),
  makeQ("Which input device captures your spoken voice so you can talk to friends online?", "Perangkat masukan manakah yang menangkap suara ucapanmu saat berbicara lewat internet?",
    ["A microphone", "A speaker", "A printer", "A mouse scroll"], ["Mikrofon (microphone)", "Speaker pengeras", "Mesin pencetak printer", "Roda gulir mouse"], 0,
    "A microphone converts acoustic sound waves from voices into digital audio inputs.", "Mikrofon mengubah getaran suara pita suara menjadi sinyal audio digital masukan."),
  makeQ("Which output device transfers drawings, documents, and photos from screen onto physical paper?", "Perangkat keluaran manakah yang mencetak gambar dan dokumen dari layar ke atas lembaran kertas?",
    ["A printer", "A scanner", "A joystick", "A keyboard"], ["Printer (mesin cetak)", "Pemindai scanner", "Tuas kendali joystick", "Papan ketik keyboard"], 0,
    "Printers reproduce digital documents as physical ink prints on paper sheets.", "Printer menyemprotkan tinta ke atas kertas untuk menghasilkan cetakan fisik dokumen."),
  makeQ("Which gaming accessory is an input device used to steer cars and control game heroes?", "Aksesori bermain game manakah yang berfungsi sebagai perangkat masukan untuk mengendalikan karakter?",
    ["A game controller (gamepad or joystick)", "A monitor stand", "A printer ribbon", "An external speaker"], ["Gamepad atau tuas kendali (joystick)", "Kaki penyangga monitor", "Pita tinta printer", "Pengeras suara luar"], 0,
    "Controllers send directional inputs and button triggers to guide game characters.", "Gamepad mendeteksi tombol dan stik arah untuk mengendalikan aksi karakter di dalam game."),
  makeQ("When you click a button with a computer mouse, what kind of event occurs?", "Ketika kamu menekan tombol klik pada mouse, proses apakah yang sedang berlangsung?",
    ["An input signal is transmitted to the computer", "Audio is printed to paper", "The monitor turns off", "Batteries get created"], ["Sinyal masukan (input) dikirimkan ke komputer untuk memilih perintah", "Suara dicetak ke kertas", "Layar monitor mati", "Baterai baru tercipta"], 0,
    "Clicking sends an electrical input interrupt to trigger an action at cursor position.", "Klik mouse mengirimkan sinyal perintah masukan untuk menjalankan fungsi yang dipilih."),
  makeQ("Which device illuminates paper drawings and converts them into digital image files?", "Perangkat manakah yang menyinari dokumen gambar dan mengubahnya menjadi berkas foto digital?",
    ["An optical scanner", "A computer monitor", "An audio speaker", "A keyboard key"], ["Pemindai (scanner)", "Monitor komputer", "Speaker audio", "Tombol keyboard"], 0,
    "Scanners use light sensors to digitize physical photos into computer files.", "Scanner memindai lembaran dokumen fisik menjadi berkas citra digital di komputer."),
  makeQ("Are audio headphones classified as input or output devices?", "Apakah headphone telinga tergolong sebagai perangkat masukan (input) atau keluaran (output)?",
    ["Output devices (they output sound directly to your ears)", "Input devices (they read thoughts)", "Storage drives", "Power cables"], ["Perangkat keluaran (output) karena mengalirkan suara ke telinga", "Perangkat masukan pembaca pikiran", "Penyimpan data", "Kabel listrik"], 0,
    "Headphones receive audio signals and output sound waves into listeners' ears.", "Headphone menerima data suara dari komputer lalu mengeluarkan bunyi ke telinga pengguna."),
  makeQ("Why is a smartphone touchscreen unique among computer devices?", "Mengapa layar sentuh pada ponsel pintar tergolong perangkat yang sangat istimewa?",
    ["It acts simultaneously as both an output display and a touch input surface", "It never needs charging", "It works without electricity", "It is made of wood"], ["Berfungsi ganda sekaligus sebagai penampil keluaran (output) dan penerima sentuhan (input)", "Tidak perlu diisi daya baterai", "Dapat menyala tanpa listrik", "Terbuat dari kayu"], 0,
    "Touchscreens display visual output while capacitive sensors register finger input.", "Layar sentuh menampilkan gambar (output) sekaligus menerima sentuhan jari (input)."),
  makeQ("Which input device captures video of your face for video meetings and online classrooms?", "Perangkat masukan manakah yang merekam wajahmu saat menghadiri kelas belajar online?",
    ["A webcam (video camera)", "A printer nozzle", "A mouse pad", "A loudspeaker"], ["Kamera web (webcam)", "Ujung semprot printer", "Alas mouse", "Pengeras suara luar"], 0,
    "Webcams record real-time video frames and input them into video conferencing apps.", "Webcam menangkap gambar video wajah secara langsung untuk dikirim ke aplikasi telekonferensi.")
];

CURATED_PACKS['sd-1::ict::Using Devices Safely'] = [
  makeQ("Why should you always keep cups of juice and water bottles away from computers?", "Mengapa kita harus menjauhkan gelas minuman dan botol air dari perangkat komputer?",
    ["Liquid spills can cause electrical short circuits and permanently damage parts", "Water makes screens too bright", "Computers get thirsty", "Keyboards turn into ice"], ["Tumpahan air dapat memicu korsleting listrik dan merusak komponen", "Air membuat layar terlalu terang", "Komputer merasa haus", "Keyboard membeku jadi es"], 0,
    "Liquids conduct electricity into sensitive circuits, causing irreversible electrical shorts.", "Cairan yang tumpah ke komponen elektronik menyebabkan hubungan arus pendek dan karat fatal."),
  makeQ("How should you sit while typing on a computer or working at a desk?", "Bagaimana posisi duduk yang baik saat mengetik di depan komputer atau meja belajar?",
    ["Sit upright with your back supported and screen at comfortable eye level", "Slouch bent in half on the floor", "Lie upside down on a bed", "Keep your eyes 2 inches from screen"], ["Duduk tegak dengan punggung bersandar nyaman dan layar sejajar mata", "Membungkuk berlipat di lantai", "Tengkurap jungkir balik di kasur", "Mata menempel 5 cm dari layar"], 0,
    "Ergonomic posture prevents backaches, neck strain, and spinal fatigue.", "Duduk dengan posisi ergonomis menjaga kesehatan tulang punggung dan mencegah leher pegal."),
  makeQ("Why is it wise to take a brief 5-minute break away from screens every 30 minutes?", "Mengapa kita disarankan beristirahat sejenak dari melihat layar setiap 30 menit?",
    ["To rest your eyes, stretch muscles, and blink naturally", "To break the computer", "To erase all files", "To forget what you were doing"], ["Mengistirahatkan mata, meregangkan otot badan, dan berkedip rileks", "Agar komputer rusak", "Untuk menghapus semua berkas", "Supaya lupa tugas sekolah"], 0,
    "The 20-20-20 rule helps prevent digital eye strain, dryness, and fatigue.", "Mengistirahatkan pandangan menjaga kelembapan mata dan meredakan ketegangan mata lelah."),
  makeQ("Who should you always ask for permission before installing a new game or application?", "Kepada siapa kamu harus selalu meminta izin sebelum mengunduh permainan atau aplikasi baru?",
    ["A parent, guardian, or teacher", "A stranger in an online chatroom", "Nobody at all", "Your pet dog"], ["Orang tua, wali, atau bapak/ibu guru", "Orang asing di ruang obrolan online", "Tidak perlu bertanya kepada siapa pun", "Hewan peliharaan"], 0,
    "Adults ensure apps are age-appropriate, safe, and free from malware.", "Orang dewasa dapat memeriksa keamanan aplikasi agar terbebas dari virus berbahaya."),
  makeQ("Which personal information should you NEVER share with strangers on the internet?", "Informasi pribadi manakah yang TIDAK BOLEH kamu bagikan kepada orang asing di internet?",
    ["Your home address, phone number, school name, and passwords", "Your favorite color", "A drawing of a cartoon star", "The sound a cat makes"], ["Alamat rumah, nomor telepon, nama sekolah, dan kata sandi akun", "Warna kesukaanmu", "Gambar kartun bintang", "Suara tiruan kucing"], 0,
    "Keeping private personal details confidential protects children from online dangers.", "Merahasiakan identitas diri melindungi keselamatan dan privasi anak di dunia maya."),
  makeQ("How should you properly unplug a power cord from an electrical wall outlet?", "Bagaimana cara yang aman saat mencabut kabel listrik dari stopkontak dinding?",
    ["Grip the insulated plug head firmly and pull straight out gently", "Yank violently on the thin wire from across the room", "Pull with wet dripping hands", "Use metal scissors to cut it"], ["Pegang bagian kepala colokan dengan mantap lalu tarik lurus perlahan", "Menarik paksa kabel tipisnya dari kejauhan", "Menarik colokan dengan tangan basah", "Memotong kabel dengan gunting besi"], 0,
    "Pulling by the insulated plug prevents damaging internal copper wires and avoids shocks.", "Memegang kepala colokan mencegah kawat tembaga putus dan menghindari sengatan listrik."),
  makeQ("Why should your hands be clean and dry before touching a tablet, keyboard, or mouse?", "Mengapa tangan harus bersih dan kering sebelum memegang tablet, keyboard, atau mouse?",
    ["To prevent dirt accumulation on keys and stop moisture from entering electronics", "To make keys turn into gold", "To play music louder", "To type backwards"], ["Mencegah kotoran menempel pada tombol dan menghindari kelembapan masuk ke sirkuit", "Agar tombol berubah jadi emas", "Agar musik bersuara kencang", "Supaya mengetik mundur"], 0,
    "Dry, clean hands maintain device responsiveness and prevent oil and grease buildup.", "Tangan yang bersih menjaga keawetan tombol serta mencegah noda minyak merusak permukaan."),
  makeQ("What should you do immediately if a strange, flashing pop-up window appears on screen?", "Apa yang harus kamu lakukan jika tiba-tiba muncul jendela peringatan aneh berkedip di layar?",
    ["Notify an adult, parent, or teacher right away without clicking suspicious links", "Click every button as fast as possible", "Enter credit card numbers", "Turn off the house power"], ["Segera beritahukan orang tua atau guru tanpa mengklik tautan mencurigakan", "Mengklik semua tombol secepat mungkin", "Memasukkan nomor kartu belanja", "Memadamkan listrik rumah"], 0,
    "Informing trusted adults prevents accidental malware downloads or phishing traps.", "Melaporkan kepada orang dewasa mencegah perangkat terkena jebakan iklan berbahaya atau virus."),
  makeQ("Why is it harmful to stare at bright mobile screens in a completely pitch-black bedroom?", "Mengapa tidak baik menatap layar ponsel yang sangat terang di dalam kamar yang gelap gulita?",
    ["The intense contrast causes eye strain, headache, and disrupts healthy sleep patterns", "The phone will explode", "The screen will turn blue forever", "It summons rain inside"], ["Kontras cahaya yang tajam memicu mata lelah, pusing, dan mengganggu hormon tidur", "Ponsel akan meledak seketika", "Layar berubah biru selamanya", "Mendatangkan hujan di kamar"], 0,
    "High screen brightness against dark surroundings overworks pupil dilation muscles.", "Kontras cahaya yang terlalu tinggi memaksa pupil mata bekerja keras sehingga mata cepat lelah."),
  makeQ("What is a confidential combination of letters, numbers, and symbols used to secure an account?", "Kombinasi rahasia huruf, angka, dan simbol yang dipakai mengunci akun agar aman disebut:",
    ["A password (passcode)", "A public billboard", "A greeting card", "A username badge"], ["Kata sandi (password)", "Papan iklan jalanan", "Kartu ucapan selamat", "Lencana nama pengguna"], 0,
    "Passwords act as digital locks safeguarding personal profiles from unauthorized access.", "Kata sandi berfungsi sebagai kunci pengaman agar akun tidak bisa dibuka orang lain.")
];

CURATED_PACKS['sd-1::ict::Simple Sequences of Instructions'] = [
  makeQ("In computer science, what do we call an ordered, step-by-step set of instructions to solve a task?", "Dalam ilmu komputer, urutan langkah-langkah teratur untuk menyelesaikan suatu tugas disebut:",
    ["An algorithm", "A random guess", "A desktop wallpaper", "A broken cable"], ["Algoritma", "Tebakan acak", "Gambar latar desktop", "Kabel yang putus"], 0,
    "An algorithm is an unambiguous sequence of steps designed to achieve a specific goal.", "Algoritma adalah rangkaian instruksi terstruktur untuk menyelesaikan suatu permasalahan."),
  makeQ("In what order does a computer processor execute instructions written in a program sequence?", "Dalam urutan bagaimanakah komputer menjalankan instruksi dalam suatu urutan program?",
    ["Sequentially step-by-step from the top first step to the last", "Randomly jumping backwards and forwards", "All steps simultaneously backwards", "Only every fifth instruction"], ["Secara berurutan langkah demi langkah dari yang pertama hingga terakhir", "Melompat acak maju mundur", "Semua langkah bersamaan terbalik", "Hanya langkah nomor lima saja"], 0,
    "Standard program execution flows sequentially unless redirected by conditionals or loops.", "Komputer membaca dan menjalankan perintah baris demi baris secara tertib dari atas ke bawah."),
  makeQ("What happens if you follow a recipe out of order, like baking the pan before mixing ingredients?", "Apa yang terjadi jika kamu memasak kue dengan urutan terbalik, seperti memanggang sebelum mencampur adonan?",
    ["The recipe fails because proper preparatory steps were skipped", "The cake bakes instantly", "It tastes like ice cream", "The oven fixes everything"], ["Kue gagal matang dengan benar karena urutan langkah penting terlewat", "Kue langsung matang seketika", "Rasanya menjadi seperti es krim", "Oven membetulkan semuanya"], 0,
    "Sequential dependencies require prerequisites to be completed before subsequent actions.", "Instruksi yang berurutan membutuhkan langkah awal diselesaikan dulu agar hasil akhirnya sesuai."),
  makeQ("In a coding maze game, if a robot receives 'Step Forward, Turn Right, Step Forward', what will it do?", "Dalam game labirin, jika robot diberi perintah 'Maju 1 Langkah, Belok Kanan, Maju 1 Langkah', apa tindakannya?",
    ["Execute those exact three actions in that specific order", "Turn left and dance", "Stand completely still", "Fly up into the ceiling"], ["Melakukan ketiga tindakan tersebut secara berurutan sesuai perintah", "Belok kiri lalu menari", "Diam tidak bergerak sama sekali", "Terbang ke langit-langit"], 0,
    "Robots strictly follow the programmed sequence of commands given by the coder.", "Robot menjalankan instruksi dengan patuh sesuai urutan kode yang diberikan pemrogram."),
  makeQ("What do software developers call an unexpected mistake or flaw in a computer program?", "Apakah sebutan para pemrogram komputer untuk kesalahan atau kekeliruan dalam suatu kode program?",
    ["A bug", "A butterfly", "A feature icon", "A battery cell"], ["Kutu program (Bug)", "Kupu-kupu hias", "Ikon fitur aplikasi", "Sel baterai"], 0,
    "A software bug is an error in code that causes unintended behavior or incorrect outputs.", "Bug adalah istilah untuk kesalahan penulisan kode yang membuat program berjalan keliru."),
  makeQ("What is the process of finding and fixing mistakes in computer code called?", "Proses mencari dan memperbaiki kesalahan dalam kode program komputer disebut:",
    ["Debugging", "Formatting", "Coloring", "Printing"], ["Debugging (membasmi bug)", "Format ulang", "Pewarnaan", "Pencetakan"], 0,
    "Debugging involves tracing program logic to isolate and resolve errors.", "Debugging adalah kegiatan menelusuri dan membetulkan kode yang bermasalah hingga bekerja lancar."),
  makeQ("Which instruction block makes an animated character leap upward and land back down?", "Blok perintah manakah yang membuat karakter kartun melompat ke atas lalu mendarat kembali?",
    ["Jump (Move Up then Move Down)", "Hide forever", "Change color to clear", "Play quiet sound"], ["Lompat (Bergerak ke atas lalu kembali ke bawah)", "Sembunyi selamanya", "Ganti warna jadi transparan", "Bunyikan suara sunyi"], 0,
    "A jump command alters the vertical Y-coordinate upwards before gravity restores it.", "Perintah melompat mengubah koordinat vertikal karakter naik lalu menurunkannya kembali."),
  makeQ("If you want a character to take 5 identical footsteps forward, which code structure is most efficient?", "Jika ingin karakter melangkah maju 5 kali yang sama, struktur kode manakah yang paling efisien?",
    ["A repeat loop: 'Repeat 5 times: Move 1 step forward'", "Writing 'Move' 500 times", "Turning off the computer", "Deleting the sprite"], ["Blok perulangan (Loop): 'Ulangi 5 kali: Maju 1 langkah'", "Menulis 'Maju' 500 kali tanpa jeda", "Mematikan komputer", "Menghapus karakter game"], 0,
    "Loops prevent code repetition by reiterating an action a designated number of times.", "Struktur perulangan (loop) menghemat baris kode dengan mengulang aksi secara otomatis."),
  makeQ("Why must commands given to computers be precise, clear, and unambiguous?", "Mengapa instruksi yang diberikan kepada komputer harus sangat jelas, pasti, dan tidak membingungkan?",
    ["Because computers do exactly what the code instructs without guessing human intent", "Because computers have feelings", "Because computers get angry", "Because keyboards run out of ink"], ["Karena komputer menjalankan tepat sesuai kode tanpa bisa menebak maksud manusia", "Karena komputer punya perasaan", "Karena komputer bisa marah", "Karena keyboard kehabisan tinta"], 0,
    "Computers lack human common sense and require explicit logical instructions to function.", "Komputer adalah mesin logis yang hanya menjalankan perintah persis seperti yang tertulis."),
  makeQ("In block-based visual coding, which category contains starter blocks like 'When Green Flag Clicked'?", "Dalam pemrograman visual berbasis blok, kategori apakah yang memuat blok pemicu seperti 'Saat Bendera Hijau Diklik'?",
    ["Events (Triggers)", "Pen color", "Math operators", "Sensing volume"], ["Kejadian / Pemicu (Events)", "Warna pena", "Operator matematika", "Deteksi volume suara"], 0,
    "Event blocks listen for specific user actions (clicks, key presses) to initiate scripts.", "Blok Events berfungsi mendeteksi aksi pemicu seperti tombol klik untuk memulai jalannya kode.")
];

console.log("Registered curated packs count:", Object.keys(CURATED_PACKS).length);

// Apply packs to questions
let replacedCount = 0;
for (const [key, pack] of Object.entries(CURATED_PACKS)) {
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
        replacedCount++;
      }
    });
  }
}

console.log(`Replaced ${replacedCount} questions with curated packs.`);

fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), 'utf8');
console.log("Updated masterQuestions.json successfully.");
