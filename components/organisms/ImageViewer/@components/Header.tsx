import styled from '@emotion/styled';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { UseImageNavigation } from '../@hooks/useImageNavigation';
import { ImageData } from '../@types';
import { downloadImage } from '../@utils';

const Styled = {
  Wrapper: styled.div`
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    height: auto;
    padding: 16px;
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme._raw_color.blackAlpha40};
  `,
  Action: styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 24px;
  `,
  Arrow: styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
  `,
};

type Props = {
  currentImage: ImageData;
  onClose: () => void;
} & UseImageNavigation;

export const Header = (props: Props) => {
  const { currentImage, isVisible, prev, next, onClose } = props;

  const handleDownload = () => downloadImage(currentImage.src);

  return (
    <Styled.Wrapper>
      <Styled.Action>
        <MDSPlainButton color="white" icon={<MDSIcon.Download />} onClick={handleDownload} />
        {isVisible && (
          <Styled.Arrow>
            <MDSPlainButton
              color="white"
              icon={<MDSIcon.TailArrowLeft />}
              isDisabled={prev.isDisabled}
              onClick={prev.action}
            />
            <MDSPlainButton
              color="white"
              icon={<MDSIcon.TailArrowRight />}
              isDisabled={next.isDisabled}
              onClick={next.action}
            />
          </Styled.Arrow>
        )}
        <MDSPlainButton color="white" icon={<MDSIcon.CloseDelete variant="outline" />} onClick={onClose} />
      </Styled.Action>
    </Styled.Wrapper>
  );
};
