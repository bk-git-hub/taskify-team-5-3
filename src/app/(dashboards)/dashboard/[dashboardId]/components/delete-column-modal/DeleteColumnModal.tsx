import {
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

interface Props {
  title: string;
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteColumnModal({
  title,
  onCancel,
  onDelete,
}: Props) {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>
          진짜로 다시한번만 생각해보세요. 여태까지 한게 있지않습니까? 아깝지
          않습니까? 이거 지우면 다시 복원도 안돼요. 카드도 전부 삭제되고.. 이거
          삭제 버튼 누르면 다시 못돌아와요. 진짜로 확실해요? 카드만
          삭제할려했던거 아니고? 정말 이렇게까지 해야합니까? 다시한번
          묻겠습니다.
          <br />
          <br />
          진짜로 <b>{title}</b>칼럼을
          <span className="text-red-500"> 삭제해야만 되겠습니까??</span>
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>취소</AlertDialogCancel>
        <AlertDialogAction asChild>
          <button className="bg-red-500 text-white" onClick={onDelete}>
            삭제
          </button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}
