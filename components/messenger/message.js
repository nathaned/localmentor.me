export default (props) => (
	<li className={props.type + " message"}>
		{props.showName ? (
			<p className="sender-name"><strong>{props.sender}</strong></p>
		) : "" }
		<div className="message-content">
			<p className="message-text">{props.text}</p>
			<div className="date">
				<em>{props.date}</em>
			</div>
		</div>
	</li>
)
