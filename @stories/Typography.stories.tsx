import { MDSTypography } from '../components/atoms/Typography';
import { MDSTHEME_COLORS } from './@helper';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSTypography> = {
  component: MDSTypography,
  title: '2. Components/atoms/Typography',
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
  args: {
    color: 'color/content/neutral/default/normal',
    weight: 'regular',
    lineClamp: 0,
    wordBreak: 'normal',
    variant: 'T16',
  },
  argTypes: {
    color: {
      control: 'select',
      options: MDSTHEME_COLORS,
    },
    weight: {
      control: 'inline-radio',
      options: ['bold', 'medium', 'regular', 'light'],
    },
    wordBreak: {
      control: 'inline-radio',
      options: ['normal', 'keep-all', 'break-all'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDSTypography>;

export const Primary: Story = {
  args: {
    lineClamp: 0,
    children: `아크메드라비는 2017년부터 가장 핫한 트렌드를 시장에 선보이고 있는 젊은 스트리트 패션 브랜드입니다. 아이코닉한 '베이비페이스 프린트'로 폭발적인 인기와 인지도를 얻으며 아시아 최고의 스트리트 스타일 브랜드로 급부상했습니다. 현재 중국, 호주, 베트남, 말레이시아 등에서 30개 이상의 매장을 운영하고 있으며, 지속적으로 아시아 이외의 지역에도 추가 매장을 오픈할 계획입니다. 아크메드라비는 트렌디한 프리미엄웨어 브랜드로서의 아이덴티티를 유지하고 있습니다. 2021년에는 1,000만 달러의 매출을 기록하며 해외에서 지속적으로 매출을 확대하고 있습니다. 

지난 10년간 패션 업계는 이커머스 비즈니스를 성장의 핵심 동력으로 삼고 있지만, 온라인 사업 규모가 커질수록 많은 리스크가 수반됩니다. 디지털 시대의 브랜드 보호에 있어 가장 큰 위험 요소는 온라인 위조상품 판매자들의 수법이 빠르게 진화하고 있다는 점입니다. 아크메드라비는 온라인 비즈니스를 효과적으로 보호하기 위해서는 이러한 진화하는 방식에 한발 앞서 대응하고, 그에 따라 브랜드 보호 대책을 강화해야 한다는 사실을 알고 있습니다.`,
  },
};

export const LineClamp: Story = {
  args: {
    lineClamp: 1,
  },
  parameters: {
    layout: 'centered',
    controls: { include: ['lineClamp'] },
  },
  render: ({ lineClamp }) => {
    return (
      <div>
        <MDSTypography variant="T24" lineClamp={lineClamp}>
          아이코닉한 '베이비페이스 프린트'로 폭발적인 인기와 인지도를 얻으며 아시아 최고의 스트리트 스타일 브랜드로
          급부상했습니다. 현재 중국, 호주, 베트남, 말레이시아 등에서 30개 이상의 매장을 운영하고 있으며, 지속적으로
          아시아 이외의 지역에도 추가 매장을 오픈할 계획입니다.
        </MDSTypography>
        <MDSTypography color="color/content/primary/default/normal" weight="bold" lineClamp={lineClamp}>
          아크메드라비는 2017년부터 가장 핫한 트렌드를 시장에 선보이고 있는 젊은 스트리트 패션 브랜드입니다.
        </MDSTypography>
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
        <MDSTypography variant="T16" wordBreak={wordBreak}>
          아이코닉한 '베이비페이스 프린트'로 폭발적인 인기와 인지도를 얻으며 아시아 최고의 스트리트 스타일 브랜드로
          급부상했습니다. 현재 중국, 호주, 베트남, 말레이시아 등에서 30개 이상의 매장을 운영하고 있으며, 지속적으로
          아시아 이외의 지역에도 추가 매장을 오픈할 계획입니다. Honorificabilitudinitatibus
          califragilisticexpialidocious
          Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu
          グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉
        </MDSTypography>
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
        <MDSTypography variant="T16" textDecoration={textDecoration}>
          califragilisticexpialidocious
          Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu
          グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉
        </MDSTypography>
      </div>
    );
  },
};

export const CustomizeTagName: Story = {
  render: () => {
    return (
      <div>
        <MDSTypography>
          `variant` prop에 따라 태그가 자동으로 결정됩니다. T12 ~ T18까지는 p 요소로 렌더링됩니다.
        </MDSTypography>
        <MDSTypography variant="T20">`variant` prop이 T20 이면 h2 요소로 렌더링됩니다.</MDSTypography>
        <MDSTypography variant="T24">`variant` prop이 T24 이면 h1 요소로 렌더링됩니다.</MDSTypography>
        <MDSTypography>
          `variant` prop이 T16이어도 `as` prop에 `div`를 할당하면 `div` 요소로 렌더링됩니다.
        </MDSTypography>
        <MDSTypography as="a" href="https://marqvision.com">
          `as` prop에 a 태그를 넣으면 a 요소로 렌더링되며 a 요소의 모든 속성, 예를 들어 `href` 속성을 사용할 수
          있습니다. 이 요소를 클릭하면 marqvision.com으로 이동합니다.
        </MDSTypography>
      </div>
    );
  },
};

export const Showcase: Story = {
  parameters: {
    layout: 'centered',
    controls: { include: ['color'] },
  },
  render: ({ color }) => {
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <div>
            <MDSTypography variant="T24" weight="bold" color={color}>
              T24 Bold
            </MDSTypography>
            <MDSTypography variant="T24" weight="medium" color={color}>
              T24 medium
            </MDSTypography>
            <MDSTypography variant="T24" weight="regular" color={color}>
              T24 regular
            </MDSTypography>
            <MDSTypography variant="T24" weight="light" color={color}>
              T24 light
            </MDSTypography>
          </div>
          <div>
            <MDSTypography variant="T20" weight="bold" color={color}>
              T20 Bold
            </MDSTypography>
            <MDSTypography variant="T20" weight="medium" color={color}>
              T20 medium
            </MDSTypography>
            <MDSTypography variant="T20" weight="regular" color={color}>
              T20 regular
            </MDSTypography>
            <MDSTypography variant="T20" weight="light" color={color}>
              T20 light
            </MDSTypography>
          </div>
          <div>
            <MDSTypography variant="T18" weight="bold" color={color}>
              T18 Bold
            </MDSTypography>
            <MDSTypography variant="T18" weight="medium" color={color}>
              T18 medium
            </MDSTypography>
            <MDSTypography variant="T18" weight="regular" color={color}>
              T18 regular
            </MDSTypography>
            <MDSTypography variant="T18" weight="light" color={color}>
              T18 light
            </MDSTypography>
          </div>
          <div>
            <MDSTypography variant="T16" weight="bold" color={color}>
              T16 Bold
            </MDSTypography>
            <MDSTypography variant="T16" weight="medium" color={color}>
              T16 medium
            </MDSTypography>
            <MDSTypography variant="T16" weight="regular" color={color}>
              T16 regular
            </MDSTypography>
            <MDSTypography variant="T16" weight="light" color={color}>
              T16 light
            </MDSTypography>
          </div>
          <div>
            <MDSTypography variant="T14" weight="bold" color={color}>
              T14 Bold
            </MDSTypography>
            <MDSTypography variant="T14" weight="medium" color={color}>
              T14 medium
            </MDSTypography>
            <MDSTypography variant="T14" weight="regular" color={color}>
              T14 regular
            </MDSTypography>
            <MDSTypography variant="T14" weight="light" color={color}>
              T14 light
            </MDSTypography>
          </div>
          <div>
            <MDSTypography variant="T13" weight="bold" color={color}>
              T13 Bold
            </MDSTypography>
            <MDSTypography variant="T13" weight="medium" color={color}>
              T13 medium
            </MDSTypography>
            <MDSTypography variant="T13" weight="regular" color={color}>
              T13 regular
            </MDSTypography>
            <MDSTypography variant="T13" weight="light" color={color}>
              T13 light
            </MDSTypography>
          </div>
          <div>
            <MDSTypography variant="T12" weight="bold" color={color}>
              T12 Bold
            </MDSTypography>
            <MDSTypography variant="T12" weight="medium" color={color}>
              T12 medium
            </MDSTypography>
            <MDSTypography variant="T12" weight="regular" color={color}>
              T12 regular
            </MDSTypography>
            <MDSTypography variant="T12" weight="light" color={color}>
              T12 light
            </MDSTypography>
          </div>
        </div>
        <div>
          <div>
            <MDSTypography variant="T24" weight="bold" color={color}>
              T24 볼드
            </MDSTypography>
            <MDSTypography variant="T24" weight="medium" color={color}>
              T24 미디엄
            </MDSTypography>
            <MDSTypography variant="T24" weight="regular" color={color}>
              T24 레귤러
            </MDSTypography>
            <MDSTypography variant="T24" weight="light" color={color}>
              T24 라이트
            </MDSTypography>
          </div>
          <div>
            <MDSTypography variant="T20" weight="bold" color={color}>
              T20 볼드
            </MDSTypography>
            <MDSTypography variant="T20" weight="medium" color={color}>
              T20 미디엄
            </MDSTypography>
            <MDSTypography variant="T20" weight="regular" color={color}>
              T20 레귤러
            </MDSTypography>
            <MDSTypography variant="T20" weight="light" color={color}>
              T20 라이트
            </MDSTypography>
          </div>

          <div>
            <MDSTypography variant="T18" weight="bold" color={color}>
              T18 볼드
            </MDSTypography>
            <MDSTypography variant="T18" weight="medium" color={color}>
              T18 미디엄
            </MDSTypography>
            <MDSTypography variant="T18" weight="regular" color={color}>
              T18 레귤러
            </MDSTypography>
            <MDSTypography variant="T18" weight="light" color={color}>
              T18 라이트
            </MDSTypography>
          </div>
          <div>
            <MDSTypography variant="T16" weight="bold" color={color}>
              T16 볼드
            </MDSTypography>
            <MDSTypography variant="T16" weight="medium" color={color}>
              T16 미디엄
            </MDSTypography>
            <MDSTypography variant="T16" weight="regular" color={color}>
              T16 레귤러
            </MDSTypography>
            <MDSTypography variant="T16" weight="light" color={color}>
              T16 라이트
            </MDSTypography>
          </div>

          <div>
            <MDSTypography variant="T14" weight="bold" color={color}>
              T14 볼드
            </MDSTypography>
            <MDSTypography variant="T14" weight="medium" color={color}>
              T14 미디엄
            </MDSTypography>
            <MDSTypography variant="T14" weight="regular" color={color}>
              T14 레귤러
            </MDSTypography>
            <MDSTypography variant="T14" weight="light" color={color}>
              T14 라이트
            </MDSTypography>
          </div>

          <div>
            <MDSTypography variant="T13" weight="bold" color={color}>
              T13 볼드
            </MDSTypography>
            <MDSTypography variant="T13" weight="medium" color={color}>
              T13 미디엄
            </MDSTypography>
            <MDSTypography variant="T13" weight="regular" color={color}>
              T13 레귤러
            </MDSTypography>
            <MDSTypography variant="T13" weight="light" color={color}>
              T13 라이트
            </MDSTypography>
          </div>
          <div>
            <MDSTypography variant="T12" weight="bold" color={color}>
              T12 볼드
            </MDSTypography>
            <MDSTypography variant="T12" weight="medium" color={color}>
              T12 미디엄
            </MDSTypography>
            <MDSTypography variant="T12" weight="regular" color={color}>
              T12 레귤러
            </MDSTypography>
            <MDSTypography variant="T12" weight="light" color={color}>
              T12 라이트
            </MDSTypography>
          </div>
        </div>
      </div>
    );
  },
};
