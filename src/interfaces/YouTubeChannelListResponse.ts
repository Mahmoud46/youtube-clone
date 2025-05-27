export interface YouTubeChannelListResponse {
	kind: string;
	etag: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
	items: YouTubeChannel[];
}

export interface YouTubeChannel {
	kind: string;
	etag: string;
	id: string;
	snippet: ChannelSnippet;
	contentDetails: ChannelContentDetails;
	statistics: ChannelStatistics;
}

export interface ChannelSnippet {
	title: string;
	description: string;
	customUrl: string;
	publishedAt: string;
	thumbnails: {
		default: Thumbnail;
		medium: Thumbnail;
		high: Thumbnail;
	};
	localized: {
		title: string;
		description: string;
	};
	country?: string;
}

export interface Thumbnail {
	url: string;
	width: number;
	height: number;
}

export interface ChannelContentDetails {
	relatedPlaylists: {
		likes?: string;
		uploads: string;
	};
}

export interface ChannelStatistics {
	viewCount: string;
	subscriberCount: string;
	hiddenSubscriberCount: boolean;
	videoCount: string;
}
