const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//Get all employee
router.get('/employee', (req, res) => {
    const sql = `SELECT * FROM employee`;
  
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
  
  //Get a single employee
  router.get('/employee/:id', (req, res) => {
    const sql = `SELECT * FROM employee WHERE id = ?`;
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
  router.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message});
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
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
  
  //Create a employee
  router.post('/employee', ({ body }, res) => {
      const sql = `INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES (?,?,?,?)`;
      const params = [body.first_name, body.last_name, body.position_id, body.manager_id];
  
      db.query(sql, params, (err) => {
        if(err) {
          res.status(400).json({ error: err.message});
          return;
        }
        res.json({
          message: 'success',
          data:body
        });
  
      }); 
  });

  module.exports = router;