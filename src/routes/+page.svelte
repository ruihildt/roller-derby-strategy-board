<script lang="ts">
	import BoardCanvas from '$lib/components/BoardCanvas.svelte';
	import VideoPreview from '$lib/components/VideoPreview.svelte';

	let showPreview = $state(false);
	let recordedBlob: Blob | null = $state(null);

	function handleRecordingComplete(blob: Blob) {
		recordedBlob = blob;
		showPreview = true;
	}

	function handlePreviewClose() {
		showPreview = false;
		recordedBlob = null;
	}
</script>

<main>
	<div class="container">
		<BoardCanvas recordingComplete={handleRecordingComplete} />

		{#if showPreview && recordedBlob}
			<VideoPreview videoBlob={recordedBlob} close={handlePreviewClose} />
		{/if}
	</div>
</main>

<style>
	:global(body) {
		overflow: hidden;
	}

	main {
		width: 100%;
		height: 100dvh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		aspect-ratio: 3/2;
		max-width: 1200px;
		width: 100%;
		max-height: 100dvh;
	}
</style>
