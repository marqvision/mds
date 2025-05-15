import React from 'react';

type ClickableBackButtonProps = {
  /*
   * 뒤로가기 버튼 클릭 이벤트
   */
  onBack?: () => void;

  LinkComponent?: never;
  backTo?: never;
};

type LinkBackButtonProps = {
  /*
   * 렌더링할 컴포넌트
   * react-router-dom 의 Link 를 주입하여 사용해야 합니다.
   * LinkComponent 를 주입하지 않으면 기본적으로 button 태그로 렌더링됩니다.
   */
  LinkComponent: React.ComponentType<{ to: string; children: React.ReactNode }>;
  /*
   * 뒤로가기 클릭 시 이동할 경로
   */
  backTo: string;

  onBack?: never;
};

export type ButtonProps = ClickableBackButtonProps | LinkBackButtonProps;

export type PageHeaderProps = {
  /*
   * 페이지 제목
   */
  pageTitle: string;
  /*
   * 페이지 제목 우측에 출력할 요소
   * 여러 개의 요소 전달 시 gap 을 자동으로 부여합니다.
   */
  children?: React.ReactNode;
} & ButtonProps;
