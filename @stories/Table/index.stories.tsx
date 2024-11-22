import { Meta, StoryObj } from '@storybook/react';
import { MDSCheckbox, MDSChip, MDSTable, MDSTypography } from '../../components';

const meta: Meta<typeof MDSTable> = {
  title: '2. Components/Table',
  tags: ['autodocs'],
};
export default meta;

export const Preview: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: '기본 형태',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head>
        <MDSTable.Row>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell>1-1</MDSTable.Cell>
          <MDSTable.Cell>1-2</MDSTable.Cell>
          <MDSTable.Cell>1-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>2-1</MDSTable.Cell>
          <MDSTable.Cell>2-2</MDSTable.Cell>
          <MDSTable.Cell>2-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>3-1</MDSTable.Cell>
          <MDSTable.Cell>3-2</MDSTable.Cell>
          <MDSTable.Cell>3-3</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const NewHeader: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story:
          'Head 내 isNewHeader `true` 전달 시 신규 테이블 헤더 디자인(border bottom, font weight)이 적용됩니다.<br/> 이 속성은 MDSv2 Table 을 사용하는 전체 테이블에 신규 디자인 적용 후 제거 될 예정입니다.',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head isNewHeader>
        <MDSTable.Row>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell>1-1</MDSTable.Cell>
          <MDSTable.Cell>1-2</MDSTable.Cell>
          <MDSTable.Cell>1-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>2-1</MDSTable.Cell>
          <MDSTable.Cell>2-2</MDSTable.Cell>
          <MDSTable.Cell>2-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>3-1</MDSTable.Cell>
          <MDSTable.Cell>3-2</MDSTable.Cell>
          <MDSTable.Cell>3-3</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const BorderTop: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'borderTop `true` 전달 시 border bottom 과 동일한 색상이 border top 으로 추가됩니다.',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head isNewHeader borderTop>
        <MDSTable.Row>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell>1-1</MDSTable.Cell>
          <MDSTable.Cell>1-2</MDSTable.Cell>
          <MDSTable.Cell>1-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>2-1</MDSTable.Cell>
          <MDSTable.Cell>2-2</MDSTable.Cell>
          <MDSTable.Cell>2-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>3-1</MDSTable.Cell>
          <MDSTable.Cell>3-2</MDSTable.Cell>
          <MDSTable.Cell>3-3</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const CellSize: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'cell 의 사이즈를 결정할 수 있습니다. 이 값에 따라 padding 사이즈가 변경됩니다.',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head>
        <MDSTable.Row variant="secondary">
          <MDSTable.Cell size="small" colSpan={3}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <MDSCheckbox value={true} onChange={() => {}} />
              <MDSChip variant="fill" size="medium" color="blue">
                Enforce
              </MDSChip>
            </div>
          </MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell>1-1</MDSTable.Cell>
          <MDSTable.Cell>1-2</MDSTable.Cell>
          <MDSTable.Cell>1-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>2-1</MDSTable.Cell>
          <MDSTable.Cell>2-2</MDSTable.Cell>
          <MDSTable.Cell>2-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>3-1</MDSTable.Cell>
          <MDSTable.Cell>3-2</MDSTable.Cell>
          <MDSTable.Cell>3-3</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const StickyLeft: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'isStickyLeft 설정 시 첫 번째 cell 이 고정됩니다',
      },
    },
  },
  render: (_) => (
    <MDSTable isStickyLeft>
      <MDSTable.Head>
        <MDSTable.Row>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell>1-1</MDSTable.Cell>
          <MDSTable.Cell>1-2</MDSTable.Cell>
          <MDSTable.Cell>1-3</MDSTable.Cell>
          <MDSTable.Cell>1-4</MDSTable.Cell>
          <MDSTable.Cell>1-5</MDSTable.Cell>
          <MDSTable.Cell>1-6</MDSTable.Cell>
          <MDSTable.Cell>1-7</MDSTable.Cell>
          <MDSTable.Cell>1-8</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>2-1</MDSTable.Cell>
          <MDSTable.Cell>2-2</MDSTable.Cell>
          <MDSTable.Cell>2-3</MDSTable.Cell>
          <MDSTable.Cell>2-4</MDSTable.Cell>
          <MDSTable.Cell>2-5</MDSTable.Cell>
          <MDSTable.Cell>2-6</MDSTable.Cell>
          <MDSTable.Cell>2-7</MDSTable.Cell>
          <MDSTable.Cell>2-8</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>3-1</MDSTable.Cell>
          <MDSTable.Cell>3-2</MDSTable.Cell>
          <MDSTable.Cell>3-3</MDSTable.Cell>
          <MDSTable.Cell>3-4</MDSTable.Cell>
          <MDSTable.Cell>3-5</MDSTable.Cell>
          <MDSTable.Cell>3-6</MDSTable.Cell>
          <MDSTable.Cell>3-7</MDSTable.Cell>
          <MDSTable.Cell>3-8</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const StickyRight: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'isStickyRight 설정 시 마지막 cell 이 고정됩니다',
      },
    },
  },
  render: (_) => (
    <MDSTable isStickyRight>
      <MDSTable.Head>
        <MDSTable.Row>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            head
          </MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell>1-1</MDSTable.Cell>
          <MDSTable.Cell>1-2</MDSTable.Cell>
          <MDSTable.Cell>1-3</MDSTable.Cell>
          <MDSTable.Cell>1-4</MDSTable.Cell>
          <MDSTable.Cell>1-5</MDSTable.Cell>
          <MDSTable.Cell>1-6</MDSTable.Cell>
          <MDSTable.Cell>1-7</MDSTable.Cell>
          <MDSTable.Cell>1-8</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>2-1</MDSTable.Cell>
          <MDSTable.Cell>2-2</MDSTable.Cell>
          <MDSTable.Cell>2-3</MDSTable.Cell>
          <MDSTable.Cell>2-4</MDSTable.Cell>
          <MDSTable.Cell>2-5</MDSTable.Cell>
          <MDSTable.Cell>2-6</MDSTable.Cell>
          <MDSTable.Cell>2-7</MDSTable.Cell>
          <MDSTable.Cell>2-8</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>3-1</MDSTable.Cell>
          <MDSTable.Cell>3-2</MDSTable.Cell>
          <MDSTable.Cell>3-3</MDSTable.Cell>
          <MDSTable.Cell>3-4</MDSTable.Cell>
          <MDSTable.Cell>3-5</MDSTable.Cell>
          <MDSTable.Cell>3-6</MDSTable.Cell>
          <MDSTable.Cell>3-7</MDSTable.Cell>
          <MDSTable.Cell>3-8</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const StickyHeader: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'isStickyHeader 설정 시 헤더가 고정됩니다',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head isStickyHeader>
        <MDSTable.Row>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell>1-1</MDSTable.Cell>
          <MDSTable.Cell>1-2</MDSTable.Cell>
          <MDSTable.Cell>1-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>2-1</MDSTable.Cell>
          <MDSTable.Cell>2-2</MDSTable.Cell>
          <MDSTable.Cell>2-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>3-1</MDSTable.Cell>
          <MDSTable.Cell>3-2</MDSTable.Cell>
          <MDSTable.Cell>3-3</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const ViewDetails: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'isViewingDetails 설정 시 배경색이 적용됩니다',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head>
        <MDSTable.Row>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row isSelected>
          <MDSTable.Cell>1-1 isViewingDetails</MDSTable.Cell>
          <MDSTable.Cell>1-2 isViewingDetails</MDSTable.Cell>
          <MDSTable.Cell>1-3 isViewingDetails</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>2-1</MDSTable.Cell>
          <MDSTable.Cell>2-2</MDSTable.Cell>
          <MDSTable.Cell>2-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>3-1</MDSTable.Cell>
          <MDSTable.Cell>3-2</MDSTable.Cell>
          <MDSTable.Cell>3-3</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const ClickableRow: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'row 에 onClick 이벤트가 있다면 해당 row 의 커서가 pointer 로 변경됩니다',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head>
        <MDSTable.Row>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row onClick={() => {}}>
          <MDSTable.Cell>clickable row</MDSTable.Cell>
          <MDSTable.Cell>clickable row</MDSTable.Cell>
          <MDSTable.Cell>clickable row</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row onClick={() => {}}>
          <MDSTable.Cell>clickable row</MDSTable.Cell>
          <MDSTable.Cell>clickable row</MDSTable.Cell>
          <MDSTable.Cell>clickable row</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>unclickable row</MDSTable.Cell>
          <MDSTable.Cell>unclickable row</MDSTable.Cell>
          <MDSTable.Cell>unclickable row</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const ClickableCell: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'cell 에 onClick 이벤트가 있다면 해당 cell 의 커서가 pointer 로 변경됩니다',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head>
        <MDSTable.Row>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell onClick={() => {}}>clickable cell</MDSTable.Cell>
          <MDSTable.Cell>unclickable cell</MDSTable.Cell>
          <MDSTable.Cell>unclickable cell</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>unclickable cell</MDSTable.Cell>
          <MDSTable.Cell onClick={() => {}}>clickable cell</MDSTable.Cell>
          <MDSTable.Cell>unclickable cell</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>unclickable cell</MDSTable.Cell>
          <MDSTable.Cell>unclickable cell</MDSTable.Cell>
          <MDSTable.Cell onClick={() => {}}>clickable cell</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const AlignRightCell: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'cell 에 align 을 전달할 수 있습니다',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head>
        <MDSTable.Row>
          <MDSTable.Cell>default left</MDSTable.Cell>
          <MDSTable.Cell align="center">center</MDSTable.Cell>
          <MDSTable.Cell align="right">right</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell>default left</MDSTable.Cell>
          <MDSTable.Cell align="center">center</MDSTable.Cell>
          <MDSTable.Cell align="right">right</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>default left</MDSTable.Cell>
          <MDSTable.Cell align="center">center</MDSTable.Cell>
          <MDSTable.Cell align="right">right</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>default left</MDSTable.Cell>
          <MDSTable.Cell align="center">center</MDSTable.Cell>
          <MDSTable.Cell align="right">right</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const ValignTopCell: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'cell 에 align 을 전달할 수 있습니다',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head>
        <MDSTable.Row>
          <MDSTable.Cell valign="top">top</MDSTable.Cell>
          <MDSTable.Cell valign="middle">default middle</MDSTable.Cell>
          <MDSTable.Cell valign="bottom">bottom</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell valign="top" align="right" rowSpan={3}>
            top
          </MDSTable.Cell>
          <MDSTable.Cell valign="middle">default middle</MDSTable.Cell>
          <MDSTable.Cell valign="bottom" rowSpan={3}>
            bottom
          </MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell valign="middle">default middle</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell valign="middle">default middle</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const CellColSpan: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'cell 에 colSpan 을 전달할 수 있습니다',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head>
        <MDSTable.Row>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell colSpan={2}>colspan 2</MDSTable.Cell>
          <MDSTable.Cell>1-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell colSpan={3}>colspan 3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>3-1</MDSTable.Cell>
          <MDSTable.Cell colSpan={2}>colspan 2</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const CellRowSpan: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'cell 에 rowSpan 을 전달할 수 있습니다<br/>다만 rowspan 의 영향범위를 Body 로 감싸주세요',
      },
    },
  },
  render: (_) => (
    <MDSTable isStickyLeft>
      <MDSTable.Head>
        <MDSTable.Row>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell rowSpan={5}>rowspan 5</MDSTable.Cell>
          <MDSTable.Cell>1-2</MDSTable.Cell>
          <MDSTable.Cell>1-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>2-2</MDSTable.Cell>
          <MDSTable.Cell>2-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>3-2</MDSTable.Cell>
          <MDSTable.Cell>3-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>4-2</MDSTable.Cell>
          <MDSTable.Cell>4-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>5-2</MDSTable.Cell>
          <MDSTable.Cell>5-3</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell rowSpan={2}>rowspan 2</MDSTable.Cell>
          <MDSTable.Cell>6-2</MDSTable.Cell>
          <MDSTable.Cell>6-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>7-2</MDSTable.Cell>
          <MDSTable.Cell>7-3</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const CellBorderRight: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'cell 에 border right 을 지정할 수 있습니다.',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head>
        <MDSTable.Row>
          <MDSTable.Cell borderRight>head border default</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell borderRight>body border default</MDSTable.Cell>
          <MDSTable.Cell>1-2</MDSTable.Cell>
          <MDSTable.Cell>1-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell borderRight={{ color: 'color/content/critical/default/normal' }}>custom color</MDSTable.Cell>
          <MDSTable.Cell>2-2</MDSTable.Cell>
          <MDSTable.Cell>2-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell borderRight={{ width: 4 }}>custom width</MDSTable.Cell>
          <MDSTable.Cell>3-2</MDSTable.Cell>
          <MDSTable.Cell>3-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell borderRight={{ width: 2, color: 'color/content/primary/default/normal', style: 'dashed' }}>
            custom style
          </MDSTable.Cell>
          <MDSTable.Cell>4-2</MDSTable.Cell>
          <MDSTable.Cell>4-3</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const NestedTable: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: '테이블 내 테이블이 포함될 때, hover 스타일 및 padding 이 초기화되고 상단에 그림자 효과가 추가됩니다.',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head>
        <MDSTable.Row>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
          <MDSTable.Cell>head</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell>1-1</MDSTable.Cell>
          <MDSTable.Cell>1-2</MDSTable.Cell>
          <MDSTable.Cell>1-3</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row isContainer variant="secondary">
          <MDSTable.Cell colSpan={3}>
            <div style={{ padding: '12px' }}>
              <MDSTypography weight="medium">
                row 에 isContainer 설정 시 cell 하위에 복잡한 요소를 넣을 수 있는 디자인이 적용됩니다.
              </MDSTypography>
              <MDSTypography>padding 이 초기화 되고 hover 효과가 사라지며, 내부에 그림자가 추가됩니다.</MDSTypography>
            </div>

            <MDSTable>
              <MDSTable.Head>
                <MDSTable.Row variant="secondary">
                  <MDSTable.Cell>head</MDSTable.Cell>
                  <MDSTable.Cell>head</MDSTable.Cell>
                  <MDSTable.Cell>head</MDSTable.Cell>
                </MDSTable.Row>
              </MDSTable.Head>
              <MDSTable.Body>
                <MDSTable.Row variant="secondary">
                  <MDSTable.Cell>1-1</MDSTable.Cell>
                  <MDSTable.Cell>1-2</MDSTable.Cell>
                  <MDSTable.Cell>1-3</MDSTable.Cell>
                </MDSTable.Row>
                <MDSTable.Row variant="secondary">
                  <MDSTable.Cell>2-1</MDSTable.Cell>
                  <MDSTable.Cell>2-2</MDSTable.Cell>
                  <MDSTable.Cell>2-3</MDSTable.Cell>
                </MDSTable.Row>
              </MDSTable.Body>
            </MDSTable>

            <div style={{ textAlign: 'center', padding: '12px' }}>
              <MDSTypography weight="medium">View more</MDSTypography>
            </div>
          </MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>3-1</MDSTable.Cell>
          <MDSTable.Cell>3-2</MDSTable.Cell>
          <MDSTable.Cell>3-3</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};

export const CellWidth: StoryObj<typeof MDSTable> = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        story: 'cell 에 minWidth 또는 maxWidth 를 전달할 수 있습니다.',
      },
    },
  },
  render: (_) => (
    <MDSTable>
      <MDSTable.Head>
        <MDSTable.Row>
          <MDSTable.Cell minWidth="100px" maxWidth="200px">
            min 100 / max 200
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="100px" maxWidth="200px">
            min 100 / max 200
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="200px" maxWidth="200px">
            min 200 / max 200
          </MDSTable.Cell>
          <MDSTable.Cell minWidth="50px">min 50</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Head>
      <MDSTable.Body>
        <MDSTable.Row>
          <MDSTable.Cell>1-1</MDSTable.Cell>
          <MDSTable.Cell>1-2</MDSTable.Cell>
          <MDSTable.Cell>1-3</MDSTable.Cell>
          <MDSTable.Cell>1-4</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>2-1</MDSTable.Cell>
          <MDSTable.Cell>2-2</MDSTable.Cell>
          <MDSTable.Cell>2-3</MDSTable.Cell>
          <MDSTable.Cell>2-4</MDSTable.Cell>
        </MDSTable.Row>
        <MDSTable.Row>
          <MDSTable.Cell>3-1</MDSTable.Cell>
          <MDSTable.Cell>3-2</MDSTable.Cell>
          <MDSTable.Cell>3-3</MDSTable.Cell>
          <MDSTable.Cell>3-4</MDSTable.Cell>
        </MDSTable.Row>
      </MDSTable.Body>
    </MDSTable>
  ),
};
