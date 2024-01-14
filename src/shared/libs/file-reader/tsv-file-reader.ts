import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, OfferType, CityName } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, type, price, description, createdDate, nameCity, latitude, longitude, previewImage, images, conveniences, isFavorite, isPremium, rating, bedrooms, guests, avatarUrl, email, isPro, nameUser, password]) => ({
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
        user: {
          avatarUrl,
          email,
          isPro: Boolean(isPro),
          name: nameUser,
          password,
        }
      }));
  }
}
