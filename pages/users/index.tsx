import { Container } from "@mui/system"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import React from "react"
import { UserColumns } from "../../src/Helpers/UserColumns"
import Layout from "../../src/Shared/Layout"
import Table from "../../src/Shared/Table"

const UserList = ({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [data, setData] = React.useState(users)

  return (
    <Layout>
      <Container sx={{height: "100%", padding: "3rem 0"}}>
        <Table entity={new UserColumns()} showCheckbox sortable={true} rowData={data}/>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch(`http://api.teste.com/api/users`)
    const data = await res.json()

    return {
        props: {
            users: data
        } 
    }
}

export default UserList