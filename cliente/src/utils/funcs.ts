export function reduceByPercentage(total : number, percentage : number) {
  return total - (total * (percentage / 100));
}

export function formatCurrency(value : number) {
  return `R$ ${value
    .toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`; 
}

export function handleCopyQRCode(brCode: string) {
  navigator.clipboard.writeText(brCode)
    .then(() => {
      alert('Código do QR Code copiado com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao copiar o código do QR Code:', error);
    });
};

export function calculateInstallmentValue(total: number, installments: number) {
  const increasePercentage = 1; // 1% de aumento
  const totalWithIncrease = total * (1 + (increasePercentage / 100) * installments);
  const installmentValue = totalWithIncrease / installments;
  return { totalWithIncrease, installmentValue };
}

export function calculateValueWithPorcentage(total: number) {
  return (total + (total * 1 / 100));
}

export function calculateValueWithCashback(total: number) {
  return (total - (total * 3 / 100)); // 3% de desconto
}