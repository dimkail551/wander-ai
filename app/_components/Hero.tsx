"use client";
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React, { use } from 'react'
import { Divide, Globe2, Landmark, Plane, Send } from 'lucide-react'
import { title } from 'process';
import { useUser, SignInButton } from '@clerk/nextjs';
import { on } from 'events'
import { useRouter } from "next/navigation";

export const suggestions = [
    {
        title:"Create New Trip", 
        icon:<Globe2 className='text-blue-400 h-5 w-5'/>
    },
    {
        title:"Romantic Destinations", 
        icon:<Plane className='text-green-500 h-5 w-5'/>
    },
    {
        title:"Adventure Trips", 
        icon:<Landmark className='text-orange-500 h-5 w-5'/>
    },
    {
        title:"Discover Hidden Gems", 
        icon:<Globe2 className='text-yellow-600 h-5 w-5'/>
    }
];

function Hero() {

    const {user} = useUser();
    const router = useRouter();
    const onSend = () => {
        if(!user){
            router.push('/sign-in');
            return;
        }
        //navigate to newtrip
        router.push('/create-new-trip');
    }

  return (
    <div className='mt-24 flex flex-col items-center justify-center gap-8 px-4'>
        {/* mesage section */}
        <div className='max-w-3xl w-full text-center space-y-6'>
            <h1 className='text-xl md:text-5xl font-bold '>Hey, I'm Your Personal <span className='text-primary'>AI Trip Planner</span></h1>
            <p className='text-lg'>Tell me where you want to go and I'll plan your perfect trip</p>
        </div>
        {/* text box */}
        <div className='w-full max-w-2xl'>
            <div className='border rounded-2xl p-4 relative'>
                <Textarea placeholder='Create a trip from Paris to New York'
                className='w-full h-28 bg-transparent border-none focus-vissible:ring-0 shadow-none resize-none'
                />
                <Button size={'icon'} className='absolute bottom-6 right-6' onClick={()=>onSend()}>    
                    <Send className='h-4 w-4'/>
                </Button>
            </div>
        </div>
        {/* suggestion list */}
        <div className='flex gap-5'>
            {suggestions.map((suggestion, index) => (
                <div key={index} className='flex items-center gap-2 border rounded-full p-2 cursor-pointer  hover:text-primary'>
                    {suggestion.icon}
                    <h2>{suggestion.title}</h2> 
                </div>
            ))}
        </div> 
        {/* video */}
    </div>
        
  )
}

export default Hero