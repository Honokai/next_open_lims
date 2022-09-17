import React from "react"
import { Container } from "@mui/system"
import { useTable } from "../src/contexts/useTable"
import Layout from "../src/Shared/Layout"
import Table from "../src/Shared/Table"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { SampleColumns } from "../src/Helpers/SampleColumns"

const Home = ({samples}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setLoading } = useTable()
  const [data, setData] = React.useState(samples)

  return (
    <Layout>
      <Container maxWidth="xl" sx={{height: "100%", padding: "3rem 0"}}>
        <Table entity={new SampleColumns()} searchable sortable showCheckbox rowData={data}/>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.REACT_APP_URL_API}/v1/sample`, {headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN_API}`
  }})

  const data = await res.json()

  return {
    props: {
      samples: data
    }
  }
}

export default Home