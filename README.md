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

[Confluence - MDS v2 개발 가이드](https://marqvision.atlassian.net/wiki/spaces/EMV/pages/2105540667/Frontend+MDS+v2)


# Appendix

## Atomic design에 기반한 컴포넌트 분류

#### **1. Atom (아톰) - 더 이상 쪼갤 수 없는 가장 작은 단위**

**개념:** Atom은 UI의 가장 기본적인 구성 요소로, 더 이상 의미 있게 쪼갤 수 없는 단위를 의미합니다. 마치 화학에서 원자가 더 이상 분리할 수 없는 가장 작은 단위인 것처럼, UI에서도 독립적인 기능과 스타일을 가진 최소 단위를 말합니다.

**프론트엔드 개발 관점:**
Atom은 일반적으로 HTML 태그와 그에 해당하는 기본적인 스타일, 그리고 최소한의 동작을 포함합니다. React, Vue, Angular와 같은 컴포넌트 기반 프레임워크에서는 이 Atom이 가장 작은 단위의 **재사용 가능한 컴포넌트**로 구현됩니다.

**예시:**

  * **라벨 (Label):** 텍스트를 표시하는 `<label>` 태그
    ```html
    <label for="username">사용자 이름:</label>
    ```
  * **버튼 (Button):** 클릭 가능한 `<button>` 태그
    ```html
    <button>확인</button>
    ```
  * **인풋 필드 (Input Field):** 사용자 입력을 받는 `<input>` 태그
    ```html
    <input type="text" placeholder="이름을 입력하세요">
    ```
  * **제목 (Heading):** `<h1>`, `<h2>` 등의 제목 태그
  * **아이콘 (Icon):** 단일 아이콘
  * **링크 (Link):** `<a>` 태그

**특징:**

  * **독립적**: 다른 요소에 의존하지 않고 독립적으로 존재합니다.
  * **재사용성**: 다양한 Molecules 또는 Organisms에서 재사용됩니다.
  * **명확한 역할**: 각 Atom은 하나의 명확한 역할을 수행합니다.

#### **2. Molecule (분자) - Atom들이 모여 특정 기능을 수행하는 단위**

**개념:** Molecule은 두 개 이상의 Atom들이 결합하여 특정 의미 있는 기능을 수행하는 단위를 의미합니다. 마치 원자들이 결합하여 분자를 이루는 것처럼, Atom들이 모여 더 복잡하지만 여전히 독립적인 기능을 하는 컴포넌트를 형성합니다.

**프론트엔드 개발 관점:**
Molecule은 여러 개의 Atom 컴포넌트들을 조합하여 만들어진 상위 컴포넌트입니다. 이들은 특정 목적을 달성하기 위한 응집력 있는 그룹을 형성합니다.

**예시:**

  * **검색 폼 (Search Form):** Input (Atom) + Button (Atom) 조합
    ```jsx
    // React 예시
    function SearchForm() {
      return (
        <form>
          <input type="text" placeholder="검색어를 입력하세요" />
          <button>검색</button>
        </form>
      );
    }
    ```
  * **로그인 필드 (Login Field):** Label (Atom) + Input (Atom) 조합
    ```jsx
    // React 예시
    function LoginFormItem({ label, type, placeholder }) {
      return (
        <div>
          <label>{label}:</label>
          <input type={type} placeholder={placeholder} />
        </div>
      );
    }
    ```
  * **페이지네이션 (Pagination):** 여러 개의 Button (Atom) 또는 Link (Atom) 조합
  * **미디어 객체 (Media Object):** 이미지 (Atom) + 텍스트 (Atom) 조합

**특징:**

  * **재사용성**: 특정 기능을 수행하는 독립적인 단위로 재사용됩니다.
  * **명확한 목적**: 하나의 명확한 목적을 가지고 동작합니다.
  * **단순한 구조**: 여전히 복잡하지 않고 직관적으로 이해할 수 있는 구조를 가집니다.

#### **3. Organism (유기체) - Molecules와 Atoms가 모여 섹션을 이루는 단위**

**개념:** Organism은 Molecule과 Atom들이 결합하여 비교적 복잡하고 독립적인 UI 섹션 또는 컴포넌트를 형성하는 단위를 의미합니다. 마치 분자들이 모여 특정 기능을 수행하는 유기체를 이루는 것처럼, UI에서도 다양한 Molecules와 Atoms가 모여 페이지의 특정 부분을 구성합니다.

**프론트엔드 개발 관점:**
Organism은 페이지의 특정 영역을 구성하는 큰 단위의 컴포넌트입니다. 이들은 여러 Molecules와 Atoms를 포함하며, 페이지의 레이아웃이나 전체적인 구조에 중요한 역할을 합니다.

**예시:**

  * **헤더 (Header):** 로고 (Atom), 내비게이션 (Molecule - 링크Atom들의 집합), 검색 폼 (Molecule) 조합
    ```jsx
    // React 예시
    function Header() {
      return (
        <header>
          <h1>로고</h1>
          <nav>
            <a href="#">홈</a>
            <a href="#">제품</a>
            <a href="#">문의</a>
          </nav>
          <SearchForm /> {/* SearchForm은 Molecule */}
        </header>
      );
    }
    ```
  * **푸터 (Footer):** 저작권 텍스트 (Atom), 소셜 미디어 링크 (Molecule) 조합
  * **제품 카드 (Product Card):** 제품 이미지 (Atom), 제품명 (Atom), 가격 (Atom), '장바구니 담기' 버튼 (Atom) 등
  * **댓글 목록 (Comment List):** 여러 개의 댓글 (Molecule - 사용자명, 내용, 시간 등으로 구성)

**특징:**

  * **독립적인 섹션**: 페이지 내에서 독립적인 의미를 가지는 섹션을 구성합니다.
  * **재사용 가능성**: 전체 페이지는 아니지만, 다른 페이지에서도 동일한 Organism이 재사용될 수 있습니다.
  * **복잡한 구조**: 여러 Molecules와 Atoms를 포함하여 상대적으로 복잡한 구조를 가집니다.

