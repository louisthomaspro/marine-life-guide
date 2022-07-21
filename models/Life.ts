export interface ILife {
  id: number;
  scientific_name: string;
  french_common_name: string;
  english_common_name: string;
  wikipedia_url: string;
  photos: IPhoto[];
  conservation_status: string; // IUCN Red List authority
}

export interface IPhoto {
  id: number;
  medium_url: string;
  [x: string | number | symbol]: unknown;
}
