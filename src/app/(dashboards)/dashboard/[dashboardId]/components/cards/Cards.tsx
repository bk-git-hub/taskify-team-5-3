import Image from "next/image";
import { ICard, IColumn } from "@/type";
import { Card } from "@/app/(dashboards)/dashboard/[dashboardId]/components/card/Card";
import CardTag from "../card-tag/CardTag";
import formatDate from "@/util/formatDate";
import { serverSideFetcher } from "@/lib/utils";

async function getComments(cardID: number) {
  const res = await serverSideFetcher(
    `https://sp-taskify-api.vercel.app/5-3/comments?cardId=${cardID}`,
  );
  const data = await res?.json();
  return data.comments;
}

async function getMembers(dashboardId: number) {
  const res = await serverSideFetcher(
    `https://sp-taskify-api.vercel.app/5-3/members?page=1&size=9999&dashboardId=${dashboardId}`,
  );
  const data = await res?.json();
  return data.members;
}

export default async function Cards({
  cards,
  column,
}: {
  cards: ICard[];
  column: IColumn;
}) {
  const members = await getMembers(column.dashboardId);

  return (
    <div className="flex flex-col gap-4 overflow-auto">
      {cards.map(async (card) => {
        const comments = await getComments(card.id);

        return (
          <Card
            key={card.id}
            cardData={card}
            column={column}
            comments={comments}
            members={members}
          >
            <Card.Header>
              {card.imageUrl && (
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  width={274}
                  height={128}
                  className="rounded"
                />
              )}
            </Card.Header>
            <Card.Content>
              <Card.Title>{card.title}</Card.Title>
              <CardTag cards={card} />
            </Card.Content>
            <Card.Footer>
              {card.dueDate ? (
                <Card.DueDate>{formatDate(card.dueDate)}</Card.DueDate>
              ) : (
                <Card.DueDate>-- . -- . --</Card.DueDate>
              )}
              {card.assignee?.nickname && (
                <Card.Asignee assignee={card.assignee}></Card.Asignee>
              )}
            </Card.Footer>
          </Card>
        );
      })}
    </div>
  );
}
