import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, Container, IconButton, Grid, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Ad} from '../types/ad.types'

type AdProps = {
    ad: Ad
};

type AdsProps = {
    ads: Ad[]
};

const AdCard = ( ad :AdProps) => (
    <Card>
        <CardContent>
            <Typography variant="h5" component="div">
                {ad.ad.title}
            </Typography>
            <Typography variant="body2">
                {ad.ad.context}
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton aria-label="edit">
                <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </CardActions>
    </Card>
);

const AdList = ( ads:AdsProps) => {
    return (
        <Container>
            <Box marginTop={2} marginBottom={2}>
                <Grid container spacing={2}>
                    {ads.ads.map((ad, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <AdCard ad={ad} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};
export default AdCard;

