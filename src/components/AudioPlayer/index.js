import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './index.module.css'; // We'll create this next
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'; // Using react-icons for nice icons

// Helper function to format time (MM:SS)
const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === Infinity) {
        return '00:00';
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const AudioPlayer = ({ audioSrc, title = "Audio Version" }) => {
    // State
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);

    // Refs
    const audioRef = useRef(null);
    const progressBarRef = useRef(null); // Ref for the progress bar input
    const animationRef = useRef(null); // Ref for requestAnimationFrame

    // Effect to load metadata and set up listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
            setIsMetadataLoaded(true);
        }

        const setAudioTime = () => setCurrentTime(audio.currentTime);
        const handleAudioEnd = () => {
            setIsPlaying(false);
            setCurrentTime(audio.duration); // Or set to 0 to reset
            cancelAnimationFrame(animationRef.current);
        };

        // Reset state if src changes
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setIsMetadataLoaded(false);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);

        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime); // More frequent updates if needed, but can be heavy
        audio.addEventListener('ended', handleAudioEnd);

        // Cleanup listeners on component unmount or src change
        return () => {
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
            audio.removeEventListener('ended', handleAudioEnd);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [audioSrc]); // Rerun effect if audioSrc changes

    // Update progress bar smoothly using requestAnimationFrame
    const whilePlaying = useCallback(() => {
        if (audioRef.current && progressBarRef.current) {
            const audio = audioRef.current;
            const progressBar = progressBarRef.current;
            const newTime = audio.currentTime;
            setCurrentTime(newTime);
            // Update slider value directly for smoothness
            progressBar.value = newTime;
            // Update background gradient for the track fill effect
            progressBar.style.setProperty('--seek-before-width', `${(newTime / duration) * 100}%`);

            animationRef.current = requestAnimationFrame(whilePlaying);
        }
    }, [duration]); // Dependency on duration ensures it's calculated correctly

    // Effect to start/stop animation frame loop
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioRef.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
        // Cleanup on isPlaying change or unmount
        return () => cancelAnimationFrame(animationRef.current);
    }, [isPlaying, whilePlaying]);

    // Handlers
    const togglePlayPause = () => {
        if (!isMetadataLoaded) return; // Don't allow play before metadata loaded
        setIsPlaying(prev => !prev);
    };

    const handleProgressChange = (event) => {
        if (!isMetadataLoaded) return;
        const newTime = Number(event.target.value);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime); // Update state immediately for responsiveness
        // Update style immediately too
        progressBarRef.current.style.setProperty('--seek-before-width', `${(newTime / duration) * 100}%`);
    };

    const handleVolumeChange = (event) => {
        const newVolume = Number(event.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (isMuted) {
            // Unmute: Restore previous volume or set to a default if previous was 0
            const volumeToRestore = volume > 0 ? volume : 0.5;
            setVolume(volumeToRestore);
            audio.volume = volumeToRestore;
            setIsMuted(false);
        } else {
            // Mute: Store current volume before setting to 0 (optional, could just set state)
            // setVolume(audio.volume); // No need if we track volume state separately
            audio.volume = 0;
            setIsMuted(true);
            // Set volume slider to 0 visually
            setVolume(0);
        }
    };

    const handlePlaybackRateChange = (event) => {
        const newRate = Number(event.target.value);
        setPlaybackRate(newRate);
        audioRef.current.playbackRate = newRate;
    };

    return (
        <div className={styles.audioPlayer}>
            <audio ref={audioRef} src={audioSrc} preload="metadata"></audio>

            {/* Play/Pause Button */}
            <button
                onClick={togglePlayPause}
                className={`${styles.controlButton} ${styles.playPauseButton}`}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                disabled={!isMetadataLoaded}
            >
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            {/* Current Time */}
            <span className={styles.timeDisplay}>{formatTime(currentTime)}</span>

            {/* Progress Bar */}
            <input
                ref={progressBarRef}
                type="range"
                className={styles.progressBar}
                value={currentTime}
                max={duration || 0} // Ensure max is never NaN
                onChange={handleProgressChange}
                aria-label="Seek progress"
                disabled={!isMetadataLoaded}
                style={{ '--seek-before-width': `${(currentTime / duration) * 100}%` }} // Initial style
            />

            {/* Duration */}
            <span className={styles.timeDisplay}>{formatTime(duration)}</span>

            {/* Volume Control */}
            <div className={styles.volumeControl}>
                <button
                    onClick={toggleMute}
                    className={styles.controlButton}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume} // Reflect mute state visually
                    onChange={handleVolumeChange}
                    className={styles.volumeSlider}
                    aria-label="Volume"
                    style={{ '--volume-before-width': `${isMuted ? 0 : volume * 100}%` }} // Style for volume track fill
                />
            </div>

            {/* Playback Speed Control */}
            <div className={styles.speedControl}>
                <select
                    value={playbackRate}
                    onChange={handlePlaybackRateChange}
                    className={styles.speedSelect}
                    aria-label="Playback speed"
                >
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                </select>
            </div>

            {/* Optional: Display Title */}
            {/* <span className={styles.audioTitle}>{title}</span> */}
        </div>
    );
};

export default AudioPlayer;