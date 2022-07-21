export interface IUser {
  email: string;
  favorites: IFavorite[];
}

export interface IFavorite {
  createdAt: string;
  lifeId: number;
}
