const router = require('express').Router();
const { Animal, Category } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
      // Get all posts and JOIN with user/comment data
      const animalData = await Animal.findAll({
        where: {
          user_id: req.session.user_id
        },
        attributes: [
          'id',
          'name',
          'description',
          'location',
          'date_created'
        ],
        include: [
          {
            model: Category,
            attributes: ['category_name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const animals = animalData.map((animal) => animal.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('dashboard', { 
        animals, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});
  
router.get('edit/:id', withAuth, async (req, res) => {
    try {
      const animalData = await Animal.findByPk({
        where: {
          user_id: req.session.user_id
        },
        attributes: [
          'id',
          'name',
          'description',
          'location',
          'date_created'
        ],
        include: [
          {
            model: Category,
            attributes: ['category_name'],
          },
        ],
      });
    
      // Serialize data so the template can read it
      const animals = animalData.map((animal) => animal.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('editAnimal', { 
        animals, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/new', (req, res) => {
  res.render('newAnimal');
});

module.exports = router;