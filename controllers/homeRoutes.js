const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password'],
                    },
                },
                {
                    model: Comment,
                    include: [{
                        model: User,
                        attributes: ['username']
                    }]
                },
            ],
        });

    const blog = blogData.get({ plain: true });

    res.render('blog', { blog, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/blog/:id/addComment', withAuth, async (req,res) => {
    const blogData = req.params.id;
    res.render('addComment', { blogData, loggedIn: req.session.loggedIn });
});

router.post('/blog/:id/addComment', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        user_id: req.session.user_id,
        blog_id: req.params.id,
        content: req.body.content,
      });
      const blogData = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password'],
            },
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
          },
        ],
      });

    const blog = blogData.get({ plain: true });

    res.render('blog', { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: {
        model: User,
        attributes: {
          exclude: ['password']
        }
      }
    });
    const blogs = blogData.map((blog) =>
      blog.get({ plain: true })
    );
    console.log(blogs);

    res.render('dashboard', { blogs, loggedIn: req.session.loggedIn });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard/addPost', withAuth, async (req, res) => {
  const blogData = req.session.user_id;
  res.render('addPost', { blogData, loggedIn: req.session.loggedIn });
});

router.post('/dashboard/addPost', withAuth, async (req, res) => {
  try {
    const newPost = await Blog.create({
      user_id: req.session.user_id,
      title: req.body.title,
      content: req.body.content,
    });
    const userBlogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: {
        model: User,
        attributes: {
          exclude: ['password']
        }
      }
    });
    const blogs = userBlogData.map((blog) =>
      blog.get({ plain: true })
    );
    console.log(blogs);

    res.render('dashboard', { blogs, loggedIn: req.session.loggedIn });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard/updateBlog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        { model: Comment,
        include: [{
          model: User,
          attributes: ['username']
        }] },
      ],
    });
    const blogs = blogData.get({ plain: true });
    res.render('updateBlog', { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/dashboard/updateBlog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if(!blogData[0]) {
      res.status(404).json({message: 'No user with this id!'});
      return;
    }
 
    res.render('blog', { blogData, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/dashboard/deleteBlog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    
    res.status(200).json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err); 
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;