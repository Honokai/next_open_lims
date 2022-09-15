import { DivLikeThead, DivContentTable } from "../Helpers/StyledTags"
import { TableFiltersProps } from "../Helpers/TypeHelpers"
import { InputFilter } from "./InputsFilter"

export const TableFilters = ({searchable, entity, showCheckbox, parentInputSearchHandler, parentStateValues}: TableFiltersProps) => {
  return (
    <DivLikeThead>
      {
        showCheckbox ? (
          <div></div>
        ): ""
      }
      {
        entity.getDataFields().map((columnName) => {
          if(columnName.showFilter) {
            return (
              <InputFilter
                selectValue={parentStateValues.condition[columnName.field] ?? ""}
                inputValue={parentStateValues.search[columnName.field] ?? ""}
                parentChangeHandler={(e) => {
                  if(parentInputSearchHandler)
                    parentInputSearchHandler(e)
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