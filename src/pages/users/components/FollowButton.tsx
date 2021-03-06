import { useReactiveVar } from "@apollo/client";
import { memo, useCallback, useEffect, useState } from "react";
import { userInfoVar } from "src/graphql/apollo/cache";
import {
  useCreateFollowMutation,
  useGetMyFollowingsLazyQuery,
  useUpdateFollowMutation,
} from "src/graphql/schemas/schema";
import { useAuthModal } from "src/libs/hooks/useAuthModal";

type Props = {
  pageUserId: string;
};

// 自分がフォローしているかによって変化
export const FollowButton: React.VFC<Props> = memo((props) => {
  const userInfo = useReactiveVar(userInfoVar);
  const [followingState, setFollowingState] = useState<{
    isAlready: null | boolean;
    isFollowing: null | boolean;
    followId: null | string;
  }>({
    isAlready: null,
    isFollowing: null,
    followId: null,
  });
  const { handleOpenModal } = useAuthModal();
  // 自分がフォローしているユーザーを取得するクエリ
  const [query, { data }] = useGetMyFollowingsLazyQuery({ fetchPolicy: "network-only" });
  const [createFollow, { loading: isCreateLoading }] = useCreateFollowMutation();
  const [updateFollow, { loading: isUpdateLoading }] = useUpdateFollowMutation();

  useEffect(() => {
    // ログインしていない場合はstateの初期値を更新するだけ
    if (!userInfo.isLoading && !userInfo.isLogin) {
      return setFollowingState({
        followId: "",
        isAlready: false,
        isFollowing: false,
      });
    }
    // ログイン済みであればクエリを実行
    if (!userInfo.isLoading && userInfo.isLogin) {
      query();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.isLoading]);

  useEffect(() => {
    if (!data?.myFollowings) return;
    let isAlready: null | boolean = null,
      isFollowing: null | boolean = null,
      followId = "";
    // フォロー中のユーザーに、表示しているページのユーザーIDが含まれていれば(1度でもフォローされていれば)isAlreadyをtrueにする
    data.myFollowings.edges.forEach((follow) => {
      if (follow?.node?.followedUser.id === props.pageUserId) {
        return (
          (isAlready = true), (isFollowing = follow.node.isFollowing), (followId = follow.node.id)
        );
      }
    });

    if (isAlready) {
      return setFollowingState({
        isAlready: isAlready,
        // フラグによって変更
        isFollowing: isFollowing,
        followId: followId,
      });
    }
    if (followingState.isAlready === null) {
      return setFollowingState({
        followId: "",
        isAlready: false,
        isFollowing: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // フォローボタンをクリックしたときの処理
  const handleClick = useCallback(async () => {
    // ログインしていない場合は認証モーダルを開く
    if (!userInfo.isLoading && !userInfo.isLogin) {
      return handleOpenModal();
    }

    // 1度でもフォローしている場合は、isFollowingフラグを逆にして更新
    if (followingState.isAlready) {
      const { errors } = await updateFollow({
        variables: {
          followId: followingState.followId ?? "",
          isFollowing: !followingState.isFollowing,
        },
      });
      if (errors) {
        console.error(errors);
      }
      setFollowingState((prev) => {
        return {
          ...prev,
          isAlready: true,
          isFollowing: !prev.isFollowing,
        };
      });
    } else if (!followingState.isAlready && !followingState.isFollowing) {
      // 今までに一度もフォローしていない場合は、Followを作成
      const { data, errors } = await createFollow({
        variables: {
          followedUserId: props.pageUserId,
        },
      });
      if (errors) {
        console.error(errors);
      }
      setFollowingState({
        followId: data?.createFollow?.follow?.id ?? "",
        isAlready: true,
        isFollowing: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followingState]);

  // 初期値であれば何も表示しない
  if (followingState.isFollowing === null) {
    return <div className="py-1 px-2 text-transparent border border-transparent"> </div>;
  }

  return (
    <button
      className={`block py-1 px-2 rounded shadow-sm border hover:shadow ${
        followingState.isFollowing ? "bg-blue-200" : "bg-red-200"
      }`}
      onClick={handleClick}
      disabled={isCreateLoading || isUpdateLoading}
    >
      {followingState.isFollowing ? "UnFollow" : "Follow"}
    </button>
  );
});

FollowButton.displayName = "FollowButton";
