import styled from "@emotion/styled";
import { styled as StyledMUI } from "@mui/material";
import { Box } from "@mui/system";

export const DivContentTable = styled.div`
  flex: 2 2 0px;
  display: flex;
  max-height: 1.7rem;
  justify-content: center;
  align-items: center;
  word-break: break-all;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
` 

export const DivLikeTable = styled.div`
  min-height: 20%;
  max-height: 90%;
  min-width: 400px;
  display: flex;
  margin: 0 1rem;
  // padding: .5rem 1rem;
  border-radius: .2rem;
  border: 1px solid gray;
  flex-direction: column;
  overflow: hidden;
`

export const DivLikeThead = StyledMUI(Box)(({theme}) => ({
  padding: ".3rem 0",
  display: "flex",
  backgroundColor: theme.palette.table.main,
  flex: "1",
  textAlign: "center",
  alignItems: "center",
  borderBottom: "2px solid gray",
  "& *": {
    flex: "1",
  }
  })
)


export const DivLikeTbody = styled.div`
  margin: .3rem 0;
  display: flex;
  flex: 12;
  // height: 70%;
  flex-direction: column;
  text-align: center;
  overflow: auto;
  scrollbar-color: rebeccapurple green;
`

export const DivLikeRow = styled.div`
  display: flex;
  border-radius: 0.2rem;
`