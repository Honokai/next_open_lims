import { Container } from "@mui/system"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import React from "react"
import { DataFieldType } from "../../src/Helpers/TypeHelpers"
import { UserColumns } from "../../src/Helpers/UserColumns"
import Layout from "../../src/Shared/Layout"
import TableBody from "../../src/Shared/Table/TableBody"

const Columns: DataFieldType[] = [
  {field: 'id', display: 'ID', filterType: 'text', showFilter: true},
  {field: 'username', display: 'Username', filterType: 'text', showFilter: false},
  {field: 'name', display: 'Nome', filterType: 'text', showFilter: false},
  {field: 'email', display: 'E-mail', filterType: 'text', showFilter: true},
  {field: 'document', display: 'Document', filterType: 'text', showFilter: false},
  {field: 'created_at', display: 'Criado em', filterType: 'date', showFilter: true},
  {field: 'country', display: 'Country', filterType: 'text', showFilter: true},
  {field: 'city', display: 'City', filterType: 'text', showFilter: true},
]

const UserList = ({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [data, setData] = React.useState(users)

  return (
    <Layout>
      <Container sx={{height: "100%", padding: "3rem 0"}}>
        <TableBody header={Columns} entity={new UserColumns()} showCheckbox sortable={true} rowData={data}/>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.REACT_APP_URL_API}/v1/user`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN_API}`
    }
  })

  const data = await res.json()

  return {
    props: {
      users: data
    } 
  }
}

export default UserList