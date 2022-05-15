import React, { FC } from "react";
import Layout from "../components/Layout";

const About: FC = () => {
  return (
    <Layout title="Über">
      <div style={{ color: "white", marginTop: "50px" }}>
        <h1 style={{ color: "white" }}>Über StockQuest</h1>
        <p>
          StockQuest ist ein Projekt von Luis Moncada (2022) und wurde im Rahmen
          des Projektkurses Informatik an der Marienschule Opladen erstellt.
        </p>
        <h1 style={{ color: "white" }}>Über Luis Moncada</h1>
        <p>
          Ich bin Luis Moncada, ein Schüler der Marienschule Opladen. Neben der
          Schule studiere ich im Rahmen der Hochbegabten-Förderung der Sparkasse
          Opladen an der Universität zu Köln. Meine Lieblingsfächer sind
          Mathematik und Informatik, weshalb ich mich auch für die Teilnahme am
          Projektkurs entschieden habe.
        </p>
      </div>
    </Layout>
  );
};

export default About;
