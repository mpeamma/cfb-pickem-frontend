import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function GroupCard(props) {

    const { group } = props

    return <Grid item xs={12} >
        <Item className="group-item">
            <Typography style={{display: "inline-block"}}>{group.name}</Typography>
        </Item>
    </Grid>
}