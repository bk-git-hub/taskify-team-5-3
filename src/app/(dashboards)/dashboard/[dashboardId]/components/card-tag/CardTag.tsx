import { ICard } from "@/type";
import { Card } from "@/app/(dashboards)/dashboard/[dashboardId]/components/card/Card";
import {
  makeColorsBrighter,
  makeTextDarker,
  generateFixedColors,
} from "@/util/randomColor";

export default function CardTag({ cards }: { cards: ICard }) {
  return (
    <Card.Tag>
      {cards.tags.map((item, index) => (
        <Card.TagBackground
          key={index}
          style={{
            background: makeColorsBrighter(generateFixedColors(item)),
            color: makeTextDarker(generateFixedColors(item)),
            borderColor: makeTextDarker(generateFixedColors(item)),
          }}
        >
          <Card.TagName>{item}</Card.TagName>
        </Card.TagBackground>
      ))}
    </Card.Tag>
  );
}
