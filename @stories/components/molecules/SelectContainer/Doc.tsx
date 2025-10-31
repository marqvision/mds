import { Canvas, Title } from '@storybook/addon-docs/blocks';
import {
  DefaultPreview,
  DisabledItem,
  OrientationFit,
  OrientationHorizontalFixed,
  OrientationVerticalFixed,
  VariantCenter,
  VerticalOrientation,
} from './index.stories';

export const Doc = () => {
  return (
    <div>
      <Title />
      <p>이 페이지에서는 컴포넌트의 조합 및 예시 코드를 확인할 수 있습니다.</p>

      <hr />
      <br />

      <h3 id="Default preview">Default preview</h3>
      <p>렌더링하고자 하는 셀렉트 컨테이너 컴포넌트만큼 렌더링해줍니다.</p>
      <p>Default로 아래의 스타일을 가집니다:</p>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
        <code style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>
          {`<MDSSelectContainer.Wrapper value={item} orientation="horizontal" variant="left" />`}
        </code>
      </pre>
      <Canvas of={DefaultPreview} story={{ inline: false, height: '400px' }} />

      <hr />
      <br />

      <h3 id="Vertical orientation">Vertical orientation</h3>
      <p>Wrapper 컴포넌트에게 orientation prop값을 vertical로 전달해주면 아래처럼 렌더링됩니다.</p>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
        <code style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>
          {`<MDSSelectContainer.Wrapper value={item} orientation="vertical" variant="left" />`}
        </code>
      </pre>
      <Canvas of={VerticalOrientation} story={{ inline: false, height: '400px' }} />

      <hr />
      <br />

      <h3 id="Variant center">Variant center</h3>
      <p>
        Wrapper 컴포넌트에게 orientation prop값을 vertical로 전달해주고 Variant를 center로 주면 아래처럼 렌더링됩니다.
      </p>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
        <code style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>
          {`<MDSSelectContainer.Wrapper value={item} orientation="vertical" variant="center" />`}
        </code>
      </pre>
      <Canvas of={VariantCenter} story={{ inline: false, height: '400px' }} />

      <hr />
      <br />

      <h3 id="Disabled item">Disabled item</h3>
      <p>
        <code>&lt;MDSSelectContainer.Item&gt;</code>의 <code>{'disabled={true}'}</code>을 준 예시입니다.
        <br />
        <br />
        특정 상황에서
        <code>&lt;MDSSelectContainer.Item&gt;</code>를 <code>disabled</code> 처리하고 싶다면,{' '}
        <code>&lt;MDSSelectContainer.Item&gt;</code> 컴포넌트들에게 <code>{'disabled={true}'}</code> 값을 넘겨주면
        됩니다.
      </p>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
        <code style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>
          {`<MDSSelectContainer.Item isSelected disabled />`}
        </code>
      </pre>
      <Canvas
        of={DisabledItem}
        story={{
          inline: false,
          height: '400px',
        }}
      />

      <h3 id="Orientation fit">Orientation fit</h3>
      <p>
        <code>&lt;MDSSelectContainer.Item&gt;</code>의 <code>{'orientation="fit"'}</code>을 준 예시입니다.
        <br />
      </p>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}></pre>

      <Canvas
        of={OrientationFit}
        story={{
          inline: false,
          height: '800px',
        }}
      />

      <h3 id="Orientation fit">Orientation horizontal fixed</h3>
      <p>
        <code>&lt;MDSSelectContainer.Item&gt;</code>의{' '}
        <code>{'orientation="horizontal" orientationType="fixed" fixedWidthValue={fixedWidthValue}'}</code>을 준
        예시입니다.
        <br />
      </p>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}></pre>

      <Canvas
        of={OrientationHorizontalFixed}
        story={{
          inline: false,
          height: '800px',
        }}
      />

      <h3 id="Orientation fit">Orientation vertical fixed</h3>
      <p>
        <code>&lt;MDSSelectContainer.Item&gt;</code>의{' '}
        <code>{'orientation="vertical" orientationType="fixed" fixedHeightValue={fixedWidthValue}'}</code>을 준
        예시입니다.
        <br />
      </p>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}></pre>

      <Canvas
        of={OrientationVerticalFixed}
        story={{
          inline: false,
          height: '800px',
        }}
      />
    </div>
  );
};
