var express = require('express');
var router = express.Router();
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/todo';

router.post('/api/library/livros', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {
                  livro: req.body.livro
                };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO livro(titulo, autor, numeroPaginas, estado, status) values($1, $2, $3, $4, $5)',
    [data.livro.titulo, data.livro.autor, data.livro.numeroPaginas, data.livro.estado, data.livro.status]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM livro ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.get('/api/library/livros', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.put('/api/v1/todos/:livro_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.livro_id;
  // Grab data from http request
  const data = {
                livro: req.body.livro
                };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE livro SET titulo=($1), autor=($2), numeroPaginas=($3), estado=($4), status=($5) WHERE id=($6)',
    [data.livro.titulo, data.livro.autor, data.livro.numeroPaginas, data.livro.estado, data.livro.status, id]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM livro ORDER BY id ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.delete('/api/v1/todos/:livro_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.livro_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM livro WHERE id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM livro ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

module.exports = router;