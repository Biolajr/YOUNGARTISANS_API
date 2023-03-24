const {
    admin,
    superadmin,
    verifyToken
  } = require("../middleware/authJwt");
  const router = require('express').Router();

const authRouter =  require("./auth.routes");
const profileRouter =  require("./profile/profile.routes");
const userRouter =  require("./user-profile.routes");
//const membershipRouter =  require("./membership.routes");
//const faqRouter =  require("./faq.routes");
//const advertRouter =  require("./advert/advert.routes");
//const paymentRouter =  require("./payment/payment.routes");
const home =  require("./home.routes");
//const ussdRouter =  require("./ussd/ussd.routes");
//const smsRouter =  require("./sms/sms.routes");
const subEvpRouters =  require("./sub-evp/subevp.routes");
const settingsRouters =  require("./super-admin/settings/settings.routes");
//const gmsRoutes = require("./gms/gms.routes");
//const fundsRequestRoutes = require("./fund-requests/fundRequest.routes");
const categoriesRoutes = require("./Categories/categories.routes");
//const percentageSettingsRoute = require("./percentage/percentage.routes");
const notificationRoutes = require("./notifications/notifications.routes");


// ADMIN
const userManagementRouter =  require("./super-admin/user-management/userManagement.routes");
const metricsRouter =  require("./super-admin/metrics/metrics.routes");
const { multerUploads } = require("../config/multer");

    router.use(function(req, res, next) { 
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        ); 

        next();
    }); 
    router.get('/', (req, res, next) => {
        //console.log(req.headers)
        res.status(200).json({
            success: true,
            msg: `Young Artisans API's are Responding ${req.headers.host}`,
            data: null
        })
    })

   
    
    router.use('/auth', authRouter);
    router.use('/profile', verifyToken, profileRouter);
    router.use('/user', verifyToken, userRouter);
    //router.use('/membership', membershipRouter);
    router.use('/faq', faqRouter);
    //router.use('/advert', advertRouter);
    //router.use('/payment', paymentRouter);
    router.use('/subevp', subEvpRouters);
    

    // SUPER ADMIN ROUTES
    router.use('/user-management', userManagementRouter);
    //router.use('/analytics', metricsRouter);
    router.use('/settings', settingsRouters);

    // USSD COMMUNICATION
    router.use('/ussd', ussdRouter);

    // SMS COMMUNICATION
    //router.use('/sms', smsRouter);

    // Business Routes
    router.use("/business", require("./business/business.routes"));

    // media
    //router.use("/media", multerUploads.single("file"), require("./upload.routes"));

    //router.use("/gms",  gmsRoutes);

    router.use('/', home); 

    router.use("/funds-requests", verifyToken, fundsRequestRoutes);

    router.use("/categories", categoriesRoutes);

    router.use("/percentage", percentageSettingsRoute);

    router.use("/notifications", notificationRoutes);
 
module.exports = router;