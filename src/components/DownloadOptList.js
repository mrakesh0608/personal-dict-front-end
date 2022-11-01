import { useListContext } from '../hooks/context/useListContext';
import { sortAlpha } from './SortList';

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

const DownloadOptList = () => {

    const { list } = useListContext();
    const data = sortAlpha([...list]);

    function handleDownloadJSON() {
        const jsonData = {};
        data.forEach(item => jsonData[item.Word] = item.Desc)
        // console.log(data, jsonData);

        const file = new Blob([JSON.stringify(jsonData, null, 4)], { type: 'application/json' });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = 'Dict-List.json'; //fileName;
        a.click();
    }

    function handleDownloadPDF() {

        const arrData = [];
        data.forEach(item => arrData.push([item.Word, item.Desc]))

        const doc = new jsPDF();

        autoTable(doc, {
            head: [['Word / Phrase', 'Description']],
            body: arrData
        })
        doc.save('Dict-List.pdf');
    }

    function handleDownloadEXCEL() {
        const dataType = 'application/vnd.ms-excel';
        const tableHTML = document.getElementById('WordTable').outerHTML.replace(/ /g, '%20');

        // Create download link element & a link to the file
        const downloadLink = document.createElement('a');
        downloadLink.href = `data:${dataType},${tableHTML}`;
        downloadLink.download = 'Dict-List.xls';
        downloadLink.click();
    }

    return <>
        <span onClick={handleDownloadEXCEL}>EXCEL</span>
        <span onClick={handleDownloadJSON}>JSON</span>
        <span onClick={handleDownloadPDF}>PDF</span>
    </>
}
export default DownloadOptList;