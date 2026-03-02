<script lang="ts">
	import Logo from '$lib/components/atoms/Logo.svelte';
	import ThemeToggle from '$lib/components/molecules/ThemeToggle.svelte';
	import RssLink from '$lib/components/atoms/RssLink.svelte';

  import { page } from '$app/stores';
  import Music from '$lib/components/Music.svelte';

  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  
  let hasUserInteracted = false;
  
  onMount(() => {
    if (browser) {
      // Detect if user has interacted with the page
      const handleInteraction = () => {
        hasUserInteracted = true;
        document.removeEventListener('click', handleInteraction);
      };
      document.addEventListener('click', handleInteraction);
    }
  });

  export let showBackground = false;
</script>


<header class:has-background={showBackground}>
	<nav class="container">

		<a class="logo" href="/" aria-label="Site logo">
			<img src="/hoasen.png"  width="100px">			
			<!-- <Logo /> -->
		</a>
		<div class="links">						
			<a href="/blog">Tin tức và Blog</a>
<!-- 			<a href="/blog">Contact</a>			
			<a href="/blog">About</a> -->
			<!-- <RssLink /> -->
			<ThemeToggle />
			<Music autoplay={true} />
		</div>
	</nav>
</header>



<main>
  <slot />
</main>



<style lang="scss">
	@import '$lib/scss/breakpoints.scss';


  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  /* Dark mode support - matches your app.html */
  [data-theme="dark"] .navbar {
    background: #1a1a1a;
    color: white;
  }
  
  @media (prefers-color-scheme: dark) {
    .navbar:not([data-theme="light"]) {
      background: #1a1a1a;
      color: white;
    }
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .navbar {
      padding: 0.75rem 1rem;
    }
  }



	header {
		position: relative;
		padding: 30px 0;

		@include for-phone-only {
			padding: 20px 0;
		}

		&.has-background {
			background: linear-gradient(
				60deg,
				var(--color--waves-start) 0%,
				var(--color--waves-end) 100%
			);
		}

		.container {
			display: flex;
			align-items: center;
			gap: 30px;

			@include for-phone-only {
				.links {
					a {
						display: none;
					}
				}
			}
		}

		.logo {
			height: 44px;
			flex: 1;
		}

		a {
			color: var(--color--text);
		}

		.links {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: 30px;

			a {
				text-decoration: none;

				&:hover {
					color: var(--color--primary);
					filter: drop-shadow(0px 0px 3px var(--color--primary));
				}
			}
		}
	}
</style>
