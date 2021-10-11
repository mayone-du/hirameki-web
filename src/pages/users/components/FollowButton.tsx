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
  const [query, { data }] = useGetMyFollowingsLazyQuery();
  const [createFollow, { loading: isCreateLoading }] = useCreateFollowMutation();
  const [updateFollow, { loading: isUpdateLoading }] = useUpdateFollowMutation();

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
      const { errors } = await createFollow({
        variables: {
          followedUserId: props.pageUserId,
        },
      });
      if (errors) {
        console.error(errors);
      }
      setFollowingState((prev) => {
        return {
          ...prev,
          isFollowing: true,
        };
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followingState]);

  useEffect(() => {
    // ログイン済みであればクエリを実行
    if (!userInfo.isLoading && userInfo.isLogin) {
      query();
      // フォロー中のユーザーに、表示しているページのユーザーIDが含まれていれば(1度でもフォローされていれば)isAlreadyをtrueにする
      data?.myFollowings?.edges.forEach((follow) => {
        if (follow?.node?.followedUser.id === props.pageUserId) {
          setFollowingState({
            isAlready: true,
            // フラグによって変更
            isFollowing: follow.node.isFollowing,
            followId: follow.node.id,
          });
        } else {
          setFollowingState({
            followId: "",
            isAlready: false,
            isFollowing: false,
          });
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.isLoading, data]);

  // 初期値であれば何も表示しない
  if (followingState.isFollowing === null) {
    return null;
  }

  return (
    <button
      className={`block p-2 rounded-xl shadow-sm hover:shadow ${
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
