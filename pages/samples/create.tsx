import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Box, Button, Dialog, DialogTitle, FormControl, IconButton, InputLabel, List, ListItem, ListItemButton, MenuItem, Paper, Select, TextField } from "@mui/material";
import Layout from "../../src/Shared/Layout"
import { DivContentTable, DivLikeRow } from '../../src/Helpers/StyledTags';
import { GenericObjectKeyType } from '../../src/Helpers/TypeHelpers';
import { DeleteOutline } from '@mui/icons-material';
import { Container } from '@mui/system';

type SampleForm = {
  sample: {
    client_document: string,
    client_name: string,
    client_email: string,
    date_received: string,
    received_by: string,
    date_collected: string,
    vol_mass: string,
    unit: string,
    analysis: string
  }[]
};

const Create = () => {
  const ref = React.useRef<Element>()
  const [createState, setCreateState] = React.useState(
    {
      dialogOpen: true,
      createSampleModalOpen: false,
      sampleQuantity: 0,
      samples: [] as GenericObjectKeyType[],
      contextMenuOpen: false,
      targetIndex: 0,
      mouseCoordinates: {x: 0, y: 0}
    }
  )

  const { register, handleSubmit, control, watch } = useForm<SampleForm>({
    defaultValues: {
      sample: Array(createState.sampleQuantity).fill(0).map(x => {
        return {client_document: "", client_name: "", client_email: "", date_received: "", received_by: "", date_collected: "", vol_mass: "", unit: "", analysis: ""}
      })
    }, mode: "onBlur"
  });

  const { fields, remove, append } = useFieldArray({
    name: 'sample',
    control
  });

  const onSubmit: SubmitHandler<SampleForm> = async (data) => {
    let form = new FormData()
    data.sample.forEach((sample, key) => {
      Object.entries(sample).forEach(el => {
        form.append(`samples[${key}][${el[0]}]`, el[1])
      })
    })

    // form.append(JSON.stringify(data))

    const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_URL_API}/v1/sample`, {
      method: "POST",
      body: form,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REACT_APP_TOKEN_API}`
      }
    }).then(r => {
      console.log(r)
    }).catch(e => console.log(e))
  };

  const onInvalid: SubmitHandler<SampleForm> = data => {
    console.log(data)
  };

  React.useEffect(() => {
    remove()
    append(Array(createState.sampleQuantity).fill(0).map(x => {
      return {client_document: "", client_name: "", client_email: "", date_received: "", received_by: "", date_collected: "", vol_mass: "", unit: "", analysis: ""}
    }))
  }, [createState.dialogOpen])

  function handleSampleQuantityDialog(shouldOpenSampleModal?: boolean)
  {
    if(shouldOpenSampleModal){
      setCreateState({
        ...createState,
        dialogOpen: !createState.dialogOpen,
        createSampleModalOpen: !createState.createSampleModalOpen,

      })
    } else {
      setCreateState({...createState, dialogOpen: !createState.dialogOpen})
    }
  }

  function inputHandler(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)
  {
    setCreateState({...createState, sampleQuantity: Number(e.currentTarget.value)})
  }

  function handleContextMenu()
  {
    setCreateState({...createState, contextMenuOpen: !createState.contextMenuOpen})
  }

  function onContextMenu(event: React.MouseEvent, index: number)
  {
    event.preventDefault()
    //@ts-ignore-next-line
    ref.current = event.target
    setCreateState({
      ...createState,
      contextMenuOpen: !createState.contextMenuOpen,
      targetIndex: index,
      mouseCoordinates: {
        x: event.pageX,
        y: event.pageY
      }
    })
  }

  function fillDown()
  {
    setCreateState(
      {
        ...createState,
        samples: createState.samples.map((x, key) => {
          if (key > createState.targetIndex) {
            //@ts-ignore
            x[ref.current.name] = ref.current.value
          }

          return x
        })
      }
    )
  }

  return(
    <Layout>
      <>
        <Dialog open={createState.dialogOpen} transitionDuration={100}>
          <DialogTitle>How many samples?</DialogTitle>
          <List>
            <ListItem sx={{display: "flex", justifyContent: "center"}}>
              <TextField
                key='sampleQuantity'
                sx={{width: "10rem"}}
                size="small"
                onChange={inputHandler}
                value={createState.sampleQuantity ? createState.sampleQuantity : ""}
                type={"number"}
              />
            </ListItem>
            <ListItem sx={{display: "flex", justifyContent: "center", "& *": {margin: "0 0.2rem"}}}>
              <Button variant="contained" onClick={() => handleSampleQuantityDialog()}>Cancel</Button>
              <Button variant="contained" color="generalButton" onClick={() => handleSampleQuantityDialog(true)}>OK</Button>
            </ListItem>
          </List>
        </Dialog>
        <div style={{display: "flex", padding: "0 .6rem", alignItems: "center", justifyContent: "center", width: "100%", height: "100%"}}>
          <Box elevation={2} component={Paper} sx={{width: "100%", height: "auto", maxHeight: "95%", padding: 1, overflow: "auto" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: "flex", margin: ".5rem 0 .6rem 0"}}>
                  <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-all"}}>
                    External ID*
                  </DivContentTable>
                  <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-all"}}>
                    Sample type
                  </DivContentTable>
                  <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-all"}}>
                    Analysis
                  </DivContentTable>
                  <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-all"}}>
                    Customer
                  </DivContentTable>
                  <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-all"}}>
                    Received
                  </DivContentTable>
                  <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-all"}}>
                    Received by
                  </DivContentTable>
                  <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-all"}}>
                    Stored at
                  </DivContentTable>
                  <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-all"}}>
                    Collected
                  </DivContentTable>
                  <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-all"}}>
                    Collected by
                  </DivContentTable>
                  <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-all"}}>
                    Vol/Mass
                  </DivContentTable>
                  <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-all"}}>
                    Measurement unit
                  </DivContentTable>
                  <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-all"}}>
                    Discarded
                  </DivContentTable>
                  <DivContentTable style={{fontWeight: "700", margin: "0 .1rem", wordBreak: "break-all"}}>
                    Discarded by
                  </DivContentTable>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                  {fields.map((item, index) => {
                    return (
                      <DivLikeRow key={item.id} style={{margin: ".5rem 0", justifyContent: "center", alignItems: "center"}}>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <TextField color="sidebar" {...register(`sample.${index}.client_document` as const)} name={`sample.${index}.client_document`} size="small" variant="standard" placeholder="Client document" onContextMenu={(e) => {onContextMenu(e, index)}}/>
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                            <Select fullWidth size='small' variant='standard' color="secondary" {...register(`sample.${index}.sample_type` as const)} defaultValue="select">
                              <MenuItem value="select" disabled selected>Sample type</MenuItem>
                              <MenuItem value="urine">Urine</MenuItem>
                              <MenuItem value="blood">Blood</MenuItem>
                              <MenuItem value="plasma">Plasma</MenuItem>
                              <MenuItem value="plasma">aaaaaaaaaaaaaaa</MenuItem>
                            </Select>
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <FormControl size="small" fullWidth>
                            <InputLabel color="text">Analyses</InputLabel>
                            <Select color="secondary" {...register(`sample.${index}.customer_id` as const)} defaultValue="">
                              <MenuItem value="" disabled>Select</MenuItem>
                              <MenuItem value="urine">Urine</MenuItem>
                              <MenuItem value="blood">Blood</MenuItem>
                              <MenuItem value="plasma">Plasma</MenuItem>
                            </Select>
                          </FormControl>
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <FormControl size="small" fullWidth>
                            <InputLabel color="text">Customer</InputLabel>
                            <Select color="secondary" {...register(`sample.${index}.customer_id` as const)} defaultValue="">
                              <MenuItem value="" disabled>Select</MenuItem>
                              <MenuItem value="urine">Urine</MenuItem>
                              <MenuItem value="blood">Blood</MenuItem>
                              <MenuItem value="plasma">Plasma</MenuItem>
                            </Select>
                          </FormControl>
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <input style={{border: "none", padding: ".3rem", borderBottom: "1px solid black"}} {...register(`sample.${index}.date_received` as const)}  type="date" size="small" variant="standard" placeholder="Date received" />
                          {/* <TextField color="sidebar" {...register(`sample.${index}.date_received` as const)}  type="date" size="small" variant="standard" placeholder="Date received"/> */}
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <FormControl size="small" fullWidth>
                            <InputLabel color="text">Received by</InputLabel>
                            <Select color="secondary" {...register(`sample.${index}.customer_id` as const)} defaultValue="">
                              <MenuItem value="" disabled>Select</MenuItem>
                              <MenuItem value="urine">Urine</MenuItem>
                              <MenuItem value="blood">Blood</MenuItem>
                              <MenuItem value="plasma">Plasma</MenuItem>
                            </Select>
                          </FormControl>
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <FormControl size="small" fullWidth>
                            <InputLabel color="text">Stored at</InputLabel>
                            <Select color="secondary" {...register(`sample.${index}.customer_id` as const)} defaultValue="">
                              <MenuItem value="" disabled>Select</MenuItem>
                              <MenuItem value="urine">Urine</MenuItem>
                              <MenuItem value="blood">Blood</MenuItem>
                              <MenuItem value="plasma">Plasma</MenuItem>
                            </Select>
                          </FormControl>
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <TextField color="sidebar" {...register(`sample.${index}.date_received` as const)}  type="date" size="small" variant="standard" placeholder="Collected"/>
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <FormControl size="small" fullWidth>
                            <InputLabel color="text">Collected by</InputLabel>
                            <Select color="secondary" {...register(`sample.${index}.customer_id` as const)} defaultValue="">
                              <MenuItem value="" disabled>Select</MenuItem>
                              <MenuItem value="urine">Urine</MenuItem>
                              <MenuItem value="blood">Blood</MenuItem>
                              <MenuItem value="plasma">Plasma</MenuItem>
                            </Select>
                          </FormControl>
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <input style={{border: "none", padding: ".3rem", borderBottom: "1px solid black"}} {...register(`sample.${index}.date_received` as const)}  type="date" size="small" variant="standard" placeholder="Date received" />
                          {/* <TextField color="sidebar" {...register(`sample.${index}.date_received` as const)}  type="date" size="small" variant="standard" placeholder="Date received"/> */}
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <FormControl size="small" fullWidth>
                            <InputLabel color="text">Received by</InputLabel>
                            <Select color="secondary" {...register(`sample.${index}.customer_id` as const)} defaultValue="">
                              <MenuItem value="" disabled>Select</MenuItem>
                              <MenuItem value="urine">Urine</MenuItem>
                              <MenuItem value="blood">Blood</MenuItem>
                              <MenuItem value="plasma">Plasma</MenuItem>
                            </Select>
                          </FormControl>
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <FormControl size="small">
                            <InputLabel color="text">Received by</InputLabel>
                            <Select color="secondary" {...register(`sample.${index}.received_by` as const)} defaultValue="">
                              <MenuItem value="" disabled>Select</MenuItem>
                              <MenuItem value="urine">Urine</MenuItem>
                              <MenuItem value="blood">Blood</MenuItem>
                              <MenuItem value="plasma">Plasma</MenuItem>
                            </Select>
                          </FormControl>
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <FormControl size="small" fullWidth>
                            <InputLabel color="text">Received by</InputLabel>
                            <Select color="secondary" {...register(`sample.${index}.customer_id` as const)} defaultValue="">
                              <MenuItem value="" disabled>Select</MenuItem>
                              <MenuItem value="urine">Urine</MenuItem>
                              <MenuItem value="blood">Blood</MenuItem>
                              <MenuItem value="plasma">Plasma</MenuItem>
                            </Select>
                          </FormControl>
                        </DivContentTable>
                      </DivLikeRow>
                    )
                  })}
                </div>
                <div>
                  <Button type="submit" variant="contained">Save</Button>
                </div>
              </div>
            </form>
          </Box>
        </div>
        <div onMouseLeave={handleContextMenu}>
          <List sx={{backgroundColor: "sidebar.main", zIndex: "2000", position: "absolute", top: `${createState.mouseCoordinates.y}px`, left: `${createState.mouseCoordinates.x}px`, display: createState.contextMenuOpen ? "block" : "none"}}>
            <ListItemButton onClick={fillDown}>Fill down</ListItemButton>
            <ListItemButton>Fill down</ListItemButton>
            <ListItemButton>Fill down</ListItemButton>
          </List>
        </div>
        </>
    </Layout>
  )
}

export default Create