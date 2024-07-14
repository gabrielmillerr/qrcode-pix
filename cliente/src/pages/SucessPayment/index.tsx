import { useState } from 'react';
import { Card, CardContent, Typography, Container, Button, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { formatCurrency } from '../../utils/funcs';
import { usePayment } from '../../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.svg';

export const SuccessPage = () => {
  const { paymentData } = usePayment();
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const navigate = useNavigate();

  const handleSeeExtratoClick = () => {
    setShowPaymentDetails(!showPaymentDetails); 
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '4rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '48px' }}>
        <img src={logo} alt="Logo woovi" />
      </Box>
      <CheckCircleIcon sx={{ color: '#03D69D', fontSize: '6rem' }} />
      <Typography variant="h4" sx={{ marginTop: '1rem', fontWeight: 'bold' }}>
        Pagamento realizado com sucesso!
      </Typography>
      {showPaymentDetails && (
        <Card sx={{ marginTop: '2rem', textAlign: 'left' }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
              Detalhes do Pagamento
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
              <strong>Nome:</strong> {paymentData.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
              <strong>Método:</strong> {paymentData.paymentInfo?.paymentOption}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
              <strong>Valor:</strong> {formatCurrency(paymentData.paymentInfo?.newValueWithPorcentage ?? 0)}
            </Typography>
            {paymentData.paymentInfo?.paymentOption === 'pixInstallment' && (
              <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
                <strong>Parcelas no Cartão:</strong> {paymentData.paymentInfo?.numberOfInstallments}
              </Typography>
            )}
            <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
              <strong>Identificador:</strong> {paymentData.pixQrCode.identifier}
            </Typography>
          </CardContent>
        </Card>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: '2rem' }}
          onClick={handleSeeExtratoClick}
        >
          Ver Extrato
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Voltar inicio
        </Button>
      </Box>
    </Container>
  );
};
