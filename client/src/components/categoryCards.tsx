import React from 'react';
import { Card, CardActionArea, CardContent, Button, Typography, CardMedia, colors } from '@mui/material';
import { Category } from '../types/category.type'
import img1 from "../image/שכירות.jpeg"
import img2 from "../image/קניה.jpeg"
import img3 from "../image/שכירות2.jpeg"
import img4 from "../image/עסקים2.jpeg"
import img5 from "../image/דרושים-1.jpg"
import img6 from "../image/קיץ ונופש.jpg"
import img7 from "../image/רכב.jpg"
import img8 from "../image/נדלן4.jpeg"
import img9 from "../image/יד שניה.jpeg"
import img10 from "../image/גמח (2).jpg"
import { NavLink } from 'react-router-dom';



type CategoryProps = {
    category: Category,
    onClick: () => {},
    img: number
}

const CategoryButton = ({ category, onClick, img }: CategoryProps) => {
    const imgs = [img1, img3, img7, img4, img5, img6, img7, img8, img9, img10]
    return (

        <Card sx={{ maxWidth: 345, margin: '20px', display: 'inline-block',backgroundColor:'#F8F4E1' }}>
            <CardActionArea onClick={onClick}>
                    <CardMedia
                        component="img"
                        width="140"
                        image={imgs[category.id-1]}
                        // image={imgs[img]}// Assuming ad.image contains the URL of the image
                        alt={category.name}
                    />
                <CardContent>
                    <Typography alignItems={'center'} align="center" gutterBottom variant="h5" component="div" color={'#AF8F6F'}>
                        {category.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CategoryButton;
