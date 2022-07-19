import { Cd } from "@/components/atoms";

type Props = {
  topics: string[];
};

export const SideBar = ({ topics }: Props) => (
  <div className="pt-24">
    <div className="fixed">
      {topics.length > 0 && (
        <div className="pt-8 pb-8 border-t border-b w-36 text-center">
          {topics.map((topic) => (
            <div key={topic}>#{topic}</div>
          ))}
        </div>
      )}
      <div className="pt-8 pb-8 text-center">
        <Cd text={"← Back to top"} />
      </div>
    </div>
  </div>
);
