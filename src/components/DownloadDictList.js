import { useListContext } from '../hooks/context/useListContext';
import { sortAlpha } from '../components/SortList';

const DownloadDictList = () => {
    
    const { list} = useListContext();

    function download(data, fileName, contentType) {
        data = sortAlpha([...data]);
        const jsonData = {};
        data.forEach(item=>{
            jsonData[item.Word] = item.Desc;
        })
        console.log(data,jsonData);
        
        const file = new Blob([JSON.stringify(jsonData,null, 4)], { type: contentType });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    function handleDownload(){
        download(list, 'Dict-List.json', 'application/json');
    }

    return <span onClick={handleDownload}>Download List</span>;
}
 
export default DownloadDictList;