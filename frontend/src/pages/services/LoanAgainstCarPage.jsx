// File: src/pages/services/LoanAgainstCarPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../../features/contacts/contactSlice';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { 
  Box, Container, Typography, Grid, Button, 
  Card, CardContent, Dialog, DialogTitle, DialogContent, 
  TextField, IconButton, Chip, Fab, Stack, List, ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyIcon from '@mui/icons-material/Key';
import BoltIcon from '@mui/icons-material/Bolt';

// Import our Grand Calculator
import EmiCalculator from '../../components/services/EmiCalculator'; 

const ORANGE_MAIN = '#ff6d00';
const ORANGE_LIGHT = '#ff9e40';

// --- 1. HERO SECTION ---
const HeroSection = ({ onApply }) => (
  <Box sx={{ position: 'relative', bgcolor: '#000', color: '#fff' }}>
    <Box sx={{ 
        position: 'relative', 
        pt: { xs: 8, md: 15 }, 
        pb: { xs: 15, md: 20 },
        // Image: Business/Executive feel - Unlocking value
        backgroundImage: 'url(https://imgd.aeplcdn.com/642x361/n/cw/ec/47011/exterior0.jpeg?wm=1&q=75)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.6)', zIndex: 1 }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ maxWidth: 750 }}>
          <Chip label="Cash Against Car" sx={{ bgcolor: ORANGE_MAIN, color: '#fff', fontWeight: 'bold', mb: 2 }} />
          <Typography variant="h2" sx={{ fontWeight: 900, lineHeight: 1.1, mb: 2, textTransform: 'uppercase', fontSize: { xs: '2.5rem', md: '4rem' } }}>
            Don't Sell It. <br /> <span style={{ color: ORANGE_MAIN }}>Refinance It.</span>
          </Typography>
          <Typography variant="h6" sx={{ color: 'grey.300', mb: 4, fontWeight: 300, maxWidth: 600 }}>
            Unlock up to 150% of your car's value instantly while you keep driving it. Lower rates than personal loans.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={onApply}
              sx={{ bgcolor: ORANGE_MAIN, '&:hover': { bgcolor: ORANGE_LIGHT }, borderRadius: 50, px: 5, py: 1.5, fontSize: '1.1rem' }}
            >
              Get Valuation
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  </Box>
);

// --- 2. FEATURES SECTION ---
const FeaturesSection = () => (
  <Box sx={{ py: 10, bgcolor: '#fff5e6' }}>
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 1 }}>
        Smart Way to <span style={{ color: ORANGE_MAIN }}>Raise Funds</span>
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Why take a personal loan when your car can get you cheaper money?
      </Typography>

      <Grid container spacing={4}>
        {[
          { title: '24-Hour Disbursal', desc: 'Get money in your account within a day of verification.', icon: <BoltIcon fontSize="large" /> },
          { title: 'Keep Driving', desc: 'You continue to use your car. Only the hypothecation is marked.', icon: <DirectionsCarIcon fontSize="large" /> },
          { title: 'Cheaper Rates', desc: 'Interest rates are 2-3% lower than unsecured personal loans.', icon: <CurrencyRupeeIcon fontSize="large" /> },
          { title: 'Top-Up Available', desc: 'Existing loan? Get a top-up on your repayment track record.', icon: <AccountBalanceIcon fontSize="large" /> },
        ].map((feature, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card sx={{ 
                height: '100%', borderRadius: 4, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' }
            }}>
                <CardContent sx={{ display: 'flex', alignItems: 'flex-start', p: 3 }}>
                    <Box sx={{ color: ORANGE_MAIN, mr: 2, p: 1.5, bgcolor: '#fff3e0', borderRadius: '50%' }}>
                        {feature.icon}
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>{feature.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
                    </Box>
                </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

// --- 3. TWIN CARDS: DOCUMENTATION & ELIGIBILITY ---
const DocumentationSection = () => (
    <Box sx={{ py: 10, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 8 }}>
                Easy Process, <span style={{ color: ORANGE_MAIN }}>Maximum Value</span>
            </Typography>

            <Grid container spacing={4} alignItems="stretch">
                {/* LEFT: Eligibility */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ 
                        bgcolor: '#1a1a1a', color: '#fff', p: 5, borderRadius: 4, height: '100%',
                        position: 'relative', overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }}>
                        <VerifiedUserIcon sx={{ position: 'absolute', right: -20, bottom: -20, fontSize: 200, opacity: 0.05 }} />
                        
                        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                            <VerifiedUserIcon sx={{ mr: 2, color: ORANGE_MAIN }} />
                            Eligibility Criteria
                        </Typography>
                        <Divider sx={{ bgcolor: 'grey.800', mb: 3 }} />
                        
                        <List>
                            {[
                                "Car Ownership: Min 6 Months",
                                "Car Age: Less than 10 Years",
                                "Insurance: Comprehensive Policy",
                                "Applicant Age: 21 to 65 years",
                                "Valuation: Approved by our surveyor"
                            ].map((text, i) => (
                                <ListItem key={i} sx={{ px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 40 }}><CheckCircleIcon sx={{ color: ORANGE_MAIN }} /></ListItemIcon>
                                    <ListItemText 
                                        primary={text} 
                                        primaryTypographyProps={{ fontSize: '1.1rem', fontWeight: 500 }} 
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>

                {/* RIGHT: Documentation */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ 
                        bgcolor: '#1a1a1a', color: '#fff', p: 5, borderRadius: 4, height: '100%',
                        position: 'relative', overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }}>
                         <DescriptionIcon sx={{ position: 'absolute', right: -20, bottom: -20, fontSize: 200, opacity: 0.05 }} />

                        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                            <DescriptionIcon sx={{ mr: 2, color: ORANGE_MAIN }} />
                            Required Documents
                        </Typography>
                        <Divider sx={{ bgcolor: 'grey.800', mb: 3 }} />

                        <List>
                            {[
                                "Original RC (Registration Certificate)",
                                "Valid Insurance Copy",
                                "KYC (Aadhaar / PAN)",
                                "Bank Statement (6 Months)",
                                "Spare Car Key (For verification)"
                            ].map((text, i) => (
                                <ListItem key={i} sx={{ px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 40 }}><KeyIcon sx={{ color: ORANGE_MAIN }} /></ListItemIcon>
                                    <ListItemText 
                                        primary={text} 
                                        primaryTypographyProps={{ fontSize: '1.1rem', fontWeight: 500 }} 
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
);

// --- 4. WHY CHOOSE US ---
const WhyChooseUs = () => (
    <Box sx={{ py: 10, bgcolor: '#fafafa' }}>
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 8, color: '#1a1a1a' }}>
                Why India Trusts <span style={{ color: ORANGE_MAIN }}>CS Smart Finserve</span>
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {[
                    { icon: <GroupsIcon sx={{ fontSize: 50 }} />, title: '10K+', sub: 'Happy Customers' },
                    { icon: <AccountBalanceIcon sx={{ fontSize: 50 }} />, title: '10+ Years', sub: 'Of Trust & Legacy' },
                    { icon: <SpeedIcon sx={{ fontSize: 50 }} />, title: '24 Hours', sub: 'Express Disbursal' },
                    { icon: <VerifiedUserIcon sx={{ fontSize: 50 }} />, title: 'Transparent', sub: 'No Hidden Fees' },
                ].map((item, i) => (
                    <Grid item xs={6} md={3} key={i}>
                         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{ 
                                width: 100, height: 100, borderRadius: '50%', bgcolor: '#fff', color: ORANGE_MAIN,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3,
                                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                transition: '0.3s', '&:hover': { bgcolor: ORANGE_MAIN, color: '#fff' }
                            }}>
                                {item.icon}
                            </Box>
                            <Typography variant="h5" fontWeight="800" sx={{ color: '#2c3e50', mb: 0.5 }}>{item.title}</Typography>
                            <Typography variant="body1" color="text.secondary" fontWeight="500">{item.sub}</Typography>
                         </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

// --- 5. BANNER ---
const GoForItBanner = ({ onApply }) => (
    <Box sx={{ bgcolor: '#1a1a1a', py: 8, textAlign: 'center', color: '#fff' }}>
        <Container maxWidth="md">
            <Typography variant="h3" fontWeight="bold" gutterBottom>
                Need Urgent Funds?
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.7, mb: 4 }}>
                Your car is an asset. Unlock its value today without selling it.
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
                Get Cash Now
            </Button>
        </Container>
    </Box>
);

// --- 6. CALLBACK MODAL ---
const CallbackModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle sx={{ bgcolor: ORANGE_MAIN, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      Get Valuation Quote
      <IconButton onClick={onClose} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
    </DialogTitle>
    <DialogContent sx={{ mt: 2 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        We'll provide a valuation estimate over the phone.
      </Typography>
      <Box component="form" sx={{ mt: 1 }}>
        <TextField fullWidth label="Your Name" margin="normal" size="small" />
        <TextField fullWidth label="Mobile Number" margin="normal" size="small" />
        <TextField fullWidth label="Car Make & Model" margin="normal" size="small" />
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
const LoanAgainstCarPage = () => {
  const navigate = useNavigate(); // This works now!
  
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.contact);

  const [openCallback, setOpenCallback] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', city: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      toast.error("Name and Phone are required!");
      return;
    }

    const submissionData = {
      name: formData.name,
      phone: formData.phone,
      email: 'N/A', 
      serviceOfInterest: 'Loan Against Car Lead',
      message: `Callback Request from Loan Against Car Page.\nCity: ${formData.city || 'Not specified'}`,
    };

    const result = await dispatch(submitContactForm(submissionData));

    if (!result.error) {
      toast.success("Request Sent! We'll call you shortly.");
      setOpenCallback(false);
      setFormData({ name: '', phone: '', city: '' });
    } else {
      toast.error("Failed to send request. Try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Loan Against Car - Unlock Cash Instantly | CS Smart Finserve</title>
      </Helmet>

      <Box sx={{ bgcolor: '#f9f9f9', minHeight: '100vh' }}>
        
        {/* 1. Hero */}
        <HeroSection onApply={() => setOpenCallback(true)} />

        {/* 2. Calculator (Adjusted for Refinance rates) */}
        <Container maxWidth="md" sx={{ mt: -8, position: 'relative', zIndex: 10, mb: 8 }}>
            <EmiCalculator 
                loanType="car" 
                initialInterest={10.5} // Cheaper than personal loans (12%+) but more than new car (8.5%)
                onApply={() => setOpenCallback(true)} 
            />
        </Container>

        {/* 3. Features */}
        <FeaturesSection />

        {/* 4. Twin Cards: Docs & Eligibility */}
        <DocumentationSection />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Banner */}
        <GoForItBanner onApply={() => setOpenCallback(true)} />

        {/* 7. Floating Action Button */}
        <Dialog open={openCallback} onClose={() => setOpenCallback(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Loan Against Car - Quick Apply
          <IconButton onClick={() => setOpenCallback(false)}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField 
              fullWidth label="Your Name" name="name"
              value={formData.name} onChange={handleChange}
              margin="normal" variant="outlined" 
            />
            <TextField 
              fullWidth label="Mobile Number" name="phone"
              value={formData.phone} onChange={handleChange}
              margin="normal" variant="outlined" type="tel"
            />
            <TextField 
              fullWidth label="City" name="city"
              value={formData.city} onChange={handleChange}
              margin="normal" variant="outlined" 
            />
            
            <Button 
              fullWidth variant="contained" size="large"
              disabled={isLoading}
              onClick={handleSubmit} // <--- CONNECTED
              sx={{ mt: 3, bgcolor: ORANGE_MAIN, fontWeight: 'bold', py: 1.5, '&:hover': { bgcolor: ORANGE_LIGHT } }}
            >
              {isLoading ? 'Sending...' : 'Check Eligibility'}
            </Button>
            <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 2 }}>
              By clicking, you agree to our Terms & Privacy Policy.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

      <Fab 
        variant="extended"
        onClick={() => setOpenCallback(true)}
        sx={{ 
          position: 'fixed', bottom: 30, right: 30, 
          bgcolor: ORANGE_MAIN, color: '#fff', fontWeight: 'bold',
          '&:hover': { bgcolor: ORANGE_LIGHT }, zIndex: 100
        }}
      >
        <PhoneInTalkIcon sx={{ mr: 1 }} />
        Get Funds
      </Fab>
      
      </Box>
    </>
  );
}
export default LoanAgainstCarPage;