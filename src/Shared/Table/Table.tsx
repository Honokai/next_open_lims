import { Button, Dialog, DialogTitle, List, ListItem, Modal, Paper, TextField } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import React from "react";
import { pluck } from "../Helpers/Functions";
import { DataPropsGeneric, TableProps } from "../Helpers/TypeHelpers";
import ButtonLoading from "./ButtonLoading";
import { DivContentTable, DivLikeRow, DivLikeTable, DivLikeTbody} from "../Helpers/StyledTags";
import { TableRow } from "./TableRow";
import { TableHead } from "./TableHead";
import { TableFilters } from "./TableFilters";
import { useRouter } from "next/router";
import { useTable } from "../contexts/useTable";
import { Box } from "@mui/system";

const Table = ({ rowData, sortable, theme, showCheckbox, entity, editable, searchable }: TableProps) => {
  const {tableData, loadTableData, handleCheckbox, handleInputSearch, tableContextState} = useTable()
  const [tableState, setTableState] = React.useState({dialogOpen: false, createSampleModalOpen: false, sampleQuantity: 1})
  const router = useRouter();

  React.useEffect(() => {
    if (rowData) {
      loadTableData(rowData)
    }
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

  function handleSampleQuantityDialog(shouldOpenSampleModal?: boolean)
  {
    if(shouldOpenSampleModal)
      setTableState({...tableState, dialogOpen: !tableState.dialogOpen, createSampleModalOpen: !tableState.createSampleModalOpen})
    else
      setTableState({...tableState, dialogOpen: !tableState.dialogOpen})
  }

  function handleModalSample()
  {
    setTableState({...tableState, createSampleModalOpen: !tableState.createSampleModalOpen})
  }

  function inputHandler(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)
  {
    if(Number(e.currentTarget.value) <= 15)
      setTableState({...tableState, sampleQuantity: Number(e.currentTarget.value)})
  }

  return (
    <DivLikeTable>
      <div>
        <Button sx={{margin: "0 .3rem"}} onClick={() => handleSampleQuantityDialog()} variant="contained">Create sample</Button>
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
      <DivLikeTbody id="tableBody">
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
      
      <Dialog open={tableState.dialogOpen} transitionDuration={100}>
        <DialogTitle>How many samples?</DialogTitle>
        <List>
          <ListItem sx={{display: "flex", justifyContent: "center"}}>
            <TextField 
              sx={{width: "10rem"}}
              size="small"
              onChange={inputHandler}
              value={tableState.sampleQuantity}
              type={"number"} InputProps={{ inputProps: { min: 0, max: 10 } }}
            />
          </ListItem>
          <ListItem sx={{display: "flex", justifyContent: "center"}}>
            <Button variant="contained" onClick={() => handleSampleQuantityDialog(true)}>OK</Button>
          </ListItem>
        </List>
      </Dialog>
      <Modal
        open={tableState.createSampleModalOpen}
        onClose={handleModalSample}
        sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box component={Paper} sx={{ width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </Box>
      </Modal>
    </DivLikeTable>
  )
}

export default Table