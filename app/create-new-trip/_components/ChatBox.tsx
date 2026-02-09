"use client";
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader, Send } from 'lucide-react'
import React, { useState } from 'react'
import EmptyBoxState from './EmptyBoxState';
import GroupSizeUi from './GroupSizeUi';
import BudgetUi from './BudgetUi'; // Βεβαιώσου ότι έχεις φτιάξει αυτό το αρχείο ή αφαίρεσέ το αν δεν υπάρχει ακόμα
import SelectDays from './SelectDays';
import FinalUi from './FinalUi';

type Message = {
    role: string,
    content: string,
    ui?: string,
}

function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const onSend = async (manualMsg?: string) => {
        
        //Αν πατήθηκε κουμπί (manualMsg), πάρε αυτό. Αλλιώς πάρε το input.
        const msgContent = manualMsg || userInput;

        if (!msgContent?.trim()) return;

        setLoading(true);
        setUserInput(''); // Καθαρίζω το πεδίο

        const newMsg: Message = {
            role: 'user',
            content: msgContent
        }

        //Ενημέρωση UI άμεσα
        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);

        //Κλήση στο API
        const result = await axios.post('/api/aimodel', {
            messages: updatedMessages
        });

        //Εμφάνιση απάντησης AI
        setMessages(prev => [...prev, {
            role: 'assistant',
            content: result?.data?.resp,
            ui: result?.data?.ui
        }]);

        setLoading(false);
    }

    const RenderGenerativeUi = (ui: string) => {
        //Μετατροπή σε μικρά και καθαρισμός κενών
        const safeUi = ui?.toLowerCase().trim();

        if (!safeUi) return null;

        // Έλεγχος Trip Duration
        // Ελέγχουμε αν περιέχει τη λέξη 'duration' ή 'days'
        if (safeUi.includes('duration') || safeUi.includes('days')) {
            return (
                <SelectDays 
                    onSelectedOption={(v: string) => {
                        setUserInput(v);
                        onSend(v);
                    }} 
                />
            );
        }

        // Έλεγχος για Group Size
        if (safeUi.includes('group') || safeUi.includes('couple') || safeUi.includes('family')) {
            return (
                <GroupSizeUi 
                    onSelectedOption={(v: string) => {
                        setUserInput(v); 
                        onSend(v);
                    }} 
                />
            );
        }

        // Έλεγχος για Budget
        if (safeUi.includes('budget') || safeUi.includes('cost')) {
            return (
                <BudgetUi 
                    onSelectedOption={(v: string) => {
                        setUserInput(v); 
                        onSend(v); 
                    }} 
                />
            );
        }

        // Έλεγχος για Final
        if (safeUi.includes('final') || safeUi.includes('view')) {
            return (
                <FinalUi viewTrip={() => console.log("View Trip Clicked!")} />
            );
        }

        return null;
    }

  return (
    <div className='h-[85vh] flex flex-col'> 
        
        {messages.length === 0 &&
            <EmptyBoxState />
        }

        {/* message area */}
        <section className='flex-1 overflow-y-auto p-4'>
            {messages.map((msg: Message, index) => (
                msg.role === 'user' ?
                // Μήνυμα Χρήστη
                <div className='flex justify-end mt-2' key={index}>
                    <div className='max-w-[80%] bg-primary text-white px-4 py-2 rounded-lg'>
                        {msg.content}
                    </div>
                </div> :
                // Μήνυμα AI
                <div className='flex justify-start mt-2' key={index} >
                    <div className='max-w-[80%] bg-gray-100 text-black px-4 py-2 rounded-lg'>
                        {/* Κείμενο AI */}
                        <div dangerouslySetInnerHTML={{__html: msg.content}}></div>
                        
                        {/* UI Components  */}
                        {msg.ui && <div className='mt-2'>
                            {RenderGenerativeUi(msg.ui)}
                        </div>}
                    </div>
                </div>
            ))}

            {/* Loading Spinner */}
            {loading && <div className='flex justify-start mt-2'>
                    <div className='bg-gray-100 text-black px-4 py-2 rounded-lg'>
                        <Loader className='animate-spin h-5 w-5'/>
                    </div>
                </div>}
            
        </section>

        {/* Input Area */}
        <section className='p-4'>
            <div className='w-full'>
                <div className='border rounded-2xl p-4 relative bg-white shadow-sm'>
                    <Textarea 
                        placeholder='Start typing here...'
                        className='w-full h-24 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-lg'
                        onChange={(event) => setUserInput(event.target.value)}
                        value={userInput}
                        // Για να στέλνεται και με Enter:
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                onSend();
                            }
                        }}
                    />
                    <Button size={'icon'} className='absolute bottom-4 right-4' onClick={() => onSend()}>    
                        <Send className='h-4 w-4'/>
                    </Button>
                </div>
            </div>
        </section>

    </div>
  )
}

export default ChatBox