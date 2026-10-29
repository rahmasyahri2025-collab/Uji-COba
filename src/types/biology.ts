export type ActiveTab = 
  | 'apersepsi' 
  | 'pertemuan1' 
  | 'pertemuan2' 
  | 'pertemuan3' 
  | 'tgt' 
  | 'posttest';

export interface CiriMakhlukHidup {
  id: string;
  nama: string;
  deskripsi: string;
  contoh: string;
  icon: string;
  pertanyaanKritis: string;
  jawabanKritis: string;
}

export interface KunciDeterminasiNode {
  step: string;
  statementA: string;
  targetA: string; // e.g. "2" or organism name like "Kucing"
  statementB: string;
  targetB: string;
}

export interface TaksonLevel {
  tingkat: string;
  latin: string;
  keterangan: string;
  manusia: string;
  harimau: string;
  padi: string;
}

export interface KingdomInfo {
  id: string;
  nama: string;
  namaLatin: string;
  tipeSel: 'Prokariotik' | 'Eukariotik';
  jumlahSel: 'Uniseluler' | 'Multiseluler' | 'Uniseluler & Multiseluler';
  dindingSel: string;
  nutrisi: 'Autotrof' | 'Heterotrof' | 'Autotrof & Heterotrof';
  ciriKhas: string[];
  contoh: {
    namaUmum: string;
    namaIlmiah: string;
    deskripsi: string;
    gambarSymbol: string;
  }[];
  peranan: {
    positif: string;
    negatif: string;
  };
}

export interface TGTTeam {
  id: number;
  name: string;
  badge: string;
  score: number;
  members: string;
  streak: number;
}

export interface TGTQuestion {
  id: number;
  category: 'Pertemuan 1' | 'Pertemuan 2' | 'Pertemuan 3' | 'Tantangan Cepat';
  level: 'Mudah (100)' | 'Sedang (200)' | 'HOTS (300)';
  points: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface PostTestQuestion {
  id: number;
  materi: 'Pertemuan 1' | 'Pertemuan 2' | 'Pertemuan 3';
  topicDetail: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
