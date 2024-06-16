import Comment from "./Comment";

type CommentT = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
};

export default function CommentList({ comments }: { comments: any }) {
  return (
    <>
      {comments.length > 0 ? (
        <span>{comments.length} 개의 댓글</span>
      ) : (
        <span>아직 댓글이 없습니다</span>
      )}
      <ul className="flex flex-col gap-4 overflow-auto h-52">
        {comments.map((comment: CommentT) => (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    </>
  );
}
