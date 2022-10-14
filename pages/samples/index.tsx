import React, { ReactEventHandler } from "react"
import { Container } from "@mui/system"
import { Button, IconButton, Link} from "@mui/material";
import { useTable } from "../../src/contexts/useTable"
import Layout from "../../src/Shared/Layout"
import TableBody from "../../src/Shared/Table/TableBody"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { SampleColumns } from "../../src/Helpers/SampleColumns"
import {DataFieldType, GenericObjectKeyType} from "../../src/Helpers/TypeHelpers"
import RunTest from "../../src/Shared/RunTest";
import { Add } from "@mui/icons-material";

const Columns: DataFieldType[] = [
  {field: 'id', display: 'ID', showFilter: true},
  {field: 'sample_type', display: 'Sample Type', showFilter: true},
  {field: 'internalId', display: 'Internal  ID', showFilter: true},
  {field: 'externalId', display: 'External  ID', showFilter: false},
  // {field: '', display: 'External  ID', showFilter: false},
]

const SamplesIndex = ({samples}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setLoading } = useTable()

  return (
    <Layout>
      <>
      <Container maxWidth="xl" sx={{height: "100%", padding: "1rem 0"}}>
        <div style={{margin: ".2rem 1rem"}}>
          <Button LinkComponent={Link} href="/samples/create" color="generalButton" variant="contained" startIcon={<Add/>}>Sample</Button>
          <RunTest/>
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

export default SamplesIndex