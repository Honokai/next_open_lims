import React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import styled from "@emotion/styled";
import { formatDateToISO } from "../../Helpers/Functions";
import Layout from "../../Shared/Layout";
import { GenericObjectKeyType } from "../../Helpers/TypeHelpers";

interface Inputs {
  externalID: string
  sampleType: string
  received: Date
  receivedBy: number
}

const StyledDiv = styled.div`
  display: flex;
  padding: .3rem;
  & * {
    margin: 0.2rem;
    flex: 2;
  }
`

const ContainerStyled = styled.div`
  width: 60%;
  padding-top: 1.5rem;
  flex: 1;
  justify-content: center;
`

const CustomContainerStyles = {
  height: "100%", paddingTop: "3rem", display: "flex", flexDirection: "column", alignItems: "center",
}

const SampleCreate = () => {
  const [ value, setValue ] = React.useState<Inputs>({} as Inputs)

  function handleChange(event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)
  {
    setValue({
      ...value,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  function handleSelectChange(event: SelectChangeEvent<unknown>, child?: React.ReactNode)
  {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Layout>
      <Container sx={CustomContainerStyles}>
        <Typography variant="h4">
          Sample
        </Typography>
        <ContainerStyled>
          <StyledDiv>
            <TextField
              size="small"
              required
              name="externalID"
              id="outlined-required"
              label="External ID"
              defaultValue=""
              onChange={(e) => handleChange(e)}
              sx={{ flex: 1}}
            />
            <FormControl sx={{ minWidth: 120}} size="small">
              <InputLabel id="demo-select-small">Sample Type</InputLabel>
              <Select
                name="sampleType"
                labelId="demo-select-small"
                id="demo-select-small"
                defaultValue={10}
                label="Age"
                onChange={(e, child) => handleSelectChange(e, child)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>aadasd</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120}} size="small">
              <InputLabel id="demo-select-small">Client</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                defaultValue={10}
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>aadasd</MenuItem>
              </Select>
            </FormControl>
          </StyledDiv>
          <StyledDiv>
            <TextField
              size="small"
              required
              type="date"
              id="outlined-required"
              InputLabelProps={{ shrink: true, required: true }}
              label="Received"
              defaultValue={formatDateToISO()}
            />
            <TextField
              size="small"
              required
              id="outlined-required"
              label="Required"
              defaultValue={formatDateToISO(new Date("10/02/2022"))}
            />
          </StyledDiv>
          <StyledDiv>
            <TextField
              size="small"
              required
              id="tgest"
              label="Required"
              defaultValue=""
            />
            <TextField
              size="small"
              required
              id="NomeQualquer"
              label="Required"
              defaultValue=""
            />
          </StyledDiv>
        </ContainerStyled>
      </Container>
      {/* <Grid2 container padding={1}>
        <Grid2 xs={6}>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Grid2>
        <Grid2 xs={6}>
          Item 2
        </Grid2>
      </Grid2> */}
    </Layout>
  )
}

export default SampleCreate