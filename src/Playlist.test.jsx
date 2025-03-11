import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Playlist from './Playlist';
import '@testing-library/jest-dom'; 

/*
***********************************************************************************************************
The base of this code is from chatGPT, but it did not fully work and has been significantly modified by me. 
So I have some clue of what I am doing, I just needed a good base to get started.
chatGPT_starter.txt in root dir shows what chatGPT gave me to start
***********************************************************************************************************
*/


// Mocking the audio.json data
jest.mock('./audio.json', () => [
  { title: "Billie Jean", artist: "Michael Jackson", year: 1983 },
  { title: "Smells Like Teen Spirit", artist: "Nirvana", year: 1991 },
  { episodeTitle: "Switched at Birth",  episode: 360 },
  { title: "Not Like Us", artist: "Kendrick Lamar", year: "2024" },
  { episodeTitle: "The Joe Rogan Experience- #1368: Edward Snowden",  episode: 1368 },
  { episodeTitle: "The Moth Presents John Turturro"},
  { episodeTitle: "Vocational Wheel",  episode: 7 },
  
]);


beforeEach(() => {
    render(<Playlist />);
});


afterEach(() => {
  cleanup();
});

describe('Playlist components load test', () => {
  test('renders playlist and buttons', () => {
    //render(<Playlist />);

    // Check if the title is rendered
    expect(screen.getByText(/Welcome to JMA26's Playlist/i)).toBeInTheDocument();

    // Check if buttons are present
    expect(screen.getByText('Play/Pause')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Shuffle')).toBeInTheDocument();
  });
})
describe('Playlist Functions Test', () => {

  test('double click a playlist item for function cb()', () => {
    const playElement = screen.getByText('Song: Billie Jean')
    fireEvent.doubleClick(playElement);
    //nothing to validate, i never got this part to work
  })


  test('clicking play/pause button updates the status bar', () => {
    // Click the play/pause button
    const playPauseButton = screen.getByText('Play/Pause');
    fireEvent.click(playPauseButton);

    // Check if "Playing" status is shown
    expect(document.getElementById("statusBar").innerHTML).toBe("Playing: Billie Jean");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("Paused:");

    // Click again to pause
    fireEvent.click(playPauseButton);
    expect(document.getElementById("statusBar").innerHTML).toBe("Paused:");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("Playing:");

    // Check if "Playing" status is shown after clicking play when paused
    fireEvent.click(playPauseButton);
    expect(document.getElementById("statusBar").innerHTML).toBe("Playing: Billie Jean");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("Paused:");
  });

  test('clicking play/pause button updates the isPlaying', () => {
    const playPauseButton = screen.getByText('Play/Pause');
    fireEvent.click(playPauseButton);
  })

  test('clicking next button moves to next item in playlist', () => {
    //render(<Playlist />);

    // Get the next button
    const nextButton = screen.getByText('Next');

    // Check that no song is playing or paused
    expect(document.getElementById("statusBar").innerHTML).toBe("");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("Playing: Billie Jean");

    // Click next so the next song should be shown
    fireEvent.click(nextButton);
    expect(document.getElementById("statusBar").innerHTML).toBe("Playing: Smells Like Teen Spirit");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("Playing: Billie Jean");


    // After clicking next again, the next podcast should be shown
    fireEvent.click(nextButton);
    expect(document.getElementById("statusBar").innerHTML).toBe("Playing: Switched at Birth");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("Playing: Smells Like Teen Spirit");
    
    //Keep clicking next to get to end of jest array and back at Billie Jean proving end of array logic
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(document.getElementById("statusBar").innerHTML).toBe("Playing: Billie Jean");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("Playing: Smells Like Teen Spirit");
  });

  test('clicking previous button moves to previous item in playlist', async  () => {
    //render(<Playlist />);

    // Get the previous button
    const prevButton = screen.getByText('Prev');

    // Click previous button to run test
    fireEvent.click(prevButton);
  
    // After clicking previous, it should return the last item in the list, proving end of array logic
    expect(document.getElementById("statusBar").innerHTML).toBe("Playing: Vocational Wheel");

    // Then click previous again
    fireEvent.click(prevButton);

    // After clicking previous, it should return the 2nd to last item in the list
    expect(document.getElementById("statusBar").innerHTML).toBe("Playing: The Moth Presents John Turturro");
    
    // click play/pause to pause a podcast
    const playPauseButton = screen.getByText('Play/Pause');
    fireEvent.click(playPauseButton);
    expect(document.getElementById("statusBar").innerHTML).toBe("Paused:");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("Playing: The Moth Presents John Turturro");

    // click play/pause to resueme playing a podcast
    fireEvent.click(playPauseButton);
    expect(document.getElementById("statusBar").innerHTML).toBe("Playing: The Moth Presents John Turturro");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("Paused:");

    //click previous button 2x times to test previous button on a song
    fireEvent.click(prevButton);
    fireEvent.click(prevButton);
    expect(document.getElementById("statusBar").innerHTML).toBe("Playing: Not Like Us");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("Paused:");
    expect(document.getElementById("statusBar").innerHTML).not.toBe("Playing: The Moth Presents John Turturro");
    expect(screen.getByText('Year: 2024')).toBeInTheDocument(); //check if song year value as string fails to display
  });

  test('shuffle button shuffles the playlist', () => {
    //render(<Playlist />);

    // Click shuffle button
    const shufButton = screen.getByText('Shuffle');
    fireEvent.click(shufButton);
 
    // Check that the order has changed 
    const songTitles = screen.getAllByText(/Song/).map(item => item.textContent);
    expect({1:songTitles[0], 2:songTitles[1], 3:songTitles[2]}).not.toBe({1:'Song: Billie Jean', 2:'Song: Smells Like Teen Spirit', 3:'Episode Title: Switched at Birth'})
    //need multiple conditions checked due to risk of one item not changing position in shuffle
  });

  //test to make sure Podcast Items with no season info are converted correctly
  test('Playlist shows correct season info for Podcasts', () => {
    expect(screen.getByText('Season: 1')).toBeInTheDocument(); //Vocational Wheel season test when episode is less than 101
    expect(screen.getByText('Season: 3')).toBeInTheDocument(); //Switched at Birth season test when episode is greater than 100
    expect(screen.getByText('Season: 13')).toBeInTheDocument(); //The Joe Rogan Experience- #1368: Edward Snowden season test for seasons greater than 9
    expect(screen.getByText('Episode: 360')).toBeInTheDocument(); //Switched at Birth test to ensure episode value is unchanged
  })
})
