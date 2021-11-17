const router = require('express').Router();
const { Category, Animal, User } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated animals
  try {
    const categoryData = await Category.findAll(req.params.id, {
      include: [
        { 
          model: Animal, 
          attridutes: [
            'id',
            'name',
            'description',
            'location',
            'date_created'
          ]
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    });
    
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Animals
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        { 
          model: Animal, 
          attridutes: [
            'id',
            'name',
            'description',
            'location',
            'date_created'
          ]
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
