import { interviewVolumeAtom } from "@/atoms/interview/interviewVolumeAtom";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

export function usePlayer() {
	const [isPlaying, setIsPlaying] = useState(false);
	const volume = useRecoilValue(interviewVolumeAtom);
	const audioContext = useRef<AudioContext | null>(null);
	const source = useRef<AudioBufferSourceNode | null>(null);
	const gainNode = useRef<GainNode | null>(null);

	async function play(stream: ReadableStream, callback: () => void) {
		try {
			stop();
			audioContext.current = new AudioContext({ sampleRate: 24000 });
			gainNode.current = audioContext.current.createGain();

			gainNode.current.gain.setValueAtTime(
				volume,
				audioContext.current.currentTime
			);

			let nextStartTime = audioContext.current.currentTime;
			const reader = stream.getReader();
			let leftover = new Uint8Array();
			let result = await reader.read();
			setIsPlaying(true);

			while (!result.done && audioContext.current) {
				if (result.value.length === 0) {
					console.error("Received empty data chunk");
					result = await reader.read();
					continue;
				}

				const data = new Uint8Array(leftover.length + result.value.length);
				data.set(leftover);
				data.set(result.value, leftover.length);

				const length = Math.floor(data.length / 4) * 4;
				const remainder = data.length % 4;
				const buffer = new Float32Array(data.buffer, 0, length / 4);

				if (buffer.length === 0) {
					console.error("Converted buffer length is 0");
					result = await reader.read();
					continue;
				}

				leftover = new Uint8Array(data.buffer, length, remainder);

				const audioBuffer = audioContext.current.createBuffer(
					1,
					buffer.length,
					audioContext.current.sampleRate
				);
				audioBuffer.copyToChannel(buffer, 0);

				source.current = audioContext.current.createBufferSource();
				source.current.buffer = audioBuffer;
				source.current.connect(gainNode.current);
				gainNode.current.connect(audioContext.current.destination);

				source.current.start(nextStartTime);

				nextStartTime += audioBuffer.duration;

				result = await reader.read();

				if (result.done) {
					source.current.onended = () => {
						stop();
						callback();
					};
				}
			}
		} catch (err) {
			console.log(err);
		}
	}

	function stop() {
		audioContext.current?.close();
		audioContext.current = null;
		setIsPlaying(false);
	}

	function changeVolume(newVolume: number) {
		if (gainNode.current && audioContext.current) {
			gainNode.current.gain.setValueAtTime(
				newVolume,
				audioContext.current.currentTime
			);
		}
	}

	useEffect(() => {
		if (gainNode.current && audioContext.current) {
			gainNode.current.gain.setValueAtTime(
				volume,
				audioContext.current.currentTime
			);
		}
	}, [volume, gainNode.current?.gain]);

	return {
		isPlaying,
		play,
		stop,
		changeVolume,
	};
}
