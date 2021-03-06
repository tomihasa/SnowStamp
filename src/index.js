let express = require("express");
let bodyParser = require("body-parser");
let moment = require('moment-timezone');
let path = require("path");
let app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const discordEpoch = 1420070400000;

app.get("/time-stamp", (req, res) => {
    const messageIdString = req.query.message;
    const id = BigInt.asUintN(64, messageIdString);
    const dateBits = Number(id >> 22n);

    const date = new Date(dateBits + discordEpoch);
    const unix = (dateBits + discordEpoch);
    const iso = new Date(unix).toISOString();
    //console.log(`Unix - ${unix}`); unix = Unix date
    //console.log(`ISO - ${iso}`); ISO 8601 iso = ISO 8601
    const time = moment.utc(date).format('MMMM Do YYYY, h:mm:ss a');
    const timeFormated = `${time} UTC`;
    res.send({ timeFormated });
    res.send({ unix });
});

app.get("/unix-stamp", (req, res) => {
    const messageIdString = req.query.message;
    const id = BigInt.asUintN(64, messageIdString);
    const dateBits = Number(id >> 22n);

    const date = new Date(dateBits + discordEpoch);
    const unix = (dateBits + discordEpoch);
    const iso = new Date(unix).toISOString();
    console.log(`Unix - ${unix}`); //unix = Unix date
    res.send({ unix });
});

app.get("/iso-stamp", (req, res) => {
    const messageIdString = req.query.message;
    const id = BigInt.asUintN(64, messageIdString);
    const dateBits = Number(id >> 22n);

    const date = new Date(dateBits + discordEpoch);
    const unix = (dateBits + discordEpoch);
    const iso = new Date(unix).toISOString();
    console.log(`ISO - ${iso}`); //ISO 8601 iso = ISO 8601
    res.send({ iso });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Port - ${port} | http://localhost:${port}`));
