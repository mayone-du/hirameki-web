import { useReactiveVar } from "@apollo/client";
import { Popover } from "@headlessui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/client";
import { memo, useCallback } from "react";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useAuthModal } from "src/libs/hooks/useAuthModal";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";
import { HEADER_MENUS } from "src/utils/menus";

export const Header: React.VFC = memo(() => {
  const [session] = useSession();
  const userInfo = useReactiveVar(userInfoVar);
  const { handleOpenModal } = useAuthModal();

  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  const PROFILE_MENU_ITEMS = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Settings",
      href: "/settings",
    },
  ];

  const ADD_NEW_ITEMS = [
    {
      label: "Add Idea",
      href: "/ideas/new",
    },
    {
      label: "Add Memo",
      href: "/memos/new",
    },
  ];

  return (
    <header className="py-2 md:px-60 lg:px-72 border-b">
      <nav className="flex justify-between items-center">
        <div>
          <Link href="/">
            <a className="block text-lg font-bold">Hirameki</a>
          </Link>
        </div>
        <ul className="flex justify-between items-center">
          {/* ヘッダーメニューを事前に定義し、mapで回して表示 */}
          {HEADER_MENUS.map((menu, index) => {
            return (
              <li key={index.toString()} className="mx-2">
                <Link href={menu.href}>
                  <a>{menu.jsxIcon}</a>
                </Link>
              </li>
            );
          })}
          {/* ローディング時の場合 */}
          {userInfo.isLoading && (
            <div className="ml-2 w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
          )}
          {/* ログイン状態によって変更 */}
          {/* ログイン時の場合 */}
          {!userInfo.isLoading && userInfo.isLogin && (
            <>
              <li className="ml-2">
                <div>
                  <Popover className="relative">
                    {({ open: isOpen }) => {
                      return (
                        <div>
                          <Popover.Button
                            className={`overflow-hidden rounded-full h-10 px-4 border font-bold bg-blue-400 text-white block hover:shadow-lg hover:bg-blue-500 ${
                              isOpen && "bg-blue-400"
                            }`}
                          >
                            Add New
                          </Popover.Button>
                          <Popover.Panel className="absolute right-0 z-10 mt-4 w-72 bg-white dark:bg-black rounded border shadow-md transform">
                            <ul>
                              {/* メニューを表示 */}
                              {ADD_NEW_ITEMS.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <Popover.Button className="block w-full text-left">
                                      <Link href={item.href}>
                                        <a
                                          className={`block py-2 px-4 hover:bg-gray-200 transition-colors duration-300 ${
                                            index === 0 && "border-b"
                                          }`}
                                        >
                                          {item.label}
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
              </li>
              <li className="ml-2">
                <div className="top-16 mx-auto w-full">
                  <Popover className="relative">
                    {({ open: isOpen }) => {
                      return (
                        <div>
                          <Popover.Button
                            className={`ring-blue-300 overflow-hidden rounded-full h-10 w-10 block active:ring hover:shadow-lg ${
                              isOpen && "ring"
                            }`}
                          >
                            <img
                              src={
                                userInfo.profileImage
                                  ? `${MEDIAFILE_API_ENDPOINT}${userInfo.profileImage}`
                                  : session?.user?.image ?? ""
                              }
                              className="block object-cover"
                              alt="Profile Icon"
                            />
                          </Popover.Button>
                          <Popover.Panel className="absolute right-0 z-10 mt-4 w-72 bg-white dark:bg-black rounded border shadow-md transform">
                            <ul>
                              {/* プロフィールのリンク */}
                              <li>
                                {/* ↓押した時にメニューを閉じたいためボタンにする */}
                                <Popover.Button className="block w-full text-left">
                                  <Link href={`/users/${userInfo.userId}`}>
                                    <a className="block py-2 px-4 hover:bg-gray-200 transition-colors duration-300">
                                      <span className="block">マイページ</span>
                                      <span className="block text-xs text-gray-400">
                                        @{userInfo.profileName}
                                      </span>
                                    </a>
                                  </Link>
                                </Popover.Button>
                              </li>
                              {/* メニューを表示 */}
                              {PROFILE_MENU_ITEMS.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <Popover.Button className="block w-full text-left">
                                      <Link href={item.href}>
                                        <a className="block py-2 px-4 hover:bg-gray-200 border-t transition-colors duration-300">
                                          {item.label}
                                        </a>
                                      </Link>
                                    </Popover.Button>
                                  </li>
                                );
                              })}
                              {/* サインアウト用 */}
                              <li>
                                <button
                                  onClick={handleSignOut}
                                  className="block py-2 px-4 w-full text-left hover:bg-gray-200 border-t transition-colors duration-300"
                                >
                                  サインアウト
                                </button>
                              </li>
                            </ul>
                          </Popover.Panel>
                        </div>
                      );
                    }}
                  </Popover>
                </div>
              </li>
            </>
          )}
          {/* 非ログイン時の場合 */}
          {!userInfo.isLoading && !userInfo.isLogin && (
            <li className="ml-2">
              <div>
                <button
                  onClick={handleOpenModal}
                  className="block py-2 px-4 hover:bg-gray-50 rounded border shadow-sm hover:shadow transition-all"
                >
                  SignIn
                </button>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
});

Header.displayName = "Header";
