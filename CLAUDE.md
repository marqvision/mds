# MDS v2 (MarqVision Design System v2)

## 개요

MDS v2는 Emotion CSS-in-JS 및 TypeScript로 구축된 MarqVision의 현대적인 디자인 시스템입니다. 모든 MarqVision 애플리케이션에서 일관된 사용자 인터페이스를 구축하기 위한 포괄적인 UI 컴포넌트, 테마 및 기반 요소 세트를 제공합니다.

## 아키텍처

이 앱은 [루트 CLAUDE.md](../../CLAUDE.md)에 정의된 전체 아키텍처 패턴을 따릅니다.

## 패키지 구조 및 규칙

### 폴더 구성

```
packages/mds-v2/
├── components/         # UI 컴포넌트 (Atomic Design)
│   ├── atoms/          # 원자 컴포넌트 (Button, Input 등)
│   ├── molecules/      # 분자 컴포넌트 (SearchBar, Card 등)
│   └── organisms/      # 유기체 컴포넌트 (Header, Table 등)
├── foundation/         # 디자인 토큰 및 기반
│   ├── components/     # 기반 레벨 컴포넌트
│   └── statics/        # 정적 디자인 값
├── utils/              # 컴포넌트 유틸리티
├── @stories/           # Storybook 스토리
│   ├── components/     # 컴포넌트 스토리
│   └── foundation/     # 기반 스토리
├── .storybook/         # Storybook 구성
├── index.ts            # 메인 export 파일
├── types.ts            # 공유 타입
└── emotionTheme.d.ts   # Emotion 테마 타입
```

### 네이밍 규칙 (루트와의 차이점)

이 패키지는 특정 규칙과 함께 **Atomic Design** 원칙을 따릅니다:

**컴포넌트 계층:**
1. **Atoms** (`components/atoms/`)
   - 가장 작고 나눌 수 없는 UI 컴포넌트
   - 예시: Button, Input, Icon, Badge
   - 다른 컴포넌트에 대한 의존성 없음
   - 높은 재사용성

2. **Molecules** (`components/molecules/`)
   - 원자들의 조합
   - 예시: SearchBar (Input + Button), FormField (Label + Input)
   - 제한된 내부 상태
   - 집중된 기능

3. **Organisms** (`components/organisms/`)
   - 분자와 원자로 구성된 복잡한 컴포넌트
   - 예시: Header, DataTable, Modal
   - 중요한 내부 로직 가능
   - UI의 고유한 섹션 표현

**파일 구성:**
- 각 컴포넌트는 자체 폴더에 위치
- 폴더 이름은 컴포넌트 이름과 일치 (PascalCase)
- Index 파일이 컴포넌트를 export
- 테스트는 컴포넌트와 함께 위치

**기반 vs 컴포넌트:**
- `foundation/`: 디자인 토큰 (색상, 간격, 타이포그래피)
- `foundation/components/`: 디자인 토큰을 제공하는 기본 컴포넌트
- `foundation/statics/`: 정적 값 및 상수

## 배럴 패턴 (Barrel Pattern)

MDS v2는 **배럴 패턴**을 사용하여 깔끔하고 일관된 import 경로를 제공합니다.

### ✅ 올바른 사용 (배럴 패턴)

```typescript
// 좋음: 패키지 루트에서 직접 import
import { MDSButton, MDSIcon, MDSTypography } from '@marqvision/mds-v2';
import { MDSCheckbox, MDSDivider } from '@marqvision/mds-v2';
import { MDSInput, MDSDropdown, MDSTag } from '@marqvision/mds-v2';
import { MDSModal, MDSSnackbar, MDSTable } from '@marqvision/mds-v2';
import { MDSThemeProvider, _MDSThemeValue, MDSSnackbarContainer } from '@marqvision/mds-v2';
```

### ❌ 잘못된 사용 (내부 경로 직접 접근)

```typescript
// 나쁨: 내부 경로 직접 접근
import { MDSButton } from '@marqvision/mds-v2/components/molecules/Button';
import { MDSTypography } from '@marqvision/mds-v2/components/atoms/Typography';
import { MDSThemeProvider } from '@marqvision/mds-v2/foundation';
```

### 실제 사용 예시 (ai-admin 참고)

```typescript
// apps/ai-admin/src/App.tsx
import { MDSThemeProvider, _MDSThemeValue, MDSSnackbarContainer } from '@marqvision/mds-v2';

// apps/ai-admin/src/pages/ResetPasswordPage/index.tsx
import { MDSTypography, MDSButton, MDSIcon } from '@marqvision/mds-v2';

// apps/ai-admin/src/components/CancelDialog.tsx
import { MDSButton, MDSModal, MDSTypography } from '@marqvision/mds-v2';

// apps/ai-admin/src/hooks/index.ts
import { MDSSnackbar } from '@marqvision/mds-v2';
```

## 주요 개념

### 디자인 토큰 (Foundation)

디자인 토큰은 핵심 시각 디자인 원자입니다:

### 컴포넌트

모든 컴포넌트는 다음으로 구축됩니다:
- **Emotion** - CSS-in-JS 스타일링
- **TypeScript** - 타입 안전성
- **접근성** (ARIA 속성, 키보드 탐색)
- **반응형 디자인** (데스크탑 우선 접근)

## 컴포넌트 카테고리

MDS v2는 Atomic Design 원칙에 따라 구성되어 있습니다. 아래는 실제 컴포넌트 목록입니다.

### Atoms (원자 컴포넌트)
가장 기본적인 UI 요소들:
- `Checkbox`: 체크박스 입력
- `Divider`: 구분선
- `Icon`: 아이콘 컴포넌트
- `Image`: 이미지 컴포넌트
- `Logo`: MarqVision 로고
- `RadioButton`: 라디오 버튼
- `Skeleton`: 스켈레톤 로딩 상태
- `Toggle`: 토글 스위치
- `Typography`: 타이포그래피 컴포넌트

### Molecules (분자 컴포넌트)
원자 컴포넌트들의 조합:
- `Button`: 주요 액션 버튼
- `Dropdown`: 드롭다운 선택
- `Input`: 텍스트 입력
- `LoadingIndicator`: 로딩 인디케이터
- `MessageBox`: 메시지 박스
- `Pagination`: 페이지네이션
- `PlainButton`: 기본 스타일 버튼
- `Popover`: 팝오버
- `Search`: 검색 입력
- `SegmentedButton`: 세그먼트 버튼
- `SelectContainer`: 선택 컨테이너
- `TableButton`: 테이블용 버튼
- `Tag`: 태그/레이블
- `Tooltip`: 툴팁

### Organisms (유기체 컴포넌트)
복잡한 UI 섹션:
- `DatePickers`: 날짜 선택기
- `Dimmed`: 딤(어두운 배경) 레이어
- `DownloadPanel`: 다운로드 패널
- `EmptyView`: 빈 상태 뷰
- `GNB`: Global Navigation Bar (전역 네비게이션)
- `ImageViewer`: 이미지 뷰어
- `LNB`: Local Navigation Bar (로컬 네비게이션)
- `Modal`: 모달 대화상자
- `PageHeader`: 페이지 헤더
- `Panel`: 패널 컴포넌트
- `Snackbar`: 스낵바 알림
- `Table`: 데이터 테이블

## 개발

### Storybook 실행

```bash
npm run mds2  # 포트 6008에서 Storybook 시작
```

### 테스팅

```bash
npm run mds-v2:test       # 테스트 실행
npm run mds-v2:test:watch # 워치 모드
```

### 타입 체크

```bash
npm run mds-v2:typecheck
```

## 가이드라인

### 새 컴포넌트 생성

1. **Atomic Design 따르기**: 기반부터 위로 구축
2. **디자인 토큰 사용**: 기반 값 참조
3. **모든 것 타입 지정**: 완전한 TypeScript 커버리지
4. **접근성 우선**: ARIA 레이블, 키보드 탐색
5. **반응형 디자인**: 데스크탑 우선 접근 (Desktop-first approach)
6. **Storybook으로 문서화**: 포괄적인 스토리 생성
7. **배럴 패턴 준수**: `components/index.ts`에 명시적으로 export

**주요 패턴:**
- 모든 MDS v2 컴포넌트는 `@marqvision/mds-v2`에서 직접 import
- Modal, Snackbar 등 복합 컴포넌트는 네임스페이스 패턴 사용 (예: `MDSModal.Wrapper`, `MDSModal.Content`)
- 테마 관련 항목도 동일한 배럴에서 import (예: `MDSThemeProvider`, `_MDSThemeValue`)

### 컴포넌트 레벨 결정 (Atomic Design)

**Atom 생성 시기:**
- ✅ 다른 MDS 컴포넌트에 대한 의존성 없음
- ✅ 단일 UI 요소 표현 (버튼, 입력, 아이콘)
- ✅ 많은 컨텍스트에서 높은 재사용성
- ✅ 최소한의 또는 내부 상태 없음

**Molecule 생성 시기:**
- ✅ 2-3개의 원자를 결합
- ✅ 간단하고 집중된 UI 패턴 표현
- ✅ 제한된 내부 로직
- ✅ 예시: FormField, SearchInput, IconButton

**Organism 생성 시기:**
- ✅ 여러 분자/원자가 있는 복잡한 컴포넌트
- ✅ 인터페이스의 고유한 섹션 표현
- ✅ 중요한 내부 상태/로직 가능
- ✅ 예시: NavigationBar, DataTable, Modal Dialog

### 폴더 구조 규칙

MDS-v2에 새 컴포넌트 추가 시:

```
# 컴포넌트 구조 예시 (atoms/Checkbox 참고)
components/
└── atoms/                  # 또는 molecules/ 또는 organisms/
    └── Checkbox/           # 컴포넌트 폴더 (PascalCase)
        ├── index.tsx       # 메인 컴포넌트 구현 및 export
        ├── @types.ts       # TypeScript 타입 정의
        ├── @utils.ts       # 유틸리티 함수 (선택사항)
        ├── @constants.ts   # 상수 정의 (선택사항)
        ├── Label.tsx       # 내부 서브 컴포넌트 (필요시)
        └── Icons.tsx       # 내부 서브 컴포넌트 (필요시)

# 복잡한 컴포넌트 예시 (molecules/Button 참고)
components/
└── molecules/
    └── Button/
        ├── index.tsx       # 메인 컴포넌트
        ├── @types.ts       # 타입 정의
        ├── @utils/         # 유틸리티 폴더
        │   ├── index.ts
        │   └── styleSet.ts
        └── @components/    # 내부 컴포넌트 폴더
            ├── Icon.tsx
            ├── Divider.tsx
            └── LoadingSpinner.tsx

# Storybook 스토리
@stories/
└── components/
    └── atoms/              # 또는 molecules/ 또는 organisms/
        └── Checkbox.stories.tsx  # 스토리 파일
```

**파일 네이밍 규칙 (molecules/Button 참고):**

**기본 구조:**
- `index.tsx` - 메인 컴포넌트 구현 및 export
- `@types.ts` - TypeScript 타입 및 인터페이스 정의
- `@constants.ts` - 컴포넌트 관련 상수 (선택사항)

**유틸리티:**
- 간단한 경우: `@utils.ts` - 단일 파일로 유틸리티 함수
- 복잡한 경우: `@utils/` - 유틸리티 폴더
  - `@utils/index.ts` - export 모음
  - `@utils/styleSet.ts` - 스타일 관련 유틸리티
  - `@utils/[기능명].ts` - 기능별 유틸리티

**내부 컴포넌트:**
- 간단한 경우: `Label.tsx`, `Icons.tsx` - 컴포넌트 폴더 루트에 직접 배치
- 복잡한 경우: `@components/` - 내부 컴포넌트 폴더
  - `@components/Icon.tsx`
  - `@components/Divider.tsx`
  - `@components/LoadingSpinner.tsx`

**Storybook:**
- `@stories/components/[level]/[ComponentName].stories.tsx`
  - 예: `@stories/components/molecules/Button.stories.tsx`

### 컴포넌트 템플릿

atoms/Checkbox를 참고한 실제 구조:

**1. @types.ts - 타입 정의**
```typescript
import React from 'react';

type Size = 'small' | 'medium';
type Color = 'blue' | 'white' | 'bluegray';

export type Props = {
  /**
   * 체크박스가 체크되었는지 여부를 나타냅니다.
   * true, false 또는 'indeterminate' 값으로 전달합니다.
   */
  value: boolean | 'indeterminate';
  /**
   * 체크박스 상태 변경을 처리하는 함수입니다.
   */
  onChange: (value: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 체크박스의 색상을 지정합니다.
   * @default 'blue'
   */
  color?: Color;
  /**
   * 체크박스의 크기를 지정합니다.
   * @default 'medium'
   */
  size?: Size;
  /**
   * 체크박스가 비활성화되었는지 여부를 나타냅니다.
   * @default false
   */
  isDisabled?: boolean;
};

export type StyledWrapperProps = {
  color: Color;
  size: Size;
  type: 'normal' | 'disabled';
  value: boolean | 'indeterminate';
};
```

**2. @constants.ts - 상수 정의**
```typescript
import { Theme } from './@types';

export const THEME: Theme = {
  size: {
    small: {
      boxSize: 20,
      padding: 6,
      borderRadius: 8,
    },
    medium: {
      boxSize: 24,
      padding: 4,
      borderRadius: 8,
    },
  },
};
```

**3. index.tsx - 메인 컴포넌트**
```typescript
import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { Props, StyledWrapperProps } from './@types';
import { THEME } from './@constants';

const Wrapper = styled.label<{ isClickable: boolean }>`
  display: inline-flex;
  align-items: center;
  ${({ isClickable }) => isClickable && 'cursor: pointer;'}
`;

const IconWrapper = styled.div<StyledWrapperProps>`
  flex-shrink: 0;
  position: relative;
  width: ${({ size }) => THEME.size[size].boxSize}px;
  height: ${({ size }) => THEME.size[size].boxSize}px;

  ${({ color, value, theme }) => `
    color: ${theme.color.border[color][value ? 'checked' : 'default']};
  `}
`;

export const MDSCheckbox = forwardRef<HTMLLabelElement, Props>((props, ref) => {
  const {
    value,
    color = 'blue',
    size = 'medium',
    onChange,
    isDisabled = false
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked, event);
  };

  return (
    <Wrapper ref={ref} isClickable={!isDisabled}>
      <input
        type="checkbox"
        checked={!!value}
        disabled={isDisabled}
        onChange={handleChange}
      />
      <IconWrapper size={size} color={color} value={value} type={isDisabled ? 'disabled' : 'normal'}>
        {/* 아이콘 렌더링 */}
      </IconWrapper>
    </Wrapper>
  );
});

export type MDSCheckboxProps = Props;
MDSCheckbox.displayName = 'MDSCheckbox';
```

**주요 패턴:**
- `forwardRef` 사용으로 ref 전달 가능
- `styled-components` 대신 `@emotion/styled` 사용
- Props는 별도 @types.ts에 정의
- 상수는 @constants.ts로 분리
- displayName 설정으로 디버깅 용이
- export type으로 타입 재사용 가능

### 테마

MDS v2는 Emotion의 ThemeProvider를 통한 테마를 지원합니다.

**앱에서 테마 주입 (ai-admin/src/App.tsx 참고):**

```typescript
import { MDSThemeProvider, _MDSThemeValue } from '@marqvision/mds-v2';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { themeWithNewFont as MDSv1ThemeWithNewFont } from '@marqvision/shared/src/library';

const App = () => {
  return (
    <MuiThemeProvider theme={{ ...MDSv1ThemeWithNewFont, ..._MDSThemeValue }}>
      <MDSThemeProvider>
        {/* 앱 컨텐츠 */}
        <YourApp />
      </MDSThemeProvider>
    </MuiThemeProvider>
  );
};
```

**컴포넌트에서 테마 사용:**

```typescript
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const MyComponent = () => {
  const { color } = useTheme();

  return (
    <div
      style={{
        border: `1px solid ${color.border.neutral.weak.normal}`,
        background: color.background.neutral.weak.normal,
      }}
    >
      Content
    </div>
  );
};

// 또는 styled component에서 사용
const StyledDiv = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border.neutral.weak.normal};
  background: ${({ theme }) => theme.color.background.neutral.weak.normal};
`;
```

**테마 구조:**
```typescript
const theme = useTheme();

// 색상 토큰
theme.color.border.neutral.weak.normal
theme.color.background.neutral.weak.normal
theme.color.content.neutral.default.normal

// 패턴: theme.color.[category].[variant].[state].[interaction]
// - category: border, background, content 등
// - variant: neutral, brand, semantic 등
// - state: weak, strong, default 등
// - interaction: normal, hover, pressed, disabled 등
```

## Foundation 시스템

Foundation은 디자인 토큰과 테마 구성을 제공합니다. **직접 foundation을 import하지 말고 `useTheme()`를 통해 접근하세요.**

### 색상 토큰 (Color Tokens)

```typescript
import { useTheme } from '@emotion/react';

const MyComponent = () => {
  const { color } = useTheme();

  // 색상 토큰 사용
  const borderColor = color.border.neutral.weak.normal;
  const backgroundColor = color.background.neutral.weak.normal;
  const textColor = color.content.neutral.default.normal;

  return <div style={{ borderColor, backgroundColor, color: textColor }}>Content</div>;
};
```

**색상 토큰 구조:**
```
theme.color.[category].[variant].[state].[interaction]

Categories:
- border: 테두리 색상
- background: 배경 색상
- content: 텍스트/아이콘 색상

Variants:
- neutral: 중립 색상 (회색 계열)
- brand: 브랜드 색상 (파란색 계열)
- semantic: 의미 색상 (성공, 에러, 경고 등)

States:
- weak: 약한 강도
- strong: 강한 강도
- default: 기본 강도

Interactions:
- normal: 기본 상태
- hover: 호버 상태
- pressed: 클릭된 상태
- disabled: 비활성화 상태
```

### 컴포넌트별 테마

```typescript
import { useTheme } from '@emotion/react';

const MyComponent = () => {
  const theme = useTheme();

  // 컴포넌트별 테마 토큰
  const typographyTheme = theme.comp.typography;
  const buttonTheme = theme.comp.button;
  const inputTheme = theme.comp.input;

  return <div />;
};
```

**사용 가능한 컴포넌트 테마:**
- `theme.comp.typography` - 타이포그래피 설정
- `theme.comp.button` - 버튼 스타일
- `theme.comp.plainButton` - 플레인 버튼 스타일
- `theme.comp.input` - 입력 필드 스타일
- `theme.comp.divider` - 구분선 스타일
- `theme.comp.dimmed` - Dimmed 레이어 스타일
- `theme.comp.chart` - 차트 색상 팔레트
- `theme.comp.lnb` - LNB 스타일

### Raw 색상 (내부 사용)

```typescript
// ⚠️ 특별한 경우가 아니면 사용하지 마세요
const theme = useTheme();
const rawColors = theme._raw_color;

// Raw 색상은 색상 토큰의 기반이 되는 원시 색상값입니다
// 대신 theme.color의 토큰을 사용하는 것을 권장합니다
```

## 모범 사례

### 스타일링 패턴

✅ **할 것**: 테마 색상 토큰 사용
```typescript
import { useTheme } from '@emotion/react';

const MyComponent = () => {
  const { color } = useTheme();

  return (
    <div style={{
      color: color.content.neutral.default.normal,
      background: color.background.neutral.weak.normal,
      border: `1px solid ${color.border.neutral.weak.normal}`,
    }}>
      Content
    </div>
  );
};
```

❌ **하지 말 것**: 하드코딩된 색상값 사용
```typescript
<div style={{
  color: '#333333',
  background: '#F5F5F5',
  border: '1px solid #E0E0E0',
}}>
  Content
</div>
```

✅ **할 것**: styled component에서 테마 사용
```typescript
import styled from '@emotion/styled';

const StyledDiv = styled.div`
  color: ${({ theme }) => theme.color.content.neutral.default.normal};
  background: ${({ theme }) => theme.color.background.neutral.weak.normal};
  border: 1px solid ${({ theme }) => theme.color.border.neutral.weak.normal};
`;
```

❌ **하지 말 것**: foundation 직접 import
```typescript
// ❌ 이렇게 하지 마세요
import { COLOR_TOKENS } from '@marqvision/mds-v2/foundation/colors';

// ✅ 대신 useTheme 사용
import { useTheme } from '@emotion/react';
const { color } = useTheme();
```

### 접근성

모든 컴포넌트는 다음을 충족해야 합니다:
- 키보드 탐색 지원
- 필요한 곳에 ARIA 레이블 포함
- 충분한 색상 대비 (최소 WCAG AA)
- 스크린 리더와 작동

```typescript
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  tabIndex={0}
>
  <CloseIcon />
</button>
```

## Storybook 문서화

각 컴포넌트는 포괄적인 Storybook 스토리를 가져야 합니다.
실제 Checkbox.stories.tsx를 참고한 구조:

### 기본 구조

```typescript
import React from 'react';
import { useArgs } from 'storybook/preview-api';
import { useTheme } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { MDSCheckbox } from '../../../components/atoms/Checkbox';

const meta: Meta<typeof MDSCheckbox> = {
  component: MDSCheckbox,
  title: '2. Components/atoms/Checkbox',  // 계층적 구조로 작성
  args: {
    value: false,
    label: '체크박스',
  },
  argTypes: {
    value: {
      control: 'radio',
      options: [true, false, 'indeterminate'],
    },
  },
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],  // 자동 문서 생성
};

export default meta;
type Story = StoryObj<typeof MDSCheckbox>;
```

### Wrapper 컴포넌트 패턴

테마를 사용하여 일관된 배경과 레이아웃을 제공하는 Wrapper 패턴:

```typescript
const Wrapper = ({ children }: React.PropsWithChildren) => {
  const { _raw_color } = useTheme();
  return (
    <div
      style={{
        padding: '24px',
        display: 'grid',
        justifyItems: 'flex-start',
        gap: '24px',
        backgroundColor: _raw_color.bluegray500,
      }}
    >
      {children}
    </div>
  );
};
```

### 인터랙티브 스토리 (useArgs 사용)

사용자 인터랙션을 테스트할 수 있는 인터랙티브 스토리:

```typescript
export const Preview: Story = {
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    const handleChange = (value: boolean) => {
      setArgs({ value });
    };

    return (
      <Wrapper>
        <MDSCheckbox {...props} value={value} onChange={handleChange} />
      </Wrapper>
    );
  },
};
```

### 상태별 스토리

다양한 상태를 보여주는 스토리 예시:

```typescript
// 크기 변형
export const Small: Story = {
  args: {
    size: 'small',
    value: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>가로 세로 20px 의 small 사이즈 입니다.</MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox {...props} value="indeterminate" />
      <MDSCheckbox {...props} value={false} />
    </Wrapper>
  ),
};

// 색상 변형
export const Checked: Story = {
  args: {
    value: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>Check 된 상태입니다.</MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox color="white" {...props} />
      <MDSCheckbox color="bluegray" {...props} />
    </Wrapper>
  ),
};

// 비활성화 상태
export const CheckedDisabled: Story = {
  args: {
    value: true,
    isDisabled: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>Check 되었으나 비활성화 된 상태 입니다.</MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox color="white" {...props} />
      <MDSCheckbox color="bluegray" {...props} />
    </Wrapper>
  ),
};
```

### 커스터마이징 스토리

복잡한 label prop을 사용하는 예시:

```typescript
export const Customize: Story = {
  args: {
    label: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <MDSTypography variant="title" size="2xl" weight="semibold" color="inherit">
          마음대로 넣기
        </MDSTypography>
        <MDSTag variant="fill" size="small" color="red">
          N
        </MDSTag>
      </div>
    ),
  },
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    const handleChange = (value: boolean) => {
      setArgs({ value });
    };

    return (
      <Wrapper>
        <MDSTypography>
          label 에 React Element 를 전달하면 자유롭게 구성할 수 있습니다. <br />
          이 경우, MDSTypography 의 color 속성을 'inherit' 로 설정하여 disabled 상태의 색상까지 상속받는 것을 권장합니다.
        </MDSTypography>
        <MDSCheckbox {...props} value={value} onChange={handleChange} />
      </Wrapper>
    );
  },
};
```

### Storybook 작성 체크리스트

✅ **필수 요소:**
- Meta 설정에 `component`, `title`, `tags: ['autodocs']` 포함
- 기본 `args`로 일반적인 사용 케이스 설정
- `argTypes`로 인터랙티브 컨트롤 제공
- 각 Story에 설명적인 export 이름 사용

✅ **권장 사항:**
- Wrapper 컴포넌트로 일관된 레이아웃 제공
- `useArgs`를 사용한 인터랙티브 Preview 스토리
- 다양한 상태 (크기, 색상, 비활성화 등)를 보여주는 스토리
- MDSTypography로 각 스토리에 설명 추가
- props spread로 args 전달

✅ **스토리 네이밍 패턴:**
- `Preview` - 기본 인터랙티브 스토리
- `Small`, `Medium`, `Large` - 크기 변형
- `Checked`, `UnChecked`, `Indeterminate` - 상태 변형
- `[State]Disabled` - 비활성화 상태 조합
- `Customize` - 커스터마이징 예시

## MDS v1에서 마이그레이션

Material-UI v4 (MDS v1)에서 마이그레이션 시:

1. MUI import를 MDS v2 동등물로 교체
2. `makeStyles`에서 Emotion `css`로 스타일링 업데이트
3. 테마 속성 대신 디자인 토큰 사용
4. MDS v2 API와 일치하도록 prop 이름 업데이트
5. 시각적 회귀에 대해 철저히 테스트
