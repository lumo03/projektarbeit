import React, { FC } from "react";
import {
  Button,
  Card,
  Columns,
  Content,
  Heading,
  Section,
} from "react-bulma-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import MyTable from "../components/MyTable";
import { RootState } from "../redux-store";
import "../styles/Dashboard.css";

const Dashboard: FC = () => {
  const getFirstName = () => {
    const fName = useSelector((state: RootState) => state.user.name.first);
    if (!fName || fName === "" || fName === " ") {
      return "";
    }
    if (fName.length < 2) {
      return fName.toUpperCase();
    }
    return fName.charAt(0).toUpperCase() + fName.slice(1);
  };

  const navigate = useNavigate();
  const firstName = getFirstName();
  const stocks = useSelector((state: RootState) => state.user.stocks);

  return (
    <Layout title="Dashboard">
      <Heading style={{ color: "white" }}>
        Willkommen zurück, {firstName}!
      </Heading>
      <Button
        className="component"
        onClick={() => navigate("/app/stock-exchange")}
      >
        Börse beitreten
      </Button>
      <Columns>
        <Columns.Column>
          <Section>
            <Card className="component is-shadowless">
              <Card.Content>
                <Card.Header>
                  <Card.Header.Title>
                    <Heading size={4} style={{ color: "white" }}>
                      Mein Depot
                    </Heading>
                  </Card.Header.Title>
                </Card.Header>
                <Content
                  style={{ backgroundColor: "rgb(36, 36, 36)" }}
                  className="is-shadowless"
                >
                  {stocks != null && stocks.length > 0 ? (
                    <MyTable
                      head={
                        <tr>
                          <th style={{ color: "white" }}>Aktie</th>
                          <th style={{ color: "white" }}>Investition</th>
                          <th style={{ color: "white" }}>Gewinn</th>
                        </tr>
                      }
                      body={(() => {
                        let totalPrice = 0;
                        let totalChange = 0;
                        return stocks.map((stock, index) => (
                          <tr
                            className={index == stocks.length - 1 ? "last" : ""}
                            key={Math.random() * 100000}
                          >
                            {(() => {
                              totalPrice += stock.price;
                              totalChange += stock.change;
                            })()}
                            <td>{stock.name}</td>
                            <td>{stock.price}</td>
                            <td>
                              <p
                                className={
                                  stock.change >= 0
                                    ? "is-positive"
                                    : "is-negative"
                                }
                              >
                                {stock.change >= 0
                                  ? "+" + stock.change
                                  : stock.change}
                              </p>
                            </td>
                          </tr>
                        ));
                      })()}
                    />
                  ) : (
                    <p>Keine Aktien</p>
                  )}
                </Content>
              </Card.Content>
            </Card>
          </Section>
        </Columns.Column>
        <Columns.Column>
          <Section>
            <Heading style={{ color: "white" }}>Statistiken</Heading>
            <Card className="component">
              <Card.Content>
                <Card.Header>
                  <Card.Header.Title>
                    <Heading
                      size={4}
                      className="heading"
                      style={{ color: "white" }}
                    >
                      Meine Aktien
                    </Heading>
                  </Card.Header.Title>
                </Card.Header>
                <Content>--hier könnten Statistiken erscheinen--</Content>
              </Card.Content>
            </Card>
            <Card className="component">
              <Card.Content>
                <Card.Header>
                  <Card.Header.Title>
                    <Heading size={4} style={{ color: "white" }}>
                      Highlights und Flauten
                    </Heading>
                  </Card.Header.Title>
                </Card.Header>
                <Content>
                  --hier könnten andere Statistiken erscheinen--
                </Content>
              </Card.Content>
            </Card>
          </Section>
        </Columns.Column>
      </Columns>
    </Layout>
  );
};

export default Dashboard;
