export default (props) => (
	<li className={props.type + " message"}>
		{props.showName ? props.sender : ""}
		<p>{props.text}</p>
	</li>
)
