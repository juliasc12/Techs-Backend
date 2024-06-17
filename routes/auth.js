const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Pessoa = require('../models/pessoa');

router.post('/signup', (req, res) => {
    const { email, senha, name, username, date } = req.body;
    Pessoa.findOne({ email })
        .then(pessoa => {
            if (pessoa) {
                return res.status(400).json({ message: 'Email já cadastrado' });
            } else {
                const nova_pessoa = new Pessoa({
                    name,
                    email,
                    username,
                    date
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(senha, salt, (err, hash) => {
                        if (err) throw err;
                        nova_pessoa.senha = hash;
                        nova_pessoa.save()
                            .then(pessoa => res.json(pessoa))
                            .catch(err => {
                                console.error(err);
                                res.status(500).sendFile(__dirname + '/error404.html'); 
                            });
                    });
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).sendFile(__dirname + '/error404.html'); 
        });
});

router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;
