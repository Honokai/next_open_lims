import React, { memo } from "react";
import Select from 'react-select'
import { UseFormRegister, FieldArrayWithId, Controller, Control, FieldErrorsImpl } from "react-hook-form";
import {InputAdornment, TextField, Tooltip } from "@mui/material";
import { GenericObjectKeyType } from "../../Helpers/TypeHelpers";
import { SampleForm } from "../../../pages/samples/create";
import { CustomSelect } from "../../Shared/CustomSelect";
import { WarningAmber, WarningOutlined } from "@mui/icons-material";

interface Inputs {
  externalID: string
  sampleType: string
  received: Date
  receivedBy: number
}

interface SampleCreateProps {
  item: GenericObjectKeyType
  index: number
  formFields: FieldArrayWithId<SampleForm, "samples", "id">[]
  formErrors: FieldErrorsImpl<{
      samples: {
          externalId: string;
          sample_type: string;
          tests: string;
          customer_id: string;
          received_date: string;
          received_by_id: string;
          storage_id: string;
          collected_date: string;
          collected_by_id: string;
          value_unit: string;
          measurement_unit: string;
          discarded: string;
          discarded_by_id: string;
      }[];
  }>
  removeItemHandler: (index: number) => void
  onContextMenu: (event: React.MouseEvent, key: number, fieldName: string) => void
  analyses: GenericObjectKeyType[]
  users: {value: string, label: string}
  storages: GenericObjectKeyType[]
  formRegister: UseFormRegister<SampleForm>
  formController: Control<SampleForm, any>
}

const SampleRowCreate = ({index, item, removeItemHandler, onContextMenu, analyses, formRegister, users, formController, storages, formErrors}: SampleCreateProps) => {
  // const [timer, setTimer] = React.useState(0)
  const sampleTypes = [
    {label: "Urine", value: "Urine"},
    {label: "Blood", value: "Blood"}
  ]
  const unitMeasurements = [
    {label: 'µg', value: 'µg'},
    {label: 'ng', value: 'ng'},
    {label: 'mg', value: 'mg'},
    {label: 'g', value: 'g'},
    {label: 'µL', value: 'µL'},
    {label: 'nL', value: 'nL'},
    {label: 'mL', value: 'mL'},
    {label: 'L', value: 'L'},
    {label: 'un', value: 'un'},
    {label: 'box', value: 'box'},
    {label: 'kit', value: 'kit'}
  ]

  const [ rowValue, setRowValue ] = React.useState<GenericObjectKeyType>(item)

  function handleChange(event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)
  {
    console.log(event.currentTarget.value)
    setRowValue({
      ...rowValue,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  function handleSelectChange(fieldName: string, value: string)
  {
    setRowValue({
      ...rowValue,
      [fieldName]: value
    })
  }

  return (
    <tr>
      <td style={{minWidth: "170px", maxWidth: "170px"}}>
        <TextField 
          {...formRegister(`samples.${index}.externalId` as const, { required: "This field is required"})}
          InputProps={{
            endAdornment: formErrors.samples && formErrors.samples[index]?.externalId?.message ? (
              <InputAdornment position="end">
                <Tooltip title={formErrors.samples[index]?.externalId?.message ?? ""} placement="top">
                  <WarningAmber/>
                </Tooltip>
              </InputAdornment>
            ) : "",
          }}
          error={formErrors.samples && formErrors.samples[index]?.externalId?.message ? true : false}
          size="small" variant="outlined" placeholder="External ID" onContextMenu={(e) => {onContextMenu(e, index, 'externalId')}}
        />
      </td>
      <td style={{minWidth: "170px", maxWidth: "170px"}} >
        <Controller
          name={`samples.${index}.sample_type`}
          control={formController}
          render={({ field: { value, onChange, onBlur } }) => {
            return (
              <Select
                options={sampleTypes}
                isClearable
                placeholder={"Sample..."}
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999, color: "black"}) }}
                onChange={ (option) => {
                  handleSelectChange('sample_type', option?.value ?? "")
                  onChange(option?.value ?? "")
                }}
                onBlur={onBlur}
                value={sampleTypes.filter((option) => value === option.value)}
                defaultValue={sampleTypes.filter((option) =>
                  value === option.value
                )}
              />
            );
          }}
        />
      </td>
      <td style={{minWidth: "170px", maxWidth: "170px"}} >
        <Controller
          name={`samples.${index}.tests`}
          control={formController}
          render={({ field: { value, onChange, onBlur } }) => {
            return (
              <Select
                options={rowValue['sample_type'] ? analyses.filter( i => rowValue['sample_type'].toLowerCase() == i.sample_type.toLowerCase()) : analyses}
                isDisabled={rowValue['sample_type'] ? false : true}
                placeholder={"Analyses..."}
                isMulti
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999, color: "black" }) }}
                onChange={ (options) => {
                  console.log(options?.map((option) => option.value))
                  onChange(options?.map((option) => option.value))
                } }
                onBlur={onBlur}
                value={ analyses.filter((option) => value?.includes(option.value)) }
                defaultValue={ analyses.filter((option) => value?.includes(option.value)) }
              />
            );
          }}
        />
      </td>
      <td style={{minWidth: "170px", maxWidth: "170px"}} >
        <CustomSelect name={`samples.${index}.customer_id`} formControl={formController} indexInput={index} selectOptions={users}  placeholder="Customer"/>
      </td>
      <td style={{minWidth: "170px", maxWidth: "170px"}} >
        <input type="date" style={{padding: ".5rem .3rem", width: "100%", fontFamily: "inherit", border: "1px solid rgb(118, 118, 118)", outline: 'none', borderRadius: ".2rem"}} {...formRegister(`samples.${index}.received_date`)}/>
      </td>
      <td style={{minWidth: "170px", maxWidth: "170px"}} >
        <CustomSelect name={`samples.${index}.received_by_id`} formControl={formController} indexInput={index} selectOptions={users}  placeholder="Received by"/>
      </td>
      <td style={{minWidth: "170px", maxWidth: "170px"}} >
        <CustomSelect name={`samples.${index}.storage_id`} formControl={formController} indexInput={index} selectOptions={storages}  placeholder="Collected by"/>
      </td>
      <td style={{minWidth: "170px", maxWidth: "170px"}}>
        <input type="date" style={{padding: ".5rem .3rem", width: "100%", fontFamily: "inherit", border: "1px solid rgb(118, 118, 118)", outline: 'none', borderRadius: ".2rem"}} {...formRegister(`samples.${index}.collected_date` as const)}/>
      </td>
      <td style={{minWidth: "170px", maxWidth: "170px"}}>
        <CustomSelect
          name={`samples.${index}.collected_by_id`}
          formControl={formController} indexInput={index}
          selectOptions={users} placeholder="Collected by"
        />
      </td>
      <td style={{minWidth: "170px", maxWidth: "170px"}}>
        <TextField
          type="number"
          size="small" variant="outlined"
          {...formRegister(`samples.${index}.value_unit`, { required: "This field is required" })}
          InputProps={{
            endAdornment: formErrors.samples && formErrors.samples[index]?.value_unit?.message ? (
              <InputAdornment position="end">
                <Tooltip title={formErrors.samples[index]?.value_unit?.message ?? ""} placement="top">
                  <WarningAmber/>
                </Tooltip>
              </InputAdornment>
            ) : "",
          }}
          error={formErrors.samples && formErrors.samples[index]?.value_unit?.message ? true : false}
        />
      </td>
      <td style={{minWidth: "170px", maxWidth: "170px"}} >
        <CustomSelect name={`samples.${index}.measurement_unit`} formControl={formController} indexInput={index} selectOptions={unitMeasurements}  placeholder="Measurent unit"/>
      </td>
    </tr>
  )
}

export default memo(SampleRowCreate)