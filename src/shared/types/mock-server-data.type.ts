import { City } from './city.type.js';
import { Location } from './location.type.js';

export type MockServerData = {
  conveniences: string[];
  titles: string[];
  descriptions: string[];
  previewImage: string[];
  images: string[];
  users: string[];
  emails: string[];
  avatars: string[];
  types: string[];
  location: Location[];
  cities: City[];
};
