import { FC } from "react";

const ConnectionError: FC = () => {
  return (
    <>
      <h3>Oops, irgendwas stimmt hier nicht :( </h3>
      <p>
        Entweder ist der Server gerade nicht aktiv oder es gibt ein Problem mit
        der Internetverbindung.
      </p>
      <p>Versuche es später erneut.</p>
    </>
  );
};

export default ConnectionError;
