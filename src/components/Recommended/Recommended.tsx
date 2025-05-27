import { ReactNode, useEffect, useState } from "react";
import styles from "./Recommended.module.scss";
import Icons from "../../utils/icons.utils";
import { Link } from "react-router-dom";
import YouTubeVideoListResponse from "../../interfaces/YouTubeVideoListResponse.interface";
import { listVideosByCategoryEndpoint } from "../../apis/YouTubeEndpoints.api";
import {
	formatYouTubeViews,
	parseISODurationToTimestamp,
} from "../../utils/parse";
import moment from "moment";

type RecommendedVideoCardProm = {
	videoTitle: string;
	videoThumbnails: string;
	channelName: string;
	views: string;
	launch: string;
	duration: string;
	videoId: string;
	categoryId: number;
};

function RecommendedVideoCard(
	recommendedVideo: RecommendedVideoCardProm
): ReactNode {
	return (
		<Link
			to={`/video/${recommendedVideo.categoryId}/${recommendedVideo.videoId}`}
			className={styles.recommendedVideoCard}
		>
			<div className={styles.thum}>
				<img
					className={styles.videoImg}
					src={recommendedVideo.videoThumbnails}
					alt=""
				/>
				<span>{parseISODurationToTimestamp(recommendedVideo.duration)}</span>
			</div>
			<div className={styles.body}>
				<p>{recommendedVideo.videoTitle}</p>
				<p>{recommendedVideo.channelName}</p>
				<p>
					{formatYouTubeViews(+recommendedVideo.views)} &bull;{" "}
					{moment(recommendedVideo.launch).fromNow()}
				</p>
			</div>
			<button>
				<img src={Icons.more} alt="" />
			</button>
		</Link>
	);
}

export default function RecommendedVideos({
	categoryId,
	videoId,
}: {
	categoryId: number;
	videoId: string;
}): ReactNode {
	const [relatedVideos, setRelatedVideos] =
		useState<YouTubeVideoListResponse | null>(null);

	const fetchRelatedVideos = async () => {
		try {
			const response = await fetch(
				listVideosByCategoryEndpoint(categoryId, 42)
			);
			const data = await response.json();
			if (data && data.items) {
				setRelatedVideos(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchRelatedVideos();
	}, []);

	return (
		<div className={styles.recommended}>
			{relatedVideos &&
				relatedVideos.items &&
				relatedVideos.items
					.filter((video) => video.id != videoId)
					.map((video) => (
						<RecommendedVideoCard
							videoThumbnails={video.snippet.thumbnails.medium.url}
							videoTitle={video.snippet.title}
							channelName={video.snippet.channelTitle}
							views={video.statistics.viewCount}
							launch={video.snippet.publishedAt}
							duration={video.contentDetails.duration}
							videoId={video.id}
							categoryId={categoryId}
							key={video.id}
						/>
					))}
		</div>
	);
}
