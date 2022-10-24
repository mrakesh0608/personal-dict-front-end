import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useListContext } from '../hooks/context/useListContext';
import { useSocketContext } from '../hooks/context/useSocketContext';

import '../css/WordDesc.css';

const WordDesc = () => {
    const { list, pending, error } = useListContext();
    const { socket } = useSocketContext();

    const { id } = useParams();

    const [item, setItem] = useState('');
    useEffect(() => {
        list.forEach(item => {
            if (item._id === id) setItem(item);
        })
    }, [id, list]);

    const handleDelete = ()=>{
        socket.emit('deleteWord',({id}));
    }
    return (
        <>
            {pending ?
                <p className='center-text-in-viewport'>{pending}</p> :
                <div className='word-desc'>
                    <p><strong>Word :</strong> {item.Word}</p>
                    <p><strong>Desc :</strong> {item.Desc}</p>
                    <div className='button-div'>
                        <button onClick={handleDelete}>Delete this Word</button>
                    </div>
                </div>
            }
        </>
    );
}

export default WordDesc;