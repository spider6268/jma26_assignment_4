import React, { useState, useEffect } from 'react'
import Song from './Song'
import Podcast from './Podcast'
import data from './audio.json'
//import './App.css'


let curItem = 0

function Playlist(){

  

 function cb(){
   console.log('you double clicked component from playlist.jsx ' )
   console.log('curItem value from playlist ' + curItem)
   setIsRunning(true);
    //something return key value of playlist component
    //=curItem = key value;
  }

//lazy and lets me keep combinedList var without having to change code
let combinedList = [...data]

      //shuffling the list and updating the state
      const [shuffledList, setShuffledList] = useState([])
     //useEffect to ensure shuffling when browser is reloaded
      useEffect(() => {
       setShuffledList(combinedList)
      }, []);


      
function shuffle(array) {
    const shuffledArray = [...array]; 
   for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
    }
    return shuffledArray;
  }

const [isRunning, setIsRunning] = useState(false);
 

const PlayPauseAction = () =>  {
  console.log('is running before click? ' + isRunning)
  if (isRunning) {
    document.getElementById("statusBar").innerHTML = "Paused:"
    //console.log(curItem);
    setIsRunning(false);
  } else {
    //console.log(curItem);
    setIsRunning(true);
    if(!shuffledList[curItem].title){
      document.getElementById("statusBar").innerHTML = "Playing: " + shuffledList[curItem].episodeTitle;
    }
    else{
      document.getElementById("statusBar").innerHTML = "Playing: " + shuffledList[curItem].title;
    }
  };
  console.log('Play/Pause clicked!');
  console.log(curItem);
  console.log('is running? after click ' + isRunning); 
}

const nextHandleClick = () =>  {
  
  if (!isRunning) {
    setIsRunning(true);
    console.log('playing');
  }
  console.log('Next clicked!');
if(curItem < shuffledList.length-1){
curItem = curItem+1;
}
else{
  curItem = 0;
}
console.log('is running? after click ' + isRunning);

if(!shuffledList[curItem].title){
  document.getElementById("statusBar").innerHTML = "Playing: " + shuffledList[curItem].episodeTitle;
}
else{
  document.getElementById("statusBar").innerHTML = "Playing: " + shuffledList[curItem].title;
}
console.log('current item in array is #' + curItem);

}

const prevHandleClick = () =>  {
  if (!isRunning) {
    setIsRunning(true);
    console.log('Playing: ');
  }

console.log('Previous clicked!');
if(curItem > 0){
curItem = curItem-1;
}
else{
  curItem = shuffledList.length-1;
}
console.log('current item in array is #' + curItem);
if(!shuffledList[curItem].title){
  document.getElementById("statusBar").innerHTML = "Playing: " + shuffledList[curItem].episodeTitle;
}
else{
  document.getElementById("statusBar").innerHTML = "Playing: " + shuffledList[curItem].title;
}
console.log('is running? after click ' + isRunning);
}

const shuffleHandleClick = () =>  {
console.log('Shuffle clicked!');
setShuffledList(shuffle(combinedList));

}



      const statusStyle = {
        color:'black',
        backgroundColor: 'white',  
        padding: '10px',
        margin: '10px',
      };

      const buttonStyle = {
        color:'black',
        backgroundColor: 'white',  
        padding: '10px',
        margin: '5px',
      };
    
      return (
        <div>
          <h1>Welcome to JMA26's Playlist</h1>
          <div>

          </div>
          <div>
          <p id="statusBar"
          style={statusStyle}></p>
          </div>
          <div>
            <button onClick={PlayPauseAction} style={buttonStyle}>Play/Pause</button>
            <button onClick={prevHandleClick} style={buttonStyle}>Prev</button>
            <button onClick={nextHandleClick} style={buttonStyle}>Next</button>
            <button onClick={shuffleHandleClick} style={buttonStyle} id='shuffleButton'>Shuffle</button>
            
          </div>
          <div className="playlist" onDoubleClick={cb}>
            {shuffledList.map((item, index) => {
          if (item.title) {
            //  return a song if true
            return <Song key={index} item={index}  {...item} />
          } else {
            // else retun a  podcast
            return <Podcast key={index} item={index}  {...item} />
          }
        })}
      </div>
      
    </div>
    
  );
}

export default Playlist