import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useListContext } from '../hooks/context/useListContext';
import useFetch from '../hooks/useFetch';

import '../css/AddWord.css';

export default function UpdateWord() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { fetchData, data, isError, isPending } = useFetch();
    const { list, pending, error, dispatch } = useListContext();

    useEffect(() => {
        list.forEach(item => {
            if (item._id === id) {
                document.getElementById('update-word').value = item.Word;
                document.getElementById('update-desc').value = item.Desc;
            };
        })
    }, [id, list]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData({
            path: `/updateWord/${id}`,
            method: 'PATCH',
            payload: {
                Word: e.target.Word.value,
                Desc: e.target.Desc.value
            }
        })
    }
    useEffect(() => {
        console.log(data);
        if (data) {
            dispatch({ type: 'UPDATE_WORD_IN_LIST', payload: data })
            navigate('/');
        }
    }, [data])

    return <>
        {pending ?
            <p className='center-text-in-viewport'>{pending}</p> :
            <div className='add-word'>
                <header>
                    <h2>Update Word / Phrase</h2>
                </header>
                <form onSubmit={handleSubmit}>
                    <input id='update-word' type='text' name='Word' placeholder='Word / Phrase' />
                    <textarea id='update-desc' name='Desc' placeholder='Description'></textarea>
                    {isPending ?
                        <button className='button-default disabled' disabled>Updating ...</button> :
                        <button className='button-default' type='submit'>Submit</button>
                    }
                    {isError && <span>{isError}</span>}
                </form>
            </div>
        }
    </>
}