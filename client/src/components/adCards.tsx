import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Ad } from "../types/ad.types";

type AdProps = {
    ad: Ad
};



const formatDate = (date:string) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0'); // מוסיף 1 משום שהחודשים מתחילים מ- 0
  const year = d.getFullYear().toString();
  return `${day}/${month}/${year}`;
};

export function AdCard({ ad }: AdProps) {
    return (
        <Card style={{ maxWidth: 345, margin: '20px', display: 'inline-block',backgroundColor:'#F8F4E1' }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {ad.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {ad.context}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {typeof ad.date === 'string' ? formatDate(ad.date) : ''}
                        {/* {new Date(ad.date).toLocaleDateString()} */}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

type AdsProps = {
    adss: Ad[] | undefined
};

export default function AdCards({ adss }: AdsProps) {
    return (
        <div>
            {adss?.map((ad, i) => (
                <AdCard key={i} ad={ad} />
            ))}
        </div>
    );
}

