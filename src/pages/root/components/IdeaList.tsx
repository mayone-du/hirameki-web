import Link from "next/link";
import type { GetIndexPageItemsQuery } from "src/graphql/schemas/schema";

export const IdeaList: React.VFC<GetIndexPageItemsQuery | undefined> = (props) => {
  return (
    <div>
      {props?.allIdeas?.edges.length === 0 ? (
        "アイデアはまだありません"
      ) : (
        <ul className="md:grid md:grid-cols-1 lg:grid-cols-2">
          {props?.allIdeas?.edges.map((idea, index) => {
            return (
              <li className="p-2 lg:p-4" key={index.toString()}>
                <Link href={`/ideas/${idea?.node?.id}`}>
                  <a className="block p-2 min-h-full bg-blue-100 rounded-md shadow">
                    {idea?.node?.title}
                    <br />
                    {idea?.node?.content}
                    <br />
                    いいねの数:{idea?.node?.likedIdea.edges.length.toString()}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
