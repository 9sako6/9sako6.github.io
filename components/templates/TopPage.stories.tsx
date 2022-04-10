import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TopPage } from "./TopPage";
import { buildPost } from "../../mocks";

export default {
  title: "templates/TopPage",
  component: TopPage,
} as ComponentMeta<typeof TopPage>;

const Template: ComponentStory<typeof TopPage> = (args) => (
  <TopPage {...args} />
);

export const NoPosts = Template.bind({});
NoPosts.args = {
  posts: [],
};

export const WithPosts = Template.bind({});
WithPosts.args = {
  posts: [
    buildPost({
      slug: "SMALLIMAGE",
      eyecatch: "https://picsum.photos/200/100",
    }),
    buildPost({}),
    buildPost({ slug: "NORMAL" }),
  ],
};
