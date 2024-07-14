import { Box, Button, TextField, Typography, Grid, MenuItem, Divider, CircularProgress } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import { useState } from 'react';
import { usePayment } from '../../contexts/PaymentContext';
import { calculateInstallmentValue, formatCurrency } from '../../utils/funcs';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.svg';

export const PaymentCardForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
    installments: ''
  });

  const { paymentData } = usePayment();
  const { installmentValue, totalWithIncrease } = calculateInstallmentValue(
    paymentData.amount ?? 0,
    paymentData.paymentInfo?.numberOfInstallments ?? 0
  );
  const navigate = useNavigate();

  const handleChange = (e : any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
  };

  const renderInstallmentOptions = () => {
    return Array.from({ length: paymentData.paymentInfo?.numberOfInstallments ?? 0 }).map((_, index) => {
      return (
        <MenuItem key={index} value={index + 1}>
          {index + 1} {index + 1 === 1 ? 'Parcela' : 'Parcelas'} - {installmentValue.toFixed(2)}
        </MenuItem>
      );
    });
  };

  const renderInstallmentContent = () => (
    Array.from({ length: paymentData.paymentInfo?.numberOfInstallments ?? 0 }).map((_, index) => {
      const { installmentValue } = calculateInstallmentValue(
        paymentData.amount ?? 0,
        paymentData.paymentInfo?.numberOfInstallments ?? 0
      );
      return (
        <TimelineItem key={index} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <TimelineSeparator>
            {index === 0 ? (
              <CheckCircleIcon sx={{ color: '#03D69D', fontSize: '1.5rem' }} />
            ) : (
              <TimelineDot
                variant="outlined"
                color="grey"
                sx={{ borderWidth: 2, borderColor: 'grey' }}
              />
            )}
            {index < ((paymentData.paymentInfo?.numberOfInstallments ?? 0) - 1) && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" mt={2} textAlign="left">
              {index === 0 ? 'Entrada no Pix' : `Parcela ${index + 1} no cartão`}: {formatCurrency(installmentValue)}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      );
    })
  );

  if (!paymentData || !paymentData.pixQrCode) {
    return <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px'}}>
              <CircularProgress />
           </Box>
  }

  return (
    <Box p={2} sx={{ maxWidth: 600, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '48px' }}>
        <img src={logo} alt="Logo woovi" />
      </Box>
      <Typography variant="h6" sx={{ mb: 2 }}>{paymentData.name}, pague o restante em 1x no cartão</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome Completo"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Número do Cartão"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Vencimento"
              name="expiration"
              value={formData.expiration}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CVV"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Parcelas"
              name="installments"
              value={formData.installments}
              onChange={handleChange}
              required
            >
              {renderInstallmentOptions()}
            </TextField>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" onClick={() => navigate('/success')} fullWidth sx={{ mt: 2 }}>
          Pagar
        </Button>
      </form>
        <Timeline>
          {renderInstallmentContent()}
        </Timeline>
        <Divider sx={{ my: '16px'}} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="subtitle1">CET: 0.5%</Typography>
            <Typography variant="subtitle1">Total: {formatCurrency(totalWithIncrease)}</Typography>
          </Box>
        <Divider sx={{ my: '16px'}} />
        <Typography sx={{ textAlign: 'center', mt: '24px' }} variant="body2" color="textSecondary">
          Identificador: <br /> 
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
            {paymentData.pixQrCode.identifier}
          </Typography>
      </Typography>
    </Box>
  );
};
