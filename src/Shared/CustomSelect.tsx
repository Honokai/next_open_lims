import React from 'react';
import { Control, Controller, Noop } from 'react-hook-form';
import Select from 'react-select';
import { SampleForm } from '../../pages/samples/create';

interface CustomSelectProps {
  selectOptions: Array<{value: string, label: string, sample_type?: string}>
  placeholder: string
  formControl: Control<SampleForm, any>
  indexInput: number
  name: string
}

export const CustomSelect = ({selectOptions, placeholder, formControl, name}: CustomSelectProps) => {
  return (
    <Controller
      //@ts-ignore
      name={name}
      control={formControl}
      render={({ field: { value, onChange, onBlur } }) => {
        return (
          <Select
            options={selectOptions}
            placeholder={placeholder}
            menuPortalTarget={document.body}
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999, color: "black" }) }}
            onChange={ (option) => onChange(option?.value) }
            onBlur={onBlur}
            value={selectOptions.filter((option) => value === option.value)}
            defaultValue={selectOptions.filter((option) =>
              value === option.value
            )}
          />
        );
      }}
    />
  )
}