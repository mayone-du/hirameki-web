import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
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
              <li className="p-2 lg:p-4 m-2 rounded-md border shadow" key={index.toString()}>
                <Link href={`/ideas/${idea?.node?.id}`}>
                  <a className="block">
                    <h3 className="text-lg font-bold">{idea?.node?.title}</h3>
                  </a>
                </Link>
                <div className="flex items-center">
                  <Link href={`/users/${idea?.node?.ideaCreator.id}`}>
                    <a className="block">
                      <img
                        className="block object-cover w-8 h-8 rounded-full"
                        src={
                          idea?.node?.ideaCreator.relatedUser?.profileImage
                            ? idea?.node?.ideaCreator.relatedUser?.profileImage
                            : idea?.node?.ideaCreator.relatedUser?.googleImageUrl ?? ""
                        }
                        alt={idea?.node?.ideaCreator.relatedUser?.profileName}
                      />
                    </a>
                  </Link>
                  <div>
                    <Link href={`/users/${idea?.node?.ideaCreator.id}`}>
                      <a className="block">
                        <h4 className="text-sm text-gray-700">
                          {idea?.node?.ideaCreator.relatedUser?.profileName}
                        </h4>
                      </a>
                    </Link>
                    <div className="flex items-center text-xs text-gray-500">
                      <FiHeart className="w-4 h-4" />
                      <span className="block px-[2px]">
                        {idea?.node?.likedIdea.edges.length.toString()}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
