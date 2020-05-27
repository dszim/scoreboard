const router = require('express').Router();
// const contributor = require('../models/contributor.model');

router.route('/').get((req, res) => {

    var spawn = require("child_process").spawn;
    var dataToSend;
    const pythonProcess = spawn('python', ['./pythonScripts/getAllContributors.py']);
    pythonProcess.stdout.on('data', (data) => {
        dataToSend = data.toString();
    });

    pythonProcess.on('close', (code) => {
        console.log("close the process: ", code);
        res.setHeader('content-type', 'application/json');
        res.send(dataToSend);
    });
});

router.route('/totalmeters').get((req, res) => {
    var spawn = require("child_process").spawn;
    var dataToSend;
    const pythonProcess = spawn('python', ['./pythonScripts/getAllContributorsAndMeters.py']);
    pythonProcess.stdout.on('data', (data) => {
        dataToSend = data.toString();
    });

    pythonProcess.on('close', (code) => {
        console.log("close the process: ", code);
        res.setHeader('content-type', 'application/json');
        res.send(dataToSend);
    });

});

router.route('/:id').get((req, res) => {
    var spawn = require("child_process").spawn;
    var dataToSend;
    const pythonProcess = spawn('python', ['./pythonScripts/getOneContributorByName.py', req.params.id]);
    pythonProcess.stdout.on('data', (data) => {
        dataToSend = data.toString();
    });

    pythonProcess.on('close', (code) => {
        console.log("close the process: ", code);
        res.setHeader('content-type', 'application/json');
        res.send(dataToSend);
    });

});


module.exports = router;