import { MDSThemeColorPath } from "../../../types";


export type StyledWrapperProps = {
  backgroundColor?: MDSThemeColorPath;
  height: string;
};

/**
 * @property {string} title - EmptyView 에 표시될 제목.
 * @property {string} [description] - 선택적으로 추가 정보를 제공하는 설명.
 * @property {MDSThemeColorPath} [backgroundColor] - EmptyView 의 배경색. 테마 색상 경로로 지정.
 * @property {string} [height] - EmptyView 의 높이. CSS 호환 문자열로 선택적으로 정의.
 * @property {React.ReactNode} children - description 하단에 렌더링될 내용. (버튼 등)
 */
export type EmptyViewProps = React.PropsWithChildren<{
  title: string;
  description?: string;
  backgroundColor?: MDSThemeColorPath;
  height?: string;
}>;