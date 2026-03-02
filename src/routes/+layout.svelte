<script>
	import '$lib/scss/global.scss';

  export let src;
  export let title = 'Untitled';
  
  let audio;
  let currentTime = 0;
  let duration = 0;
  let isPlaying = false;
  let volume = 1;

  $: progress = (currentTime / duration) * 100 || 0;

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

</script>

<slot />


<div class="music-player">
  <h4>{title}</h4>
  
  <audio 
    bind:this={audio}
    {src}
    bind:currentTime
    bind:duration
    on:play={() => isPlaying = true}
    on:pause={() => isPlaying = false}
    preload="metadata"
  ></audio>

  <div class="controls">
    <button on:click={() => isPlaying ? audio.pause() : audio.play()}>
      {isPlaying ? '⏸️' : '▶️'}
    </button>
    
    <span class="time">{formatTime(currentTime)}</span>
    <input 
      type="range" 
      bind:value={currentTime} 
      min="0" 
      max={duration}
      step="0.1"
    />
    <span class="time">{formatTime(duration)}</span>
    
    <input 
      type="range" 
      bind:value={volume} 
      min="0" 
      max="1" 
      step="0.05"
      on:input={() => audio.volume = volume}
    />
  </div>
</div>

<style>
  .music-player {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
    max-width: 400px;
  }
  
  .controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }
  
  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  input[type="range"] {
    flex: 1;
    min-width: 150px;
  }
  
  .time {
    font-family: monospace;
    min-width: 45px;
  }
</style>