import ComboBox from "../../../components/ComboBox";
import { AiOutlineSearch } from 'react-icons/ai'
import OrganizerItem from "./OrganizerItem";
const listOriginazers = [
    {
        key: 'originazer1',
        logoOriginazer: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCW82MIe3_DxiUjQUFlKNJrZuDng8sQ1Y_aQ&usqp=CAU',
        originazerName: 'Google company',
        address: 'London, Uk',
        email: 'google@gmail.com',
        foudingDate: '12/05/2003',
        phoneNum: '0378462715'
    },
    {
        key: 'originazer2',
        logoOriginazer: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEXz8/PzUyWBvAYFpvD/ugjz9PX19PXz+fr39fr69vPy9fp5uAAAofD/tgDz3Nji6tfzRADzTBfzmYew0oB/xfH70IDX5/P16tfz5eLo7eHzPADzlICs0Hfh6/N3wvH7znj07eEAnvDzvbPL3q6u1/L43q6vy/leAAABd0lEQVR4nO3cR1IDQRREwcb0SEgj770B7n9FNmhEBL1g8zUs8l2gIi9QKUmSpHs5vPtWFV4uANMwunUD3IyiS7+Jebgdx7bddb63uvt+dKOqIBw/xTaZNsLZc3CEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEjxVuJ7GNfwj7LQjTejcN7noTVu+z4PabgjB1wmumqm50JaAkSX/oLbxmKveiK/zqp8NxHtvx40bMn6dFbKdzgbi81MEdb8LeaRDdqiSsX2Kr541wMXiNjZCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkPCxwuj/0kvb/6V5Gd2hmTqvokulm90HluNrFyhJ0j/rC6N0RI28dGy3AAAAAElFTkSuQmCC',
        originazerName: 'Microsoft company',
        address: 'NewYork, Uk',
        email: 'microsoft@gmail.com',
        foudingDate: '12/05/2003',
        phoneNum: '0370962715'
    },
    {
        key: 'originazer3',
        logoOriginazer: 'data:image/png;base64,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',
        originazerName: 'Udemy company',
        address: 'NewYork, Uk',
        email: 'udemy@gmail.com',
        foudingDate: '12/05/2003',
        phoneNum: '0370962715'
    }
]
const listItemCbb = [
    {
      id: 1,
      name: 'Pending',
      
    },
    {
      id: 2,
      name: 'Processing',
    },
    {
      id: 3,
      name: 'Finish',
      
    },
    {
      id: 4,
      name: 'Cancelled',
      
    },
    
  ]

function UserMng() {
    const onFilterValueSelected = (filterValue)=>{
        console.log(filterValue)
    }
    return (
        <div className="px-16  pb-0">

            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Originazer Mangement!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center " >Ready to jump back in?</div>

            </div>
            {/* Start main content  to display something*/}
            <div className="flex flex-wrap mx-3 mt-3 ">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative w-full">

                            {/* Start header of content */}
                            <div className="relative flex justify-between items-center flex-wrap bg-transparent px-8 py-5">
                                <div className="flex">
                                    <div className="relative mr-4">
                                        <form action="#" method="post"  >
                                            <div className="relative mb-0">
                                                <AiOutlineSearch fontSize={22} color="#a7a9ad" className="absolute l-3 t-0 h-10 justify-center ml-2 text-center z-10 " />
                                                <input type='search' name="search-field" id="search-field" placeholder="Search" className="relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-9 pr-5 text-sm bg-[#f0f5f7] rounded-md" />
                                            </div>
                                        </form>
                                    </div>
                                    <ComboBox listItem={listItemCbb} filterValueSelected={onFilterValueSelected}/>
                                </div>
                                <div className="flex ">
                                    <h4 className="mr-1">Registed Originazer: </h4> <span>  10</span>
                                </div>
                            </div>

                            {/* Start table */}
                            <div className="px-6 relative">
                                <div className="overflow-y-hidden overflow-x-auto">
                                    <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0">
                                        <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                                            <tr className="w-full">
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left w-1/3 pl-5 pr-0">Originazer Name</th>
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base px-0 text-left w-2/12">Email</th>
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left w-212">Founding Date</th>
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left w-2/12">PhoneNum</th>
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {listOriginazers.map((item) => (
                                                <OrganizerItem item={item} key={item.key}/>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserMng;