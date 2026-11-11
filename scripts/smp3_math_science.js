function makeQ(qEn, qId, optionsEn, optionsId, correctIdx, expEn, expId) {
  return { qEn, qId, optionsEn, optionsId, correctIndex: correctIdx, expEn, expId };
}

const packs = {};

// ==========================================
// SMP 3 MATH (1 theme) & SCIENCE (4 themes)
// ==========================================
packs['smp-3::math::Quadratic Equations and Functions'] = [
  makeQ(
    "What are the real roots of the quadratic equation x^2 - 5x + 6 = 0?",
    "Berapakah akar-akar real dari persamaan kuadrat x^2 - 5x + 6 = 0?",
    ["x = 2 and x = 3", "x = -2 and x = -3", "x = 1 and x = 6", "x = -1 and x = -6"],
    ["x = 2 dan x = 3", "x = -2 dan x = -3", "x = 1 dan x = 6", "x = -1 dan x = -6"],
    0,
    "Factoring (x - 2)(x - 3) = 0 yields x = 2 or x = 3.",
    "Faktorisasi (x - 2)(x - 3) = 0 menghasilkan akar x = 2 dan x = 3."
  ),
  makeQ(
    "What is the discriminant formula D for a standard quadratic equation ax^2 + bx + c = 0?",
    "Rumus diskriminan (D) untuk persamaan kuadrat ax^2 + bx + c = 0 adalah?",
    ["D = b^2 - 4ac", "D = b^2 + 4ac", "D = -b / (2a)", "D = 4ac - b^2"],
    ["D = b^2 - 4ac", "D = b^2 + 4ac", "D = -b / (2a)", "D = 4ac - b^2"],
    0,
    "The discriminant D = b^2 - 4ac determines the nature of the quadratic roots.",
    "Nilai diskriminan D = b^2 - 4ac menentukan jenis akar persamaan kuadrat."
  ),
  makeQ(
    "If the discriminant of a quadratic equation satisfies D > 0, what can be deduced about its roots?",
    "Jika nilai diskriminan suatu persamaan kuadrat bernilai D > 0, bagaimanakah sifat akar-akarnya?",
    ["Two distinct real roots (Dua akar real berbeda)", "Two identical real roots", "No real roots (imaginary)", "Only one root equal to zero"],
    ["Memiliki dua akar real yang berbeda dan nyata", "Memiliki dua akar kembar (sama)", "Tidak memiliki akar real (imajiner)", "Hanya satu akar bernilai nol"],
    0,
    "D > 0 produces two distinct real solutions via the quadratic formula.",
    "Jika D > 0, grafik memotong sumbu X di dua titik berbeda, artinya memiliki dua akar real berlainan."
  ),
  makeQ(
    "What are the coordinates of the vertex (turning point) for the parabola y = x^2 - 4x + 7?",
    "Berapakah koordinat titik puncak (ekstrim) dari grafik parabola fungsi kuadrat y = x^2 - 4x + 7?",
    ["(2, 3)", "(2, 7)", "(-2, 19)", "(4, 7)"],
    ["(2, 3)", "(2, 7)", "(-2, 19)", "(4, 7)"],
    0,
    "x_v = -b / (2a) = 4 / 2 = 2. y_v = 2^2 - 4(2) + 7 = 4 - 8 + 7 = 3. Vertex is (2, 3).",
    "Sumbu simetri x = -b / (2a) = 4 / 2 = 2. Nilai optimum y = 2^2 - 4(2) + 7 = 3. Titik puncak adalah (2, 3)."
  ),
  makeQ(
    "What is the quadratic formula used to find roots of ax^2 + bx + c = 0?",
    "Rumus kuadratik (rumus abc) untuk mencari akar-akar persamaan ax^2 + bx + c = 0 adalah?",
    ["x = (-b ± sqrt(b^2 - 4ac)) / (2a)", "x = (-b ± sqrt(b^2 + 4ac)) / a", "x = (b ± sqrt(b^2 - 4ac)) / (2a)", "x = -b / (2a)"],
    ["x = (-b ± sqrt(b^2 - 4ac)) / (2a)", "x = (-b ± sqrt(b^2 + 4ac)) / a", "x = (b ± sqrt(b^2 - 4ac)) / (2a)", "x = -b / (2a)"],
    0,
    "The quadratic formula: x = (-b ± sqrt(b^2 - 4ac)) / (2a).",
    "Rumus kuadratik abc adalah x = (-b ± sqrt(b^2 - 4ac)) / (2a)."
  ),
  makeQ(
    "What is the equation of the axis of symmetry for the quadratic function y = 2x^2 - 8x + 5?",
    "Persamaan sumbu simetri dari grafik fungsi kuadrat y = 2x^2 - 8x + 5 adalah?",
    ["x = 2", "x = 4", "x = -2", "x = -4"],
    ["x = 2", "x = 4", "x = -2", "x = -4"],
    0,
    "Axis of symmetry x = -b / (2a) = -(-8) / (2 * 2) = 8 / 4 = 2.",
    "Sumbu simetri dihitung dengan x = -b / (2a) = -(-8) / (2 × 2) = 8 / 4 = 2."
  ),
  makeQ(
    "If the coefficient of x^2 is negative (a < 0) in y = ax^2 + bx + c, which way does the parabola open?",
    "Jika nilai koefisien a pada fungsi kuadrat y = ax^2 + bx + c bernilai negatif (a < 0), ke manakah kurva parabola terbuka?",
    ["Opens downward, with a maximum turning point", "Opens upward, with a minimum point", "Opens to the right horizontally", "Forms a straight line"],
    ["Terbuka ke bawah, memiliki titik balik maksimum", "Terbuka ke atas, memiliki titik minimum", "Terbuka mendatar ke kanan", "Membentuk garis lurus"],
    0,
    "When a < 0, the quadratic curves downward toward -infinity with a local maximum apex.",
    "Jika a < 0 kurva terbuka ke arah bawah sehingga mempunyai titik puncak maksimum."
  ),
  makeQ(
    "What is the sum of the roots (x1 + x2) for the equation 2x^2 - 10x + 8 = 0 according to Vieta's formulas?",
    "Berapakah hasil penjumlahan akar-akar (x1 + x2) dari persamaan 2x^2 - 10x + 8 = 0 menurut rumus Vieta?",
    ["5", "-5", "4", "-4"],
    ["5", "-5", "4", "-4"],
    0,
    "Vieta's formula: x1 + x2 = -b / a = -(-10) / 2 = 5.",
    "Rumus penjumlahan akar x1 + x2 = -b / a = -(-10) / 2 = 5."
  ),
  makeQ(
    "What is the product of the roots (x1 * x2) for the quadratic equation 3x^2 + 7x - 12 = 0?",
    "Berapakah hasil perkalian akar-akar (x1 × x2) dari persamaan 3x^2 + 7x - 12 = 0?",
    ["-4", "4", "-7/3", "12"],
    ["-4", "4", "-7/3", "12"],
    0,
    "Vieta's formula: x1 * x2 = c / a = -12 / 3 = -4.",
    "Rumus perkalian akar x1 × x2 = c / a = -12 / 3 = -4."
  ),
  makeQ(
    "Find the roots of x^2 - 9 = 0 using difference of squares factoring.",
    "Berapakah himpunan penyelesaian dari x^2 - 9 = 0 dengan menggunakan pemfaktoran selisih dua kuadrat?",
    ["x = 3 and x = -3", "x = 9 and x = -9", "x = 3 only", "x = 0"],
    ["x = 3 dan x = -3", "x = 9 dan x = -9", "x = 3 saja", "x = 0"],
    0,
    "x^2 - 9 = (x - 3)(x + 3) = 0, so x = 3 or x = -3.",
    "x^2 - 9 difaktorkan menjadi (x - 3)(x + 3) = 0, sehingga akarnya x = 3 atau x = -3."
  )
];

packs['smp-3::science::Reproduction and Inheritance'] = [
  makeQ(
    "What type of cell division produces haploid gametes (sperm and egg cells) with half the parent chromosome number?",
    "Pembelahan sel apakah yang menghasilkan sel gamet haploid (sperma dan ovum) dengan separuh jumlah kromosom sel induk?",
    ["Meiosis", "Mitosis", "Binary fission", "Budding"],
    ["Meiosis", "Mitosis", "Pembelahan biner", "Pertunasan"],
    0,
    "Meiosis undergoes two division cycles to produce 4 non-identical haploid gametes (n = 23 in humans).",
    "Meiosis adalah pembelahan reduksi yang menghasilkan 4 sel anakan haploid (n) untuk reproduksi seksual."
  ),
  makeQ(
    "Who is celebrated as the 'Father of Modern Genetics' for his pioneering experiments breeding garden pea plants (Pisum sativum)?",
    "Siapakah tokoh yang dijuluki sebagai 'Bapak Genetika' berkat percobaannya menyilangkan tanaman kacang kapri (Pisum sativum)?",
    ["Gregor Johann Mendel", "Charles Darwin", "Louis Pasteur", "Robert Hooke"],
    ["Gregor Johann Mendel", "Charles Darwin", "Louis Pasteur", "Robert Hooke"],
    0,
    "Mendel formulated the fundamental Laws of Segregation and Independent Assortment.",
    "Gregor Mendel menemukan hukum pewarisan sifat (Hukum Pemisahan dan Asortasi Bebas) melalui persilangan kacang ercis."
  ),
  makeQ(
    "In genetics, what is the distinction between 'genotype' and 'phenotype'?",
    "Apakah perbedaan antara genotipe dan fenotipe dalam ilmu pewarisan sifat?",
    ["Genotype is the genetic allele makeup (e.g. Bb); Phenotype is the observable physical trait expressed (e.g. brown eyes)", "Phenotype is in DNA; Genotype is physical hair", "Genotype is food diet; Phenotype is blood type", "There is no difference"],
    ["Genotipe adalah susunan genetik alel (misal Bb); Fenotipe adalah sifat fisik tampak yang diekspresikan (misal warna bunga merah)", "Fenotipe adalah urutan DNA; Genotipe adalah bentuk rambut", "Keduanya sama persis tanpa perbedaan", "Genotipe selalu terlihat mata"],
    0,
    "Genotype represents the allelic DNA code; phenotype is the observable morphological expression.",
    "Genotipe adalah komposisi gen organisme (tak kasat mata); fenotipe adalah sifat fisik yang teramati."
  ),
  makeQ(
    "In a monohybrid cross between two heterozygous purple flower pea plants (Pp x Pp with purple dominant over white), what is the expected phenotypic ratio of the offspring?",
    "Pada persilangan monohibrid antara dua tanaman berbunga ungu heterozigot (Pp × Pp, ungu dominan terhadap putih), berapakah rasio fenotipe keturunannya?",
    ["3 Purple : 1 White", "1 Purple : 1 White", "1 Purple : 2 Pink : 1 White", "4 Purple : 0 White"],
    ["3 Ungu : 1 Putih", "1 Ungu : 1 Putih", "1 Ungu : 2 Merah Muda : 1 Putih", "Semua Ungu (4 : 0)"],
    0,
    "Punnett square: 1 PP (purple) : 2 Pp (purple) : 1 pp (white) = 3:1 phenotypic ratio.",
    "Bagan persilangan Mendel menghasilkan genotipe 1 PP : 2 Pp : 1 pp, yang berekspresi menjadi fenotipe 3 ungu : 1 putih."
  ),
  makeQ(
    "What is the term for an organism that possesses two identical alleles for a particular gene (such as BB or bb)?",
    "Individu yang memiliki pasangan alel yang identik/sama untuk suatu sifat tertentu (seperti BB atau bb) disebut?",
    ["Homozygous (Homozigot)", "Heterozygous", "Hemizygous", "Polygenic"],
    ["Homozigot (Homozygous)", "Heterozigot", "Hemizigot", "Poligenik"],
    0,
    "Homozygous organisms carry identical alleles at a given locus (homozygous dominant or recessive).",
    "Homozigot adalah kondisi genetik di mana kedua alel pada lokus kromosom memiliki kode yang sama persis."
  ),
  makeQ(
    "What sex chromosomes determine chromosomal sex in humans for males and females?",
    "Pasangan kromosom seks (gonosom) apakah yang menentukan jenis kelamin biologis pada manusia?",
    ["XX for females, and XY for males", "XY for females, and XX for males", "YY for males, and XX for females", "XO for both"],
    ["XX untuk perempuan, dan XY untuk laki-laki", "XY untuk perempuan, dan XX untuk laki-laki", "YY untuk laki-laki, dan XX untuk perempuan", "XO untuk keduanya"],
    0,
    "Human biological females possess two X chromosomes (XX); biological males possess one X and one Y chromosome (XY).",
    "Wanita memiliki sepasang gonosom XX, sedangkan pria memiliki satu kromosom X dan satu kromosom Y (XY)."
  ),
  makeQ(
    "In the female human reproductive system, where does normal fertilization of an egg by a sperm cell take place?",
    "Pada sistem reproduksi wanita, di manakah lokasi bertemunya sel sperma dan sel telur (tempat terjadinya fertilisasi)?",
    ["Fallopian tube / Oviduct (Tuba fallopi / Saluran telur)", "Uterus (Rahim)", "Ovary", "Cervix"],
    ["Tuba fallopi / Oviduk (Saluran telur)", "Uterus (Rahim)", "Ovarium", "Serviks"],
    0,
    "Fertilization typically occurs in the ampulla of the fallopian tube before the zygote implants in the uterine wall.",
    "Fertilisasi (pembuahan) berlangsung di dalam saluran tuba fallopi menghasilkan zigot yang akan menuju ke rahim."
  ),
  makeQ(
    "What hereditary blood clotting disorder is inherited as an X-linked recessive genetic trait?",
    "Kelainan genetik terpaut kromosom X resesif yang menyebabkan darah sukar membeku saat penderita terluka disebut?",
    ["Hemophilia (Hemofilia)", "Sickle cell anemia", "Albinism", "Down syndrome"],
    ["Hemofilia (Hemophilia)", "Anemia sel sabit", "Albinisme", "Sindrom Down"],
    0,
    "Hemophilia involves deficiency of clotting factors VIII or IX, carried on the X chromosome.",
    "Hemofilia adalah penyakit keturunan akibat mutasi gen resesif pada kromosom X sehingga tubuh kekurangan faktor pembeku darah."
  ),
  makeQ(
    "What is the structural molecular shape of DNA discovered by Watson and Crick in 1953?",
    "Apakah bentuk struktur molekul DNA yang ditemukan oleh James Watson dan Francis Crick pada tahun 1953?",
    ["Double helix (Heliks ganda)", "Single linear sheet", "Triple strand knot", "Concentric sphere"],
    ["Heliks ganda (Double helix)", "Lembaran linier tunggal", "Simpul tiga untai", "Bola konsentris"],
    0,
    "DNA is composed of two antiparallel polynucleotide chains wound into a right-handed double helix.",
    "DNA berbentuk rantai ganda berpilin (double helix) dengan pasangan basa nitrogen adenin-timin dan guanin-sitosin."
  ),
  makeQ(
    "In DNA base pairing, which nitrogenous base always pairs with Adenine (A)?",
    "Berdasarkan aturan perpasangan basa nitrogen pada molekul rantai DNA, basa Adenin (A) selalu berpasangan dengan?",
    ["Thymine (T)", "Cytosine (C)", "Guanine (G)", "Uracil (U)"],
    ["Timin (T)", "Sitosin (C)", "Guanin (G)", "Urasil (U)"],
    0,
    "In DNA, Adenine pairs with Thymine (via 2 hydrogen bonds) and Guanine pairs with Cytosine (via 3 hydrogen bonds).",
    "Adenin selalu berpasangan dengan Timin (A=T), sedangkan Guanin berpasangan dengan Sitosin (G≡C)."
  )
];

packs['smp-3::science::Electric Circuits and Magnetism'] = [
  makeQ(
    "What physical law describes the electrostatic force between two point charges (F = k * q1 * q2 / r^2)?",
    "Hukum fisika apakah yang menyatakan besar gaya tarik-menarik atau tolak-menolak antara dua muatan listrik titik?",
    ["Coulomb's Law (Hukum Coulomb)", "Ampere's Law", "Ohm's Law", "Lenz's Law"],
    ["Hukum Coulomb", "Hukum Ampere", "Hukum Ohm", "Hukum Lenz"],
    0,
    "Coulomb's Law: Electrostatic force is proportional to product of charges and inversely to square of distance.",
    "Hukum Coulomb menyatakan gaya elektrostatik sebanding dengan hasil kali muatan dan berbanding terbalik dengan kuadrat jarak: F = k·q1·q2 / r^2."
  ),
  makeQ(
    "In an electric circuit, what is the equivalent total resistance of two resistors (R1 = 6 Ohms and R2 = 3 Ohms) connected in PARALLEL?",
    "Berapakah hambatan pengganti total (Rp) dari dua buah resistor R1 = 6 Ohm dan R2 = 3 Ohm yang dirangkai secara PARALEL?",
    ["2 Ohms", "9 Ohms", "18 Ohms", "0.5 Ohms"],
    ["2 Ohm", "9 Ohm", "18 Ohm", "0,5 Ohm"],
    0,
    "1/Rp = 1/6 + 1/3 = 1/6 + 2/6 = 3/6, so Rp = 6/3 = 2 Ohms.",
    "1/Rp = 1/6 + 1/3 = 3/6, sehingga Rp = 6 / 3 = 2 Ohm."
  ),
  makeQ(
    "What fundamental magnetic rule governs the interaction between magnetic poles?",
    "Aturan dasar apakah yang berlaku pada interaksi kutub-kutub magnet?",
    ["Like poles repel each other, while opposite poles attract each other", "All magnetic poles attract all other poles", "Like poles attract and opposite repel", "North poles attract only north poles"],
    ["Kutub magnet yang senama tolak-menolak, sedangkan kutub yang tidak senama tarik-menarik", "Semua kutub magnet selalu tarik-menarik", "Kutub senama selalu tarik-menarik", "Kutub utara hanya menarik kutub utara"],
    0,
    "North repels North, South repels South; North and South attract.",
    "Kutub utara dan utara tolak-menolak; kutub utara dan selatan tarik-menarik."
  ),
  makeQ(
    "What discovery did Hans Christian Oersted make regarding electricity and magnetism in 1820?",
    "Penemuan penting apakah yang dibuktikan oleh Hans Christian Oersted pada tahun 1820 terkait listrik dan magnet?",
    ["An electric current flowing through a conductor creates an encircling magnetic field", "Magnets destroy electric current", "Electricity only flows through ice", "Static electricity stops time"],
    ["Kawat penghantar yang dialiri arus listrik akan menghasilkan medan magnet di sekitarnya", "Magnet mematikan arus listrik", "Listrik hanya mengalir di es", "Listrik statis menghentikan waktu"],
    0,
    "Oersted observed that a compass needle deflects when placed near a current-carrying wire.",
    "Percobaan Oersted membuktikan bahwa arus listrik menimbulkan medan magnet di sekeliling kawat penghantar."
  ),
  makeQ(
    "How can you substantially increase the magnetic strength of an electromagnet coil (solenoid)?",
    "Bagaimanakah cara memperkuat medan magnet pada kumparan kawat elektromagnet (solenoida)?",
    ["Increase the number of coil turns, increase the electric current, and insert a ferromagnetic soft iron core", "Decrease the electric current to zero", "Unwind the wire into a straight line", "Cool it in boiling water"],
    ["Memperbanyak jumlah lilitan kawat, memperbesar kuat arus listrik, dan menyisipkan inti besi lunak", "Mematikan arus listrik menjadi nol", "Meluruskan kawat", "Merendam dalam air mendidih"],
    0,
    "B = mu * n * I. More turns (n), higher current (I), and iron core permeability amplify magnetic flux.",
    "Kekuatan elektromagnetik meningkat seiring bertambahnya jumlah lilitan, kuat arus, dan penggunaan inti besi lunak."
  ),
  makeQ(
    "What physical principle explains how moving a magnet through a wire coil induces an electric current (Faraday's Law)?",
    "Prinsip fisika apakah yang menjelaskan timbulnya arus listrik saat magnet digerakkan keluar-masuk kumparan kawat?",
    ["Electromagnetic Induction (Induksi Elektromagnetik)", "Static neutralization", "Thermonuclear fusion", "Capacitive resistance"],
    ["Induksi Elektromagnetik (Electromagnetic Induction)", "Netralisasi statis", "Fisi termonuklir", "Hambatan kapasitif"],
    0,
    "A changing magnetic flux through a conducting circuit induces an electromotive force (EMF).",
    "Perubahan jumlah garis gaya magnet yang memotong kumparan menghasilkan gaya gerak listrik (GGL) induksi."
  ),
  makeQ(
    "In an electrical transformer, what equation relates the primary and secondary voltages (Vp, Vs) to their coil turns (Np, Ns)?",
    "Pada transformator (trafo) ideal, bagaimanakah hubungan matematis antara tegangan primer dan sekunder terhadap jumlah lilitan kumparannya?",
    ["Vp / Vs = Np / Ns", "Vp * Np = Vs * Ns", "Vp / Vs = Ns / Np", "Vp + Vs = Np + Ns"],
    ["Vp / Vs = Np / Ns", "Vp * Np = Vs * Ns", "Vp / Vs = Ns / Np", "Vp + Vs = Np + Ns"],
    0,
    "Voltage ratio directly equals turns ratio: Vp / Vs = Np / Ns.",
    "Perbandingan tegangan primer dan sekunder sebanding lurus dengan perbandingan jumlah lilitan: Vp / Vs = Np / Ns."
  ),
  makeQ(
    "A step-down transformer reduces voltage from 220 V to 11 V. If the primary coil has 1,000 turns, how many turns are on the secondary coil?",
    "Sebuah trafo step-down menurunkan tegangan dari 220 V menjadi 11 V. Jika lilitan primer berjumlah 1.000 lilitan, berapakah jumlah lilitan sekunder?",
    ["50 turns", "200 turns", "20 turns", "500 turns"],
    ["50 lilitan", "200 lilitan", "20 lilitan", "500 lilitan"],
    0,
    "Ns = Np * (Vs / Vp) = 1,000 * (11 / 220) = 1,000 / 20 = 50 turns.",
    "Ns = Np × (Vs / Vp) = 1.000 × (11 / 220) = 50 lilitan."
  ),
  makeQ(
    "What magnetic rule uses the thumb (motion/force), index finger (magnetic field), and middle finger (current) to determine electromagnetic force direction?",
    "Aturan tangan kanan Fleming atau kaidah tangan kanan fisika manakah yang digunakan untuk menentukan arah gaya Lorentz pada kawat berarus dalam medan magnet?",
    ["Right-Hand Rule for Lorentz Force", "Newton's gravitation compass", "Hooke's tension fingers", "Archimedes float grip"],
    ["Kaidah Tangan Kanan untuk Gaya Lorentz", "Kompas gravitasi Newton", "Jari tegangan Hooke", "Genggaman apung Archimedes"],
    0,
    "The Right-Hand Rule shows Lorentz force F = I * L x B (thumb points in force, fingers in field B, palm/middle in current I).",
    "Kaidah tangan kanan: Ibu jari menunjukkan arah arus (I), jari telunjuk arah medan magnet (B), dan telapak tangan/jari tengah arah gaya Lorentz (F)."
  ),
  makeQ(
    "Which geological layer of Earth generates our planet's global protective magnetic field (magnetosphere)?",
    "Lapisan dalam Bumi manakah yang pergerakan konveksi cairan besinya menghasilkan medan magnet pelindung Bumi?",
    ["The liquid outer core of molten iron and nickel (geodynamo)", "The solid granite continental crust", "The atmospheric ozone layer", "The ocean ocean trenches"],
    ["Inti luar Bumi (Outer core) yang tersusun atas cairan besi dan nikel yang bergolak dinamis", "Kerak benua granit padat", "Lapisan ozon stratosfer", "Palung dasar samudra"],
    0,
    "Convection currents in the liquid iron-nickel outer core create the geodynamo that sustains Earth's magnetic dipole.",
    "Efek dinamo bumi tercipta dari perputaran dan konveksi lelehan besi-nikel di inti luar Bumi menghasilkan medan magnet bumi."
  )
];

packs['smp-3::science::Chemical Reactions and Changes in Matter'] = [
  makeQ(
    "What fundamental chemical principle is stated by the Law of Conservation of Mass (Lavoisier's Law)?",
    "Prinsip kimia dasar apakah yang dinyatakan oleh Hukum Kekekalan Massa (Hukum Lavoisier)?",
    ["In a closed system, the total mass of reactants before a reaction equals the total mass of products after the reaction", "Mass always disappears into heat", "Atoms split into pure light", "Mass doubles when burned"],
    ["Dalam sistem tertutup, massa total zat sebelum reaksi selalu sama dengan massa total zat hasil reaksi", "Massa selalu musnah menjadi panas", "Atom melebur menjadi cahaya", "Massa berlipat ganda saat dibakar"],
    0,
    "Lavoisier demonstrated that chemical reactions rearrange atoms without creating or annihilating matter.",
    "Hukum Lavoisier menyatakan bahwa dalam ruang tertutup massa zat sebelum dan sesudah reaksi kimia adalah tetap/sama."
  ),
  makeQ(
    "What pH value defines a chemically neutral aqueous solution at 25 degrees Celsius?",
    "Berapakah nilai derajat keasaman (pH) dari larutan air yang bersifat netral pada suhu 25 derajat Celsius?",
    ["pH = 7", "pH = 0", "pH = 14", "pH = 1"],
    ["pH = 7", "pH = 0", "pH = 14", "pH = 1"],
    0,
    "At 25 degrees Celsius, pure water has [H+] = [OH-] = 10^-7 M, yielding a neutral pH of 7.",
    "Pada suhu 25°C, larutan netral memiliki konsentrasi ion H+ dan OH- yang seimbang sehingga nilai pH-nya tepat 7."
  ),
  makeQ(
    "What chemical term describes a reaction that releases thermal heat energy into its surroundings, causing temperature to rise?",
    "Reaksi kimia yang melepaskan kalor/panas ke lingkungan sehingga suhu sistem mengalami kenaikan disebut?",
    ["Exothermic reaction (Reaksi eksoterm)", "Endothermic reaction", "Photolytic reaction", "Nuclear fission"],
    ["Reaksi eksoterm (Exothermic)", "Reaksi endoterm", "Reaksi fotolisis", "Fisi nuklir"],
    0,
    "Exothermic reactions (like combustion) release enthalpy (Delta H < 0), warming surrounding media.",
    "Reaksi eksoterm melepaskan energi panas ke lingkungan (contoh: pembakaran dan pencampuran kapur tohor dengan air)."
  ),
  makeQ(
    "What type of chemical reaction absorbs thermal energy from its surroundings, causing the container to feel cold?",
    "Reaksi kimia yang menyerap kalor dari lingkungan sehingga wadah campuran terasa dingin disebut?",
    ["Endothermic reaction (Reaksi endoterm)", "Exothermic reaction", "Precipitation explosion", "Oxidation burning"],
    ["Reaksi endoterm (Endothermic)", "Reaksi eksoterm", "Ledakan pengendapan", "Pembakaran oksidasi"],
    0,
    "Endothermic reactions (like dissolving ammonium nitrate) absorb ambient heat (Delta H > 0).",
    "Reaksi endoterm menyerap kalor dari lingkungan (contoh: es mencair atau reaksi fotosintesis)."
  ),
  makeQ(
    "What are the products formed in an acid-base neutralization reaction between hydrochloric acid (HCl) and sodium hydroxide (NaOH)?",
    "Apakah produk zat yang dihasilkan dari reaksi netralisasi antara asam klorida (HCl) dan natrium hidroksida (NaOH)?",
    ["Sodium chloride salt (NaCl) and water (H2O)", "Chlorine gas and hydrogen peroxide", "Sodium metal and pure acid", "Carbon dioxide and oxygen"],
    ["Garam natrium klorida (NaCl) dan air (H2O)", "Gas klorin dan hidrogen peroksida", "Logam natrium dan asam murni", "Gas karbon dioksida dan oksigen"],
    0,
    "HCl + NaOH -> NaCl + H2O: An acid and base react to form an ionic salt and water.",
    "Reaksi asam kuat dan basa kuat menghasilkan garam netral dan air: HCl + NaOH -> NaCl + H2O."
  ),
  makeQ(
    "Which subatomic particles are shared between two nonmetal atoms to form a covalent chemical bond?",
    "Partikel subatomik apakah yang digunakan secara bersama-sama oleh dua atom nonlogam untuk membentuk ikatan kovalen?",
    ["Valence electrons (Elektron valensi)", "Protons in the nucleus", "Neutrons", "Alpha particles"],
    ["Elektron valensi", "Proton di inti atom", "Neutron", "Partikel alfa"],
    0,
    "Covalent bonds involve shared valence electron pairs to attain stable octet configurations.",
    "Ikatan kovalen terbentuk melalui penggunaan bersama pasangan elektron valensi oleh atom-atom yang berikatan."
  ),
  makeQ(
    "What color does blue litmus paper turn when dipped into an acidic solution (pH < 7)?",
    "Apakah perubahan warna yang terjadi pada kertas lakmus biru saat dicelupkan ke dalam larutan yang bersifat asam (pH < 7)?",
    ["Turns red", "Remains blue", "Turns bright green", "Turns yellow"],
    ["Berubah menjadi warna merah", "Tetap berwarna biru", "Berubah menjadi hijau cerah", "Berubah menjadi kuning"],
    0,
    "Acids turn blue litmus paper red; bases turn red litmus paper blue.",
    "Larutan asam selalu memerahkan kertas lakmus biru, sedangkan larutan basa membirukan kertas lakmus merah."
  ),
  makeQ(
    "Balance the chemical equation: 2H2 + O2 -> ___ H2O. What coefficient balances water?",
    "Setarakan persamaan reaksi kimia berikut: 2H2 + O2 -> ___ H2O. Berapakah koefisien air yang tepat?",
    ["2", "1", "4", "3"],
    ["2", "1", "4", "3"],
    0,
    "2H2 (4 H) + O2 (2 O) yields 2H2O (4 H and 2 O), conserving all atoms.",
    "Persamaan setara adalah 2H2 + O2 -> 2H2O sehingga jumlah atom H di kiri dan kanan sama-sama 4 dan O sama-sama 2."
  ),
  makeQ(
    "What is a chemical substance that speeds up the rate of a chemical reaction without being consumed itself?",
    "Zat kimia yang berfungsi mempercepat laju reaksi kimia dengan cara menurunkan energi aktivasi tanpa ikut habis bereaksi disebut?",
    ["Catalyst (Katalis)", "Solvent", "Inhibitor", "Precipitate"],
    ["Katalis (Catalyst)", "Pelarut", "Inhibitor", "Endapan"],
    0,
    "Catalysts provide an alternative reaction pathway with lower activation energy, accelerating kinetics.",
    "Katalis menurunkan energi aktivasi sehingga reaksi berlangsung jauh lebih cepat tanpa mengubah produk akhir."
  ),
  makeQ(
    "What type of chemical reaction is represented by the equation: Fe + CuSO4 -> FeSO4 + Cu?",
    "Termasuk jenis reaksi kimia apakah persamaan berikut: Fe + CuSO4 -> FeSO4 + Cu?",
    ["Single displacement reaction (Reaksi pendesakan tunggal)", "Combination reaction", "Decomposition reaction", "Double neutralization"],
    ["Reaksi pendesakan tunggal (Single displacement)", "Reaksi penggabungan", "Reaksi penguraian", "Netralisasi ganda"],
    0,
    "More reactive iron displaces copper cations from the copper sulfate solution.",
    "Besi (Fe) yang lebih reaktif mendesak ion tembaga (Cu) keluar dari senyawanya membentuk FeSO4 dan endapan Cu."
  )
];

packs['smp-3::science::The Solar System, Gravity, and the Universe'] = [
  makeQ(
    "What physical law formulated by Sir Isaac Newton states that every particle attracts every other particle with a force proportional to their masses and inverse to distance squared?",
    "Hukum fisika apakah yang menyatakan bahwa setiap benda di alam semesta saling tarik-menarik dengan gaya yang sebanding dengan hasil kali massanya dan berbanding terbalik dengan kuadrat jaraknya?",
    ["Newton's Law of Universal Gravitation (F = G * m1 * m2 / r^2)", "Kepler's Second Law", "Einstein's Special Relativity", "Hooke's Spring Law"],
    ["Hukum Gravitasi Universal Newton (F = G·m1·m2 / r^2)", "Hukum II Kepler", "Relativitas Khusus Einstein", "Hukum Pegas Hooke"],
    0,
    "Newton's Universal Gravitation: F = G * (m1 * m2) / r^2.",
    "Hukum Gravitasi Universal menyatakan gaya gravitasi antar dua benda sebanding dengan perkalian massa dan berbanding terbalik dengan kuadrat jarak."
  ),
  makeQ(
    "What shape are planetary orbits around the Sun according to Kepler's First Law of Planetary Motion?",
    "Bagaimanakah bentuk lintasan orbit planet-planet saat mengitari Matahari menurut Hukum I Kepler?",
    ["Elliptical orbits with the Sun located at one of the two foci", "Perfect geometric circles with the Sun at the center", "Square orbits with rounded corners", "Parabolic open paths"],
    ["Berbentuk elips dengan Matahari berada di salah satu titik fokusnya", "Berbentuk lingkaran bulat sempurna dengan Matahari di pusat", "Berbentuk bujur sangkar", "Berbentuk parabola terbuka"],
    0,
    "Kepler's First Law: Planets orbit in ellipses with the Sun at one focal point.",
    "Hukum I Kepler menyatakan bahwa orbit setiap planet adalah elips dengan matahari berada di salah satu fokusnya."
  ),
  makeQ(
    "According to Kepler's Second Law, where in its orbit does a planet travel at its highest orbital velocity?",
    "Berdasarkan Hukum II Kepler, di manakah posisi planet saat bergerak dengan kelajuan orbit paling cepat?",
    ["At perihelion (the point in its orbit closest to the Sun)", "At aphelion (the point farthest from the Sun)", "Speed is completely constant everywhere", "When crossing the equator"],
    ["Di titik perihelion (posisi orbit yang paling dekat dengan Matahari)", "Di titik aphelion (posisi paling jauh dari Matahari)", "Kecepatannya selalu konstan sama persis", "Saat melintasi khatulistiwa"],
    0,
    "Gravitational attraction is greatest at perihelion, causing the planet to sweep equal areas in equal times at higher speed.",
    "Di perihelion jarak planet ke matahari paling dekat sehingga gaya gravitasi paling kuat dan kelajuan orbit mencapai maksimum."
  ),
  makeQ(
    "What astronomical alignment of the Sun, Moon, and Earth creates a Solar Eclipse (Gerhana Matahari)?",
    "Susunan konfigurasi astronomis apakah yang menyebabkan terjadinya Gerhana Matahari di Bumi?",
    ["Sun - Moon - Earth in a straight line (Moon casts its shadow onto Earth)", "Sun - Earth - Moon in a line", "Earth - Sun - Moon", "Moon - Sun - Earth"],
    ["Matahari - Bulan - Bumi dalam satu garis lurus (bayangan Bulan jatuh ke permukaan Bumi)", "Matahari - Bumi - Bulan dalam satu garis", "Bumi - Matahari - Bulan", "Bulan - Matahari - Bumi"],
    0,
    "A solar eclipse occurs when the Moon passes directly between the Sun and Earth, blocking sunlight.",
    "Gerhana Matahari terjadi saat posisi Bulan berada tepat di antara Matahari dan Bumi pada fase bulan baru."
  ),
  makeQ(
    "What primary celestial gravitational interaction generates the regular ocean tides on Earth?",
    "Gaya gravitasi benda langit manakah yang memberikan pengaruh paling dominan terhadap peristiwa pasang surut air laut di Bumi?",
    ["The Moon's gravitational pull (and secondarily the Sun's pull)", "Jupiter's magnetic pull", "Mars atmospheric wind", "Asteroid belt friction"],
    ["Gaya gravitasi Bulan (dibantu sekunder oleh gravitasi Matahari)", "Gravitasi planet Jupiter", "Angin atmosfer Mars", "Gesekan sabuk asteroid"],
    0,
    "The Moon's proximity creates differential gravitational tidal bulges in Earth's oceans.",
    "Meskipun massa matahari lebih besar, jarak Bulan yang sangat dekat menjadikannya penyebab utama pasang surut air laut di bumi."
  ),
  makeQ(
    "What type of ocean tide occurs during New Moon and Full Moon when the Sun, Moon, and Earth align linearly?",
    "Jenis pasang air laut tertinggi yang terjadi saat fase Bulan Baru dan Bulan Purnama ketika posisi Matahari, Bulan, dan Bumi segaris disebut?",
    ["Spring tide (Pasang Purnama / Spring Tide)", "Neap tide (Pasang Perbani)", "Ebb tide", "Tsunami surge"],
    ["Pasang Purnama (Spring Tide)", "Pasang Perbani (Neap Tide)", "Surut total", "Gelombang tsunami"],
    0,
    "Spring tides occur when solar and lunar tidal vectors combine constructively, maximizing tidal range.",
    "Pasang purnama (spring tide) menghasilkan pasang tertinggi dan surut terendah karena gravitasi bulan dan matahari saling memperkuat."
  ),
  makeQ(
    "Which planet in our solar system has the greatest mass, diameter, and strongest surface gravity?",
    "Planet manakah di tata surya kita yang memiliki massa terbesar, ukuran paling raksasa, dan gravitasi permukaan paling kuat?",
    ["Jupiter", "Saturn", "Neptune", "Earth"],
    ["Jupiter", "Saturnus", "Neptunus", "Bumi"],
    0,
    "Jupiter is a gas giant with over 317 times Earth's mass, containing more mass than all other planets combined.",
    "Jupiter adalah planet terbesar di tata surya dengan massa 2,5 kali total massa seluruh planet lain digabungkan."
  ),
  makeQ(
    "What lies in the vast interplanetary space between the orbits of Mars and Jupiter?",
    "Objek langit apakah yang banyak mengorbit pada ruang antara lintasan orbit planet Mars dan Jupiter?",
    ["The Main Asteroid Belt (Sabuk Asteroid)", "The Kuiper Belt", "The Oort Cloud", "Black holes"],
    ["Sabuk Asteroid Utama (Asteroid Belt)", "Sabuk Kuiper", "Awan Oort", "Lubang hitam"],
    0,
    "The asteroid belt contains millions of rocky planetesimals (like Ceres and Vesta) prevented from accreting by Jupiter.",
    "Sabuk Asteroid utama terletak di antara orbit Mars dan Jupiter, memuat batuan antariksa sisa pembentukan tata surya."
  ),
  makeQ(
    "What type of galaxy is our home galaxy, the Milky Way (Bima Sakti)?",
    "Berdasarkan bentuk morfologinya, termasuk jenis galaksi apakah galaksi tempat tata surya kita berada (Bima Sakti)?",
    ["Barred spiral galaxy (Galaksi spiral berbatang)", "Elliptical galaxy", "Irregular galaxy", "Ring galaxy"],
    ["Galaksi spiral berbatang (Barred spiral)", "Galaksi elips", "Galaksi tak beraturan", "Galaksi cincin"],
    0,
    "The Milky Way is a barred spiral galaxy (SBbc) spanning approximately 100,000 light-years in diameter.",
    "Galaksi Bima Sakti berbentuk spiral berbatang dengan lengan-lengan bintang yang berputar mengelilingi pusat galaksi."
  ),
  makeQ(
    "What cosmological theory explains the origin and expansion of the universe from an extremely hot, dense point approximately 13.8 billion years ago?",
    "Teori kosmologi modern apakah yang menyatakan bahwa alam semesta bermula dari ledakan kerapatan singularitas maha dahsyat sekitar 13,8 miliar tahun lalu?",
    ["The Big Bang Theory (Teori Ledakan Dahsyat)", "Steady State Theory", "Oscillating Universe Theory", "Ptolemaic Geocentric Model"],
    ["Teori Big Bang (Ledakan Dahsyat)", "Teori Keadaan Tunak (Steady State)", "Teori Berayun", "Model Geosentris Ptolemaeus"],
    0,
    "The Big Bang Theory is supported by Hubble cosmic expansion and the Cosmic Microwave Background (CMB).",
    "Teori Big Bang didukung oleh bukti pemuaian ruang alam semesta dan radiasi latar belakang gelombang mikro kosmis (CMBR)."
  )
];

module.exports = packs;
