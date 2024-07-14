import { Request, Response } from 'express';
import { createPixQRCode } from '../services/qrCodeService';

export const createQrCode = async (req : Request, res: Response) => {
  try {
    const qrCodeData = await createPixQRCode(req.body);
    res.status(200).json(qrCodeData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar QRCode PIX'});
  }
}