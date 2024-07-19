import { getAllAds, getAdsByCategory as getAdsByCategoryApi } from '../services/ad.service'
import { getCategories as getCategoriesApi } from '../services/category.service'
import { KeyboardEvent, ChangeEvent, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAd } from '../redux/ad/ad.selectors'
import { addAd, setAds } from '../redux/ad/ad.slice'
import { getCategories } from '../redux/category/category.slice'
import { selectCategory } from '../redux/category/category.selectors';
import AdCards from '../components/adCards'
import CategoryCard from '../components/categoryCards'
import { Ad } from '../types/ad.types';
import { Grid, Typography, useStepContext } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';


export default function Menu() {
    const category = useSelector(selectCategory)
    const ads = useSelector(selectAd)
    const [chosenCategory, setChosenCategory] = useState<number>(0)
    const dispatch = useDispatch()
    useEffect(() => {
        getCategoriesClick()
    },
        [])
    useEffect(() => {
        getAdsByCategoryClick()
    }, [chosenCategory])
    const getCategoriesClick = async () => {
        const categories = await getCategoriesApi();
        dispatch(getCategories(categories))
    }
    const getAdsByCategoryClick = async () => {
        const id = chosenCategory
        console.log(id)
        const ads = await getAdsByCategoryApi(id);
        dispatch(setAds(ads))
        if (chosenCategory != 0)
            navigate('/home/board')
    }
    let navigate = useNavigate();
    return (<>
        <Grid container spacing={1}>
            {category.map((p, i) => (
                <Grid item xs={12} sm={6} xl={3} key={p.id} >
                    <CategoryCard category={p} img={i} onClick={async () => setChosenCategory(p.id)} />
                </Grid>
            ))}
        </Grid></>
    );
}

