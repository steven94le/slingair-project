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
    const flightsDocument = await db.collection("flights").distinct("flight");

    if (flightsDocument) {
      return res.status(200).json({
        status: 200,
        message: "Flights found!",
        data: flightsDocument,
      });
    } else {
      throw Error("Flights not found!");
    }
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, error: "Flights not found!" });
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
      return res
        .status(200)
        .json({ status: 200, message: "Flight found!", data: flightDocument });
    } else {
      throw Error("Flight not found!");
    }
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, error: "Flight not found!" });
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
      return res.status(200).json({
        status: 200,
        message: "Reservations found!",
        data: reservationsCollection,
      });
    } else {
      throw Error("Reservations not found!");
    }
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, error: "Reservations not found!" });
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
      return res.status(200).json({
        status: 200,
        message: "Reservation found!",
        data: reservationDocument,
      });
    } else {
      throw Error("Reservation not found!");
    }
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, error: "Reservation not found!" });
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

    if (!flight || !seat || !givenName || !surname || !email) {
      return res.status(400).json({
        status: 400,
        error: "Please provide all booking information.",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        status: 400,
        error: "Please provide valid email.",
      });
    }

    if (index === -1) {
      return res.status(400).json({
        status: 400,
        error: "This seat does not exist!",
      });
    }

    const isSeatAvailable = seatsInFlight[index].isAvailable;

    if (isSeatAvailable === false) {
      return res
        .status(400)
        .json({ status: 400, error: "This seat has aleady been reserved!" });
    }

    const reservation = { id: uuidv4(), ...req.body };

    const reserveSeat = await db
      .collection("reservations")
      .insertOne(reservation);

    flightDocument.seats[index].isAvailable = false;

    const results = await db
      .collection("flights")
      .replaceOne({ flight }, flightDocument);

    return res
      .status(200)
      .json({ status: 200, message: "Seat booked!", data: reservation });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, error: "Seat not found!" });
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
      return res
        .status(400)
        .json({ status: 400, error: "Reservation not found!" });
    }

    if (!flight || !seat || !givenName || !surname || !email) {
      return res
        .status(400)
        .json({ status: 400, error: "Updated field(s) cannot be empty!" });
    }

    if (!email.includes("@")) {
      return res
        .status(400)
        .json({ status: 400, error: `Email is missing "@"!` });
    }

    const flightDocument = await db.collection("flights").findOne({ flight });

    if (!flightDocument) {
      return res
        .status(400)
        .json({ status: 400, error: "Flight does not exist!" });
    }
    const seatsInFlight = flightDocument.seats;

    const indexOldSeat = seatsInFlight.findIndex((seatInFlight) => {
      return seatInFlight.id === oldSeat;
    });

    const indexSeat = seatsInFlight.findIndex((seatInFlight) => {
      return seatInFlight.id === seat;
    });

    if (indexSeat === -1) {
      return res
        .status(400)
        .json({ status: 400, error: "Seat does not exist!" });
    }

    if (!flightDocument.seats[indexSeat].isAvailable) {
      return res
        .status(400)
        .json({ status: 400, error: "Seat is already reserved!" });
    }

    flightDocument.seats[indexOldSeat].isAvailable = true;
    flightDocument.seats[indexSeat].isAvailable = false;

    const flightUpdated = await db
      .collection("flights")
      .replaceOne({ flight }, flightDocument);

    const reservationUpdated = await db
      .collection("reservations")
      .updateOne(query, newValues);

    return res
      .status(204)
      .json({ status: 204, message: "Reservation updated!" });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, error: "Reservation not found!" });
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
      return res
        .status(400)
        .json({ status: 400, error: "Reservation not found!" });
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

    return res.status(204).json({
      status: 204,
      message: "Reservation deleted!",
    });
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, error: "Reservation not found!" });
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
