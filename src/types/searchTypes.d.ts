export interface FeedResult {
  clickCount: number;
  content: string;
  gradePoint: number;
  likeCount: number;
  postId: number;
  profId: number;
  profName: string;
  regDate: string;
  updateDate: string;
  collegeName: String;
  comments: FeedComment[];
  numberOfComment: number;
}

export interface FeedComment {
  commentId: number;
  commentLike: number | null;
  content: string;
  commentChidren: FeedComment[];
}

export interface ProfessorResult {
  majorId: number;
  majorName: string;
  profId: number;
  profName: string;
  professorAverageGradePoint: number | null;
}

export type SearchResult = FeedResult | ProfessorResult;
