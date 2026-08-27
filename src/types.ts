export interface TranslatedName {
  languageName: string;
  name: string;
}

export interface Qirat {
  languageName: string;
  name: string;
}

export interface RecitationStyle {
  name: string;
  translatedName: TranslatedName;
}

export interface ChapterReciter {
  id: number;
  name: string;
  qirat: Qirat;
  style: RecitationStyle;
  translatedName: TranslatedName;
}

export type ChapterRecitersList = ChapterReciter[];

export interface QuranChapter {
  id: number;
  link: string;
  name: string;
  total_verses: number;
  translation: string;
  transliteration: string;
  type: "meccan" | "medinan";
}

export type QuranChaptersList = QuranChapter[];
