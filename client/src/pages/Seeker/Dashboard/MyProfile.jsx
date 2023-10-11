import { CustomButton, TextInput } from "../../../components"


function MyProfile() {

    const handleAdd = ()=>{

    }

    return (
        <div className="px-10 pb-0">
            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">My Profile!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
            </div>
            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <form action="#" className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="p-6 font-medium text-base mr-8">My Profile </div>
                        <div className="relative px-6 pt-3">
                            <div className="flex items-center mb-8 pb-8 border-b border-solid border-[#f1f3f7]">
                                <div className="relative flex items-center ">
                                    <input type="file" name="attachment" accept='image/*' id="upload" required className="opacity-0 absolute hidden overflow-hidden h-0 w-0 z-[-1]" />
                                    <label for='upload' className="flex items-center justify-center flex-col cursor-pointer h-[120px] w-[200px] border-dashed m-0 border-[2px] border-[#ced4e1] rounded-sm ">Browse Logo</label>
                                </div>
                                <div className="text-sm font-normal text-[#696969] ml-10" >Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are .jpg & .png</div>
                            </div>
                            <div  className="relative">
                                <div className="grid grid-cols-2 pb-4">
                                    <div className="px-4 mb-6">
                                        <TextInput name='firstname' type='text' label='First Name' placeholder='Phat'/>
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='surname' type='text' label='Sur Name' placeholder='Nguyen Van'/>
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='phone' type='text' label='Phone' placeholder='0367625416'/>   
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='email' type='email' label='Email' placeholder='vanphat@gmail.com'/>
                                    </div>
                                    <div className="px-4 mb-6">
                                        <label for="dob" className="block leading-8 text-gray-900 font-medium">Date of birth</label>
                                        <div className="relative mt-2 rounded-md shadow-sm ">
                                            <input type="date" name="dob" id="dob" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 pt-2 pl-5 pr-5 text-gray-900 ring-1 ring-inset focus:ring-4 focus:ring-[#8DB3FB] ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8"  />
                                        </div>
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='website' type='text' label='Website' placeholder='www.vanan.com'/>
                                    </div>
                                    <div className="col-span-2 px-4 mb-6">
                                        <label for="description" className="block leading-8 text-gray-900 font-medium ">Description</label>
                                        <div className="relative mt-2 rounded-md shadow-sm ">
                                            <textarea rows={8} type="text" name="description" id="description" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present" />
                                        </div>
                                    </div>
                                    <CustomButton title={'Save'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600"/>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="p-6 font-medium text-base mr-8">Social Network </div>
                        <div className="relative px-6 pt-3">
                            <form action="#" className="relative">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 mb-6">
                                        <TextInput name='facebook' type='text' label='Facebook' placeholder='www.facebook.com/Nguyenvana'/> 
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='twitter' type='text' label='Twitter' placeholder='www.twitter.com/@Nguyenvana'/> 
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='linkedin' type='text' label='Linkedin' placeholder='www.linkedin.com/Nguyenvana'/>
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='ggPlus' type='text' label='Google Plus' placeholder='www.google.com/Nguyenvana'/>   
                                    </div>
                                    <CustomButton title={'Save'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600"/>

                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="p-6 font-medium text-base mr-8">Contact Information </div>
                        <div className="relative px-6 pt-3">
                            <form action="#" className="relative">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 mb-6">
                                        <TextInput name='country' type='text' label='Country' placeholder='Australia'/>
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='city' type='text' label='City' placeholder='Ho Chi Minh'/>
                                    </div>
                                    <div className="px-4 mb-6 col-span-2">
                                        <TextInput name='cplAddress' type='text' label='Complete Address' placeholder='...'/>   
                                    </div>
                                    
                                    <CustomButton title={'Save'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600"/>

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