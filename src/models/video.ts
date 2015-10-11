export interface Video {
  player: Player;
  statistics: Stats;
}

export interface Stats {
  likeCount: string;
  dislikeCount: string;
}

export interface Player {
  embedHtml: string;
}