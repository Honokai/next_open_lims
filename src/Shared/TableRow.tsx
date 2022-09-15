import { Checkbox, TextField } from "@mui/material"
import React, { MouseEventHandler } from "react"
import { DivContentTable, DivLikeRow } from "../Helpers/StyledTags"
import { DataPropsGeneric } from "../Helpers/TypeHelpers"

interface RowProps {
  showCheckbox?: boolean
  index: number
  item: DataPropsGeneric
  editable?: boolean
  checked?: boolean
  handleCheckBox?: (e: React.ChangeEvent<HTMLInputElement>) => void
  contentEditableHandler?: (id: number, column: string, value: string, createNew?: boolean) => void
}

export const TableRow = ({showCheckbox, index, item, handleCheckBox, checked, editable, contentEditableHandler}: RowProps) => {
  const [dataEditable, setDataEditable] = React.useState({column: "", value: ""})
  const [timer, setTimer] = React.useState(0)

  function onDoubleClick(p: string, val: string)
  {
    setDataEditable({column: p, value: val})
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
  {
    setDataEditable({...dataEditable, value: e.target.value})
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>, id: number)
  {
    console.log('iiii')
    if (contentEditableHandler !== undefined) {
      if (id > 0) {
        clearTimeout(timer)
  
        let t = setTimeout(() => {
          contentEditableHandler(id, dataEditable.column, dataEditable.value)
          setDataEditable({column: "", value: ""})
        }, 1000, e)
    
        setTimer(t)
      } else if (id === -1) {
        clearTimeout(timer)
  
        let t = setTimeout(() => {
          contentEditableHandler(id, dataEditable.column, dataEditable.value, true)
          setDataEditable({column: "", value: ""})
        }, 1000, e)
    
        setTimer(t)
      }
      
    }
  }

  return (
    <DivLikeRow>
      {
        showCheckbox ? (
          <DivContentTable style={{flex: 1}}>
            <Checkbox
              disableRipple
              key={`checkbox[${index}]`}
              id={`${item['id']}`}
              value={item['id']}
              checked={checked ?? false}
              onChange={(e) => {
                if(handleCheckBox)
                  handleCheckBox(e)
                }
              }
              inputProps={{ 'aria-label': 'controlled' }}
            />  
          </DivContentTable>
        ) : ""
      }
      {
        Object.entries(item).map((v, i) => {
          if (dataEditable.column === v[0]) {
            return (
              <DivContentTable key={`rowContent[${index}][${i}]`} id={`${v[0]}[${item.id ?? index}][${i}]`}>
                <TextField
                  size="small"
                  hiddenLabel
                  value={dataEditable.value ?? v[0]}
                  onChange={(e) => onChange(e)}
                  onBlur={(e) => onBlur(e, item.id ? Number(item.id) : -1)}
                />
              </DivContentTable>
            )
          } else {
            return (
              <DivContentTable onDoubleClick={(e) => onDoubleClick(v[0], e.currentTarget.innerHTML)} key={`rowContent[${index}][${i}]`} id={`${v[0]}[${item.id}][${i}]`}>
                {v[1]}
              </DivContentTable>
            )
          }
        })
      }
    </DivLikeRow>
  )
}