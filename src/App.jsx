import React from 'react'
import './App.css'
import { useState } from 'react'
import URL from './gemini.js'

function App() {
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("")
 


  const payload = {
    contents: [
      {
        parts: [
          {
            text: "You are the chracter devara from the film devara telugu movie answer this question as him try to speak in telugu style english " + question,  
          }
        ]
      }
    ]
  };


  const askquestion = async () => {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    const finaldata = data.candidates[0].content.parts[0].text
    finaldata.replace(/<[^>]+>/g, '');

    setanswer(finaldata);


   
    
  }

  
  
 

  return (
    <div className='h-screen flex'>
        <div className=' w-100 bg-[#282A2C] '></div>
        <div className='  w-full overflow-hidden relative '>
          <div className=' h-120 p-10 text-white'>
          <div className="text-2xl font-bold bg-gradient-to-r from-[#439DDF]  to-[#D6645D] bg-clip-text text-transparent">
  Hello, This is DEVARA AI
</div>

            
          <div className='p-3'>{answer}
            
           
            
            
            </div>  </div>
          <div className='text-center p-15  '>
          <input type="text" placeholder='Devara adiginadu ante....' className=' p-8 w-200 rounded-3xl bg-[#282A2C] outline-none ' value={question} onChange={(e)=>(setquestion(e.target.value))}/>
          <button className='rounded-3xl bg-[#282A2C] p-8 -mx-10 font-semibold hover:text-sky-600 ' onClick={askquestion}>Hail!</button>
          </div>

        </div>

      </div>
    
  )
}

export default App
