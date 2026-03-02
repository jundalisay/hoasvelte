<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';
  
  export let autoplay = false; // Add export for prop
  export let audioSrc = '/kiirtan.mp3';
  
  let audio = null;
  let isPlaying = false;
  let isLoading = false;
  let error = null;
  let volume = 0.5;
  let showVolume = false;
  let autoplayAttempted = false;
  let userInteracted = false;
  
  // Check if browser supports autoplay
  let autoplaySupported = true;
  
  onMount(() => {
    if (browser) {
      // Check localStorage for saved preferences
      const savedVolume = localStorage.getItem('music-player-volume');
      if (savedVolume) volume = parseFloat(savedVolume);
      
      // Initialize audio
      initializeAudio();
      
      // Set up event listeners for user interaction
      setupUserInteractionListeners();
      
      // Clean up on component destroy
      return () => {
        if (audio) {
          audio.pause();
          audio.src = '';
          audio = null;
        }
        removeUserInteractionListeners();
      };
    }
  });
  
  // Handle navigation (for SPA)
  afterNavigate(() => {
    // Try to autoplay again after navigation if it was previously playing
    if (autoplay && !isPlaying && !error && userInteracted) {
      attemptAutoplay();
    }
  });
  
  function setupUserInteractionListeners() {
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });
  }
  
  function removeUserInteractionListeners() {
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.removeEventListener(event, handleUserInteraction);
    });
  }
  
  function handleUserInteraction() {
    userInteracted = true;
    removeUserInteractionListeners();
    
    // If autoplay was requested but failed, try again now that user interacted
    if (autoplay && !isPlaying && !error) {
      attemptAutoplay();
    }
  }
  
  function initializeAudio() {
    try {
      audio = new Audio(audioSrc);
      audio.loop = true;
      audio.volume = volume;
      
      // Add event listeners
      audio.addEventListener('loadeddata', () => {
        isLoading = false;
        error = null;
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        isLoading = false;
        error = 'Failed to load audio';
        isPlaying = false;
      });
      
      audio.addEventListener('canplaythrough', () => {
        isLoading = false;
        // Attempt autoplay if requested and not already attempted
        if (autoplay && !autoplayAttempted && !isPlaying) {
          attemptAutoplay();
        }
      });
      
      // Preload metadata
      audio.load();
      
    } catch (err) {
      console.error('Failed to initialize audio:', err);
      error = 'Audio initialization failed';
    }
  }
  
  async function attemptAutoplay() {
    if (!audio) return;
    
    autoplayAttempted = true;
    
    try {
      isLoading = true;
      
      // Modern browsers require user interaction before playing
      // We'll try to play, and if it fails, we'll show a message
      await audio.play();
      
      isPlaying = true;
      console.log('Autoplay successful');
      
    } catch (err) {
      console.log('Autoplay prevented by browser:', err);
      autoplaySupported = false;
      
      // Show a more user-friendly message
      error = 'Click play to start music';
      isPlaying = false;
      
    } finally {
      isLoading = false;
    }
  }
  
  // Method to check if we can autoplay (for debugging)
  async function checkAutoplaySupport() {
    if (!audio) return;
    
    try {
      // Test autoplay with a silent play
      audio.volume = 0;
      await audio.play();
      audio.pause();
      audio.volume = volume;
      autoplaySupported = true;
    } catch {
      autoplaySupported = false;
    }
  }
  
  async function togglePlay() {
    if (!audio) {
      initializeAudio();
      // Wait a bit for audio to initialize
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }
  
  async function play() {
    if (!audio) return;
    
    try {
      isLoading = true;
      await audio.play();
      isPlaying = true;
      error = null; // Clear any error messages
      localStorage.setItem('music-player-playing', 'true');
    } catch (err) {
      console.error('Failed to play:', err);
      error = 'Click to play';
      isPlaying = false;
    } finally {
      isLoading = false;
    }
  }
  
  function pause() {
    if (!audio) return;
    
    audio.pause();
    isPlaying = false;
    localStorage.setItem('music-player-playing', 'false');
  }
  
  function handleVolumeChange(e) {
    volume = parseFloat(e.target.value);
    if (audio) {
      audio.volume = volume;
    }
    localStorage.setItem('music-player-volume', volume);
  }
</script>

<div class="music-player" class:autoplay-blocked={!autoplaySupported && autoplay}>
  <button
    class="music-button {isPlaying ? 'playing' : ''} {isLoading ? 'loading' : ''}"
    on:click={togglePlay}
    aria-label={isPlaying ? 'Pause music' : 'Play music'}
    title={isPlaying ? 'Pause meditation music' : 'Play meditation music'}
  >
    {#if isLoading}
      <span class="spinner">⏳</span>
    {:else if isPlaying}
      <span class="pause-icon">⏸️</span>
    {:else}
      <span class="play-icon">▶️</span>
    {/if}
    
    <span class="button-text">
      {#if error}
        <span class="error" title={error}>
          {#if error.includes('Click')}
            👆 {error}
          {:else}
            ⚠️
          {/if}
        </span>
      {:else}
        {isPlaying ? 'Stop Music' : 'Start Music'}
      {/if}
    </span>
  </button>
  
  {#if !autoplaySupported && autoplay && !isPlaying && !userInteracted}
    <div class="autoplay-message">
      <span class="info-icon">ℹ️</span>
      <span>Click anywhere to enable autoplay</span>
    </div>
  {/if}
  
  {#if isPlaying}
    <div class="volume-control" class:visible={showVolume}>
      <button
        class="volume-toggle"
        on:click={() => showVolume = !showVolume}
        aria-label="Adjust volume"
      >
        {#if volume === 0}
          🔇
        {:else if volume < 0.3}
          🔈
        {:else if volume < 0.7}
          🔉
        {:else}
          🔊
        {/if}
      </button>
      
      {#if showVolume}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          on:input={handleVolumeChange}
          class="volume-slider"
          aria-label="Volume"
        />
      {/if}
    </div>
  {/if}
</div>

<style>
  .music-player {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
  }
  
  .music-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 2rem;
    background: linear-gradient(135deg, #b28cf2 0%, #8b5cf6 100%);
    color: white;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .music-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(139, 92, 246, 0.3);
  }
  
  .music-button:active {
    transform: translateY(0);
  }
  
  .music-button.playing {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }
  
  .music-button.loading {
    opacity: 0.7;
    cursor: wait;
  }
  
  .play-icon, .pause-icon, .spinner {
    font-size: 1.2rem;
    line-height: 1;
  }
  
  .spinner {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .button-text {
    margin-left: 0.25rem;
  }
  
  .error {
    display: inline-block;
    animation: pulse 1.5s ease infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .autoplay-message {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background: #fef3c7;
    color: #92400e;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  [data-theme="dark"] .autoplay-message {
    background: #4b5563;
    color: #fbbf24;
  }
  
  .info-icon {
    font-size: 1rem;
  }
  
  .volume-control {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .volume-toggle {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    transition: background-color 0.2s;
  }
  
  .volume-toggle:hover {
    background-color: rgba(139, 92, 246, 0.1);
  }
  
  .volume-slider {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    width: 80px;
    height: 4px;
    margin-left: 0.5rem;
    background: linear-gradient(90deg, #8b5cf6 0%, #b28cf2 100%);
    border-radius: 2px;
    appearance: none;
    cursor: pointer;
  }
  
  .volume-slider::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: white;
    border: 2px solid #8b5cf6;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.1s;
  }
  
  .volume-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }
  
  .volume-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: white;
    border: 2px solid #8b5cf6;
    border-radius: 50%;
    cursor: pointer;
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .music-button {
      background: linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%);
    }
    
    .volume-toggle:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .button-text {
      display: none;
    }
    
    .music-button {
      padding: 0.5rem;
    }
    
    .autoplay-message {
      white-space: normal;
      max-width: 200px;
      right: -50px;
    }
    
    .volume-slider {
      position: fixed;
      bottom: 70px;
      right: 20px;
      left: auto;
      top: auto;
      transform: none;
      width: 120px;
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
    }
    
    [data-theme="dark"] .volume-slider {
      background: #2d2d2d;
    }
  }
</style>