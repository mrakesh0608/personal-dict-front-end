import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useListContext } from '../hooks/context/useListContext';
import useFetch from '../hooks/useFetch';

import { useNavigate } from 'react-router-dom';

import deleteIcon from '../icons/delete.png';
import updateIcon from '../icons/update.png';

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
    return (
        <>
            {pending ?
                <p className='center-text-in-viewport'>{pending}</p> :
                <div className='word-desc'>
                    <p className='Word'>{item.Word}</p>
                    <p className='Desc'>{item.Desc}</p>
                    <div className='button-div'>
                        {isError}
                        {error}
                        {isPending ?
                            <button className='button-default disabled' disabled>Deleting ...</button> :
                            <>
                                <button className='btn-with-img' onClick={handleDelete}>
                                    <img src={deleteIcon} alt='delete' />
                                    <span>Delete</span>
                                </button>
                                <button className='btn-with-img bg-green' onClick={() => navigate(`/UpdateWord/${id}`)}>
                                    <img src={updateIcon} alt='delete' />
                                    <span>Update</span>
                                </button>
                            </>
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default WordDesc;