import React, { FC } from "react";
import Layout from "../components/Layout";

const Imprint: FC = () => {
  return (
    <Layout title="Impressum">
      <div style={{ color: "white", marginTop: "50px" }}>
        {/* Generiert mit der Website: https://www.activemind.de/datenschutz/generatoren/impressum/ergebnis/ */}
        <h1 style={{ color: "white" }}>Impressum</h1>
        <h2 style={{ color: "white" }}>Angaben gemäß § 5 TMG:</h2>
        <p>
          Marienschule Opladen
          <br />
          Luis Moncada
        </p>
        <h3 style={{ color: "white" }}>Postanschrift:</h3>
        <p>
          Im Hausfeld 12
          <br />
          40764 Langenfeld
          <br />
        </p>
        <h3 style={{ color: "white" }}>Kontakt:</h3>
        <p>E-Mail: lm8416@marienschule-students.com</p>
        <p></p>
        <p>
          <br />
        </p>
        <p></p>
        <h2 style={{ color: "white" }}>Hinweise zur Website</h2>
        <p></p>
        <h2 style={{ color: "white" }}>Information gemäß § 36 VSBG</h2>
        <p>
          Gemäß § 36 VSBG (Verbraucherstreitbeilegungsgesetz – Gesetz über die
          alternative Streitbeilegung in Verbrauchersachen) erklärt der
          Betreiber dieser Website:
        </p>
        <p>
          Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </Layout>
  );
};

export default Imprint;
