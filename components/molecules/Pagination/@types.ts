export type Language = 'en' | 'ko';

export type Props = {
  /**
   * 언어 설정
   * @default en
   * */
  language?: Language;
  /** @description 현재 페이지의 시작 offset (0부터 시작) */
  value: number;
  /** @description value: 변경된 페이지의 시작 offset */
  onChange: (value: number) => void;
  /** @description 리스트 아이템의 전체 length */
  totalCount: number;
  /** @description 한 페이지당 보여주는 아이템 수 */
  pageSize: number;
};
