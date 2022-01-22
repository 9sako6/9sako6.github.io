import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostPage } from "./PostPage";
import { buildPost, sampleBodyHtml } from "../../mocks";

export default {
  title: "templates/PostPage",
  component: PostPage,
} as ComponentMeta<typeof PostPage>;

const Template: ComponentStory<typeof PostPage> = (args) => (
  <PostPage {...args} />
);

export const Primary = Template.bind({});
const samplePost = buildPost();

Primary.args = {
  ...samplePost,
  bodyHtml: sampleBodyHtml,
};
