import React, { memo } from "react";
import { useForm, SubmitHandler, useFieldArray, UseFormRegister, FieldArrayWithId } from "react-hook-form";
import { Autocomplete, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DivContentTable, DivLikeRow } from "../../Helpers/StyledTags";
import { GenericObjectKeyType } from "../../Helpers/TypeHelpers";
import { DeleteOutline } from "@mui/icons-material";
import { GetServerSideProps } from "next";
import { SampleForm } from "../../../pages/samples/create";

interface Inputs {
  externalID: string
  sampleType: string
  received: Date
  receivedBy: number
}

interface SampleCreateProps {
  item: GenericObjectKeyType
  index: number
  formFields: FieldArrayWithId<SampleForm, "sample", "id">[]
  removeItemHandler: (index: number) => void
  // updateItemHandler: (keyIndex: number, fieldName: string, value: string) => void
  onContextMenu: (event: React.MouseEvent, key: number) => void
  analyses: GenericObjectKeyType[]
  formRegister: UseFormRegister<SampleForm>
}

const SampleCreate = ({index, item, removeItemHandler, onContextMenu, analyses, formRegister}: SampleCreateProps) => {
  // const [timer, setTimer] = React.useState(0)
  const sample_types = [
    {label: "Urine", value: "urine"},
    {label: "Blood", value: "blood"}
  ]

  const [ value, setValue ] = React.useState<GenericObjectKeyType>(item)

  function handleChange(event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)
  {
    console.log(event.currentTarget.value)
    setValue({
      ...value,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  function handleSelectChange(event: SelectChangeEvent, child?: React.ReactNode)
  {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    })
  }

  function handleAutoCompleteChange(event: EventTarget, inputName: string, option: {label: string, value: string})
  {
    //@ts-ignore
    // updateItemHandler(index, `sample.${index}.${inputName}`, option.value)
    setValue({
      ...value,
      [inputName]: option.value
    })
  }

  // function callUpdateAfterTimeout()
  // {
  //   let t = setTimeout(() => {
  //     updateItemHandler(value, index)
  //     // setToUpdate(false)
  //   }, 1200, value, index)

  //   // setTimer(t)
  // }

  return (
    <DivLikeRow key={item.id} style={{margin: ".5rem 0", justifyContent: "center", alignItems: "center"}}>
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        <TextField /*onChange={handleChange}*/ {...formRegister(`sample.${index}.external_id` as const)} color="sidebar" /*name={"external_id"}*/ size="small" variant="standard" placeholder="External ID" onContextMenu={(e) => {onContextMenu(e, index)}}/>
      </DivContentTable>
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        {/* <Select color="secondary" {...formRegister(`sample.${index}.sample_type` as const)} defaultValue="" onChange={handleSelectChange} name="sample_type">
            <MenuItem value="" disabled>Select</MenuItem>
            <MenuItem value="urine">Urine</MenuItem>
            <MenuItem value="blood">Blood</MenuItem>
            <MenuItem value="plasma">Plasma</MenuItem>
          </Select> */}
          <Autocomplete
            disablePortal
            size='small'
            options={sample_types}
            // getOptionLabel={(option) => option['label']}
            onChange={(e, option) => handleAutoCompleteChange(e.target, "sample_type", option)} 
            fullWidth
            // renderOption={(option, state) => {
            //   console.log(state)
            //   return  <>{option.value}</>
            // }}
            renderInput={(params) => <TextField {...params} {...formRegister(`sample.${index}.sample_type` as const)} label="" />}
            noOptionsText="Criteria did not return results"
          />
      </DivContentTable>
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        <Autocomplete
            disablePortal
            size='small'
            options={value.sample_type != '' ? analyses.filter(x => x['sample_type'].toLowerCase() == value.sample_type.toLowerCase()) : analyses}
            // options={analyses.sort((a: GenericObjectKeyType, b: GenericObjectKeyType) => b['sample_type'].localeCompare(a['sample_type']))}
            // getOptionLabel={(option) => option['label']}
            groupBy={(option: GenericObjectKeyType) => option['sample_type']}
            fullWidth
            renderInput={(params) => <TextField {...params} {...formRegister(`sample.${index}.analysis` as const)} label="" />}
            noOptionsText="Criteria did not return results"
          />
      </DivContentTable>
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        <FormControl size="small" fullWidth>
          <InputLabel color="text">Customer</InputLabel>
          <Select color="secondary" defaultValue="">
            <MenuItem value="" disabled>Select</MenuItem>
            <MenuItem value="urine">Urine</MenuItem>
            <MenuItem value="blood">Blood</MenuItem>
            <MenuItem value="plasma">Plasma</MenuItem>
          </Select>
        </FormControl>
      </DivContentTable>
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        <TextField color="sidebar"  type="date" size="small" variant="standard" placeholder="Date received"/>
      </DivContentTable>
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        <FormControl size="small" fullWidth>
          <InputLabel color="text">Received by</InputLabel>
          <Select color="secondary" defaultValue="">
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
          <Select color="secondary" defaultValue="">
            <MenuItem value="" disabled>Select</MenuItem>
            <MenuItem value="urine">Urine</MenuItem>
            <MenuItem value="blood">Blood</MenuItem>
            <MenuItem value="plasma">Plasma</MenuItem>
          </Select>
        </FormControl>
      </DivContentTable>
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        <TextField color="sidebar"  type="date" size="small" variant="standard" placeholder="Collected"/>
      </DivContentTable>
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        <FormControl size="small" fullWidth>
          <InputLabel color="text">Collected by</InputLabel>
          <Select color="secondary" defaultValue="">
            <MenuItem value="" disabled>Select</MenuItem>
            <MenuItem value="urine">Urine</MenuItem>
            <MenuItem value="blood">Blood</MenuItem>
            <MenuItem value="plasma">Plasma</MenuItem>
          </Select>
        </FormControl>
      </DivContentTable>
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        <TextField color="sidebar"  type="date" size="small" variant="standard" placeholder="Date received"/>
      </DivContentTable>
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        <FormControl size="small" fullWidth>
          <InputLabel color="text">Received by</InputLabel>
          <Select color="secondary" defaultValue="">
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
          <Select color="secondary" defaultValue="">
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
          <Select color="secondary" defaultValue="">
            <MenuItem value="" disabled>Select</MenuItem>
            <MenuItem value="urine">Urine</MenuItem>
            <MenuItem value="blood">Blood</MenuItem>
            <MenuItem value="plasma">Plasma</MenuItem>
          </Select>
        </FormControl>
      </DivContentTable>
      {/* <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        <IconButton onClick={() => removeItemHandler(index)}>
          <DeleteOutline/>
        </IconButton>
      </DivContentTable> */}
    </DivLikeRow>
  )
}

export default memo(SampleCreate)