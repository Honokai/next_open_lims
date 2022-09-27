import React from "react";
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
  handleTest: (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, keyzndex: number) => void
}

const SampleCreate = ({index, item, removeItemHandler, updateItemHandler}: SampleCreateProps) => {
  const [timer, setTimer] = React.useState(0)
  const [ value, setValue ] = React.useState<GenericObjectKeyType>(item)

  React.useEffect(() => {
    callUpdateAfterTimeout()
  }, [value])

  React.useEffect(() => {
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
    }, 600, value, index)

    setTimer(t)
  }

  return (
    <DivLikeRow style={{margin: ".5rem 0", justifyContent: "center", alignItems: "center"}}>
      #{index+1}
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" name="client_document" onChange={(e) => handleChange(e)} value={value.client_document ? value.client_document : ""} size="small" variant="standard" placeholder="Client document" onContextMenu={(e) => {e.preventDefault(); alert("toma esse alerta")}}/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" name="client_name" onChange={(e) => handleChange(e)} value={value.client_name ? value.client_name : ""} size="small" variant="standard" placeholder="Client name"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" name="client_email" onChange={(e) => handleChange(e)} value={value.client_email ? value.client_email : ""} size="small" variant="standard" placeholder="Client email"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" name="date_received" onChange={(e) => handleChange(e)} value={value.date_received ? value.date_received : ""} type="date" size="small" variant="standard" placeholder="Date received"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" name="received_by" onChange={(e) => handleChange(e)} value={value.received_by ? value.received_by : ""} size="small" variant="standard" placeholder="Received by"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" name="date_collected" onChange={(e) => handleChange(e)} type="date" value={value.date_collected ? value.date_collected : ""} size="small" variant="standard" placeholder="Date collected"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" name="vol_mass" onChange={(e) => handleChange(e)} value={value.vol_mass ? value.vol_mass : ""} size="small" variant="standard" placeholder="Volume/Mass"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <TextField color="sidebar" name="unit" onChange={(e) => handleChange(e)} value={value.unit ? value.unit : ""} size="small" variant="standard" placeholder="Unit"/>
      </DivContentTable>
      <DivContentTable style={{margin: "0 .8rem", wordBreak: "break-word"}}>
        <FormControl size="small" fullWidth>
          <InputLabel color="text" id="demo-simple-select-label">Analysis</InputLabel>
          <Select color="secondary" name="analysis" onChange={(e) => handleSelectChange(e)} size="small" value={value.analysis ? value.analysis : ""}>
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