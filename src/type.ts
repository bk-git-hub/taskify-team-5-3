export interface IDashboard {
  id: number;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  createdByMe: boolean;
}

export interface IColumn {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ColumnFetchResult {
  result: string;
  data: IColumn[];
}

export interface IAsignee {
  id: number;
  nickname: string;
  profileImageUrl?: string;
}

export interface ICard {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee?: IAsignee;
  imageUrl?: string;
  teamId: string;
  dashboardId: number;
  columnId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardFetchResult {
  cards: ICard[];
  totalCount: number;
}

export interface Member {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

export interface MembersResponse {
  members: Member[];
  totalCount: number;
}
