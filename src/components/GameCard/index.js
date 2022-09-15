import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./GameCard.css";
import ItemCard from '../ItemCard';

export default function GameCard(props) {

    const { selectGame, selectedGames, game } = props

    return <Grid item xs={12} >
        <ItemCard className="game-item" onClick={() => selectGame(game.id)}>
            <Typography style={{display: "inline-block"}}>{game.away_team} @ {game.home_team}</Typography>
            {selectedGames.includes(game.id) && <CheckCircleOutlineIcon style={{position: "absolute", right: "30px", color: "green"}}/>}
        </ItemCard>
    </Grid>
}