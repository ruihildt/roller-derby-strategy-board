<script lang="ts">
	import { onMount } from 'svelte';
	import { Game } from '$lib/classes/Game';
	import { calculateCanvasSize } from '$lib/utils/utils';
	import RecordingControls from '$lib/components/RecordingControls.svelte';
	import AboutPage from '$lib/components/AboutPage.svelte';

	let { recordingComplete } = $props<{
		recordingComplete: (blob: Blob) => void;
	}>();

	let container: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let game: Game;

	let highResCanvas = $state<HTMLCanvasElement>()!;

	function handleResize() {
		if (!container) return;

		const dimensions = calculateCanvasSize(container.clientWidth, container.clientHeight);

		// Set display size (css pixels)
		canvas.style.width = `${dimensions.styleWidth}px`;
		canvas.style.height = `${dimensions.styleHeight}px`;

		// Set actual size in memory (scaled for HD displays)
		canvas.width = dimensions.bufferWidth;
		canvas.height = dimensions.bufferHeight;

		// High resolution canvas (2x)
		highResCanvas.width = dimensions.bufferWidth * 2;
		highResCanvas.height = dimensions.bufferHeight * 2;

		game?.resize();
	}

	onMount(() => {
		requestAnimationFrame(() => {
			handleResize();
			game = new Game(canvas, highResCanvas, false);
			game.gameLoop();
		});

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
			game?.cleanup();
		};
	});

	function handleRecordingComplete(blob: Blob) {
		recordingComplete(blob);
	}
</script>

<div bind:this={container} class="canvas-container">
	<canvas bind:this={canvas} style="width: 100%; height: 100%; display: block;"></canvas>
	<canvas bind:this={highResCanvas} style="display: none;"></canvas>
	<AboutPage />
	<RecordingControls {highResCanvas} recordingComplete={handleRecordingComplete} />
</div>

<style>
	.canvas-container {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: center;
	}
</style>
