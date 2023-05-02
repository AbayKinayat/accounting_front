import { getUserData, refreshUser } from "entities/User"
import { Children, FC, ReactNode, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch"

interface RequireAuthProps {
  children: ReactNode
}

export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const user = useSelector(getUserData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      dispatch(refreshUser()).then((action) => {
        if (action.meta.requestStatus === "rejected") navigate("/");
      });
    } 
  }, [dispatch]);
  
  if (user) {
    return <>
      {children}
    </>
  }

  return <></>
}