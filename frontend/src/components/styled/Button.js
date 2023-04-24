import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: red;
  color: black;
  width: 100%;
  background-color: ${props => props.theme.secondary};
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: white;
  transition: 0.3s;

  &:hover {
    background-color: rgb(50, 159, 210);
  }
`;

export const BlueHeader = styled.div`
  color: ${props => props.theme.secondary};
`;
