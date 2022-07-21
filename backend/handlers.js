"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
// const { flights, reservations } = require("./data");

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// returns a list of all flights
const getFlights = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-slingair");
    const flightsCollection = await db.collection("flights").find().toArray();

    if (flightsCollection) {
      res.status(200).json({
        status: 200,
        message: "Flights data found!",
        data: flightsCollection,
      });
    } else {
      throw Error("Not found!");
    }
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, data: "Not found!" });
  }
  client.close();
};

// returns all the seats on a specified flight
const getFlight = async (req, res) => {
  const flight = req.params.flight.toUpperCase();
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-slingair");
    const flightDocument = await db.collection("flights").findOne({ flight });

    if (flightDocument) {
      res
        .status(200)
        .json({ status: 200, message: "Flight found!", data: flightDocument });
    } else {
      throw Error("Not found!");
    }
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, data: "Not Found!" });
  }
  client.close();
};

// returns all reservations
const getReservations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-slingair");
    const reservationsCollection = await db
      .collection("reservations")
      .find()
      .toArray();

    if (reservationsCollection) {
      res.status(200).json({
        status: 200,
        message: "Reservations data found!",
        data: reservationsCollection,
      });
    } else {
      throw Error("Not found!");
    }
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, data: "Not Found!" });
  }
  client.close();
};

// returns a single reservation
const getSingleReservation = async (req, res) => {
  const id = req.params.reservation.toLowerCase();
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-slingair");
    const reservationDocument = await db
      .collection("reservations")
      .findOne({ id });

    if (reservationDocument) {
      res.status(200).json({
        status: 200,
        message: "Reservation found!",
        data: reservationDocument,
      });
    } else {
      throw Error("Not found!");
    }
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, data: "Not found!" });
  }
  client.close();
};

// creates a new reservation
const addReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-slingair");
    const { flight, seat, givenName, surname, email } = req.body;

    const flightDocument = await db.collection("flights").findOne({ flight });
    const seatsInFlight = flightDocument.seats;
    const index = seatsInFlight.findIndex((seatInFlight) => {
      return seatInFlight.id === seat;
    });

    const isSeatAvailable = seatsInFlight[index].isAvailable;

    if (!flight || !seat || !givenName || !surname || !email) {
      return res.status(400).json({
        status: 400,
        message: "Please provide all booking information.",
      });
    }

    if (isSeatAvailable === false) {
      return res
        .status(400)
        .json({ status: 400, message: "This seat has aleady been reserved!" });
    }

    const reservation = { id: uuidv4(), ...req.body };

    const reserveSeat = await db
      .collection("reservations")
      .insertOne(reservation);

    flightDocument.seats[index].isAvailable = false;

    const results = await db
      .collection("flights")
      .replaceOne({ flight }, flightDocument);

    res
      .status(200)
      .json({ status: 200, message: "Seat booked!", data: reservation });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, data: "Booking error!" });
  }
  client.close();
};

// updates an existing reservation
const updateReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { id, flight, seat, givenName, surname, email } = req.body;
  const query = { id };
  const newValues = { $set: { flight, seat, givenName, surname, email } };

  try {
    await client.connect();
    const db = client.db("project-slingair");

    const reservationDocument = await db
      .collection("reservations")
      .findOne({ id });

    const oldSeat = reservationDocument.seat;

    if (!reservationDocument) {
      throw Error("Reservation not found!");
    }

    if (!flight || !seat || !givenName || !surname || !email) {
      throw Error("Updated field(s) cannot be empty!");
    }

    if (!email.includes("@")) {
      throw Error(`Email is missing "@"!`);
    }

    const flightDocument = await db.collection("flights").findOne({ flight });

    if (!flightDocument) {
      throw Error("Flight does not exist!");
    }
    const seatsInFlight = flightDocument.seats;

    const indexOldSeat = seatsInFlight.findIndex((seatInFlight) => {
      return seatInFlight.id === oldSeat;
    });

    const indexSeat = seatsInFlight.findIndex((seatInFlight) => {
      return seatInFlight.id === seat;
    });

    if (!flightDocument.seats[indexSeat].isAvailable) {
      throw Error("Seat is already reserved!");
    }

    flightDocument.seats[indexOldSeat].isAvailable = true;
    flightDocument.seats[indexSeat].isAvailable = false;

    const flightUpdated = await db
      .collection("flights")
      .replaceOne({ flight }, flightDocument);

    const reservationUpdated = await db
      .collection("reservations")
      .updateOne(query, newValues);

    res.status(204).json({ status: 204, message: "Reservation updated!" });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, data: "Not found!" });
  }
  client.close();
};

// deletes a specified reservation
const deleteReservation = async (req, res) => {
  const id = req.params.reservation.toLowerCase();
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-slingair");
    const reservationDocument = await db
      .collection("reservations")
      .findOne({ id });

    if (!reservationDocument) {
      throw Error("Reservation not found!");
    }

    const { flight, seat } = reservationDocument;
    const flightDocument = await db.collection("flights").findOne({ flight });
    const seatsInFlight = flightDocument.seats;
    const index = seatsInFlight.findIndex((seatInFlight) => {
      return seatInFlight.id === seat;
    });

    flightDocument.seats[index].isAvailable = true;

    const seatNowAvailable = await db
      .collection("flights")
      .replaceOne({ flight }, flightDocument);

    const deleteReservation = await db
      .collection("reservations")
      .deleteOne({ id });

    res.status(204).json({
      status: 204,
      message: "Reservation deleted!",
    });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, data: "Not found!" });
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
