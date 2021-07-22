import styled from "styled-components";

export const MainCard = styled.div`
  background: ${props => props.theme.primaryCard};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: fit-content;
  width: fit-content;
`