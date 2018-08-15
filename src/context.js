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

	// componentDidMount() {
	// 	async function getUrl() {
	// 		const urlString = 'https://api.github.com/users?access_token=e6b4cbed7e99291b1e08ea7cebc2973607bb383a';
	// 		try {
	// 			let data;
	// 			const gitUserData = await axios.get(urlString);
	// 			const proms = gitUserData.data.map(async userUrl => {
	// 				return await axios(userUrl.url + '?access_token=e6b4cbed7e99291b1e08ea7cebc2973607bb383a');
	// 			});
	// 			data = await Promise.all(proms);
	// 			data;
	// 		} catch (e) {
	// 			console.log('this is the e', e.response);
	// 		}
	// 	}
	// 	let theNeed = getUrl();
	// 	this.setState(
	// 		{
	// 			data: theNeed
	// 		},
	// 		() => {
	// 			console.log(this.state.contacts);
	// 			console.log(this.state.data);
	// 		}
	// 	);
	// }

	render() {
		return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
	}
}

export const Consumer = Context.Consumer;
