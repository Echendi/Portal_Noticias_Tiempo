const express = require('express');
const router = express.Router();
const fs = require('fs');
const petition = __dirname.replace("routes", "access.log");

router.get('/', async (req, res) => {
    let logsRead = []
    await fs.readFileSync(petition).toString().split('\n').forEach(line => {
        if (line != "") {
            let lines = line.split(" ");
            let method = lines[0];
            let petition = lines[1];
            let status = lines[2];
            let date = lines[3] + " " + lines[4] + " " + lines[5] + " " + lines[6] + " " + lines[7] + " " + lines[8];
            logsRead.push(
                {
                    method,
                    date,
                    petition,
                    status
                }
            );
        }
    });
    res.send(logsRead);
});

module.exports = router;