import React from 'react';
import { useSocketContext } from '../hooks/context/useSocketContext';
import '../css/AddWord.css';

const AddWord = () => {

    const { socket } = useSocketContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('addWord', ({
            Word: e.target.Word.value,
            Desc: e.target.Desc.value
        }))
    }

    return (
        <div className='add-word'>
            <header>
                <h2>Add Word / Phrase</h2>
            </header>
            <form onSubmit={handleSubmit}>
                <input type='text' name='Word' placeholder='Word / Phrase' />
                <textarea name='Desc' placeholder='Description'></textarea>
                <button className='button-default' type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default AddWord;