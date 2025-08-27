const express = require('express');
const api = express.Router()

const COLLECTIONS = require('./collections')

const { NotesRouter } = require('../notes/nota.router');

api.use( `/${ COLLECTIONS.NOTES }`, NotesRouter );

module.exports = api