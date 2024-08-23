/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const subscribersFilePath = path.join(__dirname, '../data/subscribers.json');

router.post('/newsletter', (req, res) => {
    const { email, name } = req.body;
    if (!email || !name) {
        console.log('Validation failed: Name and email are required');
        return res.status(400).json({ message: 'Name and email are required' });
    }

    console.log('Received subscription:', { email, name });

    fs.readFile(subscribersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading subscribers file:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        let subscribers = [];
        try {
            subscribers = JSON.parse(data);
        } catch (err) {
            console.error('Error parsing subscribers file:', err);
        }

        subscribers.push({ email, name });
        console.log('Updated subscribers list:', subscribers);

        fs.writeFile(subscribersFilePath, JSON.stringify(subscribers, null, 2), (err) => {
            if (err) {
                console.error('Error writing to subscribers file:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            console.log('Subscription saved successfully');
            return res.status(200).json({ message: 'Subscription successful' });
        });
    });
});

module.exports = router;
