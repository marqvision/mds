import { Global, css } from '@emotion/react';
import { COLOR_TOKENS } from './colors';
import './statics/fonts/index.css';

const FONT_STYLE_VALUES = {
  EN: {
    title: `
      --font-title-letter-spacing-2xl-semibold: -0.55px;
      --font-title-letter-spacing-2xl-medium: -0.48px;
      --font-title-letter-spacing-xl-semibold: -0.4px;
      --font-title-letter-spacing-xl-medium: -0.35px;
      --font-title-letter-spacing-l-semibold: -0.315px;
      --font-title-letter-spacing-l-medium: -0.27px;
      --font-title-letter-spacing-m-semibold: -0.24px;
      --font-title-letter-spacing-m-medium: -0.175px;
    `,
    body: `
      --font-body-letter-spacing-l-medium: -0.28px;
      --font-body-letter-spacing-l-regular: -0.24px;
      --font-body-letter-spacing-m-medium: -0.21px;
      --font-body-letter-spacing-m-regular: -0.175px;
      --font-body-letter-spacing-s-medium: -0.162px;
      --font-body-letter-spacing-s-regular: -0.13px;
      --font-body-letter-spacing-xs-medium: -0.12px;
      --font-body-letter-spacing-xs-regular: -0.09px;
    `,
  },
  KO: {
    title: `
      --font-title-letter-spacing-xl-semibold: 0px;
      --font-title-letter-spacing-xl-medium: 0px;
      --font-title-letter-spacing-l-semibold: 0px;
      --font-title-letter-spacing-l-medium: 0px;
      --font-title-letter-spacing-m-semibold: 0px;
      --font-title-letter-spacing-m-medium: 0px;
      --font-title-letter-spacing-s-semibold: 0px;
      --font-title-letter-spacing-s-medium: 0px;
      --font-title-letter-spacing-s-regular: 0px;
    `,
    body: `
      --font-body-letter-spacing-l-medium: 0px;
      --font-body-letter-spacing-l-regular: 0px;
      --font-body-letter-spacing-m-medium: 0px;
      --font-body-letter-spacing-m-regular: 0px;
      --font-body-letter-spacing-s-medium: 0px;
      --font-body-letter-spacing-s-regular: 0px;
      --font-body-letter-spacing-xs-medium: 0px;
      --font-body-letter-spacing-xs-regular: 0px;
    `,
  },
};
export const MDSFontCSS = ({
  useNewFont,
  isDisplayTypographyDebug,
}: {
  useNewFont?: boolean;
  isDisplayTypographyDebug?: boolean;
}) => (
  <Global
    styles={css`
      // 기본 폰트 설정
      :root {
        --font-title-semibold: 640;
        --font-title-medium: 540;
        --font-body-medium: 540;
        --font-body-regular: 420;

        ${FONT_STYLE_VALUES.EN.title}
        ${FONT_STYLE_VALUES.EN.body}
      }
      :lang(ko) {
        letter-spacing: 0;
        ${FONT_STYLE_VALUES.KO.title}
        ${FONT_STYLE_VALUES.KO.body}
      }

      // todo-@jamie: [PROD-12758] prop 값들로 조건 걸린 코드들 삭제하기
      /**
       * 왜 :lang과 html[lang='ko'] 둘 다 써야 하는가?
       * :lang으로만 설정했을 경우에, 영어는 계속 PP Neue Montreal로 나온다.
       * 그래서 html[lang=]을 이용해서 영어폰트도 Pretendard로 리셋시켜버린다.
       */
      html[lang='ko'] {
        font-family: 'Pretendard Variable !important';
        letter-spacing: 0;
        ${FONT_STYLE_VALUES.KO.title}
        ${FONT_STYLE_VALUES.KO.body}
      }
      html[lang='en'] {
        font-family: ${useNewFont ? '"Inter", Pretendard Variable !important' : 'Visuelt-Regular'};
        ${FONT_STYLE_VALUES.EN.title}
        ${FONT_STYLE_VALUES.EN.body}
      }

      html[lang='ko'] button,
      html[lang='ko'] input,
      html[lang='ko'] textarea,
      html[lang='ko'] select,
      html[lang='ko'] svg {
        font-family: 'Pretendard Variable !important';
      }
      html[lang='en'] button,
      html[lang='en'] input,
      html[lang='en'] textarea,
      html[lang='en'] select,
      html[lang='en'] svg {
        font-family: ${useNewFont ? '"Inter", Pretendard Variable !important' : 'Visuelt-Regular'};
      }

      ${useNewFont
        ? `
        html[lang='en'] *[data-typography-new-font] {
          font-family: "Inter", "Pretendard Variable" !important;
        }
        html[lang='ko'] *[data-typography-new-font] {
          font-family: "Pretendard Variable" !important;
        }
        `
        : ''}

      ${isDisplayTypographyDebug
        ? `
        *[data-typography-new-font] {
          background-color: #ffcece !important;
        }
        `
        : ''}
    `}
  />
);
export const MDSResetCSS = () => (
  <Global
    styles={css`
      // 기본 리셋

      /***
        The new CSS reset - version 1.11.2 (last updated 15.11.2023)
        GitHub page: https://github.com/elad2412/the-new-css-reset
      ***/

      /*
        Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
        - The "symbol *" part is to solve Firefox SVG sprite bug
        - The "html" element is excluded, otherwise a bug in Chrome breaks the CSS hyphens property (https://github.com/elad2412/the-new-css-reset/issues/36)
      */

      *:where(
          :not(html, iframe, canvas, img, svg, video, audio, button, dialog, table, thead, tbody, tr, td, th, col):not(
              svg *,
              symbol *
            )
        ) {
        all: unset;
        display: revert;
      }

      /* Preferred box-sizing value */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      /* Fix mobile Safari increase font-size on landscape mode */
      html {
        -moz-text-size-adjust: none;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      }

      /* Reapply the pointer  cursor for anchor tags */
      a,
      button {
        cursor: revert;
      }
      a {
        color: ${COLOR_TOKENS.content.primary.default.normal};
        text-decoration: underline;
      }
      a:hover {
        color: ${COLOR_TOKENS.content.primary.default.hover};
      }
      a:visited,
      a:active {
        color: ${COLOR_TOKENS.content.primary.default.normal};
      }

      /* Remove list styles (bullets/numbers) */
      ol,
      ul,
      menu,
      summary {
        list-style: none;
      }

      /* For images to not be able to exceed their container */
      img {
        max-inline-size: 100%;
        max-block-size: 100%;
      }

      /* removes spacing between cells in tables */
      table {
        border-collapse: collapse;
      }

      /* Safari - solving issue when using user-select:none on the <body> text input doesn't working */
      input,
      textarea {
        -webkit-user-select: auto;
      }

      /* revert the 'white-space' property for textarea elements on Safari */
      textarea {
        white-space: revert;
      }

      /* minimum style to allow to style meter element */
      meter {
        -webkit-appearance: revert;
        appearance: revert;
      }

      em {
        font-style: italic;
      }

      /* preformatted text - use only for this feature */
      :where(pre) {
        all: revert;
        box-sizing: border-box;
      }

      /* reset default text opacity of input placeholder */
      ::placeholder {
        color: unset;
      }

      /* fix the feature of 'hidden' attribute.
         display:revert; revert to element instead of attribute
      */
      :where([hidden]) {
        display: none;
      }

      /* revert for bug in Chromium browsers
        - fix for the content editable attribute will work properly.
        - webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element
      */
      :where([contenteditable]:not([contenteditable='false'])) {
        -moz-user-modify: read-write;
        -webkit-user-modify: read-write;
        overflow-wrap: break-word;
        -webkit-line-break: after-white-space;
        -webkit-user-select: auto;
      }

      /* apply back the draggable feature - exist only in Chromium and Safari */
      :where([draggable='true']) {
        -webkit-user-drag: element;
      }

      /* Revert Modal native behavior */
      :where(dialog:modal) {
        all: revert;
        box-sizing: border-box;
      }

      /* Remove details summary webkit styles */
      ::-webkit-details-marker {
        display: none;
      }
    `}
  />
);
