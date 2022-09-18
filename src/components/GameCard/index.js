import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./GameCard.css";
import ItemCard from '../ItemCard';

export default function GameCard(props) {

    const { 
        selectGame, 
        isSelected, 
        game, 
        gameSelectMode, 
        teamSelectMode,
        selectTeam,
        selectedTeam
    } = props
    
    let handleClick = null;
    if (selectGame) {
        handleClick = () => selectGame(game.id);
    }
    else if (selectTeam) {
        handleClick = (team) => selectTeam(game.id, team)
    }

    return <ItemCard className={`game-item ${gameSelectMode && "select-game"}`}>
        <Grid container>
            <Grid item xs={5} className={`${selectedTeam === game.away_team && "selected"}`}  onClick={() => handleClick(game.away_team)}>
                <Grid container className={`team-side ${teamSelectMode && 'select-team'}`}>
                    <Grid item xs={4} >
                        <img 
                            alt={game.away_team} 
                            src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${game.away_id}.png&h=40&w=40`} 
                        />
                    </Grid>
                    <Grid item xs={8} className="team-name">
                        <Typography>{game.away_team}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2} className="team-name" onClick={handleClick}>at</Grid>
            <Grid item xs={5} className={`${selectedTeam === game.home_team && "selected"}`} onClick={() => handleClick(game.home_team)}>
                <Grid container className={`team-side ${teamSelectMode && 'select-team'}`}>
                    <Grid item xs={3} className="team-name">
                        <Typography>{game.home_team}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <img 
                            alt={game.home_team}
                            src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${game.home_id}.png&h=40&w=40`} 
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
        {isSelected && <CheckCircleOutlineIcon style={{position: "absolute", right: "30px", color: "green"}}/>}
        
    </ItemCard>
}