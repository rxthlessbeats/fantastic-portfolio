import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/projects/Posts";
import { baseURL, person, projects } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: projects.title,
    description: projects.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(projects.title)}`,
    path: projects.path,
  });
}

export default function ProjectsPage() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={projects.title}
        description={projects.description}
        path={projects.path}
        image={`/api/og/generate?title=${encodeURIComponent(projects.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${projects.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {projects.title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        <Mailchimp marginBottom="l" />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Earlier projects
        </Heading>
        <Posts range={[4]} columns="2" />
      </Column>
    </Column>
  );
}
