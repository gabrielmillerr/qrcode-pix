import { Box, Button, Typography, CircularProgress, Divider } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import { usePayment } from '../../contexts/PaymentContext';
import { formatCurrency, handleCopyQRCode, calculateInstallmentValue, calculateValueWithCashback } from '../../utils/funcs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.svg';

export const PixQRCodePage = () => {
  const { paymentData, fetchAndSetQRCode } = usePayment();
  const { totalWithIncrease, installmentValue } = calculateInstallmentValue(
    paymentData.amount ?? 0,
    paymentData.paymentInfo?.numberOfInstallments ?? 0
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!paymentData.pixQrCode) {
      if (paymentData.paymentInfo?.paymentOption === 'pix') {
        fetchAndSetQRCode({
          name: paymentData.name,
          amount: paymentData.paymentInfo?.newValueWithPorcentage
        });
      }
      if (paymentData.paymentInfo?.paymentOption === 'pixInstallment') {
        const { totalWithIncrease } = calculateInstallmentValue(
          paymentData.paymentInfo?.newValueWithPorcentage,
          paymentData.paymentInfo?.numberOfInstallments
        );
        fetchAndSetQRCode({
          name: paymentData.name,
          amount: totalWithIncrease
        });
      }
    }
  }, [paymentData, fetchAndSetQRCode]);

  if (!paymentData.pixQrCode) {
    return (
      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px' }}>
        <CircularProgress />
      </Box>
    );
  }

  const renderInstallmentContent = () => (
    Array.from({ length: paymentData.paymentInfo?.numberOfInstallments ?? 0 }).map((_, index) => {
      const { installmentValue } = calculateInstallmentValue(
        paymentData.amount ?? 0,
        paymentData.paymentInfo?.numberOfInstallments ?? 0
      );
      return (
        <TimelineItem key={index} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <TimelineSeparator>
            <TimelineDot
              variant="outlined"
              color={index === 0 ? "success" : "grey"}
              sx={{ borderWidth: 2, borderColor: index === 0 ? '#03D69D' : 'grey' }}
            />
            {index < ((paymentData.paymentInfo?.numberOfInstallments ?? 0) - 1) && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle1" mt={2} textAlign="right">
              {index === 0 ? 'Entrada no Pix' : `Parcela ${index + 1} no cartão`}: {formatCurrency(installmentValue)}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      );
    })
  );

  const renderPixContent = () => (
    <Box p={2} sx={{ maxWidth: 400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '48px' }}>
        <img src={logo} alt="Logo woovi" />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: '700', fontSize: '24px' }}>
          {paymentData.name}, pague a entrada de {formatCurrency(calculateValueWithCashback(paymentData.amount))} pelo Pix.
        </Typography>
        <Box sx={{ marginY: '24px', width: 'max-content', height: '350', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black', borderColor: '#03D69D', borderRadius: '6px' }}>
          <img src={paymentData.pixQrCode.qrCodeImage} alt="QR Code" style={{ width: '350px', maxHeight: '350px' }} />
        </Box>
        <Button variant="contained" color="primary" onClick={() => handleCopyQRCode(paymentData.pixQrCode.brCode)} fullWidth>
          Clique para copiar QR CODE
        </Button>
        <Typography variant="subtitle1" mt={2}>
          Prazo de pagamento: <br/>
          15/12/2021 - 08:17
        </Typography>
      </Box>
      <Divider sx={{ my: '16px'}} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Typography variant="subtitle1">CET: 0.5%</Typography>
        <Typography variant="subtitle1">Total: {formatCurrency(calculateValueWithCashback(paymentData.amount))}</Typography>
      </Box>
      <Divider sx={{ my: '16px'}} />
      <Button variant="contained" color="primary" onClick={() => navigate('/success')} fullWidth>
          Próximo
        </Button>
      <Typography sx={{ textAlign: 'center', mt: '24px' }} variant="body2" color="textSecondary">
        Identificador: <br />
        <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
          {paymentData.pixQrCode.identifier}
        </Typography>
      </Typography>
    </Box>
  );

  const renderPixInstallmentContent = () => (
    <Box p={2} sx={{ maxWidth: 400, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '48px' }}>
        <img src={logo} alt="Logo woovi" />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6">
          {paymentData.name}, pague a entrada de {formatCurrency(installmentValue)} pelo Pix.
        </Typography>
        <Box sx={{ marginY: '24px', width: 'max-content', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black', borderColor: '#03D69D', borderRadius: '6px' }}>
          <img src={paymentData.pixQrCode.qrCodeImage} alt="QR Code" style={{ width: '350px', maxHeight: '350px' }} />
        </Box>
        <Button variant="contained" color="primary" onClick={() => handleCopyQRCode(paymentData.pixQrCode.brCode)} fullWidth>
          Clique para copiar QR CODE
        </Button>
        <Typography variant="subtitle1" mt={2}>
          Prazo de pagamento: <br/>
          15/12/2021 - 08:17
        </Typography>
      </Box>
      <Divider sx={{ my: '16px'}} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Typography variant="subtitle1">CET: 0.5%</Typography>
        <Typography variant="subtitle1">Total: {formatCurrency(paymentData.paymentInfo?.newValueWithPorcentage ?? 0)}</Typography>
      </Box>
      <Divider sx={{ my: '16px'}} />
      <Timeline position="right" sx={{ marginTop: 2 }}>
        {renderInstallmentContent()}
      </Timeline>
      <Button variant="contained" color="primary" onClick={() => navigate('/credit-card-payment')} fullWidth>
        Próximo
      </Button>
      <Typography sx={{ textAlign: 'center', mt: '24px' }} variant="body2" color="textSecondary">
        Identificador: <br />
        <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
          {paymentData.pixQrCode.identifier}
        </Typography>
      </Typography>
    </Box>
  );

  return paymentData.paymentInfo?.paymentOption === 'pix'
    ? renderPixContent()
    : renderPixInstallmentContent();
};
