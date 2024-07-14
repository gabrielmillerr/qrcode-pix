import { getDefaultIdentifier } from "../utils/identifier";
import { QrCodeData } from "../entity/qrcodeData";

const http = require('https');

export const createPixQRCode = (data : QrCodeData) => {
  const qrCodeData = {
    name: data.name,
    identifier: getDefaultIdentifier(),
    amount: data.amount,
    comment: data.comment,
  };

  const options = {
    "method": 'POST',
    "hostname": process.env.API_URL,
    "path": process.env.API_PATH,
    "headers": {
      'Content-Type': 'application/json',
      'Authorization': process.env.AUTHORIZATION,
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, function (res : any) {
      const chunks : any = [];

      res.on('data', function (chunk : any) {
        chunks.push(chunk);
      });

      res.on('end', function () {
        const body = Buffer.concat(chunks);
        const responseBody = body.toString();
        try {
          const responseObject = JSON.parse(responseBody); 
          resolve(responseObject); 
        } catch (error) {
          console.error('Erro ao fazer parsing da resposta JSON:', error);
          reject(error);
        }
      });
    });

    req.on('error', function (error : any) {
      console.error('Erro na requisição:', error);
      reject(error);
    });

    req.write(JSON.stringify(qrCodeData));
    req.end();
  });
};