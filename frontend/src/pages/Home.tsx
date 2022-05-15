import React, { FC, useRef } from "react";
import Layout from "../components/Layout";
import "../styles/Home.css";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Container, Heading, Section } from "react-bulma-components";
import { NumberAnimation } from "../components/NumberAnimation";

const Home: FC = () => {
  const ref = useRef<IParallax>();

  return (
    <Layout title="Start">
      <div className="content">
        <Parallax pages={2} ref={ref}>
          <ParallaxLayer offset={0} id="layer1" speed={2} className="layer">
            {/* <div>
              <p id="heading">Willkommen beim Aktienspiel!</p>
              <p id="text" onClick={() => ref.current.scrollTo(1)}>Scrolle nach unten</p>
            </div>*/}
            <div className="layer-content">
              <p className="heading">Aktienhandel, neu erfunden.</p>
              <p className="text">
                Wir stellen das erste Spiel seiner Art vor:{" "}
                <strong style={{ color: "white", fontWeight: 800 }}>
                  StockQuest
                </strong>
                .<br /> Du musst deine Aktien verwalten und kluge Entscheidungen
                treffen, um der beste Aktienhändler zu werden. Dieses Spiel wird
                dir die finanziellen Grundlagen des Aktienmarktes spielerisch
                beibringen und du wirst dabei viel Spaß haben!
              </p>
            </div>
            <NumberAnimation
              numbers={{ start: 10_000, end: 20_000 }}
              classes="animation"
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} id="layer2" className="layer" />

          <ParallaxLayer offset={1} id="layer3" className="layer">
            <div className="layer-content">
              <p className="heading">Lerne den Umgang mit Geld und Aktien.</p>
              <p className="text">
                Aktien sind die stärkste Kraft des Kapitalismus, weil sie den
                Wert Ihres Geldes und zukünftiger Investitionen bestimmen.
                Aktien sind jedoch auch verwirrend. Unser Team arbeitet an einem
                Spiel, das Ihnen beibringt, ein Aktieninvestor zu werden und auf
                unterhaltsame und leicht verständliche Weise mit Aktien und Geld
                umzugehen.
              </p>
            </div>
            <img
              src="/money-background-smaller.jpg"
              alt="Stock"
              className="image"
            />
          </ParallaxLayer>
        </Parallax>
      </div>
    </Layout>
  );
};

export default Home;
