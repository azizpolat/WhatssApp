interface Chat {
  id: number;
  name: string;
  surname: string;
  date: string;
  image: string;
  lastMessage: string;
}

interface ChatItemProps {
  item: object;
}

export type {ChatItemProps, Chat};
