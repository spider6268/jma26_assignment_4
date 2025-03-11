import React from 'react';

// Creating a Song component that uses destructured props
// title, artist, and year inside function
function Song ({title, artist, year, item}){
    //inline styling for songs
    const songStyle = {
        color:'white',
        backgroundColor: 'red',  
        padding: '10px',
        margin: '10px',
      };
     
      const cb1 = () => {
        document.getElementById("statusBar").innerHTML = "Playing: " + title;
        console.log('you double clicked from song.jsx ' + title);
        console.log('Item value from song ' + item)
      }
    return (
        <div 
            className="song"
            style={songStyle} 
            onDoubleClick={cb1}            
            >
            <h3>Song: {title}</h3>
            <p>Artist: {artist}</p>
            <p>Year: {year}</p>
        </div>
    )

}
export default Song;