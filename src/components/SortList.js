import React from 'react';
import sortAlphaIcon from '../icons/sortAlpha.png';
import sortDateIcon from '../icons/sortDate.png';
import sortDateRIcon from '../icons/sortDateR.png';

import { useListContext } from '../hooks/context/useListContext';

const sortAlpha = (List) => {
    return List.sort((a, b) => {
        return (a.Word).localeCompare(
            b.Word,
            'en',
            { sensitivity: 'base' }
        );
    })
}

const SortAlphaComp = ({ setList }) => {
    const { list } = useListContext();

    const handleSort = () => {
        setList([...sortAlpha([...list])]);
    }
    return <button className='button-default'><img src={sortAlphaIcon} alt='sort' onClick={handleSort} /></button>
}
let toggle = false;
const SortDateComp = ({ setList }) => {

    const { list } = useListContext();

    const handleSort = () => {
        setList([...list.reverse()]);
        toggle = !toggle;
    }
    return <button className='button-default'>
        <img src={toggle ? sortDateRIcon : sortDateIcon} alt='sort' onClick={handleSort} />
    </button>
}
export { sortAlpha, SortAlphaComp, SortDateComp };