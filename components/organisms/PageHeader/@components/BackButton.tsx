import styled from '@emotion/styled';
import { LinkComponentProps } from '../../../../types';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSTypography } from '../../../atoms/Typography';
import { BackButtonProps } from '../@types';

const Wrapper = styled.button<Partial<LinkComponentProps>>`
  ${({ theme }) => {
    return `
      position: relative;
      border: none;
      width: 26px;
      height: 26px;
      border-radius: ${theme.comp.pageHeader.backButton.radius};
      background-color: ${theme.color.bg.fill.target.default};
      cursor: pointer;
      transition: 0.2s;
      overflow: hidden;
      interpolate-size: allow-keywords;
      text-decoration: none;
      
      &>div {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 2px;
        transition: 0.2s;
      }
      
      &>.default {
        padding: 1px;
        position: absolute;
        top: 50%;
        left: 50%;
        opacity: 1;
        transform: translate(-50%, -50%);
      }
      &>.hovered {
        padding: 3px 8px;
        opacity: 0;
        transform: translate(13px, 0%);
        white-space: nowrap;
      }

      &:hover {
        width: max-content;
        &>.default {
          opacity: 0;
          transform: translate(0%, -50%);
        }
        &>.hovered {
          opacity: 1;
          transform: translate(0%, 0%);
        }
      }
    `;
  }}
`;

export const BackButton = (props: BackButtonProps) => {
  const { onClick, to, LinkComponent, label } = props;

  return (
    <Wrapper as={LinkComponent} to={to} onClick={onClick}>
      <div className="default">
        <MDSIcon.ArrowLeft variant="outline" />
      </div>
      <div className="hovered">
        <MDSIcon.ArrowLeft variant="outline" size={16} />
        <MDSTypography size="s" weight="medium">{label}</MDSTypography>
      </div>
    </Wrapper>
  );
};
