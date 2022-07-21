export interface IAlgoliaResponse {
  id: number;
  scientific_name: string;
  french_common_name: string;
  english_common_name: string;
  ["photo.medium_url"]: string;
  conservation_status: string; // IUCN Red List authority
}