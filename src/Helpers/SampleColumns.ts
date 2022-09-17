import { BaseColumn } from "./BaseColumn";
import { DataFieldType } from "./TypeHelpers";

export class SampleColumns extends BaseColumn {
  public dataFields: DataFieldType[] = [
    {field: 'id', display: 'ID', showFilter: true},
    {field: 'sample_type_id', display: 'Sample Type'},
    {field: 'internal_id', display: 'Internal  ID'},
    {field: 'external_id', display: 'External  ID'},
    // {field: 'client_document', display: 'Client Document'},
    // {field: 'client_name', display: 'Client Name'},
    // {field: 'date_received', display: 'Date received'},
    // {field: 'received_by', display: 'Received by'},
    // {field: 'date_collected', display: 'Date collected'},
    // {field: 'vol_mas', display: 'Vol/Mass'},
    // {field: 'unity', display: 'Un'},
    // {field: 'analysis', display: 'Analysis'},
  ]
}