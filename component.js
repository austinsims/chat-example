var socket = io();
var Chat = React.createClass({
	getInitialState: function() {
		return {
			newMessage: '',
			messages: [],
		};
	},

	componentDidMount: function() {
		var component = this;
		socket.on('chat message', function(msg) {
			var messages = component.state.messages;
			messages = messages.concat(msg);
			component.setState({
				messages: messages,
			});
		});
	},

	render: function() {
		return (
			<div>
				<ul>
					{
						this.state.messages.map(function(message) {
							return <li>{message}</li>
						})
					}
				</ul>
				<form onSubmit={this.onSubmit}>
					<input value={this.state.newMessage} onInput={this.onInput} autocomplete="off"></input>
					<button>Send</button>
				</form>
			</div>
		);
	},

	onSubmit: function(e) {
		e.preventDefault();
		socket.emit('chat message', this.state.newMessage);
		this.setState({
			newMessage: '',
		});
	},

	onInput: function(e) {
		this.setState({
			newMessage: e.target.value,
		});
	},
});

React.render(<Chat />, document.getElementById('react-container'));