import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  SocialCamelJSON: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

export type AnnounceNode = Node & {
  __typename?: 'AnnounceNode';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  isImportant: Scalars['Boolean'];
  title: Scalars['String'];
};

export type AnnounceNodeConnection = {
  __typename?: 'AnnounceNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<AnnounceNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `AnnounceNode` and its cursor. */
export type AnnounceNodeEdge = {
  __typename?: 'AnnounceNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<AnnounceNode>;
};

export type CommentNode = Node & {
  __typename?: 'CommentNode';
  commentor: UserNode;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  isModified: Scalars['Boolean'];
  isPublished: Scalars['Boolean'];
  likedComment: LikeNodeConnection;
  targetThread: ThreadNode;
  updatedAt: Scalars['DateTime'];
};


export type CommentNodeLikedCommentArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isLiked?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  likeTargetType?: Maybe<Scalars['String']>;
  likedUser?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
};

export type CommentNodeConnection = {
  __typename?: 'CommentNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<CommentNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `CommentNode` and its cursor. */
export type CommentNodeEdge = {
  __typename?: 'CommentNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<CommentNode>;
};

export type CreateCommentMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  targetThreadId: Scalars['ID'];
};

export type CreateCommentMutationPayload = {
  __typename?: 'CreateCommentMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  comment?: Maybe<CommentNode>;
};

export type CreateFollowMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  followedUserId: Scalars['ID'];
};

export type CreateFollowMutationPayload = {
  __typename?: 'CreateFollowMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  follow?: Maybe<FollowNode>;
};

export type CreateIdeaMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  isPublished?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  topicIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type CreateIdeaMutationPayload = {
  __typename?: 'CreateIdeaMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  idea?: Maybe<IdeaNode>;
};

export type CreateLikeMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  likeTargetType: Scalars['String'];
  likedCommentId?: Maybe<Scalars['ID']>;
  likedIdeaId?: Maybe<Scalars['ID']>;
  likedMemoId?: Maybe<Scalars['ID']>;
};

export type CreateLikeMutationPayload = {
  __typename?: 'CreateLikeMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  like?: Maybe<LikeNode>;
};

export type CreateMemoMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateMemoMutationPayload = {
  __typename?: 'CreateMemoMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  memo?: Maybe<MemoNode>;
};

export type CreateNotificationMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  notificationRecieverId: Scalars['ID'];
  notificationType: Scalars['String'];
  notifiedItemId: Scalars['Int'];
  notifiedItemType: Scalars['String'];
};

export type CreateNotificationMutationPayload = {
  __typename?: 'CreateNotificationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  notification?: Maybe<NotificationNode>;
};

export type CreateProfileMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  googleImageUrl: Scalars['String'];
  profileName: Scalars['String'];
  relatedUserId: Scalars['ID'];
};

export type CreateProfileMutationPayload = {
  __typename?: 'CreateProfileMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  profile?: Maybe<ProfileNode>;
};

export type CreateReportMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  title: Scalars['String'];
};

export type CreateReportMutationPayload = {
  __typename?: 'CreateReportMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  report?: Maybe<ReportNode>;
};

export type CreateThreadMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  targetIdeaId?: Maybe<Scalars['ID']>;
  targetMemoId?: Maybe<Scalars['ID']>;
  threadTargetType: Scalars['String'];
};

export type CreateThreadMutationPayload = {
  __typename?: 'CreateThreadMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  thread?: Maybe<ThreadNode>;
};


export type DeleteCommentMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  commentId: Scalars['ID'];
};

export type DeleteCommentMutationPayload = {
  __typename?: 'DeleteCommentMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  comment?: Maybe<CommentNode>;
};

export type DeleteIdeaMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  ideaId: Scalars['ID'];
};

export type DeleteIdeaMutationPayload = {
  __typename?: 'DeleteIdeaMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  idea?: Maybe<IdeaNode>;
};

export type DeleteMemoMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  memoId: Scalars['ID'];
};

export type DeleteMemoMutationPayload = {
  __typename?: 'DeleteMemoMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  memo?: Maybe<MemoNode>;
};

export type FollowNode = Node & {
  __typename?: 'FollowNode';
  followedUser: UserNode;
  followingUser: UserNode;
  /** The ID of the object. */
  id: Scalars['ID'];
  isFollowing: Scalars['Boolean'];
};

export type FollowNodeConnection = {
  __typename?: 'FollowNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<FollowNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `FollowNode` and its cursor. */
export type FollowNodeEdge = {
  __typename?: 'FollowNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<FollowNode>;
};

export type IdeaNode = Node & {
  __typename?: 'IdeaNode';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  ideaCreator: UserNode;
  isPublished: Scalars['Boolean'];
  likedIdea: LikeNodeConnection;
  targetIdea: ThreadNodeConnection;
  title: Scalars['String'];
  topics: TopicNodeConnection;
  updatedAt: Scalars['DateTime'];
};


export type IdeaNodeLikedIdeaArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isLiked?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  likeTargetType?: Maybe<Scalars['String']>;
  likedUser?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
};


export type IdeaNodeTargetIdeaArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  threadTargetType?: Maybe<Scalars['String']>;
  threadTargetType_Icontains?: Maybe<Scalars['String']>;
};


export type IdeaNodeTopicsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  name_Icontains?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
};

export type IdeaNodeConnection = {
  __typename?: 'IdeaNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<IdeaNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `IdeaNode` and its cursor. */
export type IdeaNodeEdge = {
  __typename?: 'IdeaNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<IdeaNode>;
};

/** An enumeration. */
export enum LikeLikeTargetType {
  /** コメント */
  Comment = 'COMMENT',
  /** アイデア */
  Idea = 'IDEA',
  /** メモ */
  Memo = 'MEMO'
}

export type LikeNode = Node & {
  __typename?: 'LikeNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  isLiked: Scalars['Boolean'];
  likeTargetType: LikeLikeTargetType;
  likedComment?: Maybe<CommentNode>;
  likedIdea?: Maybe<IdeaNode>;
  likedMemo?: Maybe<MemoNode>;
  likedUser: UserNode;
};

export type LikeNodeConnection = {
  __typename?: 'LikeNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LikeNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `LikeNode` and its cursor. */
export type LikeNodeEdge = {
  __typename?: 'LikeNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<LikeNode>;
};

export type MemoNode = Node & {
  __typename?: 'MemoNode';
  createdAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  isPublished: Scalars['Boolean'];
  likedMemo: LikeNodeConnection;
  memoCreator: UserNode;
  targetMemo: ThreadNodeConnection;
  title: Scalars['String'];
};


export type MemoNodeLikedMemoArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isLiked?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  likeTargetType?: Maybe<Scalars['String']>;
  likedUser?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
};


export type MemoNodeTargetMemoArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  threadTargetType?: Maybe<Scalars['String']>;
  threadTargetType_Icontains?: Maybe<Scalars['String']>;
};

export type MemoNodeConnection = {
  __typename?: 'MemoNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<MemoNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `MemoNode` and its cursor. */
export type MemoNodeEdge = {
  __typename?: 'MemoNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<MemoNode>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<CreateCommentMutationPayload>;
  createFollow?: Maybe<CreateFollowMutationPayload>;
  createIdea?: Maybe<CreateIdeaMutationPayload>;
  createLike?: Maybe<CreateLikeMutationPayload>;
  createMemo?: Maybe<CreateMemoMutationPayload>;
  createNotification?: Maybe<CreateNotificationMutationPayload>;
  createProfile?: Maybe<CreateProfileMutationPayload>;
  createReport?: Maybe<CreateReportMutationPayload>;
  createThread?: Maybe<CreateThreadMutationPayload>;
  deleteComment?: Maybe<DeleteCommentMutationPayload>;
  deleteIdea?: Maybe<DeleteIdeaMutationPayload>;
  deleteMemo?: Maybe<DeleteMemoMutationPayload>;
  /** Social Auth Mutation */
  socialAuth?: Maybe<SocialAuth>;
  updateComment?: Maybe<UpdateCommentMutationPayload>;
  updateFollow?: Maybe<UpdateFollowMutationPayload>;
  updateIdea?: Maybe<UpdateIdeaMutationPayload>;
  updateLike?: Maybe<UpdateLikeMutationPayload>;
  updateMemo?: Maybe<UpdateMemoMutationPayload>;
  updateNotification?: Maybe<UpdateNotificationMutationPayload>;
  updateProfile?: Maybe<UpdateProfileMutationPayload>;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentMutationInput;
};


export type MutationCreateFollowArgs = {
  input: CreateFollowMutationInput;
};


export type MutationCreateIdeaArgs = {
  input: CreateIdeaMutationInput;
};


export type MutationCreateLikeArgs = {
  input: CreateLikeMutationInput;
};


export type MutationCreateMemoArgs = {
  input: CreateMemoMutationInput;
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationMutationInput;
};


export type MutationCreateProfileArgs = {
  input: CreateProfileMutationInput;
};


export type MutationCreateReportArgs = {
  input: CreateReportMutationInput;
};


export type MutationCreateThreadArgs = {
  input: CreateThreadMutationInput;
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentMutationInput;
};


export type MutationDeleteIdeaArgs = {
  input: DeleteIdeaMutationInput;
};


export type MutationDeleteMemoArgs = {
  input: DeleteMemoMutationInput;
};


export type MutationSocialAuthArgs = {
  accessToken: Scalars['String'];
  provider: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentMutationInput;
};


export type MutationUpdateFollowArgs = {
  input: UpdateFollowMutationInput;
};


export type MutationUpdateIdeaArgs = {
  input: UpdateIdeaMutationInput;
};


export type MutationUpdateLikeArgs = {
  input: UpdateLikeMutationInput;
};


export type MutationUpdateMemoArgs = {
  input: UpdateMemoMutationInput;
};


export type MutationUpdateNotificationArgs = {
  input: UpdateNotificationMutationInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileMutationInput;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type NotificationNode = Node & {
  __typename?: 'NotificationNode';
  createdAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  isChecked: Scalars['Boolean'];
  notificationReciever: UserNode;
  notificationType: NotificationNotificationType;
  notificator: UserNode;
  notifiedItemId: Scalars['Int'];
  notifiedItemType: NotificationNotifiedItemType;
};

export type NotificationNodeConnection = {
  __typename?: 'NotificationNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<NotificationNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `NotificationNode` and its cursor. */
export type NotificationNodeEdge = {
  __typename?: 'NotificationNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<NotificationNode>;
};

/** An enumeration. */
export enum NotificationNotificationType {
  /** お知らせ */
  Announce = 'ANNOUNCE',
  /** コメント */
  Comment = 'COMMENT',
  /** フォロー */
  Follow = 'FOLLOW',
  /** いいね */
  Like = 'LIKE'
}

/** An enumeration. */
export enum NotificationNotifiedItemType {
  /** お知らせ */
  Announce = 'ANNOUNCE',
  /** コメント */
  Comment = 'COMMENT',
  /** フォローされたユーザー */
  Followeduser = 'FOLLOWEDUSER',
  /** アイデア */
  Idea = 'IDEA',
  /** メモ */
  Memo = 'MEMO'
}

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type ProfileNode = Node & {
  __typename?: 'ProfileNode';
  githubUsername?: Maybe<Scalars['String']>;
  googleImageUrl?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  profileImage?: Maybe<Scalars['String']>;
  profileName: Scalars['String'];
  relatedUser: UserNode;
  selfIntroduction?: Maybe<Scalars['String']>;
  twitterUsername?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
};

export type ProfileNodeConnection = {
  __typename?: 'ProfileNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ProfileNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ProfileNode` and its cursor. */
export type ProfileNodeEdge = {
  __typename?: 'ProfileNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ProfileNode>;
};

export type Query = {
  __typename?: 'Query';
  allAnnounce?: Maybe<AnnounceNodeConnection>;
  allIdeas?: Maybe<IdeaNodeConnection>;
  allMemos?: Maybe<MemoNodeConnection>;
  allMyNotifications?: Maybe<NotificationNodeConnection>;
  allProfiles?: Maybe<ProfileNodeConnection>;
  allTopics?: Maybe<TopicNodeConnection>;
  allUsers?: Maybe<UserNodeConnection>;
  idea?: Maybe<IdeaNode>;
  memo?: Maybe<MemoNode>;
  myAllIdeas?: Maybe<IdeaNodeConnection>;
  myAllMemos?: Maybe<MemoNodeConnection>;
  myFollowings?: Maybe<FollowNodeConnection>;
  myLikeIdeas?: Maybe<LikeNodeConnection>;
  myLikeMemos?: Maybe<LikeNodeConnection>;
  myUserInfo?: Maybe<UserNode>;
  topic?: Maybe<TopicNode>;
  user?: Maybe<UserNode>;
};


export type QueryAllAnnounceArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  content_Icontains?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isImportant?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
};


export type QueryAllIdeasArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  content_Icontains?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  ideaCreator?: Maybe<Scalars['ID']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
};


export type QueryAllMemosArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  memoCreator?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
};


export type QueryAllMyNotificationsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isChecked?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  notificationReciever?: Maybe<Scalars['ID']>;
  notificationType?: Maybe<Scalars['String']>;
  notificator?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAllProfilesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  githubUsername?: Maybe<Scalars['String']>;
  githubUsername_Icontains?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  profileName?: Maybe<Scalars['String']>;
  profileName_Icontains?: Maybe<Scalars['String']>;
  selfIntroduction?: Maybe<Scalars['String']>;
  selfIntroduction_Icontains?: Maybe<Scalars['String']>;
  twitterUsername?: Maybe<Scalars['String']>;
  twitterUsername_Icontains?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
  websiteUrl_Icontains?: Maybe<Scalars['String']>;
};


export type QueryAllTopicsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  name_Icontains?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAllUsersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_Icontains?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isStaff?: Maybe<Scalars['Boolean']>;
  isSuperuser?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  username_Icontains?: Maybe<Scalars['String']>;
};


export type QueryIdeaArgs = {
  id: Scalars['ID'];
};


export type QueryMemoArgs = {
  id: Scalars['ID'];
};


export type QueryMyAllIdeasArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  content_Icontains?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  ideaCreator?: Maybe<Scalars['ID']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
};


export type QueryMyAllMemosArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  memoCreator?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
};


export type QueryMyFollowingsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  followedUser?: Maybe<Scalars['ID']>;
  followingUser?: Maybe<Scalars['ID']>;
  isFollowing?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryMyLikeIdeasArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isLiked?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  likeTargetType?: Maybe<Scalars['String']>;
  likedUser?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryMyLikeMemosArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isLiked?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  likeTargetType?: Maybe<Scalars['String']>;
  likedUser?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryTopicArgs = {
  topicName: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type ReportNode = Node & {
  __typename?: 'ReportNode';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  reporter: UserNode;
  title: Scalars['String'];
};

export type ReportNodeConnection = {
  __typename?: 'ReportNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ReportNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ReportNode` and its cursor. */
export type ReportNodeEdge = {
  __typename?: 'ReportNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ReportNode>;
};

/** Social Auth Mutation */
export type SocialAuth = {
  __typename?: 'SocialAuth';
  social?: Maybe<SocialType>;
};


export type SocialNode = Node & {
  __typename?: 'SocialNode';
  created: Scalars['DateTime'];
  extraData?: Maybe<Scalars['SocialCamelJSON']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  modified: Scalars['DateTime'];
  provider: Scalars['String'];
  uid: Scalars['String'];
  user: UserNode;
};

export type SocialNodeConnection = {
  __typename?: 'SocialNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<SocialNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `SocialNode` and its cursor. */
export type SocialNodeEdge = {
  __typename?: 'SocialNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<SocialNode>;
};

export type SocialType = {
  __typename?: 'SocialType';
  created: Scalars['DateTime'];
  extraData?: Maybe<Scalars['SocialCamelJSON']>;
  id: Scalars['ID'];
  modified: Scalars['DateTime'];
  provider: Scalars['String'];
  uid: Scalars['String'];
  user: UserNode;
};

export type Subscription = {
  __typename?: 'Subscription';
  countSeconds?: Maybe<Scalars['Float']>;
  newNotifications?: Maybe<NotificationNodeConnection>;
};


export type SubscriptionCountSecondsArgs = {
  upTo?: Maybe<Scalars['Int']>;
};


export type SubscriptionNewNotificationsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isChecked?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  notificationReciever?: Maybe<Scalars['ID']>;
  notificationType?: Maybe<Scalars['String']>;
  notificator?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
  userId: Scalars['ID'];
};

export type ThreadNode = Node & {
  __typename?: 'ThreadNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  targetIdea?: Maybe<IdeaNode>;
  targetMemo?: Maybe<MemoNode>;
  targetThread: CommentNodeConnection;
  threadTargetType: ThreadThreadTargetType;
};


export type ThreadNodeTargetThreadArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  commentor?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  targetThread?: Maybe<Scalars['ID']>;
};

export type ThreadNodeConnection = {
  __typename?: 'ThreadNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ThreadNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ThreadNode` and its cursor. */
export type ThreadNodeEdge = {
  __typename?: 'ThreadNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ThreadNode>;
};

/** An enumeration. */
export enum ThreadThreadTargetType {
  /** アイデア */
  Idea = 'IDEA',
  /** メモ */
  Memo = 'MEMO'
}

export type TopicNode = Node & {
  __typename?: 'TopicNode';
  displayName: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  topics: IdeaNodeConnection;
};


export type TopicNodeTopicsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  content_Icontains?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  ideaCreator?: Maybe<Scalars['ID']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
};

export type TopicNodeConnection = {
  __typename?: 'TopicNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TopicNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `TopicNode` and its cursor. */
export type TopicNodeEdge = {
  __typename?: 'TopicNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<TopicNode>;
};

export type UpdateCommentMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  commentId: Scalars['ID'];
  content: Scalars['String'];
};

export type UpdateCommentMutationPayload = {
  __typename?: 'UpdateCommentMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  comment?: Maybe<CommentNode>;
};

export type UpdateFollowMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  followId: Scalars['ID'];
  isFollowing: Scalars['Boolean'];
};

export type UpdateFollowMutationPayload = {
  __typename?: 'UpdateFollowMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  follow?: Maybe<FollowNode>;
};

export type UpdateIdeaMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  ideaId: Scalars['ID'];
  isPublished?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  topicIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UpdateIdeaMutationPayload = {
  __typename?: 'UpdateIdeaMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  idea?: Maybe<IdeaNode>;
};

export type UpdateLikeMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  isLiked: Scalars['Boolean'];
  likeId: Scalars['ID'];
};

export type UpdateLikeMutationPayload = {
  __typename?: 'UpdateLikeMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  like?: Maybe<LikeNode>;
};

export type UpdateMemoMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  memoId: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type UpdateMemoMutationPayload = {
  __typename?: 'UpdateMemoMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  memo?: Maybe<MemoNode>;
};

export type UpdateNotificationMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  isChecked: Scalars['Boolean'];
  notificationId: Scalars['ID'];
};

export type UpdateNotificationMutationPayload = {
  __typename?: 'UpdateNotificationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  notification?: Maybe<NotificationNode>;
};

export type UpdateProfileMutationInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  githubUsername?: Maybe<Scalars['String']>;
  googleImageUrl?: Maybe<Scalars['String']>;
  profileId: Scalars['ID'];
  profileImage?: Maybe<Scalars['Upload']>;
  profileName?: Maybe<Scalars['String']>;
  selfIntroduction?: Maybe<Scalars['String']>;
  twitterUsername?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
};

export type UpdateProfileMutationPayload = {
  __typename?: 'UpdateProfileMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  profile?: Maybe<ProfileNode>;
};


export type UserNode = Node & {
  __typename?: 'UserNode';
  commentor: CommentNodeConnection;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  followedUser: FollowNodeConnection;
  followingUser: FollowNodeConnection;
  /** The ID of the object. */
  id: Scalars['ID'];
  ideaCreator: IdeaNodeConnection;
  isActive: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  /** 全ての権限を持っているとみなされます。 */
  isSuperuser: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  lastName?: Maybe<Scalars['String']>;
  likedUser: LikeNodeConnection;
  memoCreator: MemoNodeConnection;
  notificationReciever: NotificationNodeConnection;
  notificator: NotificationNodeConnection;
  password: Scalars['String'];
  relatedUser?: Maybe<ProfileNode>;
  reporter: ReportNodeConnection;
  socialAuth: SocialNodeConnection;
  username: Scalars['String'];
};


export type UserNodeCommentorArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  commentor?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  targetThread?: Maybe<Scalars['ID']>;
};


export type UserNodeFollowedUserArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  followedUser?: Maybe<Scalars['ID']>;
  followingUser?: Maybe<Scalars['ID']>;
  isFollowing?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type UserNodeFollowingUserArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  followedUser?: Maybe<Scalars['ID']>;
  followingUser?: Maybe<Scalars['ID']>;
  isFollowing?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type UserNodeIdeaCreatorArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  content_Icontains?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  ideaCreator?: Maybe<Scalars['ID']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
};


export type UserNodeLikedUserArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isLiked?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  likeTargetType?: Maybe<Scalars['String']>;
  likedUser?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
};


export type UserNodeMemoCreatorArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  memoCreator?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
};


export type UserNodeNotificationRecieverArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isChecked?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  notificationReciever?: Maybe<Scalars['ID']>;
  notificationType?: Maybe<Scalars['String']>;
  notificator?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
};


export type UserNodeNotificatorArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  isChecked?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  notificationReciever?: Maybe<Scalars['ID']>;
  notificationType?: Maybe<Scalars['String']>;
  notificator?: Maybe<Scalars['ID']>;
  offset?: Maybe<Scalars['Int']>;
};


export type UserNodeReporterArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  content_Icontains?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
};


export type UserNodeSocialAuthArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  provider?: Maybe<Scalars['String']>;
  provider_In?: Maybe<Array<Maybe<Scalars['String']>>>;
  uid?: Maybe<Scalars['String']>;
  uid_In?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UserNodeConnection = {
  __typename?: 'UserNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `UserNode` and its cursor. */
export type UserNodeEdge = {
  __typename?: 'UserNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<UserNode>;
};

export type CreateCommentMutationVariables = Exact<{
  targetThreadId: Scalars['ID'];
  content: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment?: Maybe<(
    { __typename?: 'CreateCommentMutationPayload' }
    & { comment?: Maybe<(
      { __typename?: 'CommentNode' }
      & Pick<CommentNode, 'id'>
    )> }
  )> }
);

export type CreateFollowMutationVariables = Exact<{
  followedUserId: Scalars['ID'];
}>;


export type CreateFollowMutation = (
  { __typename?: 'Mutation' }
  & { createFollow?: Maybe<(
    { __typename?: 'CreateFollowMutationPayload' }
    & { follow?: Maybe<(
      { __typename?: 'FollowNode' }
      & Pick<FollowNode, 'id'>
    )> }
  )> }
);

export type UpdateFollowMutationVariables = Exact<{
  followId: Scalars['ID'];
  isFollowing: Scalars['Boolean'];
}>;


export type UpdateFollowMutation = (
  { __typename?: 'Mutation' }
  & { updateFollow?: Maybe<(
    { __typename?: 'UpdateFollowMutationPayload' }
    & { follow?: Maybe<(
      { __typename?: 'FollowNode' }
      & Pick<FollowNode, 'id'>
    )> }
  )> }
);

export type CreateIdeaMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  isPublished?: Maybe<Scalars['Boolean']>;
  topicIds?: Maybe<Array<Maybe<Scalars['ID']>> | Maybe<Scalars['ID']>>;
}>;


export type CreateIdeaMutation = (
  { __typename?: 'Mutation' }
  & { createIdea?: Maybe<(
    { __typename?: 'CreateIdeaMutationPayload' }
    & { idea?: Maybe<(
      { __typename?: 'IdeaNode' }
      & Pick<IdeaNode, 'id'>
    )> }
  )> }
);

export type UpdateIdeaMutationVariables = Exact<{
  ideaId: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  topicIds?: Maybe<Array<Maybe<Scalars['ID']>> | Maybe<Scalars['ID']>>;
  isPublished?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateIdeaMutation = (
  { __typename?: 'Mutation' }
  & { updateIdea?: Maybe<(
    { __typename?: 'UpdateIdeaMutationPayload' }
    & { idea?: Maybe<(
      { __typename?: 'IdeaNode' }
      & Pick<IdeaNode, 'id'>
    )> }
  )> }
);

export type CreateLikeMutationVariables = Exact<{
  likeTargetType: Scalars['String'];
  likedIdeaId?: Maybe<Scalars['ID']>;
  likedMemoId?: Maybe<Scalars['ID']>;
  likedCommentId?: Maybe<Scalars['ID']>;
}>;


export type CreateLikeMutation = (
  { __typename?: 'Mutation' }
  & { createLike?: Maybe<(
    { __typename?: 'CreateLikeMutationPayload' }
    & { like?: Maybe<(
      { __typename?: 'LikeNode' }
      & Pick<LikeNode, 'id'>
    )> }
  )> }
);

export type UpdateLikeMutationVariables = Exact<{
  likeId: Scalars['ID'];
  isLiked: Scalars['Boolean'];
}>;


export type UpdateLikeMutation = (
  { __typename?: 'Mutation' }
  & { updateLike?: Maybe<(
    { __typename?: 'UpdateLikeMutationPayload' }
    & { like?: Maybe<(
      { __typename?: 'LikeNode' }
      & Pick<LikeNode, 'id'>
    )> }
  )> }
);

export type CreateMemoMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateMemoMutation = (
  { __typename?: 'Mutation' }
  & { createMemo?: Maybe<(
    { __typename?: 'CreateMemoMutationPayload' }
    & { memo?: Maybe<(
      { __typename?: 'MemoNode' }
      & Pick<MemoNode, 'id'>
    )> }
  )> }
);

export type CreateProfileMutationVariables = Exact<{
  relatedUserId: Scalars['ID'];
  profileName: Scalars['String'];
  googleImageUrl: Scalars['String'];
}>;


export type CreateProfileMutation = (
  { __typename?: 'Mutation' }
  & { createProfile?: Maybe<(
    { __typename?: 'CreateProfileMutationPayload' }
    & { profile?: Maybe<(
      { __typename?: 'ProfileNode' }
      & Pick<ProfileNode, 'id'>
    )> }
  )> }
);

export type UpdateProfileMutationVariables = Exact<{
  profileId: Scalars['ID'];
  profileName?: Maybe<Scalars['String']>;
  selfIntroduction?: Maybe<Scalars['String']>;
  googleImageUrl?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['Upload']>;
  githubUsername?: Maybe<Scalars['String']>;
  twitterUsername?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile?: Maybe<(
    { __typename?: 'UpdateProfileMutationPayload' }
    & { profile?: Maybe<(
      { __typename?: 'ProfileNode' }
      & Pick<ProfileNode, 'id'>
    )> }
  )> }
);

export type SocialAuthMutationVariables = Exact<{
  accessToken: Scalars['String'];
}>;


export type SocialAuthMutation = (
  { __typename?: 'Mutation' }
  & { socialAuth?: Maybe<(
    { __typename?: 'SocialAuth' }
    & { social?: Maybe<(
      { __typename?: 'SocialType' }
      & Pick<SocialType, 'id'>
      & { user: (
        { __typename?: 'UserNode' }
        & Pick<UserNode, 'id' | 'firstName' | 'lastName'>
        & { relatedUser?: Maybe<(
          { __typename?: 'ProfileNode' }
          & Pick<ProfileNode, 'id'>
        )> }
      ) }
    )> }
  )> }
);

export type CreateThreadMutationVariables = Exact<{
  threadTargetType: Scalars['String'];
  targetIdeaId?: Maybe<Scalars['ID']>;
  targetMemoId?: Maybe<Scalars['ID']>;
}>;


export type CreateThreadMutation = (
  { __typename?: 'Mutation' }
  & { createThread?: Maybe<(
    { __typename?: 'CreateThreadMutationPayload' }
    & { thread?: Maybe<(
      { __typename?: 'ThreadNode' }
      & Pick<ThreadNode, 'id'>
    )> }
  )> }
);

export type GetMyFollowingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyFollowingsQuery = (
  { __typename?: 'Query' }
  & { myFollowings?: Maybe<(
    { __typename?: 'FollowNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'FollowNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'FollowNode' }
        & Pick<FollowNode, 'id' | 'isFollowing'>
        & { followedUser: (
          { __typename?: 'UserNode' }
          & Pick<UserNode, 'id'>
        ) }
      )> }
    )>> }
  )> }
);

export type GetIndexPageItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIndexPageItemsQuery = (
  { __typename?: 'Query' }
  & { allIdeas?: Maybe<(
    { __typename?: 'IdeaNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'IdeaNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'IdeaNode' }
        & Pick<IdeaNode, 'id' | 'title' | 'content' | 'createdAt'>
        & { topics: (
          { __typename?: 'TopicNodeConnection' }
          & { edges: Array<Maybe<(
            { __typename?: 'TopicNodeEdge' }
            & { node?: Maybe<(
              { __typename?: 'TopicNode' }
              & Pick<TopicNode, 'id' | 'name'>
            )> }
          )>> }
        ), ideaCreator: (
          { __typename?: 'UserNode' }
          & Pick<UserNode, 'id'>
          & { relatedUser?: Maybe<(
            { __typename?: 'ProfileNode' }
            & Pick<ProfileNode, 'profileName' | 'profileImage' | 'googleImageUrl'>
          )> }
        ), likedIdea: (
          { __typename?: 'LikeNodeConnection' }
          & { edges: Array<Maybe<(
            { __typename?: 'LikeNodeEdge' }
            & { node?: Maybe<(
              { __typename?: 'LikeNode' }
              & Pick<LikeNode, 'id'>
            )> }
          )>> }
        ) }
      )> }
    )>> }
  )>, allMemos?: Maybe<(
    { __typename?: 'MemoNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'MemoNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'MemoNode' }
        & Pick<MemoNode, 'id' | 'title'>
        & { memoCreator: (
          { __typename?: 'UserNode' }
          & Pick<UserNode, 'id'>
          & { relatedUser?: Maybe<(
            { __typename?: 'ProfileNode' }
            & Pick<ProfileNode, 'profileName' | 'profileImage' | 'googleImageUrl'>
          )> }
        ), likedMemo: (
          { __typename?: 'LikeNodeConnection' }
          & { edges: Array<Maybe<(
            { __typename?: 'LikeNodeEdge' }
            & { node?: Maybe<(
              { __typename?: 'LikeNode' }
              & Pick<LikeNode, 'id'>
            )> }
          )>> }
        ) }
      )> }
    )>> }
  )> }
);

export type GetMyAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyAllPostsQuery = (
  { __typename?: 'Query' }
  & { myAllIdeas?: Maybe<(
    { __typename?: 'IdeaNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'IdeaNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'IdeaNode' }
        & Pick<IdeaNode, 'id' | 'title' | 'isPublished' | 'createdAt'>
      )> }
    )>> }
  )>, myAllMemos?: Maybe<(
    { __typename?: 'MemoNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'MemoNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'MemoNode' }
        & Pick<MemoNode, 'id' | 'title' | 'isPublished' | 'createdAt'>
      )> }
    )>> }
  )> }
);

export type GetAllIdeasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllIdeasQuery = (
  { __typename?: 'Query' }
  & { allIdeas?: Maybe<(
    { __typename?: 'IdeaNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'IdeaNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'IdeaNode' }
        & Pick<IdeaNode, 'id' | 'title' | 'content'>
        & { ideaCreator: (
          { __typename?: 'UserNode' }
          & Pick<UserNode, 'id'>
          & { relatedUser?: Maybe<(
            { __typename?: 'ProfileNode' }
            & Pick<ProfileNode, 'id' | 'profileName' | 'profileImage' | 'googleImageUrl'>
          )> }
        ) }
      )> }
    )>> }
  )> }
);

export type GetIdeaQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetIdeaQuery = (
  { __typename?: 'Query' }
  & { idea?: Maybe<(
    { __typename?: 'IdeaNode' }
    & Pick<IdeaNode, 'id' | 'title' | 'content' | 'isPublished' | 'createdAt' | 'updatedAt'>
    & { topics: (
      { __typename?: 'TopicNodeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'TopicNodeEdge' }
        & { node?: Maybe<(
          { __typename?: 'TopicNode' }
          & Pick<TopicNode, 'id' | 'name'>
        )> }
      )>> }
    ), ideaCreator: (
      { __typename?: 'UserNode' }
      & Pick<UserNode, 'id'>
      & { relatedUser?: Maybe<(
        { __typename?: 'ProfileNode' }
        & Pick<ProfileNode, 'id' | 'profileName' | 'profileImage' | 'googleImageUrl' | 'selfIntroduction' | 'githubUsername' | 'twitterUsername' | 'websiteUrl'>
      )> }
    ), likedIdea: (
      { __typename?: 'LikeNodeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'LikeNodeEdge' }
        & { node?: Maybe<(
          { __typename?: 'LikeNode' }
          & Pick<LikeNode, 'id' | 'isLiked'>
          & { likedUser: (
            { __typename?: 'UserNode' }
            & Pick<UserNode, 'id'>
          ) }
        )> }
      )>> }
    ), targetIdea: (
      { __typename?: 'ThreadNodeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'ThreadNodeEdge' }
        & { node?: Maybe<(
          { __typename?: 'ThreadNode' }
          & Pick<ThreadNode, 'id'>
          & { targetThread: (
            { __typename?: 'CommentNodeConnection' }
            & { edges: Array<Maybe<(
              { __typename?: 'CommentNodeEdge' }
              & { node?: Maybe<(
                { __typename?: 'CommentNode' }
                & Pick<CommentNode, 'id' | 'content' | 'createdAt' | 'updatedAt'>
                & { commentor: (
                  { __typename?: 'UserNode' }
                  & Pick<UserNode, 'id'>
                  & { relatedUser?: Maybe<(
                    { __typename?: 'ProfileNode' }
                    & Pick<ProfileNode, 'id' | 'profileName' | 'profileImage' | 'googleImageUrl'>
                  )> }
                ) }
              )> }
            )>> }
          ) }
        )> }
      )>> }
    ) }
  )> }
);

export type GetMyAllLikesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyAllLikesQuery = (
  { __typename?: 'Query' }
  & { myLikeIdeas?: Maybe<(
    { __typename?: 'LikeNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'LikeNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'LikeNode' }
        & Pick<LikeNode, 'id'>
        & { likedIdea?: Maybe<(
          { __typename?: 'IdeaNode' }
          & Pick<IdeaNode, 'id' | 'title'>
        )> }
      )> }
    )>> }
  )>, myLikeMemos?: Maybe<(
    { __typename?: 'LikeNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'LikeNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'LikeNode' }
        & Pick<LikeNode, 'id'>
        & { likedMemo?: Maybe<(
          { __typename?: 'MemoNode' }
          & Pick<MemoNode, 'id' | 'title'>
        )> }
      )> }
    )>> }
  )> }
);

export type GetMyLikeIdeasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyLikeIdeasQuery = (
  { __typename?: 'Query' }
  & { myLikeIdeas?: Maybe<(
    { __typename?: 'LikeNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'LikeNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'LikeNode' }
        & Pick<LikeNode, 'id' | 'isLiked'>
        & { likedIdea?: Maybe<(
          { __typename?: 'IdeaNode' }
          & Pick<IdeaNode, 'id'>
        )> }
      )> }
    )>> }
  )> }
);

export type SearchItemsQueryVariables = Exact<{
  keyword: Scalars['String'];
}>;


export type SearchItemsQuery = (
  { __typename?: 'Query' }
  & { allIdeas?: Maybe<(
    { __typename?: 'IdeaNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'IdeaNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'IdeaNode' }
        & Pick<IdeaNode, 'id' | 'title'>
      )> }
    )>> }
  )>, allMemos?: Maybe<(
    { __typename?: 'MemoNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'MemoNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'MemoNode' }
        & Pick<MemoNode, 'id' | 'title'>
      )> }
    )>> }
  )>, allProfiles?: Maybe<(
    { __typename?: 'ProfileNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'ProfileNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ProfileNode' }
        & Pick<ProfileNode, 'id' | 'profileName'>
      )> }
    )>> }
  )> }
);

export type GetAllTopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTopicsQuery = (
  { __typename?: 'Query' }
  & { allTopics?: Maybe<(
    { __typename?: 'TopicNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'TopicNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'TopicNode' }
        & Pick<TopicNode, 'id' | 'name'>
      )> }
    )>> }
  )> }
);

export type GetTopicQueryVariables = Exact<{
  topicName: Scalars['String'];
}>;


export type GetTopicQuery = (
  { __typename?: 'Query' }
  & { topic?: Maybe<(
    { __typename?: 'TopicNode' }
    & Pick<TopicNode, 'id' | 'displayName'>
    & { topics: (
      { __typename?: 'IdeaNodeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'IdeaNodeEdge' }
        & { node?: Maybe<(
          { __typename?: 'IdeaNode' }
          & Pick<IdeaNode, 'id' | 'title'>
        )> }
      )>> }
    ) }
  )> }
);

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { allUsers?: Maybe<(
    { __typename?: 'UserNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'UserNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'UserNode' }
        & Pick<UserNode, 'id' | 'username'>
        & { relatedUser?: Maybe<(
          { __typename?: 'ProfileNode' }
          & Pick<ProfileNode, 'id' | 'profileName' | 'selfIntroduction'>
        )> }
      )> }
    )>> }
  )> }
);

export type GetMyUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyUserInfoQuery = (
  { __typename?: 'Query' }
  & { myUserInfo?: Maybe<(
    { __typename?: 'UserNode' }
    & Pick<UserNode, 'id'>
    & { relatedUser?: Maybe<(
      { __typename?: 'ProfileNode' }
      & Pick<ProfileNode, 'profileName' | 'profileImage'>
    )> }
  )> }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'UserNode' }
    & Pick<UserNode, 'id' | 'username'>
    & { relatedUser?: Maybe<(
      { __typename?: 'ProfileNode' }
      & Pick<ProfileNode, 'id' | 'profileName' | 'profileImage' | 'googleImageUrl' | 'selfIntroduction' | 'githubUsername' | 'twitterUsername' | 'websiteUrl'>
    )>, followedUser: (
      { __typename?: 'FollowNodeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'FollowNodeEdge' }
        & { node?: Maybe<(
          { __typename?: 'FollowNode' }
          & Pick<FollowNode, 'id' | 'isFollowing'>
          & { followingUser: (
            { __typename?: 'UserNode' }
            & Pick<UserNode, 'id'>
            & { relatedUser?: Maybe<(
              { __typename?: 'ProfileNode' }
              & Pick<ProfileNode, 'profileName' | 'profileImage' | 'googleImageUrl'>
            )> }
          ) }
        )> }
      )>> }
    ), ideaCreator: (
      { __typename?: 'IdeaNodeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'IdeaNodeEdge' }
        & { node?: Maybe<(
          { __typename?: 'IdeaNode' }
          & Pick<IdeaNode, 'id' | 'title' | 'isPublished' | 'createdAt' | 'updatedAt'>
          & { topics: (
            { __typename?: 'TopicNodeConnection' }
            & { edges: Array<Maybe<(
              { __typename?: 'TopicNodeEdge' }
              & { node?: Maybe<(
                { __typename?: 'TopicNode' }
                & Pick<TopicNode, 'id' | 'name'>
              )> }
            )>> }
          ), likedIdea: (
            { __typename?: 'LikeNodeConnection' }
            & { edges: Array<Maybe<(
              { __typename?: 'LikeNodeEdge' }
              & { node?: Maybe<(
                { __typename?: 'LikeNode' }
                & Pick<LikeNode, 'id'>
              )> }
            )>> }
          ) }
        )> }
      )>> }
    ) }
  )> }
);

export type GetUserSettingsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserSettingsQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'UserNode' }
    & Pick<UserNode, 'id'>
    & { relatedUser?: Maybe<(
      { __typename?: 'ProfileNode' }
      & Pick<ProfileNode, 'id' | 'profileName' | 'profileImage' | 'googleImageUrl' | 'selfIntroduction' | 'githubUsername' | 'twitterUsername' | 'websiteUrl'>
    )> }
  )> }
);

export type CountSecondsSubscriptionVariables = Exact<{
  seconds: Scalars['Int'];
}>;


export type CountSecondsSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'countSeconds'>
);

export type NewNotificationsSubscriptionVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type NewNotificationsSubscription = (
  { __typename?: 'Subscription' }
  & { newNotifications?: Maybe<(
    { __typename?: 'NotificationNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'NotificationNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'NotificationNode' }
        & Pick<NotificationNode, 'id' | 'notificationType' | 'notifiedItemType' | 'notifiedItemId' | 'isChecked'>
        & { notificator: (
          { __typename?: 'UserNode' }
          & Pick<UserNode, 'id'>
          & { relatedUser?: Maybe<(
            { __typename?: 'ProfileNode' }
            & Pick<ProfileNode, 'id' | 'profileName' | 'profileImage' | 'googleImageUrl'>
          )> }
        ) }
      )> }
    )>> }
  )> }
);


export const CreateCommentDocument = gql`
    mutation CreateComment($targetThreadId: ID!, $content: String!) {
  createComment(input: {targetThreadId: $targetThreadId, content: $content}) {
    comment {
      id
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      targetThreadId: // value for 'targetThreadId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateFollowDocument = gql`
    mutation CreateFollow($followedUserId: ID!) {
  createFollow(input: {followedUserId: $followedUserId}) {
    follow {
      id
    }
  }
}
    `;
export type CreateFollowMutationFn = Apollo.MutationFunction<CreateFollowMutation, CreateFollowMutationVariables>;

/**
 * __useCreateFollowMutation__
 *
 * To run a mutation, you first call `useCreateFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFollowMutation, { data, loading, error }] = useCreateFollowMutation({
 *   variables: {
 *      followedUserId: // value for 'followedUserId'
 *   },
 * });
 */
export function useCreateFollowMutation(baseOptions?: Apollo.MutationHookOptions<CreateFollowMutation, CreateFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFollowMutation, CreateFollowMutationVariables>(CreateFollowDocument, options);
      }
export type CreateFollowMutationHookResult = ReturnType<typeof useCreateFollowMutation>;
export type CreateFollowMutationResult = Apollo.MutationResult<CreateFollowMutation>;
export type CreateFollowMutationOptions = Apollo.BaseMutationOptions<CreateFollowMutation, CreateFollowMutationVariables>;
export const UpdateFollowDocument = gql`
    mutation UpdateFollow($followId: ID!, $isFollowing: Boolean!) {
  updateFollow(input: {followId: $followId, isFollowing: $isFollowing}) {
    follow {
      id
    }
  }
}
    `;
export type UpdateFollowMutationFn = Apollo.MutationFunction<UpdateFollowMutation, UpdateFollowMutationVariables>;

/**
 * __useUpdateFollowMutation__
 *
 * To run a mutation, you first call `useUpdateFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFollowMutation, { data, loading, error }] = useUpdateFollowMutation({
 *   variables: {
 *      followId: // value for 'followId'
 *      isFollowing: // value for 'isFollowing'
 *   },
 * });
 */
export function useUpdateFollowMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFollowMutation, UpdateFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFollowMutation, UpdateFollowMutationVariables>(UpdateFollowDocument, options);
      }
export type UpdateFollowMutationHookResult = ReturnType<typeof useUpdateFollowMutation>;
export type UpdateFollowMutationResult = Apollo.MutationResult<UpdateFollowMutation>;
export type UpdateFollowMutationOptions = Apollo.BaseMutationOptions<UpdateFollowMutation, UpdateFollowMutationVariables>;
export const CreateIdeaDocument = gql`
    mutation CreateIdea($title: String!, $content: String!, $isPublished: Boolean, $topicIds: [ID]) {
  createIdea(
    input: {title: $title, content: $content, isPublished: $isPublished, topicIds: $topicIds}
  ) {
    idea {
      id
    }
  }
}
    `;
export type CreateIdeaMutationFn = Apollo.MutationFunction<CreateIdeaMutation, CreateIdeaMutationVariables>;

/**
 * __useCreateIdeaMutation__
 *
 * To run a mutation, you first call `useCreateIdeaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIdeaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIdeaMutation, { data, loading, error }] = useCreateIdeaMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      isPublished: // value for 'isPublished'
 *      topicIds: // value for 'topicIds'
 *   },
 * });
 */
export function useCreateIdeaMutation(baseOptions?: Apollo.MutationHookOptions<CreateIdeaMutation, CreateIdeaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIdeaMutation, CreateIdeaMutationVariables>(CreateIdeaDocument, options);
      }
export type CreateIdeaMutationHookResult = ReturnType<typeof useCreateIdeaMutation>;
export type CreateIdeaMutationResult = Apollo.MutationResult<CreateIdeaMutation>;
export type CreateIdeaMutationOptions = Apollo.BaseMutationOptions<CreateIdeaMutation, CreateIdeaMutationVariables>;
export const UpdateIdeaDocument = gql`
    mutation UpdateIdea($ideaId: ID!, $title: String, $content: String, $topicIds: [ID], $isPublished: Boolean) {
  updateIdea(
    input: {ideaId: $ideaId, title: $title, content: $content, topicIds: $topicIds, isPublished: $isPublished}
  ) {
    idea {
      id
    }
  }
}
    `;
export type UpdateIdeaMutationFn = Apollo.MutationFunction<UpdateIdeaMutation, UpdateIdeaMutationVariables>;

/**
 * __useUpdateIdeaMutation__
 *
 * To run a mutation, you first call `useUpdateIdeaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIdeaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIdeaMutation, { data, loading, error }] = useUpdateIdeaMutation({
 *   variables: {
 *      ideaId: // value for 'ideaId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      topicIds: // value for 'topicIds'
 *      isPublished: // value for 'isPublished'
 *   },
 * });
 */
export function useUpdateIdeaMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIdeaMutation, UpdateIdeaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIdeaMutation, UpdateIdeaMutationVariables>(UpdateIdeaDocument, options);
      }
export type UpdateIdeaMutationHookResult = ReturnType<typeof useUpdateIdeaMutation>;
export type UpdateIdeaMutationResult = Apollo.MutationResult<UpdateIdeaMutation>;
export type UpdateIdeaMutationOptions = Apollo.BaseMutationOptions<UpdateIdeaMutation, UpdateIdeaMutationVariables>;
export const CreateLikeDocument = gql`
    mutation CreateLike($likeTargetType: String!, $likedIdeaId: ID, $likedMemoId: ID, $likedCommentId: ID) {
  createLike(
    input: {likeTargetType: $likeTargetType, likedIdeaId: $likedIdeaId, likedMemoId: $likedMemoId, likedCommentId: $likedCommentId}
  ) {
    like {
      id
    }
  }
}
    `;
export type CreateLikeMutationFn = Apollo.MutationFunction<CreateLikeMutation, CreateLikeMutationVariables>;

/**
 * __useCreateLikeMutation__
 *
 * To run a mutation, you first call `useCreateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLikeMutation, { data, loading, error }] = useCreateLikeMutation({
 *   variables: {
 *      likeTargetType: // value for 'likeTargetType'
 *      likedIdeaId: // value for 'likedIdeaId'
 *      likedMemoId: // value for 'likedMemoId'
 *      likedCommentId: // value for 'likedCommentId'
 *   },
 * });
 */
export function useCreateLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateLikeMutation, CreateLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CreateLikeDocument, options);
      }
export type CreateLikeMutationHookResult = ReturnType<typeof useCreateLikeMutation>;
export type CreateLikeMutationResult = Apollo.MutationResult<CreateLikeMutation>;
export type CreateLikeMutationOptions = Apollo.BaseMutationOptions<CreateLikeMutation, CreateLikeMutationVariables>;
export const UpdateLikeDocument = gql`
    mutation UpdateLike($likeId: ID!, $isLiked: Boolean!) {
  updateLike(input: {likeId: $likeId, isLiked: $isLiked}) {
    like {
      id
    }
  }
}
    `;
export type UpdateLikeMutationFn = Apollo.MutationFunction<UpdateLikeMutation, UpdateLikeMutationVariables>;

/**
 * __useUpdateLikeMutation__
 *
 * To run a mutation, you first call `useUpdateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLikeMutation, { data, loading, error }] = useUpdateLikeMutation({
 *   variables: {
 *      likeId: // value for 'likeId'
 *      isLiked: // value for 'isLiked'
 *   },
 * });
 */
export function useUpdateLikeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLikeMutation, UpdateLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLikeMutation, UpdateLikeMutationVariables>(UpdateLikeDocument, options);
      }
export type UpdateLikeMutationHookResult = ReturnType<typeof useUpdateLikeMutation>;
export type UpdateLikeMutationResult = Apollo.MutationResult<UpdateLikeMutation>;
export type UpdateLikeMutationOptions = Apollo.BaseMutationOptions<UpdateLikeMutation, UpdateLikeMutationVariables>;
export const CreateMemoDocument = gql`
    mutation CreateMemo($title: String!) {
  createMemo(input: {title: $title}) {
    memo {
      id
    }
  }
}
    `;
export type CreateMemoMutationFn = Apollo.MutationFunction<CreateMemoMutation, CreateMemoMutationVariables>;

/**
 * __useCreateMemoMutation__
 *
 * To run a mutation, you first call `useCreateMemoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemoMutation, { data, loading, error }] = useCreateMemoMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateMemoMutation(baseOptions?: Apollo.MutationHookOptions<CreateMemoMutation, CreateMemoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMemoMutation, CreateMemoMutationVariables>(CreateMemoDocument, options);
      }
export type CreateMemoMutationHookResult = ReturnType<typeof useCreateMemoMutation>;
export type CreateMemoMutationResult = Apollo.MutationResult<CreateMemoMutation>;
export type CreateMemoMutationOptions = Apollo.BaseMutationOptions<CreateMemoMutation, CreateMemoMutationVariables>;
export const CreateProfileDocument = gql`
    mutation CreateProfile($relatedUserId: ID!, $profileName: String!, $googleImageUrl: String!) {
  createProfile(
    input: {relatedUserId: $relatedUserId, profileName: $profileName, googleImageUrl: $googleImageUrl}
  ) {
    profile {
      id
    }
  }
}
    `;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      relatedUserId: // value for 'relatedUserId'
 *      profileName: // value for 'profileName'
 *      googleImageUrl: // value for 'googleImageUrl'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($profileId: ID!, $profileName: String, $selfIntroduction: String, $googleImageUrl: String, $profileImage: Upload, $githubUsername: String, $twitterUsername: String, $websiteUrl: String) {
  updateProfile(
    input: {profileId: $profileId, profileName: $profileName, selfIntroduction: $selfIntroduction, googleImageUrl: $googleImageUrl, profileImage: $profileImage, githubUsername: $githubUsername, twitterUsername: $twitterUsername, websiteUrl: $websiteUrl}
  ) {
    profile {
      id
    }
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      profileName: // value for 'profileName'
 *      selfIntroduction: // value for 'selfIntroduction'
 *      googleImageUrl: // value for 'googleImageUrl'
 *      profileImage: // value for 'profileImage'
 *      githubUsername: // value for 'githubUsername'
 *      twitterUsername: // value for 'twitterUsername'
 *      websiteUrl: // value for 'websiteUrl'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const SocialAuthDocument = gql`
    mutation SocialAuth($accessToken: String!) {
  socialAuth(provider: "google-oauth2", accessToken: $accessToken) {
    social {
      id
      user {
        id
        firstName
        lastName
        relatedUser {
          id
        }
      }
    }
  }
}
    `;
export type SocialAuthMutationFn = Apollo.MutationFunction<SocialAuthMutation, SocialAuthMutationVariables>;

/**
 * __useSocialAuthMutation__
 *
 * To run a mutation, you first call `useSocialAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSocialAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [socialAuthMutation, { data, loading, error }] = useSocialAuthMutation({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useSocialAuthMutation(baseOptions?: Apollo.MutationHookOptions<SocialAuthMutation, SocialAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SocialAuthMutation, SocialAuthMutationVariables>(SocialAuthDocument, options);
      }
export type SocialAuthMutationHookResult = ReturnType<typeof useSocialAuthMutation>;
export type SocialAuthMutationResult = Apollo.MutationResult<SocialAuthMutation>;
export type SocialAuthMutationOptions = Apollo.BaseMutationOptions<SocialAuthMutation, SocialAuthMutationVariables>;
export const CreateThreadDocument = gql`
    mutation CreateThread($threadTargetType: String!, $targetIdeaId: ID, $targetMemoId: ID) {
  createThread(
    input: {threadTargetType: $threadTargetType, targetIdeaId: $targetIdeaId, targetMemoId: $targetMemoId}
  ) {
    thread {
      id
    }
  }
}
    `;
export type CreateThreadMutationFn = Apollo.MutationFunction<CreateThreadMutation, CreateThreadMutationVariables>;

/**
 * __useCreateThreadMutation__
 *
 * To run a mutation, you first call `useCreateThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThreadMutation, { data, loading, error }] = useCreateThreadMutation({
 *   variables: {
 *      threadTargetType: // value for 'threadTargetType'
 *      targetIdeaId: // value for 'targetIdeaId'
 *      targetMemoId: // value for 'targetMemoId'
 *   },
 * });
 */
export function useCreateThreadMutation(baseOptions?: Apollo.MutationHookOptions<CreateThreadMutation, CreateThreadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateThreadMutation, CreateThreadMutationVariables>(CreateThreadDocument, options);
      }
export type CreateThreadMutationHookResult = ReturnType<typeof useCreateThreadMutation>;
export type CreateThreadMutationResult = Apollo.MutationResult<CreateThreadMutation>;
export type CreateThreadMutationOptions = Apollo.BaseMutationOptions<CreateThreadMutation, CreateThreadMutationVariables>;
export const GetMyFollowingsDocument = gql`
    query GetMyFollowings {
  myFollowings {
    edges {
      node {
        id
        isFollowing
        followedUser {
          id
        }
      }
    }
  }
}
    `;

/**
 * __useGetMyFollowingsQuery__
 *
 * To run a query within a React component, call `useGetMyFollowingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyFollowingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyFollowingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyFollowingsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyFollowingsQuery, GetMyFollowingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyFollowingsQuery, GetMyFollowingsQueryVariables>(GetMyFollowingsDocument, options);
      }
export function useGetMyFollowingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyFollowingsQuery, GetMyFollowingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyFollowingsQuery, GetMyFollowingsQueryVariables>(GetMyFollowingsDocument, options);
        }
export type GetMyFollowingsQueryHookResult = ReturnType<typeof useGetMyFollowingsQuery>;
export type GetMyFollowingsLazyQueryHookResult = ReturnType<typeof useGetMyFollowingsLazyQuery>;
export type GetMyFollowingsQueryResult = Apollo.QueryResult<GetMyFollowingsQuery, GetMyFollowingsQueryVariables>;
export const GetIndexPageItemsDocument = gql`
    query GetIndexPageItems {
  allIdeas(first: 10, isPublished: true) {
    edges {
      node {
        id
        title
        content
        createdAt
        topics {
          edges {
            node {
              id
              name
            }
          }
        }
        ideaCreator {
          id
          relatedUser {
            profileName
            profileImage
            googleImageUrl
          }
        }
        likedIdea(isLiked: true) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
  allMemos(first: 10, isPublished: true) {
    edges {
      node {
        id
        title
        memoCreator {
          id
          relatedUser {
            profileName
            profileImage
            googleImageUrl
          }
        }
        likedMemo(isLiked: true) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetIndexPageItemsQuery__
 *
 * To run a query within a React component, call `useGetIndexPageItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIndexPageItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIndexPageItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetIndexPageItemsQuery(baseOptions?: Apollo.QueryHookOptions<GetIndexPageItemsQuery, GetIndexPageItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIndexPageItemsQuery, GetIndexPageItemsQueryVariables>(GetIndexPageItemsDocument, options);
      }
export function useGetIndexPageItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIndexPageItemsQuery, GetIndexPageItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIndexPageItemsQuery, GetIndexPageItemsQueryVariables>(GetIndexPageItemsDocument, options);
        }
export type GetIndexPageItemsQueryHookResult = ReturnType<typeof useGetIndexPageItemsQuery>;
export type GetIndexPageItemsLazyQueryHookResult = ReturnType<typeof useGetIndexPageItemsLazyQuery>;
export type GetIndexPageItemsQueryResult = Apollo.QueryResult<GetIndexPageItemsQuery, GetIndexPageItemsQueryVariables>;
export const GetMyAllPostsDocument = gql`
    query GetMyAllPosts {
  myAllIdeas {
    edges {
      node {
        id
        title
        isPublished
        createdAt
      }
    }
  }
  myAllMemos {
    edges {
      node {
        id
        title
        isPublished
        createdAt
      }
    }
  }
}
    `;

/**
 * __useGetMyAllPostsQuery__
 *
 * To run a query within a React component, call `useGetMyAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyAllPostsQuery, GetMyAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyAllPostsQuery, GetMyAllPostsQueryVariables>(GetMyAllPostsDocument, options);
      }
export function useGetMyAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyAllPostsQuery, GetMyAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyAllPostsQuery, GetMyAllPostsQueryVariables>(GetMyAllPostsDocument, options);
        }
export type GetMyAllPostsQueryHookResult = ReturnType<typeof useGetMyAllPostsQuery>;
export type GetMyAllPostsLazyQueryHookResult = ReturnType<typeof useGetMyAllPostsLazyQuery>;
export type GetMyAllPostsQueryResult = Apollo.QueryResult<GetMyAllPostsQuery, GetMyAllPostsQueryVariables>;
export const GetAllIdeasDocument = gql`
    query GetAllIdeas {
  allIdeas(isPublished: true) {
    edges {
      node {
        id
        title
        content
        ideaCreator {
          id
          relatedUser {
            id
            profileName
            profileImage
            googleImageUrl
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllIdeasQuery__
 *
 * To run a query within a React component, call `useGetAllIdeasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllIdeasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllIdeasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllIdeasQuery(baseOptions?: Apollo.QueryHookOptions<GetAllIdeasQuery, GetAllIdeasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllIdeasQuery, GetAllIdeasQueryVariables>(GetAllIdeasDocument, options);
      }
export function useGetAllIdeasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllIdeasQuery, GetAllIdeasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllIdeasQuery, GetAllIdeasQueryVariables>(GetAllIdeasDocument, options);
        }
export type GetAllIdeasQueryHookResult = ReturnType<typeof useGetAllIdeasQuery>;
export type GetAllIdeasLazyQueryHookResult = ReturnType<typeof useGetAllIdeasLazyQuery>;
export type GetAllIdeasQueryResult = Apollo.QueryResult<GetAllIdeasQuery, GetAllIdeasQueryVariables>;
export const GetIdeaDocument = gql`
    query GetIdea($id: ID!) {
  idea(id: $id) {
    id
    title
    content
    isPublished
    createdAt
    updatedAt
    topics {
      edges {
        node {
          id
          name
        }
      }
    }
    ideaCreator {
      id
      relatedUser {
        id
        profileName
        profileImage
        googleImageUrl
        selfIntroduction
        githubUsername
        twitterUsername
        websiteUrl
      }
    }
    likedIdea(isLiked: true) {
      edges {
        node {
          id
          isLiked
          likedUser {
            id
          }
        }
      }
    }
    targetIdea {
      edges {
        node {
          id
          targetThread {
            edges {
              node {
                id
                content
                createdAt
                updatedAt
                commentor {
                  id
                  relatedUser {
                    id
                    profileName
                    profileImage
                    googleImageUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetIdeaQuery__
 *
 * To run a query within a React component, call `useGetIdeaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIdeaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIdeaQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetIdeaQuery(baseOptions: Apollo.QueryHookOptions<GetIdeaQuery, GetIdeaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIdeaQuery, GetIdeaQueryVariables>(GetIdeaDocument, options);
      }
export function useGetIdeaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIdeaQuery, GetIdeaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIdeaQuery, GetIdeaQueryVariables>(GetIdeaDocument, options);
        }
export type GetIdeaQueryHookResult = ReturnType<typeof useGetIdeaQuery>;
export type GetIdeaLazyQueryHookResult = ReturnType<typeof useGetIdeaLazyQuery>;
export type GetIdeaQueryResult = Apollo.QueryResult<GetIdeaQuery, GetIdeaQueryVariables>;
export const GetMyAllLikesDocument = gql`
    query GetMyAllLikes {
  myLikeIdeas(isLiked: true) {
    edges {
      node {
        id
        likedIdea {
          id
          title
        }
      }
    }
  }
  myLikeMemos(isLiked: true) {
    edges {
      node {
        id
        likedMemo {
          id
          title
        }
      }
    }
  }
}
    `;

/**
 * __useGetMyAllLikesQuery__
 *
 * To run a query within a React component, call `useGetMyAllLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAllLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAllLikesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyAllLikesQuery(baseOptions?: Apollo.QueryHookOptions<GetMyAllLikesQuery, GetMyAllLikesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyAllLikesQuery, GetMyAllLikesQueryVariables>(GetMyAllLikesDocument, options);
      }
export function useGetMyAllLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyAllLikesQuery, GetMyAllLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyAllLikesQuery, GetMyAllLikesQueryVariables>(GetMyAllLikesDocument, options);
        }
export type GetMyAllLikesQueryHookResult = ReturnType<typeof useGetMyAllLikesQuery>;
export type GetMyAllLikesLazyQueryHookResult = ReturnType<typeof useGetMyAllLikesLazyQuery>;
export type GetMyAllLikesQueryResult = Apollo.QueryResult<GetMyAllLikesQuery, GetMyAllLikesQueryVariables>;
export const GetMyLikeIdeasDocument = gql`
    query GetMyLikeIdeas {
  myLikeIdeas {
    edges {
      node {
        id
        isLiked
        likedIdea {
          id
        }
      }
    }
  }
}
    `;

/**
 * __useGetMyLikeIdeasQuery__
 *
 * To run a query within a React component, call `useGetMyLikeIdeasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyLikeIdeasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyLikeIdeasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyLikeIdeasQuery(baseOptions?: Apollo.QueryHookOptions<GetMyLikeIdeasQuery, GetMyLikeIdeasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyLikeIdeasQuery, GetMyLikeIdeasQueryVariables>(GetMyLikeIdeasDocument, options);
      }
export function useGetMyLikeIdeasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyLikeIdeasQuery, GetMyLikeIdeasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyLikeIdeasQuery, GetMyLikeIdeasQueryVariables>(GetMyLikeIdeasDocument, options);
        }
export type GetMyLikeIdeasQueryHookResult = ReturnType<typeof useGetMyLikeIdeasQuery>;
export type GetMyLikeIdeasLazyQueryHookResult = ReturnType<typeof useGetMyLikeIdeasLazyQuery>;
export type GetMyLikeIdeasQueryResult = Apollo.QueryResult<GetMyLikeIdeasQuery, GetMyLikeIdeasQueryVariables>;
export const SearchItemsDocument = gql`
    query SearchItems($keyword: String!) {
  allIdeas(title_Icontains: $keyword) {
    edges {
      node {
        id
        title
      }
    }
  }
  allMemos(title_Icontains: $keyword) {
    edges {
      node {
        id
        title
      }
    }
  }
  allProfiles(profileName_Icontains: $keyword) {
    edges {
      node {
        id
        profileName
      }
    }
  }
}
    `;

/**
 * __useSearchItemsQuery__
 *
 * To run a query within a React component, call `useSearchItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchItemsQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useSearchItemsQuery(baseOptions: Apollo.QueryHookOptions<SearchItemsQuery, SearchItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchItemsQuery, SearchItemsQueryVariables>(SearchItemsDocument, options);
      }
export function useSearchItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchItemsQuery, SearchItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchItemsQuery, SearchItemsQueryVariables>(SearchItemsDocument, options);
        }
export type SearchItemsQueryHookResult = ReturnType<typeof useSearchItemsQuery>;
export type SearchItemsLazyQueryHookResult = ReturnType<typeof useSearchItemsLazyQuery>;
export type SearchItemsQueryResult = Apollo.QueryResult<SearchItemsQuery, SearchItemsQueryVariables>;
export const GetAllTopicsDocument = gql`
    query GetAllTopics {
  allTopics {
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetAllTopicsQuery__
 *
 * To run a query within a React component, call `useGetAllTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTopicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTopicsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTopicsQuery, GetAllTopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTopicsQuery, GetAllTopicsQueryVariables>(GetAllTopicsDocument, options);
      }
export function useGetAllTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTopicsQuery, GetAllTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTopicsQuery, GetAllTopicsQueryVariables>(GetAllTopicsDocument, options);
        }
export type GetAllTopicsQueryHookResult = ReturnType<typeof useGetAllTopicsQuery>;
export type GetAllTopicsLazyQueryHookResult = ReturnType<typeof useGetAllTopicsLazyQuery>;
export type GetAllTopicsQueryResult = Apollo.QueryResult<GetAllTopicsQuery, GetAllTopicsQueryVariables>;
export const GetTopicDocument = gql`
    query GetTopic($topicName: String!) {
  topic(topicName: $topicName) {
    id
    displayName
    topics {
      edges {
        node {
          id
          title
        }
      }
    }
  }
}
    `;

/**
 * __useGetTopicQuery__
 *
 * To run a query within a React component, call `useGetTopicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicQuery({
 *   variables: {
 *      topicName: // value for 'topicName'
 *   },
 * });
 */
export function useGetTopicQuery(baseOptions: Apollo.QueryHookOptions<GetTopicQuery, GetTopicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicQuery, GetTopicQueryVariables>(GetTopicDocument, options);
      }
export function useGetTopicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicQuery, GetTopicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicQuery, GetTopicQueryVariables>(GetTopicDocument, options);
        }
export type GetTopicQueryHookResult = ReturnType<typeof useGetTopicQuery>;
export type GetTopicLazyQueryHookResult = ReturnType<typeof useGetTopicLazyQuery>;
export type GetTopicQueryResult = Apollo.QueryResult<GetTopicQuery, GetTopicQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  allUsers(isSuperuser: false, isActive: true) {
    edges {
      node {
        id
        username
        relatedUser {
          id
          profileName
          selfIntroduction
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetMyUserInfoDocument = gql`
    query GetMyUserInfo {
  myUserInfo {
    id
    relatedUser {
      profileName
      profileImage
    }
  }
}
    `;

/**
 * __useGetMyUserInfoQuery__
 *
 * To run a query within a React component, call `useGetMyUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetMyUserInfoQuery, GetMyUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyUserInfoQuery, GetMyUserInfoQueryVariables>(GetMyUserInfoDocument, options);
      }
export function useGetMyUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyUserInfoQuery, GetMyUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyUserInfoQuery, GetMyUserInfoQueryVariables>(GetMyUserInfoDocument, options);
        }
export type GetMyUserInfoQueryHookResult = ReturnType<typeof useGetMyUserInfoQuery>;
export type GetMyUserInfoLazyQueryHookResult = ReturnType<typeof useGetMyUserInfoLazyQuery>;
export type GetMyUserInfoQueryResult = Apollo.QueryResult<GetMyUserInfoQuery, GetMyUserInfoQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  user(id: $id) {
    id
    username
    relatedUser {
      id
      profileName
      profileImage
      googleImageUrl
      selfIntroduction
      githubUsername
      twitterUsername
      websiteUrl
    }
    followedUser(isFollowing: true) {
      edges {
        node {
          id
          isFollowing
          followingUser {
            id
            relatedUser {
              profileName
              profileImage
              googleImageUrl
            }
          }
        }
      }
    }
    ideaCreator {
      edges {
        node {
          id
          title
          isPublished
          topics {
            edges {
              node {
                id
                name
              }
            }
          }
          createdAt
          updatedAt
          likedIdea(isLiked: true) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUserSettingsDocument = gql`
    query GetUserSettings($id: ID!) {
  user(id: $id) {
    id
    relatedUser {
      id
      profileName
      profileImage
      googleImageUrl
      selfIntroduction
      githubUsername
      twitterUsername
      websiteUrl
    }
  }
}
    `;

/**
 * __useGetUserSettingsQuery__
 *
 * To run a query within a React component, call `useGetUserSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSettingsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserSettingsQuery(baseOptions: Apollo.QueryHookOptions<GetUserSettingsQuery, GetUserSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserSettingsQuery, GetUserSettingsQueryVariables>(GetUserSettingsDocument, options);
      }
export function useGetUserSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserSettingsQuery, GetUserSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserSettingsQuery, GetUserSettingsQueryVariables>(GetUserSettingsDocument, options);
        }
export type GetUserSettingsQueryHookResult = ReturnType<typeof useGetUserSettingsQuery>;
export type GetUserSettingsLazyQueryHookResult = ReturnType<typeof useGetUserSettingsLazyQuery>;
export type GetUserSettingsQueryResult = Apollo.QueryResult<GetUserSettingsQuery, GetUserSettingsQueryVariables>;
export const CountSecondsDocument = gql`
    subscription CountSeconds($seconds: Int!) {
  countSeconds(upTo: $seconds)
}
    `;

/**
 * __useCountSecondsSubscription__
 *
 * To run a query within a React component, call `useCountSecondsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCountSecondsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountSecondsSubscription({
 *   variables: {
 *      seconds: // value for 'seconds'
 *   },
 * });
 */
export function useCountSecondsSubscription(baseOptions: Apollo.SubscriptionHookOptions<CountSecondsSubscription, CountSecondsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CountSecondsSubscription, CountSecondsSubscriptionVariables>(CountSecondsDocument, options);
      }
export type CountSecondsSubscriptionHookResult = ReturnType<typeof useCountSecondsSubscription>;
export type CountSecondsSubscriptionResult = Apollo.SubscriptionResult<CountSecondsSubscription>;
export const NewNotificationsDocument = gql`
    subscription NewNotifications($userId: ID!) {
  newNotifications(userId: $userId) {
    edges {
      node {
        id
        notificationType
        notifiedItemType
        notifiedItemId
        isChecked
        notificator {
          id
          relatedUser {
            id
            profileName
            profileImage
            googleImageUrl
          }
        }
      }
    }
  }
}
    `;

/**
 * __useNewNotificationsSubscription__
 *
 * To run a query within a React component, call `useNewNotificationsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewNotificationsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewNotificationsSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewNotificationsSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewNotificationsSubscription, NewNotificationsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewNotificationsSubscription, NewNotificationsSubscriptionVariables>(NewNotificationsDocument, options);
      }
export type NewNotificationsSubscriptionHookResult = ReturnType<typeof useNewNotificationsSubscription>;
export type NewNotificationsSubscriptionResult = Apollo.SubscriptionResult<NewNotificationsSubscription>;