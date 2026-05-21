"use client";

import { Carousel, Column, Flex, Heading, SmartLink, Text } from "@once-ui-system/core";

interface ProjectCardProps {
  priority?: boolean;
  images: string[];
  title: string;
  description: string;
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  images = [],
  title,
  description,
  link,
}) => {
  return (
    <Column fillWidth gap="m">
      <Carousel
        sizes="(max-width: 960px) 100vw, 960px"
        items={images.map((image) => ({
          slide: image,
          alt: title,
        }))}
      />
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(description?.trim() || link) && (
          <Column flex={7} gap="16">
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            {link && (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={link}
              >
                <Text variant="body-default-s">Visit website</Text>
              </SmartLink>
            )}
          </Column>
        )}
      </Flex>
    </Column>
  );
};
