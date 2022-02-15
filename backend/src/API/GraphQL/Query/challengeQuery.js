import {
  AllChallengesResponseModel,
  ChallengeResponseModel,
  ChallengeInputModel,
  RewardInputModel,
  categoryCreator,
  challengeCreator,
  createChallenge,
  createContent,
  createReward,
  getData,
  getDataFromDatabaseByFilter,
  saveChallenge,
} from "../../../internal.js";
import config from "../../../Config/config.js";
import { assertIsAdmin, assertIsAuthenticated } from "../assert.js";

function getResponseObject(message, statusCode, type) {
  return {
    message,
    status: statusCode,
    type,
  };
}

// Root Queries - Used to retrieve data with GET-Requests

const getAllChallengesQuery = {
  type: AllChallengesResponseModel,
  args: {},
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);

    const challengesData = await getData(config.db.table.challenge);
    let challenges = [];
    challengesData.forEach((challengeData) => {
      const challenge = challengeCreator();
      challenges.push(challenge.restoreObject(challenge, challengeData));
    });

    challenges = await Promise.all(challenges);
    return { challenges };
  },
};

// Mutation Queries - Used to update or delete data with PUT- and DELETE-requests

const createChallengeQuery = {
  type: ChallengeResponseModel,
  args: {
    challenge: { type: ChallengeInputModel },
    reward: { type: RewardInputModel },
  },
  async resolve(parent, args, context) {
    assertIsAuthenticated(context.user);
    assertIsAdmin(context.user);

    const { categoryID, title, image, description, difficulty } =
      args.challenge;
    const { maxPoints, firstTryPoints, bonusPoints } = args.reward;

    let categoryData;
    if (categoryID.trim().length === 0) {
      throw new Error(
        "Category you try to add the challenge to does not exist. Please create a Category before creating a Challenge."
      );
    }

    if (categoryID.trim().length > 0) {
      const storedCategory = await getDataFromDatabaseByFilter(
        "id",
        categoryID,
        config.db.table.category
      );

      if (storedCategory == null) {
        throw new Error(
          "Category you try to add the challenge to does not exist. Please create a Category before creating a Challenge."
        );
      }

      [categoryData] = storedCategory;
    }

    const category = categoryCreator();
    await category.restoreObject(category, categoryData);

    const challenge = createChallenge(categoryID, difficulty);
    const content = createContent(challenge.content, title, image, description);
    const reward = createReward(
      challenge.reward,
      maxPoints,
      firstTryPoints,
      bonusPoints
    );

    return saveChallenge(content, category, challenge, reward);
  },
};

export { createChallengeQuery, getAllChallengesQuery };
