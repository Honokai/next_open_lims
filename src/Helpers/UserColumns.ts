import { BaseColumn } from "./BaseColumn";
import { DataFieldType } from "./TypeHelpers";

export class UserColumns extends BaseColumn {
  public dataFields: DataFieldType[] = [
    {field: 'id', display: 'ID', filterType: 'text', showFilter: true},
    {field: 'username', display: 'Username', filterType: 'text', showFilter: false},
    {field: 'name', display: 'Nome', filterType: 'text', showFilter: false},
    {field: 'email', display: 'E-mail', filterType: 'text', showFilter: true},
    {field: 'document', display: 'Document', filterType: 'text', showFilter: false},
    {field: 'created_at', display: 'Criado em', filterType: 'date', showFilter: true},
    {field: 'country', display: 'Country', filterType: 'text', showFilter: true},
    {field: 'city', display: 'City', filterType: 'text', showFilter: true},
  ]
}