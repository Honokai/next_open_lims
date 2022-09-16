import React from "react"
import { ProviderProps, UserProps } from "../Helpers/TypeHelpers"

interface UserContextProps {
  authenticated: boolean
  user: UserProps,
}

const UserContext = React.createContext({} as UserContextProps)

export const UserContextProvider  = ({ children }: ProviderProps) => {
  const [user, setUser] = React.useState({user: {} as UserProps, authenticated: false})
  return (
    <UserContext.Provider value={{user: user.user, authenticated: user.authenticated}}>

    </UserContext.Provider>
  )
}