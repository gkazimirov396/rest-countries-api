export interface Country {
  flags: Flags;
  name: Name;
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  cca3: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface NativeName {
  eng: Eng;
}

export interface Eng {
  official: string;
  common: string;
}
