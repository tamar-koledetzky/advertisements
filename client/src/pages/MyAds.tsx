import { Box, Button, Container, Grid, IconButton } from "@mui/material";
import AdList from '../components/userAd'
import AddIcon from '@mui/icons-material/Add';
import { deleteAd as deleteAdApi, getAdsByUser as getAdsByUserApi } from '../services/ad.service'
import { Ad } from "../types/ad.types";
import { useSelector, useDispatch } from "react-redux";
import { selectAd } from "../redux/ad/ad.selectors";
import { useEffect } from "react";
import { deleteAd, setAds } from "../redux/ad/ad.slice";
import { AdCard } from "../components/adCards";
import { setUser } from "../redux/auth/auth.slice";
import { selectAuth } from "../redux/auth/auth.selectors";
import { User } from "../types/user.types";
import { useNavigate } from "react-router-dom";
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const AdsPage = () => {
    const ads = useSelector(selectAd)
    const user = useSelector(selectAuth)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {

        getAdsByUserClick(user.user!)

    },
        [])

    const getAdsByUserClick = async (user: User) => {
        // const id = chosenCategory
        console.log(user.id)
        const ads = await getAdsByUserApi(user.id);
        dispatch(setAds(ads))
    }

    async function handleEdit(id: number) {
        console.log(`/home/updateAd/${id}`);
        navigate(`/home/updateAd/${id}`);
    }

    async function handleDelete(id: number): Promise<void> {
        await deleteAdApi(id)
        dispatch(deleteAd(id))
    }

    return (
        <div>
            <Box display="flex" justifyContent="flex-end" marginBottom={2}>
            {/* style={{backgroundColor:'#AFD198'}} */}
                <Button variant="contained" color="primary"  onClick={() => navigate("/home/newAd")} startIcon={<AddIcon />}>
                    הוספת מודעה חדשה
                </Button>
            </Box>
            <Container>
                <Box marginTop={2} marginBottom={2}>
                    <Grid container spacing={3}>
                        {ads.map((a, index) => (
                            <Grid item xs={12} sm={6} md={6} key={index}>
                                <AdCard ad={a} />
                                <div>
                                    <IconButton aria-label="delete" style={{ fontSize: '10px' }} onClick={() => handleDelete(a.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit" style={{ fontSize: '10px' }} onClick={() => handleEdit(a.id)}>
                                        <EditIcon />
                                    </IconButton>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default AdsPage;
