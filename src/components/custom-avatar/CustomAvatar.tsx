import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function getBackgroundClass(userId: number) {
  const classes = [
    "bg-[#ffc85a]",
    "bg-[#fdd446]",
    "bg-[#9dd7ed]",
    "bg-[#c4b1a2]",
    "bg-[#a3c4a2]",
    "bg-[#034694]",
    "bg-[#e876ea]",
    "bg-[#000]",
    "bg-[#c3102b]",
    "bg-[#7AC555]",
  ];
  return classes[userId % 10];
}

function getFirstCharacter(str: string) {
  if (str.length > 0) {
    return str.charAt(0);
  } else {
    return "";
  }
}

interface Props {
  imgUrl: string | undefined;
  nickname: string;
  userId: number;
  size: number;
}

export default function CustomAvatar({
  imgUrl,
  nickname,
  userId,
  size,
}: Props) {
  const fallback = getFirstCharacter(nickname);
  return (
    <>
      <AvatarImage src={imgUrl} width={`${size}`} height={`${size}`} />
      <AvatarFallback
        className={`text-white font-semibold ${getBackgroundClass(userId)}`}
      >
        {fallback}
      </AvatarFallback>
    </>
  );
}
