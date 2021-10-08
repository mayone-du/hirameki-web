import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { initializeApollo } from "src/graphql/apollo/client";
import type {
  CreateProfileMutation,
  CreateProfileMutationVariables,
  SocialAuthMutation,
  SocialAuthMutationVariables,
  UpdateProfileMutation,
  UpdateProfileMutationVariables,
} from "src/graphql/schemas/schema";
import { CreateProfileDocument } from "src/graphql/schemas/schema";
import { SocialAuthDocument, UpdateProfileDocument } from "src/graphql/schemas/schema";

// TODO: 各引数で受け取る値の型の修正

/* eslint-disable @typescript-eslint/naming-convention */
const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
// アクセストークンのリフレッシュ用非同期関数
const refreshAccessToken = async (token: any) => {
  // console.log("refreshAccessTokenが呼ばれました");
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : "",
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      idToken: refreshedTokens.id_token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error("refreshAccessTokenError", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

// eslint-disable-next-line import/no-default-export
export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorizationUrl: GOOGLE_AUTHORIZATION_URL,
      // scope: "",
    }),
  ],
  callbacks: {
    // サインイン時の処理
    async signIn(user, account, _profile) {
      // 初回サインイン時にDBにユーザーを登録し、二回目以降はユーザーが存在すればOKにする
      const apolloClient = initializeApollo(null, account.idToken);

      const { data, errors: socialAuthErrors } = await apolloClient.mutate<
        SocialAuthMutation,
        SocialAuthMutationVariables
      >({
        mutation: SocialAuthDocument,
        variables: {
          accessToken: account.accessToken,
        },
      });
      // エラーが無ければOK
      if (socialAuthErrors) {
        console.error(socialAuthErrors);
        return false;
      }

      // プロフィールIDが存在しなければプロフィールを作成（初回のみ）
      if (!data?.socialAuth?.social?.user.relatedUser?.id) {
        const { errors: createProfileErrors } = await apolloClient.mutate<
          CreateProfileMutation,
          CreateProfileMutationVariables
        >({
          mutation: CreateProfileDocument,
          variables: {
            relatedUserId: data?.socialAuth?.social?.user.id ?? "",
            profileName: `${
              data?.socialAuth?.social?.user.firstName &&
              data?.socialAuth?.social?.user.lastName &&
              data.socialAuth.social.user.lastName + data.socialAuth.social.user.firstName
            }`,
            googleImageUrl: user.image ?? "",
          },
        });

        if (createProfileErrors) {
          console.error(createProfileErrors);
          return false;
        }
        return true;
      } else {
        // 存在すればプロフィールのGoogleの画像URLを更新
        const { errors: updateProfileErrors } = await apolloClient.mutate<
          UpdateProfileMutation,
          UpdateProfileMutationVariables
        >({
          mutation: UpdateProfileDocument,
          variables: {
            profileId: data?.socialAuth?.social?.user.relatedUser?.id ?? "",
            googleImageUrl: user.image,
          },
        });

        if (updateProfileErrors) {
          console.error(updateProfileErrors);
          return false;
        }
        return true;
      }
    },

    // リダイレクト時の処理 普通にページ遷移した時に呼び出されるぽい？
    async redirect(url, baseUrl) {
      // eslint-disable-next-line no-console
      console.log("redirect!", url, baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },

    // TODO: 要チェック
    async jwt(token: any, user, account: any, _profile, _isNewUser) {
      // eslint-disable-next-line no-console
      // console.log("NextAuth jwt fn", token, user, account, _profile, _isNewUser);

      // ユーザー情報がすでにある場合？
      if (account && user) {
        return {
          idToken: account.id_token,
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // トークンの期限を確認。有効期限内であればトークンをそのまま返却
      if (Date.now() < token.accessTokenExpires) {
        // console.log("トークンは有効です。");
        return token;
      }

      // console.log("トークンは無効です。");
      // アクセストークンの期限が切れていたら更新してその値を返す
      return refreshAccessToken(token);
    },

    async session(session: any, token) {
      // tokenが存在する場合はidTokenなどをセットする
      if (token) {
        session.user = token.user;
        session.idToken = token.idToken;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
  },
});
