import styled from "styled-components";

export const GameContainer = styled.div`
  background: ${props => props.theme.primary};
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
`