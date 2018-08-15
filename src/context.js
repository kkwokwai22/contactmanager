import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();
const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_CONTACT':
			return {
				...state,
				contacts: [action.payload, ...state.contacts]
			};
		case 'UPDATE_CONTACT':
			return {
				...state,
				contacts: state.contacts.map(contact => {
					if (contact.id === action.payload.id) {
						return (contact = action.payload);
					}
					return contact;
				})
			};
		case 'DELETE_CONTACT':
			return {
				...state,
				contacts: state.contacts.filter(contact => contact.id !== action.payload)
			};
			console.log('after state', state.contacts);
		default:
			return state;
	}
};

export class Provider extends Component {
	state = {
		contacts: [],
		data: [],
		dispatch: action => {
			this.setState(state => reducer(state, action));
		}
	};

	async componentDidMount() {
		const res = await axios.get('https://jsonplaceholder.typicode.com/users');
		this.setState({
			contacts: res.data
		});
	}

	render() {
		return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
	}
}

export const Consumer = Context.Consumer;
