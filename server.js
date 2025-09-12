const express = require("express");
const cors = require("cors");

const app = express();
const port = 3200;

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());

// === ROUTES STATUS ===
app.get("/status", (req, res) => {
  res.json({
    ok: true,
    service: "film-api",
    time: new Date().toISOString(),
  });
});

// middleware fallback 404
app.use((req, res) => {
  res.status(404).json({ error: "Rute tidak ditemukan" });
});


/* ========================
   DUMMY DATA SUTRADARA
======================== */
let directors = [
  { id: 1, name: "Shavira", birthYear: 2006 },
  { id: 2, name: "Nindya", birthYear: 2002 },
  { id: 3, name: "Putriawan", birthYear: 2000 },
];

/* ========================
   DUMMY DATA MOVIES
======================== */
let movies = [
  { id: 1, title: "Barbie", year: 2023, directorId: 1 },
  { id: 2, title: "Wonder Woman", year: 2017, directorId: 2 },
  { id: 3, title: "Nomadland", year: 2020, directorId: 3 },
];

// Root endpoint
app.get("/", (req, res) => {
  res.send("Selamat Datang di server Node.js");
});

/* ========================
   CRUD DIRECTORS
======================== */
// GET all directors
app.get("/directors", (req, res) => {
  res.json(directors);
});

// GET director by ID
app.get("/directors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const director = directors.find((d) => d.id === id);
  if (director) {
    res.json(director);
  } else {
    res.status(404).json({ error: "Sutradara tidak ditemukan" });
  }
});

// POST new director
app.post("/directors", (req, res) => {
  const { name, birthYear } = req.body || {};
  if (!name || !birthYear) {
    return res.status(400).json({ error: "Name dan birthYear wajib diisi" });
  }
  const newDirector = {
    id: directors.length + 1,
    name,
    birthYear,
  };
  directors.push(newDirector);
  res.status(201).json(newDirector);
});

// PUT update director
app.put("/directors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = directors.findIndex((d) => d.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Sutradara tidak ditemukan" });
  }
  const { name, birthYear } = req.body || {};
  if (!name || !birthYear) {
    return res.status(400).json({ error: "Name dan birthYear wajib diisi" });
  }
  const updated = { id, name, birthYear };
  directors[index] = updated;
  res.json(updated);
});

// DELETE director
app.delete("/directors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = directors.findIndex((d) => d.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Sutradara tidak ditemukan" });
  }
  directors.splice(index, 1);
  res.status(204).send();
});

/* ========================
   CRUD MOVIES
======================== */
// GET all movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

// GET movie by ID
app.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Film tidak ditemukan" });
  }
});

// POST new movie
app.post("/movies", (req, res) => {
  const { title, year, directorId } = req.body || {};
  if (!title || !year || !directorId) {
    return res
      .status(400)
      .json({ error: "Title, year, dan directorId wajib diisi" });
  }
  const newMovie = {
    id: movies.length + 1,
    title,
    year,
    directorId,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// PUT update movie
app.put("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex((m) => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Film tidak ditemukan" });
  }
  const { title, year, directorId } = req.body || {};
  if (!title || !year || !directorId) {
    return res
      .status(400)
      .json({ error: "Title, year, dan directorId wajib diisi" });
  }
  const updated = { id, title, year, directorId };
  movies[index] = updated;
  res.json(updated);
});

// DELETE movie
app.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex((m) => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Film tidak ditemukan" });
  }
  movies.splice(index, 1);
  res.status(204).send();
});

/* ========================
   ERROR HANDLER
======================== */
app.use((err, req, res, _next) => {
  console.error("[ERROR]", err);
  res.status(500).json({ error: "Terjadi kesalahan pada server" });
});

/* ========================
   START SERVER
======================== */
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
