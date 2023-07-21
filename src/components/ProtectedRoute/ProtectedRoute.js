import {Navigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../utils/constants/routes";

export function ProtectedRoute({element: Component, signedIn, ...componentProps}) {
  return signedIn ? <Component {...componentProps}></Component> : <Navigate to={MAIN_ROUTE}/>
}
