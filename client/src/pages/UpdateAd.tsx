import React, { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Container, FormControl, FormControlLabel, FormLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCategory } from '../redux/category/category.selectors';
import { updateAd as updateAdApi } from '../services/ad.service';
import { selectAuth } from '../redux/auth/auth.selectors';
import { updateAd } from '../redux/ad/ad.slice';
import { useAppDispatch } from '../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAd } from '../redux/ad/ad.selectors';
import AnimationSuccess from '../sections/AnimationSuccess';

const UpdateAdPage = () => {
    const { register, handleSubmit, control, getValues } = useForm<FormData>();
    const { id } = useParams<{ id: string }>();
    console.log("דף עדכון: " + Number(id!))
    const ads = useSelector(selectAd)
    const adToUpdate = ads.find(ad => ad.id === Number(id!))
    console.log(adToUpdate)
    const category = useSelector(selectCategory)
    const user = useSelector(selectAuth)
    // const data: Ad = useLoaderData()
    const dispatch = useAppDispatch()
    const navigate=useNavigate()
    const [chosenCategory, setChosenCategory] = useState<number>(adToUpdate!.categoryId)
    const [title, setTitle] = useState(adToUpdate!.title);
    const [content, setContent] = useState(adToUpdate!.context)
    const [success,setSuccess]=useState(false)
    interface FormData {
        title: string;
        content: string;
        category: number;
    };
    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value); // עדכון של הערך בסטייט בהתאם לשינוי בשדה
    };
    const handleChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value); // עדכון של הערך בסטייט בהתאם לשינוי בשדה
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try{

            console.log(data as FormData);
            const Ad = {
                id: adToUpdate!.id,
                title: data.title,
                context: data.content,
                categoryId: data.category,
                userId: user.user!.id,
                date: new Date()
            }
            console.log(Ad);
            await updateAdApi(Ad)
            dispatch(updateAd(Ad))
            setSuccess(true)
        }
        catch
        {
            
        }
    };
    if (success) {
        return <AnimationSuccess message='המודעה התעדכנה בהצלחה' duration={25} onAnimationEnd={() => {navigate('/home/myAds')}} />;
      }    
    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth margin="normal">
                    <TextField
                        {...register('title', { required: true })}
                        label="כותרת"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        value={title}
                        onChange={handleChangeTitle}
                         />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        {...register('content', { required: true })}
                        label="תוכן המודעה"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        value={content}
                        onChange={handleChangeContent}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <FormLabel>קטגוריה</FormLabel>
                    <Select
                        {...register('category', { required: true })}
                        variant="outlined"
                        fullWidth
                        defaultValue={`${adToUpdate?.categoryId}`}                    >
                        {category.map((p, i) => (
                            <MenuItem value={`${p.id}`} key={`${p.id}`}>
                                {p.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    עדכן מודעה
                </Button>
            </form>
        </Container>
    );
};

export default UpdateAdPage;
