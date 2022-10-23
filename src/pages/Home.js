import React, { useState, useEffect } from 'react';
import { useListContext } from '../hooks/context/useListContext';

import WordTable from '../components/WordTable';
import { SortAlphaComp, SortDateComp } from '../helpers/sortList';

const Home = () => {

    const { list: List, pending, error } = useListContext();

    const [list, setList] = useState(List);
    const [Pending,setPending] = useState(pending);

    useEffect(() => {
        setList([...List.reverse()]);
    }, [List])
    useEffect(()=>{
        setPending(pending);
    },[pending,error])

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
                (Pending ?
                    <p className='center-text-in-viewport'>{pending}</p> :
                    (list.length === 0 ?
                        <p className='center-text-in-viewport'>Dictionary is Empty</p> :
                        <WordTable list={list} />
                    )
                )}
        </div>
    );
}
export default Home;