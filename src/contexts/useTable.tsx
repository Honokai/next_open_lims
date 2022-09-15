import React from "react"
import { shouldOrder } from "../Helpers/Functions";
import { dataListType, GenericObjectKeyType, OrderingProps, ProviderProps, TableContextProps } from "../Helpers/TypeHelpers";

export const TableContext = React.createContext<TableContextProps>({} as TableContextProps)

export const TableContextProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = React.useState(false)
  const [ data, setData ] = React.useState<dataListType>({list: [], filteredList: [], new: []})
  const [ checkboxes, setCheckboxes ] = React.useState<GenericObjectKeyType>({checkAll: false});
  const [resultOrdering, setResultOrdering] = React.useState<OrderingProps>({column: '', ordering: 'asc'})
  const [ searchParams, setSearchParams ] = React.useState<GenericObjectKeyType>({search: {}});

  React.useEffect(() => {
    if(Object.keys(searchParams.search).length ) {
      let ob: Object[] = []

      Object.assign(ob, data.list)

      let o = ob.filter((item: GenericObjectKeyType) => {
        let filtersCount = Object.values(searchParams.search).filter(x => x !== '').length

        let c = Object.entries(searchParams.search).filter((val) => {
          return String(item[val[0]]).toLowerCase() === String(val[1]).toLowerCase()
        })

        return c.length === filtersCount ? true : false
      })
      setData({...data, filteredList: o})
      setLoading(false)
    }
  }, [searchParams])

  // React.useEffect(() => {
  //   if (resultOrdering.column !== '') {
  //     setData({
  //       ...data,
  //       filteredList: shouldOrder(data.filteredList, resultOrdering.column, resultOrdering.ordering)
  //     })
  //   }
  // }, [resultOrdering])

  // function handleCheckBox(event: React.ChangeEvent<HTMLInputElement>, all = false) {
  //   event && !all ? setCheckboxes({
  //     ...checkboxes,
  //     [event.currentTarget.id]: event.currentTarget.checked
  //   }) : setCheckboxes({
  //     ...checkboxes,
  //     checkAll: event.currentTarget.checked
  //   })
  // }

  function loadSearchParams(filters: Object)
  {
    setSearchParams(filters)
  }

  function loadData(d: Array<Object>)
  {
    setData({...data, filteredList: d, list: d})
  }

  function ordering(colunaOrdenada: string)
  {
    setResultOrdering({
      column: colunaOrdenada,
      ordering: resultOrdering.ordering !== 'asc' ? 'asc' : 'desc'
    })
  }

  function handleDataAddition(dataAdded: string[])
  {
    // let b = {}
    // let t: Object[] = []

    // dataAdded.forEach((val) => {
    //   Object.assign(b, {[val]: ""})
    // })

    // t = t.concat(data).concat(b)

    // setData(t)
  }

  // function handleInputSearch(event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
  //   setSearchParams({
  //     ...searchParams,
  //     search: {
  //       ...searchParams.search,
  //       [event.target.name]: event.target.value
  //     }
  //   })
  // }

  return(
      <TableContext.Provider value={{setLoading, loading, data, checkboxes, searchParams, loadSearchParams, ordering, loadData}}>
        {children}
      </TableContext.Provider>
  )
}

export const useTable = () => {
  const context = React.useContext(TableContext)

  return context
} 
