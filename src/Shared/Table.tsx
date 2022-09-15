import { Button } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import React from "react";
import { conditionalComparison, shouldOrder, whereIn } from "../Helpers/Functions";
import { dataListType, DataPropsGeneric, GenericObjectKeyType, TableProps, TableStateProps } from "../Helpers/TypeHelpers";
import ButtonLoading from "./ButtonLoading";
import { DivContentTable, DivLikeRow, DivLikeTable, DivLikeTbody} from "../Helpers/StyledTags";
import { TableRow } from "./TableRow";
// import { useNavigate } from "react-router-dom";
import { TableHead } from "./TableHead";
import { TableFilters } from "./TableFilters";
import { useRouter } from "next/router";

const Table = ({ rowData, sortable, theme, showCheckbox, entity, editable, searchable }: TableProps) => {
  const [ data, setData ] = React.useState<dataListType>({list: rowData ?? [], filteredList: rowData ?? [], new: []})
  const [ componentState, setComponentState ] = React.useState<TableStateProps>({loading: false, checkAll: false, checkBoxes: {} as GenericObjectKeyType, search: {} as GenericObjectKeyType, condition: {} as GenericObjectKeyType, ordering: {column: '', order: 'asc'}})
  const tableBody = React.useRef<HTMLDivElement|null>(null);
  const router = useRouter();

  // React.useEffect(() => {
  //   if(rowData)
  //     setData({...data, list: rowData, filteredList: rowData})
  // }, [rowData])

  React.useEffect(() => {
    if(Object.keys(componentState.search).length) {
      let dataCopy: Object[] = []

      Object.assign(dataCopy, data.list)

      let filters = Object.entries(componentState.search).filter(x => x[1] !== '')
      let filtersCount = filters.length
      if (filtersCount > 0) {
        let dataFiltered = dataCopy.filter((item: GenericObjectKeyType) => {
          let c = filters.filter((val) => {
            return conditionalComparison([item[val[0]], val[1]], componentState.condition[val[0]])
          })

          return c.length === filtersCount ? true : false
        })

        setData({
            ...data,
            filteredList: dataFiltered
        })
      } else {
        setData({
          ...data,
          filteredList: dataCopy
        })
      }

      setComponentState({...componentState, loading: false})
    }
  }, [componentState.search])

  React.useEffect(() => {
    if (componentState.ordering.column !== '') {
      setData({
        ...data,
        filteredList: shouldOrder(data.filteredList, componentState.ordering.column, componentState.ordering.order)
      })
    }
  }, [componentState.ordering])

  function ordering(colunaOrdenada: string)
  {
    setComponentState({...componentState,
      ordering: {
        column: colunaOrdenada,
        order: componentState.ordering.order !== 'asc' ? 'asc' : 'desc'
      }
    })
  }

  function handleCheckBox(event: React.ChangeEvent<HTMLInputElement>, all?: 'check'|'uncheck') {
    console.log('entrei')
    if (event && !all) {
      setComponentState({
        ...componentState,
        checkBoxes: {
          ...componentState.checkBoxes,
          [event.currentTarget.id]: event.currentTarget.checked}
      })
    } else {
      let checkBoxesCopy = Object.assign({}, componentState.checkBoxes)

      let allCheckBoxes: NodeListOf<HTMLInputElement>  = document.querySelectorAll("input[type='checkbox'][id]")
      allCheckBoxes.forEach((item) => {
        checkBoxesCopy[item.id] = all === 'uncheck' ? false : true
      })

      setComponentState({
        ...componentState,
        checkAll: !componentState.checkAll,
        checkBoxes: checkBoxesCopy
      })
    }
  }

  function handleInputSearch(e: string[]) {
    setComponentState({
      ...componentState,
      search: {
        ...componentState.search,
        [e[0]]: e[1],
      },
      condition: {
        ...componentState.condition,
        [e[0]]:e[1] !== '' ? e[2] : ''
      }
    })
  }

  function handleDataAddition(dataAdded?: string[])
  {
    let o = Object.assign({}, data)

    let b = {}
    let t: Object[] = []

    // dataAdded.forEach((val) => {
    //   Object.assign(b, {[val]: ""})
    // })

    // t = t.concat(data).concat(b)

    // setData(t)
  }

  function showChecked()
  {
    let marked: number[] = []
    Object.entries(componentState.checkBoxes).forEach(v => {
      if (v[1] === true)
        marked.push(Number(v[0]))
    })
    
    router.push(
      {
        pathname: '/samples/createv2',
        query: {data: marked}
      }
    )
  }

  function editableHandler(idItem: number, column: string, value: string, createNew?: boolean)
  {
    console.log(idItem, column, value, createNew)
    // let d = data.filteredList.forEach(i => {
    //   console.log(i)
    // })
  }

  return (
    <DivLikeTable>
      <div>
      <Button sx={{margin: "0 .3rem"}} onClick={showChecked} variant="contained">Iniciar</Button>
      <Button sx={{margin: "0 .3rem"}} onClick={() => handleDataAddition()} variant="contained">Save</Button>
      <ButtonLoading/>
      </div>
      <TableHead entity={entity}
        sortable={sortable}
        showCheckbox={showCheckbox}
        allCheckboxChecked={componentState.checkAll}
        checkBoxHandler={showCheckbox ? handleCheckBox : undefined}
        orderingHandler={ordering}
      />
      { 
        searchable ?
          <TableFilters entity={entity}
            searchable={searchable}
            showCheckbox={showCheckbox}
            parentInputSearchHandler={handleInputSearch}
            parentStateValues={componentState}
          /> : <></>
      }
      <DivLikeTbody id="tableBody" ref={tableBody}>
      {
        data.filteredList.length > 0 ?
          data.filteredList.map((item: DataPropsGeneric, index) => (
            <TableRow
              editable={editable}
              key={`row[${index}]`} 
              index={index} item={item} 
              showCheckbox={showCheckbox} 
              handleCheckBox={showCheckbox ? handleCheckBox : undefined} 
              checked={componentState.checkBoxes[`${item['id']}`]}
              contentEditableHandler={editableHandler}
            />
          )) :
          Object.values(componentState.search).filter(x => x !== '').length > 0 && data.list.length > 0 ?
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
          Exibindo {data.filteredList?.length}
        </h5>
      </DivLikeRow>
    </DivLikeTable>
  )
}

export default Table