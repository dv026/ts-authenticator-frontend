import {
  FC,
  PropsWithChildren,
  createContext,
  useState,
  Dispatch,
  useContext,
} from "react"
import { IUser } from "../../types/user"
import { Nullable } from "../../types/common"

interface UserContextProps {
  user: Nullable<IUser>
  setUser: Dispatch<React.SetStateAction<IUser | undefined>>
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => null,
})

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser>()
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
