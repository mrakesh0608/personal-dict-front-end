import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NotFound(){

    const navigate = useNavigate();
    const [time, setTime] = useState(10);

    useEffect(() => {
        setTimeout(() => {
            if (time > 0) setTime(time - 1);
            if (time === 1) navigate('/')
        }, 1000);
    }, [time]);
    return (
        <div id='not-found' className='text-center'>
            <h2>Sorry, this Page can't be found</h2><br />
            <p>Go back to <Link to='/' style={{ color: 'blue' }}>HomePage</Link> ...</p><br />
            <p>auto re-directing to HomePage<br />in {time} sec</p>
        </div>
    );
}