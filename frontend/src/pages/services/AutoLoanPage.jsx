import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../../features/contacts/contactSlice';
import toast from 'react-hot-toast';
import {
  Box, Container, Typography, Grid, Button,
  Card, CardContent, Dialog, DialogTitle, DialogContent,
  TextField, IconButton, Chip, Fab, Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SpeedIcon from '@mui/icons-material/Speed';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// Import our new Grand Calculator
import EmiCalculator from '../../components/services/EmiCalculator';

const ORANGE_MAIN = '#ff6d00';
const ORANGE_LIGHT = '#ff9e40';

// --- 1. HERO SECTION (Fixed Overlap & 3 Cards) ---
const HeroSection = ({ onApply, onNavigate }) => (
  <Box sx={{
    position: 'relative',
    bgcolor: '#000',
    color: '#fff',
    pt: { xs: 8, md: 15 },
    pb: { xs: 8, md: 30 },
    overflow: 'visible'
  }}>
    <Box sx={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      backgroundImage: 'url(https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0.6,
      zIndex: 0
    }} />

    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
      <Box sx={{ maxWidth: 700 }}>
        <Chip label="#1 Auto Finance in India" sx={{ bgcolor: ORANGE_MAIN, color: '#fff', fontWeight: 'bold', mb: 2 }} />
        <Typography variant="h2" sx={{ fontWeight: 900, lineHeight: 1, mb: 2, textTransform: 'uppercase', fontSize: { xs: '2.5rem', md: '4rem' } }}>
          Own Your <span style={{ color: ORANGE_MAIN }}>Dream Car</span> Today
        </Typography>
        <Typography variant="h6" sx={{ color: 'grey.300', mb: 4, fontWeight: 300 }}>
          Experience the joy of driving with our 100% On-Road Funding and 30-minute express approval.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            size="large"
            onClick={onApply}
            sx={{ bgcolor: ORANGE_MAIN, '&:hover': { bgcolor: ORANGE_LIGHT }, borderRadius: 50, px: 4 }}
          >
            Apply Now
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ color: '#fff', borderColor: '#fff', borderRadius: 50, px: 4 }}
          >
            View Offers
          </Button>
        </Stack>
      </Box>
    </Container>
    {/* THE 3 PATHS */}
    <Box
      sx={{
        position: { xs: 'relative', md: 'absolute' },
        left: 0,
        right: 0,
        bottom: { md: -30 },
        display: 'flex',
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      <Container maxWidth="lg" sx={{ maxWidth: 1200 }}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
          sx={{
            px: { xs: 2, sm: 0 },
            flexWrap: { xs: 'wrap', md: 'nowrap' }
          }}
        >
          {[
            {
              title: 'New Car Loan',
              icon: <DirectionsCarIcon fontSize="large" />,
              desc: 'Drive home a brand new car with up to 100% funding.',
              path: '/services/auto-loan/catalogue'
            },
            {
              title: 'Used Car Loan',
              icon: <CarRepairIcon fontSize="large" />,
              desc: 'Best value for pre-owned cars with verified dealers.',
              path: '/services/auto-loan/used'
            },
            {
              title: 'Loan Against Car',
              icon: <CurrencyRupeeIcon fontSize="large" />,
              desc: 'Unlock cash instantly against your existing car.',
              path: '/services/auto-loan/refinance'
            }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} sx={{ minWidth: { md: 340 } }} key={index}>
              <Card
                onClick={() => onNavigate(item.path)}
                sx={{
                  bgcolor: '#fff',
                  color: '#333',
                  borderRadius: 3,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  textAlign: 'center',
                  p: { xs: 2, md: 1 },
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  '&:hover': {
                    transform: { md: 'translateY(-8px)' },
                    borderBottom: `5px solid ${ORANGE_MAIN}`
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ color: ORANGE_MAIN, mb: 2 }}>{item.icon}</Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
    {/* Spacer to reserve space for overlapping cards */}
    <Box sx={{ height: { xs: 0, md: 180 } }} />
  </Box>
);

// --- 2. OFFERS SECTION ---
const OffersSection = () => (
  <Box sx={{ py: 10, bgcolor: '#fff5e6' }}>
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 6 }}>
        Limited Time <span style={{ color: ORANGE_MAIN }}> Offers</span>
      </Typography>
      <Grid container spacing={3}>
        {[
          { head: 'Zero Processing Fee', sub: 'For all login before 30th Dec', icon: '🎉' },
          { head: '100% On-Road Funding', sub: 'No down payment required', icon: '🚀' },
          { head: 'Free Dashcam', sub: 'On loans above ₹10 Lakhs', icon: '📸' },
          { head: 'Fuel Card worth ₹5000', sub: 'Complimentary on disbursal', icon: '⛽' },
        ].map((offer, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Box sx={{
              border: `1px dashed ${ORANGE_MAIN}`,
              borderRadius: 3,
              p: 3,
              bgcolor: '#fff',
              textAlign: 'center',
            }}>
              <Box sx={{ fontSize: '2.5rem', mb: 1 }}>{offer.icon}</Box>
              <Typography variant="h6" fontWeight="bold">{offer.head}</Typography>
              <Typography variant="caption" display="block" color="text.secondary">{offer.sub}</Typography>
              <Chip label="Claim Now" size="small" sx={{ mt: 2, bgcolor: ORANGE_MAIN, color: '#fff', cursor: 'pointer' }} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

// --- 3. WHY CHOOSE US ---
const WhyChooseUs = () => (
  <Box sx={{ py: 10, bgcolor: '#fff' }}>
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 8, color: '#1a1a1a' }}>
        Why India Trusts <span style={{ color: ORANGE_MAIN }}>CS Smart Finserve</span>
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {[
          { icon: <GroupsIcon sx={{ fontSize: 40 }} />, title: '10K+', sub: 'Happy Customers' },
          { icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />, title: '10+ Years', sub: 'Of Trust & Legacy' },
          { icon: <SpeedIcon sx={{ fontSize: 40 }} />, title: '30 Minutes', sub: 'Express Approval' },
          { icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />, title: 'Minimal Paperwork', sub: 'Digital Journey' },
        ].map((item, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Circle Icon Background */}
              <Box sx={{
                width: 80, height: 80, borderRadius: '50%', bgcolor: '#fff3e0', color: ORANGE_MAIN,
                display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3,
                transition: '0.3s', '&:hover': { bgcolor: ORANGE_MAIN, color: '#fff' }
              }}>
                {item.icon}
              </Box>
              <Typography variant="h4" fontWeight="800" sx={{ color: '#2c3e50', mb: 0.5 }}>{item.title}</Typography>
              <Typography variant="body1" color="text.secondary" fontWeight="500">{item.sub}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

// --- 4. GO FOR IT BANNER ---
const GoForItBanner = ({ onApply }) => (
  <Box sx={{ bgcolor: '#1a1a1a', py: 8, textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Ready to hit the road?
      </Typography>
      <Typography variant="h6" sx={{ opacity: 0.7, mb: 4 }}>
        Don't let finances put a brake on your dreams. Get approved today.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={onApply}
        sx={{
          bgcolor: ORANGE_MAIN,
          px: 6, py: 2, borderRadius: 50, fontSize: '1.2rem', fontWeight: 'bold',
          '&:hover': { bgcolor: ORANGE_LIGHT }
        }}
      >
        Get Started Now
      </Button>
    </Container>
  </Box>
);

// --- 5. CALLBACK MODAL ---
const CallbackModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle sx={{ bgcolor: ORANGE_MAIN, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      Get a Quick Callback
      <IconButton onClick={onClose} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
    </DialogTitle>
    <DialogContent sx={{ mt: 2 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Leave your number, and our loan expert will call you within 5 minutes.
      </Typography>
      <Box component="form" sx={{ mt: 1 }}>
        <TextField fullWidth label="Name" margin="normal" size="small" />
        <TextField fullWidth label="Mobile Number" margin="normal" size="small" />
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 2, bgcolor: ORANGE_MAIN, '&:hover': { bgcolor: ORANGE_LIGHT } }}
        >
          Request Call
        </Button>
      </Box>
    </DialogContent>
  </Dialog>
);

// --- MAIN PAGE ---
const AutoLoanPage = () => {
  const navigate = useNavigate();
  
  // 2. Redux Setup
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.contact);

  // 3. Modal & Form State
  const [openCallback, setOpenCallback] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', city: '' });

  // 4. Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 5. Handle Submit (The "Map" Logic)
  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      toast.error("Name and Phone are required!");
      return;
    }

    const submissionData = {
      name: formData.name,
      phone: formData.phone,
      email: 'N/A', // Auto-loans often just ask for phone, but backend expects string
      serviceOfInterest: 'New Car Loan Lead', 
      message: `Callback Request from Auto Loan Page.\nCity: ${formData.city || 'Not specified'}`,
    };

    const result = await dispatch(submitContactForm(submissionData));

    if (!result.error) {
      toast.success("Request Sent! We'll call you in 5 mins.");
      setOpenCallback(false);
      setFormData({ name: '', phone: '', city: '' });
    } else {
      toast.error("Failed to send request. Try again.");
    }
  };

  return (
    <Box sx={{ bgcolor: '#f9f9f9', minHeight: '100vh' }}>

      {/* 1. Hero */}
      <HeroSection
        onApply={() => setOpenCallback(true)}
        onNavigate={(path) => navigate(path)}
      />
      {/* 2. Grand Calculator (Connected Apply Button) */}
      <Container maxWidth="md" sx={{ my: 8 }}>
        <EmiCalculator loanType="car" onApply={() => setOpenCallback(true)} />
      </Container>

      {/* 3. Offers */}
      <OffersSection />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Go For It Banner */}
      <GoForItBanner onApply={() => setOpenCallback(true)} />

      {/* 6. Floating Action Button */}
      <Fab
        variant="extended"
        onClick={() => setOpenCallback(true)}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          bgcolor: ORANGE_MAIN,
          color: '#fff',
          fontWeight: 'bold',
          '&:hover': { bgcolor: ORANGE_LIGHT }
        }}
      >
        <PhoneInTalkIcon sx={{ mr: 1 }} />
        Quick Call
      </Fab>

      {/* --- THE WIRED MODAL --- */}
      <Dialog open={openCallback} onClose={() => setOpenCallback(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Get Best Car Loan Rates
          <IconButton onClick={() => setOpenCallback(false)}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField 
              fullWidth 
              label="Your Name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal" 
              variant="outlined" 
            />
            <TextField 
              fullWidth 
              label="Mobile Number" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal" 
              variant="outlined" 
              type="tel"
            />
            <TextField 
              fullWidth 
              label="City" 
              name="city"
              value={formData.city}
              onChange={handleChange}
              margin="normal" 
              variant="outlined" 
            />
            
            <Button 
              fullWidth 
              variant="contained" 
              size="large"
              disabled={isLoading}
              onClick={handleSubmit} 
              sx={{ mt: 3, bgcolor: ORANGE_MAIN, fontWeight: 'bold', py: 1.5, '&:hover': { bgcolor: ORANGE_LIGHT } }}
            >
              {isLoading ? 'Sending...' : 'Request Call Back'}
            </Button>
            <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 2 }}>
              By clicking, you agree to our Terms & Privacy Policy.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

    </Box>
  );
};

export default AutoLoanPage;