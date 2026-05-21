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
  let allProjects = getPosts(["src", "app", "projects", "posts"]);

  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range.length === 2 ? range[1] : sortedProjects.length)
    : sortedProjects;

  return (
    <>
      {displayedProjects.length > 0 && (
        <Grid columns={columns} s={{ columns: "1" }} fillWidth marginBottom="40" gap="12">
          {displayedProjects.map((post) => (
            <Post
              key={post.slug}
              post={post}
              thumbnail={thumbnail}
              direction={direction}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
