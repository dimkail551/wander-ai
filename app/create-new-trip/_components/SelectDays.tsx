import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

function SelectDays({ onSelectedOption }: any) {
  const [days, setDays] = useState(3); //3 μέρες ως default

  return (
    <div className='p-5 border rounded-xl bg-white mt-2 w-full shadow-md'>
        <h2 className='font-bold text-lg mb-4 text-center'>How many days do you want to travel?</h2>
        
        {/* Counter Section */}
        <div className='flex items-center justify-center gap-6 mt-3'>
             <Button 
                variant='outline' 
                size='icon' 
                className='h-12 w-12 rounded-full text-xl'
                onClick={() => days > 1 && setDays(days - 1)} // Να μην πάει κάτω από 1
                disabled={days <= 1}
             >
                -
             </Button>
             
             <h2 className='font-bold text-2xl min-w-[80px] text-center'>{days} Days</h2>
             
             <Button 
                variant='outline' 
                size='icon' 
                className='h-12 w-12 rounded-full text-xl'
                onClick={() => setDays(days + 1)}
             >
                +
             </Button>
        </div>

        {/* Confirm Button */}
        <Button 
            className='w-full mt-6 bg-primary font-bold text-white' 
            onClick={() => onSelectedOption(days + ' Days')}
        >
            Confirm
        </Button>
    </div>
  )
}

export default SelectDays