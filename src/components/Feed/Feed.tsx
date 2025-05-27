import { ReactNode, useEffect, useState } from "react";
import styles from "./Feed.module.scss";
import Icons from "../../utils/icons.utils";
import { Link } from "react-router-dom";
import YouTubeVideoListResponse from "../../interfaces/YouTubeVideoListResponse.interface";
import {
	formatYouTubeViews,
	parseISODurationToTimestamp,
} from "../../utils/parse";
import {
	getChannelEndpoint,
	listVideosByCategoryEndpoint,
} from "../../apis/YouTubeEndpoints.api";
import moment from "moment";

type VideoCardParam = {
	video_title: string;
	video_thumnail: string;
	channel_icon: string;
	channel_name: string;
	views: string;
	launch: string;
	duration: string;
	categoryId: number;
	videoId: string;
};

function VideoCard(video: VideoCardParam): ReactNode {
	return (
		<Link
			to={`/video/${video.categoryId}/${video.videoId}`}
			className={styles.card}
		>
			<div className={styles.thum}>
				<img src={video.video_thumnail} alt="" loading="lazy" />
				<span>{video.duration}</span>
			</div>
			<div className={styles.info}>
				<img className={styles.channelIcon} src={video.channel_icon} alt="" />
				<div className={styles.channelInfo}>
					<p>{video.video_title}</p>
					<p>{video.channel_name}</p>
					<p>
						{video.views} views &bull; {video.launch}
					</p>
				</div>
				<button>
					<img src={Icons.more} alt="" loading="lazy" />
				</button>
			</div>
		</Link>
	);
}

function VideoCardLoader(): ReactNode {
	return (
		<div className={styles.videoCardLoader}>
			<div className={styles.vdThum}></div>
			<div className={styles.vdBody}>
				<span className={styles.chIcon}></span>
				<div className={styles.vdInfo}>
					<p></p>
					<p></p>
				</div>
			</div>
		</div>
	);
}

export default function Feed({
	expandSidebar,
	category,
}: {
	expandSidebar: boolean;
	category: number;
}): ReactNode {
	const [videosData, setVideosData] = useState<YouTubeVideoListResponse | null>(
		null
	);
	const [channelAvatar, setChannelAvatar] = useState<Record<string, string>>(
		{}
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(listVideosByCategoryEndpoint(category, 50));
			const data = await response.json();
			if (data && data?.items) {
				setVideosData(data);
				await fetchChannels(data); // Pass the data to fetchChannel
			}
		} catch (error) {
			console.error("Error fetching videos data:", error);
			alert("Something went wrong!");
		} finally {
			setIsLoading(false);
		}
	};

	const fetchChannels = async (videosData: YouTubeVideoListResponse | null) => {
		if (videosData && videosData.items) {
			for (let i = 0; i < videosData.items.length; i++) {
				const channelId: string = videosData.items[i].snippet.channelId;
				try {
					const response = await fetch(getChannelEndpoint(channelId));
					const data = await response.json();
					setChannelAvatar((prevState) => ({
						...prevState, // Keep previous channel avatar state intact
						[channelId]: data.items[0].snippet.thumbnails.default.url, // Update by channelId
					}));
				} catch (error) {
					console.error(`Error fetching channel data for ${channelId}:`, error);
					alert("Something went wrong!");
				}
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, [category]);

	return (
		<div className={`${styles.feed} ${expandSidebar && styles.small}`}>
			{!isLoading &&
				videosData?.items.map((video) => (
					<VideoCard
						video_title={video.snippet.title}
						video_thumnail={video.snippet.thumbnails.medium.url}
						channel_icon={channelAvatar[video.snippet.channelId]}
						channel_name={video.snippet.channelTitle}
						views={formatYouTubeViews(+video.statistics.viewCount)}
						launch={moment(video.snippet.publishedAt).fromNow()}
						duration={parseISODurationToTimestamp(
							video.contentDetails.duration
						)}
						categoryId={category}
						videoId={video.id}
						key={video.id}
					/>
				))}
			{isLoading &&
				Array.from({ length: 50 }, (_, i) => i).map((ele) => (
					<VideoCardLoader key={ele} />
				))}
		</div>
	);
}
