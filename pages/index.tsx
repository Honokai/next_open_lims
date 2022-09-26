import React from "react"
import { Container } from "@mui/system"
import { Box, Button, Dialog, DialogTitle, FormControl, InputLabel, List, ListItem, MenuItem, Modal, Paper, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useTable } from "../src/contexts/useTable"
import Layout from "../src/Shared/Layout"
import TableBody from "../src/Shared/Table/TableBody"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { SampleColumns } from "../src/Helpers/SampleColumns"
import {DataFieldType, GenericObjectKeyType} from "../src/Helpers/TypeHelpers"
import { DivContentTable, DivLikeRow, DivLikeTable } from "../src/Helpers/StyledTags";
import SampleCreate from "../src/components/Sample/SampleCreate";

const Columns: DataFieldType[] = [
  {field: 'id', display: 'ID', showFilter: true},
  {field: 'sample_type', display: 'Sample Type', showFilter: true},
  {field: 'internal_id', display: 'Internal  ID', showFilter: true},
  {field: 'external_id', display: 'External  ID', showFilter: false},
]

const Home = ({samples}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setLoading } = useTable()
  const [data, setData] = React.useState(samples)
  const [tableState, setTableState] = React.useState({dialogOpen: false, createSampleModalOpen: false, sampleQuantity: 1, samples: [] as GenericObjectKeyType[]})

  React.useEffect(() => {
    setTableState({...tableState, samples: Array(tableState.sampleQuantity).fill(0).map(x => {
      return {client_document: "", client_name: "", client_email: "", date_received: "", received_by: "", date_collected: "", vol_mass: "", unit: "", analysis: ""}
    })})
  }, [tableState.sampleQuantity])

  React.useEffect(() => {
    console.log(tableState.samples)
  }, [tableState.samples])

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
    setTableState({...tableState, sampleQuantity: Number(e.currentTarget.value)})
  }

  function updateItemSample(item: GenericObjectKeyType, index: number)
  {
    // console.log(item, index)
    let samplesArray = Array.from(tableState.samples)
    samplesArray[index] = item

    setTableState({...tableState, samples: samplesArray})
  }

  function removeItem(index: number)
  {
    console.log(tableState.samples.find((el, i) => i === index))
  }

  return (
    <Layout>
      <Container maxWidth="xl" sx={{height: "100%", padding: "1rem 0"}}>
        <div style={{margin: ".2rem 1rem"}}>
          <Button onClick={() => handleSampleQuantityDialog()} color="generalButton" variant="contained">Create sample</Button>
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
            <ListItem sx={{display: "flex", justifyContent: "center", "& *": {margin: "0 0.2rem"}}}>
              <Button variant="contained" onClick={() => handleSampleQuantityDialog()}>Cancel</Button>
              <Button variant="contained" color="generalButton" onClick={() => handleSampleQuantityDialog(true)}>OK</Button>
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
                <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-word"}}>
                  Client document
                </DivContentTable>
                <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-word"}}>
                  Client name
                </DivContentTable>
                <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-word"}}>
                  Client e-mail
                </DivContentTable>
                <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-word"}}>
                  Date received
                </DivContentTable>
                <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-word"}}>
                  Received by
                </DivContentTable>
                <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-word"}}>
                  Date collected
                </DivContentTable>
                <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-word"}}>
                  Vol/Mass
                </DivContentTable>
                <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-word"}}>
                  Un
                </DivContentTable>
                <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-word"}}>
                  Analysis
                </DivContentTable>
                <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-word"}}>
                </DivContentTable>
              </div>
              <div style={{display: "flex", flexDirection: "column"}}>
                {tableState.samples.map((item, index) => {
                  return (
                    <SampleCreate updateItemHandler={updateItemSample} removeItemHandler={removeItem} item={item} index={index}/>
                  )
                })}
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