import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProjectPage from '../pages/ProjectPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import WelcomePage from '../pages/WelcomePage';
import LoggedInRoute from "./LoggedInRoute";
import DashboardPage from "../pages/Dashboard";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/project/:id" element={<ProjectPage/>}/>
                <Route path="/dashboard" element={<LoggedInRoute><DashboardPage/></LoggedInRoute>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
