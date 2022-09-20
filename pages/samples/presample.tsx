import React from "react"
import { Container, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material"
import { PreSampleColumns } from "../../src/Helpers/PreSampleColumns"
import { DivContentTable, DivLikeRow, DivLikeTable } from "../../src/Helpers/StyledTags"
import Layout from "../../src/Shared/Layout"
import { ContainerFlexDivJustified } from "../../src/Shared/StyledTags"


interface PreSampleCreateProps {
  analysis: {id: number, name: string}[]
  clients: {id: number, name: string}[]
  selectedClient: number
}

const PreSampleCreate = () => {
  const [data, setData] = React.useState<PreSampleCreateProps>({} as PreSampleCreateProps)

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_REACT_APP_URL_API}/users`,{
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REACT_APP_TOKEN_API}`
      }
    }).then((r) => {
      return r.json()
    }).then((json) => {
      console.log(json)
      setData(
        {...data, clients: json }
      )

      // setLoading(false)
    })
  }, [])

  function handleChange(event: SelectChangeEvent)
  {
    setData({...data, selectedClient: Number(event.target.value)})
  }
  
  return (
    <Layout>
      {/* <Container maxWidth="md" sx={{height: "100%", padding: "3rem 0"}}> */}
      <ContainerFlexDivJustified>
        <div style={{width: "30%"}}>
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
      {/* </Container> */}
      </div>
      </ContainerFlexDivJustified>
    </Layout>
  )
}

export default PreSampleCreate