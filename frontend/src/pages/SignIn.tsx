import axios from "axios";
import React, { FC, useState } from "react";
import { Button, Form, Heading } from "react-bulma-components";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../components/hooks";
import Layout from "../components/Layout";
import { signIn } from "../redux-store/userSlice";
import "../styles/Dashboard.css";

const SignIn: FC = () => {
  const backendUrl = "http://localhost:8000";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>(" ");

  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = async () => {
    try {
      const res = await axios.post(`${backendUrl}/login`, {
        firstName,
        password,
      });
      dispatch(
        signIn({
          isSignedIn: true,
          id: res.data.id,
          name: {
            first: res.data.firstName,
            last: res.data.lastName,
          },
          password: res.data.password,
          balance: res.data.balance,
          stocks: res.data.stocks,
        })
      );
      navigate("/");
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error?.response?.data);
    }
  };

  return (
    <Layout title="Anmelden" style={{ width: "80%" }}>
      <Heading>Anmelden</Heading>
      <Form.Field>
        <Form.Label htmlFor="firstName">Vorname</Form.Label>
        <Form.Control>
          <Form.Input
            placeholder="Max"
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            className="component"
          />
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label htmlFor="password">Passwort</Form.Label>
        <Form.Control>
          <Form.Input
            placeholder="12345678910"
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="component"
          />
        </Form.Control>
      </Form.Field>
      <div
        style={{
          color: "red",
          height: "50px",
          width: "100%",
          clear: "both",
          display: "flex",
          alignItems: "center",
        }}
      >
        {errorMessage}
      </div>
      <Form.Field>
        <Button type="submit" onClick={signInUser} className="component">
          Anmelden
        </Button>
      </Form.Field>
      Wenn du noch keinen Account hast,{" "}
      <Link to="/signup">registriere dich</Link>
    </Layout>
  );
};

export default SignIn;
