import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostDate } from "./PostDate";

export default {
  title: "atoms/PostDate",
  component: PostDate,
} as ComponentMeta<typeof PostDate>;

const Template: ComponentStory<typeof PostDate> = (args) => (
  <PostDate {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  date: new Date(),
};
