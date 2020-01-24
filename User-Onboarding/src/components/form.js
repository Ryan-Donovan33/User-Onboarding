import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import './Form.scss';

const UserForm = ({ errors, touched, values, status }) => {
	const [ user, setUser ] = useState([]);

	// useEffect(() => {
	// 	status && setUser(person => [...person, status]);
	// }, [status])
	useEffect(
		() => {
			status && setUser((person) => [ ...person, status ]);
		},
		[ status ]
	);
	return (
		<div>
			<h2>User Onboarding</h2>
			<Form>
				{/* creating formik form to onboard new users into the system */}
				<Field type="text" name="name" placeholder="Enter Name" value={values.name} />
				<Field type="email" name="email" placeholder="Email" value={values.email} />
				<Field type="text" name="pass" placeholder="Password" value={values.pass} />
				<label>
					Terms of Services
					<Field type="checkbox" name="terms" value={values.terms} />
				</label>

				<button type="submit"> Submit! </button>
			</Form>

			{user.map((el) => (
				<ul>
					{/* mapping over and putting only the name and email of the user onto the page */}
					<li>Name: {el.name}</li>
					<li>Email: {el.email}</li>
				</ul>
			))}
		</div>
	);
};

const FormikUserForm = withFormik({
	mapPropsToValues({ users }) {
		//passing props to each field
		return {
			name: users || '',
			email: '',
			pass: '',
			terms: false
		};
	},
	// validation required - making sure new users fill out each field. Not all required.
	validationSchema: Yup.object().shape({
		name: Yup.string().required('Please Fill in Name!'),
		email: Yup.string().required('Please put in your email address!'),
		pass: Yup.stril().required('Password Needed!'),
		terms: Yup.bool()
	}),

	handleSubmit(values, { setStatus, resetForm }) {
		console.log('submitting form:', values);

		axios.post('https://reqres.in/api/users', values);
		then((res) => {
			console.log('Success:', res);
			setStatus(res.data);
			resetForm();
		}).catch((err) => {
			console.log('Error:', err.response);
		});
	}
})(UserForm);
export default FormikUserForm;
