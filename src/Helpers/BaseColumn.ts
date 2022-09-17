import { DataFieldType, GenericObjectKeyType } from "./TypeHelpers"

export class BaseColumn {
  public onlySpecificKeys: string[] = []
  public conditionFilter: string[] = ['contains', 'starts_with', 'ends_with', 'equal', 'not_equal']
  public dataFields: DataFieldType[]

  constructor(dataFields?: DataFieldType[])
  {
    this.dataFields = dataFields ?? []
  }

  public getConditionFilters()
  {
    return this.conditionFilter;
  }

  public getDataFields()
  {
    return this.dataFields;
  }

  public createSelfEmpty()
  {
    let r: GenericObjectKeyType = {}
    this.dataFields.forEach(i => {
      r[i.field] = "fill in"
    })
    return r
  }

}