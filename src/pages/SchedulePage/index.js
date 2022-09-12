
import { useEffect, useState } from 'react';
import { getSchedule } from '../../api/scheduleApi';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import { createGameset } from '../../api/gamesetApi';
import GameCard from '../../components/GameCard';
import AuthContext from "../../context/AuthContext";
import { useParams } from 'react-router-dom';

export default function SchedulePage() {

    const [schedule, setSchedule] = useState([]);
    const [selectedGames, setSelectedGames] = useState([]);

    const { year, week } = useParams();

    const user = React.useContext(AuthContext);

    useEffect(() => {
        getSchedule(year, week)
            .then(resp => resp.json())
            .then((data) =>{
                setSchedule(data)
            })
    }, []);

    const selectGame = (gameId) => {
        if (!selectedGames.includes(gameId)) {
            setSelectedGames([...selectedGames, gameId])
        }
        else {
            setSelectedGames(selectedGames.filter(item => item !== gameId))
        }
    }

    const onSubmit = () => {
        var body = {
            "id": "foo",
            "group_id": "foo",
            "games": selectedGames,
            "year": Number(year),
            "week": Number(week)
        }
        createGameset(body, user)
    }

    return (
        <Grid sx={{background: "lightgrey", paddingLeft: "15px", paddingRight: "15px", margin: "0px", width: "100%"}}container rowSpacing={2} spacing={2}>

            <Grid item xs={6}><Typography>Select games for your group: </Typography></Grid>
            <Grid item xs={6}><Button variant="contained" onClick={onSubmit}>Submit</Button></Grid>

            {schedule.map((game, idx) => 
                <GameCard key={idx} selectGame={selectGame} selectedGames={selectedGames} game={game}/>
            )}
        </Grid>
    );
}
