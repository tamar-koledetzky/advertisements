
import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCategory } from '../redux/category/category.selectors';
import { addAd as addAdApi, defineCategory as defineCategoryApi } from '../services/ad.service';
import { selectAuth } from '../redux/auth/auth.selectors';
import { Ad } from '../types/ad.types';
import { addAd } from '../redux/ad/ad.slice';
import { useAppDispatch } from '../redux/store';
import AnimationSuccess from '../sections/AnimationSuccess';
import { useNavigate } from 'react-router-dom';
import CustomSpinner from '../sections/Loading';
import { Category } from '../types/category.type';

const AddAdvertisementPage = () => {
  const { control, handleSubmit, getValues, setValue } = useForm<FormData>();
  const categories = useSelector(selectCategory);
  const user = useSelector(selectAuth);
  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  const [loading, setLoading] = useState(false); // משתנה לניהול מצב הטעינה
  const [success, setSuccess] = useState(false);
  const [sortedCategories, setSortedCategories] = useState<Category[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  interface FormData {
    title: string;
    content: string;
    category: Category;
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const newAd: Ad = {
        id: 0,
        title: getValues('title'),
        context: getValues('content'),
        categoryId: categories[0].id,
        userId: user.user!.id,
        date: new Date()
      };
      console.log(newAd);
      const categoryId = await defineCategoryApi(newAd);
      setButtonsDisabled(false);
      const selectedCategory = categories.find(c => c.id === categoryId) || null;

      console.log("category id : " + categoryId);
      if (selectedCategory) {
        setValue('category', selectedCategory);
        setSortedCategories([selectedCategory, ...categories.filter(c => c.id !== selectedCategory.id)]);
      }
    } catch (error) {
      console.log("error defining category: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSortedCategories(categories);
  }, [categories]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    console.log(data as FormData);
    const newAd = {
      id: 0,
      title: data.title,
      context: data.content,
      categoryId: data.category.id,
      userId: user.user!.id,
      date: new Date()
    };
    console.log(newAd);
    setSuccess(true);
    await addAdApi(newAd);
    dispatch(addAd(newAd));
    setLoading(false);
  };

  if (success) {
    return <AnimationSuccess message='המודעה התוספה בהצלחה' duration={30} onAnimationEnd={() => { navigate('/home/myAds') }} />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" color={'#AF8F6F'} gutterBottom>
        הוספת מודעה חדשה
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="כותרת"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Controller
            name="content"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="תוכן המודעה"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                id='content'
              />
            )}
          />
        </FormControl>
        <Button type="button" variant="contained" color="primary" onClick={handleClick} disabled={loading}>
          המשך
        </Button>
        {loading && <CustomSpinner size={100} color1="#ff0000" color2="#00ff00" color3="#0000ff" />}
        <FormControl fullWidth margin="normal">
          <Controller
            name="category"
            control={control}
            defaultValue={getValues("category")}
            render={({ field }) => {
              return (
                <Box sx={{ mb: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">קטגוריה</InputLabel>
                    <Select
                      {...field}
                      labelId="category-label"
                      label="קטגוריה"
                      onChange={(e) => {
                        const inputValue = e.target.value as string;
                        const selectedCategory = categories.find(c => c.name === inputValue) || null;
                        if (selectedCategory) {
                          setValue('category', selectedCategory);
                        }
                      }}
                      value={field.value?.name || ""}
                    >
                      {sortedCategories.map((c) => (
                        <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              );
            }}
          />
        </FormControl>
        {/* style={{ backgroundColor: '#AFD198' }} */}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={buttonsDisabled} >
          שלח מודעה
        </Button>
      </form>
    </Container>
  );
};

export default AddAdvertisementPage;
