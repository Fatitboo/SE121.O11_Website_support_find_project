import { useEffect, useState } from "react";
import FileCV from "./FileCv";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserCvAction, updateUserCvAction } from "../../../../redux/slices/users/usersSlices";
import {LoadingComponent} from "../../../../components";

function CVManager() {
    const dispatch = useDispatch()
    const [err, setErr] = useState(null)
    useEffect(() => {
        dispatch(getAllUserCvAction())
    }, [dispatch])
    const storeData = useSelector(store => store?.users);
    const { cvUser, loading, appErr, isSuccess } = storeData;
    
    useEffect(() => {
        if (isSuccess) {
            dispatch(getAllUserCvAction())
        }
    }, [isSuccess])
    const onFileChange = (event) => {
        const file = event.target.files[0];
        const maxSize = 5 * 1024 * 1024;
        setErr(null)
        if (file.size > maxSize) {
            setErr('File size exceeds the maximum allowed size (5 MB).')
            event.target.value = null;
            return;
        }
        const allowedFileTypes = ['.doc', '.docx', '.pdf'];
        const fileType = `.${file.name.split('.').pop()}`;
        if (!allowedFileTypes.includes(fileType)) {
            setErr('Invalid file type. Allowed file types are .doc, .docx, .pdf.')
            event.target.value = null;
            return;
        }
        
        
        console.log(file)
        dispatch(updateUserCvAction(file))
    }
    
    return (
        <div className="px-10 pb-0">
            {/* Start title of page  */}
            {loading && <LoadingComponent />}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">CV Manager!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
            </div>
            {/* Start main content  to display something*/}
            <div className="flex flex-wrap mx-3 mt-3">
                <form encType="multipart/form-data" className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative w-full">
                            {/* Start header of content */}
                            <div className="relative flex  items-center  bg-transparent px-8 py-6">
                                <h4 className="mr-1 font-semibold">Cv Manager</h4>
                            </div>
                            {/* start input cv file*/}
                            <div className="relative px-8 pt-5 pb-10">
                                <div className="relative flex items-center justify-center w-full flex-col">
                                    <input name="attachments[]" accept=".doc,.docx,.xml,application/msword,application/pdf, image/*" id="upload" multiple type="file"
                                        className="opacity-0 absolute overflow-hidden pointer-events-none h-0 w-0 z-[-1] hidden" onChange={onFileChange} />
                                    <label htmlFor="upload" className="flex flex-col ease-linear hover:border-black justify-center items-center cursor-pointer text-center h-[300px] w-full rounded m-0 text-[#1b2032] leading-4 border-[2px] border-[#ced4e1] border-dashed px-8 py-5">
                                        <span className="block font-medium text-base leading-5 text-[#1967d2] mb-4">Drop files here to upload</span>
                                        <span className="text-sm font-light leading-5 mb-8 text-gray-500">To upload file size is (Max 5Mb) and allowed file types are (.doc, .docx, .pdf)</span>
                                        <div className="text-white py-4 px-6 focus:outline-none ease bg-blue-700 hover:bg-blue-800 rounded-md text-sm font-light border border-blue-600" >Upload Resume</div>
                                    </label>
                                </div>
                                {err && <p className="pt-4 text-red-700 text-sm">* {err}</p>}
                                {appErr && <p className="pt-4 text-red-700 text-sm">* {appErr}</p>}

                            </div>

                            {/* Start list CV */}
                            <div className="relative w-full px-12  grid grid-cols-5">
                                {
                                    cvUser.map((item, index) => <FileCV key={index} item={item} />)
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CVManager;