import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Grid, Paper, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getUsers, login } from '../../services/user.service';
import { NavLink } from 'react-router-dom';
import axios from '../../utils/axios';
import { isValidEmail, isValidID, isValidPassword } from '../../api/user/userApi';
import { useAppDispatch } from '../../redux/store';
import { setUser } from '../../redux/auth/auth.slice';
import { setSession } from '../../auth/auth.utils';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/auth/auth.selectors';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    handleLogin(data.email, data.password);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const authUser = await login(email, password);
      console.log(authUser);
      if (authUser != null) {
        dispatch(setUser(authUser.user));
        setSession(authUser);
      }
    } catch (error) {
      console.log('email or password is not correct: ' + error);
      setError(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20 }}>
        <Typography variant="h4" align="center" color={'#DBA979'} gutterBottom>
          התחברות
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                {...register("password")}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
            {/* style={{backgroundColor:'#AFD198'}} */}
              <Button type="submit" variant="contained" color="primary" fullWidth >
                הרשם
              </Button>
              {error && (
                <Typography variant="body2" color="error" style={{ textAlign: 'center' }}>
                  אימייל או סיסמא שגויים
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component={NavLink} to="/home/sign" style={{ textAlign: 'center',color:'#DBA979' }} color="primary">
            עדיין לא רשומים? הרשמו
          </Typography>
          <Typography component={NavLink} to=" " style={{ textAlign: 'center',color:'#DBA979'}} color="primary">
            שכחת סיסמא
          </Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
