import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { getMyGroups } from "../../api/groupApi";
import GroupCard from "../../components/GroupCard";
import AuthContext from "../../context/AuthContext";

export default function MyGroupsPage() {

    const [groups, setGroups] = useState([]);
    const user = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            getMyGroups(user).then(resp => resp.json())
                .then((body) => setGroups(body));
        }
    }, [user]);

    return (<Grid sx={{background: "lightgrey", paddingLeft: "15px", paddingRight: "15px", margin: "0px", width: "100%"}}container rowSpacing={2} spacing={2}>
        {groups.map((group, idx) => <GroupCard group={group} key={idx}/>)}
    </Grid>);
}