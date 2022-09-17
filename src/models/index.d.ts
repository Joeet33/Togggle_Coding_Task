import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type ScoreMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Score {
  readonly id: string;
  readonly score: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Score, ScoreMetaData>);
  static copyOf(source: Score, mutator: (draft: MutableModel<Score, ScoreMetaData>) => MutableModel<Score, ScoreMetaData> | void): Score;
}