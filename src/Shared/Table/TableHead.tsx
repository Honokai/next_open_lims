import { ArrowDownward } from "@mui/icons-material"
import { Checkbox, IconButton } from "@mui/material"
import { useTable } from "../../contexts/useTable"
import { BaseColumn } from "../../Helpers/BaseColumn"
import { DivLikeThead, DivContentTable } from "../../Helpers/StyledTags"
import { DataFieldType } from "../../Helpers/TypeHelpers"

interface TableHeadProps {
  columnHeaders: DataFieldType[]
  sortable?: boolean
  showCheckbox?: boolean
  checkBoxHandler?: (event: React.ChangeEvent<HTMLInputElement>, all?: 'check'|'uncheck') => void
  orderingHandler?: (columnName: string) => void
}

export const TableHead = ({ showCheckbox, checkBoxHandler, sortable, orderingHandler, columnHeaders }: TableHeadProps) => {
  const {tableContextState, handleCheckbox, ordering} = useTable()
  return (
    <DivLikeThead>
      {
        showCheckbox ? (
          <div>
            <Checkbox
              key={`all`}
              value={tableContextState.checkAll}
              onChange={(e) => {
                handleCheckbox(e, tableContextState.checkAll ? 'uncheck' : 'check')
              }
              }
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        ): ""
      }
      {
        columnHeaders?.map((columnName) => {
          return (
            <DivContentTable key={columnName.field}>
              {columnName.display}
              {
                sortable && (
                  <IconButton disableRipple 
                    component="label"
                    key={`${columnName.field}[button]`}
                    size="small" onClick={() => {
                      if (ordering)
                        ordering(columnName.field)
                      }}
                  >
                    <ArrowDownward/>
                  </IconButton>
                )
              }
            </DivContentTable>
          )
        })
      }
      </DivLikeThead>
  )
}