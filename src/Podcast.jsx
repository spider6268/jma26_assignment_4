import React from 'react';



// Creating a Podcast component that uses destructured props
// season, episode, episode title inside function


function Podcast ({episodeTitle, episode, season, item}){
  let episodeString = 'Episode: ' + episode
  if (!episode){
    episodeString = 'Episode:'
  }
  let seasonString = 'Season: '  + season
  if (!season && !episode) {
    seasonString = 'Season: ' 
 }
  else if (!season && episode > 100) {
    seasonString = 'Season: ' + Math.trunc(episode/100)
  }
  else if  (!season && episode <= 100) {
    seasonString = 'Season: ' + 1
  }
  else {
    seasonString = 'Season:  ' + season
  }
  

  
  //inline styling for podcast
    const podStyle = {
        color:'white',
        backgroundColor: 'blue',  
        padding: '10px',
        margin: '10px',
      };

      const cb2 = () => {
        document.getElementById("statusBar").innerHTML = "Playing: " + episodeTitle;
        console.log('you double clicked from podcast.jsx ' + episodeTitle);
        console.log('Item value from podcast ' + item)
        
      }

    return (
        <div 
            className="podcast"
            style={podStyle} onDoubleClick={cb2}>
            <h3>Episode Title: {episodeTitle}</h3>
            <p>{episodeString}</p>
            <p>{seasonString}</p>

        </div>
    )

}
export default Podcast;
