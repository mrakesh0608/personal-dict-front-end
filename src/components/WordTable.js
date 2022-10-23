import React from 'react';
import '../css/table.css';

const WordTable = ({ list}) => {

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
                    <tr key={key}>
                        <td>{item.Word}</td>
                        <td>{item.Desc}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
export default WordTable;