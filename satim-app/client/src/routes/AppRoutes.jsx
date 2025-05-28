import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProjectPage from '../pages/Projects/ProjectPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import WelcomePage from '../pages/WelcomePage';
import LoggedInRoute from "./LoggedInRoute";
import DashboardPage from "../pages/Dashboard";
import PREvalPage from "../pages/Projects/PREvalPage";
import ProjectSettingsPage from "../pages/Projects/ProjectSettingsPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LoggedInRoute><Outlet /></LoggedInRoute>}>
                </Route>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/project/:projectId" element={<ProjectPage/>}/>
                <Route path="/projectSettings/:projectId" element={<ProjectSettingsPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/preval/:evalId" element={<PREvalPage/>}/>
                

                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
