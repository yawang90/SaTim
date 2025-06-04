import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProjectPage from '../pages/Projects/ProjectPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import WelcomePage from '../pages/WelcomePage';
import LoggedInRoute from "./LoggedInRoute";
import DashboardPage from "../pages/Dashboard";
import SurveyCreationPage from "../pages/Projects/Survey/SurveyCreationPage";
import SettingsPage from "../pages/Projects/SettingsPage";
import MemberPage from "../pages/Projects/MemberPage";
import SurveyDashboardPage from "../pages/Projects/Survey/SurveyDashboardPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LoggedInRoute><Outlet /></LoggedInRoute>}>
                    <Route path="/dashboard" element={<DashboardPage/>}/>
                    <Route path="/project/:projectId" element={<ProjectPage/>}/>
                    <Route path="/projectSettings/:projectId" element={<SettingsPage/>}/>
                    <Route path="/projectMembers/:projectId" element={<MemberPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/surveyCreation/:projectId" element={<SurveyCreationPage/>}/>
                    <Route path="/surveyDashboard/:projectId/:surveyId" element={<SurveyDashboardPage/>}/>
                </Route>

                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
