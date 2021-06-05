import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <Button variant="outline-secondary" onClick={() => logout({ returnTo: window.location.origin })}>Log out</Button>;

};
  // return (
  //   <button onClick={() => logout({ returnTo: window.location.origin })}>
  //     Log Out
  //   </button>

  // );

export default LogoutButton;
// const LoginButton = () => {
//   const { loginWithRedirect } = useAuth0();

//   return <Button variant="outline-secondary" onClick={() => loginWithRedirect()}>Log In</Button>;
// };