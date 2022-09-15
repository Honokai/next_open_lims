import React, { ChangeEvent } from "react";
import { Link as RouterLink} from "react-router-dom";
import { Button, Card, CardContent, Link, TextField, Typography } from "@mui/material";
import Layout from "../Shared/Layout";
import { ContainerFlexDivJustified, FlexCenteredDiv } from "../Shared/StyledTags";

interface InputsProps {
  username: {
    value: string|""
    invalid: boolean
    errorMessage: string|null
  }, 
  password: {
    value: string|""
    invalid: boolean
    errorMessage: string|null
  }
}


const Login = () => {
  const [ inputs, setInputs ] = React.useState<InputsProps>({username: {value: '', invalid: false, errorMessage: null}, password: {value: '', invalid: false, errorMessage: null}})

  function validate() {
    if (inputs.username.value !== '' && inputs.password.value !== '')
      alert("OK")

    setInputs({
      ...inputs,
      username: {
        ...inputs.username,
        invalid: inputs.username.value === '',
        errorMessage: inputs.username.value === '' ? "Campo obrigatório" : ""
      },
      password: {
        ...inputs.password,
        invalid: inputs.password.value === '',
        errorMessage: inputs.username.value === '' ? "Campo obrigatório" : ""
      },
    })
  }

  function handleChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
    setInputs({
      ...inputs,
      [event.currentTarget.name]: event.currentTarget.value ?? ''
    })
  }

  return (
    <Layout>
      <ContainerFlexDivJustified>
        <Card variant="elevation" elevation={4} raised={true}>
          <CardContent>
            <Typography variant="h5" margin={".5rem 0"}>Sign in</Typography>
            <div style={{margin: ".7rem 0"}}>
                <TextField
                  fullWidth
                  size="small"
                  required
                  error={inputs.username.invalid}
                  name="username"
                  label="Username"
                  helperText={inputs.username.errorMessage ?? ""}
                  type={"text"}
                  value={inputs.username.value}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{ flex: 1}}
                />
            </div>
            <div style={{margin: ".7rem 0"}}>
              <TextField
                fullWidth
                size="small"
                required
                error={inputs.password.invalid}
                helperText={inputs.password.errorMessage ?? ""}
                type={"password"}
                name="password"
                label="Password"
                value={inputs.password.value}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{ flex: 1}}
              />
            </div>
            <FlexCenteredDiv>
              <Link sx={{margin: "0 .3rem"}} component={RouterLink} to={"/register"} variant="body2" underline="none">
                Forgot password?
              </Link>|
              <Link sx={{margin: "0 .3rem"}} component={RouterLink} to={"/register"} variant="body2" underline="none">
                Create account
              </Link>
            </FlexCenteredDiv>
            <FlexCenteredDiv>
              <Button onClick={validate} variant="outlined">Sign in</Button>
            </FlexCenteredDiv>
          </CardContent>
        </Card>
      </ContainerFlexDivJustified>
    </Layout>
  )
}

export default Login