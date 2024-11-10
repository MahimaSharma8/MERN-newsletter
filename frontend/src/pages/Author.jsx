import React, { useState } from 'react';
import video from "../assets/3944852-uhd_4096_2160_25fps.mp4"

function Author() {
    const [formData, setFormData] = useState({
        Author: "",
        email: "",
        Textcontent: ["", ""], 
        headline: "",
        Photos: ["", ""]       
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if the field is part of the array
        if (name.startsWith("Textcontent") || name.startsWith("Photos")) {
            const index = parseInt(name.split("-")[1], 10);
            setFormData({
                ...formData,
                [name.split("-")[0]]: formData[name.split("-")[0]].map((item, i) => (i === index ? value : item))
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    // Validation functions (kept the same)
    const isFieldEmpty = (value) => value.trim() === '';
    const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@mitwpu\.edu\.in$/.test(email);
    const isValidDepartment = (department, validDepartments) => validDepartments.includes(department);
    const isValidName = (name) => /^[a-zA-Z]+$/.test(name);

    const validateForm = () => {
        const currentErrors = {};
        const validDepartments = ['Engineering', 'Pharmacy', 'Biotechnology', 'Commerce'];
        if (isFieldEmpty(formData.Author) || !isValidName(formData.Author)) {
            currentErrors.Author = 'Name is required and must contain only letters.';
        }
        if (!isValidDepartment(formData.department, validDepartments)) {
            currentErrors.department = 'Invalid department.';
        }
        if (!isValidEmail(formData.email)) {
            currentErrors.email = 'Invalid email address. Must be a MIT email.'
        }

        setErrors(currentErrors);
        return Object.keys(currentErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()) {
            const article_id = Date.now(); 
            const dataToSubmit = {
                article_id,
                ...formData 
            };

            try {
                const response = await fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
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
            <form id="form" className="relative pl-4 bottom-28 rounded w-4/12 m-auto text-2xl" onSubmit={handleSubmit} method="POST">
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
                    <input name="headline" type="text" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" placeholder="Your article headline" value={formData.headline} onChange={handleChange} required />

                    <label>Article Text Content 1:</label>
                    <textarea name="Textcontent-0" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" placeholder="Article text 1" value={formData.Textcontent[0]} onChange={handleChange} required />

                    <label>Article Text Content 2:</label>
                    <textarea name="Textcontent-1" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" placeholder="Article text 2" value={formData.Textcontent[1]} onChange={handleChange} required />
                    
                    <label>Photo src 1:</label>
                    <input type="text" name="Photos-0" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" placeholder="Photo src 1" value={formData.Photos[0]} onChange={handleChange} />

                    <label>Photo src 2:</label>
                    <input type="text" name="Photos-1" className="rounded bg-transparent text-orange-50 w-full p-2 mt-1" placeholder="Photo src 2" value={formData.Photos[1]} onChange={handleChange} />

                    <button type="submit" className="bg-rose-950 text-white w-full mt-6 py-2 rounded opacity-65">Submit</button>
                </fieldset>
            </form>
        </div>
    );
}

export default Author;
