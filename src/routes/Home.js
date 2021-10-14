import React from "react";
import { signOut } from "firebase/auth";
import { authService } from "fbase";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();
  const logOutClick = async (e) => {
    try {
      await signOut(authService);
    } catch (error) {
      console.log(error.message);
    }
    history.push("/");
  };
  return (
    <>
      <span>Home</span>
      <button onClick={logOutClick}>logout</button>
    </>
  );
};
export default Home;
