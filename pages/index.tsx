import React from "react"
import { Container } from "@mui/system"
import { useTable } from "../src/contexts/useTable"
import Layout from "../src/Shared/Layout"
import TableBody from "../src/Shared/Table/TableBody"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { SampleColumns } from "../src/Helpers/SampleColumns"
import {DataFieldType} from "../src/Helpers/TypeHelpers"

const Columns: DataFieldType[] = [
  {field: 'id', display: 'ID', showFilter: true},
  {field: 'sample_type_id', display: 'Sample Type', showFilter: true},
  {field: 'internal_id', display: 'Internal  ID', showFilter: true},
  // {field: 'external_id', display: 'External  ID', showFilter: false},
]

const Home = ({samples}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setLoading } = useTable()
  const [data, setData] = React.useState(samples)

  return (
    <Layout>
      <Container maxWidth="xl" sx={{height: "100%", padding: "3rem 0"}}>
        <TableBody header={Columns} entity={new SampleColumns()} searchable sortable showCheckbox rowData={data}/>
      </Container>
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