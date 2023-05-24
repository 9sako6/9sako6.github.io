import { Tag } from "../atoms";

export type SideBarProps = {
  topics: string[];
  title: string;
  url: string;
};

export const SideBar = ({ topics, title, url }: SideBarProps) => (
  <div className="p-8">
    <div className="">
      {topics.length > 0 && (
        <div className="pt-8 pb-8 border-t text-center dark:border-zinc-800">
          {topics.map((topic) => (
            <div key={topic}>
              <Tag tag={topic} />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
