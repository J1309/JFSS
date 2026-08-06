/**
 * Real product photography from /public/Product Images.
 *
 * Images only — no names, prices or other metadata on purpose. Real product
 * details get attached later; until then nothing here invents a claim about
 * a garment. The legacy placeholder art in /public/images is untouched and
 * still powers the existing catalogue.
 */
const FOLDER = '/Product Images';

const FILES = [
  'BROOKLYN_8.jpg',
  'Bespirit.jpg',
  'Elan.jpg',
  'Elan_black.jpg',
  'RL polo.jpg',
  'RL_brown.jpg',
  'RL_light_green.jpg',
  'RoyalMan _Purple_Stripe.jpg',
  'Sowatt_1962.jpg',
  'Veliger.jpg',
  'photo_2026-08-06_21-47-27.jpg',
  'photo_2026-08-06_21-47-31.jpg',
  'photo_2026-08-06_21-47-35.jpg',
  'photo_2026-08-06_21-47-38.jpg',
  'photo_2026-08-06_21-47-41.jpg',
  'photo_2026-08-06_21-47-44.jpg',
  'photo_2026-08-06_21-47-48.jpg',
  'photo_2026-08-06_21-47-54.jpg',
  'photo_2026-08-06_21-47-57.jpg',
];

export type LookbookShot = { id: string; src: string };

// encodeURI keeps the spaces in the folder and file names valid in a URL.
export const lookbook: LookbookShot[] = FILES.map((file) => ({
  id: file,
  src: encodeURI(`${FOLDER}/${file}`),
}));
