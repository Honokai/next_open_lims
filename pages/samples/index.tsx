import { Container } from "@mui/system"
import React from "react"
import { SetorColumn } from "../../src/Helpers/SetorColumn"
import { GenericObjectKeyType } from "../../src/Helpers/TypeHelpers"
import Layout from "../../src/Shared/Layout"
import TableBody from "../../src/Shared/Table/TableBody"

export const Index = () => {
  const [data, setData] = React.useState<GenericObjectKeyType[]>();
//   const { state }: GenericObjectKeyType = useLocation()

//   React.useEffect(() => {
//     setData(state.schedules)
//   }, [])

  return (
    <Layout>
      <Container /*maxWidth="xl"*/ sx={{height: "100%", padding: "3rem 0"}}>
        {/* <TableBody entity={new SetorColumn()} rowData={data} sortable={true} editable/> */}
      </Container>
    </Layout>
  )
}

export default Index