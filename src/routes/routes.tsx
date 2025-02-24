import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import Notification from '../pages/dashboard/Notification';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Auth from '../components/layout/auth/Auth';
import HomePage from '../pages/dashboard/home/HomePage';
import CalenderPage from '../pages/dashboard/calender/CalenderPage';
import CreateClass from '../components/ui/dashboardPages/Classes/CreateClass';
import CreateEvent from '../components/ui/dashboardPages/Classes/CreateEvent';
import ClassesPage from '../pages/dashboard/classes/ClassesPage';
import AppointmentPage from '../pages/dashboard/appointment/AppointmentPage';
import AddAvailability from '../components/ui/dashboardPages/appointment/StaffAvailable/AddAvailability';
import ContactPage from '../pages/dashboard/contact/ContactPage';
import EmailContact from '../components/ui/dashboardPages/contact/EmailContact';
import LeadsDetails from '../components/ui/dashboardPages/contact/Leads-details/LeadsDetails';
import ClassBookings from '../components/ui/dashboardPages/reports/ClassBookings';
import AppointmentBookings from '../components/ui/dashboardPages/reports/AppointmentBookings';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '/', element: <HomePage /> },      
            { path: '/calender', element: <CalenderPage /> },      
            { path: '/create-class', element: <CreateClass /> },      
            { path: '/create-event', element: <CreateEvent /> },      
            { path: '/classes', element: <ClassesPage /> },      
            { path: '/appointment', element: <AppointmentPage /> },      
            { path: '/appointment/add-availability', element: <AddAvailability /> },      
            { path: '/contact', element: <ContactPage /> },      
            { path: '/contact/email-contact', element: <EmailContact /> },      
            { path: '/contact/leads-details', element: <LeadsDetails /> },    
            {path: "/class-booking", element: <ClassBookings />}  ,
            {path: "/appointment-booking", element: <AppointmentBookings />}  ,
            { path: 'notification', element: <Notification /> },
        
        ],
    }, 
    {
        path: "/auth",
        element: <Auth />,
        children: [
            {
                path: "/auth",
                element: <Login />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "forget-password",
                element: <ForgetPassword />,
            },
            {
                path: "verify-otp",
                element: <VerifyOtp />,
            },
            {
                path: "new-password",
                element: <NewPassword />,
            }
        ]
    },
]);

export default router;
