import { GraphQLObjectType, GraphQLEnumType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } from "graphql";

const UserModel = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    password: { type: GraphQLString },
    name:{ type: GraphQLString },
    permission: { type: GraphQLString },
    achievements: { type: new GraphQLList(AchievementModel) },
    challenges: { type: new GraphQLList(ChallengeModel) },
    data_collection: { type: ClickStreamModel }
  })
});


const ContentModel = new GraphQLObjectType({
  name: "Content",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});


const CategoryModel = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLInt },
    challenge: { type: new GraphQLList(ChallengeModel) },
    content: { type: ContentModel },
    progress: { type: ProgressModel }
  })
});


const DifficultyEnum = new GraphQLEnumType({
    name: "Difficulty",
    values: {
      beginner: { value: 1 },
      intermediate: { value: 2 },
      expert: { value: 3 }
    }
});

const ChallengeModel = new GraphQLObjectType({
  name: "Challenge",
  fields: () => ({
    id: { type: GraphQLInt },
    difficulty: { type: DifficultyEnum },
    content: { type: ContentModel },
    activity: { type: ActivityModel },
    reflection: { type: ReflectionModel },
    reward: { type: RewardModel },
    category: { type: CategoryModel },
  })
});


const ActivityModel = new GraphQLObjectType({
  name: "Activity",
  fields: () => ({
    id: { type: GraphQLInt },
    hint: { type: new GraphQLList(HintModel) },
    resource: { type: new GraphQLList(ResourceModel) }
  })
});


const HintModel = new GraphQLObjectType({
  name: "Hint",
  fields: () => ({
    id: { type: GraphQLInt },
   text: { type: GraphQLString }
  })
});


const ResourceModel = new GraphQLObjectType({
  name: "Resource",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
  })
});


const ReflectionModel = new GraphQLObjectType({
  name: "Reflection",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    solution: { type: GraphQLString },
  })
});


const AchievementTypeEnum = new GraphQLEnumType({
  name: "AchievementType",
  values: {
    category: { value: 1 },
    challenge: { value: 2 }
  }
});

const AchievementModel = new GraphQLObjectType({
  name: "Achievement",
  fields: () => ({
    id: { type: GraphQLInt },
    condition: { type: new GraphQLList(ChallengeModel) },
    type: { type: AchievementTypeEnum },
    content: { type: ContentModel },
  })
});


const RewardModel = new GraphQLObjectType({
  name: "Reward",
  fields: () => ({
    id: { type: GraphQLInt },
    max_points:{ type: GraphQLInt },
    first_try_points: { type: GraphQLInt },
    bonus_points: { type: GraphQLInt },
  })
});


const ProgressModel = new GraphQLObjectType({
  name: "Progress",
  fields: () => ({
    id: { type: GraphQLInt },
    percentage: { type: GraphQLInt }
  })
});


const LeaderboardModel = new GraphQLObjectType({
  name: "Leaderboard",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    leaderboard: { type: new GraphQLList(UserModel) }
  })
});


const UserChallengeModel = new GraphQLObjectType({
  name: "UserChallenge",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    challenge_id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    completed: { type: GraphQLBoolean },
    answered_correct: { type: GraphQLBoolean },
    activity: { type: UserActivityModel },
    reflection: { type: UserReflectionModel },
    reward: { type: UserRewardModel }
  })
});


const UserActivityModel = new GraphQLObjectType({
  name: "UserActivity",
  fields: () => ({
    id: { type: GraphQLInt },
    activity_id: { type: GraphQLInt },
    date_started: { type: GraphQLString },
    date_completed: { type: GraphQLString },
    answer: { type: GraphQLString },
  })
});


const VoteEnum = new GraphQLEnumType({
  name: "Vote",
  values: {
    neutral: { value: -1 },
    up: { value: 1 },
    down: { value: 2 }
  }
});

const UserReflectionModel = new GraphQLObjectType({
  name: "UserReflection",
  fields: () => ({
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    reflection_id: { type: GraphQLInt },
    date_started: { type: GraphQLString },
    date_completed: { type: GraphQLString },
    answer: { type: GraphQLString },
    vote: { type: VoteEnum },
    vote_choices: { type: VoteEnum }
  })
});


const UserRewardModel = new GraphQLObjectType({
  name: "UserReward",
  fields: () => ({
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    reward_id: { type: GraphQLInt },
    points: { type: GraphQLInt },
    bonus_points: { type: GraphQLInt },
  })
});


const UserAchievementModel = new GraphQLObjectType({
  name: "UserAchievement",
  fields: () => ({
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    achievement_id: { type: GraphQLInt },
    completed: { type: GraphQLBoolean },
  })
});


const ClickStreamModel = new GraphQLObjectType({
  name: "ClickStream",
  fields: () => ({
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    click_stream_item: { type: ClickStreamItemModel }
  })
});

const ClickStreamItemModel = new GraphQLObjectType({
  name: "ClickStreamItemModel",
  fields: () => ({
    id: { type: GraphQLInt },
    screen_id: { type: GraphQLInt },
    timestamp: { type: GraphQLString },
    next_item: { type: ClickStreamItemModel },
    prev_item: { type: ClickStreamItemModel },
  })
});

const ResponseModel = {
  message: { type: GraphQLString },
  status: { type: GraphQLInt },
  type: { type: GraphQLString }
}

const NormalResponseModel = new GraphQLObjectType({
  name: "Response",
  fields: () => ({
    ...ResponseModel
  })
});

const SignInModel = new GraphQLObjectType({
  name: "SignIn",
  fields: () => ({
    ...ResponseModel,
    data: { type: SignInDataModel }
  })
});

const SignInDataModel = new GraphQLObjectType({
  name: "SignInData",
  fields: () => ({
    access_token: { type: GraphQLString },
    refresh_token: { type: GraphQLString },
    user: { type: UserModel }
  })
});

const AccessTokenModel = new GraphQLObjectType({
  name: "AccessToken",
  fields: () => ({
    access_token: { type: GraphQLString }
  })
});

const AuthenticateTokenModel = new GraphQLObjectType({
  name: "AuthToken",
  fields: () => ({
  ...ResponseModel,
  data:{ type: AccessTokenModel }
  })
});

export {
  ActivityModel,
  AchievementModel,
  AuthenticateTokenModel,
  CategoryModel,
  ChallengeModel,
  ClickStreamModel,
  LeaderboardModel,
  NormalResponseModel,
  ReflectionModel,
  SignInModel,
  UserAchievementModel,
  UserChallengeModel,
  UserModel,
}
