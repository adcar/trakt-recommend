const Trakt = require("trakt.tv");
const { MovieDb } = require("moviedb-promise");
require("dotenv").config();

let options = {
  client_id: process.env.TRAKT_CLIENT_ID,
  client_secret: process.env.TRAKT_CLIENT_SECRET,
  redirect_uri: "http://localhost:3000/callback",
  pagination: false, // defaults to false, global pagination (see below)
};

export const tmdb = new MovieDb(process.env.TMDB_API_KEY);

export const trakt = new Trakt(options);
