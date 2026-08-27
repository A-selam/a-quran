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
