const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { flights, reservations } = require("./data");

const flightsArr = Object.entries(flights);

const flightsForImport = flightsArr.map((flight) => {
  return {
    flight: flight[0],
    seats: flight[1],
  };
});

const batchImport = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-slingair");

    const flightResults = await db
      .collection("flights")
      .insertMany(flightsForImport);
    console.log("flightResults", flightResults);

    const reservationResults = await db
      .collection("reservations")
      .insertMany(reservations);
    console.log("reservationResults", reservationResults);

    console.log("success!");
  } catch (err) {
    console.log(err.stack);
    console.log("error!");
  }
  client.close();
};

batchImport();
