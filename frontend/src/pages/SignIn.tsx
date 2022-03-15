import React, { FC } from "react";
import { Button } from "react-bulma-components";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../components/hooks";
import Layout from "../components/Layout";
import { IUserState, signIn } from "../redux-store/userSlice";

const SignIn: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userData: IUserState = {
    name: {
      first: "Test",
      last: "User",
    },
    password: "password",
    isSignedIn: true,
  };

  const signInUser = (user: IUserState) => {
    dispatch(signIn(user));
    navigate("/");
  };

  return (
    <Layout title="Anmelden">
      <div>Anmelden</div>
      <Button onClick={() => signInUser(userData)}>Anmelden</Button>
    </Layout>
  );
};

export default SignIn;
