import React from "react"
import { Container } from "@mui/system"
import { Box, Button, Dialog, DialogTitle, List, ListItem, Modal, Paper, TextField } from "@mui/material";
import { useTable } from "../src/contexts/useTable"
import Layout from "../src/Shared/Layout"
import TableBody from "../src/Shared/Table/TableBody"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { SampleColumns } from "../src/Helpers/SampleColumns"
import {DataFieldType, GenericObjectKeyType} from "../src/Helpers/TypeHelpers"
import { DivContentTable, DivLikeRow, DivLikeTable } from "../src/Helpers/StyledTags";

const Columns: DataFieldType[] = [
  {field: 'id', display: 'ID', showFilter: true},
  {field: 'sample_type', display: 'Sample Type', showFilter: true},
  {field: 'internal_id', display: 'Internal  ID', showFilter: true},
  {field: 'external_id', display: 'External  ID', showFilter: false},
  // {field: 'customer_id', display: 'Customer ID', showFilter: false},
  // {field: 'value_unit', display: 'Value unit', showFilter: false},
]

const Home = ({samples}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setLoading } = useTable()
  const [data, setData] = React.useState(samples)
  const [tableState, setTableState] = React.useState({dialogOpen: false, createSampleModalOpen: false, sampleQuantity: 1, samples: [] as GenericObjectKeyType[]})

  function handleSampleQuantityDialog(shouldOpenSampleModal?: boolean)
  {
    if(shouldOpenSampleModal){
      setTableState({...tableState, dialogOpen: !tableState.dialogOpen, createSampleModalOpen: !tableState.createSampleModalOpen})
    } else {
      setTableState({...tableState, dialogOpen: !tableState.dialogOpen})
    }
  }

  function handleModalSample()
  {
    setTableState({...tableState, createSampleModalOpen: !tableState.createSampleModalOpen})
  }

  function inputHandler(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)
  {
    if(Number(e.currentTarget.value) <= 15)
      setTableState({...tableState, sampleQuantity: Number(e.currentTarget.value)})
  }

  function makeRows()
  {
    let rows = []
    for (let index = 1; index <= tableState.sampleQuantity; index++) {
      rows.push(
        <DivLikeRow style={{margin: ".2rem 0", justifyContent: "center", alignItems: "center"}}>
          #{index}
          <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
            <TextField size="small" variant="standard" placeholder="Teste" onContextMenu={(e) => {e.preventDefault(); alert("toma esse alerta")}}/>
          </DivContentTable>
          <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
            <TextField size="small" variant="standard" placeholder="Teste"/>
          </DivContentTable>
          <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
            <TextField size="small" variant="standard" placeholder="Teste"/>
          </DivContentTable>
          <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
            <TextField size="small" variant="standard" placeholder="Teste"/>
          </DivContentTable>
          <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
            <TextField size="small" variant="standard" placeholder="Teste"/>
          </DivContentTable>
          <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
            <TextField size="small" variant="standard" placeholder="Teste"/>
          </DivContentTable>
          <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
            <TextField size="small" variant="standard" placeholder="Teste"/>
          </DivContentTable>
          <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
            <TextField size="small" variant="standard" placeholder="Teste"/>
          </DivContentTable>
          <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
            <TextField size="small" variant="standard" placeholder="Teste"/>
          </DivContentTable>
        </DivLikeRow>
      )
    }

    return rows
  }

  return (
    <Layout>
      <Container maxWidth="xl" sx={{height: "100%", padding: "1rem 0"}}>
        <div style={{margin: ".2rem 1rem"}}>
          <Button onClick={() => handleSampleQuantityDialog()} color="buttons" variant="contained">Create sample</Button>
        </div>
        <TableBody header={Columns} entity={new SampleColumns()} searchable sortable showCheckbox rowData={data}/>

        <Dialog open={tableState.dialogOpen} transitionDuration={100}>
          <DialogTitle>How many samples?</DialogTitle>
          <List>
            <ListItem sx={{display: "flex", justifyContent: "center"}}>
              <TextField 
                sx={{width: "10rem"}}
                size="small"
                onChange={inputHandler}
                value={tableState.sampleQuantity ? tableState.sampleQuantity : ""}
                type={"number"}
              />
            </ListItem>
            <ListItem sx={{display: "flex", justifyContent: "center"}}>
              <Button variant="contained" onClick={() => handleSampleQuantityDialog(true)}>OK</Button>
            </ListItem>
          </List>
        </Dialog>

        <Modal
          open={tableState.createSampleModalOpen}
          onClose={handleModalSample}
          sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box component={Paper} sx={{ minWidth: "300px", maxWidth: "95%", height: "auto", padding: 1 }}>
            <div style={{display: "flex", flexDirection: "column"}}>
              <div style={{display: "flex", margin: ".5rem 0 .6rem 0"}}>
                <DivContentTable style={{margin: "0 .1rem", wordBreak: "break-word"}}>
                  Client document
                </DivContentTable>
                <DivContentTable style={{margin: "0 .1rem", wordBreak: "break-word"}}>
                  Client name
                </DivContentTable>
                <DivContentTable style={{margin: "0 .1rem", wordBreak: "break-word"}}>
                  Client e-mail
                </DivContentTable>
                <DivContentTable style={{margin: "0 .1rem", wordBreak: "break-word"}}>
                  Date received
                </DivContentTable>
                <DivContentTable style={{margin: "0 .1rem", wordBreak: "break-word"}}>
                  Received by
                </DivContentTable>
                <DivContentTable style={{margin: "0 .1rem", wordBreak: "break-word"}}>
                  Date collected
                </DivContentTable>
                <DivContentTable style={{margin: "0 .1rem", wordBreak: "break-word"}}>
                  Vol/Mass
                </DivContentTable>
                <DivContentTable style={{margin: "0 .1rem", wordBreak: "break-word"}}>
                  Un
                </DivContentTable>
                <DivContentTable style={{margin: "0 .1rem", wordBreak: "break-word"}}>
                  Analysis
                </DivContentTable>
              </div>
              <div style={{display: "flex", flexDirection: "column"}}>
                {makeRows()}
              </div>
              <div>
                <Button variant="contained">Save</Button>
              </div>
            </div>
          </Box>
        </Modal>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.REACT_APP_URL_API}/v1/sample`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN_API}`
    }
  })

  const data = await res.json()

  return {
    props: {
      samples: data
    }
  }
}

export default Home