import ReactDOMServer from "react-dom/server";

type Props = {
  title: string;
  description: string;
  imageUrl: string;
  domain: string;
};

export const LinkCard = ({ title, description, imageUrl, domain }: Props) => {
  return (
    <div>
      {/* a tag の子要素を div にするために必要なダミーのインライン要素 */}
      <span></span>
      <div className="grid grid-cols-5 h-20 md:h-36 box-content rounded border border-gray-300 dark:border-zinc-700 no-underline hover:bg-gray-100 dark:hover:bg-zinc-800">
        <img
          className="h-20 md:h-36 col-span-1 w-full object-contain border-r border-gray-300 dark:border-zinc-700"
          src={imageUrl}
        ></img>
        <div className="h-20 md:h-36 col-span-4 p-2 md:p-4 no-underline flex flex-col">
          <div className="no-underline text-sm md:text-lg text-ellipsis overflow-hidden whitespace-nowrap">
            {title}
          </div>
          <div className="no-underline text-ellipsis overflow-hidden text-xs line-clamp-2 md:line-clamp-3 text-slate-500 dark:text-zinc-400">
            {description}
          </div>
          <div className="flex text-xs text-slate-500 dark:text-zinc-400 mt-auto">
            <img
              className="h-4 pl-1 pr-1"
              src={`//${domain}/favicon.ico`}
              // global.css を打ち消すための style 指定
              style={{ margin: "0 0 0 auto" }}
            />
            <span>{domain}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const staticLinkCard = (props: Props) =>
  ReactDOMServer.renderToStaticMarkup(<LinkCard {...props} />);
