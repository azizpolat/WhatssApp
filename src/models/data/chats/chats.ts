interface Message {
  id: number;
}

interface ChatTypes {
  message: Message[];
}

export type {ChatTypes, Message};
