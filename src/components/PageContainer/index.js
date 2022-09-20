import { Typography } from "@mui/material";
import "./Container.css";


export default function PageContainer(props) {

  if (props.loading) {
    return <div className="container" style={{justifyContent: "center"}}><div className="loader" /></div>
  }

  return <div className="container">
    {props.title && <Typography variant="h4" className="container-title">{props.title}</Typography>}
    {props.children}
  </div>
}