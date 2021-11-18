const router = require('express').Router();
const { Animal, User, Category } = require('../../models');

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
router.post('/', (req, res) => {
  Animal.create({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    category_id: req.body.category_id,
    user_id: req.body.user_id
  }).then((result)=>{
    res.status(200).json(result)
  })
  
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

// update animal
router.put('/:id', (req, res) => {
  // update animal data
  Animal.update({
    name: req.body.name,
    description: req.body.description,
  },
  {
    where: {
      id: req.params.id,
    },
  })
    .then((animal) => {
      // find all associated tags from AnimalTag
      return AnimalTag.findAll({ where: { animal_id: req.params.id } });
    })
    .then((animalTags) => {
      // get list of current tag_ids
      const animalTagIds = animalTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newAnimalTags = req.body.tagIds
        .filter((tag_id) => !animalTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            animal_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const animalTagsToRemove = animalTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        AnimalTag.destroy({ where: { id: animalTagsToRemove } }),
        AnimalTag.bulkCreate(newAnimalTags),
      ]);
    })
    .then((updatedAnimalTags) => res.json(updatedAnimalTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

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
