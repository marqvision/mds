import { useEffect } from 'react';
import { Canvas, Title } from '@storybook/addon-docs/blocks';
import { TextTab } from './index.stories';

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
      <p>Tabs.TextTab 아이템으로 구성된 Tab입니다.</p>
      <Canvas of={TextTab} story={{ inline: false, height: '700px' }} />
      <hr />
    </div>
  );
};
