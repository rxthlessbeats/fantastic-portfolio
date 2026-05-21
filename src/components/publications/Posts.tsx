import { getPosts } from "@/utils/utils";
import { Grid } from "@once-ui-system/core";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
}

export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  direction,
  exclude,
}: PostsProps) {
  let allPosts = getPosts(["src", "app", "publications", "posts"]);

  if (exclude && exclude.length > 0) {
    allPosts = allPosts.filter((post) => !exclude.includes(post.slug));
  }

  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedPosts = range
    ? sortedPosts.slice(range[0] - 1, range.length === 2 ? range[1] : sortedPosts.length)
    : sortedPosts;

  return (
    <>
      {displayedPosts.length > 0 && (
        <Grid columns={columns} s={{ columns: "1" }} fillWidth marginBottom="40" gap="12">
          {displayedPosts.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} direction={direction} />
          ))}
        </Grid>
      )}
    </>
  );
}
