import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProjectPage from '../pages/ProjectPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import WelcomePage from '../pages/WelcomePage';
import LoggedInRoute from "./LoggedInRoute";
import DashboardPage from "../pages/Dashboard";
import PREvalPage from "../pages/PREvalPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LoggedInRoute><Outlet /></LoggedInRoute>}>
                </Route>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/project/:id" element={<ProjectPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/preval/:id" element={<PREvalPage/>}/>
                

                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
