import React, { FC } from "react";
import { Button, Heading } from "react-bulma-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../components/hooks";
import Layout from "../components/Layout";
import { signOut } from "../redux-store/userSlice";
import "../styles/Dashboard.css";

const SignOut: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signOutUser = () => {
    dispatch(signOut());
    navigate("/");
  };
  return (
    <Layout title="Abmelden" style={{ marginTop: "50px" }}>
      <Heading size={4} style={{ color: "white" }}>
        Tschüss, bis bald!
      </Heading>
      <Button onClick={() => signOutUser()} className="component">
        Abmelden
      </Button>
    </Layout>
  );
};

export default SignOut;
