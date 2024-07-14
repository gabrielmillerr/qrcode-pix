import { createContext, useContext, useState, ReactNode } from "react";
import { fetchQRCode } from "../api/qrCode";
import { PaymentData } from "../utils/types/PaymentData";

interface PaymentContextType {
  paymentData: PaymentData;
  setPaymentData: (data: PaymentData | ((prevData: PaymentData) => PaymentData)) => void;
  fetchAndSetQRCode: (data: PaymentData) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [paymentData, setPaymentData] = useState<any>({});

  const fetchAndSetQRCode = async (data: PaymentData) => {
    try {
      const qrCodeData = await fetchQRCode(data);
      setPaymentData({ ...paymentData, pixQrCode: qrCodeData.pixQrCode });
    } catch (error) {
      console.error('Error fetching QR code:', error);
    }
  };
  
  return (
    <PaymentContext.Provider value={{ paymentData, setPaymentData, fetchAndSetQRCode }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};