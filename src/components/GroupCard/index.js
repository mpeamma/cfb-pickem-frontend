import * as React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ItemCard from '../ItemCard';

export default function GroupCard(props) {

    const { group } = props

    return <Link to={`/group/${group.id}`} style={{textDecoration: "none"}} disabled>
        <ItemCard className="group-item">
            <Typography style={{display: "inline-block"}}>{group.name}</Typography>
        </ItemCard>
    </Link>
}