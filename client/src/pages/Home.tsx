import { useState } from 'react';
import Hero from '../components/Hero/Hero';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer';
import CursorEffects from '../components/CursorEffects/CursorEffects';
import BirthdayCake from '../components/BirthdayCake/BirthdayCake';
import LoveJourney from '../components/LoveJourney/LoveJourney';
import LoveCards from '../components/LoveCards/LoveCards';
import Letter from '../components/Letter/Letter';
import DrawingGallery from '../components/DrawingGallery/DrawingGallery';
import LoveMeter from '../components/LoveMeter/LoveMeter';
import { SecretHeart } from '../components/SecretSurprise/SecretSurprise';
import FinalScene from '../components/FinalScene/FinalScene';
import { useContent } from '../hooks/useContent';
import { useDrawings } from '../hooks/useDrawings';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';

export default function Home() {
  const { content } = useContent();
  const { drawings, loading: drawingsLoading } = useDrawings();
  const music = useBackgroundMusic('/assets/birthday-song.mp3');
  const [opened, setOpened] = useState(false);

  function handleOpen() {
    setOpened(true);
    music.start();
  }

  // loveJourney's last line gets the secret heart appended, matching the
  // original spec ("...my little world" + hidden heart).
  const journeyLines = content.loveJourney;

  return (
    <div className="relative">
      <CursorEffects />
      <Hero content={content.hero} opened={opened} onOpen={handleOpen} />
      <MusicPlayer
        visible={opened}
        isPlaying={music.isPlaying}
        onToggle={music.toggle}
        onVolumeChange={music.setVolume}
      />

      {opened && (
        <main>
          <BirthdayCake content={content.birthday} />

          <div className="relative">
            <LoveJourney lines={journeyLines} />
            <span className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center">
              <span className="pointer-events-auto">
                <SecretHeart content={content.secret} />
              </span>
            </span>
          </div>

          <LoveCards cards={content.loveCards} />

          <Letter content={content.letter} onOpen={music.duck} onClose={music.unduck} />

          <DrawingGallery content={content.gallery} drawings={drawings} loading={drawingsLoading} />

          <LoveMeter content={content.loveMeter} />

          <FinalScene lines={content.finale} />

          <footer className="bg-night-deep py-10 text-center font-script text-xl text-[#F1E9F5]/60">
            made with ♡, just for you
          </footer>
        </main>
      )}
    </div>
  );
}
