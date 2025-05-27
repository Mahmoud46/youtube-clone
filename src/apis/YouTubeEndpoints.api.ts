import YouTubeApiKey from "../utils/youtube.api";

export function listVideosByCategoryEndpoint(
	categoryId: number,
	maxResults: number
): string {
	return `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResults}&regionCode=EG&videoCategoryId=${categoryId}&key=${YouTubeApiKey}`;
}

export function getChannelEndpoint(channelId: string): string {
	return `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${YouTubeApiKey}`;
}

export function getVideoEndpoint(videoId: string): string {
	return `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${YouTubeApiKey}`;
}

export function getVideoCommentsEndpoint(
	videoId: string,
	maxResults: number
): string {
	return `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=${maxResults}&videoId=${videoId}&key=${YouTubeApiKey}`;
}
