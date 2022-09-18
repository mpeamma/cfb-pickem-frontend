import { Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getGroup } from "../../api/groupApi";
import PageContainer from "../../components/PageContainer";
import AuthContext from "../../context/AuthContext";

export default function GroupPage() {

    const { groupId } = useParams();
    const { user } = useContext(AuthContext);

    const [group, setGroup] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGroup(groupId, user)
            .then(resp => resp.json())
            .then(body =>  {
                setLoading(false);
                setGroup(body);
            })
    }, [groupId, user])

    return <PageContainer title="Group" loading={loading}>
        <Grid container rowSpacing={2} spacing={2}>
            <Grid item xs={12}>
                <Typography>{group.name}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Users</Typography>
                <Grid>
                    {group.users && group.users.map(user => <Grid key={user} item xs={12}>
                        <Typography>{user}</Typography>
                    </Grid>)}
                </Grid>
            </Grid>
            <Grid item xs={8}>
                <Typography>Weeks</Typography>
                <Grid>
                    {[...Array(15).keys()].map(weekNumber => <Grid key={weekNumber} item xs={12}>
                        <Typography><Link to={`/gameset/${group.id}/2022/${weekNumber + 1}`}>Go To</Link>{weekNumber + 1}</Typography>
                    </Grid>)}
                </Grid>
            </Grid>
        </Grid>
    </PageContainer> 
}