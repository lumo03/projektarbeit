import React, { FC } from "react";
import { Button } from "react-bulma-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../components/hooks";
import Layout from "../components/Layout";
import { signOut } from "../redux-store/userSlice";

const SignOut: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signOutUser = () => {
    dispatch(signOut());
    navigate("/");
  };
  return (
    <Layout title="Abmelden">
      <div>Abmelden</div>
      <Button onClick={() => signOutUser()}>Abmelden</Button>
    </Layout>
  );
};

export default SignOut;
