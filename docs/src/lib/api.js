import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const contentDir = join(process.cwd(), "_content");

export function getContentSlugs() {
	return fs.readdirSync(contentDir);
}

export function getContentBySlug(slug, fields = []) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(contentDir, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	const items = {};

	// Ensure only the minimal needed data is exposed
	fields.forEach((field) => {
		if (field === "slug") {
			items[field] = realSlug;
		}
		if (field === "content") {
			items[field] = content;
		}

		if (typeof data[field] !== "undefined") {
			items[field] = data[field];
		}
	});

	return items;
}

export function getAllContents(fields = []) {
	const slugs = getContentSlugs();
	const posts = slugs
		.map((slug) => getContentBySlug(slug, fields))
		// sort posts by date in descending order
		.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
	return posts;
}
