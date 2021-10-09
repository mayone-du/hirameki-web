import Link from "next/link";
import type { GetIndexPageItemsQuery } from "src/graphql/schemas/schema";

export const MemoList: React.VFC<GetIndexPageItemsQuery | undefined> = (props) => {
  console.log(props);

  return (
    <div>
      {props?.allMemos?.edges.length === 0 ? (
        "メモはまだありません"
      ) : (
        <ul className="md:grid md:grid-cols-1 lg:grid-cols-2">
          {props?.allMemos?.edges.map((memo, index) => {
            return (
              <li className="p-2 lg:p-4" key={index.toString()}>
                <Link href="/">
                  <a className="block p-2 min-h-full bg-blue-50 rounded shadow">
                    {memo?.node?.title}
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
