# MDS: MarqVision Design System

# Storybook 실행

```bash
# marqvision-web root
$ npm run mds2

# or

# marqvision-web/packages/mds-v2
$ npm run storybook
```

# Contribution Guide

## Tech stack
- core: react@18.2
- style-library: emotion@11
- headless-ui-frameworks: @mui/base, etc...
- testing/docs: jest, storybook


## Project Structure

```
├── @stories: components, hooks, theme, utils 에서 개발된 각 내용의 story가 위치합니다.
├── @system: 컴포넌트를 개발하는 데에 필요한 각종 도구가 위치합니다.
├── foundation: MDS를 이루는 design token, font, 이를 통합하는 theme등의 코드가 위치합니다.
├── components: Button, Checkbox, Dropdown 과 같은 컴포넌트가 위치합니다
├── hooks: component처럼 애플리케이션에서 불러와 단독으로 쓰일 수 있는 디자인 시스템의 유틸성 커스텀 hook이 위치합니다.
└── utils: component처럼 애플리케이션에서 불러와 단독으로 쓰일 수 있는 디자인 시스템의 유틸성 커스텀 함수가 위치합니다.
```

> 💡 MDS 사용자는 @stories, @system 폴더 내용에는 접근할 수 _없습니다_

## Rules

_이 문서에서는 MDS 개발 전반에 적용되는 Rule을 소개합니다. 각 컴포넌트별 룰은 해당 컴포넌트의 문서를 참고해주세요._

> 💡 **RULE NO.1** 💡
> 
> Storybook 상태를 반드시 최신으로 유지해주세요

### 1. Component 작성 가이드

1. 모든 컴포넌트는 `/components` 폴더에 작성해주세요
2. 모든 컴포넌트의 이름에는 "MDS" prefix를 붙이며, Figma에서 명명된 이름과 같은 이름으로 맞춰주세요

   ```jsx
   <MDSTypography /> // Recommended ✅
   <Typography /> // bad 👎 MDS prefix 누락
   <MDSText /> // bad 👎 Figma에 존재하지 않는 컴포넌트 이름
   ```

3. 모든 컴포넌트의 index.tsx에서는 MDS 사용자가 접근할 수 있는 항목을 export 합니다.
   1. 메인 컴포넌트와 메인 컴포넌트의 Props는 반드시 export 해주세요.
      1. export시 `export const COMPONENT_NAME`, `export type COMPONENT_PROPS` 형태로 export 합니다.
   2. MDS 사용자에게 혼란을 줄 수 있는 항목은 export되지 않도록 주의해주세요.

### 2. props 작성 가이드

1. 가능한한 모든 props는 optional 타입으로 선언해주시고, Figma에서 설정된 크기와 색상으로 "기본값" 을 맞춰주세요.

   ```jsx
   <MDSTypography /> // Recommended ✅
   <MDSTypography variant='T16' weight='regular' ... /> // Not recommended ✅
   ```

2. MDS 유저에게 노출되는 모든 props에는 해당 props를 설명하는 주석을 작성해주세요.

   ```ts
   export type Features = {
     /**
      * 타이포그래피의 종류.
      * 기본값은 T16입니다.
      */
     variant?: 'T24' | 'T20' | 'T18' | 'T16' | 'T14' | 'T13' | 'T12';
     /**
      * 타이포그래피의 굵기.
      * 기본값은 regular입니다.
      */
     weight?: 'bold' | 'medium' | 'regular' | 'light';
     /**
      * 말줄일 라인 수.
      * 기본값은 말줄임 없음(=0)입니다.
      */
     lineClamp?: number;
   };
   ```

3. 컴포넌트는 렌더링된 결과 html element의 attribute를 props로 받을 수 있어야 합니다.  
    ```tsx
    // <button>으로 렌더링되므로 html button의 attribute를 prop으로 받을 수 있어야 함
    <MDSButton type='submit' popovertargetaction='hide'>Submit</MDSButton> 

    // 타입으로 HTMLAttributes<HTMLButtonElement>를 추가하여 이를 지원.
    type MDSButtonProps = Features & HTMLAttributes<HTMLButtonElement>;
    ```

4. props 네이밍 가이드
   1. rules
      - 기존 html attribute 이름으로 존재할법한 네이밍은 가급적 피해주세요 (예: type)
      - 기존 html attribute로 존재하지만 해당 기능을 확장하는 경우 주석에 명시해주세요 (예: maxLength)
   2. 주요 props
      1. `variant`: 한 컴포넌트가 여러 모양으로 변환될 수 있을 때 사용합니다. 
         - type: `string union` 타입
         ```jsx
         <MDSIcon.ArrowLeft variant="border" />
         <MDSIcon.ArrowLeft variant="fill" />
         <MDSIcon.ArrowLeft variant="outline" />
         ```

      2. `size`, `width`, `height`: 한 컴포넌트가 여러 크기로 변환될 수 있을 때 사용합니다.
         - type: px단위는 `number`로, 이외의 단위는 `string` 혹은 `string union` 으로 잡아주세요.
         ```jsx
         <MDSIcon.ArrowLeft variant="border" size={32} /> // 32px
         <MDSButton variant="fill" size='small' />
         ```

      3. `as`: 컴포넌트가 렌더링 될 html 태그 요소를 설정합니다.
         -  type: `React.ElementType`  
  

