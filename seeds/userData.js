const { User } = require('../models');

const userData = [
    {
        username: 'Jen Wariner',
        email: 'jenniferwariner@test.com',
        password: 'Password1234',
    },
    {
        username: 'Bill Hampton',
        email: 'billhampton@test.com',
        password: 'Password12',
    },
    {
        username: 'Alexis Schitt',
        email: 'alexisschitt@test.com',
        password: 'Password34',
    },

];

const seedUser = () => User.bulkCreate(userData, {individualHooks: true, returning: true});

module.exports = seedUser;