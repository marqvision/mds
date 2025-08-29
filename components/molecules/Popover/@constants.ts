export const Theme = {
  position: {
    top: `
      bottom: 0;
      left: var(--arrow-left, 50%);
      transform: translate(-50%, 0px);
    `,
    bottom: `
      top: 0;
      left: var(--arrow-left, 50%);
      transform: translate(-50%, 0px) rotate(180deg);
    `,
    left: `
      top: var(--arrow-top, 50%);
      right: -4px;
      transform: translate(-50%, 0px) rotate(270deg);
    `,
    right: `
      top: var(--arrow-top, 50%);
      left: 0;
      transform: translate(0px, -50%) rotate(90deg);
    `,
  },
} as const;
