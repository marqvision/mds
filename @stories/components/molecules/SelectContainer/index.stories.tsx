import { useCallback, useState } from 'react';
import { MDSSelectContainer } from '../../../../components';
import { Doc } from './Doc';
import { ValueEnum } from './@types';
import { LABEL_MAP } from './@constants';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof MDSSelectContainer.Wrapper> = {
  title: '2. Components/molecules/Select container',
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

export const DefaultPreview: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  render: function Render() {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    return (
      <MDSSelectContainer.Wrapper value={selectedItem} orientation="horizontal" itemSizing="fit">
        {[ValueEnum.Lorem, ValueEnum.Xyz123, ValueEnum.StoragePlaceholder, ValueEnum.LongNameForTesting].map(
          (value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              onClick={() => handleSelect(value)}
            />
          )
        )}
      </MDSSelectContainer.Wrapper>
    );
  },
};

export const NoInitialSelection: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  render: function Render() {
    const [selectedItem, setSelectedItem] = useState<ValueEnum | undefined>(undefined);
    const [selectedItemType2, setSelectedItemType2] = useState<ValueEnum | null>(null);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    const handleSelectType2 = useCallback((value: ValueEnum) => {
      setSelectedItemType2(value);
    }, []);

    return (
      <>
        <div>undefined case</div>
        <MDSSelectContainer.Wrapper value={selectedItem} orientation="horizontal" itemSizing="fit">
          {[ValueEnum.Lorem, ValueEnum.Xyz123, ValueEnum.StoragePlaceholder, ValueEnum.LongNameForTesting].map(
            (value) => (
              <MDSSelectContainer.Item<ValueEnum>
                key={value}
                title={{ label: LABEL_MAP[value] }}
                value={value}
                onClick={() => handleSelect(value)}
              />
            )
          )}
        </MDSSelectContainer.Wrapper>
        <div>null case</div>
        <MDSSelectContainer.Wrapper value={selectedItemType2} orientation="horizontal" itemSizing="fit">
          {[ValueEnum.Lorem, ValueEnum.Xyz123, ValueEnum.StoragePlaceholder, ValueEnum.LongNameForTesting].map(
            (value) => (
              <MDSSelectContainer.Item<ValueEnum>
                key={value}
                title={{ label: LABEL_MAP[value] }}
                value={value}
                onClick={() => handleSelectType2(value)}
              />
            )
          )}
        </MDSSelectContainer.Wrapper>
      </>
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
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    return (
      <MDSSelectContainer.Wrapper value={selectedItem} orientation={orientation}>
        {[ValueEnum.Lorem, ValueEnum.Xyz123, ValueEnum.StoragePlaceholder, ValueEnum.LongNameForTesting].map(
          (value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              onClick={() => handleSelect(value)}
            />
          )
        )}
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
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    return (
      <MDSSelectContainer.Wrapper value={selectedItem} orientation="horizontal" itemSizing={300} variant={variant}>
        {[ValueEnum.Lorem, ValueEnum.Xyz123, ValueEnum.StoragePlaceholder, ValueEnum.LongNameForTesting].map(
          (value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              onClick={() => handleSelect(value)}
            />
          )
        )}
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
    const [value, setItem] = useState(ValueEnum.Lorem);

    return (
      <MDSSelectContainer.Wrapper value={value} orientation="vertical" itemSizing="fit">
        <MDSSelectContainer.Item<ValueEnum>
          title={{ label: LABEL_MAP[ValueEnum.Lorem] }}
          value={ValueEnum.Lorem}
          onClick={() => {
            setItem(ValueEnum.Lorem);
          }}
          disabled={disabled}
        />
      </MDSSelectContainer.Wrapper>
    );
  },
};

export const OrientationFit: StoryObj<typeof MDSSelectContainer.Wrapper> = {
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

    return (
      <div style={{ minHeight: '500px', display: 'flex' }}>
        <MDSSelectContainer.Wrapper value={selectedItem} orientation={orientation} itemSizing="fit">
          {[ValueEnum.Lorem, ValueEnum.Xyz123, ValueEnum.LongNameForTesting].map((value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              onClick={() => handleSelect(value)}
            />
          ))}
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

    return (
      <div style={{ minHeight: '500px', display: 'flex' }}>
        <MDSSelectContainer.Wrapper value={selectedItem} orientation={orientation}>
          {Object.values(ValueEnum).map((value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              onClick={() => handleSelect(value)}
            />
          ))}
        </MDSSelectContainer.Wrapper>
      </div>
    );
  },
};

export const OrientationHorizontalFixed: StoryObj<typeof MDSSelectContainer.Wrapper> = {
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
    itemSizing: 200,
  },
  render: function Render({ itemSizing = 200 }) {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    return (
      <div style={{ minHeight: '500px', display: 'flex' }}>
        <MDSSelectContainer.Wrapper value={selectedItem} orientation="horizontal" itemSizing={itemSizing}>
          {Object.values(ValueEnum).map((value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              onClick={() => handleSelect(value)}
            />
          ))}
        </MDSSelectContainer.Wrapper>
      </div>
    );
  },
};

export const OrientationVerticalFixed: StoryObj<typeof MDSSelectContainer.Wrapper> = {
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
    itemSizing: 200,
  },
  render: function Render({ itemSizing = 80 }) {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    return (
      <div style={{ minHeight: '500px', display: 'flex' }}>
        <MDSSelectContainer.Wrapper value={selectedItem} orientation="vertical" itemSizing={itemSizing}>
          {Object.values(ValueEnum).map((value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              disabled={true}
              onClick={() => handleSelect(value)}
            />
          ))}
        </MDSSelectContainer.Wrapper>
      </div>
    );
  },
};
