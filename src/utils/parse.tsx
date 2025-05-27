import React from "react";
export function parseISODurationToTimestamp(isoDuration: string): string {
	const regex = /P(?:([0-9]+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
	const match = isoDuration.match(regex);

	if (!match) return "00:00";

	const [, d, h, m, s] = match.map(Number);

	const days = d || 0;
	const hours = h || 0;
	const minutes = m || 0;
	const seconds = s || 0;

	const parts: string[] = [];

	if (days > 0) parts.push(String(days).padStart(2, "0"));
	if (hours > 0 || parts.length > 0) parts.push(String(hours).padStart(2, "0"));
	if (minutes > 0 || parts.length > 0)
		parts.push(String(minutes).padStart(2, "0"));
	if (parts.length > 0 || seconds > 0)
		parts.push(String(seconds).padStart(2, "0"));

	// Special case: only seconds are non-zero
	if (days === 0 && hours === 0 && minutes === 0 && seconds > 0) {
		return `00:${String(seconds).padStart(2, "0")}`;
	}

	return parts.join(":");
}

export function formatYouTubeViews(views: number): string {
	if (views < 1000) return views.toString();
	if (views < 1_000_000)
		return (views / 1000).toFixed(views < 10_000 ? 1 : 0) + "K";
	if (views < 1_000_000_000)
		return (views / 1_000_000).toFixed(views < 10_000_000 ? 1 : 0) + "M";
	return (views / 1_000_000_000).toFixed(views < 10_000_000_000 ? 1 : 0) + "B";
}

export function formatSubscribers(subscriberCount: number): string {
	if (subscriberCount < 1000) return subscriberCount.toString();

	const units = [
		{ value: 1_000_000_000, symbol: "B" },
		{ value: 1_000_000, symbol: "M" },
		{ value: 1_000, symbol: "K" },
	];

	for (const unit of units) {
		if (subscriberCount >= unit.value) {
			const num = subscriberCount / unit.value;
			return parseFloat(num.toFixed(2)).toString() + unit.symbol;
		}
	}

	return subscriberCount.toString();
}

export function formatYouTubeDescription(text: string): React.ReactNode {
	// Regex patterns
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	const hashtagRegex = /#(\w+)/g;

	// Split by line to preserve newlines
	const lines = text.split("\n");

	return (
		<div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
			{lines.map((line, index) => {
				// Replace URLs
				const parts = line.split(urlRegex).map((part, i) => {
					if (urlRegex.test(part)) {
						return (
							<a
								key={`url-${index}-${i}`}
								href={part}
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: "#3da0f4" }}
							>
								{part}
							</a>
						);
					}

					// Replace hashtags
					const hashtagParts = part.split(hashtagRegex);
					return hashtagParts.map((piece, j) => {
						if (j % 2 === 1) {
							// It's a hashtag match
							return (
								<a
									key={`tag-${index}-${i}-${j}`}
									href={`https://www.youtube.com/hashtag/${piece}`}
									target="_blank"
									rel="noopener noreferrer"
									style={{ color: "#3da0f4" }}
								>
									#{piece}
								</a>
							);
						}
						return (
							<React.Fragment key={`frag-${index}-${i}-${j}`}>
								{piece}
							</React.Fragment>
						);
					});
				});

				return (
					<div key={`line-${index}`}>
						{parts}
						{index < lines.length - 1 && <br />}
					</div>
				);
			})}
		</div>
	);
}
