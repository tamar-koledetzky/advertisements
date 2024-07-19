import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Container, Grid, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AuthUser, User } from '../../types/user.types';
import { addUser as addUserApi, getUsers, login as loginApi } from '../../services/user.service';
import { NavLink } from 'react-router-dom';
import { isValidID, isValidEmail, isValidPhoneNumber, isValidPassword } from '../../api/user/userApi';
import { setUser } from '../../redux/auth/auth.slice';
import { useAppDispatch } from '../../redux/store';
import { setSession } from '../../auth/auth.utils';
import AnimationSuccess from '../../sections/AnimationSuccess';

interface FormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [valid, setValid] = useState(true);
  const [validId, setValidId] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [isUserExist, setIsUserExist] = useState(false);
  const [isMailExist, setIsMailExist] = useState(false);
  const [user1, setUser1] = useState<User>()


  useEffect(() => {
    if (!valid) {
      console.log('validation issues');
    }
  }, [valid]);

  useEffect(() => {
    if (isUserExist) {
      console.log('user is exist');
    }
  }, [isUserExist]);


  const CheckValidation = (params: FormData) => {
    const id = isValidID(params.id);
    setValidId(id);
    const email = isValidEmail(params.email);
    setValidEmail(email);
    const phone = isValidPhoneNumber(params.phone);
    setValidPhone(phone);
    const password = isValidPassword(params.password, params.confirmPassword);
    setValidPassword(password);
    const isValid = id && email && phone && password;
    setValid(isValid);
    return isValid;
  };

  const CheckIsExist = async (params: FormData): Promise<boolean> => {
    try {
      const users = await getUsers();
      const userExists = users.some((user: User) => user.id === params.id);
      setIsUserExist(userExists);
      const EmailExists = users.some((user: User) => user.email === params.email);
      setIsMailExist(EmailExists);
      return userExists || EmailExists;
    } catch (error) {
      console.error('Error checking if user exists', error);
      return false;
    }
  };

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    const newU = {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password
    };
    if (await CheckValidation(data)) {
      const userExists = await CheckIsExist(data);
      if (!userExists) {
        try {
          const newUser = await addUserApi(newU);
          console.log("new user entered: ", newUser);
          setUser1(newUser)
        } catch (error) {
          console.log('cant add the user: ' + error);
        }
      };
    };
  };

  const handleAnimationEnd = async (newUser: User) => {
    dispatch(setUser(newUser));
    const newUserWithToken = await loginApi(newUser.email, newUser.password);
    setSession(newUserWithToken);

  };

  if (user1 != undefined) {
    return <AnimationSuccess message='המשתמש נרשם בהצלחה' duration={10} onAnimationEnd={() => handleAnimationEnd(user1)} />;
  }
  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20 }}>
        <Typography variant="h5" align="center" color={'#DBA979'} gutterBottom>
          הרשמה
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Id"
                variant="outlined"
                fullWidth
                required
                {...register("id")}
              />
              {!validId && (
                <Typography variant="body2" color="error">
                  ת"ז חייבת להכיל 9 ספרות
                </Typography>

              )}
              {isUserExist && (
                <Typography variant="body2" color="error">
                  משתמש כבר קיים
                </Typography>
              )}

            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                {...register("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                {...register("email")}
              />
              {isMailExist && (
                <Typography variant="body2" color="error">
                  אימייל כבר קיים
                </Typography>
              )}
              {!validEmail && (
                <Typography variant="body2" color="error">
                  מייל לא תקין
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                required
                {...register("phone")}
              />
              {!validPhone && (
                <Typography variant="body2" color="error">
                  פלאפון לא תקין
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                {...register("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                {...register("confirmPassword")}
              />
              {!validPassword && (
                <Typography variant="body2" color="error">
                  הסיסמאות אינן תואמות
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} name="showPassword" />}
                label="Show Password"
              />
            </Grid>
            <Grid item xs={12}>
            {/* style={{ backgroundColor: '#AFD198' }} */}
              <Button type="submit" variant="contained" color="primary" fullWidth >
                שלח
              </Button>
            </Grid>
          </Grid>
        </form>
        <div style={{ textAlign: 'center' }}>
          <Typography component={NavLink} to="/home/login" color="primary" style={{ textAlign: 'center', color: '#DBA979' }}>
            רשומים כבר? להתחברות
          </Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default SignIn;
