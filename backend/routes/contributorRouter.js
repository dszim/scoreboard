const router = require('express').Router();
// const contributor = require('../models/contributor.model');

const spawn = require("child_process").spawn;


/**
* Route to get all contributors. Returns an array of contributors
*/
router.route('/').get((req, res) => {
    const pythonProcess = spawn('python', ['./pythonScripts/getAllContributors.py']);
    var dataToSend;
    pythonProcess.stdout.on('data', (data) => {
        dataToSend = data.toString();
    });

    pythonProcess.on('close', (code) => {
        console.log("close the process: ", code);
        res.setHeader('content-type', 'application/json');
        res.send(dataToSend);
    });
});


/**
 * Route to get the total meters per contributor. Returns an array of contributors with their total meters contributed
 */
router.route('/totalmeters').get((req, res) => {
    const pythonProcess = spawn('python', ['./pythonScripts/getAllContributorsAndMeters.py']);
    var dataToSend;
    pythonProcess.stdout.on('data', (data) => {
        dataToSend = data.toString();
    });

    pythonProcess.on('close', (code) => {
        console.log(code,": process closed -- total meters requested ");
        res.setHeader('content-type', 'application/json');
        res.send(dataToSend);
    });

});

/** 
 * Route to get a single contributor and all of their contributions
*/
router.route('/rower/:name').get((req, res) => {
    const pythonProcess = spawn('python', ['./pythonScripts/getOneContributorByName.py', req.params.name]);
    var dataToSend;
    pythonProcess.stdout.on('data', (data) => {
        dataToSend = data.toString();
    });

    pythonProcess.on('close', (code) => {
        console.log(code,": process closed -- individual rower requested");
        res.setHeader('content-type', 'application/json');
        res.send(dataToSend);
    });

});

/** 
 * Route to insert one contribution
*/
router.route('/workout').post((req, res) =>{
    const pythonProcess = spawn('python', ['./pythonScripts/insertOneContribution.py', JSON.stringify(req.body.document)]);
    var dataToSend;
    pythonProcess.stdout.on('data', (data) => {
        dataToSend = data.toString();
    });

    pythonProcess.on('close', (code) => {
        console.log("close the process: ", code);
        res.setHeader('content-type', 'text/html');
        res.send(dataToSend);
    });
});

/** 
 * Route to delete one contribution by id
*/
router.route('/:id').delete((req, res) => {
    const pythonProcess = spawn('python', ['./pythonScripts/deleteOneContributionById.py', req.params.id]);
    var dataToSend;
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