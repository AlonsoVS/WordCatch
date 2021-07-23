import styled from "styled-components";

export const MainContainer = styled.div`
  align-items: center;
  background: ${props => props.theme.primary};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  justify-content: center;
  min-height: 100%;
  min-width: 175px;
  width: 100%;
`