import React from 'react';

export default function FollowersModal () {

 
  
  return (
    <div className={` flex justify-center items-center h-screen w-screen bg-black-faded fixed top-0 left-0 z-50 transition duration-300 opacity-1 pointer-events-auto`} onClick={()=> {}}>
    
      <div className={`flex flex-col justify-center items-center rounded-xl bg-white transition duration-300 w-fit scale-1 pointer-events-auto`} onClick={e=>e.stopPropagation()}>

        <div className='w-full px-10  py-6'>
          <p className='text-lg font-medium mb-1'>Отменить публикацию?</p>
          <p className='text-base text-gray-base font-light mb-2'>Если вы выйдете,изменения не будут сохранены.</p>
        </div>

         <button className='w-full text-red-primary text-sm font-bold py-3 border border-gray-primary' >Удалить</button>
         <button className='w-full text-sm py-3' >Отмена</button>
         
      </div>
    </div>
  )
}
