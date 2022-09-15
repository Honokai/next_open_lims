import React from "react"
import { Typography } from "@mui/material"
import { Container } from "@mui/system"
import mySchedule from "../src/components/mySchedules.json"
import { useTema } from "../src/contexts/useTheme"
import { useTable } from "../src/contexts/useTable"
import { UserColumns } from "../src/Helpers/UserColumns"
import { SetorColumn } from "../src/Helpers/SetorColumn"
import Layout from "../src/Shared/Layout"
import Table from "../src/Shared/Table"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

const Home = ({users}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setLoading } = useTable()
  const [d, setD] = React.useState(users)
  const {theme} = useTema()

  // React.useEffect(() => {
  //   console.log(setLoading)
  //   // setLoading(true)

  //   fetch(`${process.env.REACT_APP_URL_API}/users`,{
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN_API}`
  //     }
  //   }).then((r) => {
  //     return r.json()
  //   }).then((json) => {
  //     setD(json ?? [])

  //     // setLoading(false)
  //   })
  // }, [])
  
  return (
    <Layout>
      <Container maxWidth="xl" sx={{height: "100%", padding: "3rem 0"}}>
        <Table entity={new UserColumns()} sortable showCheckbox rowData={d}/>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.REACT_APP_URL_API}/users`, {headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN_API}`
  }})

  const data = await res.json()

  return {
    props: {
      users: data
    } 
  }
}

export default Home