import { Router } from 'express';
import { createQrCode } from '../controller/qrCodeController';

export const router = Router();

router.post('/qrcode', createQrCode);