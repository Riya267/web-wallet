import express from 'express';
import { controllers } from '../controllers/index';
const router = express.Router();

router.get('/generate-mnemonic', controllers.generateMnemonic);
router.post('/add-wallet', controllers.createWallet);

export default router;
