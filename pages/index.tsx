import React, { ReactEventHandler } from "react"
import { Container } from "@mui/system"
import { Button, Link} from "@mui/material";
import { useTable } from "../src/contexts/useTable"
import Layout from "../src/Shared/Layout"
import TableBody from "../src/Shared/Table/TableBody"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { SampleColumns } from "../src/Helpers/SampleColumns"
import {DataFieldType, GenericObjectKeyType} from "../src/Helpers/TypeHelpers"

const Columns: DataFieldType[] = [
  {field: 'id', display: 'ID', showFilter: true},
  {field: 'sample_type', display: 'Sample Type', showFilter: true},
  {field: 'internal_id', display: 'Internal  ID', showFilter: true},
  {field: 'external_id', display: 'External  ID', showFilter: false},
]

const Home = ({samples}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setLoading } = useTable()
  // const [data, setData] = React.useState(samples)
  const [tableState, setTableState] = React.useState(
    {
      dialogOpen: false,
      createSampleModalOpen: false,
      sampleQuantity: 1,
      samples: [] as GenericObjectKeyType[],
      contextMenuOpen: false,
      targetIndex: 0,
      mouseCoordinates: {x: 0, y: 0}
    }
  )

  return (
    <Layout>
      <>
      <Container maxWidth="xl" sx={{height: "100%", padding: "1rem 0"}}>
        <div style={{margin: ".2rem 1rem"}}>
          <Button LinkComponent={Link} href="/samples/create" color="generalButton" variant="contained">Create sample</Button>
        </div>
        <TableBody key={"table"} header={Columns} entity={new SampleColumns()} searchable sortable showCheckbox rowData={samples}/>
        </Container>
      </>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.REACT_APP_URL_API}/v1/sample`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN_API}`
    }
  })

  const data = await res.json()

  return {
    props: {
      samples: data
    }
  }
}

export default Home