import { MouseEvent, ReactElement } from 'react';
import styled from '@emotion/styled';
import { MDSButton } from '../../Button';
import { MDSTag } from '../../Tag';
import { MDSIcon } from '../../../atoms/Icon';

type Props = {
  label: string;
  selectedLabel: (string | ReactElement)[];
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: (e: MouseEvent) => void;
};

const StyledWrap = styled(MDSButton)`
  align-self: flex-start;
`;

export const FilterButton = (props: Props) => {
  const { label, selectedLabel, isLoading, isDisabled, onClick } = props;

  const isSelected = selectedLabel.length > 0;

  return (
    <StyledWrap
      variant={isSelected ? 'fill' : 'tint'}
      size="medium"
      color="bluegray"
      isDisabled={isDisabled}
      tags={
        isSelected && !isDisabled ? (
          <>
            <MDSTag size="small" variant="tint" color="bluegray">
              {selectedLabel[0]}
            </MDSTag>
            {selectedLabel.length > 1 ? (
              <MDSTag size="small" variant="tint" color="bluegray">
                +{selectedLabel.length - 1}
              </MDSTag>
            ) : undefined}
          </>
        ) : undefined
      }
      isLoading={isLoading}
      endIcon={<MDSIcon.ArrowDown variant="outline" />}
      onClick={onClick}
    >
      {label}
    </StyledWrap>
  );
};
