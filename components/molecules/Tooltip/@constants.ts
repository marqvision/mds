export const Theme = {
  size: {
    small: {
      variant: 'body',
      size: 'xs',
      weight: 'regular',
      padding: '4px 8px',
      margin: 4,
      maxWidth: 160,
    },
    medium: {
      variant: 'body',
      size: 'm',
      weight: 'regular',
      padding: '12px 16px',
      margin: 6,
      maxWidth: 240,
    },
  },
  position: {
    top: `
      top: 0;
      left: 50%;
      transform: translate(-50%, -7px);
    `,
    bottom: `
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 7px) rotate(180deg);
    `,
    left: `
      left: 0;
      top: 50%;
      transform: translate(-8px, -50%) rotate(270deg);
    `,
    right: `
      right: 0;
      top: 50%;
      transform: translate(8px, -50%) rotate(90deg);
    `,
  },
} as const;
