Design System: MDS v2 (@marqvision/mds-v2)

  shadcn/ui, Radix UI, Tailwind CSS를 사용하지 마세요. 모든 UI는 @marqvision/mds-v2와 @emotion/styled로 구축합니다.

  ---
  설치 및 셋업

  import { MDSThemeProvider, _MDSThemeValue, MDSSnackbarContainer } from '@marqvision/mds-v2';

  function App() {
    return (
      <MDSThemeProvider>
        <MDSSnackbarContainer />
        <YourApp />
      </MDSThemeProvider>
    );
  }

  모든 컴포넌트는 반드시 패키지 루트에서 import합니다:
  // O 올바른 방법
  import { MDSButton, MDSInput, MDSTypography } from '@marqvision/mds-v2';

  // X 잘못된 방법 - 내부 경로 접근 금지
  import { MDSButton } from '@marqvision/mds-v2/components/molecules/Button';

  ---
  스타일링

  Tailwind CSS를 사용하지 않습니다. @emotion/styled 또는 @emotion/react의 css를 사용합니다.

  색상은 반드시 useTheme() 훅을 통해 접근합니다. 하드코딩된 색상값(#333, rgb 등)을 사용하지 마세요.

  import { useTheme } from '@emotion/react';
  import styled from '@emotion/styled';

  // 방법 1: useTheme 훅
  const MyComponent = () => {
    const { color } = useTheme();
    return <div style={{ color: color.content.neutral.default.normal }} />;
  };

  // 방법 2: styled component
  const StyledDiv = styled.div`
    color: ${({ theme }) => theme.color.content.neutral.default.normal};
    background: ${({ theme }) => theme.color.bg.surface.neutral.default.normal};
    border: 1px solid ${({ theme }) => theme.color.border.neutral.default.normal};
  `;

  색상 토큰 구조:
  theme.color.[category].[variant].[strength].[interaction]

  ┌─────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │    레벨     │                                                                값                                                                 │
  ├─────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ category    │ bg (배경), content (텍스트/아이콘), border (테두리)                                                                               │
  ├─────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ variant     │ neutral (회색 계열), primary (파란색, 브랜드), critical (빨간색, 에러), success (초록색), warning (노란색), teal, purple, inverse │
  ├─────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ strength    │ default, weak, strong, secondary, tertiary                                                                                        │
  ├─────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ interaction │ normal, hover, disabled, pressed, completed                                                                                       │
  └─────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  자주 쓰는 색상 토큰:
  // 텍스트
  theme.color.content.neutral.default.normal    // 기본 텍스트
  theme.color.content.neutral.secondary.normal  // 보조 텍스트
  theme.color.content.neutral.tertiary.normal   // 약한 텍스트
  theme.color.content.primary.default.normal    // 브랜드/강조 텍스트
  theme.color.content.critical.default.normal   // 에러 텍스트

  // 배경
  theme.color.bg.surface.neutral.default.normal    // 기본 배경 (흰색)
  theme.color.bg.surface.neutral.secondary.normal  // 보조 배경
  theme.color.bg.fill.neutral.default.normal       // 채움 배경
  theme.color.bg.fill.primary.default.normal       // 브랜드 채움
  theme.color.bg.fill.primary.tint.normal          // 연한 브랜드 배경
  theme.color.bg.fill.critical.tint.normal         // 연한 에러 배경

  // 테두리
  theme.color.border.neutral.default.normal     // 기본 테두리
  theme.color.border.neutral.weak.normal        // 약한 테두리
  theme.color.border.primary.default.normal     // 브랜드 테두리
  theme.color.border.critical.default.normal    // 에러 테두리

  ---
  타이포그래피
              
  텍스트는 <MDSTypography>를 사용합니다. <p>, <span>, <h1> 등을 직접 사용하지 마세요.
                                                                                                                                                                                                                                                                                                                   
  import { MDSTypography } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  // Title 계열 (lineHeight: 1.2)                                                                                                                                                                                                                                                                                  
  <MDSTypography variant="title" size="2xl" weight="semibold">제목 24px</MDSTypography>                                                                                                                                                                                                                            
  <MDSTypography variant="title" size="xl" weight="semibold">제목 20px</MDSTypography>                                                                                                                                                                                                                             
  <MDSTypography variant="title" size="l" weight="medium">제목 18px</MDSTypography>
  <MDSTypography variant="title" size="m" weight="medium">제목 16px</MDSTypography>                                                                                                                                                                                                                                
  <MDSTypography variant="title" size="s" weight="medium">제목 14px</MDSTypography>
                                                                                                                                                                                                                                                                                                                   
  // Body 계열 (lineHeight: 1.5)
  <MDSTypography variant="body" size="l" weight="regular">본문 16px</MDSTypography>                                                                                                                                                                                                                                
  <MDSTypography variant="body" size="m" weight="regular">본문 14px</MDSTypography>                                                                                                                                                                                                                                
  <MDSTypography variant="body" size="s" weight="regular">본문 13px</MDSTypography>                                                                                                                                                                                                                                
  <MDSTypography variant="body" size="xs" weight="regular">본문 12px</MDSTypography>                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                   
  ┌─────────┬──────┬─────┬──────────────────┐                                                                                                                                                                                                                                                                      
  │ Variant │ Size │ px  │   Weight 옵션    │
  ├─────────┼──────┼─────┼──────────────────┤                                                                                                                                                                                                                                                                      
  │ title   │ 2xl  │ 24  │ semibold, medium │
  ├─────────┼──────┼─────┼──────────────────┤
  │ title   │ xl   │ 20  │ semibold, medium │                                                                                                                                                                                                                                                                      
  ├─────────┼──────┼─────┼──────────────────┤                                                                                                                                                                                                                                                                      
  │ title   │ l    │ 18  │ semibold, medium │                                                                                                                                                                                                                                                                      
  ├─────────┼──────┼─────┼──────────────────┤                                                                                                                                                                                                                                                                      
  │ title   │ m    │ 16  │ semibold, medium │
  ├─────────┼──────┼─────┼──────────────────┤
  │ title   │ s    │ 14  │ semibold, medium │
  ├─────────┼──────┼─────┼──────────────────┤                                                                                                                                                                                                                                                                      
  │ body    │ l    │ 16  │ medium, regular  │
  ├─────────┼──────┼─────┼──────────────────┤                                                                                                                                                                                                                                                                      
  │ body    │ m    │ 14  │ medium, regular  │
  ├─────────┼──────┼─────┼──────────────────┤                                                                                                                                                                                                                                                                      
  │ body    │ s    │ 13  │ medium, regular  │
  ├─────────┼──────┼─────┼──────────────────┤                                                                                                                                                                                                                                                                      
  │ body    │ xs   │ 12  │ medium, regular  │
  └─────────┴──────┴─────┴──────────────────┘                                                                                                                                                                                                                                                                      
                  
  추가 Props: color (테마 색상 경로 또는 'inherit'), lineClamp (말줄임), as (렌더링 HTML 태그), textAlign, wordBreak, whiteSpace                                                                                                                                                                                   
                  
  ---                                                                                                                                                                                                                                                                                                              
  컴포넌트 레퍼런스
                   
  Button
                                                                                                                                                                                                                                                                                                                   
  import { MDSButton } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  // 기본 버튼    
  <MDSButton variant="fill" color="blue" size="medium" onClick={handleClick}>
    확인                                                                                                                                                                                                                                                                                                           
  </MDSButton>
                                                                                                                                                                                                                                                                                                                   
  // 아이콘 포함                                                                                                                                                                                                                                                                                                   
  <MDSButton variant="border" color="bluegray" startIcon={<MDSIcon name="AddPlus" />}>
    추가                                                                                                                                                                                                                                                                                                           
  </MDSButton>    
                                                                                                                                                                                                                                                                                                                   
  // 아이콘만                                                                                                                                                                                                                                                                                                      
  <MDSButton type="icon" icon={<MDSIcon name="Trash" />} variant="border" color="bluegray" />
                                                                                                                                                                                                                                                                                                                   
  // 로딩         
  <MDSButton isLoading>저장 중...</MDSButton>                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                   
  - variant: 'fill' | 'tint' | 'border' (기본: fill)                                                                                                                                                                                                                                                               
  - color: 'blue' | 'bluegray' | 'red' | 'yellow' | 'green' | 'teal' | 'purple' | 'white' (기본: blue)                                                                                                                                                                                                             
  - size: 'small' | 'medium' | 'large' (기본: medium)                                                                                                                                                                                                                                                              
  - width: 'fill' (부모 너비) | 'hug' (내용 크기) | 문자열
                                                                                                                                                                                                                                                                                                                   
  PlainButton (텍스트 버튼)
                                                                                                                                                                                                                                                                                                                   
  import { MDSPlainButton } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  <MDSPlainButton color="blue" size="medium" onClick={handleClick}>                                                                                                                                                                                                                                                
    자세히 보기                                                                                                                                                                                                                                                                                                    
  </MDSPlainButton>                                                                                                                                                                                                                                                                                                
                  
  - size: 'x-small' | 'small' | 'medium' | 'large'                                                                                                                                                                                                                                                                 
  - color: 'bluegray' | 'bluegray-secondary' | 'blue' | 'red' | 'yellow' | 'green' | 'white'
                                                                                                                                                                                                                                                                                                                   
  InlineButton (인라인 텍스트 링크/버튼)                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                   
  import { MDSInlineButton } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                   
  <MDSInlineButton color="blue" size="medium" startIcon={<MDSIcon name="Link" />}>                                                                                                                                                                                                                                 
    링크 열기                                                                                                                                                                                                                                                                                                      
  </MDSInlineButton>                                                                                                                                                                                                                                                                                               
                  
  Input                                                                                                                                                                                                                                                                                                            
                  
  import { MDSInput } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                                   
                  
  // 텍스트 입력                                                                                                                                                                                                                                                                                                   
  <MDSInput
    value={text}                                                                                                                                                                                                                                                                                                   
    onChange={setText}                                                                                                                                                                                                                                                                                             
    placeholder="입력하세요"
    size="medium"                                                                                                                                                                                                                                                                                                  
    label="이름"  
    guide="필수 입력 항목입니다"                                                                                                                                                                                                                                                                                   
  />                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                   
  // 에러 상태                                                                                                                                                                                                                                                                                                     
  <MDSInput value={text} onChange={setText} status="error" guide="유효하지 않은 값입니다" />
                                                                                                                                                                                                                                                                                                                   
  // 셀렉트 모드                                                                                                                                                                                                                                                                                                   
  <MDSInput                                                                                                                                                                                                                                                                                                        
    variant="select"                                                                                                                                                                                                                                                                                               
    value={selected}
    onChange={setSelected}
    list={[
      { label: '옵션 1', value: 'opt1' },                                                                                                                                                                                                                                                                          
      { label: '옵션 2', value: 'opt2' },
    ]}                                                                                                                                                                                                                                                                                                             
  />              
                                                                                                                                                                                                                                                                                                                   
  - size: 'small' | 'medium' | 'large'                                                                                                                                                                                                                                                                             
  - status: 'idle' | 'error' | 'success'
  - label: 문자열 또는 { main: string; sub: string; right: ReactElement }                                                                                                                                                                                                                                          
  - guide: 문자열, 문자열 배열, 또는 { label: string; status: 'error' | 'success' | 'idle' }[]                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                   
  Search                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                   
  import { MDSSearch } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  <MDSSearch
    value={query}                                                                                                                                                                                                                                                                                                  
    onChange={setQuery}                                                                                                                                                                                                                                                                                            
    placeholder="검색어를 입력하세요"
    size="medium"                                                                                                                                                                                                                                                                                                  
    trigger="enter"
  />
                                                                                                                                                                                                                                                                                                                   
  - trigger: 'enter' (엔터키로 검색) | 'change' (입력 즉시 검색)                                                                                                                                                                                                                                                   
  - debounce: ms 단위 딜레이 (기본: 300)                                                                                                                                                                                                                                                                           
  - minSearchLetters: 최소 검색 글자 수 (기본: 2)                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                   
  Dropdown                                                                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                                                                                   
  import { MDSDropdown } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  <MDSDropdown
    value={selected}                                                                                                                                                                                                                                                                                               
    onChange={setSelected}
    list={[
      { label: '항목 1', value: 'item1' },
      { label: '항목 2', value: 'item2' },                                                                                                                                                                                                                                                                         
      { label: '항목 3', value: 'item3' },                                                                                                                                                                                                                                                                         
    ]}                                                                                                                                                                                                                                                                                                             
    label="선택하세요"                                                                                                                                                                                                                                                                                             
  />                                                                                                                                                                                                                                                                                                               
                  
  - modules: 검색, 정렬, 무한스크롤 등 기능 모듈 배열                                                                                                                                                                                                                                                              
  - position: 팝오버 위치 (기본: bottom-right)
  - width: 숫자, 문자열, 또는 'fit-anchor'                                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                                                                                   
  Checkbox                                                                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                                                                                   
  import { MDSCheckbox } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                                
                  
  <MDSCheckbox
    value={checked}
    onChange={setChecked}
    label="동의합니다"
    color="blue"                                                                                                                                                                                                                                                                                                   
    size="medium"                                                                                                                                                                                                                                                                                                  
  />                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                   
  - value: true | false | 'indeterminate'                                                                                                                                                                                                                                                                          
  - color: 'blue' | 'white' | 'bluegray'
  - label: ReactNode 또는 { main: string; sub: string }                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                   
  RadioButton                                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                   
  import { MDSRadioButton } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                                                   
  <MDSRadioButton value="opt1" selectedValue={selected} onChange={setSelected} label="옵션 1" />                                                                                                                                                                                                                   
  <MDSRadioButton value="opt2" selectedValue={selected} onChange={setSelected} label="옵션 2" />                                                                                                                                                                                                                   
                                                                                                                                                                                                                                                                                                                   
  Toggle          
                                                                                                                                                                                                                                                                                                                   
  import { MDSToggle } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  <MDSToggle value={isOn} onChange={setIsOn} label="알림 설정" size="medium" />                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                   
  Tag                                                                                                                                                                                                                                                                                                              
                  
  import { MDSTag } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                   
  <MDSTag variant="fill" color="blue" size="small">활성</MDSTag>                                                                                                                                                                                                                                                   
  <MDSTag variant="tint" color="red" size="small">에러</MDSTag>                                                                                                                                                                                                                                                    
  <MDSTag variant="border" color="bluegray" size="medium">기본</MDSTag>                                                                                                                                                                                                                                            
  <MDSTag variant="ai" size="small">AI</MDSTag>                                                                                                                                                                                                                                                                    
   
  - variant: 'fill' | 'tint' | 'border' | 'ai'                                                                                                                                                                                                                                                                     
  - color: 'bluegray' | 'blue' | 'red' | 'yellow' | 'green' | 'teal' | 'purple' | 'white'
  - size: 'x-small' | 'small' | 'medium'                                                                                                                                                                                                                                                                           
                  
  Icon                                                                                                                                                                                                                                                                                                             
                  
  import { MDSIcon } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                   
  <MDSIcon name="Check" variant="fill" size={20} color="color/content/primary/default" />                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                                   
  사용 가능한 아이콘 이름: ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Check, AddPlus, Minus, CloseDelete, Flag, Help, ErrorWarning, Priority, Info, Send, HourglassDelay, View, Cards, CardsStar, EyesVisibility, Trash, Star, Tips, Verified, Folder, Label, More, Notifications, Settings, AccountProfile,       
  StoreMarket, Image, Images, Pdf, ChartBar, Lock, Email, NoEmail, Celebration, Pin, Unpin, AssignmentConfirm, Document, Ppt, ChartCirclePie, CopyContent, Archive, SellerPerson, Group, ServerDNS, Comment, CommentAdd, SiteMapTree, DragHandle, AddPayment, Note, ThumbUp, ThumbDown, Siren, Chat, Shopping,
  Sellers, Performance, Home, Link, ProtectionSearch, ProtectionWarning, Edit, Circle, FormulaComponent                                                                                                                                                                                                            
                  
  각 아이콘은 variant prop으로 스타일을 선택합니다 (예: 'fill', 'line', 'duotone' 등. 아이콘마다 사용 가능한 variant가 다름).                                                                                                                                                                                      
   
  Modal                                                                                                                                                                                                                                                                                                            
                  
  네임스페이스 패턴을 사용합니다:                                                                                                                                                                                                                                                                                  
                  
  import { MDSModal, MDSButton, MDSTypography } from '@marqvision/mds-v2';                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                                                                                   
  <MDSModal.Wrapper isOpen={isOpen} onClose={handleClose} width="480px">                                                                                                                                                                                                                                           
    <MDSModal.Header onClose={handleClose}>모달 제목</MDSModal.Header>                                                                                                                                                                                                                                             
    <MDSModal.Content>                                                                                                                                                                                                                                                                                             
      <MDSTypography variant="body" size="m">모달 내용입니다.</MDSTypography>
    </MDSModal.Content>                                                                                                                                                                                                                                                                                            
    <MDSModal.Action>
      <MDSButton variant="border" color="bluegray" onClick={handleClose}>취소</MDSButton>                                                                                                                                                                                                                          
      <MDSButton variant="fill" color="blue" onClick={handleConfirm}>확인</MDSButton>                                                                                                                                                                                                                              
    </MDSModal.Action>                                                                                                                                                                                                                                                                                             
  </MDSModal.Wrapper>                                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                                   
  Panel (사이드 패널)                                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                                   
  import { MDSPanel } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                                                                                                   
  <MDSPanel isOpen={isOpen} onClose={handleClose} direction="right" width="540px">                                                                                                                                                                                                                                 
    <MDSPanel.Header onClose={handleClose}>패널 제목</MDSPanel.Header>                                                                                                                                                                                                                                             
    <MDSPanel.Body>패널 내용</MDSPanel.Body>                                                                                                                                                                                                                                                                       
    <MDSPanel.Action>                                                                                                                                                                                                                                                                                              
      <MDSButton variant="fill" color="blue">저장</MDSButton>                                                                                                                                                                                                                                                      
    </MDSPanel.Action>                                                                                                                                                                                                                                                                                             
  </MDSPanel>                                                                                                                                                                                                                                                                                                      
                  
  Table                                                                                                                                                                                                                                                                                                            
                  
  import { MDSTable } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  <MDSTable>
    <MDSTable.Head isStickyHeader>                                                                                                                                                                                                                                                                                 
      <MDSTable.Row>                                                                                                                                                                                                                                                                                               
        <MDSTable.Cell width="200px">이름</MDSTable.Cell>
        <MDSTable.Cell width="100px" align="center">상태</MDSTable.Cell>                                                                                                                                                                                                                                           
        <MDSTable.Cell>설명</MDSTable.Cell>                                                                                                                                                                                                                                                                        
      </MDSTable.Row>                                                                                                                                                                                                                                                                                              
    </MDSTable.Head>                                                                                                                                                                                                                                                                                               
    <MDSTable.Body>                                                                                                                                                                                                                                                                                                
      {data.map((item) => (
        <MDSTable.Row key={item.id} isSelected={item.selected}>
          <MDSTable.Cell>{item.name}</MDSTable.Cell>                                                                                                                                                                                                                                                               
          <MDSTable.Cell align="center">
            <MDSTag variant="tint" color="green" size="small">활성</MDSTag>                                                                                                                                                                                                                                        
          </MDSTable.Cell>                                                                                                                                                                                                                                                                                         
          <MDSTable.Cell>{item.description}</MDSTable.Cell>
        </MDSTable.Row>                                                                                                                                                                                                                                                                                            
      ))}         
    </MDSTable.Body>                                                                                                                                                                                                                                                                                               
  </MDSTable>                                                                                                                                                                                                                                                                                                      
   
  Tabs                                                                                                                                                                                                                                                                                                             
                  
  import { MDSTabs } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  <MDSTabs value={activeTab} onChange={setActiveTab} size="medium">                                                                                                                                                                                                                                                
    <MDSTabs.TextItem value="tab1">탭 1</MDSTabs.TextItem>                                                                                                                                                                                                                                                         
    <MDSTabs.TextItem value="tab2">탭 2</MDSTabs.TextItem>                                                                                                                                                                                                                                                         
    <MDSTabs.TextItem value="tab3" isDisabled>탭 3</MDSTabs.TextItem>
  </MDSTabs>                                                                                                                                                                                                                                                                                                       
                  
  Snackbar (토스트 알림)                                                                                                                                                                                                                                                                                           
                  
  함수 호출 방식입니다:                                                                                                                                                                                                                                                                                            
                  
  import { MDSSnackbar } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                   
  // 성공                                                                                                                                                                                                                                                                                                          
  MDSSnackbar({ type: 'success', title: '저장되었습니다.' });                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                   
  // 에러         
  MDSSnackbar({ type: 'error', title: '오류 발생', message: '다시 시도해주세요.' });                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                   
  // 액션 버튼 포함                                                                                                                                                                                                                                                                                                
  MDSSnackbar({                                                                                                                                                                                                                                                                                                    
    type: 'warning',                                                                                                                                                                                                                                                                                               
    title: '변경사항이 있습니다',
    actionButton: { text: '되돌리기', event: handleUndo },                                                                                                                                                                                                                                                         
  });                                                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                                   
  - type: 'success' | 'error' | 'warning' | 'complete'                                                                                                                                                                                                                                                             
  - 앱 루트에 <MDSSnackbarContainer />가 필요합니다.
                                                                                                                                                                                                                                                                                                                   
  Pagination                                                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                                                                   
  import { MDSPagination } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                                   
  <MDSPagination
    value={offset}                                                                                                                                                                                                                                                                                                 
    onChange={setOffset}
    totalCount={100}
    pageSize={10}                                                                                                                                                                                                                                                                                                  
  />
                                                                                                                                                                                                                                                                                                                   
  - value: 0부터 시작하는 오프셋 값                                                                                                                                                                                                                                                                                
  - pageSize: 페이지당 항목 수                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                   
  Tooltip         
                                                                                                                                                                                                                                                                                                                   
  import { MDSTooltip } from '@marqvision/mds-v2';

  <MDSTooltip title="도움말 텍스트" position="top" size="small">                                                                                                                                                                                                                                                   
    <MDSIcon name="Help" />
  </MDSTooltip>                                                                                                                                                                                                                                                                                                    
                  
  Popover                                                                                                                                                                                                                                                                                                          
                  
  import { MDSPopover } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  <MDSPopover
    anchor={<MDSButton variant="border" color="bluegray">메뉴</MDSButton>}                                                                                                                                                                                                                                         
    position="bottom-right"                                                                                                                                                                                                                                                                                        
  >                                                                                                                                                                                                                                                                                                                
    {({ close }) => (                                                                                                                                                                                                                                                                                              
      <div>팝오버 내용</div>                                                                                                                                                                                                                                                                                       
    )}                                                                                                                                                                                                                                                                                                             
  </MDSPopover>
                                                                                                                                                                                                                                                                                                                   
  SegmentedButton 

  import { MDSSegmentedButton } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  <MDSSegmentedButton
    type="fit"                                                                                                                                                                                                                                                                                                     
    variant="border"
    value={view}                                                                                                                                                                                                                                                                                                   
    onChange={setView}                                                                                                                                                                                                                                                                                             
    list={[                                                                                                                                                                                                                                                                                                        
      { label: '목록', value: 'list' },                                                                                                                                                                                                                                                                            
      { label: '카드', value: 'card' },                                                                                                                                                                                                                                                                            
    ]}                                                                                                                                                                                                                                                                                                             
  />                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                   
  EmptyView                                                                                                                                                                                                                                                                                                        
                  
  import { MDSEmptyView, MDSButton } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                   
  <MDSEmptyView title="데이터가 없습니다" description="새 항목을 추가해보세요">                                                                                                                                                                                                                                    
    <MDSButton variant="fill" color="blue">추가하기</MDSButton>                                                                                                                                                                                                                                                    
  </MDSEmptyView>                                                                                                                                                                                                                                                                                                  
                  
  Divider                                                                                                                                                                                                                                                                                                          
   
  import { MDSDivider } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                   
  <MDSDivider orientation="horizontal" intensity="default" />                                                                                                                                                                                                                                                      
  <MDSDivider variant="dot" />                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                   
  Skeleton (로딩 상태)                                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                                                   
  import { MDSSkeleton } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                   
  <MDSSkeleton variant="body" size="m" width="200px" />                                                                                                                                                                                                                                                            
  <MDSSkeleton variant="circle" size={40} />                                                                                                                                                                                                                                                                       
  <MDSSkeleton variant="rect" width="100%" height="200px" borderRadius="8px" />                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                   
  Image
                                                                                                                                                                                                                                                                                                                   
  import { MDSImage } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  <MDSImage
    src="/photo.jpg"                                                                                                                                                                                                                                                                                               
    alt="설명"    
    width="200px"                                                                                                                                                                                                                                                                                                  
    height="200px"
    objectFit="cover"                                                                                                                                                                                                                                                                                              
    fallbackStyle="tint"
  />                                                                                                                                                                                                                                                                                                               
   
  LoadingIndicator                                                                                                                                                                                                                                                                                                 
                  
  import { MDSLoadingIndicator } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  // 무한 로딩                                                                                                                                                                                                                                                                                                     
  <MDSLoadingIndicator />                                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                                   
  // 진행률 표시  
  <MDSLoadingIndicator isDeterminate progress={75} />
                                                                                                                                                                                                                                                                                                                   
  DatePicker / DateRangePicker
                                                                                                                                                                                                                                                                                                                   
  import { MDSDatePicker, MDSDateRangePicker } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  <MDSDatePicker anchor={{ variant: 'input' }} onChange={(date) => setDate(date)} />                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                   
  <MDSDateRangePicker                                                                                                                                                                                                                                                                                              
    anchor={{ variant: 'input' }}
    onChange={({ startDate, endDate }) => setRange({ startDate, endDate })}
  />                                                                                                                                                                                                                                                                                                               
   
  MessageBox                                                                                                                                                                                                                                                                                                       
                  
  import { MDSMessageBox } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  <MDSMessageBox
    title="알림"                                                                                                                                                                                                                                                                                                   
    message="작업이 완료되었습니다."
    color="blue"
    titleIcon={<MDSIcon name="Info" />}                                                                                                                                                                                                                                                                            
  />
                                                                                                                                                                                                                                                                                                                   
  FileUploader (Hook)                                                                                                                                                                                                                                                                                              
   
  import { useFileUploader } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                            
                  
  const { controller, file } = useFileUploader({                                                                                                                                                                                                                                                                   
    accept: ['image/png', 'image/jpeg'],
    limit: 5,                                                                                                                                                                                                                                                                                                      
    maxFileSize: 10 * 1024 * 1024,                                                                                                                                                                                                                                                                                 
  });                                                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                                   
  ---                                                                                                                                                                                                                                                                                                              
  레이아웃 컴포넌트
                                                                                                                                                                                                                                                                                                                   
  GNB (Global Navigation Bar)
                                                                                                                                                                                                                                                                                                                   
  import { MDSGNB } from '@marqvision/mds-v2';
                                                                                                                                                                                                                                                                                                                   
  <MDSGNB isLNBOpen={isLNBOpen} onLNBToggle={toggleLNB} LinkComponent={Link}>                                                                                                                                                                                                                                      
    <div>유틸리티 영역</div>                                                                                                                                                                                                                                                                                       
  </MDSGNB>                                                                                                                                                                                                                                                                                                        
                  
  LNB (Local Navigation Bar)                                                                                                                                                                                                                                                                                       
                  
  import { MDSLNB } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                   
  <MDSLNB
    isOpen={isLNBOpen}                                                                                                                                                                                                                                                                                             
    value={location.pathname}                                                                                                                                                                                                                                                                                      
    onFold={toggleLNB}
    LinkComponent={Link}                                                                                                                                                                                                                                                                                           
    list={[       
      {                                                                                                                                                                                                                                                                                                            
        key: 'dashboard',
        label: '대시보드',                                                                                                                                                                                                                                                                                         
        icon: <MDSIcon name="Home" />,
        items: [                                                                                                                                                                                                                                                                                                   
          { key: 'overview', label: '개요', path: '/dashboard/overview' },
          { key: 'analytics', label: '분석', path: '/dashboard/analytics' },                                                                                                                                                                                                                                       
        ],                                                                                                                                                                                                                                                                                                         
      },                                                                                                                                                                                                                                                                                                           
    ]}                                                                                                                                                                                                                                                                                                             
  />              

  PageHeader                                                                                                                                                                                                                                                                                                       
   
  import { MDSPageHeader } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                                   
  <MDSPageHeader
    pageTitle="페이지 제목"                                                                                                                                                                                                                                                                                        
    backButton={{ label: '목록으로', onClick: goBack }}
  >                                                                                                                                                                                                                                                                                                                
    <MDSButton variant="fill" color="blue">새로 만들기</MDSButton>
  </MDSPageHeader>                                                                                                                                                                                                                                                                                                 
                  
  Dimmed (오버레이)                                                                                                                                                                                                                                                                                                
                  
  import { MDSDimmed } from '@marqvision/mds-v2';                                                                                                                                                                                                                                                                  
                  
  <MDSDimmed isOpen={isOpen} onClose={handleClose}>                                                                                                                                                                                                                                                                
    <div>오버레이 위 콘텐츠</div>
  </MDSDimmed>                                                                                                                                                                                                                                                                                                     
                  
  ---
  핵심 규칙 요약
                                                                                                                                                                                                                                                                                                                   
  1. 모든 import는 @marqvision/mds-v2에서 — 내부 경로 접근 금지
  2. 색상은 useTheme() 토큰만 사용 — 하드코딩 금지                                                                                                                                                                                                                                                                 
  3. 텍스트는 MDSTypography — HTML 태그 직접 사용 금지                                                                                                                                                                                                                                                             
  4. 스타일링은 @emotion/styled — Tailwind CSS 사용 금지                                                                                                                                                                                                                                                           
  5. border-radius는 8px — 모든 컴포넌트 공통                                                                                                                                                                                                                                                                      
  6. 네임스페이스 패턴: Modal, Panel, Table 등은 MDSModal.Wrapper, MDSTable.Head 형태로 사용                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                                                                   
  ---                                                                                           
