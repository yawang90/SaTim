import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';

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

export const membersSidebar = (t, navigate, projectId) => [
    {
        label: t("project.member"),
        icon: <GroupIcon />,
        onClick: () => navigate(`/projectMembers/${projectId}`),
    },
];

export const projectHomeSidebar = (t, navigate, projectId) => [
    {
        label: t("project.overview"),
        icon: <HomeFilledIcon />,
        onClick: () => navigate(`/project/${projectId}`),
    },
];
