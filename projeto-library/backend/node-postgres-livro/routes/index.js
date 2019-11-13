var express = require('express');
var router = express.Router();
var cors = require('cors');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/biblioteca';

router.use(cors());

router.post('/api/library/livros', (req, res, next) => {

  const results = [];
  const data = {
                  titulo: req.body.titulo,
                  autor: req.body.autor,
                  numeropaginas: req.body.numeropaginas,
                  estado: req.body.estado,
                  status: req.body.status,
                };
  
  pg.connect(connectionString, (err, client, done) => {
    
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    
    client.query('INSERT INTO livro(titulo, autor, numeropaginas, estado, status) values($1, $2, $3, $4, $5)',
    [data.titulo, data.autor, data.numeropaginas, data.estado, data.status]);
    
    const query = client.query('SELECT * FROM livro ORDER BY id ASC');
    
    query.on('row', (row) => {
      results.push(row);
    });
    
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.get('/api/library/livros', (req, res, next) => {
  const results = [];
  
  pg.connect(connectionString, (err, client, done) => {
    
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    
    const query = client.query('SELECT * FROM livro ORDER BY id ASC;');
    
    query.on('row', (row) => {
      results.push(row);
    });
    
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.get('/api/library/livros/:livro_id', (req, res, next) => {
  const results = [];
  const id = req.params.livro_id;

  pg.connect(connectionString, (err, client, done) => {
    
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    
    const query = client.query('SELECT * FROM livro WHERE id=($1);', [id]);
    
    query.on('row', (row) => {
      results.push(row);
    });
    
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.get('/api/library/livros/busca/:text_fragment', (req, res, next) => {
  const results = [];
  const texto = req.params.text_fragment;

  pg.connect(connectionString, (err, client, done) => {
    
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    
    const query = client.query("SELECT * FROM livro WHERE titulo ILIKE '%" + texto + "%' OR autor ILIKE '%" + texto + "%' OR CAST(numeropaginas AS CHAR) ILIKE '%" + texto + "%' OR estado ILIKE '%" + texto + "%' OR status ILIKE '%" + texto + "%';");
    
    query.on('row', (row) => {
      results.push(row);
    });
    
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.put('/api/library/livros/:livro_id', (req, res, next) => {

  const results = [];
  const id = req.params.livro_id;
  const data = {
                  titulo: req.body.titulo,
                  autor: req.body.autor,
                  numeropaginas: req.body.numeropaginas,
                  estado: req.body.estado,
                  status: req.body.status,
                };
  
  pg.connect(connectionString, (err, client, done) => {
    
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    
    client.query('UPDATE livro SET titulo=($1), autor=($2), numeropaginas=($3), estado=($4), status=($5) WHERE id=($6)',
    [data.titulo, data.autor, data.numeropaginas, data.estado, data.status, id]);
    
    const query = client.query("SELECT titulo, autor, numeropaginas, estado, status FROM livro ORDER BY id ASC");
   
    query.on('row', (row) => {
      results.push(row);
    });
    
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.delete('/api/library/livros/:livro_id', (req, res, next) => {

  const results = [];
  const id = req.params.livro_id;
  
  pg.connect(connectionString, (err, client, done) => {
    
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    
    client.query('DELETE FROM livro WHERE id=($1)', [id]);
    
    var query = client.query('SELECT * FROM livro ORDER BY id ASC');
    
    query.on('row', (row) => {
      results.push(row);
    });
    
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

module.exports = router;
