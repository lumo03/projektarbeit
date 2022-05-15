import axios from "axios";
import React, { FC, useState } from "react";
import { Button, Form, Heading } from "react-bulma-components";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../components/hooks";
import Layout from "../components/Layout";
import { signIn } from "../redux-store/userSlice";

const SignUp: FC = () => {
  const backendUrl = "http://localhost:8000";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>(" ");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const signUpUser = async () => {
    try {
      const res = await axios.post(`${backendUrl}/register`, {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        password,
      });
      console.log(res);
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
    <Layout title="Registrieren" style={{ width: "80%" }}>
      <Heading>Registrieren</Heading>
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
        <Form.Label htmlFor="firstName">Nachname</Form.Label>
        <Form.Control>
          <Form.Input
            placeholder="Mustermann"
            type="text"
            name="firstName"
            id="firstName"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
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
        <Button type="submit" onClick={signUpUser} className="component">
          Registrieren
        </Button>
      </Form.Field>
      Wenn du schon registriert bist, kannst du dich{" "}
      <Link to="/signin">hier</Link> anmelden.
    </Layout>
  );
};

export default SignUp;
