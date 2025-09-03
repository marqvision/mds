import { ReactElement } from 'react';
import { MDSTypography } from '../../atoms/Typography';
import { Language } from './@types';

export const PAGINATION_LABELS: Record<Language, (start: number, end: number, total: number) => ReactElement> = {
  en: (start, end, total) => (
    <>
      <MDSTypography as="span" weight="medium" size="s">
        {start} - {end}
      </MDSTypography>
      of {total}
    </>
  ),
  ko: (start, end, total) => (
    <>
      {total} 중{' '}
      <MDSTypography as="span" weight="medium" size="s">
        {start} - {end}
      </MDSTypography>
    </>
  ),
};
