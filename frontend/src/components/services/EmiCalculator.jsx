import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider, Grid, Paper, Button, Divider, Chip } from '@mui/material';

const EmiCalculator = ({ loanType = 'car', onApply }) => {
  const isCar = loanType === 'car';
  const THEME_COLOR = '#ff6d00'; 

  const defaults = {
    amount: isCar ? 800000 : 5000000,
    maxAmount: isCar ? 5000000 : 10000000,
    rate: isCar ? 8.5 : 8.5,
    tenure: isCar ? 5 : 20,
    maxTenure: isCar ? 7 : 30,
    labelTotal: isCar ? 'Vehicle Price' : 'Loan Amount'
  };

  const [amount, setAmount] = useState(defaults.amount);
  const [rate, setRate] = useState(defaults.rate);
  const [tenure, setTenure] = useState(defaults.tenure);
  const [emi, setEmi] = useState(0);

  // Calculate EMI whenever inputs change
  useEffect(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const calculatedEmi = Math.round((amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    setEmi(calculatedEmi);
  }, [amount, rate, tenure]);

  return (
    <Paper elevation={4} sx={{ borderRadius: 4, overflow: 'hidden', bgcolor: '#fff' }}>
      {/* Header */}
      <Box sx={{ bgcolor: THEME_COLOR, p: 3, color: '#fff', textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold">
          {isCar ? 'Dream Car Affordability Simulator' : 'Loan Calculator'}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Adjust the sliders to see exactly what you will pay.
        </Typography>
      </Box>

      <Grid container>
        {/* LEFT SIDE: INPUTS */}
        <Grid item xs={12} md={7} sx={{ p: 4 }}>
          {/* Amount Slider */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography fontWeight="bold" color="text.secondary">{defaults.labelTotal}</Typography>
              <Chip label={`₹ ${amount.toLocaleString()}`} sx={{ bgcolor: '#fff3e0', color: THEME_COLOR, fontWeight: 'bold' }} />
            </Box>
            <Slider
              value={amount}
              min={100000}
              max={defaults.maxAmount}
              step={50000}
              onChange={(e, val) => setAmount(val)}
              sx={{ color: THEME_COLOR, height: 8 }}
            />
          </Box>

          {/* Rate Slider */}
          <Box sx={{ mb: 4 }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography fontWeight="bold" color="text.secondary">Interest Rate (% p.a)</Typography>
              <Chip label={`${rate} %`} sx={{ bgcolor: '#fff3e0', color: THEME_COLOR, fontWeight: 'bold' }} />
            </Box>
            <Slider
              value={rate}
              min={5}
              max={20}
              step={0.1}
              onChange={(e, val) => setRate(val)}
              sx={{ color: THEME_COLOR, height: 8 }}
            />
          </Box>

          {/* Tenure Slider */}
          <Box sx={{ mb: 2 }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography fontWeight="bold" color="text.secondary">Loan Tenure</Typography>
              <Chip label={`${tenure} Years`} sx={{ bgcolor: '#fff3e0', color: THEME_COLOR, fontWeight: 'bold' }} />
            </Box>
            <Slider
              value={tenure}
              min={1}
              max={defaults.maxTenure}
              step={1}
              onChange={(e, val) => setTenure(val)}
              sx={{ color: THEME_COLOR, height: 8 }}
            />
          </Box>
        </Grid>

        {/* RIGHT SIDE: SUMMARY (Cream Background) */}
        <Grid item xs={12} md={5} sx={{ bgcolor: '#fff8f0', p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
            Based on your selection:
          </Typography>
          
          <Box sx={{ my: 2 }}>
            <Typography variant="h3" fontWeight="bold" sx={{ color: THEME_COLOR }}>
              ₹ {emi.toLocaleString()}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Your Monthly EMI
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Total Loan Amount</Typography>
            <Typography variant="body2" fontWeight="bold">₹ {amount.toLocaleString()}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="body2" color="text.secondary">Total Interest Payable</Typography>
            <Typography variant="body2" fontWeight="bold">₹ {((emi * tenure * 12) - amount).toLocaleString()}</Typography>
          </Box>

          <Button 
            variant="contained" 
            fullWidth 
            size="large"
            onClick={onApply} 
            sx={{ 
              bgcolor: THEME_COLOR, 
              color: '#fff', 
              fontWeight: 'bold', 
              py: 1.5,
              boxShadow: '0 4px 14px 0 rgba(255, 109, 0, 0.39)',
              '&:hover': { bgcolor: '#e65100' }
            }}
          >
            Apply for ₹ {(amount/100000).toFixed(1)} Lakhs Now
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EmiCalculator;