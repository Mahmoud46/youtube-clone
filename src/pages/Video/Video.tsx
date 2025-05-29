import { ReactNode } from "react";
import styles from "./Video.module.scss";
import { useParams } from "react-router-dom";
import PlayVideo from "../../components/PlayVideo/PlayVideo";
import RecommendedVideos from "../../components/Recommended/Recommended";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Video({
	expandSidebar,
	setCategory,
	category,
	setExpandSidebar,
}: {
	expandSidebar: boolean;
	setCategory: React.Dispatch<React.SetStateAction<number>>;
	category: number;
	setExpandSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode {
	const { categoryId, videoId } = useParams<string>();

	return (
		<>
			<Sidebar
				expandSidebar={expandSidebar}
				category={category}
				setCategory={setCategory}
				setExpandSidebar={setExpandSidebar}
			/>
			<section
				className={`${styles.video} ${expandSidebar ? styles.deactivate : ""}`}
				onClick={() => {
					if (expandSidebar) setExpandSidebar(!expandSidebar);
				}}
			>
				<PlayVideo
					videoId={videoId as string}
					categoryId={+(categoryId as string) as number}
				/>

				<div className={styles.mainRecommended}>
					<RecommendedVideos
						categoryId={+(categoryId as string) as number}
						videoId={videoId as string}
					/>
				</div>
			</section>
		</>
	);
}
