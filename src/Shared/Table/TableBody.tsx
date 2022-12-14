import Skeleton from '@mui/material/Skeleton';
import React from "react";
import { getValuesFromPropertie, pluck } from "../../Helpers/Functions";
import { DataPropsGeneric, TableProps } from "../../Helpers/TypeHelpers";
import ButtonLoading from "../ButtonLoading";
import { DivContentTable, DivLikeRow, DivLikeTable, DivLikeTbody} from "../../Helpers/StyledTags";
import { TableRow } from "./TableRow";
import { TableHead } from "./TableHead";
import { TableFilters } from "./TableFilters";
import { useRouter } from "next/router";
import { useTable } from "../../contexts/useTable";

const TableBody = ({ rowData, sortable, theme, showCheckbox, entity, editable, searchable, header }: TableProps) => {
  const {tableData, loadTableData, handleCheckbox, handleInputSearch, tableContextState} = useTable()
  const router = useRouter();

  React.useEffect(() => {
    if (rowData) {
      loadTableData(rowData)
    }
  }, [])

  function editableHandler(idItem: number, column: string, value: string, createNew?: boolean)
  {
    console.log(idItem, column, value, createNew)
  }

  function showChecked()
  {
    let marked: number[] = []
    Object.entries(tableContextState.checkBoxes).forEach(v => {
      if (v[1] === true)
        marked.push(Number(v[0]))
    })
    
    router.push(
      {
        pathname: '/samples/createv2',
        query: {
          data: marked
        },
      }, 
      '/samples/createv2'
    )
  }


  return (
    <DivLikeTable>
      <div>
        <ButtonLoading/>
      </div>
      <TableHead
        columnHeaders={header}
        sortable={sortable}
        showCheckbox={showCheckbox}
      />
      { 
        searchable ?
          <TableFilters 
            columns={header}
            searchable={searchable}
            showCheckbox={showCheckbox}
          /> : <></>
      }
      <DivLikeTbody id="tableBody">
      {
        tableData?.filteredList.length > 0 ?
          pluck(getValuesFromPropertie('field', Object.values(header)), tableData.filteredList).map((item: DataPropsGeneric, index) => (
            <TableRow
              editable={editable}
              key={`row[${index}]`} 
              index={index} item={item}
              showCheckbox={showCheckbox}
              contentEditableHandler={editableHandler}
            />
          )) :
          Object.values(tableContextState.search).filter(x => x !== '').length > 0 && tableData.list.length > 0 ?
            <DivContentTable>
              No results to filter
            </DivContentTable> :
            <>
              <Skeleton variant="rectangular" sx={{ fontSize: '2rem', margin: ".3rem 0" }} />
              <Skeleton variant="rectangular" sx={{ fontSize: '2rem', margin: ".3rem 0" }} />
              <Skeleton variant="rectangular" sx={{ fontSize: '2rem', margin: ".3rem 0" }} />
            </>
      }
      </DivLikeTbody>
      <DivLikeRow>
        <h5>
          Exibindo {tableData.filteredList?.length}
        </h5>
      </DivLikeRow>
    </DivLikeTable>
  )
}

export default TableBody