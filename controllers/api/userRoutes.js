const router = require('express').Router();
const { User, Animal, Category } = require('../../models');

// get all users
router.get('/', async (req, res) => {
  // find all users
  try {
    const userData = await User.findAll( 
      {
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });

      res.status(200).json(userData);
  } catch (err) {
      res.status(500).json(err);
    }
});

// get one user
router.get('/:id', async (req, res) => {
  // find a single user by its `id`
  try {
    const userData = await User.findByPk(req.params.id, 
      {
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
        include: [
          { model: Animal, 
            attridutes: [
              'id',
              'name',
              'description',
              'location',
              'date_created'
            ]
          },
          {
            model: Category,
            attributes: ['category_name']
          },
        ]
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect name or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect name or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
