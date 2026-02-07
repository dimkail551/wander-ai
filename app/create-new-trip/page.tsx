import React from 'react'
import ChatBox from './_components/ChatBox'
import Header from '../_components/Header'

function CreateNewTrip() {
  return (
    <div>
      <Header />
      {/*οθόνη στη μέση */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-10'>
          
          {/* Αριστερή Στήλη: ChatBox */}
          <div className='md:col-span-1'> 
             
                <ChatBox />
             
          </div>

          {/* Δεξιά Στήλη: Map*/}
          <div className='md:col-span-1'>
             map and trip plan to display 
          </div>
          
      </div>
    </div>
  )
}

export default CreateNewTrip