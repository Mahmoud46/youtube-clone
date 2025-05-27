export interface YouTubeCommentThreadListResponse {
	kind: string;
	etag: string;
	nextPageToken?: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
	items: YouTubeCommentThread[];
}

export interface YouTubeCommentThread {
	kind: string;
	etag: string;
	id: string;
	snippet: {
		channelId: string;
		videoId: string;
		topLevelComment: YouTubeComment;
		canReply: boolean;
		totalReplyCount: number;
		isPublic: boolean;
	};
}

export interface YouTubeComment {
	kind: string;
	etag: string;
	id: string;
	snippet: {
		channelId: string;
		videoId: string;
		textDisplay: string;
		textOriginal: string;
		authorDisplayName: string;
		authorProfileImageUrl: string;
		authorChannelUrl: string;
		authorChannelId: {
			value: string;
		};
		canRate: boolean;
		viewerRating: string;
		likeCount: number;
		publishedAt: string;
		updatedAt: string;
	};
}
