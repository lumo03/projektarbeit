import React, { FC, useState } from "react";
import { animated, config, useSpring } from "react-spring";

interface INumber {
  numbers: {
    start: number;
    end: number;
  };
  classes: string;
}
export const NumberAnimation: FC<INumber> = (props) => {
  const [flip, set] = useState(false);
  const { number } = useSpring({
    reset: true,
    reverse: flip,
    from: { number: props.numbers.start },
    number: props.numbers.end,
    delay: 100,
    config: config.molasses,
    onRest: () => {
      setTimeout(() => {
        set(!flip);
      }, 4000);
    },
  });

  return (
    <div className={props.classes}>
      <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
      <div>$</div>
    </div>
  );
};
