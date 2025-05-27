export default interface YouTubeVideoListResponse {
	kind: string;
	etag: string;
	items: YouTubeVideoItem[];
}

export interface YouTubeVideoItem {
	kind: string;
	etag: string;
	id: string;
	snippet: Snippet;
	contentDetails: ContentDetails;
	statistics: Statistics;
}

export interface Snippet {
	publishedAt: string;
	channelId: string;
	title: string;
	description: string;
	thumbnails: Thumbnails;
	channelTitle: string;
	categoryId: string;
	liveBroadcastContent: string;
	localized: Localized;
	defaultLanguage?: string;
	defaultAudioLanguage?: string;
}

export interface Thumbnails {
	default: Thumbnail;
	medium: Thumbnail;
	high: Thumbnail;
	standard?: Thumbnail;
	maxres?: Thumbnail;
}

export interface Thumbnail {
	url: string;
	width: number;
	height: number;
}

export interface Localized {
	title: string;
	description: string;
}

export interface ContentDetails {
	duration: string;
	dimension: string;
	definition: string;
	caption: string;
	licensedContent: boolean;
	contentRating: Record<string, unknown>;
	projection: string;
}

export interface Statistics {
	viewCount: string;
	likeCount: string;
	favoriteCount: string;
	commentCount: string;
}
