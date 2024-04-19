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
  memberNickname: string;
  majorName: string;
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

export interface Professor {
  majorId: number;
  majorName: string;
  profId: number;
  profName: string;
  professorAverageGradePoint: number | null;
  collegeName: string;
}

export type SearchResult = Feed | Professor;
