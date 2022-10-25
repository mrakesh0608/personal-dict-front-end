import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useLogin } from "hooks/auth/useLogin"
import { labelFocus } from 'helpers/DOMFun';

import 'css/Login_SignUp.css';

const LogIn = () => {

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const { login, error, isPending } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ MobEmail: Username, Password })
    }
    useEffect(() => {
        labelFocus();
    }, [])
    return (
        <div id="login" className="auth">
            <div className='auth-div'>
                <h1>Minsta</h1>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className='input-lable'>
                        <input type="text" name="Username" required
                            value={Username} className='form-input'
                            placeholder=' '
                            onChange={e => { setUsername(e.target.value); }}
                            minLength={4}
                            autoFocus
                        />
                        <label className="form-label">Phone number, Username or email</label>
                    </div>
                    <div className='input-lable'>
                        <input type="password" name="password" required
                            value={Password} className='form-input'
                            placeholder=' '
                            onChange={e => { setPassword(e.target.value); }}
                            minLength={4}
                        />
                        <label className="form-label">Password</label>
                    </div>
                    {error && <div className="error">{error}</div>}
                    {isPending ?
                        <button disabled>Logining ...</button> :
                        <button>Log In</button>
                    }
                </form>
                <br />
                <Link to='/forgot' className='forgot'>Forgot Password?</Link>
                <br /><br />
                <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
            </div>
        </div>
    );
}
export default LogIn;