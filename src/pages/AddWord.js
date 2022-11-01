import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import '../css/AddWord.css';
import { useNavigate } from 'react-router-dom';
import { useListContext } from '../hooks/context/useListContext';

const AddWord = () => {

    const { fetchData, data, isError, isPending } = useFetch();
    const { list, pending, error, dispatch } = useListContext();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData({
            path: '/addWord',
            method: 'POST',
            payload: {
                Word: e.target.Word.value,
                Desc: e.target.Desc.value
            }
        })
    }
    useEffect(() => {
        console.log(data);
        if (data) {
            dispatch({ type: 'ADD_WORD_TO_LIST', payload: data.List[0] })
            navigate('/');
        }
    }, [data])

    return (
        <div className='add-word'>
            <header>
                <h2>Add Word / Phrase</h2>
            </header>
            <form onSubmit={handleSubmit}>
                <input type='text' name='Word' placeholder='Word / Phrase' />
                <textarea name='Desc' placeholder='Description'></textarea>
                {!isPending ?
                    <button className='button-default disabled' disabled>Adding ...</button> :
                    <button className='button-default' type='submit'>Submit</button>
                }
                {isError && <span>{isError}</span>}
            </form>
        </div>
    );
}

export default AddWord;