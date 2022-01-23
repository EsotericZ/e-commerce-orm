const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const category = await Category.findAll();
    res.json(category);
  } catch (e) {
    res.json(e);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    res.json(category);
  } catch (e) {
    res.json(e);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  const { category_name } = req.body;
  try {
    const newCategory = await Category.create({
      category_name,
    });
    res.json(newCategory);
  } catch (e) {
    res.json(e);
  }
});

router.put('/:id', async (req, res) => {
  const { category_name } = req.body;
  try {
    await Category.update({ 
      category_name,
    },
    {
      where: { 
        id: req.params.id,
      }
    }
    );
    const updatedCategory = await Category.findByPk(req.params.id);
    res.json(updatedCategory);
  } catch (e) {
    res.json(e);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;