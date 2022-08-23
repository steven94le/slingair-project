# Welcome to Slingair! :small_airplane:

# Introduction :wave:

This bootcamp project is a flight booking application where a user can see seat availability for a flight, be able to book a seat on the flight, and review/delete their reservation. I also added an admin page as a stretch goal, where the admin can see all current reservations made within the app. The project taught me a lot about server-side programming, specifically developing RESTful server endpoints, database integration with MongoDB, and data persistence.

<img src='frontend/src/assets/screenshots/header.png' style='width:75%' />

---

## **Features :computer:**

Users can select a flight from a dropdown. With the flight number, a server request is made for the seating availability on that flight. When the response with seating is received, the seating input is displayed.

![slingair-select-flight](https://user-images.githubusercontent.com/76791687/186227067-d8bbff27-c4a4-4241-88ed-04e9ad9b5c99.gif)

When the user selects a seat, fills out the necessary form inputs, and clicks 'Confirm', the user will be redirected to the confirmation page that displays the info they entered on the previous screen in addition to a reservation id. Data persistence is present so that a booked seat will no longer be available to anyone for that flight.

![slingair-book-seat](https://user-images.githubusercontent.com/76791687/186227872-84465085-578d-4733-83d0-04c065dc1789.gif)

The reservation button only appears once a reservation has been made and shows the last reservation booked. The interface also allows users to cancel their reservation, in which the associated seat will be made available

![slingair-reservation](https://user-images.githubusercontent.com/76791687/186228282-471a4291-a13c-4a00-a84a-522c944b3087.gif)

![slingair-delete-reservation](https://user-images.githubusercontent.com/76791687/186228458-9250e914-c0f2-43a2-a45f-0b88cfcd3f86.gif)

An admin interface is available to view all of the reservations.

<img width="750" alt="image" src="https://user-images.githubusercontent.com/76791687/186229146-bc8979bb-82f1-4d66-9b94-98b00fe81868.png">
   
## **Deploying The Project :computer:**

Clone the repository to your local machine using the terminal:

`$ git clone git@github.com:steven94le/slingair-project.git`

### Installing the dependencies:

### The Client

1. Navigate to the frontend folder `cd frontend`
2. Install the required packages `yarn install`
3. Once that's done you can start the server with `yarn dev:frontend`

This will run the app in development mode. Open http://localhost:3000 to view it in the browser! The page will reload if you make changes.

### The Server

1. Navigate to the backend folder `cd backend`
2. Install the required packages `yarn install`
3. Once that's done you can start the server with `yarn start`

## **Technologies Used :computer:**

Frontend:
- JavaScript, HTML, CSS
- React.js
- Styled Components

Backend:
- Node.js
- Express

Other Tools:
- GitHub
- Git
- MongoDB

## **Author :bust_in_silhouette:**

- Steven Le (GitHub: [@steven94le](https://github.com/steven94le))
