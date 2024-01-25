import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState("");
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSignup = async (event) => {
        event.preventDefault();
        setLoading(true)
        const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success == false) {
            setError(data.message)
            setLoading(false)
        } else {
            setLoading(false)
            setError(null)
            navigate('/')
        }
        console.log(data);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div className="flex flex-col text-center px-[10%] py-[5%]">
            <h2 className="text-3xl mb-5">Sign In</h2>
            <form onSubmit={handleSignup}>
                <label>
                    <input
                        className="border-2 p-3 m-2 rounded-md w-[60%] text-lg"
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    <input
                        className="border-2 p-3 m-2 rounded-md w-[60%] text-lg"
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button
                    type="submit" className="bg-slate-600 p-2 text-xl text-white rounded-md w-[60%] m-2">
                    {loading ? 'loading...' : 'Sign In'}
                </button>
                <br />
                <p className="text-lg">Dont have an account?<span className="text-blue-800 ml-1 cursor-pointer" onClick={() => navigate('/sign-up')}>Sign Up</span></p>
                <br />
                {error && <p className="text-red-500 text-xl">{error}</p>}
            </form>
        </div>
    );
};

export default SignIn;
