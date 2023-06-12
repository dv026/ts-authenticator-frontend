import {
  FC,
  PropsWithChildren,
  createContext,
  useState,
  useContext,
} from "react"

import { IUser } from "@/entities/user/model"

import { Nullable } from "../../types/common"

interface UserContextProps {
  user: Nullable<IUser>
  setUser: (user: IUser) => void
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => null,
})

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<Nullable<IUser>>(
    localStorage.getItem("user")
      ? (JSON.parse(localStorage.getItem("user") || "") as IUser)
      : null
  )

  const handleSetUser = (user: IUser) => {
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: handleSetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
