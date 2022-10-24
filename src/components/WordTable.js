import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/table.css';

const WordTable = ({ list}) => {
    const navigate = useNavigate();

    return (
        <table>
            <thead>
                <tr>
                    <th>Word / Phrase</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item, key) =>
                    <tr key={key} id={item._id} onClick={()=>navigate(`/WordDesc/${item._id}`)}>
                        <td>{item.Word}</td>
                        <td>{item.Desc}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
export default WordTable;