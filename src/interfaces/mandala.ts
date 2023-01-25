export interface Mission {
  id: number;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubMission {
  id: number;
  content: string;
  userId: number;
  position: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  missionId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Todo {
  id: number;
  content: string;
  userId: number;
  position: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  subMissionId: number;
  createdAt: Date;
  updatedAt: Date;
}
