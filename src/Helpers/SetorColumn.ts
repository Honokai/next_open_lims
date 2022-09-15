import { BaseColumn } from "./BaseColumn";
import { DataFieldType } from "./TypeHelpers";

export class SetorColumn extends BaseColumn {
  public dataFields = [{field: 'id', display: 'ID'}, {field: 'nome', display: 'Nome'}, {field: 'created_at', display: 'Data criação'}, {field: 'updated_at', display: 'Atualizado em'}]

  constructor(dataFields?: DataFieldType[])
  {
    super(dataFields ?? [])
  }
}