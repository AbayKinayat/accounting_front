import { Provider } from "react-redux"
import { store } from "../../config/store"
import { FC, ReactNode } from "react"

interface StoreProviderProps {
  children: ReactNode
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {

  return <Provider store={store}>
    {children}
  </Provider>
}