const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

let users = null;
let game = null;

const writeToFile = async () => {
  await fs.writeFile("./data/userData.json", JSON.stringify(users), (err) => {
    if (err) throw err;
  });
  await fs.writeFile(
    "./data/gameData.json",
    JSON.stringify(game, (key, value) => {
      if (key === "exchangeIsOpen") {
        return false;
      }
      return value;
    }),
    (err) => {
      if (err) throw err;
    }
  );
  console.log("Written to file");
};

const loadData = async () => {
  await fs.readFile("./data/userData.json", (err, data) => {
    if (err) throw err;
    try {
      users = JSON.parse(data);
    } catch (err) {
      users = [
        {
          id: "13k4m343i34",
          firstName: "max",
          lastName: "mustermann",
          password: "12345",
          balance: 100,
          stocks: [
            {
              id: "1",
              name: "Apple",
              price: 100,
              amount: 10,
              change: 1,
            },
            {
              id: "2",
              name: "Google",
              price: 200,
              amount: 20,
              change: -1,
            },
          ],
        },
      ];
    }
  });

  await fs.readFile("./data/gameData.json", (err, data) => {
    if (err) throw err;
    try {
      console.log("game is loaded from file");
      game = JSON.parse(data);
    } catch (err) {
      console.log("game is set to default");
      game = {
        exchangeIsOpen: false,
        exchangeLastOpen: Date.now(),
        stocks: [],
      };
    }
  });

  await fs.readFile("./data/sampleData.json", (err, data) => {
    if (err) throw err;
    try {
      game.stocks = JSON.parse(data);
    } catch (err) {
      stocks = [];
      //game.stocks = SAMPLE_DATA.map(obj => ({...obj}));
    }
  });
};

loadData();

app.use((req, res, next) => {
  writeToFile();
  next();
});

app.get("/", (req, res) => {
  res.send("<p>Hello world!<p>");
});

app.get("/login", (req, res) => {
  res.send("<p>Login</p>");
});

const updateStocksChange = (stocks) => {
  if (stocks === null) return;
  stocks.forEach((userStock) => {
    const stock = game.stocks.find((stock) => stock.id === userStock.id);
    if (stock) {
      userStock.change = stock.change;
    }
  });
};

app.post("/login", (req, res) => {
  let user = users.find(
    (user) =>
      user.firstName === req.body.firstName.toLowerCase() &&
      user.password === req.body.password
  );
  console.log(`${req.body.firstName} ${req.body.password}`);
  if (user) {
    updateStocksChange(user.stocks);
    res.send(user);
  } else {
    res
      .status(404)
      .send("Entweder ist dein Vorname oder dein Passwort falsch.");
  }
});

const generateId = () => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
};

app.post("/register", (req, res) => {
  let user = users.find(
    (user) =>
      user.firstName === req.body.firstName &&
      user.lastName === req.body.lastName
  );
  if (user) {
    res.status(404).send("Unter deinem Namen existiert bereits ein Account.");
  } else {
    const id = generateId();
    let newUser = {
      id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      balance: 100,
      stocks: null,
    };
    users.push(newUser);
    res.send(newUser);
    writeToFile();
    console.dir(users, { depth: null });
  }
});

app.get("/isExchangeOpen", (req, res) => {
  if (game.hasOwnProperty("exchangeIsOpen") && game.exchangeIsOpen) {
    res.send(game.exchangeIsOpen);
  } else {
    res.send(false);
  }
  console.log(`exchangeIsOpen: ${game.exchangeIsOpen}`);
});

app.post("/openExchange", (req, res) => {
  if (game && game.hasOwnProperty("exchangeIsOpen")) {
    game.exchangeIsOpen = true;
    if (game.hasOwnProperty("exchangeLastOpen")) {
      game.exchangeLastOpen = Date.now();
    }
    writeToFile();
    res.send(game);
  } else {
    res.status(404).send("Leider ist ein Fehler aufgetreten.");
  }
});

app.post("/closeExchange", (req, res) => {
  if (game && game.hasOwnProperty("exchangeIsOpen")) {
    game.exchangeIsOpen = false;
    writeToFile();
    res.send(game);
  } else {
    res.status(404).send("Leider ist ein Fehler aufgetreten.");
  }
});

app.get("/getStocks", (req, res) => {
  console.log("Stocks:");
  console.dir(game);
  if (game && game.hasOwnProperty("stocks")) {
    res.send(game.stocks);
  } else {
    res.status(404).send("Leider ist ein Fehler aufgetreten.");
  }
});

app.post("/buyStock", (req, res) => {
  const stock = game.stocks.find((stock) => stock.id === req.body.stockId);
  const user = users.find((user) => user.id === req.body.playerId);
  console.log(`stock: ${req.body.stockId}, user: ${users}`);
  console.dir(users);
  if (stock && user) {
    const price = stock.price * req.body.amount;
    if (user.balance >= price) {
      user.balance -= price;
      if (user.stocks === null) {
        user.stocks = [];
      }
      if (user.stocks.find((userStock) => userStock.id === stock.id)) {
        const userStock = user.stocks.find(
          (userStock) => userStock.id === stock.id
        );
        userStock.amount += req.body.amount;
      } else {
        user.stocks.push({
          id: stock.id,
          name: stock.name,
          price: stock.price,
          amount: req.body.amount,
          change: stock.change,
        });
      }
      writeToFile();
      res.send(user);
    } else {
      res.status(404).send("Du hast nicht genug Geld.");
    }
  } else {
    res.status(404).send("Leider ist ein Fehler aufgetreten.");
  }
});

const port = 8000;

app.listen(port, () => console.log(`This app is listening on port ${port}`));
