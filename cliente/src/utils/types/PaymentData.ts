interface PaymentOption {
  paymentOption: string; 
  numberOfInstallments: number;
  newValueWithPorcentage: number;
}

interface CreditCardData {
  fullName: string;
  cpf: string;
  cvv: number;
  expirationDate: string;
}

export interface PaymentData {
  name: string;
  amount: number;
  pixQrCode?: any;
  paymentInfo?: PaymentOption;
  creditCardData?: CreditCardData;
}