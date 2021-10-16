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
                <Link href="/">
                  <a className="block">{memo?.node?.title}</a>
                </Link>
                <div className="flex items-center">
                  <FiHeart className="w-4 h-4" />
                  <span className="block">{memo?.node?.likedMemo.edges.length.toString()}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
