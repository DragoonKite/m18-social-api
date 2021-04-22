const router = require('express').Router();
const {} = require('../../controllers/thought-controller')

// /api/thoughts
router.route('/')
    .get()
    .post();

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get()
    .put()
    .delete();

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtid/reactions')
    .post()
    .delete();
    
module.exports = router;