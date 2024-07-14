import axios from 'axios';

type QRCodeData = {
  name: string;
  value?: number;
  comment?: string;
}

export const fetchQRCode = async (data: QRCodeData) => {
  try {
    const response = await axios.post('http://localhost:4000/api/qrcode', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar QR code:', error);
  }
}
