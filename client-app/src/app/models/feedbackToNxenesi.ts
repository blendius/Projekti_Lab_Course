export interface FeedbackToNxenesi {
    feedbackID: string;
    profesoriId:string;
    nxenesiEmail: string;
    subject: string;
    message: string;
    messageSentDate: string;
    rating: number;
    isReply: boolean;

}