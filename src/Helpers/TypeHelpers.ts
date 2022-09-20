import { BaseColumn } from "./BaseColumn"
import { SetorColumn } from "./SetorColumn"

export interface UserProps {
  id: number
  name: string
  email: string
}
export interface textFieldInterface {
  value: string|""
  type?: string
  invalid: boolean
  errorMessage: string|null
}

export interface GenericObjectKeyType {
  [key: string]: any
}

export interface OrderingProps {
  column: string
  ordering: string
}

export interface TableContextProps {
  loading: boolean
  tableData: dataListType
  checkboxes: GenericObjectKeyType
  tableContextState: TableContextStateProps
  handleInputSearch: (e: string[]) => void
  handleCheckbox: (event: React.ChangeEvent<HTMLInputElement>, all?: 'check'|'uncheck') => void
  ordering: (colunaOrdenada: string) => void
  loadTableData: (data: Array<Object>) => void
  setLoading: (p: boolean) => void
}

export interface dataListType {
  list: Object[]
  filteredList: Object[]
  new: Object[]
}

export interface TableProps {
  entity: BaseColumn
  header: Array<DataFieldType>
  rowData?: Array<Object>
  sortable?: boolean
  theme?: "light"|"dark"
  showCheckbox?: boolean
  editable?: boolean
  searchable?: boolean
}

export interface ProviderProps {
  children: React.ReactNode
}

export interface DataPropsGeneric {
  id?: string,
  [key: string]: any
}

export interface DataFieldType {
  field: string
  display: string
  showFilter?: boolean
  filterType?: "text"|"date"|"number"
}

export interface TableStateProps {
  loading: boolean
  checkAll: boolean
  checkBoxes: GenericObjectKeyType
  search: GenericObjectKeyType
  condition: GenericObjectKeyType
  ordering: {column: string, order: 'asc'|'desc'}
}

export interface TableContextStateProps {
  loading: boolean
  checkAll: boolean
  checkBoxes: GenericObjectKeyType
  search: GenericObjectKeyType
  condition: GenericObjectKeyType
  ordering: {column: string, order: 'asc'|'desc'}
}

export interface TableFiltersProps {
  columns: DataFieldType[]
  searchable?: boolean
  showCheckbox?: boolean
  // parentInputSearchHandler?: (e: string[]) => void
  // parentStateValues: TableStateProps
}