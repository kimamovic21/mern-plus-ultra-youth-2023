import { useEffect, useState } from "react";
import { Box, Card, CardActions, CardContent, Typography, Button } from "@mui/material";
import BugReportIcon from '@mui/icons-material/BugReport';
import axiosInstance from "../axios-instance";
import { decodeToken } from 'react-jwt';
import CreateBugModal from "./CreateBugModal";
 
const BugDashboard = () => {
    const [bugs, setBugs] = useState([]);
    const [isCreateBugModalOpen, setIsCreateBugModalOpen] = useState(false);

    const token = localStorage.getItem('token');
    const user = decodeToken(token);
    console.log(user);

    const fetchBugs = async () => {
        const result = await axiosInstance.get('/bugs');
        console.log(result);

        if (result?.data?.length) {
            setBugs(result.data);
        };

    };

    useEffect(() => {
        fetchBugs();
    }, []);

    return (
        <Box>
            <Box sx={{
                backgroundColor: 'black', 
                color: 'white', 
                height: '40px', 
                textAlign: 'center', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
                <Typography>Bug app</Typography>
                <BugReportIcon />
            </Box>
            <Box>
                {user?.role === 'qa' && (
                    <Button variant='outlined' onClick={() => {
                        console.log('Create bug button');
                        setIsCreateBugModalOpen(true)
                    }}>
                        Create bug
                    </Button>
                )}
            </Box>
            <Box sx={{ display: 'flex', padding: '20px'}}>
                {bugs?.map((bug) => {
                    console.log(bug);
                    return (
                        <Card key={bug._id} sx={{ maxWidth: '300px' }}>
                            <CardContent>
                                <Typography sx={{fontWeight: 'bold'}}>Title: {bug?.title}</Typography>
                                <Typography sx={{fontWeight: 'bold'}}>Reproduction steps: {bug?.steps}</Typography>
                            </CardContent>
                            <CardActions>
                                {user?.role === 'developer' && <Button variant='outlined'>Finish</Button>}
                            </CardActions>
                        </Card>
                    )
                })}
            </Box>
            {isCreateBugModalOpen && (
                <CreateBugModal 
                    open={isCreateBugModalOpen} 
                    setIsCreateBugModalOpen={setIsCreateBugModalOpen}
                />
            )}
        </Box>
    );
};

export default BugDashboard;