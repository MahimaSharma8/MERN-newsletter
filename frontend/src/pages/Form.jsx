import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import video from "../components/5353375-hd_1920_1080_25fps.mp4"
function Form() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        gender: '',
        email: '',
        phone: '',
        address: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error for the current field
    };

    const isFieldEmpty = (value) => value.trim() === '';
    const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@mitwpu\.edu\.in$/.test(email);
    const isValidDepartment = (department, validDepartments) => validDepartments.includes(department);
    const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
    const isValidPhoneNumber = (phone) => /^\d{10}$/.test(phone);
    const isValidName = (name) => /^[a-zA-Z]+$/.test(name);


    const validateStep = () => {
        const currentErrors = {};
        const validDepartments = ['Engineering', 'Pharmacy', 'Biotechnology', 'Commerce'];

        // Validation for step 1
        if (currentStep === 1) {
            if (isFieldEmpty(formData.name) || !isValidName(formData.name)) {
                currentErrors.name = 'Name is required and must contain only letters.';
            }    
            if (!isValidDepartment(formData.department, validDepartments)) currentErrors.department = 'Invalid department.';
            if (isFieldEmpty(formData.gender)) currentErrors.gender = 'Gender is required.';
        }

        // Validation for step 2
        if (currentStep === 2) {
            if (!isValidEmail(formData.email)) currentErrors.email = 'Invalid email address. Must be a MIT email.';
            if (!isValidPhoneNumber(formData.phone)) currentErrors.phone = 'Invalid phone number. Must be 10 digits.';
            if (isFieldEmpty(formData.address)) currentErrors.address = 'Address is required.';
        }

        // Validation for step 3
        if (currentStep === 3) {
            if (isFieldEmpty(formData.username)) currentErrors.username = 'Username is required.';
            if (!isValidPassword(formData.password)) {
                currentErrors.password = 'Password must be at least 6 characters long, and include an uppercase letter, a lowercase letter, and a number.';
            }
            if (formData.password !== formData.confirmPassword) {
                currentErrors.confirmPassword = 'Passwords do not match.';
            }
        }

        setErrors(currentErrors);
        return Object.keys(currentErrors).length === 0; // Return true if no errors
    };

    const nextStep = () => {
        if (validateStep()) {
            setCurrentStep((prevStep) => (prevStep < totalSteps ? prevStep + 1 : prevStep));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch('http://localhost:5000/register/', { // Correct port and path
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle success
                console.log('Portfolio submitted successfully!');
                navigate('/');

            } else {
                // Handle error
                const errorData = await response.json();
                console.error('Error submitting portfolio:', errorData);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className="relative h-screen overflow-hidden">
            <video className="absolute top-0 left-0 w-full h-full object-cover opacity-40" autoPlay loop muted>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <form id="multistep-form" className="relative p-4 rounded w-4/12 m-auto text-2xl" action="/register" onSubmit={handleSubmit} method="POST">
                {/* Personal Information */}
                <fieldset id="step1" className={currentStep === 1 ? "card p-6 text-zinc-100 mt-40" : "hidden"}>
                    <legend className="font-semibold text-3xl">Personal Information</legend>

                    <label htmlFor="name" className="block mt-4">Name:</label>
                    <input type="text" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" id="name" name="name" required value={formData.name} onChange={handleChange}  placeholder='Your Name'/>
                    {errors.name && <p className="text-red-500">{errors.name}</p>}

                    <label htmlFor="department" className="block mt-4">Department:</label>
                    <select className="form-select bg-transparent text-orange-50 w-full p-2 mt-1" id="department" name="department" value={formData.department} onChange={handleChange}>
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Biotechnology">Biotechnology</option>
                        <option value="Commerce">Commerce</option>
                    </select>
                    {errors.department && <p className="text-red-500">{errors.department}</p>}

                    <label htmlFor="gender" className="block mt-4">Gender:</label>
                    <select className="form-select bg-transparent text-orange-50 w-full p-2 mt-1" id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500">{errors.gender}</p>}

                    <button type="button" className="bg-rose-950 opacity-65 text-white mt-4 py-2 px-4 rounded" onClick={nextStep}>Next</button>
                </fieldset>

                {/* Contact Information */}
                <fieldset id="step2" className={currentStep === 2 ? "card p-6 text-zinc-100" : "hidden"}>
                    <legend className="font-semibold text-3xl">Contact Information</legend>

                    <label htmlFor="email" className="block mt-4">Email:</label>
                    <input type="email" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder='Your Email'/>
                    {errors.email && <p className="text-red-500">{errors.email}</p>}

                    <label htmlFor="phone" className="block mt-4">Phone Number:</label>
                    <input type="tel" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" id="phone" name="phone" required value={formData.phone} onChange={handleChange} placeholder='Your Number'/>
                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}

                    <label htmlFor="address" className="block mt-4">Address:</label><br />
                    <textarea id="address" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" name="address" required value={formData.address} onChange={handleChange} placeholder='Your Address'></textarea>
                    {errors.address && <p className="text-red-500">{errors.address}</p>}

                    <button type="button" className="bg-rose-950 text-white mt-4 py-2 px-4 rounded opacity-65" onClick={nextStep}>Next</button>
                </fieldset>

                {/* Account Details */}
                <fieldset id="step3" className={currentStep === 3 ? "card p-6 text-zinc-100" : "hidden"}>
                    <legend className="font-semibold text-3xl">Account Details</legend>

                    <label htmlFor="username" className="block mt-4">Username:</label>
                    <input type="text" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" id="username" name="username" required value={formData.username} onChange={handleChange} placeholder='Your UserName'/>
                    {errors.username && <p className="text-red-500">{errors.username}</p>}

                    <label htmlFor="password" className="block mt-4">Password:</label>
                    <input type="password" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" id="password" name="password" required value={formData.password} onChange={handleChange} placeholder='Password' />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}

                    <label htmlFor="confirmPassword" className="block mt-4">Confirm Password:</label>
                    <input type="password" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" id="confirmPassword" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} placeholder='confirm Password'/>
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}

                    <button type="submit" className="bg-rose-950 text-white w-full mt-6 py-2 rounded opacity-65">Submit</button>
                </fieldset>
            </form>
        </div>
    );
}

export default Form;
