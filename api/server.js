const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db.select("*")
        .from("accounts")
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(res.status(500).json({message: err.message}));
});

server.get('/api/accounts', (req, res) => {
    const {id} = req.params;
    db.select("*")
        .from("accounts")
        .where("id", id)
        .first()
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

server.post("/api/accounts", (req, res) => {
    Accounts.create(req.body)
        .then(({id}) => {
            return Accounts.getById(id).first();
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

server.put('/api/accounts/:id', async (req, res) => {
    try{
        await Accounts.update(req.params.id, req.body)
        const updatedAccount = await Accounts.getById(req.params.id).first()
        res.status(200).json(updatedAccount)
    } catch (error){
        res.status(500).json({error: error.message})
    }
})

server.delete('/api/accounts/:id', (req, res) => {
    Accounts.delete(req.params.id)
        .then(data => {
            res.status(200).json({message: "account was deleted"})
        })
        .catch((err) => {
            res.status(500).json({error: err.message});
        })
})

module.exports = server;
