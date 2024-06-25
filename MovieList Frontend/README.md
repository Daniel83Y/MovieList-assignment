## Movie List
This project is a simple web application that allows users to manage a list of movies. Users can add, edit, and delete movies, as well as view the list of movies with their details.

## Features
Add new movies with title, genre, and rating
Edit existing movies
Delete movies from the list
View a list of movies sorted by rating

## Technologies Used
Frontend:
React
Axios for HTTP requests
CSS for styling

Backend:
ASP.NET Core
Entity Framework Core (for future database implementation)
JSON file storage
System.Text.Json for JSON handling

## Running the App
What You Need:
Node.js and npm
.NET 5 SDK or later

## Setup
Clone the repository:
git clone https://github.com/Daniel83Y/MoveList.git
cd MoveList

## Install dependencies:
cd ClientApp
npm install

### `npm start`

## Run backend server
cd .. 
dotnet run


## Configuration:
appsettings.json file path:
{
  "JsonFilePath": "Data/movies.json"
}


Usage
Viewing the movie list:
Navigate to the homepage to see the list of movies sorted by rating.
Adding a new movie:
Use the "Add New Movie" form to enter the title, genre, and rating for a new movie.
Editing a movie:
Click the "Edit" button next to a movie to update its details.
Deleting a movie:
Click the "Delete" button next to a movie to remove it from the list.