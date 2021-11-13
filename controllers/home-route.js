const router = require('express').Router();
const { Animal, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all animals and JOIN with user data
    const animalData = await Animal.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const animals = animalData.map((animal) => animal.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      animals, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const animalData = await Animal.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const animal = animalData.get({ plain: true });

    res.render('animal', {
      ...animal,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;