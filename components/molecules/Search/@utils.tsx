import React from 'react';
import { MDSDivider } from '../../atoms/Divider';
import { MDSDropdownItem } from '../Dropdown';
import { Styled } from './@components/Styled';

/**
 * 선택된 값(selectedValue)이 포함된 드롭다운 트리에서
 * 경로에 해당하는 label들을 divider와 함께 배열로 반환합니다.
 * @param list 드롭다운 아이템 리스트
 * @param selectedValue 선택된 값
 * @returns label과 divider가 섞인 배열
 */
const getSelectedPathLabelsWithDivider = <T,>(list: MDSDropdownItem<T>[], selectedValue: T) => {
  const path: (string | React.ReactElement)[] = [];
  const traverse = (items: MDSDropdownItem<T>[], value: T): boolean => {
    for (const item of items) {
      if (item.value === value) {
        path.push(item.label);
        return true;
      }
      if (item.children && traverse(item.children, value)) {
        if (path.length) {
          path.unshift(
            <MDSDivider
              key={`divider-${item.value as string}`}
              orientation="vertical"
              length="unset" // 상위 컴포넌트에서 align-items: stretch로 설정되어 있어 길이를 지정하지 않음
            />
          );
        }
        path.unshift(item.label);
        return true;
      }
    }
    return false;
  };
  traverse(list, selectedValue);
  return path;
};

/**
 * 선택된 값(selectedValue)에 해당하는 label 경로를 Styled 컴포넌트로 감싸서 반환합니다.
 * @param list 드롭다운 아이템 리스트
 * @param selectedValue 선택된 값
 * @returns Styled.label로 감싼 label 경로 React 요소
 */
export const getSelectedLabel = <T,>(list: MDSDropdownItem<T>[], selectedValue: T) => {
  const path = getSelectedPathLabelsWithDivider(list, selectedValue);

  return (
    <Styled.label>
      {path.map((label, index) =>
        typeof label === 'string' && index !== path.length - 1 ? (
          <Styled.parent key={`selected-${index}`}>{label}</Styled.parent>
        ) : (
          label
        )
      )}
    </Styled.label>
  );
};
