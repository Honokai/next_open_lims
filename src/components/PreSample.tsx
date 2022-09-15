import React from "react"
import { Container, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material"
import { PreSampleColumns } from "../Helpers/PreSampleColumns"
import { DivContentTable, DivLikeRow } from "../Helpers/StyledTags"
import Layout from "./Shared/Layout"
import { FlexCenteredDiv } from "./Shared/StyledTags"
import Table from "./Shared/Table"

interface PreSampleCreateProps {
  analysis: {id: number, name: string}[]
  clients: {id: number, name: string}[]
  selectedClient: number
}

export const PreSampleCreate = () => {
  const [data, setData] = React.useState<PreSampleCreateProps>({} as PreSampleCreateProps)

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_API}/users`,{
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN_API}`
      }
    }).then((r) => {
      return r.json()
    }).then((json) => {
      setData(
        {...data, clients: json }
      )

      // setLoading(false)
    })
  }, [])

  function handleChange(event: SelectChangeEvent)
  {
    console.log(event.target.value)
    setData({...data, selectedClient: Number(event.target.value)})
  }
  
  return (
    <Layout>
      <Container maxWidth="md" sx={{height: "100%", padding: "3rem 0"}}>
        <DivLikeRow>
            <DivContentTable>
              Client
            </DivContentTable>
            <DivContentTable>
              Analysis
            </DivContentTable>
            <DivContentTable>
              Analysis
            </DivContentTable>
        </DivLikeRow>
        <DivLikeRow>
        {data.clients ? 
          <FormControl sx={{ flex: 2 }}>
            <Select
              size="small"
              displayEmpty
              value={data.selectedClient ? String(data.selectedClient) : ""}
              label="Age"
              onChange={handleChange}
              input={<OutlinedInput />}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {data.clients.map((client) => (
                  <MenuItem
                    key={client.name}
                    value={client.id}
                    // style={getStyles(name, personName, theme)}
                  >
                    {client.name}
                  </MenuItem>
                ))} 
            </Select>
          </FormControl>
          : <></>
        }
          <DivContentTable>
            Analysis
          </DivContentTable>
          <DivContentTable>
              Analysis
            </DivContentTable>
        </DivLikeRow>
            <div>Analysis</div>
            <div>Description</div>
      </Container>
    </Layout>
  )
}