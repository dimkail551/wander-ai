
import { suggestions } from '@/app/_components/Hero'
import React from 'react'

function EmptyBoxState({onSelectOption}:any) {
  return (
    <div className='flex flex-col items-center justify-center mt-10 gap-3 w-full'>
        <h2 className='font-bold text-2xl lg:text-3xl text-center leading-tight'>
            Start Planning a new <strong className='text-primary'>Trip</strong> using AI
        </h2>
        
        {/* Αυτή είναι η παράγραφος που έλειπε */}
        <p className='text-gray-500 text-center text-sm lg:text-base px-4'>
            Discover personalized travel itineraries, find the best destinations, and plan your dream vacation effortlessly with the power of AI.
        </p>
        <div className='flex  gap-5'>
                    {suggestions.map((suggestions, index) => (
                        <div key={index}
                        onClick={()=>onSelectOption(suggestions.title)} 
                        className='flex items-center gap-2 border rounded-full p-2 cursor-pointer  hover:text-primary'>
                            {suggestions.icon}
                            <h2>{suggestions.title}</h2> 
                        </div>
                    ))}
        </div> 
    </div>
  )
}

export default EmptyBoxState