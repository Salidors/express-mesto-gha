const router = require('express').Router();

const {
  putLike,
  deleteLike,
  postCard,
  getCards,
  deleteCard,
} = require('../controllers/card');

router.put('/cards/:cardId/likes', putLike);
router.delete('/cards/:cardId', deleteCard);
router.delete('/cards/:cardId/likes', deleteLike);
router.post('/cards', postCard);
router.get('/cards', getCards);

module.exports = router;
