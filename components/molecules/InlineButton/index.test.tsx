import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MDSThemeProvider } from '../../../foundation';
import { MDSInlineButton } from './index';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<MDSThemeProvider>{ui}</MDSThemeProvider>);
};

describe('MDSInlineButton', () => {
  describe('렌더링', () => {
    it('children을 올바르게 렌더링해야 합니다', () => {
      // Arrange & Act
      renderWithTheme(<MDSInlineButton>Button</MDSInlineButton>);

      // Assert
      expect(screen.getByText('Button')).toBeTruthy();
    });

    it('startIcon을 렌더링해야 합니다', () => {
      // Arrange & Act
      renderWithTheme(
        <MDSInlineButton startIcon={<span data-testid="start-icon">icon</span>}>
          Button
        </MDSInlineButton>
      );

      // Assert
      expect(screen.getByTestId('start-icon')).toBeTruthy();
    });

    it('endIcon을 렌더링해야 합니다', () => {
      // Arrange & Act
      renderWithTheme(
        <MDSInlineButton endIcon={<span data-testid="end-icon">icon</span>}>Button</MDSInlineButton>
      );

      // Assert
      expect(screen.getByTestId('end-icon')).toBeTruthy();
    });

    it('startIcon과 endIcon을 동시에 렌더링해야 합니다', () => {
      // Arrange & Act
      renderWithTheme(
        <MDSInlineButton
          startIcon={<span data-testid="start-icon">icon</span>}
          endIcon={<span data-testid="end-icon">icon</span>}
        >
          Button
        </MDSInlineButton>
      );

      // Assert
      expect(screen.getByTestId('start-icon')).toBeTruthy();
      expect(screen.getByTestId('end-icon')).toBeTruthy();
    });
  });

  describe('사이즈', () => {
    it.each(['x-small', 'small', 'medium', 'large'] as const)('%s 사이즈로 렌더링해야 합니다', (size) => {
      // Arrange & Act
      renderWithTheme(<MDSInlineButton size={size}>Button</MDSInlineButton>);

      // Assert
      expect(screen.getByText('Button')).toBeTruthy();
    });

    it('기본 사이즈는 medium이어야 합니다', () => {
      // Arrange & Act
      renderWithTheme(<MDSInlineButton>Button</MDSInlineButton>);

      // Assert
      expect(screen.getByText('Button')).toBeTruthy();
    });
  });

  describe('색상', () => {
    it.each(['bluegray', 'bluegray-secondary', 'blue', 'white'] as const)('%s 색상으로 렌더링해야 합니다', (color) => {
      // Arrange & Act
      renderWithTheme(<MDSInlineButton color={color}>Button</MDSInlineButton>);

      // Assert
      expect(screen.getByText('Button')).toBeTruthy();
    });

    it('기본 색상은 bluegray이어야 합니다', () => {
      // Arrange & Act
      renderWithTheme(<MDSInlineButton>Button</MDSInlineButton>);

      // Assert
      expect(screen.getByText('Button')).toBeTruthy();
    });
  });

  describe('상태', () => {
    it('isDisabled가 true일 때 onClick이 있으면 버튼이 비활성화되어야 합니다', () => {
      // Arrange & Act
      renderWithTheme(<MDSInlineButton isDisabled onClick={() => {}}>Button</MDSInlineButton>);

      // Assert
      const button = screen.getByRole('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('href가 있을 때 a 태그로 렌더링되어야 합니다', () => {
      // Arrange & Act
      renderWithTheme(<MDSInlineButton href="https://example.com">Button</MDSInlineButton>);

      // Assert
      expect(screen.getByRole('link')).toBeTruthy();
    });
  });

  describe('클릭 이벤트', () => {
    it('onClick이 있을 때 클릭 시 호출되어야 합니다', async () => {
      // Arrange
      const user = userEvent.setup();
      const handleClick = vi.fn();
      renderWithTheme(<MDSInlineButton onClick={handleClick}>Button</MDSInlineButton>);

      // Act
      await user.click(screen.getByRole('button'));

      // Assert
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('isDisabled가 true일 때 클릭해도 onClick이 호출되지 않아야 합니다', async () => {
      // Arrange
      const user = userEvent.setup();
      const handleClick = vi.fn();
      renderWithTheme(
        <MDSInlineButton onClick={handleClick} isDisabled>
          Button
        </MDSInlineButton>
      );

      // Act
      await user.click(screen.getByRole('button'));

      // Assert
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('onClick이 없을 때 div로 렌더링되어야 합니다', () => {
      // Arrange & Act
      renderWithTheme(<MDSInlineButton>Button</MDSInlineButton>);

      // Assert
      expect(screen.queryByRole('button')).toBeNull();
    });
  });

  describe('말줄임', () => {
    it('lineClamp가 설정되면 렌더링되어야 합니다', () => {
      // Arrange & Act
      renderWithTheme(<MDSInlineButton lineClamp={1}>Very long text that should be truncated</MDSInlineButton>);

      // Assert
      expect(screen.getByText('Very long text that should be truncated')).toBeTruthy();
    });
  });
});
