import { ReactNode } from "react";
import styles from "./Sidebar.module.scss";
import Icons from "../../utils/icons.utils";
import { useLocation, useNavigate } from "react-router-dom";

type CatProm = {
	category: number;
	showVideosWithCategory: (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		categoryId: number
	) => void;
	deactivateLink: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

function MajorMenu({
	category,
	showVideosWithCategory,
	deactivateLink,
}: CatProm): ReactNode {
	return (
		<div className={styles.majorMenu}>
			<div>
				<a
					href=""
					className={`${category == 0 ? styles.active : ""}`}
					onClick={(e) => showVideosWithCategory(e, 0)}
				>
					<img
						src={`${category == 0 ? Icons.home_active : Icons.home}`}
						alt=""
					/>
					<span>Home</span>
				</a>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.shorts} alt="" />
					<span>Shorts</span>
				</a>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.subscriptions} alt="" />
					<span>Subscriptions</span>
				</a>
				<hr />
				<a
					href=""
					className={`${styles.you} ${styles.inactive}`}
					onClick={deactivateLink}
				>
					<span>You</span>
					<img src={Icons.right_arrow} alt="" />
				</a>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.history} alt="" />
					<span>History</span>
				</a>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.playlists} alt="" />
					<span>Playlists</span>
				</a>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.watch_later} alt="" />
					<span>Watch later</span>
				</a>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.liked_videos} alt="" />
					<span>Liked videos</span>
				</a>
			</div>
			<hr />
			<div>
				<h2>Explore</h2>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.trending} alt="" />
					<span>Trending</span>
				</a>
				<a
					href=""
					className={`${category == 10 ? styles.active : ""}`}
					onClick={(e) => showVideosWithCategory(e, 10)}
				>
					<img
						src={`${category == 10 ? Icons.music_active : Icons.music}`}
						alt=""
					/>
					<span>Music</span>
				</a>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.live} alt="" />
					<span>Live</span>
				</a>
				<a
					href=""
					className={`${category == 20 ? styles.active : ""}`}
					onClick={(e) => showVideosWithCategory(e, 20)}
				>
					<img
						src={`${category == 20 ? Icons.gaming_active : Icons.gaming}`}
						alt=""
					/>
					<span>Gaming</span>
				</a>
				<a
					href=""
					className={`${category == 17 ? styles.active : ""}`}
					onClick={(e) => showVideosWithCategory(e, 17)}
				>
					<img
						src={`${category == 17 ? Icons.sports_active : Icons.sports}`}
						alt=""
					/>
					<span>Sports</span>
				</a>
			</div>
			<hr />
			<div>
				<h2>More from YouTube</h2>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.youtube_premium} alt="" />
					<span>YouTube Premium</span>
				</a>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.youtube_music} alt="" />
					<span>YouTube Music</span>
				</a>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.youtube_kids} alt="" />
					<span>YouTube Kids</span>
				</a>
			</div>
			<hr />
			<div>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.settings} alt="" />
					<span>Settings</span>
				</a>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.report_history} alt="" />
					<span>Report history</span>
				</a>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.help} alt="" />
					<span>Help</span>
				</a>
				<a href="" onClick={deactivateLink} className={styles.inactive}>
					<img src={Icons.send_feedback} alt="" />
					<span>Send feedback</span>
				</a>
			</div>
		</div>
	);
}

function MinorMenu({
	category,
	showVideosWithCategory,
	deactivateLink,
}: CatProm): ReactNode {
	return (
		<div className={styles.minorMenu}>
			<a href="" onClick={(e) => showVideosWithCategory(e, 0)}>
				<img src={`${category == 0 ? Icons.home_active : Icons.home}`} alt="" />
				<span>Home</span>
			</a>
			<a href="" onClick={deactivateLink} className={styles.inactive}>
				<img
					src={`${category == 42 ? Icons.shorts_active : Icons.shorts}`}
					alt=""
				/>
				<span>Shorts</span>
			</a>
			<a href="" onClick={deactivateLink} className={styles.inactive}>
				<img src={Icons.subscriptions} alt="" />
				<span>Subscriptions</span>
			</a>
			<a href="" onClick={deactivateLink} className={styles.inactive}>
				<img src={Icons.you} alt="" />
				<span>You</span>
			</a>
		</div>
	);
}

export default function Sidebar({
	expandSidebar,
	category,
	setCategory,
}: {
	expandSidebar: boolean;
	category: number;
	setCategory: React.Dispatch<React.SetStateAction<number>>;
}): ReactNode {
	const locationPathname = useLocation().pathname;
	const navigate = useNavigate();
	// Function to controll the sidebar buttons
	const showVideosWithCategory = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		categoryId: number
	) => {
		e.preventDefault();
		setCategory(categoryId);
		if (locationPathname.startsWith("/video")) navigate("/");
	};

	const deactivateLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
		e.preventDefault();

	return (
		<div className={styles.sidebar}>
			{!expandSidebar && locationPathname == "/" && (
				<MinorMenu
					category={category}
					showVideosWithCategory={showVideosWithCategory}
					deactivateLink={deactivateLink}
				/>
			)}
			{expandSidebar && (
				<MajorMenu
					category={category}
					showVideosWithCategory={showVideosWithCategory}
					deactivateLink={deactivateLink}
				/>
			)}
		</div>
	);
}
