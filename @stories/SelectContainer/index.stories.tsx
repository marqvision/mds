import { useCallback, useState } from 'react';
import { MDSSelectContainer } from '../../components';
import { Doc } from './Doc';
import { ValueEnum } from './@types';
import { LABEL_MAP } from './@constants';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSSelectContainer.Wrapper> = {
  title: '2. Components/Select container',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: Doc,
      layout: 'centered',
    },
  },
  args: {},
  argTypes: {},
};

export default meta;

// add logic to receive optional color prop inside this object and add logic to make gap value customizable
// work this as a mds v2 ticket instead of individual ticket

// 실제로 story book으로 디자인 시스템 컴포넌트를 만들다보면 개선해야할점들이 조금씩 보이긴한다~

export const DefaultPreview: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  render: function Render(_) {
    const [item, setItem] = useState(ValueEnum.Lorem);

    return (
      <MDSSelectContainer.Wrapper value={item}>
        <MDSSelectContainer.Item<ValueEnum>
          title={{ label: LABEL_MAP[ValueEnum.Lorem] }}
          value={ValueEnum.Lorem}
          onClick={() => {
            setItem(ValueEnum.Lorem);
          }}
        />
        <MDSSelectContainer.Item<ValueEnum>
          title={{ label: LABEL_MAP[ValueEnum.Xyz123] }}
          value={ValueEnum.Xyz123}
          onClick={() => {
            setItem(ValueEnum.Xyz123);
          }}
        />
        <MDSSelectContainer.Item<ValueEnum>
          title={{ label: LABEL_MAP[ValueEnum.StoragePlaceholder] }}
          value={ValueEnum.StoragePlaceholder}
          onClick={() => {
            setItem(ValueEnum.StoragePlaceholder);
          }}
        />
        <MDSSelectContainer.Item<ValueEnum>
          title={{ label: LABEL_MAP[ValueEnum.LongNameForTesting] }}
          value={ValueEnum.LongNameForTesting}
          onClick={() => {
            setItem(ValueEnum.LongNameForTesting);
          }}
        />
      </MDSSelectContainer.Wrapper>
    );
  },
};

export const VerticalOrientation: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    orientation: {
      defaultValue: {
        summary: 'vertical',
      },
      options: ['horizontal', 'vertical'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    orientation: 'vertical',
  },
  render: function Render({ orientation = 'vertical' }) {
    const [item, setItem] = useState(ValueEnum.Lorem);

    return (
      <MDSSelectContainer.Wrapper value={item} orientation={orientation} orientationType="hug">
        <MDSSelectContainer.Item<ValueEnum>
          title={{ label: LABEL_MAP[ValueEnum.Lorem] }}
          value={ValueEnum.Lorem}
          onClick={() => {
            setItem(ValueEnum.Lorem);
          }}
        />
        <MDSSelectContainer.Item<ValueEnum>
          title={{ label: LABEL_MAP[ValueEnum.Xyz123] }}
          value={ValueEnum.Xyz123}
          onClick={() => {
            setItem(ValueEnum.Xyz123);
          }}
        />
        <MDSSelectContainer.Item<ValueEnum>
          title={{ label: LABEL_MAP[ValueEnum.StoragePlaceholder] }}
          value={ValueEnum.StoragePlaceholder}
          onClick={() => {
            setItem(ValueEnum.StoragePlaceholder);
          }}
        />
        <MDSSelectContainer.Item<ValueEnum>
          title={{ label: LABEL_MAP[ValueEnum.LongNameForTesting] }}
          value={ValueEnum.LongNameForTesting}
          onClick={() => {
            setItem(ValueEnum.LongNameForTesting);
          }}
        />
      </MDSSelectContainer.Wrapper>
    );
  },
};

export const VariantCenter: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    variant: {
      defaultValue: { summary: 'left' },
      options: ['left', 'center'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    variant: 'center',
  },
  render: function Render({ variant }) {
    const [item, setItem] = useState(ValueEnum.Lorem);

    return (
      <MDSSelectContainer.Wrapper
        value={item}
        orientation="horizontal"
        orientationType="fixed"
        fixedWidthValue={300}
        variant={variant}
      >
        <MDSSelectContainer.Item<ValueEnum>
          title={{ label: LABEL_MAP[ValueEnum.Lorem] }}
          value={ValueEnum.Lorem}
          onClick={() => {
            setItem(ValueEnum.Lorem);
          }}
        />
        <MDSSelectContainer.Item<ValueEnum>
          title={{ label: LABEL_MAP[ValueEnum.Xyz123] }}
          value={ValueEnum.Xyz123}
          onClick={() => {
            setItem(ValueEnum.Xyz123);
          }}
        />
        <MDSSelectContainer.Item<ValueEnum>
          title={{ label: LABEL_MAP[ValueEnum.StoragePlaceholder] }}
          value={ValueEnum.StoragePlaceholder}
          onClick={() => {
            setItem(ValueEnum.StoragePlaceholder);
          }}
        />
        <MDSSelectContainer.Item<ValueEnum>
          title={{ label: LABEL_MAP[ValueEnum.LongNameForTesting] }}
          value={ValueEnum.LongNameForTesting}
          onClick={() => {
            setItem(ValueEnum.LongNameForTesting);
          }}
        />
      </MDSSelectContainer.Wrapper>
    );
  },
};

export const DisabledItem: StoryObj<typeof MDSSelectContainer.Item> = {
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    disabled: {
      defaultValue: {
        summary: 'boolean toggle',
      },
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    disabled: true,
  },

  render: function Render({ disabled }) {
    const [_, setItem] = useState(ValueEnum.Lorem);

    return (
      <MDSSelectContainer.Item<ValueEnum>
        title={{ label: LABEL_MAP[ValueEnum.Lorem] }}
        value={ValueEnum.Lorem}
        isSelected
        onClick={() => {
          setItem(ValueEnum.Lorem);
        }}
        disabled={disabled}
      />
    );
  },
};

export const OrientationFit: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    orientation: {
      defaultValue: { summary: 'vertical' },
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
  args: {
    orientation: 'vertical',
  },
  render: function Render({ orientation = 'vertical' }) {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    const renderItems = () =>
      [ValueEnum.Lorem, ValueEnum.Xyz123, ValueEnum.LongNameForTesting].map((value) => (
        <MDSSelectContainer.Item<ValueEnum>
          key={value}
          title={{ label: LABEL_MAP[value] }}
          value={value}
          onClick={() => handleSelect(value)}
        />
      ));

    return (
      <div style={{ minHeight: '500px', display: 'flex' }}>
        <MDSSelectContainer.Wrapper value={selectedItem} orientation={orientation} orientationType="fit">
          {renderItems()}
        </MDSSelectContainer.Wrapper>
      </div>
    );
  },
};

export const OrientationHug: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    orientation: {
      defaultValue: {
        summary: 'vertical',
      },
      options: ['horizontal', 'vertical'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    orientation: 'vertical',
  },
  render: function Render({ orientation = 'vertical' }) {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    const renderItems = () =>
      Object.values(ValueEnum).map((value) => (
        <MDSSelectContainer.Item<ValueEnum>
          key={value}
          title={{ label: LABEL_MAP[value] }}
          value={value}
          onClick={() => handleSelect(value)}
        />
      ));

    return (
      <div style={{ minHeight: '500px', display: 'flex' }}>
        <MDSSelectContainer.Wrapper value={selectedItem} orientation={orientation} orientationType="hug">
          {renderItems()}
        </MDSSelectContainer.Wrapper>
      </div>
    );
  },
};

export const OrientationHorizontalFixed: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    fixedWidthValue: {
      control: { type: 'number' },
      defaultValue: 200,
    },
  },
  args: {
    fixedWidthValue: 200,
  },
  render: function Render({ fixedWidthValue = 200 }) {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    const renderItems = () =>
      Object.values(ValueEnum).map((value) => (
        <MDSSelectContainer.Item<ValueEnum>
          key={value}
          title={{ label: LABEL_MAP[value] }}
          value={value}
          onClick={() => handleSelect(value)}
        />
      ));

    return (
      <div style={{ minHeight: '500px', display: 'flex' }}>
        <MDSSelectContainer.Wrapper
          value={selectedItem}
          orientation="horizontal"
          orientationType="fixed"
          fixedWidthValue={fixedWidthValue}
        >
          {renderItems()}
        </MDSSelectContainer.Wrapper>
      </div>
    );
  },
};

export const OrientationVerticalFixed: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    fixedHeightValue: {
      control: { type: 'number' },
      defaultValue: 80,
    },
  },
  args: {
    fixedHeightValue: 80,
  },
  render: function Render({ fixedHeightValue = 80 }) {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    const renderItems = () =>
      Object.values(ValueEnum).map((value) => (
        <MDSSelectContainer.Item<ValueEnum>
          key={value}
          title={{ label: LABEL_MAP[value] }}
          value={value}
          onClick={() => handleSelect(value)}
        />
      ));

    return (
      <div style={{ minHeight: '500px', display: 'flex' }}>
        <MDSSelectContainer.Wrapper
          value={selectedItem}
          orientation="vertical"
          orientationType="fixed"
          fixedHeightValue={fixedHeightValue}
        >
          {renderItems()}
        </MDSSelectContainer.Wrapper>
      </div>
    );
  },
};
