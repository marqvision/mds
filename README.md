
# Design System: MDS v2 (`@marqvision/mds-v2`)

**shadcn/ui, Radix UI, Tailwind CSS를 사용하지 않습니다.**  
모든 UI는 **`@marqvision/mds-v2`와 `@emotion/styled`** 로 구축합니다.

---

# 설치 및 셋업

```tsx
import { MDSThemeProvider, MDSSnackbarContainer } from '@marqvision/mds-v2';

function App() {
  return (
    <MDSThemeProvider>
      <MDSSnackbarContainer />
      <YourApp />
    </MDSThemeProvider>
  );
}
```

모든 컴포넌트는 **패키지 루트에서 import합니다.**

✅ 올바른 방법

```tsx
import { MDSButton, MDSInput, MDSTypography } from '@marqvision/mds-v2';
```

❌ 잘못된 방법 (내부 경로 접근 금지)

```tsx
import { MDSButton } from '@marqvision/mds-v2/components/molecules/Button';
```

---

# 스타일링

**Tailwind CSS를 사용하지 않습니다.**

사용 가능

- `@emotion/styled`
- `@emotion/react`의 `css`

색상은 반드시 **`useTheme()` 훅을 통해 접근합니다.**

❌ 금지

```
#333
rgb()
직접 색상값
```

---

## useTheme 사용

```tsx
import { useTheme } from '@emotion/react';

const MyComponent = () => {
  const { color } = useTheme();

  return (
    <div style={{ color: color.content.neutral.default.normal }} />
  );
};
```

---

## styled component 사용

```tsx
import styled from '@emotion/styled';

const StyledDiv = styled.div`
  color: ${({ theme }) => theme.color.content.neutral.default.normal};
  background: ${({ theme }) => theme.color.bg.surface.neutral.default.normal};
  border: 1px solid ${({ theme }) => theme.color.border.neutral.default.normal};
`;
```

---

# 색상 토큰 구조

```
theme.color.[category].[variant].[strength].[interaction]
```

| Level | 값 |
|------|----|
| category | bg, content, border |
| variant | neutral, primary, critical, success, warning, teal, purple, inverse |
| strength | default, weak, strong, secondary, tertiary |
| interaction | normal, hover, disabled, pressed, completed |

---

# 자주 사용하는 색상 토큰

## 텍스트

```ts
theme.color.content.neutral.default.normal
theme.color.content.neutral.secondary.normal
theme.color.content.neutral.tertiary.normal
theme.color.content.primary.default.normal
theme.color.content.critical.default.normal
```

## 배경

```ts
theme.color.bg.surface.neutral.default.normal
theme.color.bg.surface.neutral.secondary.normal
theme.color.bg.fill.neutral.default.normal
theme.color.bg.fill.primary.default.normal
theme.color.bg.fill.primary.tint.normal
theme.color.bg.fill.critical.tint.normal
```

## 테두리

```ts
theme.color.border.neutral.default.normal
theme.color.border.neutral.weak.normal
theme.color.border.primary.default.normal
theme.color.border.critical.default.normal
```

---

# 타이포그래피

텍스트는 **`MDSTypography`** 를 사용합니다.

❌ 사용 금지

```
p
span
h1
```

---

## 예시

```tsx
import { MDSTypography } from '@marqvision/mds-v2';
```

### Title

```tsx
<MDSTypography variant="title" size="2xl" weight="semibold">제목 24px</MDSTypography>
<MDSTypography variant="title" size="xl" weight="semibold">제목 20px</MDSTypography>
<MDSTypography variant="title" size="l" weight="medium">제목 18px</MDSTypography>
<MDSTypography variant="title" size="m" weight="medium">제목 16px</MDSTypography>
<MDSTypography variant="title" size="s" weight="medium">제목 14px</MDSTypography>
```

### Body

```tsx
<MDSTypography variant="body" size="l" weight="regular">본문 16px</MDSTypography>
<MDSTypography variant="body" size="m" weight="regular">본문 14px</MDSTypography>
<MDSTypography variant="body" size="s" weight="regular">본문 13px</MDSTypography>
<MDSTypography variant="body" size="xs" weight="regular">본문 12px</MDSTypography>
```

---

## Typography Spec

| Variant | Size | px | Weight |
|------|------|----|------|
| title | 2xl | 24 | semibold, medium |
| title | xl | 20 | semibold, medium |
| title | l | 18 | semibold, medium |
| title | m | 16 | semibold, medium |
| title | s | 14 | semibold, medium |
| body | l | 16 | medium, regular |
| body | m | 14 | medium, regular |
| body | s | 13 | medium, regular |
| body | xs | 12 | medium, regular |

추가 Props

```
color
lineClamp
as
textAlign
wordBreak
whiteSpace
```

---

# Button

```tsx
import { MDSButton } from '@marqvision/mds-v2';
```

```tsx
<MDSButton variant="fill" color="blue" size="medium">
  확인
</MDSButton>
```

---

# Input

```tsx
import { MDSInput } from '@marqvision/mds-v2';
```

```tsx
<MDSInput
  value={text}
  onChange={setText}
  placeholder="입력하세요"
  size="medium"
  label="이름"
  guide="필수 입력 항목입니다"
/>
```

---

# Modal

```tsx
import { MDSModal } from '@marqvision/mds-v2';
```

```tsx
<MDSModal.Wrapper isOpen={isOpen} onClose={handleClose} width="480px">
  <MDSModal.Header onClose={handleClose}>
    모달 제목
  </MDSModal.Header>

  <MDSModal.Content>
    모달 내용입니다.
  </MDSModal.Content>

  <MDSModal.Action>
    <MDSButton variant="border">취소</MDSButton>
    <MDSButton variant="fill">확인</MDSButton>
  </MDSModal.Action>
</MDSModal.Wrapper>
```

---

# Snackbar

```tsx
import { MDSSnackbar } from '@marqvision/mds-v2';

MDSSnackbar({
  type: 'success',
  title: '저장되었습니다.'
});
```

---

# Pagination

```tsx
import { MDSPagination } from '@marqvision/mds-v2';

<MDSPagination
  value={offset}
  onChange={setOffset}
  totalCount={100}
  pageSize={10}
/>
```

---

# 핵심 규칙 요약

1. 모든 import는 **@marqvision/mds-v2**
2. 색상은 **useTheme 토큰만 사용**
3. 텍스트는 **MDSTypography 사용**
4. 스타일링은 **emotion만 사용**
5. **Tailwind CSS 사용 금지**
6. **border-radius = 8px**
7. Modal / Table / Panel 은 namespace 패턴 사용

```
MDSModal.Wrapper
MDSTable.Head
MDSPanel.Header
```
