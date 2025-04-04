import { MDSThemeColorPath } from '../../../foundation';

type Color = 'blue' | 'bluegray';

type ColorList = {
  border: {
    normal: MDSThemeColorPath;
    disabled: MDSThemeColorPath;
  };
  fill: {
    normal?: MDSThemeColorPath;
    disabled: MDSThemeColorPath;
  };
};

export type Theme = {
  color: Record<
    Color,
    {
      selected: ColorList;
      unSelected: ColorList;
    }
  >;
  size: {
    boxSize: number;
    padding: number;
    borderRadius: number;
  };
};

export type StyledWrapperProps = {
  color: Color;
  type: 'normal' | 'disabled';
  checked: boolean;
};

export type Props<Value extends string | number> = {
  /**
   * 해당 라디오 버튼을 선택했을 때 전달할 값을 지정합니다.
   */
  value: Value;
  /**
   * 라디오 버튼이 상태 변경을 처리하는 함수입니다.
   * 매개변수 'value' 는 클릭한 라디오 버튼에 전달한 value 값을 나타냅니다.
   */
  onChange: (value: Value) => void;
  /**
   * 라디오 버튼의 색상을 지정합니다.
   * @default 'blue'
   */
  color?: Color;
  /**
   * 라디오 버튼이 비활성화되었는지 여부를 나타냅니다.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * 여러 개의 라디오 버튼 중 선택된 버튼의 값입니다.
   * 동일한 selectedValue 값을 가진 라디오 버튼들은 하나의 그룹으로 취급됩니다.
   */
  selectedValue: Value;
};
