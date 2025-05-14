import { useEffect } from 'react';
import { Canvas, Title } from '@storybook/blocks';
import { DimmedPanel, PanelDirection, SplitPanel } from './index.stories';

export const Doc = () => {
  useEffect(() => {
    document.querySelectorAll('iframe').forEach((iframe) => {
      iframe.style.border = '1px solid #ccc';
    });
  }, []);

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
      <Canvas of={DimmedPanel} story={{ inline: false, height: '700px' }} />
      <hr />
      <h3 id="WithoutHeader">Space split style</h3>
      <p>영역을 차지하는 Panel 형태로 사용합니다</p>
      <Canvas of={SplitPanel} story={{ inline: false, height: '700px' }} />
      <hr />
      <h3 id="PanelWithDirection">Panel direction</h3>
      <p>패널 등장 방향을 변경합니다</p>
      <Canvas of={PanelDirection} story={{ inline: false, height: '700px' }} />
    </div>
  );
};
