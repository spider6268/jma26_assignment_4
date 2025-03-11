import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Podcast from './Podcast';
import Playlist from './Playlist';

/*
Modified from Song.test.jsx once i got it working, all testing of Season logic is handled in Playlist.test.jsx
*/

afterEach(() => {
    cleanup();
  });

describe('Podcast Component', () => {
    const mockPod1 = {
      episodeTitle: 'Switched at Birth',
      episode: 360
    }
    
    const mockPod2 = {
      episodeTitle: 'John D. Smith is a Subpar Musician',
      episode: 2,
      season: 1
      }
;

  test('double-clicking Switched at Birth updates statusBar', () => {
    render(<Podcast {...mockPod1}/>);
    const podElement1 = screen.getByText('Episode Title: Switched at Birth');
    render(<Playlist />)
    fireEvent.doubleClick(podElement1);
    expect(document.getElementById("statusBar").innerHTML).toBe("Playing: Switched at Birth");
    screen.getElement
  });
  
  test('double-clicking John D. Smith is a Subpar Musician updates statusBar', () => {
    render(<Podcast {...mockPod2}/>);
    const podElement2 = screen.getByText('Episode Title: John D. Smith is a Subpar Musician');
    render(<Playlist />)
    fireEvent.doubleClick(podElement2);
    expect(document.getElementById("statusBar").innerHTML).toBe("Playing: John D. Smith is a Subpar Musician");
    screen.getElement
  });
});
