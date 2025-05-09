import styled from '@emotion/styled';
import { MDSTypography } from '../../../atoms/Typography';
import { SubNavPopoverProps } from '../@types';
import { NavItem } from './NavItem';

const Title = styled(MDSTypography)`
  padding: 8.5px 16px 4px 16px;
`;

const Content = styled.div`
  padding: 8px;
  display: grid;
  gap: 4px;
`;

export const SubPopoverContent = (props: SubNavPopoverProps) => {
  const { label, items, isOpen, value, LinkComponent } = props;

  if (!items)
    return (
      <MDSTypography size="xs" weight="medium">
        {label}
      </MDSTypography>
    );

  return (
    <div>
      <Title size="xs" weight="medium">
        {label}
      </Title>
      <Content>
        {items.map((item) => {
          const selected = item.path === value;

          return (
            <NavItem
              {...item}
              type="popover"
              isOpen={isOpen}
              value={value}
              LinkComponent={LinkComponent}
              selected={selected}
              key={item.key}
            />
          );
        })}
      </Content>
    </div>
  );
};
