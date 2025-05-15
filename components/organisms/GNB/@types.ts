import React from 'react';

export type GNBProps = {
  /*
   * LNB 펼침 여부
   * `true` 일 경우 LNB 가 펼쳐지고 label 이 보여집니다.
   * `false` 일 경우 LNB 가 접히며 label 이 숨겨집니다.
   */
  isLNBOpen: boolean;
  /*
   * LNB 펼침 토글 핸들러
   * LNB 펼침 여부를 변경하는 핸들러입니다.
   */
  onLNBToggle: () => void;
  /*
   * GNB 우측 utility 영역에 출력할 요소
   */
  children?: React.ReactNode;
  /*
   * 고객사 로고 이미지
   * 전달하지 않을 경우 MARQ AI 로고가 출력됩니다.
   */
  logoUrl?: string;
};
