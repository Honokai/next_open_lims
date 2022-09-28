import React, { memo } from 'react';
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Autocomplete, Box, Button, Dialog, DialogTitle, FormControl, InputLabel, List, ListItem, ListItemButton, MenuItem, Paper, Select, TextField } from "@mui/material";
import Layout from "../../src/Shared/Layout"
import { DivContentTable, DivLikeRow } from '../../src/Helpers/StyledTags';
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { GenericObjectKeyType } from '../../src/Helpers/TypeHelpers';
// import { useAutoCompleteProps } from '@mui/material/Autocomplete'; 
import { pluck } from '../../src/Helpers/Functions';
import SampleCreate from '../../src/components/Sample/SampleCreate';

type SampleForm = {
  sample: {
    external_id: string,
    sample_type: string,
    analysis: string,
    customer_id: string,
    received: string,
    received_by: string,
    storage_id: string,
    collected: string,
    collected_by: string,
    vol_mass: string,
    measurament_unit: string,
    discarded: string,
    discarded_by: string,
  }[]
};

declare module "@mui/material/Autocomplete" {
  interface useAutoCompleteProps {
    name: string
    id: string
  }
}

const Create = ({ analyses }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const ref = React.useRef<Element>()
  const sample_types = [
    {label: "Urine", id: "urine"},
    {label: "Blood", id: "blood"}
  ]
  const [createState, setCreateState] = React.useState(
    {
      dialogOpen: true,
      createSampleModalOpen: false,
      sampleQuantity: 0,
      limiter: [],
      samples: [] as GenericObjectKeyType[],
      contextMenuOpen: false,
      targetIndex: 0,
      mouseCoordinates: {x: 0, y: 0}
    }
  )

  const { register, handleSubmit, control } = useForm<SampleForm>({
    defaultValues: {
      sample: Array(createState.sampleQuantity && 0).fill(0).map(x => {
        return {
          external_id: "", sample_type: "", analysis: "",
          customer_id: "", received: "", received_by: "",
          storage_id: "", collected: "", collected_by: "",
          vol_mass: "", measurament_unit: "", discarded: "", discarded_by: ""}
      })
    }, mode: "onBlur"
  });

  const { fields, remove, append } = useFieldArray({
    name: 'sample',
    control
  });

  const onSubmit: SubmitHandler<SampleForm> = async (data, event) => {
    event?.preventDefault()
    console.log(data)
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
    // append(Array(createState.sampleQuantity).fill(0).map(x => {
    //   return {
    //     external_id: "", sample_type: "", analysis: "",
    //     customer_id: "", received: "", received_by: "",
    //     storage_id: "", collected: "", collected_by: "",
    //     vol_mass: "", measurament_unit: "", discarded: "", discarded_by: ""}
    // }))
    setCreateState({
      ...createState,
      samples: Array(createState.sampleQuantity).fill(0).map(x => {
        return {
          external_id: "", sample_type: "", analysis: "",
          customer_id: "", received: "", received_by: "",
          storage_id: "", collected: "", collected_by: "",
          vol_mass: "", measurament_unit: "", discarded: "", discarded_by: ""
        }
      })
    })
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

  const sampleQuantityValidate = () => {
    if (createState.sampleQuantity > 0)
      handleSampleQuantityDialog(true)
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

  function removeItem(index: number): void
  {
    setCreateState({
      ...createState,
      samples: createState.samples.filter((x, key) => index !== key)
    })
  }

  function updateItem(col: GenericObjectKeyType, key: number)
  {
    setCreateState({
      ...createState,
      samples: createState.samples.map((x, index) => {
        if(index === key)
          x = col
        
          return x
      })
    })
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
                helperText={createState.sampleQuantity <= 0 ? "Must be greater than zero" : ""}
                value={createState.sampleQuantity ? createState.sampleQuantity : ""}
                type={"number"}
                error={createState.sampleQuantity <= 0 ? true : false}
              />
            </ListItem>
            <ListItem sx={{display: "flex", justifyContent: "center", "& *": {margin: "0 0.2rem"}}}>
              <Button variant="contained" onClick={() => handleSampleQuantityDialog()}>Cancel</Button>
              <Button variant="contained" color="generalButton" onClick={sampleQuantityValidate}>OK</Button>
            </ListItem>
          </List>
        </Dialog>
        <div style={{display: "flex", padding: "0 .6rem", alignItems: "center", justifyContent: "center", minWidth: "100%", maxHeight: "100%", overflow: "auto" }}>
            <form style={{width: "100%", maxHeight: "95%"}} onSubmit={(e) => handleSubmit(onSubmit)(e)}>
              <div style={{display: "flex", flexDirection: "column"}}>
                <Box component={Paper} sx={{display: "flex", margin: ".5rem 0 .6rem 0"}}>
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
                </Box>
                <div style={{display: "flex", flexDirection: "column"}}>
                  {createState.samples.map((item, key) => {
                    return <SampleCreate item={item} index={key} removeItemHandler={removeItem} updateItemHandler={updateItem} onContextMenu={onContextMenu} analyses={analyses}/>
                  })}
                  {/* {fields.map((item, index) => {
                    return (
                      <DivLikeRow key={item.id} style={{margin: ".5rem 0", justifyContent: "center", alignItems: "center"}}>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <TextField color="sidebar" {...register(`sample.${index}.external_id` as const)} name={`sample.${index}.external_id`} size="small" variant="standard" placeholder="External ID" onContextMenu={(e) => {onContextMenu(e, index)}}/>
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                            <Autocomplete
                              disablePortal
                              size='small'
                              id="combo-box-demo"
                              options={sample_types}
                              getOptionLabel={(option) => option['label']}
                              fullWidth
                              renderInput={(params) => <TextField {...register(`sample.${index}.sample_type` as const)} {...params} label="" />}
                              noOptionsText="Criteria did not return results"
                            />
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <Autocomplete
                              disablePortal
                              size='small'
                              id="combo-box-demo"
                              options={analyses.sort((a: GenericObjectKeyType, b: GenericObjectKeyType) => b['sample_type'].localeCompare(a['sample_type']))}
                              getOptionLabel={(option) => option['label']}
                              groupBy={(option: GenericObjectKeyType) => option['sample_type']}
                              fullWidth
                              renderInput={(params) => <TextField {...register(`sample.${index}.analysis` as const)} {...params} label="" />}
                              noOptionsText="Criteria did not return results"
                            />
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
                          <TextField color="sidebar" {...register(`sample.${index}.date_received` as const)}  type="date" size="small" variant="standard" placeholder="Date received"/>
                        </DivContentTable>
                        <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
                          <FormControl size="small" fullWidth>
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
                          <TextField color="sidebar" {...register(`sample.${index}.date_received` as const)}  type="date" size="small" variant="standard" placeholder="Date received"/>
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
                  })} */}
                </div>
                <div>
                  <Button type="submit" variant="contained">Save</Button>
                </div>
              </div>
            </form>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const analysis = await fetch(`${process.env.REACT_APP_URL_API}/v1/analysis`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN_API}`
    }
  })

  const analyses = await analysis.json().then(json => {
    return pluck(['id', 'name', 'sample_type'], json).map(i => {
      i['label'] = i['name'] + " - " + i['sample_type']
      delete i['name']
      
      return i
    })
  })

  return {
    props: {
      analyses
    }
  }
}

export default Create