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
	setExpandSidebar,
}: {
	expandSidebar: boolean;
	category: number;
	setCategory: React.Dispatch<React.SetStateAction<number>>;
	setExpandSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode {
	return (
		<>
			<Sidebar
				expandSidebar={expandSidebar}
				category={category}
				setCategory={setCategory}
				setExpandSidebar={setExpandSidebar}
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
