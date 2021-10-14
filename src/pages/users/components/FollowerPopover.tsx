import { Popover } from "@headlessui/react";
import Link from "next/link";
import { memo } from "react";
import type { GetUserQuery } from "src/graphql/schemas/schema";

export const FollowerPopover: React.VFC<GetUserQuery> = memo((props) => {
  return (
    <div>
      <Popover className="relative">
        {({ open: _isOpen }) => {
          return (
            <div>
              <Popover.Button className="block mr-4">
                <span className="text-lg font-bold">
                  {props.user?.followedUser.edges.length.toString()}
                </span>{" "}
                Followers
              </Popover.Button>
              <Popover.Panel className="absolute left-1/2 z-10 mt-4 w-72 bg-white dark:bg-black rounded border shadow-md transform -translate-x-1/2">
                <ul>
                  {props.user?.followedUser.edges.map((user, index) => {
                    return (
                      <li key={index.toString()}>
                        <Popover.Button className="block w-full text-left">
                          <Link href={`/users/${user?.node?.followingUser.id}`}>
                            <a
                              className={`flex items-center w-full py-2 px-4 hover:bg-gray-200 transition-colors duration-300 ${
                                index === 0 && "border-b"
                              }`}
                            >
                              {/* TODO: プロフィールアイコンの共通化 画像がない場合(例外)はアイコンを表示するようにする */}
                              <img
                                src={
                                  user?.node?.followingUser.relatedUser?.profileImage
                                    ? user.node.followingUser.relatedUser.profileImage
                                    : user?.node?.followingUser.relatedUser?.googleImageUrl ?? ""
                                }
                                alt="Profile"
                                className="block object-cover overflow-hidden mr-2 w-8 h-8 rounded-full"
                              />
                              <div className="flex items-center">
                                <div>
                                  <span className="block text-sm">
                                    {user?.node?.followingUser.relatedUser?.profileName}
                                  </span>
                                  <span className="block text-xs text-gray-500">
                                    @{user?.node?.followingUser.id}
                                  </span>
                                </div>
                                {/* TODO: フォローボタンの設置 */}
                              </div>
                            </a>
                          </Link>
                        </Popover.Button>
                      </li>
                    );
                  })}
                </ul>
              </Popover.Panel>
            </div>
          );
        }}
      </Popover>
    </div>
  );
});

FollowerPopover.displayName = "FollowerPopover";
