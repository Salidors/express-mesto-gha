const router = require('express').Router();

const {
  putLike,
  deleteLike,
  postCard,
  postCardId,
  getCard,
} = require('../controllers/card');

router.put('/cards/:cardId/like', putLike);
router.delete('/cards/:cardId/like', deleteLike);
router.post('/cards/', postCard);
router.post('/cards/:cardId', postCardId);
router.get('/cards/', getCard);

module.exports = router;
