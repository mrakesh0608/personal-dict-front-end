import DownloadOptList from './DownloadOptList';

import '../css/DownloadDictList.css';
import MoreOptions from './MoreOptions';

const DownloadDictList = () => {
    const { MoreOptionsComp, MoreOptionsShow, setMoreOptionsShow } = MoreOptions({
        Comp: DownloadOptList
    });
    return <>
        <span onClick={setMoreOptionsShow}>Download List As</span>
        {MoreOptionsShow && <MoreOptionsComp />}
    </>
}

export default DownloadDictList;