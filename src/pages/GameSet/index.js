import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameset } from '../../api/gamesetApi';
import GameCard from '../../components/GameCard';

export default function GameSetPage() {

    const { groupId, year, week } = useParams();

    const [gameset, setGameset] = useState({});

    useEffect(() => {
        getGameset(groupId, year, week)
        .then(resp => resp.json())
        .then(body => {
            setGameset(body);
        });
    }, [])

    return <Grid sx={{background: "lightgrey", paddingLeft: "15px", paddingRight: "15px", margin: "0px", width: "100%", height: "100%"}}container rowSpacing={2} spacing={2}>
        {gameset.games && gameset.games.map(game => <GameCard selectedGames={[]} game={game} />)}
    </Grid>
}