import './App.css';
import gptLogo from './assets/chatgpt_logo.svg.png';
import addBtn from './assets/add1.svg.png';
import msgIcon from './assets/msg1.svg.png';
import homeICon from './assets/home1.svg.png';
import savedICon from './assets/bookmark1.svg.png';
import upgradeIcon from './assets/upgrade1.svg.png';
import sendBtn from './assets/send1.svg.png';
import userIcon from './assets/user1.svg.png';
import gptIcon from './assets/chatgpt1.svg.png';
import {sendMsgToOpenAI} from './openai';
import {useEffect, useRef, useState} from 'react';


function App() {

  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
      {
        text:"Hi, I'm ChatGPT",
        isBot: true,
      }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  },[messages]);


  const handleSend = async() => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      { text, isBot: false }
  ]);

    const resp =  await sendMsgToOpenAI(text);
    setMessages([
        ...messages,
        { text, isBot: false },
        { text: resp, isBot: true }
    ])
  }

  const handleEnter = async(e) => {
    if(e.key === 'Enter') await handleSend();
  }

  const handleQuery = async(e) => {
    const text = e.target.value;
    setMessages([
      ...messages,
      { text, isBot: false }
  ]);

  const resp =  await sendMsgToOpenAI(text);
  setMessages([
      ...messages,
      { text,  isBot: false },
      { text: resp, isBot: true }
  ])
}


  return (
    <div className="App">

      <div className='sideBar'>
        <div className='upperSide'>
          
          <div className="upperSideTop">
              <img src={gptLogo} alt="Logo" className="logo" /> 
              <span className="brand">ChatGPT</span>
              <button className="midBtn" 
                  onClick={() => {window.location.reload()}}> 
                  <img src={addBtn} alt="new chat" className="addBtn" />New Chat
              </button>
         
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"What is Programming?"}>
                <img src={msgIcon} alt="Query" />What is Programming?
            </button>
            <button className="query" onClick={handleQuery} value={"How to intialize a variable?"}>  
                <img src={msgIcon} alt="Query" />How to intialize a variable?
            </button>
          </div>

          </div>

        <div className='lowerSide'>
            <div className="listItems"><img src={homeICon} alt="Home" className="listItemsImg"/>Home</div>
            <div className="listItems"><img src={savedICon} alt="Saved" className="listItemsImg"/>Saved</div>
            <div className="listItems"><img src={upgradeIcon} alt="Upgrade" className="listItemsImg"/>Upgrade to Pro</div>
        </div>
        </div>

      </div>

    <div className="main">
      <div className="chats">
 
        {messages.map((message, i) => 
          <div key={i} className={message.isBot?"chat bot":"chat"}>
            <img className="chatImg" src={message.isBot?gptIcon:userIcon} alt="ChatGPT" />
            <p className="txt">{message.text}</p>
          </div>
        )}

        <div ref={msgEnd}/>

      </div>

      <div className="chatFooter">
        <div className="inp">
          <input type="text" 
            placeholder="Send a message"
            value={input} 
            onKeyDown={handleEnter}
            onChange={(e) => {setInput(e.target.value)}}/> 
          <button className="send" onClick={handleSend}>
            <img src={sendBtn} alt="Send" />
          </button>
        </div>
        <p>ChatGPT provides approximate, rather than precise information.</p>
      </div>
    </div>
    </div>
  );
}

export default App;
