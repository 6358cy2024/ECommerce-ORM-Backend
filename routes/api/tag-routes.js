const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    try {
        const tags = await Tag.findAll({
            include: [{ model: Product }],
            where: { id: req.params.id }
        });
        res.status(200).json(tags);
    } catch {
        res.status(500).json(err);

    }
});

router.get('/:id', async (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    try {
        const tag = await Tag.findOne({

            include: [{ model: Product }],
            where: { id: req.params.id }
        });
        if (!tag) {
            res.status(404).json({ message: 'Invalid ID!' });
            return;
        }

        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // create a new tag
    //not sure how to set up try catch
    const tag = await Tag.create(req.body)
    res.json(tag);
});

router.put('/:id', async (req, res) => {
    // update a tag's name by its `id` value
    const tag = await Tag.update(req.body,
        {
          where: {id: req.params.id}
      })
      res.json(tag);
});

router.delete('/:id', async (req, res) => {
    // delete on tag by its `id` value
    const tag = await Tag.destory({
        where: { id: req.params.id }
    })
    res.json(tag);
});

module.exports = router;
