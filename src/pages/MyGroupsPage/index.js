import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { getMyGroups } from "../../api/groupApi";
import PageContainer from "../../components/PageContainer";
import GroupCard from "../../components/GroupCard";
import AuthContext from "../../context/AuthContext";

export default function MyGroupsPage() {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            getMyGroups(user)
                .then(resp => resp.json())
                .then((body) =>  {
                    setLoading(false);
                    setGroups(body);
                });
        }
    }, [user]);

    return (<PageContainer title="My Groups" loading={loading}>
        <Grid container rowSpacing={2} spacing={2}>
            {groups.map((group, idx) => <GroupCard group={group} key={idx}/>)}
        </Grid>
    </PageContainer>);
}