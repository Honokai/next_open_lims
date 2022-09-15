import { ArrowDownward } from "@mui/icons-material"
import { Checkbox, IconButton } from "@mui/material"
import { BaseColumn } from "../Helpers/BaseColumn"
import { DivLikeThead, DivContentTable } from "../Helpers/StyledTags"

interface TableHeadProps {
  entity: BaseColumn
  sortable?: boolean
  showCheckbox?: boolean
  allCheckboxChecked?: boolean
  checkBoxHandler?: (event: React.ChangeEvent<HTMLInputElement>, all?: 'check'|'uncheck') => void
  orderingHandler?: (columnName: string) => void
}

export const TableHead = ({ showCheckbox, allCheckboxChecked, entity, checkBoxHandler, sortable, orderingHandler }: TableHeadProps) => {
  return (
    <DivLikeThead>
      {
        showCheckbox ? (
          <div>
            <Checkbox
              key={`all`}
              value={allCheckboxChecked}
              onChange={(e) => {
                if (checkBoxHandler !== undefined) {
                  console.log('cliquei no check', allCheckboxChecked)
                  checkBoxHandler(e, allCheckboxChecked ? 'uncheck' : 'check')
                }
              }
              }
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        ): ""
      }
      {
        entity?.getDataFields().map((columnName) => {
          return (
            <DivContentTable key={columnName.field}>
              {columnName.display}
              {
                sortable ? (
                  <IconButton disableRipple 
                    component="label"
                    key={`${columnName.field}[button]`}
                    size="small" onClick={() => {
                      if (orderingHandler)
                        orderingHandler(columnName.field)
                      }}
                  >
                    <ArrowDownward/>
                  </IconButton>
                ) : ""
              }
            </DivContentTable>
          )
        })
      }
      </DivLikeThead>
  )
}