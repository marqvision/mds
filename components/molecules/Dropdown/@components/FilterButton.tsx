import { MouseEvent, ReactElement } from 'react';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSButton } from '../../Button';
import { MDSTag } from '../../Tag';
import { FilterButtonModule } from '../@types';

type Props = {
  label: string;
  selectedLabel: (string | ReactElement)[];
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: (e: MouseEvent) => void;
} & Omit<FilterButtonModule, 'type'>;

export const FilterButton = (props: Props) => {
  const { label, selectedLabel, isLoading, isDisabled, onClick, size = 'medium', color = 'bluegray', flat } = props;

  const isSelected = selectedLabel.length > 0;

  return (
    <MDSButton
      variant={isSelected ? 'fill' : 'tint'}
      size={size}
      color={color}
      isDisabled={isDisabled}
      flat={flat}
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
    </MDSButton>
  );
};
