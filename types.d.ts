export interface AccountProps {
  id: string;
  email: string;
  phoneNo: string;
  photoUrl: string;
  profileUrl: string;
  displayName: string;
  hasNotification: boolean;
  hasMessage: boolean;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface DummyPost {
  userId: string;
  caption: string;
}

export interface FileProps {
  name: string;
  type: string;
  dataUrl: string;
}

export interface PostProps {
  id: string;
  caption: string;
  userId: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface PostFiles {
  id: string;
  name: string;
  type: string;
  postContentUrl: string;
}

export interface LikeProps {
  id: string;
  displayName: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface BookmarkProps {
  id: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface CommentProps {
  id: string;
  comment: string;
  userId: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface followProps {
  id: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface NotificationProps {
  id: string;
  userId: string;
  task: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface ConversationProps {
  id: string;
  usersMatched: string[];
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface MessageProps {
  id: string;
  senderId: string;
  message: string;
  hasSeen: string[];
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}
