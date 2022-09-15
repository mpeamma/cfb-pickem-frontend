import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameset } from '../../api/gamesetApi';
import GameCard from '../../components/GameCard';
import PageContainer from '../../components/PageContainer';

export default function GameSetPage() {

    const { groupId, year, week } = useParams();

    const [gameset, setGameset] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGameset(groupId, year, week)
        .then(resp => resp.json())
        .then(body => {
            setLoading(false);
            setGameset(body);
        });
    }, [])

    return <PageContainer title={`${year} - Week ${week}`} loading={loading}>
        <Grid container rowSpacing={2} spacing={2}>
            {gameset.games && gameset.games.map(game => <GameCard selectedGames={[]} game={game} />)}
        </Grid>
    </PageContainer>
}