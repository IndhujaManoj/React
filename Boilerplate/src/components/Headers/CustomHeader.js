import { CardHeader } from 'reactstrap'

export default function CustomHeader(props) {
  return (
    <CardHeader className={props?.classes ? props.classes : ''}>
      <h3 className="mb-0">{props.heading}</h3>
      <p className="muted-text">{props.subHeading}</p>
    </CardHeader>
  )
}
