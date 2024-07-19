// import React from 'react';
// import { Avatar, Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { useSelector } from 'react-redux';
// import { selectAuth } from '../redux/auth/auth.selectors';

// function ProfilePage() {

//   const user = useSelector(selectAuth)
//   {
//     const userData = {
//       name: user.user!.name,
//       id: user.user!.id,
//       email: user.user!.email,
//       phone: user.user!.phone
//     };

//     const handleChangePassword = () => {
//       // הוספת הפעולה שתשנה סיסמה
//       console.log('Changing password...');
//     };

//     return (
//       <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '10vh' }}>
//         <Grid container spacing={7} alignItems="center" justifyContent="center">
//           <Grid container alignItems="center" justifyContent="center" xs={12} sm={10} md={8}>
//             <Grid item>
//               <Avatar />
//             </Grid>
//           </Grid>
//           <Grid container alignItems="center" justifyContent="center" xs={12} sm={10} md={8}>
//             <Grid item>
//               <Typography variant="h5" color={'#AF8F6F'}>{userData.name}</Typography>
//             </Grid>
//           </Grid>

//           <Grid item container alignItems="center" justifyContent="center" xs={12} sm={10} md={8}>
//             <TextField
//               id="id"
//               label="תעודת זהות"
//               defaultValue={userData.id}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//             <IconButton onClick={()=>{}}>
//               <EditIcon/>
//             </IconButton>
//           </Grid>
//           <Grid item container alignItems="center" justifyContent="center" xs={12} sm={10} md={8}>
//             <TextField
//               id="email"
//               label="אימייל"
//               defaultValue={userData.email}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//             <IconButton>
//               <EditIcon />
//             </IconButton>
//           </Grid>
//           <Grid item container alignItems="center" justifyContent="center" xs={12} sm={10} md={8}>
//             <TextField
//               id="phone"
//               label="טלפון"
//               defaultValue={userData.phone}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//             <IconButton>
//               <EditIcon />
//             </IconButton>
//           </Grid>
//           <Grid item container alignItems="center" justifyContent="center" xs={12} sm={10} md={8}>
//             <TextField
//               id="password"
//               label="סיסמה"
//               type="password"
//               defaultValue={"******"}
//             />
//             <IconButton onClick={handleChangePassword}>
//               <EditIcon />
//             </IconButton>
//           </Grid>
//         </Grid>
//       </Container>
//     );
//   }
// }
//   export default ProfilePage;


import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Avatar, Button, Container, Grid, IconButton, TextField, Typography, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/auth/auth.selectors';
import { Email, Phone } from '@mui/icons-material';
import { login as loginApi, updateUser as updateUserApi } from '../services/user.service';
import { setUser } from '../redux/auth/auth.slice';
import { useAppDispatch } from '../redux/store';
import { setSession } from '../auth/auth.utils';

interface FormData {
  name: string;
  id: string;
  email: string;
  phone: string;
  password: string;
}

const ProfilePage: React.FC = () => {
  const user = useSelector(selectAuth);
  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      name: user.user?.name || '',
      id: user.user?.id || '',
      email: user.user?.email || '',
      phone: user.user?.phone || '',
      password: user.user?.password || ''
    }
  });
  const dispatch = useAppDispatch()

  const [editable, setEditable] = useState({
    name: false,
    id: false,
    email: false,
    phone: false,
    password: false,
  });

  const handleEditClick = (field: keyof FormData) => {
    setEditable((prevEditable) => ({
      ...prevEditable,
      [field]: !prevEditable[field],
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: keyof FormData) => {
    if (e.key === 'Enter') {
      debugger
      setEditable((prevEditable) => ({
        ...prevEditable,
        [field]: false,
      }));
      e.preventDefault();
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      debugger
      console.log('Updated user data:', data);
      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password
      }
      await updateUserApi(user)
      dispatch(setUser(user))
      const userWithToken = await loginApi(user.email, user.password);
      setSession(userWithToken);
    }
    catch (error) {
      console.log("cant update user details: " + error)
    }
  };

  return (
    <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '2vh' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} alignItems="center" justifyContent="center">
          <Grid item container alignItems="center" justifyContent="center" xs={12}>
            <Avatar />
          </Grid>
          <Grid item container alignItems="center" justifyContent="center" xs={12}>
            <Typography variant="h5" color={'#AF8F6F'}>{user.user?.name}</Typography>
          </Grid>
          {['name', 'id', 'email', 'phone', 'password'].map((field) => (
            <Grid item container alignItems="center" justifyContent="center" xs={12} key={field}>
              <Controller
                name={field as keyof FormData}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={field.name === 'id' ? 'תעודת זהות' : field.name === 'email' ? 'אימייל' : field.name === 'phone' ? 'טלפון' : field.name === 'password' ? 'סיסמה' : 'שם'}
                    type={field.name === 'password' ? 'password' : 'text'}
                    InputProps={{
                      readOnly: !editable[field.name],
                    }}
                    onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent<HTMLInputElement>, field.name)}
                  />
                )}
              />
              <IconButton onClick={() => handleEditClick(field as keyof FormData)}>
                <EditIcon />
              </IconButton>
            </Grid>
          ))}
          <Grid item container alignItems="center" justifyContent="center" xs={12}>
            <Button variant="contained" color="primary" type="submit">
              שמור שינויים
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProfilePage;
