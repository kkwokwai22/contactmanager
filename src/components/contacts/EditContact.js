import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
	state = {
		name: '',
		email: '',
		phone: '',
		errors: {}
	};

	async componentDidMount() {
		const paramsID = this.props.match.params.id;
		const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${paramsID}`);
		console.log(res);
		this.setState({
			name: res.data.name,
			email: res.data.email,
			phone: res.data.phone
		});
	}

	onChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	onSubmitUpdate = async (dispatch, e) => {
		e.preventDefault();
		const { name, email, phone } = this.state;
		if (name === '') {
			this.setState({
				errors: {
					name: 'Name is required'
				}
			});
			return;
		}
		if (email === '') {
			this.setState({
				errors: {
					email: 'Email is required'
				}
			});
			return;
		}
		if (phone === '') {
			this.setState({
				errors: {
					phone: 'Phone is required'
				}
			});
			return;
		}

		const updateContact = {
			name,
			email,
			phone
		};

		const paramsID = this.props.match.params.id;
		console.log(paramsID);
		const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${paramsID}`, updateContact);
		dispatch({
			type: 'UPDATE_CONTACT',
			payload: res.data
		});

		this.setState({
			phone: '',
			email: '',
			name: '',
			errors: {}
		});

		this.props.history.push('/');
	};

	render() {
		const { phone, email, name, errors } = this.state;
		return (
			<Consumer>
				{value => {
					const { dispatch } = value;
					return (
						<div className="card mb-3">
							<div className="card-header">Edit Contact</div>
							<div className="card-body">
								<form onSubmit={this.onSubmitUpdate.bind(this, dispatch)}>
									<TextInputGroup
										label="Name"
										name="name"
										placeholder="Enter Name"
										value={name}
										onChange={this.onChange}
										error={errors.name}
									/>
									<TextInputGroup
										label="Email"
										name="email"
										type="email"
										placeholder="Enter Email"
										value={email}
										onChange={this.onChange}
										error={errors.email}
									/>
									<TextInputGroup
										label="Phone"
										name="phone"
										type="phone"
										placeholder="Enter Phone"
										value={phone}
										onChange={this.onChange}
										error={errors.phone}
									/>
									<input type="submit" value="Update Contact" className="btn btn-light btn-block" />
								</form>
							</div>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

export default EditContact;
