export interface Feed {
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
  commentChildren: FeedComment[];
  commentId: number;
  commentLike: number | null;
  content: string;
  memberId: number;
  memberName: string;
  postId: number;
  regDate: string;
  updateDate: string;
}

export interface ProfessorResult {
  majorId: number;
  majorName: string;
  profId: number;
  profName: string;
  professorAverageGradePoint: number | null;
}

export type SearchResult = Feed | ProfessorResult;
