import logo1 from './assets/lg1.png'
import vidEO from './assets/vid.mp4'
import './App.css'
import { Rnd } from 'react-rnd';
import { useCallback, useEffect, useState } from 'react';
import { IoCloseCircle } from "react-icons/io5";

function App() {

  const [texts, setTexts] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [textConfig, setTextConfig] = useState({
    text: '', color: '#000000', fontSize: '16px', width: '100px', height: '50px',x:0,y:0
  });

  // useEffect(()=>{},[texts])

// Function to Add Text Box
  const addTextBox = () => {
    setTexts([
      ...texts,
      {
        id: Date.now(),
        text: 'Text Sample',
        color: '#000000',
        fontSize: '16px',
        x:0,
        y:0,
        width: '100px',
        height: '50px',
      },
    ]);
  };

// Function To Delete Text Box
  const deleteTextBox = (id) => {
    setTexts(texts.filter(text => text.id !== id)); 
  };

// Function which enables the edit of a text box
  const handleTextClick = (id) => {
    
    setSelectedTextId(id);
    const selectedText = texts.find(text => text.id === id);
    setTextConfig({
      text: selectedText.text,
      color: selectedText.color,
      fontSize: selectedText.fontSize,
      width:selectedText.width,
      height:selectedText.height,
      x:selectedText.x,
      y:selectedText.y
    });
  };

// Function to UpdateText Configs of the selected Text Box
  const updateTextConfig = (id, config) => {
    setTexts(texts.map(text => text.id === id ? { ...text, ...config } : text));
  };


 
  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setTextConfig({ ...textConfig, [name]: value });
    updateTextConfig(selectedTextId, { [name]: value });
  };



  return (
    <div className='flex relative flex-col bg-gray-300 min-h-screen w-full' >
      {/* Navbar */}
      <div className='bg-white shadow-xl p-6 flex h-[100px] justify-between items-center sticky overflow-hidden'>
        <div className='flex gap-2 cursor-pointer items-center'>
          <img src={logo1} alt="" className=' w-[70px]  ' />
          <p className='text-black font-bold text-xl'>Personaliz.ai</p>
        </div>
        <div className='cursor-pointer bg-black 
          text-white rounded-lg duration-150 hover:scale-105 text-xl shadow-lg flex justify-center items-center px-10 py-2 font-bold '>Try it For Free</div>
      </div>



      {/* My 2 Sections */}
      <div className='flex gap-5 mt-5'>
        {/* Video Section */}
        <div className='flex-[0.74] p-5'>
          <div className="video-section">
            <video controls>
              <source src={vidEO} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        {
          texts.map(text => (
            <Rnd key={text.id}
            
            onDragStop={(e, data) => {
              console.log('Drag stopped '," Height: " ,data.node.clientHeight," Width : ",data.node.clientWidth,"data",data)
              updateTextConfig(text.id,{width:data.node.clientWidth,height:data.node.clientHeight,x:data.x,y:data.y})
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              console.log('Resize stopped', delta);
              updateTextConfig(text.id,{x:position.x,y:position.y,width:delta.width+text.width,height:delta.height+text.height});
            }}
            onClick={() => handleTextClick(text.id)}
            >
              <div
                style={{ color: text.color, fontSize: text.fontSize,
                height:text.height,width:text.width 
                }}
                className="text-box text-wrap w-full h-full border-[1px] border-[#ccc] bg-gray-300 bg-opacity-55 group p-[5px]"
              // onClick={() => handleTextClick(text.id)}
              >
                {text.text}
                <span className="delete-icon bg-transparent text-xl cursor-pointer rounded-full absolute top-[0px] right-[0px] bg-red-600 text-white hidden group-hover:block"
                onClick={() => deleteTextBox(text.id)}
                ><IoCloseCircle /></span>
              </div>
            </Rnd>
          ))
        }







        {/* Add Text Section */}
        <div className='bg-white flex flex-col p-5 flex-[0.20] rounded-lg shadow-lg text-black h-fit'>
          <div onClick={addTextBox} className='text-white bg-black p-2 rounded-md tracking-widest cursor-pointer text-center'>ADD TEXT</div>
          
          
          {selectedTextId && (
            <div className="config-panel flex flex-col gap-5 mt-5">
              <div className='flex gap-2  items-center'>
                <label>Text: </label>
                <input
                  type="text"
                  name="text"
                  value={textConfig.text}
                  onChange={handleConfigChange}
                  className=' p-1 bg-gray-300'
                />
              </div>
              <div className='flex items-center gap-2'>
                <label>Color: </label>
                <input
                  type="color"
                  name="color"
                  value={textConfig.color}
                  onChange={handleConfigChange}

                />
              </div>
              <div className='flex items-center gap-2'>
                <label>Font Size: </label>
                <input
                  type="number"
                  name="fontSize"
                  value={parseInt(textConfig.fontSize, 10)}
                  onChange={e => {
                    handleConfigChange({ target: { name: 'fontSize', value: `${e.target.value}px`} }) 
                  }}
                  className='bg-gray-300 p-1'
                />
              </div>

              <div className='flex items-center gap-2'>
                <label>Width: </label>
                <input
                  type="number"
                  name="width"
                  value={parseInt(textConfig.width, 10)}
                  onChange={e => handleConfigChange({ target: { name: 'width', value: `${e.target.value}px` } })}
                  className='bg-gray-300 p-1'
                />
                
              </div>

              <div className='flex items-center gap-2'>
                <label>Height: </label>
                <input
                  type="number"
                  name="height"
                  value={parseInt(textConfig.height, 10)}
                  onChange={e => handleConfigChange({ target: { name: 'height', value: `${e.target.value}px` } })}
                  className='bg-gray-300 p-1'
                />
              </div>

              <div className='flex items-center gap-2'>
                <label>X: </label>
                <input
                  type="number"
                  name="x"
                  disabled
                  value={textConfig.x}
                  // onChange={e => handleConfigChange({ target: { name: 'x', value: parseInt(`${e.target.value}`) } })}
                  className='bg-gray-300 p-1'
                />
              </div>

              <div className='flex items-center gap-2'>
                <label>Y: </label>
                <input
                  type="number"
                  name="y"
                  disabled
                  value={textConfig.y}
                  // onChange={e => handleConfigChange({ target: { name: 'y', value: parseInt(`${e.target.value}`) } })}
                  className='bg-gray-300 p-1'
                />
              </div>
            </div>
          )}

        
        
        </div>

      </div>
    </div>
  )
}

export default App
