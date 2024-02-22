// import express from 'express';
// import { registerCollective, loginCollective } from '../controllers/CollectiveController.js';

// const router = express.Router();

// router.post('/register', registerCollective);
// router.post('/login', loginCollective);

// export default router;

import express from 'express';
import collectiveController from '../controllers/CollectiveController.js';

const router = express.Router();

router.post('/register', collectiveController.registerCollective);
router.post('/login', collectiveController.loginCollective);

export default router;
