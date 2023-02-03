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

// type checker
export const isMission = (arg: any): arg is Mission => {
  return (
    arg !== null &&
    arg !== undefined &&
    typeof arg === 'object' &&
    typeof arg.id === 'number' &&
    typeof arg.userId === 'number' &&
    typeof arg.content === 'string'
  );
};

export const isSubMission = (arg: any): arg is SubMission => {
  return (
    arg !== null &&
    arg !== undefined &&
    typeof arg === 'object' &&
    typeof arg.content === 'string' &&
    typeof arg.id === 'number' &&
    [0, 1, 2, 3, 4, 5, 6, 7, 8].includes(arg.position) &&
    typeof arg.missionId === 'number'
  );
};

export const isTodo = (arg: any): arg is Todo => {
  return (
    arg !== null &&
    arg !== undefined &&
    typeof arg.id === 'number' &&
    typeof arg.content === 'string' &&
    [0, 1, 2, 3, 4, 5, 6, 7, 8].includes(arg.position) &&
    typeof arg.subMissionId === 'number'
  );
};
