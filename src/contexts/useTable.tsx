import { useRouter } from "next/router";
import React from "react"
import { conditionalComparison, shouldOrder } from "../Helpers/Functions";
import { dataListType, GenericObjectKeyType, OrderingProps, ProviderProps, TableContextProps, TableContextStateProps } from "../Helpers/TypeHelpers";

export const TableContext = React.createContext<TableContextProps>({} as TableContextProps)

export const TableContextProvider = ({ children }: ProviderProps) => {
  const [ loading, setLoading ] = React.useState(false)
  const [ tableData, setTableData ] = React.useState<dataListType>({list: [], filteredList: [], new: []})
  const [ tableContextState,setTableContextState ] = React.useState<TableContextStateProps>({loading: false, checkAll: false, checkBoxes: {} as GenericObjectKeyType, search: {} as GenericObjectKeyType, condition: {} as GenericObjectKeyType, ordering: {column: '', order: 'asc'}})
  const router = useRouter()

  React.useEffect(() => {
    if(Object.keys(tableContextState.search).length) {
      let dataCopy: Object[] = []

      Object.assign(dataCopy, tableData.list)

      let filters = Object.entries(tableContextState.search).filter(x => x[1] !== '')
      let filtersCount = filters.length
      if (filtersCount > 0) {
        let dataFiltered = dataCopy.filter((item: GenericObjectKeyType) => {
          let c = filters.filter((val) => {
            return conditionalComparison([item[val[0]], val[1]], tableContextState.condition[val[0]])
          })

          return c.length === filtersCount ? true : false
        })

        setTableData({
            ...tableData,
            filteredList: dataFiltered
        })
      } else {
        setTableData({
          ...tableData,
          filteredList: dataCopy
        })
      }

     setTableContextState({...tableContextState, loading: false})
    }
  }, [tableContextState.search])

  React.useEffect(() => {
    if (tableContextState.ordering.column !== '') {
      setTableData({
        ...tableData,
        filteredList: shouldOrder(tableData.filteredList, tableContextState.ordering.column, tableContextState.ordering.order)
      })
    }
  }, [tableContextState.ordering])

  function ordering(colunaOrdenada: string)
  {
    setTableContextState({...tableContextState,
      ordering: {
        column: colunaOrdenada,
        order: tableContextState.ordering.order !== 'asc' ? 'asc' : 'desc'
      }
    })
  }

  function handleCheckbox(event: React.ChangeEvent<HTMLInputElement>, all?: 'check'|'uncheck') {
    if (event && !all) {
      setTableContextState({
        ...tableContextState,
        checkBoxes: {
          ...tableContextState.checkBoxes,
          [event.currentTarget.id]: event.currentTarget.checked}
      })
    } else {
      let checkBoxesCopy = Object.assign({}, tableContextState.checkBoxes)

      let allCheckBoxes: NodeListOf<HTMLInputElement>  = document.querySelectorAll("input[type='checkbox'][id]")
      allCheckBoxes.forEach((item) => {
        checkBoxesCopy[item.id] = all === 'uncheck' ? false : true
      })

     setTableContextState({
        ...tableContextState,
        checkAll: !tableContextState.checkAll,
        checkBoxes: checkBoxesCopy
      })
    }
  }

  function handleInputSearch(e: string[]) {
    setTableContextState({
      ...tableContextState,
      search: {
        ...tableContextState.search,
        [e[0]]: e[1],
      },
      condition: {
        ...tableContextState.condition,
        [e[0]]:e[1] !== '' ? e[2] : ''
      }
    })
  }

  function handleDataAddition(dataAdded?: string[])
  {
    let o = Object.assign({}, tableData)

    let b = {}
    let t: Object[] = []

    // dataAdded.forEach((val) => {
    //   Object.assign(b, {[val]: ""})
    // })

    // t = t.concat(tableData).concat(b)

    // setTableData(t)
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
        }
      }
    )
  }

  function loadTableData(d: Array<Object>)
  {
    setTableData({...tableData, filteredList: d, list: d})
  }

  function editableHandler(idItem: number, column: string, value: string, createNew?: boolean)
  {
    console.log(idItem, column, value, createNew)
  }

  return(
      <TableContext.Provider value={{setLoading, loading, tableData, handleCheckbox, tableContextState, checkboxes: tableContextState.checkBoxes, handleInputSearch, ordering, loadTableData}}>
        {children}
      </TableContext.Provider>
  )
}

export const useTable = () => {
  const context = React.useContext(TableContext)

  return context
} 
