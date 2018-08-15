import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Consumer } from '../../context';

class Contact extends Component {
	constructor() {
		super();
		this.state = {
			showContactInfo: false,
			data: []
		};
		this.clickToShow = this.clickToShow.bind(this);
	}

	clickToShow = e => {
		if (this.state.showContactInfo === true) {
			this.setState({
				showContactInfo: false
			});
		} else {
			this.setState({
				showContactInfo: true
			});
		}
	};

	onDeleteClick = async (id, dispatch) => {
		const res = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
		dispatch({
			type: 'DELETE_CONTACT',
			payload: id
		});
	};

	// componentWillMount() {
	// 	async function getUrl() {
	// 		const urlString = 'https://api.github.com/users?access_token=e6b4cbed7e99291b1e08ea7cebc2973607bb383a';
	// 		try {
	// 			const gitUserData = await axios.get(urlString);
	// 			const proms = gitUserData.data.map(async userUrl => {
	// 				return await axios(userUrl.url + '?access_token=e6b4cbed7e99291b1e08ea7cebc2973607bb383a');
	// 			});
	// 			await Promise.all(proms).then(need => {
	// 				this.setState({
	// 					data: need
	// 				}).then(() => {
	// 					console.log(this.state.data);
	// 				});
	// 			});
	// 		} catch (e) {
	// 			console.log('this is the e', e.response);
	// 		}
	// 	}
	// 	getUrl();
	// }

	render() {
		const { name, email, phone, id } = this.props.data;
		const { showContactInfo } = this.state;
		return (
			<Consumer>
				{value => {
					const { dispatch } = value;
					return (
						<div className="card card-body mb-3">
							<h4>
								{name}
								<i
									onClick={this.clickToShow.bind(this, name)}
									className="fas fa-sort-down"
									style={{ cursor: 'pointer' }}
								/>
								<i
									onClick={this.onDeleteClick.bind(this, id, dispatch)}
									className="fas fa-times"
									style={{ cursor: 'pointer', float: 'right', color: 'red' }}
								/>
								<Link to={`contact/edit/${id}`}>
									<i
										className="fas fa-pencil-alt"
										style={{
											cursor: 'pointer',
											float: 'right',
											color: 'black',
											paddingRight: '10px'
										}}
									/>
								</Link>
							</h4>
							{showContactInfo ? (
								<ul className={'list-group'}>
									<li className={'list-group-item'}>{email}</li>
									<li className={'list-group-item'}>{phone}</li>
								</ul>
							) : null}
						</div>
					);
				}}
			</Consumer>
		);
	}
}

Contact.defaultProps = {
	name: 'Kevin',
	email: 'default@gmail.com',
	phone: '232-424-2324'
};

Contact.propTypes = {
	data: PropTypes.object.isRequired
};

export default Contact;
