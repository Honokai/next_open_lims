import { Container } from "@mui/system"
import { useRouter } from "next/router"
import React from "react"
import { SetorColumn } from "../../src/Helpers/SetorColumn"
import { GenericObjectKeyType } from "../../src/Helpers/TypeHelpers"
import Layout from "../../src/Shared/Layout"
import TableBody from "../../src/Shared/Table/TableBody"

const CreateV2 = () => {
  const [data, setData] = React.useState<GenericObjectKeyType[]>()
  const { query } = useRouter()

  return (
    <Layout>
      <Container /*maxWidth="xl"*/ sx={{height: "100%", padding: "3rem 0"}}>
        <TableBody entity={new SetorColumn()} rowData={data} sortable={true} editable/>
      </Container>
    </Layout>
  )
}

export default CreateV2