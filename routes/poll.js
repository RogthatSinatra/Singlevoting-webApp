const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');



const Vote = require('../models/Vote');

const Pusher = require('pusher');

const keys = require('../config/keys');

var pusher = new Pusher({
  appId: '498957yourappId',
  key: '0e348b4557b8yourpusherkey',
  secret: 'b74fb96134456a4yourAppscret',
  cluster: 'ap2',
  encrypted: true
});


route.get('/', (req, res) => {
  Vote.find().then(votes => res.json({ success: true, votes: votes }));
});

route.post('/', (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1
  };

  new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os
    });

    return res.json({ success: true, message: 'Thank you for voting' });
  });
});


module.exports = route;


//bmutebi@mubs.ac.ug