const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        blog_id: 2,
        content: 'Very informative!'
    },
    {
        user_id: 3,
        blog_id: 2,
        content: 'This could be very scary.'
    },
    {
        user_id: 2,
        blog_id: 3,
        content: 'Could be a great thing!'
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;