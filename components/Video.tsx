import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Play } from 'lucide-react';

interface VideoModalProps {
  src: string;
  poster?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ src, poster }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Miniaturka z przyciskiem play */}
      <div className="relative cursor-pointer max-h-full" onClick={() => setOpen(true)}>
        <video
          src={src}
          poster={poster}
          className="w-full h-full object-cover"
          muted
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="text-white w-12 h-12 opacity-80 hover:opacity-100" />
        </div>
      </div>

      {/* Portal modal */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setOpen(false)}
          >
            <video
              src={src}
              controls
              autoPlay
              className="max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()} // kliknięcie w video nie zamyka
            >
              Twoja przeglądarka nie obsługuje wideo.
            </video>
          </div>,
          document.body
        )}
    </>
  );
};

export default VideoModal;
