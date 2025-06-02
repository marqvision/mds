import React from 'react';
import { LinkComponentProps, LinkPath } from '../../../types';

type ClickableBackButtonProps = {
  /*
   * 뒤로가기 버튼 클릭 이벤트
   */
  onClick: () => void;
  /*
   * hover 시 표시될 이전 페이지 타이틀
   */
  label: string;

  LinkComponent?: never;
  to?: never;
};

type LinkBackButtonProps = {
  /*
   * 렌더링할 컴포넌트
   * react-router-dom 의 Link 를 주입하여 사용해야 합니다.
   * LinkComponent 를 주입하지 않으면 기본적으로 button 태그로 렌더링됩니다.
   */
  LinkComponent: React.ComponentType<LinkComponentProps>;
  /*
   * 뒤로가기 클릭 시 이동할 경로
   */
  to: LinkPath;
  /*
   * hover 시 표시될 이전 페이지 타이틀
   */
  label: string;

  onClick?: never;
};

export type BackButtonProps = ClickableBackButtonProps | LinkBackButtonProps;

export type PageHeaderProps = {
  /*
   * 페이지 제목
   */
  pageTitle: React.ReactNode;
  /*
   * 페이지 제목 우측에 출력할 요소
   * 여러 개의 요소 전달 시 gap 을 자동으로 부여합니다.
   */
  children?: React.ReactNode;
  /*
   * padding bottom 설정
   * @default `false`
   * `false` 일 경우 하단 여백이 상단 여백과 동일하게 설정됩니다.
   * `true` 일 경우 하단 여백이 상단 여백보다 더 작게 설정되며, border-bottom 이 사라집니다.
   */
  isCompact?: boolean;
  /*
   * 뒤로가기 버튼 클릭 이벤트
   */
  backButton?: BackButtonProps;
};
