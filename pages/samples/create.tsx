import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Alert, Button, Dialog, DialogTitle, List, ListItem, ListItemButton, Snackbar, TextField } from "@mui/material";
import Layout from "../../src/Shared/Layout"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { GenericObjectKeyType } from '../../src/Helpers/TypeHelpers';
import { pluck } from '../../src/Helpers/Functions';
import SampleRowCreate from '../../src/components/Sample/SampleRowCreate';
import axios from 'axios';

export type SampleForm = {
  samples: {
    externalId: string,
    sample_type: string,
    tests: string,
    customer_id: string,
    received_date: string,
    received_by_id: string,
    storage_id: string,
    collected_date: string,
    collected_by_id: string,
    value_unit: string,
    measurement_unit: string,
    discarded: string,
    discarded_by_id: string,
  }[]
};

declare module "@mui/material/Autocomplete" {
  interface useAutoCompleteProps {
    name: string
    id: string
  }
}

const Create = ({ analyses, users, storages }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const ref = React.useRef<EventTarget>()
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
      target: {index: 0, field: ""},
      mouseCoordinates: {x: 0, y: 0},
      submit: {
        isError: false,
        openToast: false,
        feedback: ''
      }
    }
  )

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<SampleForm>({
    defaultValues: {
      samples: Array(createState.sampleQuantity && 0).fill(0).map(x => {
        return {
          externalId: "", sample_type: "", tests: "",
          customer_id: "", received_date: "", received_by_id: "",
          storage_id: "", collected_date: "", collected_by_id: "",
          value_unit: "", measurement_unit: "", discarded: "", discarded_by_id: ""}
      })
    }, mode: "onBlur"
  });

  const { fields, remove, append, update } = useFieldArray({
    name: 'samples',
    control
  });

  const onSubmit: SubmitHandler<SampleForm> = async (data, event) => {
    event?.preventDefault()

    let form = new FormData()

    data.samples.forEach((sample, key) => {
      Object.entries(sample).forEach(el => {
        if(el[0] === 'tests') {
          if (el[1].length) {
            String(el[1]).split(',').forEach((v, i) => {
              form.append(`samples[${key}][${el[0]}][${i}][analysis_id]`, v)
            })
          } else {
            form.delete('tests')
          }
        } else {
          form.append(`samples[${key}][${el[0]}]`, el[1])
        }
      })
    })

    await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_URL_API}/v1/sample`, form).then(r => {
      if (r.status === 201) {
        setCreateState({
          ...createState,
          submit: {
            isError: false,
            openToast: true,
            feedback: "Creation executed successfully"
          }
        })
      }
    }).catch(e => {
      setCreateState({
        ...createState,
        submit: {
          isError: true,
          openToast: true,
          feedback: "Looks like we had an issue on our end!"
        }
      })
    })

  };

  const onInvalid: SubmitHandler<SampleForm> = data => {
    console.log(data)
  };

  React.useEffect(() => {
    remove()
    append(Array(createState.sampleQuantity).fill(0).map(x => {
      return {
        externalId: "", sample_type: "", tests: "",
        customer_id: "", received_date: "", received_by_id: "",
        storage_id: "", collected_date: "", collected_by_id: "",
        value_unit: "", measurement_unit: "", discarded: "", discarded_by_id: ""}
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

  function onContextMenu(event: React.MouseEvent, keyIndex: number, fieldName: string)
  {
    event.preventDefault()

    ref.current = event.target

    setCreateState({
      ...createState,
      contextMenuOpen: !createState.contextMenuOpen,
      target: {
        index: keyIndex,
        field: fieldName
      },
      mouseCoordinates: {
        x: event.pageX,
        y: event.pageY
      }
    })
  }

  function fillDown()
  {
    fields.forEach((item, index) => {
      if (index >= createState.target.index)
        if(ref.current)
          //@ts-ignore
          setValue(`samples.${index}.${createState.target.field}`, ref.current.value)
    })

    setCreateState({
      ...createState,
      contextMenuOpen: !createState.contextMenuOpen,
    })
  }

  function removeItem(index: number): void
  {
    setCreateState({
      ...createState,
      samples: createState.samples.filter((x, key) => index !== key)
    })
  }

  function handleClose()
  {
    setCreateState({
      ...createState,
      submit: {
        ...createState.submit,
        openToast: false
      }
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
        <div style={{padding: "0 .6rem", alignItems: "center", justifyContent: "center", width: "auto", maxHeight: "100%", overflow: "auto"}}>
            <form style={{overflow: "auto"}} onSubmit={(e) => handleSubmit(onSubmit)(e)}>
              <div style={{ overflow: "auto", height: '100%'}}>
                <table style={{borderCollapse: "collapse", overflow: "auto", width: "100%", maxWidth: "auto"}}>
                  <thead>
                    <tr>
                      <th style={{padding: ".6rem 0"}}>External ID*</th>
                      <th style={{padding: ".6rem 0"}}>Sample type</th>
                      <th style={{padding: ".6rem 0"}}>Analysis</th>
                      <th style={{padding: ".6rem 0"}}>Customer</th>
                      <th style={{padding: ".6rem 0"}}>Received</th>
                      <th style={{padding: ".6rem 0"}}>Received by</th>
                      <th style={{padding: ".6rem 0"}}>Stored at</th>
                      <th style={{padding: ".6rem 0"}}>Collected</th>
                      <th style={{padding: ".6rem 0"}}>Collected by</th>
                      <th style={{padding: ".6rem 0"}}>Vol/Mass</th>
                      <th style={{padding: ".6rem 0"}}>Measurement unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((item, key) => {
                      return <SampleRowCreate formErrors={errors} storages={storages} formController={control} formFields={fields} formRegister={register} item={item} key={`row[${key}]`} index={key} removeItemHandler={removeItem} onContextMenu={onContextMenu} analyses={analyses} users={users}/>
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{padding: ".6rem 0"}}>
                <Button type="submit" variant="contained">Save</Button>
              </div>
            </form>
        </div>
        <div onMouseLeave={handleContextMenu}>
          <List disablePadding sx={{backgroundColor: "primary.main", borderRadius: ".2rem", zIndex: "2000", position: "absolute", top: `${createState.mouseCoordinates.y}px`, left: `${createState.mouseCoordinates.x}px`, display: createState.contextMenuOpen ? "block" : "none"}}>
            <ListItemButton onClick={fillDown}>Fill down</ListItemButton>
            <ListItemButton>Fill down</ListItemButton>
            <ListItemButton>Fill down</ListItemButton>
          </List>
        </div>
        <Snackbar open={createState.submit.openToast} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} variant="filled" severity={createState.submit.isError ? "error" : "success"} sx={{ width: '100%' }}>
            {createState.submit.feedback}
          </Alert>
        </Snackbar>
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

  const user = await fetch(`${process.env.REACT_APP_URL_API}/v1/user`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN_API}`
    }
  })

  const storage = await fetch(`${process.env.REACT_APP_URL_API}/v1/storage`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN_API}`
    }
  })

  const storages = await storage.json().then(json => {
    return pluck(['id', 'name'], json).map(i => {
      i['label'] = i['name']
      i['value'] = i['id']
      delete i['name']
      delete i['id']

      return i
    })
  })

  const users = await user.json().then(json => {
    return pluck(['id', 'name'], json).map(i => {
      i['label'] = i['name']
      i['value'] = i['id']
      delete i['name']
      delete i['id']

      return i
    })
  })


  const analyses = await analysis.json().then(json => {
    return pluck(['id', 'name', 'sample_type'], json).map(i => {
      i['label'] = i['name']
      i['value'] = i['id']
      delete i['name']
      delete i['id']

      return i
    })
  })

  return {
    props: {
      analyses,
      users,
      storages
    }
  }
}

export default Create