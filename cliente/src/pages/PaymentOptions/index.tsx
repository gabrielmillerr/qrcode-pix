import { useState } from 'react';
import { Box, Typography, Button, Divider, Chip, CircularProgress, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '../../contexts/PaymentContext';
import { PaymentData } from "../../utils/types/PaymentData";
import { formatCurrency, calculateInstallmentValue, calculateValueWithCashback } from "../../utils/funcs";
import logo from '../../../assets/logo.svg';

export const PaymentOptionsPage = () => {
  const { paymentData, setPaymentData } = usePayment();
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const installmentOptions = [2, 3, 4, 5, 6, 7];

  const handleNext = () => {
    if (!selectedOption) {
      alert('Por favor, selecione um campo!');
      return;
    }

    const [option, installments] = selectedOption.split('-');
    let newValueWithPorcentage = 0;

    if (option === 'pixInstallment') {
      const { totalWithIncrease } = calculateInstallmentValue(paymentData.amount, Number(installments));
      newValueWithPorcentage = totalWithIncrease;
    }

    if (option === 'pix') {
      newValueWithPorcentage = calculateValueWithCashback(paymentData.amount);
    }

    setPaymentData((prevData: PaymentData) => ({
      ...prevData,
      paymentInfo: {
        paymentOption: option,
        numberOfInstallments: Number(installments),
        newValueWithPorcentage,
      },
    }));
    navigate('/qrcode');
  };

  const handleChange = (event: any, value: string) => {
    setSelectedOption(value);
  };

  if (!paymentData.name || !paymentData.amount) {
    return <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px'}}>
              <CircularProgress />
           </Box>
  }

  return (
    <Box p={2}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '48px' }}>
        <img src={logo} alt="Logo woovi" />
      </Box>
      <Typography variant="h6" sx={{ textAlign: 'center', mb: '24px'}}>{paymentData.name}, como você quer pagar?</Typography>
      <Divider textAlign="left" sx={{ my: 1 }}>
        <Chip label="Pix" />
      </Divider>

      <ToggleButtonGroup
        orientation="vertical"
        value={selectedOption}
        exclusive
        onChange={handleChange}
        sx={{ width: '100%', mb: 2 }}
      >
        <ToggleButton 
          value="pix" 
          aria-label="pix" 
          sx={{
            width: '100%',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: selectedOption === 'pix' ? '2px solid #03D69D' : '2px solid #ccc',
            backgroundColor: selectedOption === 'pix' ? '#F4FBF9' : 'transparent',
            borderRadius: '4px',
          }}
          onClick={() => setSelectedOption('pix')}
        >
          <Box sx={{ ml: 1 }}>
            {`1x - ${formatCurrency(paymentData.amount)}`}
            <Typography variant="body2" color="textSecondary">
              Ganhe 3% de Cashback
            </Typography>
          </Box>
          {selectedOption === 'pix' ? (<CheckCircle sx={{ color: '#03D69D' }} /> ) : (<RadioButtonUnchecked sx={{ color: '#ccc' }} />)}
        </ToggleButton>
        <Divider textAlign="left" sx={{ my: 2 }}>
          <Chip label="Pix Parcelado" />
        </Divider>

        {installmentOptions.map((installment) => {
          const { totalWithIncrease, installmentValue } = calculateInstallmentValue(paymentData.amount, installment);
          return (
            <ToggleButton
              key={installment}
              value={`pixInstallment-${installment}`}
              aria-label={`installment-${installment}`}
              sx={{
                width: '100%',
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: selectedOption === `pixInstallment-${installment}` ? '2px solid #03D69D' : '2px solid #ccc',
                backgroundColor: selectedOption === `pixInstallment-${installment}` ? '#F4FBF9' : 'transparent',
                borderRadius: '4px',
              }}
              onClick={() => setSelectedOption(`pixInstallment-${installment}`)}
            >
              <Box sx={{ ml: 1 }}>
                {`${installment}x - ${formatCurrency(installmentValue)}`}
                <Typography variant="body2" color="textSecondary">
                  Total: {formatCurrency(totalWithIncrease)}
                </Typography>
              </Box>
              {selectedOption === `pixInstallment-${installment}` 
                ? ( <CheckCircle sx={{ color: '#03D69D' }} /> ) 
                : (<RadioButtonUnchecked sx={{ color: '#ccc' }} />
              )}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>

      <Button variant="contained" color="primary" onClick={handleNext} fullWidth>
        Próximo
      </Button>
    </Box>
  );
};
