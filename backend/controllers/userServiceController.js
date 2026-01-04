const UserService = require('../models/UserService');
const User = require('../models/User');

// Helper: Calculate Next Due Date
const calculateNextDueDate = (paymentDay) => {
    const today = new Date();
    let nextDate = new Date();
    nextDate.setDate(paymentDay);
    if (today.getDate() > paymentDay) {
        nextDate.setMonth(nextDate.getMonth() + 1);
    }
    return nextDate;
};

// @desc    Get services (With Auto-Update Logic)
exports.getMyServices = async (req, res) => {
  try {
    let services = await UserService.find({ user: req.user.id }).sort({ createdAt: -1 });
    const today = new Date();

    const updatedServices = await Promise.all(services.map(async (service) => {
        if (service.status === 'Active') {
            const dueDate = new Date(service.nextDueDate);
            if (today > dueDate) {
                service.amountPaid += service.emiAmount;
                service.installmentsPaid += 1;
                let nextMonth = new Date(dueDate);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                service.nextDueDate = nextMonth;
                if (service.amountPaid >= service.totalLoanAmount) {
                    service.status = 'Closed';
                    service.amountPaid = service.totalLoanAmount;
                }
                await service.save();
            }
        }
        return service;
    }));
    res.json(updatedServices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Admin: Create Service with Document
exports.createUserService = async (req, res) => {
  try {
    const { email, serviceType, provider, accountNumber, totalLoanAmount, emiAmount, paymentDay } = req.body;
    
    // 1. Check for file upload (Cloudinary middleware puts it in req.file)
    let documentUrl = '';
    if (req.file) {
      documentUrl = req.file.path;
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    let firstDueDate = new Date();
    firstDueDate.setDate(paymentDay);
    if (new Date().getDate() > paymentDay) {
        firstDueDate.setMonth(firstDueDate.getMonth() + 1);
    }

    const service = new UserService({
      user: user._id,
      serviceType,
      provider,
      accountNumber,
      totalLoanAmount,
      emiAmount,
      paymentDay,
      nextDueDate: firstDueDate,
      status: 'Active',
      documentUrl // Save the URL
    });

    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin: Get ALL Services
exports.getAllServices = async (req, res) => {
    try {
        const services = await UserService.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Admin: Toggle Freeze Status
exports.toggleServiceStatus = async (req, res) => {
    try {
        const service = await UserService.findById(req.params.id);
        if(!service) return res.status(404).json({ message: 'Not Found'});

        if (service.status === 'Active') service.status = 'Frozen';
        else if (service.status === 'Frozen') service.status = 'Active';
        
        await service.save();
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Admin: Delete Service
exports.deleteUserService = async (req, res) => {
    try {
        const service = await UserService.findById(req.params.id);
        if(service) {
            await service.deleteOne();
            res.json({ message: 'Service removed' });
        } else {
            res.status(404).json({ message: 'Service not found'});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};