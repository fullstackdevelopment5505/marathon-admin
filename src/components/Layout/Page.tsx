import React from 'react';
import styled from 'styled-components';

interface Props {
  visible?: boolean;
  centered?: boolean;
  fullwidth?: boolean;
}

const StyledPage = styled.main<Props>`
  padding: 2rem;

  ${(props) => !props.visible && 'display: none;'}

  ${(props) =>
    props.centered &&
    `display: flex;
    flex-flow: column;
    flex: 1;
    justify-content: center;
    margin-top: 300px;
    align-items: center;`}

  ${(props) =>
    props.fullwidth &&
    `display: flex;
    flex-direction: column;
    position: relative;
    padding: 1.5rem;
    flex-grow: 1;`}
`;

export const Page = ({ children, visible = true, ...props }) => {
  return (
    <StyledPage visible={visible} {...props}>
      {children}
    </StyledPage>
  );
};
