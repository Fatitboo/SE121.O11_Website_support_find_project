

function MyProfile() {


    return (
        <div className="px-10 pb-0">
            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">My Profile!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
            </div>
            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="p-6 font-medium text-base mr-8">My Profile: </div>
                        <div className="relative px-6 pt-3">
                            <div className="flex items-center mb-8 pb-8 border-b border-solid border-[#f1f3f7]">
                                <div className="relative flex items-center ">
                                    <input type="file" name="attachment" accept='image/*' id="upload" required className="opacity-0 absolute hidden overflow-hidden h-0 w-0 z-[-1]" />
                                    <label for='upload' className="flex items-center justify-center flex-col cursor-pointer h-[120px] w-[200px] border-dashed m-0 border-[2px] border-[#ced4e1] rounded-sm ">Browse Logo</label>

                                </div>
                                <div className="text-sm font-normal text-[#696969] ml-10" >Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are .jpg & .png</div>
                            </div>
                            <form action="#" className="relative">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 mb-6">
                                        <label for="fullname" className="block leading-8 text-gray-900 font-medium">Full Name</label>
                                        <div className="relative mt-2 rounded-md shadow-sm ">
                                            <input type="text" name="fullname" id="fullname" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Ex: Nguyen Van Phat" />
                                        </div>
                                    </div>
                                    <div className="px-4 mb-6">
                                        <label for="jobTitle" className="block leading-8 text-gray-900 font-medium">Job Title</label>
                                        <div className="relative mt-2 rounded-md shadow-sm ">
                                            <input type="text" name="jobTitle" id="jobTitle" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Ex: Nguyen Van Phat" />
                                        </div>
                                    </div>
                                    <div className="px-4 mb-6">
                                        <label for="phone" className="block leading-8 text-gray-900 font-medium">Phone</label>
                                        <div className="relative mt-2 rounded-md shadow-sm ">
                                            <input type="text" name="phone" id="phone" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Ex: Nguyen Van Phat" />
                                        </div>
                                    </div>
                                    <div className="px-4 mb-6">
                                        <label for="email" className="block leading-8 text-gray-900 font-medium">Email</label>
                                        <div className="relative mt-2 rounded-md shadow-sm ">
                                            <input type="text" name="email" id="email" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Ex: Nguyen Van Phat" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MyProfile