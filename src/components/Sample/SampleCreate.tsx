import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DivContentTable, DivLikeRow } from "../../Helpers/StyledTags";
import { GenericObjectKeyType } from "../../Helpers/TypeHelpers";
import { DeleteOutline } from "@mui/icons-material";

interface Inputs {
  externalID: string
  sampleType: string
  received: Date
  receivedBy: number
}

interface SampleCreateProps {
  item: GenericObjectKeyType
  index: number
  removeItemHandler: (index: number) => void
  updateItemHandler: (col: GenericObjectKeyType, key: number) => void
  onContextMenu: (event: React.MouseEvent, key: number) => void
}

const SampleCreate = ({index, item, removeItemHandler, updateItemHandler, onContextMenu}: SampleCreateProps) => {
  // const [timer, setTimer] = React.useState(0)
  const { register } = useForm();
  const { update } = useFieldArray({
    name: 'sample',
    control
  });
  const [ value, setValue ] = React.useState<GenericObjectKeyType>(item)

  React.useEffect(() => {
    // callUpdateAfterTimeout()
  }, [value])

  React.useEffect(() => {
    if (item !== value)
      setValue(item)
  }, [item])

  function handleChange(event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)
  {
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

  function callUpdateAfterTimeout()
  {
    clearTimeout(timer)
    
    let t = setTimeout(() => {
      updateItemHandler(value, index)
    }, 800, value, index)

    setTimer(t)
  }

  return (
    <DivLikeRow style={{margin: ".5rem 0", justifyContent: "center", alignItems: "center"}}>
      <div style={{width: "30px"}}>
        #{index+1}
      </div>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        {/* <input {...register(`sample.${index}.client_document`, { required: true })} size="small" variant="standard" placeholder="Client document" onContextMenu={(e) => {onContextMenu(e, index)}} placeholder="Client document" onContextMenu={(e) => {onContextMenu(e, index)}}/> */}
        <TextField color="sidebar" {...register(`sample.${index}.client_document` as const, { required: true })} name={`sample.${index}.client_document`} size="small" variant="standard" placeholder="Client document" onContextMenu={(e) => {onContextMenu(e, index)}}/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" {...register(`sample.${index}.client_name` as const, { required: true })} size="small" variant="standard" placeholder="Client name"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" {...register(`sample.${index}.client_email` as const, { required: true })} size="small" variant="standard" placeholder="Client email"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" {...register(`sample.${index}.date_received` as const, { required: true })}  type="date" size="small" variant="standard" placeholder="Date received"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" {...register(`sample.${index}.received_by` as const, { required: true })}  size="small" variant="standard" placeholder="Received by"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" {...register(`sample.${index}.date_collected` as const, { required: true })}  size="small" variant="standard" placeholder="Date collected"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" {...register(`sample.${index}.vol_mass` as const, { required: true })} size="small" variant="standard" placeholder="Volume/Mass"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField onContextMenu={(e) => onContextMenu(e, index)} color="sidebar" name="unit"  size="small" variant="standard" placeholder="Unit"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <FormControl size="small" fullWidth>
          <InputLabel color="text" id="demo-simple-select-label">Analysis</InputLabel>
          <Select color="secondary" {...register(`sample.${index}.analysis` as const, { required: true })} name={`sample[${index}]analysis`}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </DivContentTable>
      <DivContentTable>
        <IconButton onClick={() => removeItemHandler(index)}>
          <DeleteOutline/>
        </IconButton>
      </DivContentTable>
    </DivLikeRow>
  )
}

export default SampleCreate