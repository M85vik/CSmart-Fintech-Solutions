// File: src/pages/services/UsedCarLoanPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../../features/contacts/contactSlice';
import toast from 'react-hot-toast';
import { 
  Box, Container, Typography, Grid, Button, 
  Card, CardContent, Dialog, DialogTitle, DialogContent, 
  TextField, IconButton, Chip, Fab, Stack, List, ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

// Import our Grand Calculator
import EmiCalculator from '../../components/services/EmiCalculator'; 

const ORANGE_MAIN = '#ff6d00';
const ORANGE_LIGHT = '#ff9e40';

// --- 1. HERO SECTION (Updated Image) ---
const HeroSection = ({ onApply }) => (
  <Box sx={{ position: 'relative', bgcolor: '#000', color: '#fff' }}>
    <Box sx={{ 
        position: 'relative', 
        pt: { xs: 8, md: 15 }, 
        pb: { xs: 15, md: 20 },
        // Updated to a high-quality "Keys in Hand" or "Luxury Car" image
        backgroundImage: 'url(https://images.unsplash.com/photo-1714213624189-9a9fc8a0736a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMGNhcnxlbnwwfDB8MHx8fDA%3D)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}>
      {/* Dark Overlay for text readability */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.5)', zIndex: 1 }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ maxWidth: 750 }}>
          <Chip label="Certified Pre-Owned Finance" sx={{ bgcolor: ORANGE_MAIN, color: '#fff', fontWeight: 'bold', mb: 2 }} />
          <Typography variant="h2" sx={{ fontWeight: 900, lineHeight: 1.1, mb: 2, textTransform: 'uppercase', fontSize: { xs: '2.5rem', md: '4rem' } }}>
            New Dreams in a <br /> <span style={{ color: ORANGE_MAIN }}>Pre-Loved Car</span>
          </Typography>
          <Typography variant="h6" sx={{ color: 'grey.300', mb: 4, fontWeight: 300, maxWidth: 600 }}>
            Don't let budget stop you. Get up to 90% funding on valuation with our quick transfer assistance.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={onApply}
              sx={{ bgcolor: ORANGE_MAIN, '&:hover': { bgcolor: ORANGE_LIGHT }, borderRadius: 50, px: 5, py: 1.5, fontSize: '1.1rem' }}
            >
              Get Approved
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  </Box>
);

// --- 2. FEATURES & BENEFITS ---
const FeaturesSection = () => (
  <Box sx={{ py: 10, bgcolor: '#fff5e6' }}>
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 1 }}>
        Why Finance a <span style={{ color: ORANGE_MAIN }}>Used Car</span> with Us?
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
        We make buying a second-hand car feel like buying a new one.
      </Typography>

      <Grid container spacing={4}>
        {[
          { title: 'High Valuation Funding', desc: 'Get up to 90% of the car’s market value funded.', icon: <DirectionsCarIcon fontSize="large" /> },
          { title: 'Age No Bar', desc: 'Loans for cars up to 10 years old at loan maturity.', icon: <CarRepairIcon fontSize="large" /> },
          { title: 'RC Transfer Support', desc: 'We handle the RTO paperwork and ownership transfer.', icon: <HandshakeIcon fontSize="large" /> },
          { title: 'Quick Disbursal', desc: 'Money in your account within 48 hours of approval.', icon: <SpeedIcon fontSize="large" /> },
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

// --- 3. DOCUMENTATION & ELIGIBILITY (Symmetrical Design) ---
const DocumentationSection = () => (
    <Box sx={{ py: 10, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 8 }}>
                Simple Process, <span style={{ color: ORANGE_MAIN }}>Instant Approval</span>
            </Typography>

            <Grid container spacing={4} alignItems="stretch">
                {/* LEFT: Eligibility */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ 
                        bgcolor: '#1a1a1a', color: '#fff', p: 7, borderRadius: 4, height: '100%',
                        position: 'relative', overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }}>
                        {/* Decorative Background Icon */}
                        <AssignmentIndIcon sx={{ position: 'absolute', right: -20, bottom: -20, fontSize: 200, opacity: 0.05 }} />
                        
                        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                            <AssignmentIndIcon sx={{ mr: 2, color: ORANGE_MAIN }} />
                            Eligibility Criteria
                        </Typography>
                        <Divider sx={{ bgcolor: 'grey.800', mb: 3 }} />
                        
                        <List>
                            {[
                                "Age: 21 to 65 years",
                                "Salaried: Min Income ₹20k/month",
                                "Self-Employed: Min Turnover ₹5L/year",
                                "CIBIL Score: 650+",
                                "Employment: Min 1 year stability"
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

                {/* RIGHT: Documentation (Styled Exactly Like Eligibility) */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ 
                        bgcolor: '#1a1a1a', color: '#fff', p: 7, borderRadius: 4, height: '100%',
                        position: 'relative', overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }}>
                         {/* Decorative Background Icon */}
                         <DescriptionIcon sx={{ position: 'absolute', right: -20, bottom: -20, fontSize: 200, opacity: 0.05 }} />

                        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                            <DescriptionIcon sx={{ mr: 2, color: ORANGE_MAIN }} />
                            Required Documents
                        </Typography>
                        <Divider sx={{ bgcolor: 'grey.800', mb: 3 }} />

                        <List>
                            {[
                                "KYC (Aadhaar Card / PAN Card)",
                                "Income Proof (Salary Slips / ITR)",
                                "Bank Statements (Last 6 Months)",
                                "Vehicle RC Copy (Front & Back)",
                                "Valid Insurance Copy"
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
                    { icon: <GroupsIcon sx={{ fontSize: 50 }} />, title: '11 Million+', sub: 'Happy Customers' },
                    { icon: <AccountBalanceIcon sx={{ fontSize: 50 }} />, title: '30+ Years', sub: 'Of Trust & Legacy' },
                    { icon: <SpeedIcon sx={{ fontSize: 50 }} />, title: '48 Hours', sub: 'Disbursal Time' },
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

// --- 5. GO FOR IT BANNER ---
const GoForItBanner = ({ onApply }) => (
    <Box sx={{ bgcolor: '#1a1a1a', py: 8, textAlign: 'center', color: '#fff' }}>
        <Container maxWidth="md">
            <Typography variant="h3" fontWeight="bold" gutterBottom>
                Ready to Upgrade Your Ride?
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.7, mb: 4 }}>
                Get the best deal on your used car loan today.
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

// --- 6. CALLBACK MODAL ---
const CallbackModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle sx={{ bgcolor: ORANGE_MAIN, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      Get a Used Car Quote
      <IconButton onClick={onClose} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
    </DialogTitle>
    <DialogContent sx={{ mt: 2 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        We'll help you find the best rate for your chosen car.
      </Typography>
      <Box component="form" sx={{ mt: 1 }}>
        <TextField fullWidth label="Your Name" margin="normal" size="small" />
        <TextField fullWidth label="Mobile Number" margin="normal" size="small" />
        <TextField fullWidth label="Car Model (Optional)" margin="normal" size="small" />
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

// --- MAIN PAGE COMPONENT ---
const UsedCarLoanPage = () => {
  const navigate = useNavigate(); // This line caused the error because the import was missing
  
  // --- REDUX & FORM LOGIC ---
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
      serviceOfInterest: 'Used Car Loan Lead',
      message: `Callback Request from Used Car Page.\nCity: ${formData.city || 'Not specified'}`,
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
        <title>Used Car Loan - Up to 90% Funding | CS Smart Finserve</title>
      </Helmet>

      <Box sx={{ bgcolor: '#f9f9f9', minHeight: '100vh' }}>
        
        {/* 1. Hero */}
        <HeroSection onApply={() => setOpenCallback(true)} />

        {/* 2. Calculator (Customized for Used Cars - Higher Rate Default) */}
        <Container maxWidth="md" sx={{ mt: -8, position: 'relative', zIndex: 10, mb: 8 }}>
            <EmiCalculator 
                loanType="car" 
                initialInterest={11.5} 
                onApply={() => setOpenCallback(true)} 
            />
        </Container>

        {/* 3. Features */}
        <FeaturesSection />

        {/* 4. Documentation & Eligibility (Split 50/50 & Matched Design) */}
        <DocumentationSection />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Banner */}
        <GoForItBanner onApply={() => setOpenCallback(true)} />

        {/* 7. Floating Action Button */}
        <Dialog open={openCallback} onClose={() => setOpenCallback(false)} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Get Used Car Loan Offers
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
                onClick={handleSubmit} // <--- CONNECTED HERE
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

        {/* Floating Action Button */}
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
            Get Quote
        </Fab>
      
      </Box>
    </>
  );
}
export default UsedCarLoanPage;