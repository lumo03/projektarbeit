import React, { FC } from "react";
import Layout from "../components/Layout";

const Error: FC = () => {
  return (
    <Layout title="Fehler">
      <div>
        Oops, es ist leider ein Fehler aufgetreten. Vielleicht stimmt der Link
        nicht?
      </div>
    </Layout>
  );
};

export default Error;
