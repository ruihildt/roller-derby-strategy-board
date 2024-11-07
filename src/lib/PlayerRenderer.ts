import type { PackManager } from './PackManager';
import type { Player } from './Player';
import { TrackGeometry } from './TrackGeometry';

export class PlayerRenderer {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	highResCanvas: HTMLCanvasElement;
	highResCtx: CanvasRenderingContext2D;
	trackGeometry: TrackGeometry;
	packManager: PackManager;

	constructor(
		canvas: HTMLCanvasElement,
		ctx: CanvasRenderingContext2D,
		highResCanvas: HTMLCanvasElement,
		highResCtx: CanvasRenderingContext2D,
		trackGeometry: TrackGeometry,
		packManager: PackManager
	) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.highResCanvas = highResCanvas;
		this.highResCtx = highResCtx;
		this.trackGeometry = trackGeometry;
		this.packManager = packManager;
	}

	drawPlayers(players: Player[]): void {
		for (const player of players) {
			this.drawPlayer(player, this.ctx);
			if (this.trackGeometry.isPlayerInBounds(player)) {
				this.trackGeometry.drawPerpendicularLine(player);
			}
		}
	}

	drawPlayersHighRes(players: Player[]): void {
		if (!this.highResCanvas) return;

		const ctx = this.highResCtx;
		for (const player of players) {
			this.drawPlayer(player, ctx);
			if (this.trackGeometry.isPlayerInBounds(player)) {
				this.trackGeometry.drawPerpendicularLine(player);
			}
		}
	}

	drawPlayer(player: Player, ctx: CanvasRenderingContext2D): void {
		// Draw existing player circle and details
		ctx.beginPath();
		ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);

		if (player.isRearmost) {
			ctx.fillStyle = 'magenta';
		} else if (player.isForemost) {
			ctx.fillStyle = 'cyan';
		} else {
			ctx.fillStyle = player.color;
		}
		ctx.fill();

		ctx.strokeStyle = player.isInPack ? 'pink' : player.inBounds ? 'black' : 'red';
		ctx.lineWidth = 4;
		ctx.stroke();

		ctx.fillStyle = 'white';
		ctx.font = '10px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(player.role[0].toUpperCase(), player.x, player.y);

		// Draw inner, outer and center points
		const pointRadius = 5;
		ctx.fillStyle = 'black';

		// Inner point
		ctx.beginPath();
		ctx.arc(player.innerPoint.x, player.innerPoint.y, pointRadius, 0, Math.PI * 2);
		ctx.fill();

		// Outer point
		ctx.beginPath();
		ctx.arc(player.outerPoint.x, player.outerPoint.y, pointRadius, 0, Math.PI * 2);
		ctx.fill();
	}
}
