import styled from '@emotion/styled';
import { LinkComponentProps } from '../../../../types';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSTypography } from '../../../atoms/Typography';
import { ButtonProps } from '../@types';

const Wrapper = styled.button<Partial<LinkComponentProps>>`
  ${({ theme }) => {
    return `
      position: relative;
      border: none;
      width: 26px;
      height: 26px;
      border-radius: 8px;
      background-color: ${theme.color.bg.fill.target.default};
      cursor: pointer;
      transition: 0.2s;
      overflow: hidden;
      
      &>div {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        align-items: center;
        gap: 2px;
        transition: 0.2s;
      }
      
      &>.default {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
      &>.hovered {
        opacity: 0;
        transform: translate(0%, -50%);
      }

      &:hover {
        width: 65px;
        &>.default {
          opacity: 0;
          transform: translate(0%, -50%);
        }
        &>.hovered {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
      }
    `;
  }}
`;

export const BackButton = (props: ButtonProps) => {
  const { onBack, backTo, LinkComponent } = props;

  return (
    <Wrapper as={LinkComponent} to={backTo} onClick={onBack}>
      <div className="default">
        <MDSIcon.ArrowLeft variant="outline" />
      </div>
      <div className="hovered">
        <MDSIcon.ArrowLeft variant="outline" size={16} />
        <MDSTypography size="s" weight="medium">Back</MDSTypography>
      </div>
    </Wrapper>
  );
};
