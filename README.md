# Point Tracker

## Overview
Point Tracker App is a simple web application that allows users to manage a set of named points on a 2D plane. Users can add, edit, and delete points; the application displays them in a user-friendly table. The nearest and farthest points are calculated in real time as users edit point coordinates.

## Features
- Display a list of points in a table sorted by name.
- Add new points with names and coordinates (X, Y).
- Edit existing points.
- Delete points from the list.
- Real-time calculation of nearest and farthest points based on current coordinates.
- User-friendly interface with modern design.

## Tech Stack
- **Frontend**: Vue.js
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Styling**: Custom CSS

## Installation

### Prerequisites
- Node.js (v18.x or later)
- npm (v10.x or later)
- PostgreSQL

### Setting Up the Database
1. Ensure PostgreSQL is running on your machine.
2. Create a database for the application.
3. Create the `point` table by running the following SQL command:
   ```sql
   CREATE TABLE point (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       x INTEGER NOT NULL,
       y INTEGER NOT NULL
   );

### Clone the Repository
git clone https://github.com/yourusername/PointTrackerApp.git
cd point-tracker-app

### Install Dependencies
For the FrontEnd:
npm install
For the BackEnd:
cd point-tracker-backend
npm install

### Configuration
Update the database connection string in the backend configuration file to match your PostgreSQL setup.

### Running the Application
Start the backend server:
cd point-tracker-backend
node index.js
Start the frontend development server:
cd point-tracker-frontend
npm run serve
The application will be running at http://localhost:8080/.
