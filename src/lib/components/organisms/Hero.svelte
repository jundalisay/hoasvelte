<script>
	import FeaturesIcon from '$lib/icons/features.svelte';
	import GitHubIcon from '$lib/icons/socials/github.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Sparkles from '../atoms/Sparkles.svelte';
</script>

<section id="hero">
	<h1 class="hello">Cải thiện tinh thần nang cao sức khỏe</h1>

	<p class="pb-6">
		<span class=" pb-6">Mới Lịch trình cho năm 2025</span>
		<!-- <span class="right"></span> -->
	</p>

<br>

	<div class="py-6 my-6">
		<Sparkles>
			<iframe class="py-6 my-6" width="409" height="230" src="https://www.youtube.com/embed/pydpm4w9yvk" title="2025 Summer Camp" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			
		</Sparkles>
</div>

	<div class="ctas">
		




		<div>
		<Button color="primary" href="https://histoire-sveltekit-static-blog-template.vercel.app/">
			<FeaturesIcon slot="icon" />
			Components
		</Button>
		<Button href="https://github.com/matfantinel/sveltekit-static-blog-template">
				<GitHubIcon slot="icon" />
				Source Code
			</Button>
		</div>
	</div>
</section>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	#hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15px;
		position: relative;
		padding: 80px 0;

		@include for-phone-only {
			padding: 40px 0 50px;
		}

		.hello {
			text-align: center;
		}

		.intro {
			font-weight: 500;
			font-size: 1.4rem;
			width: min(100%, 440px);
			display: flex;
			flex-direction: column;

			.left {
				text-align: left;
			}
			.right {
				text-align: right;
			}

			@include for-phone-only {
				display: none;
			}
		}

		.ctas {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			gap: 10px;
			width: 100%;
		}
	}
</style>
