import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import "./VideoModal.css";
import { motion, AnimatePresence } from "framer-motion";

interface VideoModalProps {
    isOpen: boolean;
    close: () => void;
    videoUrl: string;
}

function VideoModal({ isOpen, close, videoUrl }: VideoModalProps) {
    const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

    let videoId = "";
    if (isYouTube) {
        const urlObj = new URL(videoUrl);
        if (videoUrl.includes("youtube.com")) {
            videoId = urlObj.searchParams.get("v") || "";
        } else {
            videoId = urlObj.pathname.slice(1);
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ position: 'fixed', zIndex: 999 }}
                >
                    {isYouTube ? (
                        <ModalVideo
                            channel="youtube"
                            videoId={videoId}
                            isOpen={isOpen}
                            onClose={close}
                        />
                    ) : (
                        <ModalVideo
                            channel="custom"
                            url={videoUrl}
                            isOpen={isOpen}
                            onClose={close}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default VideoModal;
