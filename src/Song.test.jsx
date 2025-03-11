import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Song from './Song';
import Playlist from './Playlist';

/*
Started with chatGPT but significantly modified, chatGPT_starter.txt in root dir shows what chatGPT gave me to start
*/

afterEach(() => {
    cleanup();
  });

describe('Song Component', () => {
    const mockSong1 = {
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      year: 1983,
      item: 1,
    }
    
    const mockSong2 = {
        title: 'Wellerman',
        artist: 'Nathan Evans',
        year: 2021,
        item: 2,  
      }
;

  test('double-clicking Billie Jean updates statusBar', () => {
    render(<Song {...mockSong1}/>);
    const songElement = screen.getByText('Song: Billie Jean');
    render(<Playlist />)
    fireEvent.doubleClick(songElement);
    expect(document.getElementById("statusBar").innerHTML).toBe("Playing: Billie Jean");
    screen.getElement
  });
  test('double-clicking Wellerman updates statusBar', () => {
    render(<Song {...mockSong2}/>);
    const songElement = screen.getByText('Song: Wellerman');
    render(<Playlist />)
    fireEvent.doubleClick(songElement);
    expect(document.getElementById("statusBar").innerHTML).toBe("Playing: Wellerman");
    screen.getElement
  });
});
