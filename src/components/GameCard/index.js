import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./GameCard.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function GameCard(props) {

    const { selectGame, selectedGames, game } = props

    return <Grid item xs={12} >
        <Item className="game-item" onClick={() => selectGame(game.id)}>
            <Typography style={{display: "inline-block"}}>{game.away_team} @ {game.home_team}</Typography>
            {selectedGames.includes(game.id) && <CheckCircleOutlineIcon style={{position: "absolute", right: "30px", color: "green"}}/>}
        </Item>
    </Grid>
}