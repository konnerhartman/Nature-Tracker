const router = require('express').Router();
const { Animal, User, Category } = require('../../models');
const withAuth = require('../../utils/auth');
// The `/api/animals` endpoint
// get all animals
router.get('/', async (req, res) => {
  // find all animals
  // be sure to include its associated Category and Tag data
  try {
    const animalData = await Animal.findAll(req.params.id, {
      attributes: [
        'id',
        'name',
        'description',
        'location',
        'date_created'
      ],
      order: [
        ['created_at', 'DESC']
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
    res.status(200).json(animalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one animal
router.get('/:id', async (req, res) => {
  // find a single animal by its `id`
  // be sure to include its associated Category data
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

    if (!animalData) {
      res.status(404).json({ message: 'No animal found with this id!' });
      return;
    }

    res.status(200).json(animalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new animal
router.post('/', withAuth, (req, res) => {
  Animal.create({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    category_id: req.body.category_id,
    user_id: req.session.user_id
  }).then((result)=>{
    res.status(200).json(result)
  })
  
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

// update animal
router.put('/:id', withAuth, (req, res) => {
  // update animal data
  Animal.update({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location
  },
  {
    where: {
      id: req.params.id,
    },
  })
  .then(animalData => {
    if (!animalData) {
        res.status(404).json({ message: 'No animal found with this id' });
        return;
    }
    res.json(animalData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});
//     .then((animal) => {
//       // find all associated tags from AnimalTag
//       return AnimalTag.findAll({ where: { animal_id: req.params.id } });
//     })
//       // figure out which ones to remove
//       const animalTagsToRemove = animalTags
//         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//         .map(({ id }) => id);

//       // run both actions
//       return Promise.all([
//         AnimalTag.destroy({ where: { id: animalTagsToRemove } }),
//         AnimalTag.bulkCreate(newAnimalTags),
//       ]);
//     })
//     .then((updatedAnimalTags) => res.json(updatedAnimalTags))
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });

router.delete('/:id', async (req, res) => {
  // delete one animal by its `id` value
  try {
    const animalData = await Animal.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!animalData) {
      res.status(404).json({ message: 'No animal found with this id!' });
      return;
    }

    res.status(200).json(animalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
