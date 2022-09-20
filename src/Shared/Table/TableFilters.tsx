import { useTable } from "../../contexts/useTable"
import { DivLikeThead, DivContentTable } from "../../Helpers/StyledTags"
import { TableFiltersProps } from "../../Helpers/TypeHelpers"
import { InputFilter } from "../InputsFilter"

export const TableFilters = ({searchable, columns, showCheckbox}: TableFiltersProps) => {
  const {tableContextState, handleInputSearch} = useTable()
  return (
    <DivLikeThead>
      {
        showCheckbox ? (
          <div></div>
        ): ""
      }
      {
        columns.map((columnName) => {
          if(columnName.showFilter) {
            return (
              <InputFilter
                selectValue={tableContextState.condition[columnName.field] ?? ""}
                inputValue={tableContextState.search[columnName.field] ?? ""}
                parentChangeHandler={(e) => {
                  if(handleInputSearch)
                    handleInputSearch(e)
                  }
                } 
                key={`inputFilter[${columnName.field}]`}
                columnName={columnName}
              />
            )
          } else {
            return <div key={`inputFilter[${columnName.field}]`} style={{flex: "2 2 0px"}}></div>
          }
        })
      }
    </DivLikeThead>
  )
}