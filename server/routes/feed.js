const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /api/feeds
router.get('/', feedController.getFeeds);
router.get('/:feedId', feedController.getFeed);
router.put('/:feedId', feedController.updateFeed);
router.delete('/:feedId', feedController.deleteFeed);
router.post('/', feedController.addFeed);

module.exports = router;