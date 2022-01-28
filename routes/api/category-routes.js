const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(category);
  } catch (e) {
    res.json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.json(category);
  } catch (e) {
    res.json(e);
  }
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

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByPk(req.params.id);
    await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json(deletedCategory);
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;