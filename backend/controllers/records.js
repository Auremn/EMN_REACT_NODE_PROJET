const TabRecord = require('../models/TabRecord');
const fs = require('fs');

exports.createThing = (req,res,next) => {
    const name = req.body.name;
    const Score = req.body.nbVie;
    const date = new Date().toLocaleString();
    const record = new TabRecord({
        name,
        date,
        Score,
    });
    record.save()
        .then(() => res.status(201).json({message: 'record Enregistré'}))
        .catch(error => res.status(400).json({error}));
};

exports.getAllThing = (req,res,next) => {
    TabRecord.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(404).json({error}));
};