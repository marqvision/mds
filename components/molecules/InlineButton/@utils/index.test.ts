import { describe, it, expect } from 'vitest';
import { _MDSThemeValue } from '../../../../foundation';
import { resolveColor } from './index';

const theme = _MDSThemeValue;

describe('InlineButton 유틸 함수', () => {
  describe('resolveColor', () => {
    describe('bluegray 색상', () => {
      it('normal 상태일 때 올바른 색상을 반환해야 합니다', () => {
        // Arrange
        const props = { color: 'bluegray' as const, isDisabled: false, isClickable: true };

        // Act
        const result = resolveColor(theme, props);

        // Assert
        expect(result.content.normal).toBe(theme.color.content.neutral.default.normal);
        expect(result.content.hover).toBe(theme.color.content.neutral.default.hover);
        expect(result.content.visited).toBe(theme._raw_color.indigo700);
      });

      it('disabled 상태일 때 disabled 색상을 반환해야 합니다', () => {
        // Arrange
        const props = { color: 'bluegray' as const, isDisabled: true, isClickable: false };

        // Act
        const result = resolveColor(theme, props);

        // Assert
        expect(result.content.normal).toBe(theme.color.content.neutral.default.disabled);
        expect(result.content.hover).toBe(theme.color.content.neutral.default.disabled);
        expect(result.content.visited).toBe(theme.color.content.neutral.default.disabled);
      });
    });

    describe('bluegray-secondary 색상', () => {
      it('normal 상태일 때 올바른 색상을 반환해야 합니다', () => {
        // Arrange
        const props = { color: 'bluegray-secondary' as const, isDisabled: false, isClickable: true };

        // Act
        const result = resolveColor(theme, props);

        // Assert
        expect(result.content.normal).toBe(theme.color.content.neutral.secondary.normal);
        expect(result.content.hover).toBe(theme.color.content.neutral.secondary.hover);
        expect(result.content.visited).toBe(theme._raw_color.indigo700);
      });

      it('disabled 상태일 때 disabled 색상을 반환해야 합니다', () => {
        // Arrange
        const props = { color: 'bluegray-secondary' as const, isDisabled: true, isClickable: false };

        // Act
        const result = resolveColor(theme, props);

        // Assert
        expect(result.content.normal).toBe(theme.color.content.neutral.secondary.disabled);
        expect(result.content.visited).toBe(theme.color.content.neutral.secondary.disabled);
      });
    });

    describe('blue 색상', () => {
      it('normal 상태일 때 올바른 색상을 반환해야 합니다', () => {
        // Arrange
        const props = { color: 'blue' as const, isDisabled: false, isClickable: true };

        // Act
        const result = resolveColor(theme, props);

        // Assert
        expect(result.content.normal).toBe(theme.color.content.primary.default.normal);
        expect(result.content.hover).toBe(theme.color.content.primary.default.hover);
        expect(result.content.visited).toBe(theme._raw_color.indigo700);
      });

      it('disabled 상태일 때 disabled 색상을 반환해야 합니다', () => {
        // Arrange
        const props = { color: 'blue' as const, isDisabled: true, isClickable: false };

        // Act
        const result = resolveColor(theme, props);

        // Assert
        expect(result.content.normal).toBe(theme.color.content.primary.default.disabled);
        expect(result.content.visited).toBe(theme.color.content.primary.default.disabled);
      });
    });

    describe('white (inverse) 색상', () => {
      it('normal 상태일 때 올바른 색상을 반환해야 합니다', () => {
        // Arrange
        const props = { color: 'white' as const, isDisabled: false, isClickable: true };

        // Act
        const result = resolveColor(theme, props);

        // Assert
        expect(result.content.normal).toBe(theme.color.content.inverse.default.normal);
        expect(result.content.hover).toBe(theme.color.content.inverse.default.hover);
        expect(result.content.visited).toBe(theme._raw_color.indigo200);
      });

      it('disabled 상태일 때 disabled 색상을 반환해야 합니다', () => {
        // Arrange
        const props = { color: 'white' as const, isDisabled: true, isClickable: false };

        // Act
        const result = resolveColor(theme, props);

        // Assert
        expect(result.content.normal).toBe(theme.color.content.inverse.default.disabled);
        expect(result.content.visited).toBe(theme.color.content.inverse.default.disabled);
      });
    });

    describe('clickable이 아닐 때', () => {
      it('hover 색상이 normal과 동일해야 합니다', () => {
        // Arrange
        const props = { color: 'bluegray' as const, isDisabled: false, isClickable: false };

        // Act
        const result = resolveColor(theme, props);

        // Assert
        expect(result.content.hover).toBe(result.content.normal);
      });
    });
  });
});
