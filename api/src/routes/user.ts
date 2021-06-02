import * as     express             from 'express'
import * as     userController      from '../controllers/user'

const router = express.Router()

router.post('/login', userController.signin_user)

router.get('/', userController.get_users)

router.post('/', userController.post_user)

router.get('/:id', userController.get_user)

router.patch('/:id', userController.patch_user)

router.delete('/:id', userController.delete_user)

router.get('/:id/location', userController.get_user_locations)

router.post('/:id/location', userController.post_user_location)

router.delete('/:id/location/:locationId', userController.delete_user_location)

router.get('/:id/location', userController.get_user_locations)

router.get('/:id/runningTotal', userController.get_user_runningTotal)

router.post('/:id/runningTotal', userController.post_user_runningTotal)

router.patch('/:id/runningTotal', userController.patch_user_runningTotal)

router.delete('/:id/runningTotal', userController.delete_user_runningTotal)

module.exports = router