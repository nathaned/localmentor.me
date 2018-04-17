export default (props) => (
	<li className={props.type + " message"}>
		{props.showName ? props.sender : ""}
		<strong>{props.date}</strong>
		<p>{props.text}</p>
	</li>
)
