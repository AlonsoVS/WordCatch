import styled from "styled-components";

export const GameContainer = styled.div`
  align-items: center;
  background: ${props => props.theme.primary};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100vh;
  justify-content: center;
  overflow: auto;
  width: 100%;
`