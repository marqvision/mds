// @ts-nocheck
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { MDSTypography2 } from '../components/atoms/Typography2';
import { MDSCheckbox } from '../components';
import { MDSTHEME_COLORS } from './@helper';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSTypography2> = {
  component: MDSTypography2,
  title: '2. Components/Typography2',
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
  args: {
    color: 'color/content/neutral/default/normal',
    weight: 'regular',
    lineClamp: 0,
    wordBreak: 'normal',
    variant: 'body',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      description: `타이포그래피의 종류.
      
      - title: 제목
      - body: 본문`,
      options: ['title', 'body'],
    },
    size: {
      control: 'inline-radio',
      description: `타이포그래피의 크기. variant에 따라 사용 가능한 값이 다릅니다.

      - title: 2xl, xl, l, m, s
      - body: l, m, s, xs`,
      options: ['2xl', 'xl', 'l', 'm', 's', 'xs'],
    },
    color: {
      control: 'select',
      options: MDSTHEME_COLORS,
    },
    weight: {
      control: 'inline-radio',
      description: `타이포그래피의 굵기. variant와 size에 따라 사용 가능한 값이 다릅니다.
  - title (2xl / xl / l): semibold, medium
  - title (m / s): semibold
  - body (모든 size): medium, regular`,
      options: ['semibold', 'medium', 'regular'],
    },
    wordBreak: {
      control: 'inline-radio',
      options: ['normal', 'keep-all', 'break-all'],
    },
    char: {
      control: 'inline-radio',
      description: `타이포그래피의 문자 종류.

      - letter: 문자
      - number: 숫자`,
      options: ['letter', 'number'],
      defaultValue: 'letter',
    },
    lineClamp: {
      control: 'number',
      description: `타이포그래피의 말줄일 라인 수. 기본값은 말줄임 없음(=0)입니다.`,
      defaultValue: 0,
    },
    lang: {
      control: 'inline-radio',
      description: `타이포그래피의 언어.

      - en: 영어
      - ko: 한국어`,
      options: ['en', 'ko'],
      defaultValue: 'en',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDSTypography2>;

export const Primary: Story = {
  render: (props) => {
    return (
      <MDSTypography2 {...props}>
        아크메드라비는 2017년부터 가장 핫한 트렌드를 시장에 선보이고 있는 젊은 스트리트 패션 브랜드입니다. 아이코닉한
        '베이비페이스 프린트'로 폭발적인 인기와 인지도를 얻으며 아시아 최고의 스트리트 스타일 브랜드로 급부상했습니다.
        현재 중국, 호주, 베트남, 말레이시아 등에서 30개 이상의 매장을 운영하고 있으며, 지속적으로 아시아 이외의 지역에도
        추가 매장을 오픈할 계획입니다. 아크메드라비는 트렌디한 프리미엄웨어 브랜드로서의 아이덴티티를 유지하고 있습니다.
        2021년에는 1,000만 달러의 매출을 기록하며 해외에서 지속적으로 매출을 확대하고 있습니다. 지난 10년간 패션 업계는
        이커머스 비즈니스를 성장의 핵심 동력으로 삼고 있지만, 온라인 사업 규모가 커질수록 많은 리스크가 수반됩니다.
        디지털 시대의 브랜드 보호에 있어 가장 큰 위험 요소는 온라인 위조상품 판매자들의 수법이 빠르게 진화하고 있다는
        점입니다. 아크메드라비는 온라인 비즈니스를 효과적으로 보호하기 위해서는 이러한 진화하는 방식에 한발 앞서
        대응하고, 그에 따라 브랜드 보호 대책을 강화해야 한다는 사실을 알고 있습니다.`,
      </MDSTypography2>
    );
  },
};

export const LineClamp: Story = {
  args: {
    // lineClamp: 1,
  },
  parameters: {
    layout: 'centered',
    controls: { include: ['lineClamp'] },
  },
  render: ({ lineClamp }) => {
    return (
      <div>
        <MDSTypography2 variant="title" size="2xl" lineClamp={lineClamp}>
          아이코닉한 '베이비페이스 프린트'로 폭발적인 인기와 인지도를 얻으며 아시아 최고의 스트리트 스타일 브랜드로
          급부상했습니다. 현재 중국, 호주, 베트남, 말레이시아 등에서 30개 이상의 매장을 운영하고 있으며, 지속적으로
          아시아 이외의 지역에도 추가 매장을 오픈할 계획입니다.
        </MDSTypography2>
        <MDSTypography2 color="color/content/primary/default/normal" weight="semibold" lineClamp={lineClamp}>
          아크메드라비는 2017년부터 가장 핫한 트렌드를 시장에 선보이고 있는 젊은 스트리트 패션 브랜드입니다.
        </MDSTypography2>
      </div>
    );
  },
};

export const WorkBreak: Story = {
  args: {
    wordBreak: 'normal',
  },
  parameters: {
    layout: 'centered',
    controls: { include: ['wordBreak'] },
  },
  render: ({ wordBreak }) => {
    return (
      <div style={{ width: 250, height: 400, border: '1px solid black' }}>
        <MDSTypography2 variant="body" wordBreak={wordBreak}>
          아이코닉한 '베이비페이스 프린트'로 폭발적인 인기와 인지도를 얻으며 아시아 최고의 스트리트 스타일 브랜드로
          급부상했습니다. 현재 중국, 호주, 베트남, 말레이시아 등에서 30개 이상의 매장을 운영하고 있으며, 지속적으로
          아시아 이외의 지역에도 추가 매장을 오픈할 계획입니다. Honorificabilitudinitatibus
          califragilisticexpialidocious
          Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu
          グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉
        </MDSTypography2>
      </div>
    );
  },
};

export const TextDecoration: Story = {
  args: {
    textDecoration: 'underline',
  },
  parameters: {
    layout: 'centered',
    controls: { include: ['textDecoration'] },
  },
  render: ({ textDecoration }) => {
    return (
      <div style={{ width: 250, height: 400, border: '1px solid black' }}>
        <MDSTypography2 variant="body" textDecoration={textDecoration}>
          califragilisticexpialidocious
          Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu
          グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉
        </MDSTypography2>
      </div>
    );
  },
};

export const CustomizeTagName: Story = {
  render: () => {
    return (
      <div>
        <MDSTypography2>`variant`와 `size` prop에 따라 태그가 자동으로 결정됩니다.</MDSTypography2>
        <MDSTypography2 variant="title" size="2xl">
          `variant: title`, `size: 2xl` 이면 h1 요소로 렌더링됩니다.
        </MDSTypography2>
        <MDSTypography2 variant="title" size="xl">
          `variant: title`, `size: xl` 이면 h2 요소로 렌더링됩니다.
        </MDSTypography2>
        <MDSTypography2>나머지는 모두 `p` 요소로 렌더링됩니다.</MDSTypography2>
        <MDSTypography2 as="a" href="https://marqvision.com">
          `as` prop에 a 태그를 넣으면 a 요소로 렌더링되며 a 요소의 모든 속성, 예를 들어 `href` 속성을 사용할 수
          있습니다. 이 요소를 클릭하면 marqvision.com으로 이동합니다.
        </MDSTypography2>
      </div>
    );
  },
};
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;
const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  margin-top: 24px;
  width: 100%;
  th {
    text-align: left;
    background: #f0f0f0;
    border-bottom: 1px solid #e0e0e0;
  }
  tr + tr > td {
    padding-top: 12px;
    border-top: 1px solid #e0e0e0;
  }
`;
const ToggleLanguageBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: white;
  border: 2px solid blue;

  display: flex;
  align-items: center;
  padding: 16px 4px;
`;
export const Showcase: Story = {
  parameters: {
    layout: 'centered',
    controls: { include: ['color'] },
  },
  render: ({ color }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isKor, setIsKor] = useState(false);
    const handleLangChange = (checked: boolean) => {
      setIsKor(checked);
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (isKor) {
        document.documentElement.setAttribute('lang', 'ko');
      } else {
        document.documentElement.setAttribute('lang', 'en');
      }
    }, [isKor]);
    return (
      <div>
        <ToggleLanguageBox>
          <MDSCheckbox value={isKor} onChange={handleLangChange} /> 현재 언어 {isKor ? 'ko' : 'en'}
        </ToggleLanguageBox>
        <Container>
          <div>
            <MDSTypography2 variant="title" size="2xl" weight="medium" color={color} __useNewFont>
              Title (English) - {isKor ? 'Pretendard' : 'Inter'}
            </MDSTypography2>
            <Table cellPadding={12}>
              <thead>
                <tr>
                  <th align="left">Example</th>

                  <th>Size</th>
                </tr>
              </thead>
              <hr />
              <tbody>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="2xl" weight="semibold" color={color} __useNewFont>
                        MARQVISION 24 Semibold 1234567890
                      </MDSTypography2>
                      <MDSTypography2 variant="title" size="2xl" weight="medium" color={color} __useNewFont>
                        MARQVISION 24 Medium 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>2xl (=24px)</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="xl" weight="semibold" color={color} __useNewFont>
                        MARQVISION 20 Semibold 1234567890
                      </MDSTypography2>
                      <MDSTypography2 variant="title" size="xl" weight="medium" color={color} __useNewFont>
                        MARQVISION 20 Medium 1234567890
                      </MDSTypography2>
                    </div>
                  </td>

                  <td>xl (=20px)</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="l" weight="semibold" color={color} __useNewFont>
                        MARQVISION 18 Semibold 1234567890
                      </MDSTypography2>
                      <MDSTypography2 variant="title" size="l" weight="medium" color={color} __useNewFont>
                        MARQVISION 18 Medium 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>l (=18px)</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="m" weight="semibold" color={color} __useNewFont>
                        MARQVISION 16 Semibold 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>m (=16px)</td>
                </tr>

                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="s" weight="semibold" color={color} __useNewFont>
                        MARQVISION 14 Semibold 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>s (=14px)</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div>
            <div>
              <MDSTypography2 variant="title" size="2xl" weight="medium" color={color}>
                Body (English) - {isKor ? 'Pretendard' : 'Inter'}
              </MDSTypography2>
              <Table cellPadding={12}>
                <thead>
                  <tr>
                    <th align="left">Example</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <hr />
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2 variant="body" size="l" weight="medium" color={color} __useNewFont>
                          MARQVISION 16 Medium 1234567890
                        </MDSTypography2>
                        <MDSTypography2 variant="body" size="l" weight="regular" color={color} __useNewFont>
                          MARQVISION 16 Regular 1234567890
                        </MDSTypography2>
                      </div>
                    </td>

                    <td>l (=16px)</td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2 variant="body" size="m" weight="medium" color={color} __useNewFont>
                          MARQVISION 14 Medium 1234567890
                        </MDSTypography2>
                        <MDSTypography2 variant="body" size="m" weight="regular" color={color} __useNewFont>
                          MARQVISION 14 Regular 1234567890
                        </MDSTypography2>
                      </div>
                    </td>
                    <td>xl (=20px)</td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2 variant="body" size="s" weight="medium" color={color} __useNewFont>
                          MARQVISION 13 Medium 1234567890
                        </MDSTypography2>
                        <MDSTypography2 variant="body" size="s" weight="regular" color={color} __useNewFont>
                          MARQVISION 13 Regular 1234567890
                        </MDSTypography2>
                      </div>
                    </td>

                    <td>s (=13px)</td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2 variant="body" size="xs" weight="medium" color={color} __useNewFont>
                          MARQVISION 12 Medium 1234567890
                        </MDSTypography2>
                        <MDSTypography2 variant="body" size="xs" weight="regular" color={color} __useNewFont>
                          MARQVISION 12 Regular 1234567890
                        </MDSTypography2>
                      </div>
                    </td>

                    <td>xs (=12px)</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>

          <div>
            <MDSTypography2 variant="title" size="2xl" weight="medium" color={color}>
              Title (Korean) - Pretendard
            </MDSTypography2>
            <Table cellPadding={12}>
              <thead>
                <tr>
                  <th align="left">Example</th>

                  <th>Size</th>
                </tr>
              </thead>
              <hr />
              <tbody>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="2xl" weight="semibold" color={color}>
                        마크비전 24 세미볼드 1234567890
                      </MDSTypography2>
                      <MDSTypography2 variant="title" size="2xl" weight="medium" color={color}>
                        마크비전 24 미디움 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>2xl (=24px)</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="xl" weight="semibold" color={color}>
                        마크비전 20 세미볼드 1234567890
                      </MDSTypography2>
                      <MDSTypography2 variant="title" size="xl" weight="medium" color={color}>
                        마크비전 20 미디움 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>xl (=20px)</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="l" weight="semibold" color={color}>
                        마크비전 18 세미볼드 1234567890
                      </MDSTypography2>
                      <MDSTypography2 variant="title" size="l" weight="medium" color={color}>
                        마크비전 18 미디움 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>l (=18px)</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="m" weight="semibold" color={color}>
                        마크비전 16 세미볼드 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>m (=16px)</td>
                </tr>

                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="s" weight="semibold" color={color}>
                        마크비전 14 세미볼드 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>s (=14px)</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div>
            <div>
              <MDSTypography2 variant="title" size="2xl" weight="medium" color={color}>
                Body (Korean) - Pretendard
              </MDSTypography2>
              <Table cellPadding={12}>
                <thead>
                  <tr>
                    <th align="left">Example</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <hr />
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2 variant="body" size="l" weight="medium" color={color}>
                          마크비전 16 미디움 1234567890
                        </MDSTypography2>
                        <MDSTypography2 variant="body" size="l" weight="regular" color={color}>
                          마크비전 16 레귤러 1234567890
                        </MDSTypography2>
                      </div>
                    </td>

                    <td>l (=16px)</td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2 variant="body" size="m" weight="medium" color={color}>
                          마크비전 14 미디움 1234567890
                        </MDSTypography2>
                        <MDSTypography2 variant="body" size="m" weight="regular" color={color}>
                          마크비전 14 레귤러 1234567890
                        </MDSTypography2>
                      </div>
                    </td>
                    <td>xl (=20px)</td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2 variant="body" size="s" weight="medium" color={color}>
                          마크비전 13 미디움 1234567890
                        </MDSTypography2>
                        <MDSTypography2 variant="body" size="s" weight="regular" color={color}>
                          마크비전 13 레귤러 1234567890
                        </MDSTypography2>
                      </div>
                    </td>

                    <td>s (=13px)</td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2 variant="body" size="xs" weight="medium" color={color}>
                          마크비전 12 미디움 1234567890
                        </MDSTypography2>
                        <MDSTypography2 variant="body" size="xs" weight="regular" color={color}>
                          마크비전 12 레귤러 1234567890
                        </MDSTypography2>
                      </div>
                    </td>

                    <td>xs (=12px)</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>

          <div>
            <MDSTypography2 variant="title" size="2xl" weight="medium" color={color}>
              Title (English-Number) - {isKor ? 'Pretendard' : 'Inter'}
            </MDSTypography2>
            <Table cellPadding={12}>
              <thead>
                <tr>
                  <th align="left">Example</th>
                  <th>Size</th>
                </tr>
              </thead>
              <hr />
              <tbody>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2
                        variant="title"
                        size="xl"
                        weight="semibold"
                        char="number"
                        color={color}
                        __useNewFont
                      >
                        MARQVISION 20 Semibold 1234567890
                      </MDSTypography2>
                      <MDSTypography2
                        variant="title"
                        size="xl"
                        weight="medium"
                        char="number"
                        color={color}
                        __useNewFont
                      >
                        MARQVISION 20 Medium 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>xl (=20px)</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2
                        variant="title"
                        size="l"
                        weight="semibold"
                        char="number"
                        color={color}
                        __useNewFont
                      >
                        MARQVISION 18 Semibold 1234567890
                      </MDSTypography2>
                      <MDSTypography2 variant="title" size="l" weight="medium" char="number" color={color} __useNewFont>
                        MARQVISION 18 Medium 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>l (=18px)</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2
                        variant="title"
                        size="m"
                        weight="semibold"
                        char="number"
                        color={color}
                        __useNewFont
                      >
                        MARQVISION 16 Semibold 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>m (=16px)</td>
                </tr>

                <tr>
                  <td>
                    <div>
                      <MDSTypography2
                        variant="title"
                        size="s"
                        weight="semibold"
                        char="number"
                        color={color}
                        __useNewFont
                      >
                        MARQVISION 14 Semibold 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>s (=14px)</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div>
            <div>
              <MDSTypography2 variant="title" size="2xl" weight="medium" color={color}>
                Body (English-Number) - {isKor ? 'Pretendard' : 'Inter'}
              </MDSTypography2>
              <Table cellPadding={12}>
                <thead>
                  <tr>
                    <th align="left">Example</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <hr />
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2
                          variant="body"
                          size="l"
                          weight="medium"
                          char="number"
                          color={color}
                          __useNewFont
                        >
                          MARQVISION 16 Medium 1234567890
                        </MDSTypography2>
                        <MDSTypography2
                          variant="body"
                          size="l"
                          weight="regular"
                          char="number"
                          color={color}
                          __useNewFont
                        >
                          MARQVISION 16 Regular 1234567890
                        </MDSTypography2>
                      </div>
                    </td>

                    <td>l (=16px)</td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2
                          variant="body"
                          size="m"
                          weight="medium"
                          char="number"
                          color={color}
                          __useNewFont
                        >
                          MARQVISION 14 Medium 1234567890
                        </MDSTypography2>
                        <MDSTypography2
                          variant="body"
                          size="m"
                          weight="regular"
                          char="number"
                          color={color}
                          __useNewFont
                        >
                          MARQVISION 14 Regular 1234567890
                        </MDSTypography2>
                      </div>
                    </td>
                    <td>xl (=20px)</td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2
                          variant="body"
                          size="s"
                          weight="medium"
                          char="number"
                          color={color}
                          __useNewFont
                        >
                          MARQVISION 13 Medium 1234567890
                        </MDSTypography2>
                        <MDSTypography2
                          variant="body"
                          size="s"
                          weight="regular"
                          char="number"
                          color={color}
                          __useNewFont
                        >
                          MARQVISION 13 Regular 1234567890
                        </MDSTypography2>
                      </div>
                    </td>

                    <td>s (=13px)</td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2
                          variant="body"
                          size="xs"
                          weight="medium"
                          char="number"
                          color={color}
                          __useNewFont
                        >
                          MARQVISION 12 Medium 1234567890
                        </MDSTypography2>
                        <MDSTypography2
                          variant="body"
                          size="xs"
                          weight="regular"
                          char="number"
                          color={color}
                          __useNewFont
                        >
                          MARQVISION 12 Regular 1234567890
                        </MDSTypography2>
                      </div>
                    </td>

                    <td>xs (=12px)</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>

          <div>
            <MDSTypography2 variant="title" size="2xl" weight="medium" color={color}>
              Title (Korean-Number) - Pretendard
            </MDSTypography2>
            <Table cellPadding={12}>
              <thead>
                <tr>
                  <th align="left">Example</th>

                  <th>Size</th>
                </tr>
              </thead>
              <hr />
              <tbody>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="xl" weight="semibold" char="number" color={color}>
                        마크비전 20 세미볼드 1234567890
                      </MDSTypography2>
                      <MDSTypography2 variant="title" size="xl" weight="medium" char="number" color={color}>
                        마크비전 20 미디움 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>xl (=20px)</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="l" weight="semibold" char="number" color={color}>
                        마크비전 18 세미볼드 1234567890
                      </MDSTypography2>
                      <MDSTypography2 variant="title" size="l" weight="medium" char="number" color={color}>
                        마크비전 18 미디움 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>l (=18px)</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="m" weight="semibold" char="number" color={color}>
                        마크비전 16 세미볼드 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>m (=16px)</td>
                </tr>

                <tr>
                  <td>
                    <div>
                      <MDSTypography2 variant="title" size="s" weight="semibold" char="number" color={color}>
                        마크비전 14 세미볼드 1234567890
                      </MDSTypography2>
                    </div>
                  </td>
                  <td>s (=14px)</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div>
            <div>
              <MDSTypography2 variant="title" size="2xl" weight="medium" color={color}>
                Body (Korean-Number) - Pretendard
              </MDSTypography2>
              <Table cellPadding={12}>
                <thead>
                  <tr>
                    <th align="left">Example</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <hr />
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2 variant="body" size="l" weight="medium" char="number" color={color}>
                          마크비전 16 미디움 1234567890
                        </MDSTypography2>
                        <MDSTypography2 variant="body" size="l" weight="regular" char="number" color={color}>
                          마크비전 16 레귤러 1234567890
                        </MDSTypography2>
                      </div>
                    </td>

                    <td>l (=16px)</td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2 variant="body" size="m" weight="medium" char="number" color={color}>
                          마크비전 14 미디움 1234567890
                        </MDSTypography2>
                        <MDSTypography2 variant="body" size="m" weight="regular" char="number" color={color}>
                          마크비전 14 레귤러 1234567890
                        </MDSTypography2>
                      </div>
                    </td>
                    <td>xl (=20px)</td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2 variant="body" size="s" weight="medium" char="number" color={color}>
                          마크비전 13 미디움 1234567890
                        </MDSTypography2>
                        <MDSTypography2 variant="body" size="s" weight="regular" char="number" color={color}>
                          마크비전 13 레귤러 1234567890
                        </MDSTypography2>
                      </div>
                    </td>

                    <td>s (=13px)</td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <MDSTypography2 variant="body" size="xs" weight="medium" char="number" color={color}>
                          마크비전 12 미디움 1234567890
                        </MDSTypography2>
                        <MDSTypography2 variant="body" size="xs" weight="regular" char="number" color={color}>
                          마크비전 12 레귤러 1234567890
                        </MDSTypography2>
                      </div>
                    </td>

                    <td>xs (=12px)</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
      </div>
    );
  },
};
