export interface YouTubeVideoResponse {
	kind: string;
	etag: string;
	items: YouTubeVideo[];
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
}

export interface YouTubeVideo {
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
	thumbnails: {
		default: Thumbnail;
		medium: Thumbnail;
		high: Thumbnail;
		standard?: Thumbnail;
		maxres?: Thumbnail;
	};
	channelTitle: string;
	categoryId: string;
	liveBroadcastContent: string;
	localized: {
		title: string;
		description: string;
	};
	defaultAudioLanguage?: string;
}

export interface Thumbnail {
	url: string;
	width: number;
	height: number;
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
