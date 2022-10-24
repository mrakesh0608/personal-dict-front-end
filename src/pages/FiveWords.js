import React, { useState, useEffect } from 'react';
import { useListContext } from '../hooks/context/useListContext';
import '../css/table.css';
import WordTable from '../components/WordTable';
import refreshIcon from '../icons/refresh.png';
import { sortAlpha } from '../components/SortList';

import '../css/FiveWords.css';

const FiveWords = () => {

    const { list, error } = useListContext();

    const [FW, setFW] = useState(list);

    const handleShuffle = () => {
        const shuffled = list.sort(() => 0.5 - Math.random());
        // console.log(shuffled);
        setFW([...sortAlpha(shuffled.slice(0, 5))]);
    }

    useEffect(() => {
        handleShuffle();
    }, [list]);

    return (
        <div id='five-words'>
            <header>
                <h2>Five Words</h2>
                <button className='button-default'><img src={refreshIcon} alt='refresh' onClick={handleShuffle} /></button>
            </header>
            {error ?
                <p className='error'>{error}</p> :
                (list.length === 0 ?
                    <p className='center-text-in-viewport'>Dictionary is Empty</p> :
                    <WordTable list={FW} />
                )}
        </div>
    );
}
export default FiveWords;