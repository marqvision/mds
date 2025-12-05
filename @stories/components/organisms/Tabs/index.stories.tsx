import { MouseEvent } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'storybook/preview-api';
import { MDSTabs } from '../../../../components/organisms/Tabs';
import { MDSDivider, MDSIcon, MDSTag } from '../../../..';
import { Doc } from './Doc';

const meta: Meta<typeof MDSTabs> = {
  title: '2. Components/organisms/Tabs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: Doc,
      layout: 'centered',
    },
  },
  args: {
    size: 'medium',
    withTitle: false,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large', 'x-large'],
    },
    withTitle: {
      control: 'boolean',
    },
  },
};

export default meta;

export const TextTab: StoryObj<typeof MDSTabs> = {
  parameters: {
    controls: { expanded: true },
  },
  render: function Render(props) {
    const [tab, setTab] = useState<'TAB1' | 'TAB2' | 'TAB3' | 'TAB4' | 'TAB5' | 'TAB6' | 'TAB7' | 'TAB8'>('TAB1');
    const [tab2, setTab2] = useState<'TAB1' | 'TAB2' | 'TAB3' | 'TAB4' | 'TAB5' | 'TAB6' | 'TAB7' | 'TAB8'>('TAB1');

    const options = [...Array(8)].map((_, i) => `TAB${[...Array(i)].map(() => '_').join('')}${i + 1}`);

    const getTags = (index: number) => {
      if (index === 2) {
        return [
          <MDSTag variant="fill" color="red" size="small">
            N
          </MDSTag>,
          <MDSTag variant="fill" color="bluegray" size="small">
            T
          </MDSTag>,
        ];
      }
      if (index === 4) {
        return (
          <MDSTag variant="fill" color="blue" size="small">
            Tag
          </MDSTag>
        );
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '12px' }}>
          <p style={{ paddingBottom: '16px' }}>theme: light</p>
          <MDSTabs {...props} value={tab} onChange={setTab}>
            {options.map((label, index) => (
              <MDSTabs.TextItem key={index} value={`TAB${index + 1}`} tags={getTags(index)}>
                {label}
              </MDSTabs.TextItem>
            ))}
          </MDSTabs>
        </div>
        <div style={{ backgroundColor: '#212B36', borderRadius: '8px', padding: '12px' }}>
          <p style={{ paddingBottom: '16px', color: 'white' }}>theme: dark</p>
          <MDSTabs {...props} theme="dark" value={tab2} onChange={setTab2}>
            {options.map((label, index) => (
              <MDSTabs.TextItem key={index} value={`TAB${index + 1}`} tags={getTags(index)}>
                {label}
              </MDSTabs.TextItem>
            ))}
          </MDSTabs>
        </div>
      </div>
    );
  },
};

export const CardTab: StoryObj<typeof MDSTabs> = {
  parameters: {
    controls: { expanded: true },
  },
  render: function Render(props) {
    const [tab, setTab] = useState<'TAB1' | 'TAB2' | 'TAB3' | 'TAB4' | 'TAB5' | 'TAB6' | 'TAB7' | 'TAB8'>('TAB1');
    const [tab2, setTab2] = useState<'TAB1' | 'TAB2' | 'TAB3' | 'TAB4' | 'TAB5' | 'TAB6' | 'TAB7' | 'TAB8'>('TAB1');

    const options = [...Array(8)].map((_, i) => `TAB${[...Array(i)].map(() => '_').join('')}${i + 1}`);

    const getTags = (index: number) => {
      if (index === 2) {
        return [
          <MDSTag variant="fill" color="red" size="small">
            N
          </MDSTag>,
          <MDSTag variant="fill" color="bluegray" size="small">
            T
          </MDSTag>,
        ];
      }
      if (index === 4) {
        return (
          <MDSTag variant="fill" color="blue" size="small">
            Tag
          </MDSTag>
        );
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h1>
          <br />
          card item의 경우 size, withTitle 에 따른 변경은 없습니다.
          <br />
          theme의 경우만 tabItem은 변경 없이 tabs 의 bg 및 indicator 색상만 영향을 줍니다.
        </h1>
        <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '12px' }}>
          <p style={{ paddingBottom: '16px' }}>theme: light</p>
          <MDSTabs {...props} value={tab} onChange={setTab}>
            {options.map((label, index) => (
              <MDSTabs.CardItem
                key={index}
                value={`TAB${index + 1}`}
                tags={getTags(index)}
                title={label}
                description="description"
              />
            ))}
          </MDSTabs>
        </div>
        <div style={{ backgroundColor: '#212B36', borderRadius: '8px', padding: '12px' }}>
          <p style={{ paddingBottom: '16px', color: 'white' }}>theme: dark</p>
          <MDSTabs {...props} theme="dark" value={tab2} onChange={setTab2}>
            {options.map((label, index) => (
              <MDSTabs.CardItem
                key={index}
                value={`TAB${index + 1}`}
                tags={getTags(index)}
                title={label}
                description="description"
              />
            ))}
          </MDSTabs>
        </div>
      </div>
    );
  },
};

export const TabWithOthers: StoryObj<typeof MDSTabs> = {
  parameters: {
    controls: { expanded: true },
  },
  render: function Render(props) {
    const [tab, setTab] = useState<'TAB1' | 'TAB2' | 'TAB3' | 'TAB4' | 'TAB5' | 'TAB6' | 'TAB7' | 'TAB8'>('TAB1');

    const options = [...Array(8)].map((_, i) => `TAB${[...Array(i)].map(() => '_').join('')}${i + 1}`);

    const getTags = (index: number) => {
      if (index === 2) {
        return [
          <MDSTag variant="fill" color="red" size="small">
            N
          </MDSTag>,
          <MDSTag variant="fill" color="bluegray" size="small">
            T
          </MDSTag>,
        ];
      }
      if (index === 4) {
        return (
          <MDSTag variant="fill" color="blue" size="small">
            Tag
          </MDSTag>
        );
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        divider, tag등을 넣고 싶다면 넣고싶은 위치에 넣으면 됩니다.
        <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '12px' }}>
          <MDSTabs {...props} value={tab} onChange={setTab}>
            <div style={{ padding: '0 8px' }}>
              <MDSTag variant="tint" color="bluegray" size="small">
                divider1
              </MDSTag>
            </div>
            {options.slice(0, 4).map((label, index) => (
              <MDSTabs.TextItem key={index} value={`TAB${index + 1}`} tags={getTags(index)}>
                {label}
              </MDSTabs.TextItem>
            ))}
            <div style={{ padding: '0 8px' }}>
              <MDSDivider orientation="vertical" length={20} />
            </div>
            <div style={{ padding: '0 8px' }}>
              <MDSTag variant="tint" color="bluegray" size="small">
                divider2
              </MDSTag>
            </div>
            {options.slice(4).map((label, index) => (
              <MDSTabs.TextItem key={index + 4} value={`TAB${index + 4 + 1}`} tags={getTags(index + 4)}>
                {label}
              </MDSTabs.TextItem>
            ))}
          </MDSTabs>
        </div>
      </div>
    );
  },
};

export const CustomClickEvent: StoryObj<typeof MDSTabs> = {
  parameters: {
    controls: { expanded: true },
  },
  render: function Render(props) {
    const [tab, setTab] = useState<'TAB1' | 'TAB2' | 'TAB3' | 'TAB4' | 'TAB5' | 'TAB6' | 'TAB7' | 'TAB8'>('TAB1');

    const handleChange = (value: typeof tab) => {
      if (value === 'TAB2') {
        // custom action
        alert(`handled by tabs onChange - ${value}`);
      } else {
        // Tab3의 경우 handleClickTab3 의 이벤트 전파 방지로 인해 실행되지 않음.
        setTab(value);
      }
    };

    const handleClickTab3 = (e: MouseEvent, value: typeof tab) => {
      // custom action (stopPropagation, preventDefault 둘 중 하나만 써도 됨)
      e.stopPropagation();
      e.preventDefault();
      alert(`handled by item > onClick & block onChange event - ${value}`);
    };

    const handleClickTab4 = () => {
      alert('onChange + onClick');
    };

    const exCode = `
      const handleChange = (value: typeof tab) => {
        if (value === 'TAB2') {
          // custom action
          alert(\`handled by tabs onChange - $\{value}\`);
        } else {
          // Tab3의 경우 handleClickTab3 의 이벤트 전파 방지로 인해 실행되지 않음.
          setTab(value);
        }
      };
      
      const handleClickTab3 = (e: MouseEvent, value: typeof tab) => {
        // custom action (stopPropagation, preventDefault 둘 중 하나만 써도 됨)
        e.stopPropagation();
        e.preventDefault();
        alert(\`handled by item > onClick & block onChange event - $\{value}\`);
      };
  
      const handleClickTab4 = () => {
        alert('onChange + onClick');
      };
      
      return (
        <MDSTabs {...props} value={tab} onChange={handleChange}>
          <MDSTabs.TextItem value="TAB1">Tab1</MDSTabs.TextItem>
          <MDSTabs.TextItem value="TAB2" tags={<MDSIcon.OpenNew size={16} />}>
            Tab2
          </MDSTabs.TextItem>
          <MDSTabs.TextItem value="TAB3" tags={<MDSIcon.OpenNew size={16} />} onClick={handleClickTab3}>
            Tab3
          </MDSTabs.TextItem>
          <MDSTabs.TextItem value="TAB4" onClick={handleClickTab4}>
            Tab4
          </MDSTabs.TextItem>
        </MDSTabs>
      );
    `;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '12px' }}>
          <MDSTabs {...props} value={tab} onChange={handleChange}>
            <MDSTabs.TextItem value="TAB1">Tab1</MDSTabs.TextItem>
            <MDSTabs.TextItem value="TAB2" tags={<MDSIcon.OpenNew size={16} />}>
              Tab2
            </MDSTabs.TextItem>
            <MDSTabs.TextItem value="TAB3" tags={<MDSIcon.OpenNew size={16} />} onClick={handleClickTab3}>
              Tab3
            </MDSTabs.TextItem>
            <MDSTabs.TextItem value="TAB4" onClick={handleClickTab4}>
              Tab4
            </MDSTabs.TextItem>
          </MDSTabs>
        </div>
        <p>탭 기능은 사용하지 않고 클릭 커스텀은 2가지 방법 가능. (코드 예시를 확인해주세요)</p>
        <ol>
          <li>1. MDSTabs - onChange 에서 특정 tab 값이 온 경우 tab을 바꾸지 않고 커스텀 액션을 한다. (Tab2)</li>
          <li>
            2. TextItem의 onClick 함수에 e.stopPropagation() 혹은 e.preventDefault() 를 실행시키고 커스텀 액션을 한다.
            (Tab3)
            <ul style={{ paddingLeft: '16px' }}>
              <li>
                • e.stopPropagation() 혹은 e.preventDefault() 를 실행하지 않는다면 onClick, onChange 둘 다 실행된다.
                (Tab4)
              </li>
            </ul>
          </li>
        </ol>
        코드 예시)
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          <code style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>{exCode}</code>
        </pre>
      </div>
    );
  },
};
