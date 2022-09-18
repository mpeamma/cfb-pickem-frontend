
import { useEffect, useState } from 'react';
import { getCurrentWeek, getSchedule } from '../../api/scheduleApi';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Button, MenuItem, Select, Typography } from '@mui/material';
import { createGameset } from '../../api/gamesetApi';
import GameCard from '../../components/GameCard';
import AuthContext from "../../context/AuthContext";
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';

export default function SchedulePage() {

    const { year, week } = useParams();

    const [schedule, setSchedule] = useState([]);
    const [selectedGames, setSelectedGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [weekNum, setWeekNum] = useState(week);
    const [yearNum, setYearNum] = useState(year);
    

    const user = React.useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        if (!yearNum) {
            setYearNum(new Date().getFullYear());
        }
        else if (!weekNum) {
            getCurrentWeek()
                .then(resp => resp.json())
                .then(body => {
                    setWeekNum(body);
                });
        }
        else {
            getSchedule(yearNum, weekNum)
                .then(resp => resp.json())
                .then((data) =>{
                    setLoading(false);
                    setSchedule(data);
                });
        }

       
    }, [yearNum, weekNum]);

    const selectGame = (gameId) => {
        if (!selectedGames.includes(gameId)) {
            setSelectedGames([...selectedGames, gameId])
        }
        else {
            setSelectedGames(selectedGames.filter(item => item !== gameId))
        }
    }

    const selectWeek = ({ target }) => {
        navigate(`/schedule/${yearNum}/${target.value}`, {replace: true});
        setWeekNum(target.value);
    }

    const onSubmit = () => {
        var body = {
            "id": "foo",
            "group_id": "12345",
            "games": selectedGames,
            "year": Number(year),
            "week": Number(week)
        }
        createGameset(body, user)
    }

    return (<PageContainer title="Schedule" loading={loading}>
        <Grid container rowSpacing={2} spacing={2}>
            <Grid item xs={6}><Typography>Select games for your group: </Typography></Grid>
            <Grid item xs={4}><Button variant="contained" onClick={onSubmit}>Submit</Button></Grid>
            <Grid item xs={2}>
            <Select
                value={weekNum}
                label="Week"
                onChange={selectWeek}
            >
                {[...Array(15).keys()].map(w => <MenuItem key={w} value={w + 1}>{w + 1}</MenuItem>)}
            </Select>
            </Grid>
            {schedule.map((game, idx) => <Grid key={idx} item xs={12}>
                <GameCard 
                    selectGame={selectGame} 
                    isSelected={selectedGames.includes(game.id)} 
                    game={game} 
                    gameSelectMode/>
            </Grid>)}
        </Grid>
    </PageContainer>);
}
