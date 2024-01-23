import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems, makePassword } from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_RATING = 1;
const MAX_RATING = 5;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const isFavorite = !!generateRandomValue(0, 1);
    const isPremium = !!generateRandomValue(0, 1);
    const isPro = !!generateRandomValue(0, 1);

    const images = (this.mockData.images.join(';'));
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const previewImage = getRandomItem<string>(this.mockData.previewImage);
    const type = getRandomItem(this.mockData.types);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const user = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarUrl = getRandomItem<string>(this.mockData.avatars);
    const { name: nameCity } = getRandomItem(this.mockData.cities);
    const { location } = getRandomItem(this.mockData.cities);
    const conveniences = getRandomItems<string>(this.mockData.conveniences);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const password = makePassword(15);

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    // const [firstname, lastname] = user.split(' ');

    return [
      title, type, price, description, createdDate, nameCity,
      location.latitude, location.longitude, previewImage, images,
      conveniences, isFavorite, isPremium, rating, bedrooms, guests,
      avatarUrl, email, isPro, user, password
    ].join('\t');
  }
}
