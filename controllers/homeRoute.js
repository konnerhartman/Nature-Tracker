const router = require('express').Router();
const { Animal, User, Category } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all animals and JOIN with user data
    const animalData = await Animal.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'location',
        'date_created'
      ],
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Category,
          attributes: ['category_name'],
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

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('newUser');
});

router.get('/animal/:id', async (req, res) => {
  try {
    const animalData = await Animal.findByPk(req.params.id, {
      attributes: [
        'id',
        'name',
        'description',
        'location',
        'date_created'
      ],
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Category,
          attributes: ['category_name'],
        },
      ],
    });

    const animal = animalData.get({ plain: true });

    res.render('singleAnimal', {
      animal,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;