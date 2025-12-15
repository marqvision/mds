export type DateValidationError = 'INVALID_DATE' | 'MIN_DATE' | 'MAX_DATE';
export type AvailableDateFormat =
  | 'MM/DD/YYYY' // 06/26/2025
  | 'YYYY-MM-DD' // 2025-06-26
  | 'MMM DD, YYYY' // Jan 01, 2020
  | 'M.D'; // 6.26
