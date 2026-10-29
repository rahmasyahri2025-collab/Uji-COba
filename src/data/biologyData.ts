import {
  CiriMakhlukHidup,
  KingdomInfo,
  PostTestQuestion,
  TaksonLevel,
  TGTQuestion,
  TGTTeam,
} from '../types/biology';
import { DichotomyStep } from '../utils/biologyLogic';

export const APERSEPSI_CASES = [
  {
    id: 'supermarket',
    title: 'Analogi Supermarket: Apa yang Terjadi Jika Tanpa Klasifikasi?',
    badge: 'Tantangan Nalar 1',
    description:
      'Bayangkan kamu masuk ke supermarket sebesar lapangan sepak bola dengan 100.000 jenis barang. Namun pengelola mencampurkan sabun cuci, daging segar, susu formula, pensil, dan sayur kol dalam satu rak acak tanpa label!',
    pertanyaanKritis:
      'Berapa lama waktu yang kamu perlukan hanya untuk mencari sebotol kecap manis? Apa dampaknya jika ilmuwan tidak mengelompokkan 8,7 juta spesies makhluk hidup di bumi?',
    refleksi:
      'Klasifikasi adalah kebutuhan dasar manusia untuk menertibkan keteraturan (order out of chaos). Dengan klasifikasi, kita langsung tahu bahwa kecap ada di lorong bumbu dapur, sebagaimana paus dicari di kelompok mamalia, bukan serangga!',
  },
  {
    id: 'paus',
    title: 'Paradoks Hewan Air: Mengapa Paus Bukan Ikan?',
    badge: 'Tantangan Nalar 2',
    description:
      'Paus hidup di samudra luas, berenang lincah menggunakan sirip, dan bentuk tubuhnya mirip hiu. Tetapi mengapa para biolog bersikeras bahwa paus adalah MAMALIA, sekelompok dengan kucing dan manusia?',
    pertanyaanKritis:
      'Bukankah tinggal di air dan punya sirip cukup untuk disebut ikan? Manakah kriteria klasifikasi yang lebih mendasar: tempat hidup atau struktur organ reproduksi & pernapasan?',
    refleksi:
      'Paus bernapas dengan paru-paru (harus naik ke permukaan mengambil udara), melahirkan anak (vivipar), berdarah panas (homoioterm), dan memiliki kelenjar susu (glandula mammae). Ciri reproduksi dan fisiologi internal jauh lebih mendalam daripada sekadar habitat!',
  },
  {
    id: 'jamur',
    title: 'Misteri Jamur: Mengapa Jamur Dikeluarkan dari Dunia Tumbuhan?',
    badge: 'Tantangan Nalar 3',
    description:
      'Jamur tumbuh tegak menancap di tanah atau kayu lapuk, tidak bisa berjalan-jalan seperti hewan. Dulu jamur dianggap tumbuhan primitif, namun kini memiliki kingdom sendiri (Fungi).',
    pertanyaanKritis:
      'Jika jamur tidak berjalan, mengapa ia bukan tumbuhan? Apakah memiliki klorofil adalah harga mati bagi tumbuhan?',
    refleksi:
      'Jamur TIDAK memiliki klorofil sehingga TIDAK BISA fotosintesis (bersifat heterotrof absorptif). Dinding sel jamur tersusun atas zat kitin (seperti cangkang kepiting), sedangkan tumbuhan tersusun atas selulosa. Jamur secara genetik justru lebih dekat ke hewan daripada tumbuhan!',
  },
  {
    id: 'kelelawar',
    title: 'Sayap Kelelawar: Mengapa Bukan Golongan Burung?',
    badge: 'Tantangan Nalar 4',
    description:
      'Kelelawar menghabiskan malam terbang di angkasa menangkap serangga atau buah. Sayapnya terbentang lebar, tapi mengapa tidak masuk kelompok Aves (Burung)?',
    pertanyaanKritis:
      'Apa perbedaan nyata antara sayap kelelawar dan sayap burung jika dilihat dari struktur anatomi dan penutup tubuhnya?',
    refleksi:
      'Sayap kelelawar terbentuk dari selaput kulit (patagium) yang membentang di sela-sela jari tangan mamalia, tubuhnya berambut (bukan berbulu/feather), memiliki daun telinga, melahirkan, serta menyusui anaknya.',
  },
];

export const CIRI_MAKHLUK_HIDUP_DATA: CiriMakhlukHidup[] = [
  {
    id: 'bernapas',
    nama: 'Bernapas (Respirasi)',
    icon: 'Wind',
    deskripsi:
      'Proses menghirup oksigen (O2) untuk memecah molekul glukosa menjadi energi (ATP) dan melepaskan karbon dioksida (CO2) serta uap air.',
    contoh:
      'Manusia dan mamalia bernapas dengan paru-paru, ikan dengan insang, serangga dengan trakea, tumbuhan bernapas melalui stomata dan lentisel.',
    pertanyaanKritis: 'Apakah tumbuhan juga bernapas saat malam hari ketika tidak ada sinar matahari?',
    jawabanKritis:
      'Ya! Tumbuhan bernapas (respirasi) sepanjang waktu 24 jam nonstop menghirup O2 dan melepaskan CO2. Bedanya, di siang hari laju fotosintesis jauh lebih besar dari respirasi sehingga menghasilkan surplus oksigen.',
  },
  {
    id: 'nutrisi',
    nama: 'Memerlukan Nutrisi (Makan & Minum)',
    icon: 'Apple',
    deskripsi:
      'Setiap organisme membutuhkan asupan zat hara dan energi untuk memelihara metabolisme, memperbaiki jaringan rusak, dan melakukan aktivitas hidup.',
    contoh:
      'Tumbuhan bersifat autotrof (membuat makanan sendiri lewat fotosintesis), sedangkan hewan dan manusia bersifat heterotrof (bergantung pada organisme lain).',
    pertanyaanKritis: 'Mengapa kantong semar memakan serangga padahal daunnya berwarna hijau?',
    jawabanKritis:
      'Kantong semar tetap fotosintesis untuk sumber karbohidrat, namun hidup di tanah gambut yang miskin unsur Nitrogen (N). Serangga dicerna untuk memenuhi kebutuhan nitrogen sintesis protein.',
  },
  {
    id: 'bergerak',
    nama: 'Bergerak (Mobilitas & Gerak Bagian Tubuh)',
    icon: 'Activity',
    deskripsi:
      'Gerak dapat berupa berpindah tempat (gerak aktif pada hewan/manusia) maupun perubahan posisi bagian tubuh tertentu (gerak pasif pada tumbuhan).',
    contoh:
      'Harimau berlari mengejar mangsa; Daun putri malu (Mimosa pudica) mengatup saat disentuh (seismonasti); ujung batang tanaman membengkok ke arah cahaya (fototropisme).',
    pertanyaanKritis: 'Apakah tanaman yang menempel di pot diam itu benar-benar bergerak?',
    jawabanKritis:
      'Tumbuhan selalu bergerak mikroskopis dan makroskopis, misalnya aliran sitoplasma di dalam sel, akar yang menembus tanah mencari air, dan sulur tanaman yang melilit tiang penyangga.',
  },
  {
    id: 'iritabilitas',
    nama: 'Peka Terhadap Rangsang (Iritabilitas)',
    icon: 'Zap',
    deskripsi:
      'Kemampuan makhluk hidup untuk merespons stimulus/rangsang dari lingkungan sekitar (cahaya, panas, dingin, sentuhan, zat kimia, gravitasi, suara).',
    contoh:
      'Pupil mata manusia mengecil saat terkena sinar terang lampu; cacing tanah menjauhi cahaya; anjing menggoyangkan telinga mendengar bunyi berfrekuensi tinggi.',
    pertanyaanKritis: 'Bagaimana tumbuhan merespons rangsang tanpa memiliki sistem saraf dan otak?',
    jawabanKritis:
      'Tumbuhan memanfaatkan hormon (seperti auksin, sitokinin, asam absisat) dan perubahan tekanan turgor cairan seluler pada bantalan daun (pulvinus).',
  },
  {
    id: 'tumbuh_berkembang',
    nama: 'Tumbuh dan Berkembang',
    icon: 'TrendingUp',
    deskripsi:
      'Tumbuh: pertambahan ukuran, tinggi, volume, dan massa sel yang bersifat kuantitatif dan ireversibel (tidak dapat kembali). Berkembang: proses menuju kedewasaan dan diferensiasi seluler (kualitatif).',
    contoh:
      'Biji berkecambah -> bibit -> pohon berbunga -> berbuah; Zigot -> embrio -> bayi -> anak-anak -> dewasa matang.',
    pertanyaanKritis: 'Mengapa es batu yang bertambah besar di freezer tidak disebut makhluk hidup yang tumbuh?',
    jawabanKritis:
      'Pertambahan es batu terjadi secara eksternal (akresi fisik dari luar), bukan dari pembelahan dan diferensiasi sel internal berbasis informasi genetika (DNA/RNA).',
  },
  {
    id: 'reproduksi',
    nama: 'Berkembang Biak (Reproduksi)',
    icon: 'Heart',
    deskripsi:
      'Kemampuan organisme menghasilkan keturunan baru yang sejenis demi menjaga kelestarian spesies agar tidak punah.',
    contoh:
      'Secara generatif/seksual (peleburan sel sperma dan ovum pada hewan/tumbuhan berbiji) dan vegetatif/aseksual (tunas pada pisang/Hydra, membelah diri pada Amoeba).',
    pertanyaanKritis: 'Apakah seekor bagal (mule - persilangan kuda dan keledai) yang mandul masih disebut makhluk hidup?',
    jawabanKritis:
      'Ya! Reproduksi adalah ciri populasi/spesies untuk bertahan jangka panjang. Suatu individu yang steril tetap makhluk hidup karena memenuhi 7 ciri kehidupan lainnya.',
  },
  {
    id: 'ekskresi',
    nama: 'Mengeluarkan Zat Sisa (Ekskresi)',
    icon: 'Droplet',
    deskripsi:
      'Pengeluaran sisa-sisa hasil metabolisme kimiawi tubuh yang bersifat racun jika dibiarkan menumpuk di dalam tubuh.',
    contoh:
      'Manusia berkeringat (kulit), buang air kecil (ginjal), menghembuskan CO2 (paru-paru), dan empedu (hati). Tumbuhan melalui gutasi dan gugurnya daun tua.',
    pertanyaanKritis: 'Apakah buang air besar (defekasi) sama dengan ekskresi?',
    jawabanKritis:
      'Berbeda! Defekasi adalah pengeluaran sisa makanan yang tidak dicerna oleh saluran pencernaan (feses). Ekskresi adalah pengeluaran sisa hasil metabolisme sel (seperti urea, keringat, CO2).',
  },
  {
    id: 'adaptasi',
    nama: 'Menyesuaikan Diri (Adaptasi)',
    icon: 'Shield',
    deskripsi:
      'Kemampuan organisme menyesuaikan struktur morfologi, faal fisiologi, atau tingkah laku dengan lingkungannya agar dapat bertahan hidup.',
    contoh:
      'Kaktus berdaun duri dan batang tebal berlapis lilin di gurun; beruang kutub berbulu tebal dan lapisan lemak; bunglon melakukan mimikri perubahan warna kulit.',
    pertanyaanKritis: 'Apa yang terjadi pada makhluk hidup yang gagal beradaptasi saat iklim berubah drastis?',
    jawabanKritis:
      'Jika organisme gagal beradaptasi dan gagal bermigrasi, populasi akan menyusut drastis dan spesies tersebut terancam kepunahan (seperti punahnya dinosaurus dan mammoth).',
  },
];

export const MANFAAT_KLASIFIKASI = [
  {
    nomor: '01',
    judul: 'Menyederhanakan Objek Studi',
    detail:
      'Miliaran organisme yang ada di bumi tidak mungkin dipelajari satu per satu. Dengan mengelompokkan organisme berdasarkan persamaan ciri, mempelajari satu wakil kelompok sudah memberi gambaran umum seluruh anggota kelompok tersebut.',
    ilustrasi: 'Mempelajari ciri harimau cukup untuk memahami kerangka dasar felidae (kucing-kucingan).',
  },
  {
    nomor: '02',
    judul: 'Mengetahui Hubungan Kekerabatan',
    detail:
      'Makin banyak persamaan ciri morfologi, anatomi, dan kode genetik (DNA) antara dua organisme, makin dekat hubungan kekerabatannya, menandakan nenek moyang bersama yang lebih dekat.',
    ilustrasi: 'Kucing rumah lebih dekat kekerabatannya dengan singa daripada dengan anjing serigala.',
  },
  {
    nomor: '03',
    judul: 'Mengetahui Manfaat Praktis Bagi Manusia',
    detail:
      'Klasifikasi mempermudah eksplorasi potensi organisme: mana yang berguna sebagai bahan pangan, rempah obat-obatan, sandang serat, bahan bangunan, maupun organisme pengurai hayati.',
    ilustrasi: 'Keluarga temu-temuan (Zingiberaceae) seperti jahe, kunyit, kencur terbukti kaya metabolit sekunder obat.',
  },
  {
    nomor: '04',
    judul: 'Mendukung Konservasi dan Pelestarian Hayati',
    detail:
      'Dengan klasifikasi yang jelas, para ilmuwan dan pemerintah dapat mengidentifikasi spesies endemik langka yang terancam punah sehingga program suaka alam dan penangkaran tepat sasaran.',
    ilustrasi: 'Identifikasi Badak Jawa (Rhinoceros sondaicus) dan Komodo (Varanus komodoensis) di habitat aslinya.',
  },
];

export const DICHOTOMOUS_KEY_DATABASE: Record<string, DichotomyStep> = {
  '1': {
    id: '1',
    codeA: '1a',
    textA: 'Memiliki tulang belakang (Vertebrata)',
    targetA: '2',
    codeB: '1b',
    textB: 'Tidak memiliki tulang belakang (Avertebrata / Invertebrata)',
    targetB: '5',
  },
  '2': {
    id: '2',
    codeA: '2a',
    textA: 'Suhu tubuh konstan / berdarah panas (Homoioterm)',
    targetA: '3',
    codeB: '2b',
    textB: 'Suhu tubuh berubah mengikuti lingkungan / berdarah dingin (Poikiloterm)',
    targetB: '4',
  },
  '3': {
    id: '3',
    codeA: '3a',
    textA: 'Tubuh ditutupi rambut, melahirkan, menyusui (Mamalia)',
    targetA: 'Kucing (Felis catus)',
    codeB: '3b',
    textB: 'Tubuh ditutupi bulu (feather), memiliki paruh, bertelur (Aves)',
    targetB: 'Elang (Aquila chrysaetos)',
  },
  '4': {
    id: '4',
    codeA: '4a',
    textA: 'Tubuh ditutupi sisik berlendir, bernapas dengan insang seumur hidup, hidup di air (Pisces)',
    targetA: 'Ikan Mas (Cyprinus carpio)',
    codeB: '4b',
    textB: 'Kulit selalu basah berlendir tanpa sisik, fase larva di air dengan insang, dewasa di darat dengan paru-paru & kulit (Amfibi)',
    targetB: 'Katak Sawah (Fejervarya cancrivora)',
  },
  '5': {
    id: '5',
    codeA: '5a',
    textA: 'Hewan dengan tubuh berbuku-buku, memiliki 3 pasang kaki dan sayap (Serangga / Insecta)',
    targetA: 'Kupu-kupu (Papilio demoleus)',
    codeB: '5b',
    textB: 'Bukan hewan, merupakan organisme autotrof berklorofil, memiliki akar, batang, dan daun sejati yang menghasilkan spora (Tumbuhan Paku)',
    targetB: 'Tanaman Pakis (Nephrolepis exaltata)',
  },
};

export const TARGET_ORGANISMS_EXPLORER = [
  {
    name: 'Kucing (Felis catus)',
    kategori: 'Vertebrata - Mamalia',
    kunciJawaban: ['1a', '2a', '3a'],
    petunjuk: 'Bertulang belakang, berdarah panas, menyusui anaknya.',
    symbol: '🐱',
  },
  {
    name: 'Elang (Aquila chrysaetos)',
    kategori: 'Vertebrata - Aves',
    kunciJawaban: ['1a', '2a', '3b'],
    petunjuk: 'Bertulang belakang, berdarah panas, bertubuh bulu dan berparuh.',
    symbol: '🦅',
  },
  {
    name: 'Ikan Mas (Cyprinus carpio)',
    kategori: 'Vertebrata - Pisces',
    kunciJawaban: ['1a', '2b', '4a'],
    petunjuk: 'Bertulang belakang, berdarah dingin, bersisik dan berinsang.',
    symbol: '🐟',
  },
  {
    name: 'Katak Sawah (Fejervarya cancrivora)',
    kategori: 'Vertebrata - Amphibia',
    kunciJawaban: ['1a', '2b', '4b'],
    petunjuk: 'Bertulang belakang, berdarah dingin, metamorfosis dua alam.',
    symbol: '🐸',
  },
  {
    name: 'Kupu-kupu (Papilio demoleus)',
    kategori: 'Invertebrata - Insecta',
    kunciJawaban: ['1b', '5a'],
    petunjuk: 'Tidak bertulang belakang, tubuh berbuku, kaki 3 pasang dan bersayap.',
    symbol: '🦋',
  },
  {
    name: 'Tanaman Pakis (Nephrolepis exaltata)',
    kategori: 'Plantae - Pteridophyta',
    kunciJawaban: ['1b', '5b'],
    petunjuk: 'Organisme berklorofil penghasil spora.',
    symbol: '🌿',
  },
];

export const TAKSON_LEVELS_DATA: TaksonLevel[] = [
  {
    tingkat: '1. Kingdom / Kerajaan',
    latin: 'Regnum / Kerajaan',
    keterangan: 'Tingkatan tertinggi. Anggota paling banyak, perbedaan ciri antar filum sangat besar.',
    manusia: 'Animalia',
    harimau: 'Animalia',
    padi: 'Plantae',
  },
  {
    tingkat: '2. Filum (Hewan) / Divisi (Tumbuhan)',
    latin: 'Phylum / Divisio',
    keterangan: 'Mengelompokkan organisme berdasarkan rancangan dasar tubuh dan ada tidaknya korda saraf/pembuluh.',
    manusia: 'Chordata',
    harimau: 'Chordata',
    padi: 'Magnoliophyta',
  },
  {
    tingkat: '3. Kelas',
    latin: 'Classis',
    keterangan: 'Kelompok yang lebih spesifik berdasarkan karakteristik anatomi dan fisiologi utama.',
    manusia: 'Mammalia',
    harimau: 'Mammalia',
    padi: 'Liliopsida (Monokotil)',
  },
  {
    tingkat: '4. Bangsa',
    latin: 'Ordo',
    keterangan: 'Kelompok famili yang memiliki kemiripan cara hidup dan adaptasi khusus.',
    manusia: 'Primata',
    harimau: 'Carnivora',
    padi: 'Poales',
  },
  {
    tingkat: '5. Suku',
    latin: 'Familia (berakhiran -idae pada hewan, -aceae pada tumbuhan)',
    keterangan: 'Kelompok marga/genus yang memiliki hubungan kekerabatan dekat.',
    manusia: 'Hominidae',
    harimau: 'Felidae',
    padi: 'Poaceae (Gramineae)',
  },
  {
    tingkat: '6. Marga',
    latin: 'Genus',
    keterangan: 'Kelompok spesies yang memiliki persamaan struktur alat reproduksi dan morfologi mendasar.',
    manusia: 'Homo',
    harimau: 'Panthera',
    padi: 'Oryza',
  },
  {
    tingkat: '7. Jenis / Spesies',
    latin: 'Species',
    keterangan: 'Tingkatan terendah dan paling spesifik. Individu sesama spesies dapat saling kawin dan menghasilkan keturunan yang fertil (subur).',
    manusia: 'Homo sapiens',
    harimau: 'Panthera tigris',
    padi: 'Oryza sativa',
  },
];

export const BINOMIAL_RULES = [
  {
    ruleNumber: 1,
    title: 'Terdiri dari Tepat Dua Kata Bahasa Latin',
    desc: 'Kata pertama menunjukkan nama Genus (Marga), sedangkan kata kedua merupakan penunjuk jenis / epitet spesifik (epithetum specificum).',
    example: 'Oryza sativa (Padi)',
  },
  {
    ruleNumber: 2,
    title: 'Huruf Pertama Genus Wajib KAPITAL',
    desc: 'Huruf pertama kata pertama ditulis dengan huruf kapital besar, sedangkan huruf-huruf berikutnya ditulis kecil.',
    example: 'Benar: Panthera, Salah: panthera atau PANTHERA',
  },
  {
    ruleNumber: 3,
    title: 'Penunjuk Spesies Wajib Huruf KECIL Seluruhnya',
    desc: 'Kata kedua tidak boleh diawali huruf kapital, bahkan jika kata tersebut berasal dari nama orang atau daerah.',
    example: 'Benar: tigris, Salah: Tigris',
  },
  {
    ruleNumber: 4,
    title: 'Dicetak Miring (Italic) atau Garis Bawah Terpisah',
    desc: 'Dalam teks ketik/cetak harus dicetak miring (contoh: *Felis catus*). Jika ditulis tangan, kedua kata harus digarisbawahi secara terpisah (contoh: <u>Felis</u> <u>catus</u>).',
    example: 'Miring: Zea mays | Tulis Tangan: Zea (digarisbawahi) mays (digarisbawahi terpisah)',
  },
  {
    ruleNumber: 5,
    title: 'Inisial Nama Penemu / Deskriptor di Akhir (Opsional)',
    desc: 'Jika ingin mencantumkan orang pertama yang memberi nama ilmiah tersebut, namanya ditulis di belakang tanpa cetak miring.',
    example: 'Oryza sativa L. (L. = singkatan dari Carolus Linnaeus)',
  },
];

export const BINOMIAL_PRACTICE_ITEMS = [
  {
    id: 1,
    namaUmum: 'Harimau Sumatera',
    salah: 'panthera Tigris',
    alasanSalah: 'Genus diawali huruf kecil, dan penunjuk jenis diawali huruf kapital.',
    jawabanBenar: 'Panthera tigris',
  },
  {
    id: 2,
    namaUmum: 'Padi Sawah',
    salah: 'Oryza Sativa',
    alasanSalah: 'Penunjuk jenis (spesies) sativa tidak boleh diawali huruf kapital.',
    jawabanBenar: 'Oryza sativa',
  },
  {
    id: 3,
    namaUmum: 'Jagung Manis',
    salah: 'zea mays',
    alasanSalah: 'Genus zea wajib diawali huruf kapital (Zea).',
    jawabanBenar: 'Zea mays',
  },
  {
    id: 4,
    namaUmum: 'Kucing Peliharaan',
    salah: 'Felis Catus Domesticus',
    alasanSalah: 'Format binomial nomenklatur hanya terdiri dari 2 kata utama (Genus dan spesies).',
    jawabanBenar: 'Felis catus',
  },
];

export const KINGDOM_6_DATA: KingdomInfo[] = [
  {
    id: 'archaea',
    nama: 'Archaebacteria',
    namaLatin: 'Archaea',
    tipeSel: 'Prokariotik',
    jumlahSel: 'Uniseluler',
    dindingSel: 'Tidak mengandung peptidoglikan (tersusun dari pseudopeptidoglikan/protein)',
    nutrisi: 'Autotrof & Heterotrof',
    ciriKhas: [
      'Struktur lipid membran bercabang unik tahan suhu dan pH ekstrem.',
      'Dapat hidup di lingkungan sangat ekstrem tempat makhluk hidup lain tidak mampu bertahan.',
      'Dibagi menjadi Metanogen (penghasil gas metana), Halofil ekstrem (kadar garam tinggi), dan Termoasidofil (kawah panas bersulfur asam).',
    ],
    contoh: [
      {
        namaUmum: 'Bakteri Metanogen',
        namaIlmiah: 'Methanococcus jannaschii',
        deskripsi: 'Menghasilkan gas metana (CH4) di dasar rawa dan lambung ruminansia.',
        gambarSymbol: '🌋',
      },
      {
        namaUmum: 'Bakteri Laut Mati',
        namaIlmiah: 'Halobacterium salinarum',
        deskripsi: 'Mampu hidup di danau berkadar garam jenuh 20-30%.',
        gambarSymbol: '🧂',
      },
    ],
    peranan: {
      positif: 'Pengolahan limbah organik menjadi biogas metana terbarukan; enzim polimerase PCR tahan panas.',
      negatif: 'Dapat merusak material pengawetan garam pada industri perikanan tradisional jika terkontaminasi halofil.',
    },
  },
  {
    id: 'eubacteria',
    nama: 'Eubacteria (Bakteri Sejati)',
    namaLatin: 'Bacteria',
    tipeSel: 'Prokariotik',
    jumlahSel: 'Uniseluler',
    dindingSel: 'Mengandung peptidoglikan (lapisan tebal pada Gram positif, tipis pada Gram negatif)',
    nutrisi: 'Autotrof & Heterotrof',
    ciriKhas: [
      'Materi genetik berupa DNA sirkuler telanjang tanpa membran inti nukleus (nukleoid).',
      'Memiliki plasmid (DNA sirkuler tambahan di luar kromosom).',
      'Bentuk bervariasi: Kokus (bola), Basil (batang), Spirilum (spiral).',
      'Bereproduksi aseksual sangat cepat dengan pembelahan biner.',
    ],
    contoh: [
      {
        namaUmum: 'Bakteri Usus Sehat',
        namaIlmiah: 'Escherichia coli',
        deskripsi: 'Membantu pembusukan sisa makanan dan memproduksi Vitamin K di usus besar manusia.',
        gambarSymbol: '🧫',
      },
      {
        namaUmum: 'Bakteri Pembuat Yogurt',
        namaIlmiah: 'Lactobacillus bulgaricus',
        deskripsi: 'Memfermentasi laktosa susu menjadi asam laktat yang segar.',
        gambarSymbol: '🥛',
      },
    ],
    peranan: {
      positif: 'Bioteknologi pangan (yogurt, nata de coco, keju), pengikatan nitrogen tanah (Rhizobium), dan pengurai limbah (dekomposer).',
      negatif: 'Penyebab penyakit tifus (Salmonella typhi), TBC (Mycobacterium tuberculosis), dan kolera (Vibrio cholerae).',
    },
  },
  {
    id: 'protista',
    nama: 'Protista',
    namaLatin: 'Protista',
    tipeSel: 'Eukariotik',
    jumlahSel: 'Uniseluler & Multiseluler',
    dindingSel: 'Bervariasi (pada alga mengandung selulosa/silika, pada protozoa tidak berdinding sel)',
    nutrisi: 'Autotrof & Heterotrof',
    ciriKhas: [
      'Merupakan organisme eukariotik paling sederhana, sudah memiliki membran inti sel.',
      'Sering disebut "keranjang sampah taksonomi" karena menampung eukariota yang bukan jamur, tumbuhan, maupun hewan.',
      'Dikelompokkan menjadi: Protista mirip Hewan (Protozoa), Protista mirip Tumbuhan (Alga/Ganggang), dan Protista mirip Jamur (Myxomycota & Oomycota).',
    ],
    contoh: [
      {
        namaUmum: 'Amoeba Pemangsa',
        namaIlmiah: 'Amoeba proteus',
        deskripsi: 'Protozoa yang bergerak dan menangkap mangsa dengan kaki semu (pseudopodia).',
        gambarSymbol: '🦠',
      },
      {
        namaUmum: 'Rumput Laut Merah',
        namaIlmiah: 'Eucheuma spinosum',
        deskripsi: 'Alga multiseluler sumber bahan agar-agar dan karagenan berkualitas tinggi.',
        gambarSymbol: '🌊',
      },
    ],
    peranan: {
      positif: 'Fitoplankton sebagai produsen utama oksigen di lautan dunia; bahan agar-agar kosmetik dan makanan; fosil Radiolaria untuk petunjuk minyak bumi.',
      negatif: 'Plasmodium falciparum penyebab penyakit malaria; Entamoeba histolytica penyebab disentri berdarah.',
    },
  },
  {
    id: 'fungi',
    nama: 'Fungi (Jamur)',
    namaLatin: 'Mycota / Fungi',
    tipeSel: 'Eukariotik',
    jumlahSel: 'Uniseluler & Multiseluler',
    dindingSel: 'Tersusun atas zat kitin keras dan glukan',
    nutrisi: 'Heterotrof',
    ciriKhas: [
      'TIDAK memiliki klorofil, tidak bisa melakukan fotosintesis.',
      'Nutrisi bersifat heterotrof absorptif (mengeluarkan enzim pencerna ke substrat luar lalu menyerap nutrisi terlarut).',
      'Tubuh tersusun atas benang-benang halus yang disebut hifa, yang berkumpul membentuk miselium.',
      'Menghasilkan spora untuk reproduksi seksual dan aseksual.',
    ],
    contoh: [
      {
        namaUmum: 'Ragi Roti & Tape',
        namaIlmiah: 'Saccharomyces cerevisiae',
        deskripsi: 'Jamur uniseluler pembantu fermentasi adonan roti agar mengembang empuk.',
        gambarSymbol: '🍞',
      },
      {
        namaUmum: 'Jamur Tiram Putih',
        namaIlmiah: 'Pleurotus ostreatus',
        deskripsi: 'Jamur pangan lezat kaya protein dan serat pangan.',
        gambarSymbol: '🍄',
      },
    ],
    peranan: {
      positif: 'Dekomposer utama serasah kayu di hutan; pembuatan tempe (Rhizopus oryzae); penghasil antibiotik penisilin (Penicillium notatum).',
      negatif: 'Menyebabkan penyakit kurap kulit (Trichophyton); busuk buah dan rebah kecambah; jamur beracun mematikan (Amanita phalloides).',
    },
  },
  {
    id: 'plantae',
    nama: 'Plantae (Tumbuhan)',
    namaLatin: 'Plantae / Metaphyta',
    tipeSel: 'Eukariotik',
    jumlahSel: 'Multiseluler',
    dindingSel: 'Tersusun atas selulosa kuat yang memberi struktur kokoh',
    nutrisi: 'Autotrof',
    ciriKhas: [
      'Memiliki kloroplas berisi pigmen klorofil untuk fotosintesis menghasilkan glukosa dan O2.',
      'Mengalami metagenesis (pergiliran keturunan fase gametofit dan sporofit).',
      'Terdiri dari 3 divisi utama: Bryophyta (Tumbuhan Lumut/non-vaskular), Pteridophyta (Tumbuhan Paku/vaskular berspora), dan Spermatophyta (Tumbuhan Berbiji).',
    ],
    contoh: [
      {
        namaUmum: 'Padi Sawah',
        namaIlmiah: 'Oryza sativa',
        deskripsi: 'Tumbuhan monokotil sumber makanan pokok karbohidrat bagi separuh populasi dunia.',
        gambarSymbol: '🌾',
      },
      {
        namaUmum: 'Pohon Kina Asli',
        namaIlmiah: 'Cinchona calisaya',
        deskripsi: 'Kulit kayunya menghasilkan alkaloid kuinin untuk obat malaria manjur.',
        gambarSymbol: '🌳',
      },
    ],
    peranan: {
      positif: 'Produsen utama rantai makanan darat; penghasil oksigen bumi; sumber pangan, kayu, sandang katun, dan obat herbal alami.',
      negatif: 'Gulma pengganggu tanaman budidaya (misal: eceng gondok Eichhornia crassipes yang menutupi danau).',
    },
  },
  {
    id: 'animalia',
    nama: 'Animalia (Hewan)',
    namaLatin: 'Animalia / Metazoa',
    tipeSel: 'Eukariotik',
    jumlahSel: 'Multiseluler',
    dindingSel: 'TIDAK memiliki dinding sel (membran sel fleksibel memudahkan pergerakan)',
    nutrisi: 'Heterotrof',
    ciriKhas: [
      'Dapat bergerak aktif berpindah tempat dengan otot dan sistem saraf yang terkoordinasi.',
      'Mencerna makanan secara internal di dalam rongga pencernaan khusus.',
      'Dikelompokkan menjadi Invertebrata (Porifera, Coelenterata, Platyhelminthes, Nematoda, Annelida, Mollusca, Arthropoda, Echinodermata) dan Vertebrata (Pisces, Amphibia, Reptilia, Aves, Mammalia).',
    ],
    contoh: [
      {
        namaUmum: 'Komodo Sang Naga',
        namaIlmiah: 'Varanus komodoensis',
        deskripsi: 'Kadal terbesar di dunia endemik Taman Nasional Komodo NTT Indonesia.',
        gambarSymbol: '🦎',
      },
      {
        namaUmum: 'Lebah Madu Pekerja',
        namaIlmiah: 'Apis mellifera',
        deskripsi: 'Serangga penyerbuk krusial bagi 70% tanaman pangan dunia dan penghasil madu.',
        gambarSymbol: '🐝',
      },
    ],
    peranan: {
      positif: 'Sumber protein hewani (daging, telur, susu); penyerbuk bunga; hewan kerja pembantu manusia; penjaga keseimbangan jaring makanan.',
      negatif: 'Hama wereng tanaman; vektor penyakit malaria (nyamuk Anopheles), DBD (Aedes aegypti), dan rabies (anjing liar).',
    },
  },
];

export const INITIAL_TGT_TEAMS: TGTTeam[] = [
  { id: 1, name: 'Tim Panthera (Harimau)', badge: '🐯', score: 0, members: 'Ketua: Fajar, Anggota: Rina, Budi, Siti', streak: 0 },
  { id: 2, name: 'Tim Aquila (Rajawali)', badge: '🦅', score: 0, members: 'Ketua: Dimas, Anggota: Ayu, Gilang, Sarah', streak: 0 },
  { id: 3, name: 'Tim Cetacea (Paus Biru)', badge: '🐋', score: 0, members: 'Ketua: Rizky, Anggota: Nanda, Bayu, Dewi', streak: 0 },
  { id: 4, name: 'Tim Rafflesia (Bunga Raksasa)', badge: '🌺', score: 0, members: 'Ketua: Laras, Anggota: Eko, Maya, Tari', streak: 0 },
  { id: 5, name: 'Tim Fungi (Jamur Juara)', badge: '🍄', score: 0, members: 'Ketua: Danang, Anggota: Indah, Raka, Putri', streak: 0 },
  { id: 6, name: 'Tim Amoeba (Penyerap Cerdas)', badge: '🦠', score: 0, members: 'Ketua: Kevin, Anggota: Zahra, Bagas, Alya', streak: 0 },
  { id: 7, name: 'Tim Lactobacillus (Bakteri Hebat)', badge: '🧪', score: 0, members: 'Ketua: Hendra, Anggota: Siska, Yoga, Winda', streak: 0 },
  { id: 8, name: 'Tim Archaea (Pejuang Ekstrem)', badge: '🌋', score: 0, members: 'Ketua: Aris, Anggota: Tiara, Ilham, Citra', streak: 0 },
];

export const TGT_QUESTIONS_DATA: TGTQuestion[] = [
  {
    id: 1,
    category: 'Pertemuan 1',
    level: 'Mudah (100)',
    points: 100,
    question: 'Kemampuan makhluk hidup untuk merespons rangsang dari lingkungan sekitarnya disebut ...',
    options: ['Adaptasi', 'Iritabilitas', 'Ekskresi', 'Reproduksi'],
    correctIndex: 1,
    explanation: 'Iritabilitas atau peka terhadap rangsang adalah kemampuan menanggapi stimulus fisik maupun kimiawi.',
    hint: 'Kata depannya dimulai dengan huruf I.',
  },
  {
    id: 2,
    category: 'Pertemuan 1',
    level: 'Mudah (100)',
    points: 100,
    question: 'Tujuan utama para ahli biologi melakukan klasifikasi makhluk hidup adalah ...',
    options: [
      'Menghitung jumlah makhluk hidup yang mati',
      'Mempermudah mengenal dan mempelajari keanekaragaman makhluk hidup',
      'Mengubah nama-nama hewan menjadi bahasa daerah',
      'Membuat semua makhluk hidup menjadi punah'
    ],
    correctIndex: 1,
    explanation: 'Klasifikasi menyederhanakan objek kajian yang berjumlah jutaan agar mudah diidentifikasi dan dipelajari.',
    hint: 'Fokus pada penyederhanaan studi keragaman.',
  },
  {
    id: 3,
    category: 'Pertemuan 1',
    level: 'Sedang (200)',
    points: 200,
    question: 'Kunci identifikasi yang disusun berdasarkan dua pernyataan yang saling berlawanan pada setiap langkah disebut ...',
    options: ['Kunci Determinasi Polikotomi', 'Kunci Determinasi Dikotomi', 'Bagan Silsilah Genetika', 'Diagram Venn'],
    correctIndex: 1,
    explanation: 'Kunci dikotomi (di = dua) selalu menyajikan dua opsi alternatif yang berlawanan (misal 1a dan 1b).',
    hint: 'Berasal dari kata "di" yang berarti dua cabang pilihan.',
  },
  {
    id: 4,
    category: 'Pertemuan 1',
    level: 'HOTS (300)',
    points: 300,
    question: 'Perhatikan ciri: 1) Bertulang belakang, 2) Berdarah panas, 3) Melahirkan anak dan menyusui. Jika ditelusuri dengan kunci determinasi, organisme yang memenuhi ciri ini adalah ...',
    options: ['Hiu Martil', 'Katak Pohon', 'Paus Pembunuh (Orca)', 'Pinguin Kaisar'],
    correctIndex: 2,
    explanation: 'Paus adalah mamalia laut bertulang belakang, berdarah panas (homoioterm), serta menyusui anaknya.',
    hint: 'Meskipun berenang di samudra, ia bukan ikan.',
  },
  {
    id: 5,
    category: 'Pertemuan 2',
    level: 'Mudah (100)',
    points: 100,
    question: 'Urutan tingkatan takson dari yang paling tinggi ke tingkatan yang paling rendah pada hewan adalah ...',
    options: [
      'Kingdom - Filum - Kelas - Ordo - Famili - Genus - Spesies',
      'Kingdom - Divisi - Kelas - Ordo - Famili - Genus - Spesies',
      'Spesies - Genus - Famili - Ordo - Kelas - Filum - Kingdom',
      'Kingdom - Ordo - Famili - Kelas - Filum - Genus - Spesies'
    ],
    correctIndex: 0,
    explanation: 'Urutan baku: Kingdom -> Filum (hewan) -> Kelas -> Ordo -> Famili -> Genus -> Spesies.',
    hint: 'Ingat singkatan: King Philip Came Over For Good Soup!',
  },
  {
    id: 6,
    category: 'Pertemuan 2',
    level: 'Sedang (200)',
    points: 200,
    question: 'Manakah penulisan nama ilmiah jagung menurut aturan Binomial Nomenklatur Carolus Linnaeus yang PALING TEPAT dalam teks cetak?',
    options: ['Zea Mays', 'zea mays', 'Zea mays (dicetak miring)', 'ZEA MAYS'],
    correctIndex: 2,
    explanation: 'Kata pertama (Genus) huruf pertama kapital, kata kedua (spesies) huruf kecil semua, dan dicetak miring.',
    hint: 'Huruf kapital hanya pada huruf pertama kata pertama.',
  },
  {
    id: 7,
    category: 'Pertemuan 2',
    level: 'HOTS (300)',
    points: 300,
    question: 'Dua organisme dikatakan memiliki hubungan kekerabatan yang PALING DEKAT apabila memiliki persamaan tingkatan takson hingga tingkat ...',
    options: ['Kingdom', 'Kelas', 'Genus', 'Filum'],
    correctIndex: 2,
    explanation: 'Makin ke bawah tingkatan takson yang sama (Genus lebih rendah dari Famili, Ordo, Kelas), makin banyak persamaan cirinya dan makin dekat kekerabatannya.',
    hint: 'Pilihlah tingkatan takson yang posisinya paling rendah/spesifik di antara opsi.',
  },
  {
    id: 8,
    category: 'Pertemuan 3',
    level: 'Mudah (100)',
    points: 100,
    question: 'Kingdom yang seluruh anggotanya tersusun atas sel prokariotik (tidak memiliki membran inti sel) adalah ...',
    options: ['Fungi dan Plantae', 'Archaebacteria dan Eubacteria', 'Protista dan Animalia', 'Plantae dan Animalia'],
    correctIndex: 1,
    explanation: 'Hanya Archaebacteria dan Eubacteria (Monera) yang memiliki sel prokariotik tanpa karioteka.',
    hint: 'Kelompok mikroorganisme bakteri.',
  },
  {
    id: 9,
    category: 'Pertemuan 3',
    level: 'Sedang (200)',
    points: 200,
    question: 'Alasan utama mengapa jamur (Fungi) dipisahkan dari kelompok tumbuhan (Plantae) dalam sistem 5 dan 6 kingdom adalah ...',
    options: [
      'Jamur berukuran mikroskopis dan tidak memiliki inti sel',
      'Jamur tidak berklorofil (heterotrof) dan dinding selnya dari kitin',
      'Jamur dapat berjalan cepat menggunakan silia',
      'Jamur berkembang biak dengan bertelur'
    ],
    correctIndex: 1,
    explanation: 'Jamur tidak berfotosintesis dan dinding selnya mengandung kitin, berbeda dari selulosa pada tumbuhan.',
    hint: 'Fokus pada ketiadaan pigmen hijau daun dan zat penyusun dinding sel.',
  },
  {
    id: 10,
    category: 'Pertemuan 3',
    level: 'HOTS (300)',
    points: 300,
    question: 'Ditemukan mikroorganisme di kawah belerang panas dengan suhu 95°C dan pH sangat asam. Membrannya memiliki lipid hidrokarbon bercabang tanpa peptidoglikan. Organisme ini termasuk kingdom ...',
    options: ['Eubacteria', 'Archaebacteria', 'Protista', 'Fungi'],
    correctIndex: 1,
    explanation: 'Archaebacteria (khususnya kelompok Termoasidofil) beradaptasi pada habitat ekstrem dengan dinding sel tanpa peptidoglikan.',
    hint: 'Archaea terkenal sebagai penguasa lingkungan ekstrem.',
  },
  {
    id: 11,
    category: 'Tantangan Cepat',
    level: 'Mudah (100)',
    points: 100,
    question: 'Bakteri Lactobacillus bulgaricus dimanfaatkan manusia dalam pembuatan ...',
    options: ['Nata de coco', 'Yogurt', 'Tempe kedelai', 'Kecap manis'],
    correctIndex: 1,
    explanation: 'Lactobacillus bulgaricus memfermentasi susu menjadi asam laktat menghasilkan yogurt.',
    hint: 'Olahan fermentasi susu bercita rasa asam segar.',
  },
  {
    id: 12,
    category: 'Tantangan Cepat',
    level: 'Sedang (200)',
    points: 200,
    question: 'Kucing rumah (Felis catus) dan Harimau (Panthera tigris) berada dalam satu tingkatan suku yang sama, yaitu ...',
    options: ['Canidae', 'Felidae', 'Bovidae', 'Hominidae'],
    correctIndex: 1,
    explanation: 'Kedua karnivora tersebut tergolong dalam familia Felidae (kucing-kucingan).',
    hint: 'Familia berakhiran -idae untuk kucing.',
  },
  {
    id: 13,
    category: 'Pertemuan 1',
    level: 'Sedang (200)',
    points: 200,
    question: 'Tumbuhan putri malu (Mimosa pudica) yang mengatupkan daunnya saat disentuh merupakan contoh perpaduan ciri makhluk hidup ...',
    options: [
      'Bergerak dan peka terhadap rangsang',
      'Bernapas dan adaptasi morfologi',
      'Ekskresi dan reproduksi',
      'Nutrisi dan tumbuh berkembang'
    ],
    correctIndex: 0,
    explanation: 'Sentuhan adalah rangsangan (iritabilitas), dan mengatupnya daun adalah respon pergerakan (seismonasti).',
    hint: 'Ada rangsang sentuhan dan ada daun yang bergerak menutup.',
  },
  {
    id: 14,
    category: 'Pertemuan 2',
    level: 'HOTS (300)',
    points: 300,
    question: 'Perhatikan nama ilmiah berikut: 1) Solanum lycopersicum (Tomat), 2) Solanum tuberosum (Kentang), 3) Capsicum frutescens (Cabai rawit). Pernyataan yang BENAR mengenai kekerabatan ketiganya adalah ...',
    options: [
      'Tomat dan Kentang memiliki kekerabatan paling dekat karena berada dalam genus yang sama (Solanum)',
      'Tomat dan Cabai memiliki kekerabatan paling dekat karena keduanya berbuah merah',
      'Ketiganya memiliki tingkat spesies yang identik',
      'Kentang dan Cabai satu genus karena sama-sama tanaman perdu'
    ],
    correctIndex: 0,
    explanation: 'Kata pertama menunjukkan nama genus. Tomat dan Kentang sama-sama berada di genus Solanum sehingga lebih dekat.',
    hint: 'Perhatikan kata pertama pada nama ilmiah.',
  },
  {
    id: 15,
    category: 'Pertemuan 3',
    level: 'Sedang (200)',
    points: 200,
    question: 'Organisme uniseluler yang memiliki klorofil dan dapat berenang lincah menggunakan flagela seperti Euglena viridis digolongkan ke dalam kingdom ...',
    options: ['Plantae', 'Animalia', 'Protista', 'Eubacteria'],
    correctIndex: 2,
    explanation: 'Euglena viridis adalah Protista eukariotik yang memiliki klorofil (mirip tumbuhan) sekaligus bintik mata dan flagela (mirip hewan).',
    hint: 'Kingdom perantara eukariotik bersel tunggal.',
  },
  {
    id: 16,
    category: 'Tantangan Cepat',
    level: 'HOTS (300)',
    points: 300,
    question: 'Pada piramida tingkatan takson, dari tingkat Kingdom menuju tingkat Spesies, maka ...',
    options: [
      'Jumlah anggota makin bertambah dan variasi makin beragam',
      'Jumlah anggota makin sedikit dan persamaan ciri makin banyak',
      'Hubungan kekerabatan antar anggotanya makin menjauh',
      'Perbedaan sifat antar anggotanya makin mendominasi'
    ],
    correctIndex: 1,
    explanation: 'Makin ke bawah menuju spesies, anggotanya semakin mengerucut sedikit dan persamaan cirinya semakin banyak.',
    hint: 'Piramida mengerucut di bagian bawah spesies.',
  },
];

// Complete 30 Post-Test Questions (10 Pertemuan 1, 10 Pertemuan 2, 10 Pertemuan 3)
export const POST_TEST_QUESTIONS: PostTestQuestion[] = [
  // --- PERTEMUAN 1 (Soal 1 - 10) ---
  {
    id: 1,
    materi: 'Pertemuan 1',
    topicDetail: 'Ciri Makhluk Hidup - Respirasi',
    question: 'Proses pembongkaran sari-sari makanan dengan bantuan oksigen di dalam sel untuk menghasilkan energi dan zat sisa dinamakan ...',
    options: ['Respirasi / Bernapas', 'Fotosintesis', 'Transpirasi', 'Fermentasi'],
    correctIndex: 0,
    explanation: 'Respirasi seluler memanfaatkan oksigen untuk mengoksidasi glukosa menghasilkan energi (ATP), air, dan karbon dioksida.',
  },
  {
    id: 2,
    materi: 'Pertemuan 1',
    topicDetail: 'Ciri Makhluk Hidup - Tumbuh vs Berkembang',
    question: 'Pernyataan berikut yang paling tepat menggambarkan perbedaan antara pertumbuhan dan perkembangan adalah ...',
    options: [
      'Pertumbuhan bersifat kualitatif, sedangkan perkembangan bersifat kuantitatif',
      'Pertumbuhan dapat diukur dengan angka dan bersifat ireversibel, sedangkan perkembangan menuju kedewasaan dan fungsi organ',
      'Pertumbuhan hanya terjadi pada hewan, perkembangan hanya terjadi pada tumbuhan',
      'Pertumbuhan dapat bolak-balik ukurannya, perkembangan bersifat mutlak'
    ],
    correctIndex: 1,
    explanation: 'Pertumbuhan bersifat kuantitatif (dapat diukur dengan angka, tidak dapat kembali), sedangkan perkembangan bersifat kualitatif (pematangan fungsi organ).',
  },
  {
    id: 3,
    materi: 'Pertemuan 1',
    topicDetail: 'Ciri Makhluk Hidup - Ekskresi',
    question: 'Zat sisa metabolisme yang dikeluarkan oleh organ paru-paru manusia pada saat menghembuskan napas adalah ...',
    options: ['Urea dan asam urat', 'Karbon dioksida dan uap air', 'Keringat dan garam mineral', 'Cairan empedu dan bilirubin'],
    correctIndex: 1,
    explanation: 'Paru-paru mengekskresikan gas CO2 dan H2O (uap air) hasil oksidasi biologis tubuh.',
  },
  {
    id: 4,
    materi: 'Pertemuan 1',
    topicDetail: 'Ciri Makhluk Hidup - Iritabilitas',
    question: 'Ujung tanaman yang diletakkan di dalam ruangan gelap dengan satu lubang cahaya akan tumbuh membengkok ke arah lubang tersebut. Peristiwa ini menunjukkan ciri ...',
    options: ['Adaptasi tingkah laku', 'Peka terhadap rangsang (Iritabilitas) dan gerak fototropisme', 'Reproduksi generatif', 'Ekskresi sisa getah'],
    correctIndex: 1,
    explanation: 'Tumbuhan merespons rangsang cahaya (fototropisme) yang dipengaruhi oleh distribusi hormon auksin pada batang.',
  },
  {
    id: 5,
    materi: 'Pertemuan 1',
    topicDetail: 'Ciri Makhluk Hidup - Adaptasi',
    question: 'Tanaman kaktus yang hidup di ekosistem gurun pasir memiliki daun tereduksi menjadi bentuk duri. Tujuan utama modifikasi morfologi tersebut adalah ...',
    options: ['Mempercepat proses fotosintesis', 'Mengurangi laju penguapan air (transpirasi)', 'Menarik serangga penyerbuk datang', 'Menyerap air hujan dari udara secara langsung'],
    correctIndex: 1,
    explanation: 'Daun berbentuk duri meminimalkan luas permukaan daun sehingga laju transpirasi di lingkungan kering dapat ditekan sekecil mungkin.',
  },
  {
    id: 6,
    materi: 'Pertemuan 1',
    topicDetail: 'Manfaat Klasifikasi',
    question: 'Salah satu manfaat klasifikasi makhluk hidup dalam bidang pertanian dan pemuliaan tanaman adalah ...',
    options: [
      'Menghilangkan keanekaragaman hayati agar hanya ada satu jenis bibit',
      'Menemukan spesies liar kerabat dekat tanaman budidaya yang memiliki gen tahan hama',
      'Mengganti nama latin tanaman pangan lokal dengan bahasa asing',
      'Memusnahkan semua serangga di perkebunan'
    ],
    correctIndex: 1,
    explanation: 'Melalui klasifikasi, ilmuwan dapat menelusuri kerabat liar (seperti Oryza rufipogon) yang menyimpan gen unggul tahan penyakit untuk disilangkan dengan padi budidaya.',
  },
  {
    id: 7,
    materi: 'Pertemuan 1',
    topicDetail: 'Manfaat Klasifikasi',
    question: 'Di bawah ini yang BUKAN merupakan manfaat dari dilakukannya klasifikasi makhluk hidup adalah ...',
    options: [
      'Mempermudah mengenal dan mempelajari organisme yang beraneka ragam',
      'Mengetahui hubungan kekerabatan antar makhluk hidup',
      'Mengetahui manfaat organisme bagi kelangsungan hidup manusia',
      'Membuktikan bahwa semua organisme berasal dari spesies yang sama persis'
    ],
    correctIndex: 3,
    explanation: 'Klasifikasi justru menunjukkan adanya keanekaragaman dan perbedaan spesifik antar takson, bukan menyamaratakan semua spesies.',
  },
  {
    id: 8,
    materi: 'Pertemuan 1',
    topicDetail: 'Kunci Determinasi',
    question: 'Perhatikan format kunci determinasi berikut:\n1. a. Tubuh bersel satu ......... (2)\n   b. Tubuh bersel banyak ...... (3)\nFormat kunci identifikasi yang menggunakan dua pilihan berlawanan seperti di atas disebut kunci ...',
    options: ['Kunci Dikotomi', 'Kunci Polikotomi', 'Bagan Alir Serial', 'Tabel Matriks'],
    correctIndex: 0,
    explanation: 'Kunci dikotomi tersusun atas kuplet yang terdiri dari dua pernyataan yang kontras dan saling meniadakan (1a vs 1b).',
  },
  {
    id: 9,
    materi: 'Pertemuan 1',
    topicDetail: 'Kunci Determinasi Soal Kasus',
    question: 'Perhatikan kunci determinasi berikut:\n1. a. Hewan bertulang belakang ...... (2)\n   b. Hewan tidak bertulang belakang ... Invertebrata\n2. a. Berdarah panas (homoioterm) ... (3)\n   b. Berdarah dingin (poikiloterm) ... (4)\n3. a. Tubuh berbulu dan berparuh ... Aves\n   b. Tubuh berambut dan menyusui ... Mamalia\nNomor kunci determinasi untuk seekor Kucing adalah ...',
    options: ['1a - 2a - 3a', '1a - 2a - 3b', '1a - 2b - 4a', '1b - 2a - 3b'],
    correctIndex: 1,
    explanation: 'Kucing: bertulang belakang (1a) -> berdarah panas (2a) -> berambut dan menyusui (3b). Jadi urutannya 1a - 2a - 3b.',
  },
  {
    id: 10,
    materi: 'Pertemuan 1',
    topicDetail: 'Kunci Determinasi Kasus Katak',
    question: 'Berdasarkan kunci determinasi: \n1a. Hewan bertulang belakang ... (2)\n2b. Berdarah dingin ... (4)\n4a. Bernapas dengan insang seumur hidup ... Pisces\n4b. Bernapas dengan insang saat larva, lalu paru-paru dan kulit saat dewasa ... Amphibia\nUrutan kunci untuk Katak Hijau adalah ...',
    options: ['1a - 2b - 4b', '1a - 2a - 4a', '1b - 2b - 4b', '1a - 2b - 4a'],
    correctIndex: 0,
    explanation: 'Katak adalah amfibi bertulang belakang (1a), berdarah dingin (2b), dan mengalami metamorfosis pernapasan (4b).',
  },

  // --- PERTEMUAN 2 (Soal 11 - 20) ---
  {
    id: 11,
    materi: 'Pertemuan 2',
    topicDetail: 'Tingkatan Takson',
    question: 'Tingkatan takson tertinggi yang membagi makhluk hidup ke dalam kelompok-kelompok besar disebut ...',
    options: ['Spesies', 'Kingdom / Regnum', 'Ordo', 'Familia'],
    correctIndex: 1,
    explanation: 'Kingdom (kerajaan) adalah tingkatan taksonomi tertinggi dalam hierarki klasifikasi Linnaeus.',
  },
  {
    id: 12,
    materi: 'Pertemuan 2',
    topicDetail: 'Takson Tumbuhan vs Hewan',
    question: 'Tingkatan takson di bawah Kingdom untuk tumbuhan disebut ..., sedangkan untuk hewan disebut ...',
    options: ['Divisi ; Filum', 'Filum ; Divisi', 'Kelas ; Ordo', 'Ordo ; Familia'],
    correctIndex: 0,
    explanation: 'Pada botani (tumbuhan) digunakan istilah Divisio (Divisi), sedangkan pada zoologi (hewan) digunakan istilah Phylum (Filum).',
  },
  {
    id: 13,
    materi: 'Pertemuan 2',
    topicDetail: 'Konsep Spesies',
    question: 'Dua organisme dapat dikelompokkan ke dalam satu spesies yang sama apabila ...',
    options: [
      'Memiliki warna tubuh dan ukuran yang serupa',
      'Hidup di wilayah geografis dan habitat yang sama persis',
      'Dapat melakukan perkawinan dan menghasilkan keturunan yang fertil (subur)',
      'Memiliki jenis makanan yang identik di alam bebas'
    ],
    correctIndex: 2,
    explanation: 'Konsep spesies biologis: individu yang dapat saling berkawin (interbreeding) dan menghasilkan keturunan yang fertil (mampu berbiak lagi).',
  },
  {
    id: 14,
    materi: 'Pertemuan 2',
    topicDetail: 'Prinsip Hubungan Kekerabatan',
    question: 'Semakin banyak tingkatan takson yang sama antara dua organisme yang berbeda, maka hal tersebut menunjukkan bahwa ...',
    options: [
      'Hubungan kekerabatan keduanya semakin dekat',
      'Hubungan kekerabatan keduanya semakin jauh',
      'Kedua organisme tersebut pasti berasal dari kingdom yang berbeda',
      'Jumlah anggota populasinya semakin tak terhitung'
    ],
    correctIndex: 0,
    explanation: 'Makin banyak persamaan takson (hingga genus/spesies), makin banyak kemiripan genetika dan makin dekat kekerabatannya.',
  },
  {
    id: 15,
    materi: 'Pertemuan 2',
    topicDetail: 'Sufiks Nama Famili',
    question: 'Nama suku (familia) pada kelompok tumbuhan umumnya memiliki akhiran kata ...',
    options: ['-idae', '-aceae', '-ales', '-phyta'],
    correctIndex: 1,
    explanation: 'Pada tumbuhan akhiran famili adalah -aceae (misal Solanaceae, Poaceae). Pada hewan akhirannya adalah -idae (misal Felidae, Canidae).',
  },
  {
    id: 16,
    materi: 'Pertemuan 2',
    topicDetail: 'Binomial Nomenklatur - Penemu',
    question: 'Ilmuwan Swedia yang dikenal luas sebagai "Bapak Taksonomi Modern" pencetus sistem tata nama ganda (Binomial Nomenklatur) adalah ...',
    options: ['Charles Darwin', 'Carolus Linnaeus', 'Gregor Mendel', 'Robert Hooke'],
    correctIndex: 1,
    explanation: 'Carolus Linnaeus (Carl von Linne) mempublikasikan sistem binomial nomenklatur dalam karya monumentalnya Systema Naturae.',
  },
  {
    id: 17,
    materi: 'Pertemuan 2',
    topicDetail: 'Binomial Nomenklatur - Kata Pertama',
    question: 'Pada nama ilmiah Panthera leo (singa), kata pertama "Panthera" menunjukkan tingkatan takson ...',
    options: ['Spesies', 'Genus (Marga)', 'Familia (Suku)', 'Ordo (Bangsa)'],
    correctIndex: 1,
    explanation: 'Kata pertama pada sistem tata nama ganda selalu menunjukkan nama Genus (marga).',
  },
  {
    id: 18,
    materi: 'Pertemuan 2',
    topicDetail: 'Binomial Nomenklatur - Aturan Penulisan',
    question: 'Perhatikan penulisan nama ilmiah berikut:\n1) Mangifera Indica\n2) mangifera indica\n3) Mangifera indica\n4) MANGIFERA INDICA\nPenulisan nama ilmiah mangga yang benar sesuai kaidah adalah nomor ...',
    options: ['1', '2', '3', '4'],
    correctIndex: 2,
    explanation: 'Mangifera (M kapital) dan indica (huruf kecil semua). Jadi yang benar nomor 3.',
  },
  {
    id: 19,
    materi: 'Pertemuan 2',
    topicDetail: 'Binomial Nomenklatur Tulis Tangan',
    question: 'Jika kamu menuliskan nama ilmiah pisang (Musa paradisiaca) menggunakan pulpen di buku tulis, maka cara penulisan yang benar adalah ...',
    options: [
      'Musa paradisiaca tanpa tanda apapun',
      'Musa digarisbawahi terpisah dengan paradisiaca',
      'Musa paradisiaca digarisbawahi bersambung satu garis lurus',
      'Musa diberi tanda kurung (Musa) paradisiaca'
    ],
    correctIndex: 1,
    explanation: 'Jika ditulis tangan, kata genus dan penunjuk spesies masing-masing digarisbawahi secara TERPISAH.',
  },
  {
    id: 20,
    materi: 'Pertemuan 2',
    topicDetail: 'Binomial Nomenklatur - Arti Singkatan L.',
    question: 'Pada nama ilmiah beras ketan Oryza sativa L., huruf "L." di bagian belakang memiliki arti ...',
    options: [
      'Tanaman tersebut berasal dari benua Latin',
      'Nama penemu/deskriptor pertama tanaman tersebut (Linnaeus)',
      'Tanaman tersebut berstatus langka (Limited)',
      'Spesies tersebut termasuk kelompok tumbuhan liar (Local)'
    ],
    correctIndex: 1,
    explanation: 'Huruf "L." adalah singkatan resmi dari Carolus Linnaeus yang pertama kali mendeskripsikan dan menamai spesies tersebut.',
  },

  // --- PERTEMUAN 3 (Soal 21 - 30) ---
  {
    id: 21,
    materi: 'Pertemuan 3',
    topicDetail: 'Klasifikasi 6 Kingdom',
    question: 'Sistem klasifikasi 6 kingdom yang diperkenalkan oleh Carl Woese membagi dunia bakteri menjadi dua kingdom terpisah, yaitu ...',
    options: [
      'Monera dan Protista',
      'Archaebacteria dan Eubacteria',
      'Bakteriofag dan Bakteri gram',
      'Kokus dan Basil'
    ],
    correctIndex: 1,
    explanation: 'Carl Woese memisahkan Monera menjadi dua kingdom (Archaebacteria dan Eubacteria) berdasarkan perbedaan sekuens rRNA dan struktur dinding sel.',
  },
  {
    id: 22,
    materi: 'Pertemuan 3',
    topicDetail: 'Ciri Archaebacteria',
    question: 'Bakteri Archaebacteria kelompok metanogen memiliki ciri khas mampu ...',
    options: [
      'Hidup di air laut dengan kadar garam jenuh 30%',
      'Menghasilkan gas metana (CH4) dari zat organik dalam kondisi anaerob',
      'Melakukan fotosintesis menggunakan pigmen fikosianin',
      'Menghasilkan spora beracun pembunuh serangga'
    ],
    correctIndex: 1,
    explanation: 'Metanogen mereduksi CO2 atau asam asetat menjadi gas metana pada kondisi tanpa oksigen (anaerobik), misalnya di rawa atau perut sapi.',
  },
  {
    id: 23,
    materi: 'Pertemuan 3',
    topicDetail: 'Ciri Sel Eubacteria',
    question: 'Bakteri Eubacteria tergolong sel prokariotik karena ...',
    options: [
      'Tidak memiliki ribosom dan mitokondria',
      'Tidak memiliki membran inti sel (karioteka)',
      'Tidak memiliki DNA dan sitoplasma',
      'Tubuhnya selalu tersusun dari banyak sel (multiseluler)'
    ],
    correctIndex: 1,
    explanation: 'Prokariotik (pro = sebelum, karyon = inti): materi genetiknya tidak diselubungi membran inti sel.',
  },
  {
    id: 24,
    materi: 'Pertemuan 3',
    topicDetail: 'Kingdom Protista',
    question: 'Alasan mengapa Amoeba proteus dan Paramecium caudatum dimasukkan ke dalam Kingdom Protista bukan Animalia adalah ...',
    options: [
      'Keduanya tersusun atas sel eukariotik tunggal (uniseluler) tanpa jaringan sejati',
      'Keduanya mampu melakukan fotosintesis menghasilkan glukosa',
      'Keduanya memiliki dinding sel yang sangat tebal',
      'Keduanya berkembang biak dengan melahirkan anak'
    ],
    correctIndex: 0,
    explanation: 'Protozoa merupakan protista eukariotik uniseluler (bersel tunggal) dan tidak membentuk jaringan tubuh sejati seperti hewan multiseluler.',
  },
  {
    id: 25,
    materi: 'Pertemuan 3',
    topicDetail: 'Kingdom Fungi - Cara Nutrisi',
    question: 'Jamur tidak dapat membuat makanan sendiri karena tidak memiliki klorofil. Jamur memperoleh makanan dengan cara menyerap zat organik dari lingkungan sekitar, sehingga jamur bersifat ...',
    options: ['Fotoautotrof', 'Kemoautotrof', 'Heterotrof absorptif', 'Kemosintetik'],
    correctIndex: 2,
    explanation: 'Jamur bersifat heterotrof absorptif: mengeluarkan enzim hidrolitik ke substrat lalu menyerap molekul nutrisi sederhana yang larut.',
  },
  {
    id: 26,
    materi: 'Pertemuan 3',
    topicDetail: 'Struktur Fungi',
    question: 'Dinding sel jamur (Fungi) tersusun dari zat yang sama dengan zat penyusun eksoskeleton serangga dan udang, yaitu zat ...',
    options: ['Selulosa', 'Pektin', 'Kitin', 'Lignin'],
    correctIndex: 2,
    explanation: 'Dinding sel jamur tersusun atas zat kitin (glukosamin polimerik), bukan selulosa.',
  },
  {
    id: 27,
    materi: 'Pertemuan 3',
    topicDetail: 'Kingdom Plantae - Dinding Sel',
    question: 'Ciri pembeda utama yang dimiliki oleh sel tumbuhan (Plantae) dan TIDAK dimiliki oleh sel hewan (Animalia) adalah ...',
    options: [
      'Membran sel dan sitoplasma',
      'Mitokondria dan ribosom',
      'Dinding sel selulosa dan kloroplas',
      'Membran inti sel dan kromosom'
    ],
    correctIndex: 2,
    explanation: 'Sel tumbuhan memiliki dinding sel dari selulosa yang kaku serta kloroplas berklorofil untuk fotosintesis.',
  },
  {
    id: 28,
    materi: 'Pertemuan 3',
    topicDetail: 'Kingdom Plantae - Divisi',
    question: 'Tumbuhan lumut (Bryophyta) dan tumbuhan paku (Pteridophyta) memiliki persamaan yaitu sama-sama ...',
    options: [
      'Menghasilkan biji di dalam buah',
      'Berkembang biak dan menyebarkan diri menggunakan spora',
      'Memiliki pembuluh angkut xilem dan floem yang sangat besar',
      'Tidak memiliki klorofil untuk fotosintesis'
    ],
    correctIndex: 1,
    explanation: 'Lumut dan paku adalah kormofita berspora (kriptogamae) yang tidak menghasilkan bunga atau biji.',
  },
  {
    id: 29,
    materi: 'Pertemuan 3',
    topicDetail: 'Kingdom Animalia - Ciri',
    question: 'Semua anggota Kingdom Animalia memiliki karakteristik umum berupa ...',
    options: [
      'Eukariotik, multiseluler, berdinding sel, autotrof',
      'Eukariotik, multiseluler, tidak berdinding sel, heterotrof',
      'Prokariotik, uniseluler, memiliki flagela, dekomposer',
      'Eukariotik, uniseluler atau multiseluler, berdinding sel kitin'
    ],
    correctIndex: 1,
    explanation: 'Hewan (Animalia) adalah eukariota multiseluler tanpa dinding sel, bersifat heterotrof dan umumnya mampu bergerak aktif.',
  },
  {
    id: 30,
    materi: 'Pertemuan 3',
    topicDetail: 'Kingdom Animalia - Invertebrata vs Vertebrata',
    question: 'Di antara hewan berikut, kelompok yang seluruh anggotanya merupakan Invertebrata (tidak bertulang belakang) adalah ...',
    options: [
      'Kupu-kupu, cacing tanah, dan gurita',
      'Katak, ikan bandeng, dan penyu',
      'Kelelawar, burung merpati, dan buaya',
      'Ular piton, lumba-lumba, dan salamander'
    ],
    correctIndex: 0,
    explanation: 'Kupu-kupu (Arthropoda), cacing tanah (Annelida), dan gurita (Mollusca) semuanya hewan avertebrata/invertebrata tanpa kolumna vertebralis.',
  },
];
