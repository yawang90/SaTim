import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

export const dashboardSidebar = (navigate) => [
    {
        label: 'Projekt Übersicht',
        icon: <DashboardIcon />,
        onClick: () => navigate('/dashboard'),
    },
];

export const settingsSidebar = (navigate) => [
    {
        label: 'Einstellungen',
        icon: <SettingsIcon />,
        onClick: () => navigate('/settings'),
    },
];
