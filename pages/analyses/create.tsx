import React from "react";
import styled from "@emotion/styled";
import { Card, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import Select from 'react-select'
import Layout from "../../src/Shared/Layout";

const ContainerCenterAligned = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const sample_types = [
  {label: "Urine", id: "urine"},
  {label: "Blood", id: "blood"}
]

class CreateAnalysis extends React.Component {
  render(): React.ReactNode {
    return (
      <Layout>
        <ContainerCenterAligned>
          <Card>
            <CardContent>
              <Typography variant="h4">Create analysis</Typography>
              <div style={{display: "flex", flexDirection: "column", padding: "2rem"}}>
                <div style={{margin: ".2rem 0"}}>
                  <TextField size="small" placeholder="Analysis name"/>
                </div>
                <div style={{margin: ".2rem 0"}}>
                  <Select options={sample_types}/>
                </div>
                <div style={{margin: ".2rem 0"}}>
                  <TextField size="small"  placeholder="Description"/>
                </div>
              </div>
            </CardContent>
          </Card>
        </ContainerCenterAligned>
      </Layout>
    )
  }
}

export default CreateAnalysis