import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useListContext } from '../hooks/context/useListContext';
import useFetch from '../hooks/useFetch';

import { useNavigate } from 'react-router-dom';

import deleteIcon from '../icons/delete.png';
import updateIcon from '../icons/update.png';
import speakIcon from '../icons/speak.png';
import '../css/WordDesc.css';

const WordDesc = () => {
    const { id } = useParams();

    const { list, pending, error, dispatch } = useListContext();
    const { fetchData, data, isError, isPending } = useFetch();

    const [item, setItem] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        list.forEach(item => {
            if (item._id === id) setItem(item);
        })
    }, [id, list]);

    const handleDelete = () => {
        fetchData({
            path: `/deleteWord/${id}`,
            method: 'DELETE'
        })
    }
    useEffect(() => {
        // console.log(data);
        if (data === id) {
            dispatch({ type: 'DELETE_WORD_FROM_LIST', payload: data })
            navigate('/');
        }
    }, [data, id])

    function P() {
        const k = new SpeechSynthesisUtterance(item.Word);
        // const voices = window.speechSynthesis.getVoices();
        // k.voice = voices[78]; //Eng-Indian-Female
        // console.log(voices);
        window.speechSynthesis.speak(k);
    }
    return (pending ?
        <p className='center-text-in-viewport'>{pending}</p> :
        <div className='word-desc'>
            <div className='word-speak'>
                <span className='Word'>{item.Word}</span>
                <img src={speakIcon} alt='p' className='img-invert' onClick={P} />
            </div>
            <pre className='Desc'>{item.Desc}</pre>
            <div className='button-div'>
                {isError}
                {error}
                {isPending ?
                    <button className='button-default disabled' disabled>Deleting ...</button> :
                    <>
                        <button className='btn-with-img' onClick={handleDelete}>
                            <img src={deleteIcon} alt='delete' />
                            <span className='warning'>Delete</span>
                        </button>
                        <button className='btn-with-img bg-green' onClick={() => navigate(`/UpdateWord/${id}`)}>
                            <img src={updateIcon} alt='update' className='img-scale-dw' />
                            <span>Update</span>
                        </button>
                    </>
                }
            </div>
        </div>
    );
}

export default WordDesc;