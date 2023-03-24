var express = require('express');
var router = express.Router();

const getActiveDB = require("../modules/getActiveDB");
const getUsersDB = require("../modules/getUsersDB");
const insertToDB = require("../modules/insertToDB");
const updateStatusDB = require("../modules/updateStatusDB");
const deleteFromDB = require("../modules/deleteFromDB");

// var con = require('../modules/database');

/* GET tasks */
router.get('/', async function (req, res, next) {
  const active = await getActiveDB();

  res.send(active);
});

/* GET users */
router.get('/users/', async function (req, res, next) {
  const users = await getUsersDB();

  res.send(users);
});

// insert
router.post('/', async function(req, res, next) {
  const postTitle = await req.body.title;
  const postDescription = await req.body.description;
  const postUser = await req.body.user;

  const inserted = await insertToDB(postTitle, postDescription, postUser);
  
  res.status(200).send({ success: true, message: "\"" + postTitle + "\" toegevoegd" }).end();
});

// update
router.put('/', async function(req, res, next) {
  const postId = Number(req.body.id);
  const postTitle = req.body.title;

  const postUpdating = await updateStatusDB(postId, postTitle);

  res.status(200).send({ success: true, message: "Status van \"" + postTitle + "\" aangepast" }).end();
});

// delete
router.delete('/', async function(req, res, next) {
  const postId = Number(req.body.id);
  const postTitle = req.body.title;

  const postDeleting = await deleteFromDB(postId, postTitle);

  const active = await getActiveDB();

  res.status(200).send({ success: true, message: "\"" + postTitle + "\" verwijderd" }).end();
});

module.exports = router;