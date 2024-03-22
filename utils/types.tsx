export interface GamesInfo {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export interface Game {
  id?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  date: string;
  role: string;
  user_id?: number;
  nickName?: string | undefined;
}

// Define the interface for user data
export interface User {
  nickName: string;
  email: string;
  userImageUrl: string;
  games: Game[];
}
