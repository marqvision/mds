import { MDSTypogrpahy } from '../components/Typography';
import { MDSTHEME_COLORS } from './@helper';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSTypogrpahy> = {
  component: MDSTypogrpahy,
  title: '2. Components/Typography',
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: MDSTHEME_COLORS,
    },
    weight: {
      control: 'inline-radio',
      options: ['bold', 'medium', 'regular', 'light'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof MDSTypogrpahy>;


export const LineClamp = () => {
  return (
    <div>
      <MDSTypogrpahy variant="T24" lineClamp={1}>
        아이코닉한 '베이비페이스 프린트'로 폭발적인 인기와 인지도를 얻으며 아시아 최고의 스트리트 스타일 브랜드로
        급부상했습니다. 현재 중국, 호주, 베트남, 말레이시아 등에서 30개 이상의 매장을 운영하고 있으며, 지속적으로 아시아
        이외의 지역에도 추가 매장을 오픈할 계획입니다.
      </MDSTypogrpahy>
      <MDSTypogrpahy color='content.primary.default' weight='bold' >
        아크메드라비는 2017년부터 가장 핫한 트렌드를 시장에 선보이고 있는 젊은 스트리트 패션 브랜드입니다.
      </MDSTypogrpahy>
    </div>
  );
};

export const Showcase = () => (
  <div style={{ display: 'flex' }}>
    <div>
      <div>
        <MDSTypogrpahy variant="T24" weight="bold">
          T24 Bold
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T24" weight="medium">
          T24 medium
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T24" weight="regular">
          T24 regular
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T24" weight="light">
          T24 light
        </MDSTypogrpahy>
      </div>
      <div>
        <MDSTypogrpahy variant="T20" weight="bold">
          T20 Bold
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T20" weight="medium">
          T20 medium
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T20" weight="regular">
          T20 regular
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T20" weight="light">
          T20 light
        </MDSTypogrpahy>
      </div>
      <div>
        <MDSTypogrpahy variant="T18" weight="bold">
          T18 Bold
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T18" weight="medium">
          T18 medium
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T18" weight="regular">
          T18 regular
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T18" weight="light">
          T18 light
        </MDSTypogrpahy>
      </div>
      <div>
        <MDSTypogrpahy variant="T16" weight="bold">
          T16 Bold
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T16" weight="medium">
          T16 medium
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T16" weight="regular">
          T16 regular
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T16" weight="light">
          T16 light
        </MDSTypogrpahy>
      </div>
      <div>
        <MDSTypogrpahy variant="T14" weight="bold">
          T14 Bold
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T14" weight="medium">
          T14 medium
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T14" weight="regular">
          T14 regular
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T14" weight="light">
          T14 light
        </MDSTypogrpahy>
      </div>
      <div>
        <MDSTypogrpahy variant="T13" weight="bold">
          T13 Bold
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T13" weight="medium">
          T13 medium
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T13" weight="regular">
          T13 regular
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T13" weight="light">
          T13 light
        </MDSTypogrpahy>
      </div>
      <div>
        <MDSTypogrpahy variant="T12" weight="bold">
          T12 Bold
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T12" weight="medium">
          T12 medium
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T12" weight="regular">
          T12 regular
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T12" weight="light">
          T12 light
        </MDSTypogrpahy>
      </div>
    </div>
    <div>
      <div>
        <MDSTypogrpahy variant="T24" weight="bold">
          T24 볼드
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T24" weight="medium">
          T24 미디엄
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T24" weight="regular">
          T24 레귤러
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T24" weight="light">
          T24 라이트
        </MDSTypogrpahy>
      </div>
      <div>
        <MDSTypogrpahy variant="T20" weight="bold">
          T20 볼드
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T20" weight="medium">
          T20 미디엄
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T20" weight="regular">
          T20 레귤러
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T20" weight="light">
          T20 라이트
        </MDSTypogrpahy>
      </div>

      <div>
        <MDSTypogrpahy variant="T18" weight="bold">
          T18 볼드
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T18" weight="medium">
          T18 미디엄
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T18" weight="regular">
          T18 레귤러
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T18" weight="light">
          T18 라이트
        </MDSTypogrpahy>
      </div>
      <div>
        <MDSTypogrpahy variant="T16" weight="bold">
          T16 볼드
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T16" weight="medium">
          T16 미디엄
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T16" weight="regular">
          T16 레귤러
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T16" weight="light">
          T16 라이트
        </MDSTypogrpahy>
      </div>

      <div>
        <MDSTypogrpahy variant="T14" weight="bold">
          T14 볼드
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T14" weight="medium">
          T14 미디엄
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T14" weight="regular">
          T14 레귤러
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T14" weight="light">
          T14 라이트
        </MDSTypogrpahy>
      </div>

      <div>
        <MDSTypogrpahy variant="T13" weight="bold">
          T13 볼드
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T13" weight="medium">
          T13 미디엄
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T13" weight="regular">
          T13 레귤러
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T13" weight="light">
          T13 라이트
        </MDSTypogrpahy>
      </div>
      <div>
        <MDSTypogrpahy variant="T12" weight="bold">
          T12 볼드
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T12" weight="medium">
          T12 미디엄
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T12" weight="regular">
          T12 레귤러
        </MDSTypogrpahy>
        <MDSTypogrpahy variant="T12" weight="light">
          T12 라이트
        </MDSTypogrpahy>
      </div>
    </div>
  </div>
);

export const Primary: Story = {
  args: {
    lineClamp: 0,
    children: `아크메드라비는 2017년부터 가장 핫한 트렌드를 시장에 선보이고 있는 젊은 스트리트 패션 브랜드입니다. 아이코닉한 '베이비페이스 프린트'로 폭발적인 인기와 인지도를 얻으며 아시아 최고의 스트리트 스타일 브랜드로 급부상했습니다. 현재 중국, 호주, 베트남, 말레이시아 등에서 30개 이상의 매장을 운영하고 있으며, 지속적으로 아시아 이외의 지역에도 추가 매장을 오픈할 계획입니다. 아크메드라비는 트렌디한 프리미엄웨어 브랜드로서의 아이덴티티를 유지하고 있습니다. 2021년에는 1,000만 달러의 매출을 기록하며 해외에서 지속적으로 매출을 확대하고 있습니다. 

지난 10년간 패션 업계는 이커머스 비즈니스를 성장의 핵심 동력으로 삼고 있지만, 온라인 사업 규모가 커질수록 많은 리스크가 수반됩니다. 디지털 시대의 브랜드 보호에 있어 가장 큰 위험 요소는 온라인 위조상품 판매자들의 수법이 빠르게 진화하고 있다는 점입니다. 아크메드라비는 온라인 비즈니스를 효과적으로 보호하기 위해서는 이러한 진화하는 방식에 한발 앞서 대응하고, 그에 따라 브랜드 보호 대책을 강화해야 한다는 사실을 알고 있습니다.`,
  },
};
