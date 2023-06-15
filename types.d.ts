export interface AccountProps {
  id: string;
  email: string;
  phoneNo: string;
  photoUrl: string;
  profileUrl: string;
  displayName: string;
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

// export interface CommentProps {
//   id: string;
//   comment: string;
//   displayName: string;
//   profileUrl: string;
//   timestamp: {
//     seconds: number;
//     nanoseconds: number;
//   };
// }

// export interface LikeProps {
//   id: string;
//   displayName: string;
//   profileUrl: string;
// }

// export interface NotificationProps {
//   id: string;
//   task: string;
//   displayName: string;
//   profileUrl: string;
//   timestamp: {
//     seconds: number;
//     nanoseconds: number;
//   };
// }
