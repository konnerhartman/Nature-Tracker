const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
      // Get all posts and JOIN with user/comment data
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
      res.render('dashboard', { 
        animals, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});
  
router.get('/:id', withAuth, async (req, res) => {
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
  
module.exports = router;