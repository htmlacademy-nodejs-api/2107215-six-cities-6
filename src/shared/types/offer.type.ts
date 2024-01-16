import { OfferType } from './offer-type.enum.js';
import { City } from './city.type.js';
import { User } from './user.type.js';
import { Location } from './location.type.js';

export type Offer = {
  title: string;
  type: OfferType;
  price: number;
  city: City;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  postDate: Date;
  previewImage: string;
  images: string[];
  conveniences: string[];
  description: string;
  bedrooms: number;
  guests: number;
  location: Location
  user: User;
}
