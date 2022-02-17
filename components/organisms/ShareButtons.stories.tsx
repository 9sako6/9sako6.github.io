import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ShareButtons } from "./ShareButtons";

export default {
  title: "organisms/ShareButtons",
  component: ShareButtons,
} as ComponentMeta<typeof ShareButtons>;

const Template: ComponentStory<typeof ShareButtons> = (args) => (
  <ShareButtons {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: "はてなシェア用タイトル",
  url: "https://dummy.hatena.jp",
};
