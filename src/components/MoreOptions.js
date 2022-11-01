import { useState } from 'react';
import { useEffect } from 'react';
import '../css/MoreOptions.css';

export default function MoreOptions({ Comp }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        document.querySelector('body').style.overflow = 'hidden';
        return () => { document.querySelector('body').style.overflow = 'auto'; }
    }, [])

    const setMoreOptionsShow = () => setShow(true);

    const CloseMore = () => {
        document.querySelector('.more-options-list').classList.remove('ani');
        document.querySelector('.more-options-list').classList.add('ani-r');
        setTimeout(() => setShow(false), 500);
    };

    const MoreOptionsComp = () => {
        return <div className='more-options-overlay'
            onClick={(e) => {
                if (e.target.className === 'more-options-overlay') CloseMore();
            }}>
            <div className='more-options-list ani' >
                <div id='user-more-close'>
                    <div onClick={CloseMore}></div>
                </div>
                <Comp />
            </div>
        </div>
    }
    return { MoreOptionsComp, MoreOptionsShow: show, setMoreOptionsShow }
}