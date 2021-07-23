import styled from "styled-components";

export const MainCard = styled.div`
  align-items: center;
  background: ${props => props.theme.primaryCard};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 100%;
  max-width: 450px;
  min-width: 154px;
  padding: 2rem;
  height: fit-content;
  width: 40%;
`