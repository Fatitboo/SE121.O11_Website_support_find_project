import {backgroundSearch} from '../../../assets/images';
import { BagIcon, KeyboardIcon } from '../../../assets/icons';
function Home() {
    return <>
        {/* Searching Jobs By Keyword*/}
        <></>
            <div>
                <div className="flex w-full h-full bg-no-repeat bg-cover pt-12 pl-44 pr-48 pb-20" style={{backgroundImage: `url(${backgroundSearch})`}}>
                    <div className='w-1/2'>
                        <h1 className='text-5xl font-bold leading-[60px]'>The  
                            <span className='relative text-[#3c65f5] ml-2'>Easiest Way<span className='absolute left-0 -bottom-[6px] opacity-10 bg-[#3c65f5] h-[25px] w-full'></span>
                            </span> to 
                            <br />Get Find Your New Project
                        </h1>

                        <p className='text-[18px] text-[#4f5e64] mt-5'>
                            Each month, more than 3 million job seekers turn to
                            website in their search for work, making over 140,000
                            applications every single day
                        </p>

                        <div className='inline-block bg-[#fff] shadow-[0_18px_40px_rgba(25,15,9,0.1)] rounded-lg w-full p-[10px]'>
                            <form className='flex w-full'>
                                <div className='w-full max-w-[180px]'>
                                    <select className='bg-no-repeat bg-[length:18px_18px] bg-left pl-5 pr-8 mr-2' style={{backgroundImage: `url(${BagIcon})`}}>
                                        <option value="0">Industry</option>
                                        <option value="1">Software</option>
                                        <option value="2">Finance</option>
                                    </select>
                                </div>
                                <select className='bg-no-repeat bg-[length:18px_18px] bg-left pl-5 pr-8 mr-2' style={{backgroundImage: `url(${BagIcon})`}}>
                                    <option value="0">VietNam</option>
                                    <option value="1">Campuchia</option>
                                    <option value="2">ThaiLan</option>
                                </select>                                    
                                <input type="text" placeholder="Your keyword... " className='bg-no-repeat bg-[length:18px_18px] bg-left py-[10px] pl-5 pr-8 mr-2' style={{backgroundImage: `url(${KeyboardIcon})`}}></input>

                                <button>Search</button>
                            </form> 
                        </div>
                    </div>
                    <div className='w-1/2'>
                        
                    </div>
                </div>
            </div>
        <></>

        {/* Searching Jobs By Category */}
        <></>

        <></>

        {/* Job of the day */}
        <></>
        
        <></>

        {/* Statistic Overview About App */}
        <></>

        <></>

        {/* Statistic Top recuite */}
        <></>
        
        <></>

        {/* Statistic Jobs by location */}
        <></>
        
        <></>

        {/* News and Blog */}
        <></>
        
        <></>

        {/* Send feedback */}
        <></>
        
        <></>

    </>;
}

export default Home;