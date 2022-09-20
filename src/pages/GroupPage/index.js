import { Grid, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getGroup } from "../../api/groupApi";
import PageContainer from "../../components/PageContainer";
import AuthContext from "../../context/AuthContext";
import ItemCard from "../../components/ItemCard";
import EditIcon from '@mui/icons-material/Edit';
import "./GroupPage.css";

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

    return <PageContainer title={group.name} loading={loading}>
        <Grid container rowSpacing={2} spacing={2}>
            <Grid item xs={4}>
                <Paper style={{padding: "10px"}}>
                    <Typography variant="h5">Group Info</Typography>
                    <br/>
                    <Typography variant="h6" className="info-section-title">Group Owner</Typography>
                    <Typography>{group.creator}</Typography>
                    <hr style={{margin: "1vh"}}/>
                    <Typography variant="h6" className="info-section-title">Users</Typography>
                    <Grid container>
                        {group.users && group.users.map(user => <Grid key={user} item xs={12}>
                            <Typography>{user}</Typography>
                        </Grid>)}
                    </Grid>
                </Paper>
            </Grid>
            
            {group.gamesets &&
            <Grid item xs={8}>
                <Grid container spacing={2}>
                    {[...Array(15).keys()].map(weekNumber => <Grid key={weekNumber} item xs={12}>
                        <Link 
                            to={`/gameset/${group.id}/2022/${weekNumber + 1}`} 
                            className={`gameset-link ${!group.gamesets.find(g => g.week == weekNumber + 1) && "invalid"}`}
                        >
                            <ItemCard>
                                <Typography>
                                    Week {weekNumber + 1}
                                    <Link to={`/gameset/${group.id}/2022/${weekNumber + 1}/edit`} style={{float: "right"}}>
                                        <EditIcon />
                                    </Link>
                                </Typography>
                            </ItemCard>
                        </Link>
                    </Grid>)}
                </Grid>
            </Grid>}
        </Grid>
    </PageContainer> 
}