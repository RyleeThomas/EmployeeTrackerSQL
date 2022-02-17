const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//Get all position
router.get('/positions', (req, res) => {
    const sql = `SELECT * FROM positions`;
  
    db.query(sql, (err, rows) => {
      if(err) {
        res.status(500).json({error: err.message});
        return;
      }
      res.json({
        message:'success',
        data: rows
      });
    });
  });
  
  //Get a single position
  router.get('/positions/:id', (req, res) => {
    const sql = `SELECT * FROM positions WHERE id = ?`;
  const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if(err){
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });
  
  //Delete a position
  router.delete('/positions/:id', (req, res) => {
    const sql = `DELETE FROM positions WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message});
      } else if (!result.affectedRows) {
        res.json({
          message: 'Position not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });
  
  //Create a position
  router.post('/positions', ({ body }, res) => {
      const sql = `INSERT INTO positions (title, salary, department_id) VALUES (?,?,?)`;
      const params = [body.title, body.salary, body.department_id];
  
      db.query(sql, params, (err) => {
        if(err) {
          res.status(400).json({ error: err.message});
          return;
        }
        res.json({
          message: 'success',
          data: body
        });
  
      }); 
  });

module.exports = router;