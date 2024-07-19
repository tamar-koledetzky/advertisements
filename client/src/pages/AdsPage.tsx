
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from '@mui/material';
import { selectCategory } from '../redux/category/category.selectors';
import { setAds } from '../redux/ad/ad.slice';
import AdCards from '../components/adCards';
import { getAdsByCategory as getAdsByCategoryApi } from '../services/ad.service';
import { selectAd } from "../redux/ad/ad.selectors";

export default function Board() {
    const ads = useSelector(selectAd);
    const dispatch = useDispatch();
    const category = useSelector(selectCategory);

    const getAdsByCategoryClick = async (id:number) => {
        const ads = await getAdsByCategoryApi(id);
        dispatch(setAds(ads));
    };

    useEffect(() => {
        getAdsByCategoryClick(category[0]?.id || 0); // Fetch ads for the first category initially
    }, [category]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                {category.map((p, i) => (
                    <Button key={p.id} variant="outlined" onClick={() => getAdsByCategoryClick(p.id)}>{p.name}</Button>
                ))}
            </div>
            <AdCards adss={ads} />
        </div>
    );
}

