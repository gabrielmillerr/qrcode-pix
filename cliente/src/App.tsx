import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PaymentOptionsPage } from './pages/PaymentOptions';
import { PixQRCodePage } from './pages/PixQRCode';
import { PaymentProvider } from './contexts/PaymentContext';
import { HomePage } from './pages/home';
import { PaymentCardForm } from './pages/CreditCardPayment';
import { SuccessPage } from './pages/SucessPayment';
const App: React.FC = () => {
  return (
    <PaymentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment-options" element={<PaymentOptionsPage />} />
          <Route path="/qrcode" element={<PixQRCodePage />} />
          <Route path="/credit-card-payment" element={<PaymentCardForm />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </PaymentProvider>
  );
};

export default App;
