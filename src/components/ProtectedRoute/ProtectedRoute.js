import {Navigate} from "react-router-dom";

export function ProtectedRoute({element: Component, signedIn, ...componentProps}) {
  return signedIn ? <Component {...componentProps}></Component> : <Navigate to='/'/>
}
