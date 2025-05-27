const modules = import.meta.glob("../../src/assets/icons/*.png", {
	eager: true,
}) as Record<string, { default: string }>;

const Icons: Record<string, string> = {};

for (const path in modules) {
	const match = path.match(/\/([^/]+)\.png$/); // Extract filename without extension

	if (match) {
		const key = match[1];
		Icons[key] = modules[path].default;
	}
}

Icons["youtube_logo"] = "../../src/assets/youtube_logo.png";
Icons["user_icon"] = "../../src/assets/icons/user_icon.jpg";
Icons["avatar_placeholder"] = "../../src/assets/avatar_placeholder.png";

export default Icons;
