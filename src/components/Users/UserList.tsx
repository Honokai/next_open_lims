import { Container } from "@mui/system"
import React from "react"
import { useTable } from "../../contexts/useTable"
import { useTema } from "../../contexts/useTheme"
import { UserColumns } from "../../Helpers/UserColumns"
import Layout from "../../Shared/Layout"
import Table from "../../Shared/Table"

const UserList = () => {
  const {setLoading} = useTable()
  const [data, setData] = React.useState([])
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
      setData(json ?? [])

      setLoading(false)
    }).catch(e => {
      console.log(e, "Erro ao buscar dados")
    })
  }, [])

  return (
    <Layout>
      <Container sx={{height: "100%", padding: "3rem 0"}}>
        <Table entity={new UserColumns()} showCheckbox sortable={true} rowData={data} theme={theme}/>
      </Container>
    </Layout>
  )
}

export default UserList