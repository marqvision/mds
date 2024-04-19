import { Canvas, Title } from '@storybook/blocks';
import { Preview, WithoutAction, WithoutHeader } from './index.stories';

const code = {
  preview:
    'const [isOpen, setIsOpen] = useState();\nconst handleClose = () => {\n  setIsOpen(false);\n};\n\nreturn (\n  <MDSModal.Wrapper onClose={handleClose} isOpen={isOpen}>\n    <MDSModal.Header onClose={handleClose}>\n      Title\n     </MDSModal.Header>\n    <MDSModal.Content>\n      Content\n     </MDSModal.Content>\n    <MDSModal.Action>\n      Action\n    </MDSModal.Action>\n  </MDSModal.Wrapper>\n);',
  withoutHeader:
    'const [isOpen, setIsOpen] = useState();\nconst handleClose = () => {\n  setIsOpen(false);\n};\n\nreturn (\n  <MDSModal.Wrapper onClose={handleClose} isOpen={isOpen}>\n    <MDSModal.Content>\n      Content\n     </MDSModal.Content>\n    <MDSModal.Action>\n      Action\n    </MDSModal.Action>\n  </MDSModal.Wrapper>\n);',
  withoutAction:
    'const [isOpen, setIsOpen] = useState();\nconst handleClose = () => {\n  setIsOpen(false);\n};\n\nreturn (\n  <MDSModal.Wrapper onClose={handleClose} isOpen={isOpen}>\n    <MDSModal.Header onClose={handleClose}>\n      Title\n     </MDSModal.Header>\n    <MDSModal.Content>\n      Content\n     </MDSModal.Content>\n  </MDSModal.Wrapper>\n);',
};

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
      <Canvas
        of={Preview}
        story={{ inline: false, height: '600px' }}
        source={{
          code: code.preview,
        }}
        sourceState="shown"
      />
      <hr />
      <h3 id="WithoutHeader">WithoutHeader</h3>
      <p>header 없이 사용 할 수 있습니다</p>
      <Canvas
        of={WithoutHeader}
        story={{ inline: false, height: '400px' }}
        source={{
          code: code.withoutHeader,
        }}
        sourceState="shown"
      />
      <hr />
      <h3 id="WithoutAction">WithoutAction</h3>
      <p>action 없이 사용 할 수 있습니다</p>
      <Canvas
        of={WithoutAction}
        story={{ inline: false, height: '400px' }}
        source={{
          code: code.withoutAction,
        }}
        sourceState="shown"
      />
    </div>
  );
};
