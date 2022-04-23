import React, { FC, useEffect, useState } from "react";
import { Message as BulmaMessage } from "react-bulma-components";

interface IProps {
  title: string;
  variant: "info" | "success" | "warning" | "danger";
}

const Message: FC<IProps> = (props) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <BulmaMessage
      className={
        "is-small" + props.variant == "success" ? "is-success" : "is-info"
      }
    >
      <BulmaMessage.Header>{props.variant}</BulmaMessage.Header>
      <BulmaMessage.Body>{props.children}</BulmaMessage.Body>
    </BulmaMessage>
  );
};

export default Message;
