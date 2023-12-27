import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef(null);
    const [formValue, setFormValue] = useState({ name: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeName = (e) => {
        setFormValue({ ...form, [e.target.name]: e.target.value });
    };
    const handleFocus = () => {};
    const handleBlur = () => {};
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        emailjs
            .sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formValue.name,
                    to_name: 'DowonKim',
                    from_email: formValue.email,
                    to_email: 'kimseong1404@gmail.com',
                    from_message: formValue.message,
                },
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            )
            .then(() => {
                setIsLoading(false);
                //
            })
            .catch((err) => {
                setIsLoading(false);
                console.error(err);
            });
    };

    console.log('formValue', formValue);
    console.log('formRef', formRef.current);

    return (
        <section className="relative flex lg:flex-row flex-col max-container">
            <div className="flex-1 min-w-[50%] flex flex-col">
                <h1 className="head-text">Get in Touch</h1>
                <form className="w-full flex flex-col gap-7 mt-14" onSubmit={handleSubmit}>
                    <label className="text-black-500 font-semibold">
                        Name
                        <input
                            text="text"
                            name="name"
                            className="input"
                            placeholder="kimdowon"
                            required
                            value={formValue.name}
                            onChange={handleChangeName}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className="text-black-500 font-semibold">
                        Email
                        <input
                            text="email"
                            name="email"
                            className="input"
                            placeholder="kimdowon@gmail.com"
                            required
                            value={formValue.email}
                            onChange={handleChangeName}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className="text-black-500 font-semibold">
                        Message
                        <textarea
                            name="message"
                            rows={4}
                            className="textarea"
                            placeholder="Please write down what you want to write."
                            required
                            value={formValue.message}
                            onChange={handleChangeName}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <button
                        type="submit"
                        className="btn"
                        disabled={isLoading}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
