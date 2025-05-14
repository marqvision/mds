import { ValueEnum } from './@types';

export const LABEL_MAP: {
  [key in ValueEnum]: string;
} = {
  [ValueEnum.Lorem]: 'Lorem Ipsum Dolor Sit Amet',
  [ValueEnum.Xyz123]: 'Variable Xyz123',
  [ValueEnum.LongNameForTesting]: 'Example Long Variable Name for Testing',
  [ValueEnum.StoragePlaceholder]: 'Temporary Storage Placeholder',
  [ValueEnum.ContentPlaceholder]: 'Dynamic Content Placeholder for Testing Purposes',
} as const;
