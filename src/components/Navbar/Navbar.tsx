import { ReactNode, useState } from "react";
import Icons from "../../utils/icons.utils";
import youtube_logo from "../../assets/youtube_logo.png";
import user_icon from "../../assets/icons/user_icon.jpg";

import styles from "./Navbar.module.scss";
import { Link, useNavigate } from "react-router-dom";

type NavbarParam = {
	setExpandSidebar: React.Dispatch<React.SetStateAction<boolean>>;
	setCategoryId: React.Dispatch<React.SetStateAction<number>>;
};

function NavLeft({ setExpandSidebar, setCategoryId }: NavbarParam): ReactNode {
	const naviget = useNavigate();

	return (
		<div className={styles.navLeft}>
			<button
				onClick={() => {
					setExpandSidebar((prev) => !prev);
				}}
			>
				<img src={Icons.menu} alt="" />
			</button>
			<Link
				to={"/"}
				onClick={(e) => {
					e.preventDefault();
					setCategoryId(0);
					naviget("/");
				}}
			>
				<img src={youtube_logo} alt="" />
			</Link>
		</div>
	);
}

function NavMiddle(): ReactNode {
	const [inputFocus, setInputFocus] = useState<boolean>(false);

	return (
		<div className={styles.navMiddle}>
			<div className={styles.input}>
				<div
					className={`${styles.inputField} ${inputFocus ? styles.focus : ""}`}
				>
					{inputFocus && <img src={Icons.search} alt="" />}
					<input
						type="text"
						placeholder="Search"
						onFocus={() => setInputFocus(true)}
						onBlur={() => setInputFocus(false)}
					/>
				</div>
				<button>
					<img src={Icons.search} alt="" />
				</button>
			</div>
			<button className={styles.microphoneBtn}>
				<img src={Icons.microphone} alt="" />
			</button>
		</div>
	);
}

function NavRight(): ReactNode {
	return (
		<div className={styles.navRight}>
			<button className={styles.createBtn}>
				<img src={Icons.create} alt="" />
				<p>Create</p>
			</button>
			<button className={styles.notifications}>
				<img src={Icons.notifications} alt="" />
				<i>9+</i>
			</button>
			<button className={styles.userIconBtn}>
				<img src={user_icon} alt="" />
			</button>
		</div>
	);
}

export default function Navbar(navbar: NavbarParam): ReactNode {
	return (
		<nav>
			<NavLeft
				setExpandSidebar={navbar.setExpandSidebar}
				setCategoryId={navbar.setCategoryId}
			/>
			<NavMiddle />
			<NavRight />
		</nav>
	);
}
