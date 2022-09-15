import styled from "@emotion/styled"

export const ContainerFlexDivJustified = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const FlexCenteredDiv = styled.div`
  display: flex;
  padding: .2rem 0;
  justify-content: center;
  & *: {
    margin: 0 2rem;
    color: white !important;
  }
`