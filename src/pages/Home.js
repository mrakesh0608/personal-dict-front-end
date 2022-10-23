import React, { useState, useEffect } from 'react';
import { useListContext } from '../hooks/context/useListContext';

import WordTable from '../components/WordTable';
import { sortAlpha, SortAlphaComp, SortDateComp } from '../helpers/sortList';

const Home = () => {

    const { list: List, error } = useListContext();

    const [list, setList] = useState(List);

    useEffect(() => {
        setList([...sortAlpha([...List])]);
    }, [List])

    return (
        <div id='home'>
            <header>
                <h2>All Words</h2>
                <div>
                    <SortAlphaComp setList={setList} />
                    <SortDateComp setList={setList} />
                </div>
            </header>
            {error ?
                <p className='error'>{error}</p> :
                (list.length === 0 ?
                    <p className='center-text-in-viewport'>Dictionary is Empty</p> :
                    <WordTable list={list} />
                )}
        </div>
    );
}
export default Home;