import { ReactNode } from "react";
import styles from "./CategoryNavbar.module.scss";

export default function CategoryNavbar({
	category,
	setCategory,
	expandSidebar,
}: {
	category: number;
	setCategory: React.Dispatch<React.SetStateAction<number>>;
	expandSidebar: boolean;
}): ReactNode {
	const showCategory = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		categoryId: number
	) => {
		e.preventDefault();
		setCategory(categoryId);
		// Scrolling
		window.scrollTo(0, 0);
		// Scroll all scrollable elements
		const scrollables = document.querySelectorAll<HTMLElement>("*");
		scrollables.forEach((el) => {
			const isScrollableY = el.scrollHeight > el.clientHeight;
			const isScrollableX = el.scrollWidth > el.clientWidth;

			if (isScrollableY || isScrollableX) {
				el.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		});
	};

	return (
		<div
			className={`${styles.categoryNavbar} ${expandSidebar && styles.small}`}
		>
			<button
				className={category == 0 ? styles.active : ""}
				onClick={(e) => showCategory(e, 0)}
			>
				<span>All</span>
			</button>
			<button
				className={category == 10 ? styles.active : ""}
				onClick={(e) => showCategory(e, 10)}
			>
				<span>Music</span>
			</button>
			<button
				className={category == 20 ? styles.active : ""}
				onClick={(e) => showCategory(e, 20)}
			>
				<span>Gaming</span>
			</button>
			<button
				className={category == 17 ? styles.active : ""}
				onClick={(e) => showCategory(e, 17)}
			>
				<span>Sports</span>
			</button>
			<button
				className={category == 25 ? styles.active : ""}
				onClick={(e) => showCategory(e, 25)}
			>
				<span>News & Politics</span>
			</button>
			<button
				className={category == 28 ? styles.active : ""}
				onClick={(e) => showCategory(e, 28)}
			>
				<span>Technology</span>
			</button>
			<button
				className={category == 24 ? styles.active : ""}
				onClick={(e) => showCategory(e, 24)}
			>
				<span>Entertainment</span>
			</button>
			<button
				className={category == 23 ? styles.active : ""}
				onClick={(e) => showCategory(e, 23)}
			>
				<span>Comedy</span>
			</button>
			<button
				className={category == 1 ? styles.active : ""}
				onClick={(e) => showCategory(e, 1)}
			>
				<span>Film & Animation</span>
			</button>
			<button
				className={category == 2 ? styles.active : ""}
				onClick={(e) => showCategory(e, 2)}
			>
				<span>Autos & Vehicles</span>
			</button>
			<button
				className={category == 15 ? styles.active : ""}
				onClick={(e) => showCategory(e, 15)}
			>
				<span>Animals</span>
			</button>
			<button
				className={category == 22 ? styles.active : ""}
				onClick={(e) => showCategory(e, 22)}
			>
				<span>Blogs</span>
			</button>
		</div>
	);
}
