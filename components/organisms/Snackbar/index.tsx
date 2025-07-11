import styled from '@emotion/styled';
import { snackbarManager, useSnackbarManager } from './@hooks/useSnackbarManager';
import { SnackbarItem } from './@components/SnackbarItem';
import { SnackbarCommonProps } from './@types';

const SnackbarWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 9999;
`;

// change name after snackbar v1 -> v2 migration
export const SnackbarContainerV2 = () => {
  const { snackbars, removeSnackbar } = useSnackbarManager();

  if (snackbars.length === 0) {
    return null;
  }

  return (
    <SnackbarWrapper>
      {snackbars.map((snackbar, index) => (
        <SnackbarItem
          key={snackbar.id}
          snackbar={snackbar}
          stackIndex={index}
          onRemove={removeSnackbar}
          isHidden={index !== 0}
        />
      ))}
    </SnackbarWrapper>
  );
};

export const MDSSnackbar = (options: SnackbarCommonProps) => snackbarManager.addSnackbar(options);
