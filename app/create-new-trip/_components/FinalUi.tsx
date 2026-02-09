import React from 'react'
import { Globe2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

function FinalUi({ viewTrip }: any) {
  return (
    <div className='flex flex-col items-center justify-center mt-4 p-6 bg-white rounded-xl border shadow-sm'>
        {/* Animated Icon */}
        <Globe2 className='text-primary h-12 w-12 animate-bounce' />
        
        <h2 className='mt-4 text-lg font-semibold text-primary text-center'>
             ✈️ Planning your dream trip...
        </h2>
        
        <p className='text-gray-500 text-sm text-center mt-2 px-2'>
            Gathering best destinations, activities, and travel details for you.
        </p>

        <Button className='mt-6 w-full' onClick={viewTrip}>
            View Trip
        </Button>
    </div>
  )
}

export default FinalUi