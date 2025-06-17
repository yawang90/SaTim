import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProjectPage from '../pages/Projects/ProjectPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import WelcomePage from '../pages/WelcomePage';
import LoggedInRoute from "./LoggedInRoute";
import DashboardPage from "../pages/Dashboard";
import SurveyCreationPage from "../pages/Projects/MemberSurvey/SurveyCreationPage";
import SettingsPage from "../pages/Projects/SettingsPage";
import MemberPage from "../pages/Projects/MemberPage";
import SurveyDashboardPage from "../pages/Projects/MemberSurvey/SurveyDashboardPage";
import CompetencesPage from "../pages/Projects/MemberSurvey/CompetencesPage";
import SurveyPageWithSidebar from "../pages/UserSurvey/SurveyPageWithSidebar";

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
                    <Route path="/survey/creation/:projectId" element={<SurveyCreationPage/>}/>
                    <Route path="/survey/dashboard/:surveyId" element={<SurveyDashboardPage/>}/>
                    <Route path="/survey/dashboard/:surveyId/competences" element={<CompetencesPage/>}/>
                </Route>
                <Route path="/survey/form/:formId" element={<SurveyPageWithSidebar/>}/>
                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
