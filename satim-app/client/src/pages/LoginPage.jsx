import MainLayout from "../layouts/MainLayout";
import {Box, Typography} from "@mui/material";

const LoginPage = () => {
    return (
        <MainLayout>
            <Box sx={{ display: 'flex' }}>
                    <Typography>Bitte einloggen</Typography>
            </Box>
        </MainLayout>
    );
};

export default LoginPage;
