import { Canvas, Title } from '@storybook/blocks';
import {
  CustomTitle,
  JustifyContent,
  Preview,
  RightSideElement,
  TitleIcon,
  WithoutAction,
  WithoutHeader,
} from './index.stories';

export const Doc = () => {
  return (
    <div>
      <Title />
      <p>
        이 페이지에서는 컴포넌트의 조합 및 예시 코드를 확인할 수 있습니다.
        <br />
        사용된 컴포넌트의 상세한 옵션은 개별적으로 분리된 컴포넌트 페이지를 확인하세요.
      </p>
      <hr />
      <h3 id="Preview">Preview</h3>
      <p>header, content, action 모두 함께 사용합니다</p>
      <Canvas of={Preview} story={{ inline: false, height: '400px' }} />
      <hr />
      <h3 id="WithoutHeader">WithoutHeader</h3>
      <p>header 없이 사용 할 수 있습니다</p>
      <Canvas of={WithoutHeader} story={{ inline: false, height: '400px' }} />
      <hr />
      <h3 id="WithoutAction">WithoutAction</h3>
      <p>action 없이 사용 할 수 있습니다</p>
      <Canvas of={WithoutAction} story={{ inline: false, height: '400px' }} />
      <hr />
      <h3 id="TitleIcon">Header - Icon</h3>
      <p>Header 에 아이콘을 추가할 수 있습니다.</p>
      <Canvas of={TitleIcon} story={{ inline: false, height: '400px' }} />
      <hr />
      <h3 id="CustomTitle">Header - CustomTitle</h3>
      <p>Header 의 Title 에는 text 외에 임의의 요소를 출력할 수 있습니다.</p>
      <p>이 때 별도의 스타일을 지정하지 않는다면 Title 의 기본 스타일(T20, bold)을 상속받습니다.</p>
      <Canvas of={CustomTitle} story={{ inline: false, height: '400px' }} />
      <hr />
      <h3 id="RightSideElement">Header - RightSideElement</h3>
      <p>Header 의 오른쪽 공간에 임의의 요소를 추가할 수 있습니다</p>
      <Canvas of={RightSideElement} story={{ inline: false, height: '400px' }} />
      <hr />
      <h3 id="ActionJustifyContent">Action - JustifyContent</h3>
      <p>Action 에 justifyContent 를 직접 전달할 수 있습니다 (css - justify-content)</p>
      <Canvas of={JustifyContent} story={{ inline: false, height: '400px' }} />
    </div>
  );
};
