const express = require('express');
const router = express.Router();
const {createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedaUser, blockUser, unblockUser, handleRefreshToken, logout} = require('../controller/userController');
const { authMiddleware, isAdmin} = require('../middlewares/authMiddleware');

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users', getallUser);
router.get('/refresh', handleRefreshToken);
router.get('logout', logout);
router.get('/:id',authMiddleware, isAdmin, getaUser);
router.delete('/:id', deleteaUser);
router.put('/edit-user',authMiddleware,isAdmin, updatedaUser);
router.put('/block-user/:id',authMiddleware,isAdmin, blockUser);
router.put('/unblock-user/:id',authMiddleware,isAdmin, unblockUser);



module.exports = router;