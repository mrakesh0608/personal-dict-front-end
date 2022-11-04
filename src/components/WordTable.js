import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/table.css';

const WordTable = ({ list }) => {
    const navigate = useNavigate();
    // const ReadMore = ({ _id,Desc }) => {
    //     return <>
    //         <pre>{Desc.substring(0, 50)}<span id={`dots${_id}`}>...</span><span id={`more${_id}`} style={{display:'none'}}>{Desc.slice(50)}</span></pre>
    //         <button onClick={()=>rmFun(_id)} id={`myBtn${_id}`}>Read more</button>
    //     </>
    // }
    // function rmFun(id) {
    //     var dots = document.getElementById("dots"+id);
    //     var moreText = document.getElementById("more"+id);
    //     var btnText = document.getElementById("myBtn"+id);

    //     if (dots.style.display === "none") {
    //         dots.style.display = "inline";
    //         btnText.innerHTML = "Read more";
    //         moreText.style.display = "none";
    //     } else {
    //         dots.style.display = "none";
    //         btnText.innerHTML = "Read less";
    //         moreText.style.display = "inline";
    //     }
    // }
    return (
        <table id='WordTable'>
            <thead>
                <tr>
                    <th>Word / Phrase</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item, key) =>
                    <tr key={key} id={item._id} onClick={() => navigate(`/WordDesc/${item._id}`)}>
                        <td>{item.Word}</td>
                        <td><pre>{item.Desc}</pre></td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
export default WordTable;