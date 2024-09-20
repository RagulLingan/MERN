const jwt = require('jsonwebtoken');
const axios = require('axios');
const msal = require('@azure/msal-node');
exports.getTest = async (req,res) => {
    res.status(200).json({
        message : "Test Api Results!"
    })   
}