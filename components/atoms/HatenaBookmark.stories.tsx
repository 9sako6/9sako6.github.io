import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HatenaBookmark } from "./HatenaBookmark";

export default {
  title: "atoms/HatenaBookmark",
  component: HatenaBookmark,
} as ComponentMeta<typeof HatenaBookmark>;

const Template: ComponentStory<typeof HatenaBookmark> = () => (
  <HatenaBookmark />
);

export const Primary = Template.bind({});
