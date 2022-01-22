import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostCard } from "./postCard";

export default {
  title: "atoms/PostCard",
  component: PostCard,
} as ComponentMeta<typeof PostCard>;

const Template: ComponentStory<typeof PostCard> = (args) => (
  <PostCard {...args} />
);

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  slug: "my-sample-post",
  title: "This is a sample post. サンプルです。",
  description: "これは検証用の説明文です。",
  createdAt: new Date().toString(),
};

export const WithImage = Template.bind({});
WithImage.args = {
  slug: "my-sample-post",
  title: "This is a sample post. サンプルです。",
  description: "これは検証用の説明文です。",
  createdAt: new Date().toString(),
  imageUrl: "https://picsum.photos/800/450",
};

export const WithLongDescription = Template.bind({});
WithLongDescription.args = {
  slug: "my-sample-post",
  title: "This is a sample post. サンプルです。",
  description:
    "これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。これは検証用の説明文です。",
  createdAt: new Date().toString(),
  imageUrl: "https://picsum.photos/800/450",
};

export const WithLongTitle = Template.bind({});
WithLongTitle.args = {
  slug: "my-sample-post",
  title:
    "This is a sample post. サンプルです。This is a sample post. サンプルです。This is a sample post. サンプルです。This is a sample post. サンプルです。This is a sample post. サンプルです。This is a sample post. サンプルです。This is a sample post. サンプルです。",
  description: "これは検証用の説明文です。",
  createdAt: new Date().toString(),
  imageUrl: "https://picsum.photos/800/450",
};
