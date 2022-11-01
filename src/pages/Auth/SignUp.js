import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSignup } from "../../hooks/auth/useSignup";
import { labelFocus } from '../../helpers/DOMFun';

import '../../css/Login_SignUp.css';

const SignUp = () => {

    const [MobEmail, setMobEmail] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [Username, setUsername] = useState('');

    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup({ MobEmail, Name, Password, Username });
    }
    useEffect(() => {
        labelFocus();
    }, [])
    return (
        <div id="signup" className='auth'>
            <div className="auth-div">
                <h1>Personal Dictionary</h1>
                <form onSubmit={handleSubmit} className="auth-form">
                    <p id='signSee'>Sign up to see photos and videos from your friends.</p>
                    <div className='input-lable'>
                        <input
                            type="text" name="MobEmail" required
                            placeholder=' ' className='form-input'
                            value={MobEmail}
                            onChange={e => { setMobEmail(e.target.value) }}
                            minLength={4} autoFocus
                        />
                        <label className="form-label">Phone number, Username or email</label>
                    </div>
                    <div className='input-lable'>
                        <input
                            type="text" name="fullname" required
                            placeholder=' ' className='form-input'
                            value={Name}
                            onChange={e => { setName(e.target.value) }}
                            minLength={1}
                        />
                        <label className="form-label">Full name</label>
                    </div>
                    <div className='input-lable'>
                        <input type="text" name="Username" required
                            placeholder=' ' className='form-input'
                            value={Username}
                            onChange={e => { setUsername(e.target.value) }}
                            minLength={1}
                        />
                        <label className="form-label">Username</label>
                    </div>
                    <div className='input-lable'>
                        <input type="password" name="password" required
                            placeholder=' ' className='form-input'
                            value={Password}
                            onChange={e => { setPassword(e.target.value) }}
                            minLength={1}
                        />
                        <label className="form-label">Password</label>
                    </div>
                    <p className="TC">By signing up, you agree to our <Link to='/terms'>Terms</Link> , <Link to='/data-policy'>Data Policy</Link> and <Link to='/cookies-policy'>Cookies Policy</Link> .</p>
                    {error && <div className="error">{error}</div>}
                    {isLoading ?
                        <button disabled>Signing Up ...</button> :
                        <button>Sign Up</button>
                    }
                </form>
                <br />
                <p>Have an account? <Link to='/login'>Log in</Link></p>
            </div>
        </div>
    );
}
export default SignUp;