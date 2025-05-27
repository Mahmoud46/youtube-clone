import { ReactNode } from "react";
// import Icons from "../../utils/icons.utils";
import styles from "./Home.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import CategoryNavbar from "../../components/CategoryNavbar/CategoryNavbar";

export default function Home({
	expandSidebar,
	category,
	setCategory,
}: {
	expandSidebar: boolean;
	category: number;
	setCategory: React.Dispatch<React.SetStateAction<number>>;
}): ReactNode {
	return (
		<>
			<Sidebar
				expandSidebar={expandSidebar}
				category={category}
				setCategory={setCategory}
			/>
			<CategoryNavbar
				expandSidebar={expandSidebar}
				category={category}
				setCategory={setCategory}
			/>
			<section className={`${styles.home} ${expandSidebar && styles.small}`}>
				<Feed expandSidebar={expandSidebar} category={category} />
			</section>
		</>
	);
}
