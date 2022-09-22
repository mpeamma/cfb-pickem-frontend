import { Button, Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getGameset } from '../../api/gamesetApi';
import { getMySelections, makeSelections } from '../../api/selectionApi';
import GameCard from '../../components/GameCard';
import PageContainer from '../../components/PageContainer';
import AuthContext from "../../context/AuthContext";

export default function GameSetPage() {

    const { groupId, year, week } = useParams();

    const [gameset, setGameset] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedTeams, setSelectedTeams] = useState({});

    const { user } = useContext(AuthContext);

    useEffect(() => {
        getGameset(groupId, year, week)
        .then(resp => resp.json())
        .then(body => {
            setLoading(false);
            setGameset(body);
        });
    }, [groupId, year, week]);

    useEffect(() => {
        if (gameset.id && user) {
            getMySelections(gameset.id, user)
                .then(resp => resp.json())
                .then(body => {
                    let selections = {};
                    body.forEach(s => {
                        selections[s.game_id] = s.team
                    });
                    setSelectedTeams(selections);
                })
        }
    }, [user, gameset])

    const selectTeam = (gameId, team) => {
        let choices = Object.assign({}, selectedTeams);
        choices[gameId] = team;
        setSelectedTeams(choices);
    }

    const submitPicks = () => {
        const body = []
        Object.keys(selectedTeams).forEach(k => {
            body.push({
                game_id: k,
                team: selectedTeams[k],
                game_set_id: gameset.id
            })
        })
        makeSelections(body, user).then(resp => toast.success("Picks submitted"))
    }

    console.log(selectedTeams)
    return <PageContainer title={`${year} - Week ${week}`} loading={loading}>
        <Grid container rowSpacing={2} spacing={2}>
            {gameset.games && gameset.games.map(game => <Grid item  key={game.id} xs={12}>
                <GameCard
                    teamSelectMode
                    game={game}
                    selectTeam={selectTeam}
                    selectedTeam={selectedTeams[game.id]}
                />
            </Grid>)}
            <Grid item xs={12}>
                <Button variant="contained" onClick={submitPicks}>Submit</Button>
            </Grid>
        </Grid>
    </PageContainer>
}