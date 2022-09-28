import React, { memo } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Autocomplete, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DivContentTable, DivLikeRow } from "../../Helpers/StyledTags";
import { GenericObjectKeyType } from "../../Helpers/TypeHelpers";
import { DeleteOutline } from "@mui/icons-material";
import { GetServerSideProps } from "next";

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
  analyses: GenericObjectKeyType[]
}

const SampleCreate = ({index, item, removeItemHandler, updateItemHandler, onContextMenu, analyses}: SampleCreateProps) => {
  const [timer, setTimer] = React.useState(0)
  const [toUpdate, setToUpdate] = React.useState(false)
  const sample_types = [
    {label: "Urine", id: "urine"},
    {label: "Blood", id: "blood"}
  ]

  const [ value, setValue ] = React.useState<GenericObjectKeyType>(item)

  React.useEffect(() => {
    setTimer(0)
    clearTimeout(timer)
    setToUpdate(true)
    callUpdateAfterTimeout()
  }, [value])

  React.useEffect(() => {
    if(item !== value)
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
    let t = setTimeout(() => {
      updateItemHandler(value, index)
      setToUpdate(false)
    }, 1200, value, index)

    setTimer(t)
  }

  return (
    <DivLikeRow key={item.id} style={{backgroundColor: (toUpdate ? "gray" : "inherit"), margin: ".5rem 0", justifyContent: "center", alignItems: "center"}}>
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        <TextField value={value.external_id ? value.external_id : ""} onChange={handleChange} color="sidebar" name={"external_id"} size="small" variant="standard" placeholder="External ID" onContextMenu={(e) => {onContextMenu(e, index)}}/>
      </DivContentTable>
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
          <Autocomplete
            disablePortal
            size='small'
            id="combo-box-demo"
            options={sample_types}
            getOptionLabel={(option) => option['label']}
            fullWidth
            renderInput={(params) => <TextField {...params} value={value.sample_type ? value.sample_type : ""} label="" />}
            noOptionsText="Criteria did not return results"
          />
      </DivContentTable>
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        <Autocomplete
            disablePortal
            size='small'
            id="combo-box-demo"
            options={analyses.filter(x => x['sample_type'] == value.sample_type)}
            // options={analyses.sort((a: GenericObjectKeyType, b: GenericObjectKeyType) => b['sample_type'].localeCompare(a['sample_type']))}
            // getOptionLabel={(option) => option['label']}
            // groupBy={(option: GenericObjectKeyType) => option['sample_type']}
            fullWidth
            renderInput={(params) => <TextField {...params} label="" />}
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
      <DivContentTable style={{ justifyContent: "center", padding: ".6rem", wordBreak: "break-word"}}>
        <IconButton onClick={() => removeItemHandler(index)}>
          <DeleteOutline/>
        </IconButton>
      </DivContentTable>
    </DivLikeRow>
  )
}

export default memo(SampleCreate)