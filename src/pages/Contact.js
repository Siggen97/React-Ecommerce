import React, { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        subject: '',
        email: '',
        body: ''
    });

    const [errors, setErrors] = useState({
        fullName: '',
        subject: '',
        email: '',
        body: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let formIsValid = true;
        const newErrors = {};

        if (!formData.fullName || formData.fullName.length < 3) {
            newErrors.fullName = 'Full name must be at least 3 characters long.';
            formIsValid = false;
        }

        if (!formData.subject || formData.subject.length < 3) {
            newErrors.subject = 'Subject must be at least 3 characters long.';
            formIsValid = false;
        }

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email must be a valid email address.';
            formIsValid = false;
        }

        if (!formData.body || formData.body.length < 3) {
            newErrors.body = 'Body must be at least 3 characters long.';
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form Data:', formData);
            
            setFormData({
                fullName: '',
                subject: '',
                email: '',
                body: ''
            });
        }
    };

    return (
        <div className='contact-page'>
            <h3>Contact</h3>
            <p>Fill out the form below to get in touch with us.</p>
            <form className='contact-form' onSubmit={handleSubmit}>
                <div className='label-input'>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
                </div>
                <div className='label-input'>
                    <label>Subject</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                    {errors.subject && <p style={{ color: 'red' }}>{errors.subject}</p>}
                </div>
                <div className='label-input'>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>
                <div className='label-input'>
                    <label></label>
                    <textarea className='textarea-input'
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                        required
                        
                    />
                    {errors.body && <p style={{ color: 'red' }}>{errors.body}</p>}
                </div>
                <div className='d-flex form-btn'>
                    <button className='btn btn-primary w-100' type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
