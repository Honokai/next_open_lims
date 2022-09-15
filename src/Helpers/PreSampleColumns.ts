import { BaseColumn } from "./BaseColumn";
import { DataFieldType } from "./TypeHelpers";

export class PreSampleColumns extends BaseColumn {
  public dataFields: DataFieldType[] = [
    {field: 'client', display: 'Client'},
    {field: 'description', display: 'Description'},
    {field: 'preAnalysisIds', display: 'Analysis'},
  ]
}