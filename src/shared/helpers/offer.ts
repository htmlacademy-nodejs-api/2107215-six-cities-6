import { Offer, OfferType, CityName } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    type,
    price,
    description,
    createdDate,
    nameCity,
    latitude,
    longitude,
    previewImage,
    images,
    conveniences,
    isFavorite,
    isPremium,
    rating,
    bedrooms,
    guests,
    avatarUrl,
    email,
    isPro,
    nameUser,
    password
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    avatarUrl,
    email,
    isPro: Boolean(isPro),
    name: nameUser,
    password,
  };

  return {
    title,
    type: OfferType[type as keyof typeof OfferType],
    price: Number.parseInt(price, 10),
    city: {
      name: CityName[nameCity as keyof typeof CityName],
      location: {
        latitude: Number.parseFloat(latitude),
        longitude: Number.parseFloat(longitude),
      }
    },
    isFavorite: Boolean(isFavorite),
    isPremium: Boolean(isPremium),
    rating: Number.parseFloat(rating),
    postDate: new Date(createdDate),
    previewImage,
    images: images.split(';')
      .map((image) => (image)),
    conveniences: conveniences.split(';')
      .map((convenience) => (convenience)),
    description,
    bedrooms: Number.parseInt(bedrooms, 10),
    guests: Number.parseInt(guests, 10),
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    },
    user
  };
}
