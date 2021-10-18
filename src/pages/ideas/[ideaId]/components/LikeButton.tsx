import { useReactiveVar } from "@apollo/client";
import { memo, useCallback, useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { userInfoVar } from "src/graphql/apollo/cache";
import {
  useCreateLikeMutation,
  useGetMyLikeIdeasLazyQuery,
  useUpdateLikeMutation,
} from "src/graphql/schemas/schema";
import { useAuthModal } from "src/libs/hooks/useAuthModal";

type Props = {
  ideaId: string;
};

// 自分がいいねしているかによって変化
export const LikeButton: React.VFC<Props> = memo((props) => {
  const userInfo = useReactiveVar(userInfoVar);
  const [likeState, setLikeState] = useState<{
    isAlready: null | boolean;
    isLiked: null | boolean;
    likeId: null | string;
  }>({
    isAlready: null,
    isLiked: null,
    likeId: null,
  });
  const { handleOpenModal } = useAuthModal();
  // 自分がいいねしているアイデアを取得するクエリ
  const [query, { data }] = useGetMyLikeIdeasLazyQuery();
  const [createLike, { loading: isCreateLoading }] = useCreateLikeMutation();
  const [updateLike, { loading: isUpdateLoading }] = useUpdateLikeMutation();

  useEffect(() => {
    // ログインしていない場合はstateの初期値を更新するだけ
    if (!userInfo.isLoading && !userInfo.isLogin) {
      return setLikeState({
        likeId: "",
        isAlready: false,
        isLiked: false,
      });
    }
    // ログイン済みであればクエリを実行
    if (!userInfo.isLoading && userInfo.isLogin) {
      query();
      // いいね中のアイデアに、表示しているページのアイデアIDが含まれていれば(1度でもいいねされていれば)isAlreadyをtrueにする
      data?.myLikeIdeas?.edges.forEach((like) => {
        if (like?.node?.likedIdea?.id === props.ideaId) {
          return setLikeState({
            isAlready: true,
            // フラグによって変更
            isLiked: like.node.isLiked,
            likeId: like.node.id,
          });
        } else {
          return setLikeState({
            likeId: "",
            isAlready: false,
            isLiked: false,
          });
        }
      });

      data?.myLikeIdeas?.edges.length === 0 &&
        setLikeState({
          likeId: "",
          isAlready: false,
          isLiked: false,
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.isLoading, data]);

  // いいねボタンをクリックしたときの処理
  const handleClick = useCallback(async () => {
    // ログインしていない場合は認証モーダルを開く
    if (!userInfo.isLoading && !userInfo.isLogin) {
      return handleOpenModal();
    }

    // 1度でもいいねしている場合は、isLikedフラグを逆にして更新
    if (likeState.isAlready) {
      const { errors } = await updateLike({
        variables: {
          likeId: likeState.likeId ?? "",
          isLiked: !likeState.isLiked,
        },
      });
      if (errors) {
        console.error(errors);
      }
      setLikeState((prev) => {
        return {
          ...prev,
          isAlready: true,
          isLiked: !prev.isLiked,
        };
      });
    } else if (!likeState.isAlready && !likeState.isLiked) {
      // 今までに一度もいいねしていない場合は、Likeを作成
      const { data, errors } = await createLike({
        variables: {
          likeTargetType: "Idea",
          likedIdeaId: props.ideaId,
        },
      });
      if (errors) {
        console.error(errors);
      }
      setLikeState({
        likeId: data?.createLike?.like?.id ?? "",
        isAlready: true,
        isLiked: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeState]);

  // 初期値であれば何も表示しない
  if (likeState.isLiked === null) {
    return <div className="w-10 h-10 text-transparent border border-transparent"></div>;
  }

  return (
    <button
      className={`block rounded-full shadow-sm border p-2 hover:shadow ${
        likeState.isLiked && "bg-red-100"
      }`}
      onClick={handleClick}
      disabled={isCreateLoading || isUpdateLoading}
    >
      <FiHeart className="w-8 h-8" />
    </button>
  );
});

LikeButton.displayName = "LikeButton";
