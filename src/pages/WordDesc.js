import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useListContext } from '../hooks/context/useListContext';
import useFetch from '../hooks/useFetch';

import { useNavigate } from 'react-router-dom';

import '../css/WordDesc.css';

const WordDesc = () => {
    const { list, pending, error, dispatch } = useListContext();
    const { fetchData, data, isError, isPending } = useFetch();
    const navigate = useNavigate();

    const { id } = useParams();

    const [item, setItem] = useState('');
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
        console.log(data);
        if (data === id) {
            dispatch({ type: 'DELETE_WORD_FROM_LIST', payload: data })
            navigate('/');
        }
    }, [data])
    return (
        <>
            {pending ?
                <p className='center-text-in-viewport'>{pending}</p> :
                <div className='word-desc'>
                    <p><strong>Word :</strong> {item.Word}</p>
                    <p><strong>Desc :</strong> {item.Desc}</p>
                    <div className='button-div'>
                        {isPending ?
                            <button className='button-default disabled' disabled>Deleting ...</button> :
                            <button onClick={handleDelete}>Delete this Word</button>
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default WordDesc;