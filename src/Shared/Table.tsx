import { Button, Dialog, DialogTitle, IconButton, List, ListItem, TextField } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import React from "react";
import { conditionalComparison, pluck, shouldOrder, whereIn } from "../Helpers/Functions";
import { dataListType, DataPropsGeneric, GenericObjectKeyType, TableProps, TableStateProps } from "../Helpers/TypeHelpers";
import ButtonLoading from "./ButtonLoading";
import { DivContentTable, DivLikeRow, DivLikeTable, DivLikeTbody} from "../Helpers/StyledTags";
import { TableRow } from "./TableRow";
// import { useNavigate } from "react-router-dom";
import { TableHead } from "./TableHead";
import { TableFilters } from "./TableFilters";
import { useRouter } from "next/router";
import { TableContextProvider, useTable } from "../contexts/useTable";
import { OneK } from "@mui/icons-material";

const Table = ({ rowData, sortable, theme, showCheckbox, entity, editable, searchable }: TableProps) => {
  const {tableData, loadTableData, handleCheckbox, handleInputSearch, tableContextState} = useTable()
  const tableBody = React.useRef<HTMLDivElement|null>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (rowData)
      loadTableData(rowData)
  }, [])

  function editableHandler(idItem: number, column: string, value: string, createNew?: boolean)
  {
    console.log(idItem, column, value, createNew)
    // let d = data.filteredList.forEach(i => {
    //   console.log(i)
    // })
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
      <Button sx={{margin: "0 .3rem"}} onClick={showChecked} variant="contained">Create sample</Button>
      {/* <Button sx={{margin: "0 .3rem"}} onClick={() => handleDataAddition()} variant="contained">Save</Button> */}
      <ButtonLoading/>
      </div>
      <TableHead entity={entity}
        sortable={sortable}
        showCheckbox={showCheckbox}
      />
      { 
        searchable ?
          <TableFilters entity={entity}
            searchable={searchable}
            showCheckbox={showCheckbox}
          /> : <></>
      }
      <DivLikeTbody id="tableBody" ref={tableBody}>
      {
        tableData?.filteredList.length > 0 ?
          pluck(['id', 'sample_type_id', 'internal_id', 'external_id'], tableData.filteredList).map((item: DataPropsGeneric, index) => (
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
      
      <Dialog open={false}>
        <DialogTitle>How many samples?</DialogTitle>
        <List>
          <ListItem sx={{display: "flex", justifyContent: "center"}}>
            <TextField sx={{width: "10rem"}} size="small" defaultValue={"1"} type={"number"}/>
          </ListItem>
          <ListItem sx={{display: "flex", justifyContent: "center"}}>
            <Button variant="contained">OK</Button>
          </ListItem>
        </List>
        
        
      </Dialog>
    </DivLikeTable>
  )
}

export default Table