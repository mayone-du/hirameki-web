import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import type { GetIndexPageItemsQuery } from "src/graphql/schemas/schema";

export const MemoList: React.VFC<GetIndexPageItemsQuery | undefined> = (props) => {
  return (
    <div>
      {props?.allMemos?.edges.length === 0 ? (
        "メモはまだありません"
      ) : (
        <ul className="md:grid md:grid-cols-1 lg:grid-cols-2">
          {props?.allMemos?.edges.map((memo) => {
            return (
              <li className="p-4 md:p-2 m-2 rounded border shadow-sm" key={memo?.node?.id}>
                <Link href={`/users/${memo?.node?.memoCreator.id}`}>
                  <a className="block font-bold">{memo?.node?.title}</a>
                </Link>
                <div className="flex items-center">
                  <div>
                    <img
                      src={
                        memo?.node?.memoCreator.relatedUser?.profileImage
                          ? memo.node.memoCreator.relatedUser.profileImage
                          : memo?.node?.memoCreator.relatedUser?.googleImageUrl ?? ""
                      }
                      alt="Profile"
                      className="block object-cover w-8 h-8 rounded-full"
                    />
                  </div>
                  <div>
                    <h4>{memo?.node?.memoCreator.relatedUser?.profileName}</h4>
                    <div className="flex items-center">
                      <FiHeart className="w-4 h-4" />
                      <span className="block">{memo?.node?.likedMemo.edges.length.toString()}</span>
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
