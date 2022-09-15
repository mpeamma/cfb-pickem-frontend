import "./Container.css";


export default function PageContainer(props) {

  if (props.loading) {
    return <div className="container" style={{justifyContent: "center"}}><div className="loader" /></div>
  }

  return <div className="container">
    {props.title && <h4>{props.title}</h4>}
    {props.children}
  </div>
}