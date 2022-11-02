import { useListContext } from '../hooks/context/useListContext';
import { sortAlpha } from './SortList';

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

import pdfIcon from '../icons/pdf.png';
import jsonIcon from '../icons/json.png';
import excelIcon from '../icons/excel.png';

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
        <div onClick={handleDownloadPDF}>
            <img className='more-icons' src={pdfIcon} alt="pdf" />
            <span>PDF</span>
        </div>
        <div onClick={handleDownloadJSON}>
            <img className='more-icons img-invert' src={jsonIcon} alt="json" />
            <span>JSON</span>
        </div>
        <div onClick={handleDownloadEXCEL}>
            <img className='more-icons' src={excelIcon} alt="excel" />
            <span>EXCEL</span>
        </div>
    </>
}
export default DownloadOptList;