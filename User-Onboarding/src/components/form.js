import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

import './Form.scss';

const UserForm = ({ errors, touched, values, status }) => {
	const [ user, setUser ] = useState([]);

	return (
		<div>
			<h2>User Onboarding</h2>
			<Form>
				<Field type="text" name="name" placeholder="Enter Name" value={values.name} />
				<Field type="email" name="email" placeholder="Email" value={values.email} />
				<Field type="text" name="pass" placeholder="Password" value={values.pass} />
				<label>
					Terms of Services
					<Field type="checkbox" name="terms" value={values.terms} />
				</label>

				<button type="submit"> Submit! </button>
			</Form>
		</div>
	);
};

export default UserForm;
