import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/publications/Posts";
import { baseURL, person, publications } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: publications.title,
    description: publications.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(publications.title)}`,
    path: publications.path,
  });
}

export default function PublicationsPage() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={publications.title}
        description={publications.description}
        path={publications.path}
        image={`/api/og/generate?title=${encodeURIComponent(publications.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${publications.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {publications.title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <Posts columns="2" thumbnail direction="column" />
        <Mailchimp marginBottom="l" />
      </Column>
    </Column>
  );
}
