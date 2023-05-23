const { Blog } = require('../models');

const blogData = [
    {
        title: 'CSS for Dummies',
        content: 'When struggling with CSS, try utilizing documentation provided by W3 Schools or MDN Web Docs. CSS is fun and allows you to be creative, do not be afraid to fail or try things out.',
        date_posted: 'May 23, 2023 17:42:00',
    },
    {
        title: 'To use ChatGPT or to not',
        content: 'While ChatGPT is a great resource and can be very helpful in completing school assignments, do not become too dependent upon it. The best way to learn is to try, even if you get it wrong, at least you attempted it yourself.',
        date_posted: 'December 15, 2022 09:15:00',
    },
    {
        title: 'Is AI good or bad for the economy?',
        content: 'AI is the big thing right now, and a lot of it is still not known, which can be scary. For some, AI is exciting and is opening more doors, for others, it brings fear of a possible loss of their job. The fear of job loss can have a large impact on the economy. Before we start to spin out and fear for the worst, let us take a moment to see where AI can take us.',
        date_posted: 'April 21, 2023 14:24:00',
    },
];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;