import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

export const dashboardSidebar = (t, navigate) => [
    {
        label: t("project.all"),
        icon: <DashboardIcon />,
        onClick: () => navigate('/dashboard'),
    },
];

export const settingsSidebar = (t, navigate, projectId) => [
    {
        label: t("project.settings"),
        icon: <SettingsIcon />,
        onClick: () => navigate(`/projectSettings/${projectId}`),
    },
];
