import { ReactNode, useEffect, useState } from "react";
import styles from "./PlayVideo.module.scss";
import Icons from "../../utils/icons.utils";
import {
	getChannelEndpoint,
	getVideoCommentsEndpoint,
	getVideoEndpoint,
} from "../../apis/YouTubeEndpoints.api";
import { YouTubeVideoResponse } from "../../interfaces/YouTubeVideoResponse";
import YouTubeVideoListResponse from "../../interfaces/YouTubeVideoListResponse.interface";
import { YouTubeChannelListResponse } from "../../interfaces/YouTubeChannelListResponse";
import {
	formatSubscribers,
	formatYouTubeDescription,
	formatYouTubeViews,
} from "../../utils/parse";
import moment from "moment";
import { YouTubeCommentThreadListResponse } from "../../interfaces/YouTubeCommentThreadListResponse";
import parse from "html-react-parser";

type PlayVideoParams = {
	videoId: string;
};

type ChannelVideoInfoParams = {
	avatar: string;
	title: string;
	subscribersCount: string;
	likes: string;
	customUrl: string;
};

type VideoInfoParams = {
	views: string;
	publishedAt: string;
	description: string;
	id: string;
};

type CommentsParams = {
	commentCount: string;
	videoId: string;
};

type CommentParams = {
	authorDisplayName: string;
	authorProfileImageUrl: string;
	textDisplay: string;
	authorChannelUrl: string;
	publishedAt: string;
	likeCount: number;
};

function ChannelVideoInfo(channel: ChannelVideoInfoParams): ReactNode {
	const [liked, setLiked] = useState<boolean>(false);
	const [disliked, setDisliked] = useState<boolean>(false);
	const [likes, setLikes] = useState<number | null>(null);

	const likeVideo = () => {
		if (!likes) setLikes(parseInt(channel.likes));
		setLikes((prev) => (liked ? (prev as number) - 1 : (prev as number) + 1));
		setLiked(!liked);
		if (disliked) setDisliked(!disliked);
	};

	const dislikeVideo = () => {
		if (!likes) setLikes(parseInt(channel.likes));
		setDisliked(!disliked);
		if (liked) {
			setLikes((prev) => (prev as number) - 1);
			setLiked(!liked);
		}
	};

	useEffect(() => {
		setLikes(null);
		setLiked(false);
		setDisliked(false);
	}, [channel.title]);

	return (
		<div className={styles.channelVideoInfo}>
			<div className={styles.left}>
				<img src={channel.avatar} alt="" loading="lazy" />
				<p>
					<span>
						<a href={`https://www.youtube.com/${channel.customUrl}`}>
							{channel.title}
						</a>
					</span>
					<span>{channel.subscribersCount} subscribers</span>
				</p>
				<div className={styles.btns}>
					{/* <button className={styles.join}>Join</button> */}
					<button className={styles.subscribe}>Subscribe</button>
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.likeDislike}>
					<button onClick={likeVideo}>
						<img src={liked ? Icons.like_active : Icons.like} alt="" />
						<span>
							{!likes
								? formatYouTubeViews(+channel.likes)
								: formatYouTubeViews(likes as number)}
						</span>
					</button>
					<button onClick={dislikeVideo}>
						<img src={disliked ? Icons.dislike_active : Icons.dislike} alt="" />
					</button>
				</div>
				<button className={styles.share}>
					<img src={Icons.share} alt="" />
					<span>Share</span>
				</button>
				<button className={styles.download}>
					<img src={Icons.download} alt="" />
					<span>Download</span>
				</button>
				<button>
					<img src={Icons.more_hr} alt="" />
				</button>
			</div>
		</div>
	);
}

function VideoInfo(video: VideoInfoParams): ReactNode {
	const [descriptionOpened, setDescriptionOpened] = useState<boolean>(false);

	useEffect(() => {
		setDescriptionOpened(false);
	}, [video.id]);
	return (
		<div
			className={styles.videoInfo}
			onClick={() => (!descriptionOpened ? setDescriptionOpened(true) : null)}
		>
			<div className={styles.header}>
				<p>
					{video.views} views &bull; {video.publishedAt}
				</p>
			</div>
			<div className={styles.body}>
				<div
					className={`${styles.descriptionText} ${
						descriptionOpened ? styles.opened : ""
					}`}
				>
					{formatYouTubeDescription(video.description) ??
						"No description found..."}
				</div>
				{descriptionOpened && (
					<span
						onClick={() =>
							descriptionOpened ? setDescriptionOpened(false) : null
						}
					>
						Show less
					</span>
				)}
			</div>
		</div>
	);
}

function Comment(comment: CommentParams): ReactNode {
	const likeCount: number = +comment.likeCount;
	const [commentLikeCount, setCommentLikeCount] = useState<number>(likeCount);
	const [avatar, setAvatar] = useState<string>(comment.authorProfileImageUrl);

	const [liked, setLiked] = useState<boolean>(false);
	const [disliked, setDisliked] = useState<boolean>(false);

	const likeComment = () => {
		setCommentLikeCount((prev) => (liked ? prev - 1 : prev + 1));
		setLiked(!liked);
		if (disliked) setDisliked(!disliked);
	};

	const dislikeComment = () => {
		setDisliked(!disliked);
		if (liked) {
			setCommentLikeCount((prev) => prev - 1);
			setLiked(!liked);
		}
	};

	useEffect(()=>{
		setAvatar(comment.authorProfileImageUrl);
	},[comment.authorProfileImageUrl])
	return (
		<div className={styles.comment}>
			<img
				className={styles.userProfile}
				src={avatar}
				alt=""
				loading="lazy"
				onError={() => setAvatar(Icons.avatar_placeholder)}
			/>
			<div className={styles.commentBody}>
				<p>
					<span>
						<a
							href={comment.authorChannelUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							{comment.authorDisplayName}
						</a>
					</span>
					<span>{moment(comment.publishedAt).fromNow()}</span>
				</p>
				<p>{parse(comment.textDisplay)}</p>
				<div className={styles.reactions}>
					<button onClick={likeComment}>
						<img src={liked ? Icons.like_active : Icons.like} alt="" />
					</button>
					<span>{formatYouTubeViews(commentLikeCount)}</span>
					<button onClick={dislikeComment}>
						<img src={disliked ? Icons.dislike_active : Icons.dislike} alt="" />
					</button>
				</div>
			</div>
			<button>
				<img src={Icons.more} alt="" />
			</button>
		</div>
	);
}

function Comments(comments: CommentsParams): ReactNode {
	const [videoComments, setVideoComments] =
		useState<YouTubeCommentThreadListResponse | null>(null);
	const [isLoadingCommnets, setIsLoadingComments] = useState<boolean>(false);

	const fetchComments = async () => {
		setIsLoadingComments(true);
		try {
			const response = await fetch(
				getVideoCommentsEndpoint(comments.videoId, 50)
			);
			const data = await response.json();
			if (data && data.items) {
				setVideoComments(data);
				setIsLoadingComments(false);
			}
		} catch (error) {
			console.error("Error fetching video data:", error);
			alert("Something went wrong!");
		}
	};

	useEffect(() => {
		fetchComments();
	}, [comments.videoId]);

	return (
		<div className={styles.comments}>
			<div className={styles.header}>
				<h3>{comments.commentCount} Comments</h3>
				<div className={styles.sort}>
					<img src={Icons.sort_comments} alt="" />
					<p>Sort by</p>
				</div>
			</div>
			<div className={styles.addComment}>
				<img src={Icons.user_icon} alt="" />
				<input type="text" placeholder="Add a comment..." />
			</div>
			<div className={styles.commentsContainer}>
				{videoComments?.items &&
					!isLoadingCommnets &&
					videoComments.items.map((comment) => (
						<Comment
							authorDisplayName={
								comment.snippet.topLevelComment.snippet.authorDisplayName
							}
							authorChannelUrl={
								comment.snippet.topLevelComment.snippet.authorChannelUrl
							}
							authorProfileImageUrl={
								comment.snippet.topLevelComment.snippet.authorProfileImageUrl
							}
							textDisplay={comment.snippet.topLevelComment.snippet.textDisplay}
							publishedAt={comment.snippet.topLevelComment.snippet.publishedAt}
							likeCount={comment.snippet.topLevelComment.snippet.likeCount}
							key={comment.id}
						/>
					))}
				{isLoadingCommnets && <p>Comments is Loading...</p>}
			</div>
		</div>
	);
}

export default function PlayVideo(video: PlayVideoParams): ReactNode {
	const [videoData, setVideoData] = useState<YouTubeVideoResponse | null>(null);
	const [mainChannel, setMainChannel] =
		useState<YouTubeChannelListResponse | null>(null);

	const fetchVideoData = async () => {
		try {
			const response = await fetch(getVideoEndpoint(video.videoId));
			const data = await response.json();
			if (data && data?.items) {
				setVideoData(data);
				await fetchChannel(data);
			}
		} catch (error) {
			console.error("Error fetching video data:", error);
			alert("Something went wrong!");
		}
	};

	const fetchChannel = async (videoData: YouTubeVideoListResponse) => {
		const channelId: string = videoData.items[0].snippet.channelId;
		try {
			const response = await fetch(getChannelEndpoint(channelId));
			const data = await response.json();
			if (data && data.items) setMainChannel(data);
		} catch (error) {
			console.error("Error fetching channel data:", error);
			alert("Something went wrong!");
		}
	};

	useEffect(() => {
		fetchVideoData();
	}, [video.videoId]);

	return (
		mainChannel?.items &&
		videoData?.items && (
			<div className={styles.playVideo}>
				<iframe
					src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
					title={videoData?.items[0].snippet.title}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				></iframe>
				<h2>{videoData?.items[0].snippet.title}</h2>
				<ChannelVideoInfo
					avatar={
						mainChannel?.items[0].snippet.thumbnails.default.url as string
					}
					title={videoData?.items[0].snippet.channelTitle as string}
					subscribersCount={formatSubscribers(
						+(mainChannel?.items[0].statistics.subscriberCount as string)
					)}
					likes={videoData?.items[0].statistics.likeCount as string}
					customUrl={mainChannel?.items[0].snippet.customUrl as string}
				/>
				<VideoInfo
					views={formatYouTubeViews(
						+(videoData?.items[0].statistics.viewCount as string)
					)}
					publishedAt={moment(
						videoData?.items[0].snippet.publishedAt as string
					).fromNow()}
					description={videoData?.items[0].snippet.description as string}
					id={video.videoId}
				/>
				<Comments
					commentCount={(+(videoData?.items[0].statistics
						.commentCount as string)).toLocaleString()}
					videoId={videoData.items[0].id}
				/>
			</div>
		)
	);
}
