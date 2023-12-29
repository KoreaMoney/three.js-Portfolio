import React, { Suspense, useRef, useState } from 'react';
import Fox from '../models/Fox';
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';

const Contact = () => {
    const formRef = useRef(null);
    const [formValue, setFormValue] = useState({ name: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState('idle');

    const { alert, showAlert, hideAlert } = useAlert();

    const handleChangeName = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };
    const handleFocus = () => setCurrentAnimation('walk');
    const handleBlur = () => setCurrentAnimation('idle');
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCurrentAnimation('hit');
        emailjs
            .send(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formValue.name,
                    to_name: 'DowonKim',
                    from_email: formValue.email,
                    to_email: 'kimseong1404@gmail.com',
                    message: formValue.message,
                },
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            )
            .then(() => {
                setIsLoading(false);
                showAlert({
                    show: true,
                    text: 'Message sent successfully',
                    type: 'success',
                });
                setTimeout(() => {
                    hideAlert();
                    setCurrentAnimation('idle');
                }, [3000]);
                setFormValue({ name: '', email: '', message: '' });
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
                setCurrentAnimation('idle');
                showAlert({
                    show: true,
                    text: 'Message sent failed',
                    type: 'danger',
                });
            });
    };

    return (
        <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
            {alert.show && <Alert {...alert} />}
            <div className="flex-1 min-w-[50%] flex flex-col">
                <h1 className="head-text">Get in Touch</h1>
                <form className="w-full flex flex-col gap-7 mt-14" onSubmit={handleSubmit} ref={formRef}>
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
            <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
                <Canvas
                    camera={{
                        position: [0, 0, 5],
                        fov: 75,
                        near: 0.1,
                        far: 1000,
                    }}
                >
                    <directionalLight intensity={2.5} position={[0, 0, 1]} />
                    <ambientLight intensity={0.5} />
                    <Fox
                        currentAnimation={currentAnimation}
                        position={[0.5, 0.35, 0]}
                        rotation={[12.6, -0.6, 0]}
                        scale={[0.5, 0.5, 0.5]}
                    />
                </Canvas>
            </div>
        </section>
    );
};

export default Contact;
