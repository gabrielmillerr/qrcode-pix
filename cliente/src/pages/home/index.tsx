import { useState } from "react";
import { Box, Button, TextField, Typography } from '@mui/material';
import { usePayment } from '../../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const [userName, setName] = useState('');
  const [value, setValue] = useState('');
  const { setPaymentData } = usePayment();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!userName || !value) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setPaymentData({ name: userName, amount: Number(value)});
    navigate('/payment-options');
  }

  return (
    <Box sx={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>Olá, bem vindo(a)!</Typography>
      <TextField 
        label="Nome" 
        value={userName} 
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal" 
      />
      <TextField
        label="Valor a ser pago"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2 }}
      >
        Enviar
      </Button>
    </Box>
  )
}