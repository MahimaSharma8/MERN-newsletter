import React, { useState } from 'react';
import video from "./3944852-uhd_4096_2160_25fps.mp4"
function  Author() {


    const [formData, setFormData] = useState({
        Author: "",
        email: "",
        textcontent: "",
        headline: "",
        photos: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };



    const isFieldEmpty = (value) => value.trim() === '';
    const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@mitwpu\.edu\.in$/.test(email);
    const isValidDepartment = (department, validDepartments) => validDepartments.includes(department);
    const isValidName = (name) => /^[a-zA-Z]+$/.test(name);


    const validateForm = () => {
        const currentErrors = {};
        const validDepartments = ['Engineering', 'Pharmacy', 'Biotechnology', 'Commerce'];
        if (isFieldEmpty(formData.Author) || !isValidName(formData.Author)) {
            currentErrors.Author = 'Name is required and must contain only letters.';
        };
        if (!isValidDepartment(formData.department, validDepartments)) currentErrors.department = 'Invalid department.';
        if (!isValidEmail(formData.email)) currentErrors.email = 'Invalid email address. Must be a MIT email.'

        setErrors(currentErrors);
        return Object.keys(currentErrors).length === 0; // Return true if no errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        //e.preventDefault() prevents the browser from reloading the page or navigating away when the form is submitted. This allows you to handle form submission entirely within JavaScript.
        if(validateForm()) {
            const article_id = Date.now(); 
            const dataToSubmit = {
                article_id,
                ...formData 
            };
            //concating article_id with formData
            //The await keyword is used to wait for an asynchronous action to finish before continuing the function.
            try {
                const response = await fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', //explicitly making sure that server expects json doc
                    },
                    body: JSON.stringify(dataToSubmit),
                });
    
                if (response.ok) {
                    console.log('Article submitted successfully!');
                    alert("Thank you for your submission!");
                } else {
                    const errorData = await response.json();
                    console.error('Error submitting article:', errorData);
                }
            } catch (err) {
                console.error('Error:', err);
            }
        }
    };

    return (
        <div className="relative h-screen overflow-hidden">
            <video className="absolute top-0 left-0 w-full h-full object-cover opacity-40 mb-0" autoPlay loop muted>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <form id="form" className="relative pl-4 bottom-28 rounded w-4/12 m-auto text-2xl" action="/users" onSubmit={handleSubmit} method="POST">
                {/* Information */}
                <fieldset className="card p-6 text-zinc-100 mt-40">
                    <legend className="font-semibold text-5xl">Article Information</legend>

                    <label htmlFor="Author" className="block mt-4">Author:</label>
                    <input type="text" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" id="Author" name="Author" required value={formData.Author} onChange={handleChange} placeholder='Your Name' />
                    {errors.Author && <p className="text-red-500">{errors.Author}</p>}


                    <label htmlFor="email" className="block mt-4">Email:</label>
                    <input type="email" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder='Your Email' />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}


                    <label htmlFor="department" className="block mt-4">Department:</label>
                    <select className="form-select bg-transparent text-orange-50 w-full p-2 mt-1" id="department" name="department" value={formData.department} onChange={handleChange}>
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Biotechnology">Biotechnology</option>
                        <option value="Commerce">Commerce</option>
                    </select>
                    {errors.department && <p className="text-red-500">{errors.department}</p>}

                    <label>HeadLine:</label>
                    <input name="headline" tyoe = "text" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" placeholder="your article headline" value={formData.headline} onChange={handleChange} required />

                    <label>Article Text Content:</label>
                    <textarea name="textcontent" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1"  placeholder="your article's text" value={formData.textcontent} onChange={handleChange} required />
                    
                    <label>Photo src:</label>
                    <input type="text" name="photos" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" value={formData.photos} placeholder="Paste your Photo's src" onChange={handleChange}/>
                    <button type="submit" className="bg-rose-950 text-white w-full mt-6 py-2 rounded opacity-65">Submit</button>
                </fieldset>
            </form>
        </div >
    );
}
export default Author;
