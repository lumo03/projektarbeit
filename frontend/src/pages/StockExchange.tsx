import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { Button, Form, Heading } from "react-bulma-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../components/hooks";
import Layout from "../components/Layout";
import MyTable from "../components/MyTable";
import { RootState } from "../redux-store";
import { signIn } from "../redux-store/userSlice";
import "../styles/Dashboard.css";

const Dashboard: FC = () => {
  const stocksExample = [
    {
      name: "Apple",
      price: 100,
      change: 0.1,
      changePercent: 0.1,
    },
    {
      name: "Google",
      price: 200,
      change: 0.2,
      changePercent: 0.2,
    },
    {
      name: "Microsoft",
      price: 300,
      change: 0.3,
      changePercent: 0.3,
    },
    {
      name: "Gesamt",
      price: 300,
      change: 0.3,
      changePercent: 0.3,
    },
  ];

  const firstName = useSelector((state: RootState) => state.user.name.first);

  const checkExchange = async () => {
    try {
      const res = await axios.get("http://localhost:8000/isExchangeOpen");
      console.dir(res);
      if (res.data == true) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    const setOpen = async () => {
      const open = await checkExchange();
      setExchangeOpen(open);
    };
    setOpen();
  }, []);

  const openExchange = async () => {
    try {
      const res = await axios.post("http://localhost:8000/openExchange");
      setExchangeOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeExchange = async () => {
    try {
      const res = await axios.post("http://localhost:8000/closeExchange");
      setExchangeOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [exchangeOpen, setExchangeOpen] = useState(false);
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();
  const from0To10 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    if (exchangeOpen === null || exchangeOpen === false) return;
    const loadStocks = async () => {
      const res = await axios.get("http://localhost:8000/getStocks");
      setStocks(res.data);
      console.log(stocks);
    };
    if (exchangeOpen) {
      loadStocks();
    }
  }, [exchangeOpen]);

  const userId = useSelector((state: RootState) => state.user.id);
  const [errorMessage, setErrorMessage] = useState<string>(" ");
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const buyStock = async ({
    stockId,
    amount,
  }: {
    stockId: number;
    amount: number;
  }) => {
    console.log(`stockId: ${stockId}, amount: ${amount}, playerId: ${userId}`);
    try {
      const res = await axios.post("http://localhost:8000/buyStock", {
        stockId: stockId,
        amount: amount,
        playerId: userId,
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
    } catch (error) {
      console.log(error);
      console.dir(user);
    }
  };

  return (
    <Layout title="Dashboard">
      <Heading style={{ color: "white" }}>Willkommen in der Börse!</Heading>
      {exchangeOpen ? (
        <div>
          <MyTable
            head={
              <tr>
                <th style={{ color: "white" }}>Name</th>
                <th style={{ color: "white" }}>Preis</th>
                <th style={{ color: "white" }}>Änderung</th>
                <th style={{ color: "white" }}>Menge</th>
              </tr>
            }
            body={stocks.map((stock: any) => (
              <tr key={stock.id}>
                <td>{stock.name}</td>
                <td>{stock.price}</td>
                <td
                  className={stock.change < 0 ? "is-negative" : "is-positive"}
                >
                  {stock.change}
                </td>
                <td>
                  <Form.Select
                    onChange={(e) => {
                      buyStock({
                        stockId: stock.id,
                        amount: parseInt(e.target.value),
                      });
                    }}
                  >
                    {from0To10.map((i: number) => (
                      <option key={stock.id} value={i}>
                        {i}
                      </option>
                    ))}
                  </Form.Select>
                </td>
              </tr>
            ))}
          />
          <div>
            <Button
              className="component"
              onClick={() => navigate("/app/dashboard")}
            >
              Börse verlassen
            </Button>
          </div>
          {firstName && firstName == "admin" && (
            <div>
              <Button className="component" onClick={closeExchange}>
                Börse schließen
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Heading size={1} style={{ color: "white", width: "100%" }}>
            Die Börse ist geschlossen.
            <br />
            Du musst warten bis deine Lehrkraft die Börse wieder öffnet.
          </Heading>
          {firstName && firstName == "admin" && (
            <div>
              <Button className="component" onClick={openExchange}>
                Börse starten
              </Button>
            </div>
          )}
          <div>
            <Button
              className="component"
              onClick={() => navigate("/app/dashboard")}
            >
              Börse verlassen
            </Button>
          </div>
        </div>
      )}
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
    </Layout>
  );
};

export default Dashboard;
