import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getContentBySlug, getAllContents } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/mdToHtml";

export default function Post({ post, morePosts, preview }) {
	const router = useRouter();
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}
	return (
		<div>
			{router.isFallback ? (
				<span>Loading…</span>
			) : (
				<>{JSON.stringify(post)}</>
			)}
		</div>
	);
}

export async function getStaticProps({ params }) {
	const post = getContentBySlug(params.slug, [
		"title",
		"date",
		"slug",
		"author",
		"content",
		"ogImage",
		"coverImage",
	]);
	const content = await markdownToHtml(post.content || "");

	return {
		props: {
			post: {
				...post,
				content,
			},
		},
	};
}

export async function getStaticPaths() {
	const posts = getAllContents(["slug"]);

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug,
				},
			};
		}),
		fallback: false,
	};
}
