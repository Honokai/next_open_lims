import { Add } from "@mui/icons-material"
import { Button, Container, Link } from "@mui/material"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { SampleColumns } from "../../src/Helpers/SampleColumns"
import { DataFieldType } from "../../src/Helpers/TypeHelpers"
import Layout from "../../src/Shared/Layout"
import TableBody from "../../src/Shared/Table/TableBody"

const Columns: DataFieldType[] = [
  {field: 'id', display: 'ID', showFilter: true},
  {field: 'sample_type', display: 'Sample Type', showFilter: true},
  {field: 'internalId', display: 'Internal  ID', showFilter: true},
  {field: 'externalId', display: 'External  ID', showFilter: false},
  // {field: '', display: 'External  ID', showFilter: false},
]

const TestIndex = ({samples}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <>
        <Container maxWidth="xl" sx={{height: "100%", padding: "1rem 0"}}>
          <div style={{margin: ".2rem 1rem"}}>
            <Button LinkComponent={Link} href="/samples/create" color="generalButton" variant="contained" startIcon={<Add/>}>Test</Button>
          </div>
          <TableBody key={"table"} header={Columns} entity={new SampleColumns()} searchable sortable showCheckbox rowData={samples}/>
        </Container>
      </>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.REACT_APP_URL_API}/v1/test`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN_API}`
    }
  })

  const data = await res.json()

  return {
    props: {
      tests: data
    }
  }
}

export default TestIndex