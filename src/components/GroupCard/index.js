import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ItemCard from '../ItemCard';

export default function GroupCard(props) {

    const { group } = props

    return <Grid item xs={12} >
        <ItemCard className="group-item">
            <Typography style={{display: "inline-block"}}>{group.name}</Typography>
            <Link to={`/group/${group.id}`}>Go To</Link>
        </ItemCard>
    </Grid>
}