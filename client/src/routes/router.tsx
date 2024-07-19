import { Navigate, createBrowserRouter } from 'react-router-dom';
import { PATHS } from './paths';
import HomePage from '../pages/HomePage';
import Layout from '../layouts/Layout';
import SignIn from '../sections/auth/signInForm';
import Login from '../sections/auth/LoginForm';
import Board from '../pages/AdsPage';
import MyAds from '../pages/MyAds';
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
import ProfilePage from '../pages/Profile';
import path from 'path';
import NewAd from '../pages/NewAd';
import UpdateAdPage from '../pages/UpdateAd';
import { selectAd } from '../redux/ad/ad.selectors';
import { useSelector } from 'react-redux';

export const router = createBrowserRouter([
    {
        path: PATHS.home,
        element: <Layout />,
        children: [
            {
                path: '',
                element: <HomePage />,
            },
            {
                path: PATHS.categories,
                element: <HomePage />,
                children: [
                    {
                        path: PATHS.adsCategory
                    }
                ]
            },
            {
                path: PATHS.signIn,
                element: <GuestGuard><SignIn /></GuestGuard>
            },
            {
                path: PATHS.login,
                element: <GuestGuard><Login /></GuestGuard>,
                children: [{
                    // path:PATHS.userAds,
                    // element:<MyAds/>
                }]
            },
            {

                path: PATHS.userAds,
                element: <AuthGuard> <MyAds /></AuthGuard>,
            },
            {
                path: PATHS.newAd,
                element: <AuthGuard><NewAd /></AuthGuard>
            },
            {
                path: '/home/updateAd/:id',
                element:<AuthGuard><UpdateAdPage /></AuthGuard>,
            },
            {
                path: PATHS.board,
                element: <Board />
            },
            {
                path: PATHS.profile,
                element: <AuthGuard><ProfilePage /></AuthGuard>
            }
        ],
    },

    {
        path: '/',
        element: <Navigate to={PATHS.home} />,
        index: true
    },

    {
        path: '*',
        element: <h1>404</h1>
    },
]);
