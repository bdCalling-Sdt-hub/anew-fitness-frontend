import UpcomingAppointment from "../../../components/ui/dashboardPages/home/UpcomingAppointment";
import UpcomingClass from "../../../components/ui/dashboardPages/home/UpcomingClass";
import UpcomingEvent from "../../../components/ui/dashboardPages/home/UpcomingEvent";

const HomePage = () => {
    return (
        <div>
            <UpcomingClass />  
            <UpcomingEvent /> 
            <UpcomingAppointment />
        </div>
    );
};

export default HomePage;