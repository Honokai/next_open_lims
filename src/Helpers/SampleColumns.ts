import { BaseColumn } from "./BaseColumn";

export class SampleColumns extends BaseColumn {
  public dataFields = [
    {field: 'client_document', display: 'Client Document'},
    {field: 'client_name', display: 'Client Name'},
    {field: 'date_received', display: 'Date received'},
    {field: 'received_by', display: 'Received by'},
    {field: 'date_collected', display: 'Date collected'},
    {field: 'vol_mas', display: 'Vol/Mass'},
    {field: 'unity', display: 'Un'},
    {field: 'analysis', display: 'Analysis'},
  ]
}