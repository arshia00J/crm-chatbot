import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export default function MobileMenu() {




    return(

        <div className="lg:hidden flex flex-row p-4 bg-white w-full h-[64px] justify-between border-b-1 border-[#E2E8F0] items-center">
            <h1 className='text-[#1E293B] text-xl font-semibold'>CRM Chatbot</h1>
            <div>
                <MenuRoundedIcon className='text-[#1E293B]'/>
            </div>
            
        </div>


    );

}