import React from "react"
import { Typography } from "@mui/material"
import { Container } from "@mui/system"
import mySchedule from "./mySchedules.json"
import Layout from "./Shared/Layout"
import Table from "./Shared/Table";
import { useTema } from "../contexts/useTheme"
import { useTable } from "../contexts/useTable"
import { UserColumns } from "../Helpers/UserColumns"
import { SetorColumn } from "../Helpers/SetorColumn"

const Home = () => {
  const {setLoading} = useTable()
  const [d, setD] = React.useState([])
  const {theme} = useTema()

  React.useEffect(() => {
    setLoading(true)

    fetch(`${process.env.REACT_APP_URL_API}/users`,{
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN_API}`
      }
    }).then((r) => {
      return r.json()
    }).then((json) => {
      setD(json ?? [])

      setLoading(false)
    })
  }, [])
  
  return (
    <Layout>
      <Container maxWidth="xl" sx={{height: "100%", padding: "3rem 0"}}>
        <Table entity={new UserColumns()} sortable showCheckbox rowData={d} theme={theme}/>
      </Container>
    </Layout>
  )
}

export default Home