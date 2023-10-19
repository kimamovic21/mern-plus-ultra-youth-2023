import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // console.log(email);
    // console.log(password);
    const navigate = useNavigate();

    useEffect(() => {
        
    }, []);

    const handleLoginUser = async () => {
        try {
            const result = await axios.post('http://localhost:4000/auth/login', {
                email: email,
                password: password
            });
            console.log(result);

            if (result?.data && result?.status === 200) {
                const { token } = result.data;
                console.log(token);

                localStorage.setItem('token', token);

                setTimeout(() => {
                    navigate('/bugs-overview');
                }, 1000);
            };
        }
        catch (e) {
            console.log(e);
        };
    };

    return (
        <Box sx={{width: '100%', height: '100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Card sx={{maxWidth:'500px', border: '1px solid blue'}}>
            <CardContent>
                <TextField 
                    sx={{marginRight: '10px'}} 
                    id='outlined-basic' 
                    label='email' 
                    variant='outlined' 
                    value={email} 
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setEmail(e.target.value)
                    }}
                />
                <TextField 
                    id='outlined-basic' 
                    label='password' 
                    variant='outlined' 
                    value={password}
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setPassword(e.target.value);
                    }}
                />
            </CardContent>
            <CardActions>
                <Button variant='outlined' onClick={handleLoginUser}>Login</Button>
            </CardActions>
            </Card>
        </Box>
    );
};

export default Login;