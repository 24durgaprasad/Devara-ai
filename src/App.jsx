import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import URL from './gemini.js';

function App() {
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");
  const [history, sethistory] = useState([]);
  const chatRef = useRef(null);

  const askquestion = async () => {
    if (!question.trim()) return;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: question,
            }
          ]
        }
      ]
    };

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    let finaldata = data.candidates[0].content.parts[0].text;

    finaldata = finaldata
      .replace(/<[^>]+>/g, '')
      .replace(/\*/g, '')
      .replace(/^\s*[-•]\s?/gm, '')
      .replace(/\n/g, '<br />');

    setanswer(finaldata);
    sethistory(prev => [...prev, { q: question, a: finaldata }]);
    setquestion("");
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className='h-screen flex bg-[#1e1e1e]'>
      <div className='w-100 bg-[#282A2C]'></div>
      <div className='w-full overflow-hidden relative'>
        <div className='h-110 p-10 text-white'>
          <div className="text-2xl font-bold bg-gradient-to-r from-[#439DDF] to-[#D6645D] bg-clip-text text-transparent mb-4">
            Hello, This is DEVARA AI
          </div>

          <div
            ref={chatRef}
            className='p-3 overflow-y-auto h-[60vh] scrollbar-thin scrollbar-thumb-[#439DDF] scrollbar-track-[#282A2C]'
          >
            {history.map((item, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-end mb-1">
                  <div className="bg-[#3B3B3D] text-white p-3 rounded-2xl max-w-[80%]">
                    {item.q}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div
                    className=" bg-black p-3 rounded-2xl max-w-[80%]"
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='text-center p-30 m-6'>
          <input
            type="text"
            placeholder='Ask me anything...'
            className='p-4 h-18 w-120 rounded-3xl bg-[#282A2C] outline-none text-white'
            value={question}
            onChange={(e) => setquestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && askquestion()}
          />
          <button
            className='rounded-3xl bg-[#282A2C] p-6 -ml-10 font-semibold text-white '
            onClick={askquestion}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
