export interface ICategor {
  title: string;
  language: string;
  id: number;
  index: number;
}

export interface INews {
  title: string;
  id: number;
  index: number;
  containers: {
    description: string;
    id: number;
  }[];
  isTsted: boolean;
  country: string;
  language: string;
  coverImageLink: string;
  CoverImage: {
    url: string;
  };
  created_at: string;
}

export interface ILanguage {
  label: string;
  value: string;
}
