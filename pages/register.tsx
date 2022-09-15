import React, { ChangeEvent } from "react";
import { Button, Card, CardContent, FormControl, Link, TextField, Typography } from "@mui/material";
import Layout from "../src/Shared/Layout";
import { textFieldInterface } from "../src/Helpers/TypeHelpers";
import { validateEmail } from "../src/Helpers/Validate";
import { ContainerFlexDivJustified, FlexCenteredDiv } from "../src/Shared/StyledTags";

interface InputsProps {
  [key: string]: textFieldInterface
}

const Register = () => {
  const [ inputs, setInputs ] = React.useState<InputsProps>({
    email: {value: '', type: 'email', invalid: false, errorMessage: null}, 
    password: {value: '', invalid: false, errorMessage: null},
    document: {value: '', invalid: false, errorMessage: null},
    fullname: {value: '', invalid: false, errorMessage: null},
  })

  function validate(event: React.FormEvent) {
    event.preventDefault()
    if (validateEmail(inputs.email.value) && inputs.password.value !== '' && inputs.document.value !== '' && inputs.fullname.value !== ''){
      erroredInput()
      
    } else {
      erroredInput()
    }
  }

  function erroredInput()
  {
    let errored = Object.assign({}, inputs)

    Object.entries(inputs).forEach((key) => {
      let chave = key[0].toString()

      Object.assign(errored, {
          ...errored,
          [chave]: {
            ...errored[chave],
            invalid: !key[1].value ? true : key[1].type ? !validateEmail(key[1].value) : false,
            errorMessage: key[1].value === ''? "Campo obrigatório" : key[1].type !== 'email' ? "" : !validateEmail(key[1].value) ? "Informe um e-mail válido" : ""
          }
        }
      )
    })

    setInputs(errored)
  }

  function handleChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
    let key = event.currentTarget.name

    setInputs({
      ...inputs,
      [key]: {
        ...inputs[key],
        value: event.currentTarget.value ?? ''
      }
    })
  }

  return (
    <Layout>
      <ContainerFlexDivJustified>
        <Card variant="elevation" elevation={4} raised={true}>
          <CardContent>
            <form action="/" method="post" onSubmit={validate}>
            <FormControl>
            <Typography variant="h5" margin={".5rem 0"}>Sign up</Typography>
            <div style={{margin: ".7rem 0"}}>
              <TextField
                fullWidth
                size="small"
                // required
                error={inputs.email.invalid ?? false}
                helperText={inputs.email.errorMessage ?? ""}
                name="email"
                label="E-mail"
                value={inputs.email.value ?? ""}
                onChange={handleChange}
                sx={{ flex: 1}}
              />
            </div>
            <div style={{margin: ".7rem 0"}}>
                <TextField
                  fullWidth
                  size="small"
                  // required
                  error={inputs.fullname.invalid ?? false}
                  helperText={inputs.fullname.errorMessage ?? ""}
                  name="fullname"
                  type={"text"}
                  label="Full name"
                  value={inputs.fullname.value ?? ""}
                  onChange={handleChange}
                  sx={{ flex: 1}}
                />
            </div>
            <div style={{margin: ".7rem 0"}}>
              <TextField
                fullWidth
                size="small"
                // required
                error={inputs.document.invalid ?? false}
                helperText={inputs.document.errorMessage ?? ""}
                name="document"
                label="Document"
                value={inputs.document.value ?? ""}
                onChange={handleChange}
                sx={{ flex: 1}}
              />
            </div>
            <div style={{margin: ".7rem 0"}}>
              <TextField
                fullWidth
                size="small"
                // required
                error={inputs.password.invalid ?? false}
                helperText={inputs.password.errorMessage ?? ""}
                type={"password"}
                name="password"
                label="Password"
                value={inputs.password.value ?? ""}
                onChange={handleChange}
                sx={{ flex: 1}}
              />
            </div>
            <FlexCenteredDiv>
              <Link sx={{margin: "0 .3rem"}} href={"/login"} variant="body2" underline="none">
                Already have an account? Sign in here
              </Link>
            </FlexCenteredDiv>
            <FlexCenteredDiv>
              <Button type="submit" variant="outlined">Sign in</Button>
            </FlexCenteredDiv>
            </FormControl>
            </form>
          </CardContent>
        </Card>
      </ContainerFlexDivJustified>
    </Layout>
  )
}

export default Register