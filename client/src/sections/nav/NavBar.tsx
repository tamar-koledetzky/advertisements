
import React, { useEffect } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, Typography } from '@mui/material';
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { getCategories as getCategoriesApi } from '../../services/category.service'
import { getCategories } from '../../redux/category/category.slice'
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from '../../redux/category/category.selectors';
import IconButton from '@mui/material/IconButton';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeIcon from '@mui/icons-material/Home';
import { selectAuth } from '../../redux/auth/auth.selectors';
import { removeSession } from '../../auth/auth.utils';
import logo from '../../image/Designer.png'

const NavBar = () => {
  // const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const [personal, setPersonal] = React.useState<Element | null>(null);

  const { isAuthanticated } = useSelector(selectAuth)

  const navigate = useNavigate()

  // useEffect(() => {
  //   // בטעינת הרכיב, בדוק אם המשתמש מחובר על ידי בדיקה בLocalStorage
  //   const userLoggedIn = localStorage.getItem('user');
  //   setIsLoggedIn(userLoggedIn != null);
  // }, []);

  //כפל קוד כמו עמוד הבית
  const category = useSelector(selectCategory)
  const dispatch = useDispatch()
  useEffect(() => {
    getCategoriesClick()
  },
    [])

  const getCategoriesClick = async () => {
    const categories = await getCategoriesApi();
    dispatch(getCategories(categories))
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPersonal(event.currentTarget);
  };

  const handleClose = () => {
    setPersonal(null);
  };

  return (
    <div >
      <AppBar position="static" >
        <Toolbar style={{ backgroundColor: '#DBA979', direction: 'rtl', display: 'flex', alignItems: 'center' }}>
      <img src={logo} alt="לוגו" style={{ width: '100px', alignSelf: 'flex-start' }} />
          <Button aria-controls="profile" aria-haspopup="true" onMouseOver={handleClick} color="inherit">
            {/* <IconButton className="L PrivateZoneLink f18 desktoponly"> */}
            <PersonOutlineIcon sx={{ fontSize: 18 }} />
            {/* </IconButton> */}
            אזור אישי
          </Button>
          <Menu
            id="profile"
            anchorEl={personal}
            keepMounted
            open={Boolean(personal)}
            onClose={handleClose}
          >
            {isAuthanticated ? ( // אם המשתמש מחובר
              [<MenuItem key='profile' component={NavLink} to="/home/profile" onClick={handleClose}>פרופיל</MenuItem>,
              <MenuItem key='myAds' component={NavLink} to="/home/myAds" onClick={handleClose}>המודעות שלי</MenuItem>,
              <MenuItem key='logout' onClick={() => { // הוספת מנה להתנתקות עם מחיקת המידע מה-LocalStorage
                // handleClose();
                removeSession()
              }}>התנתקות</MenuItem>]
            ) : ( // אם המשתמש לא מחובר
              <MenuItem component={NavLink} to="/home/login" onClick={() => handleClose()}>התחברות</MenuItem>
            )}
          </Menu>
          <Button color="inherit" onClick={() => navigate('/home')}>
            <HomeIcon sx={{ fontSize: 18 }} />
            דף הבית
          </Button>
        </Toolbar>
      </AppBar>
      {/* <div style={{ padding: '20px' }}>
        {/* כאן יכולים להיכנס תוכן נוסף, כמו התוכן של העמוד */}
    {/* </div> * /} */}
    </div >
  );
};

export default NavBar;
