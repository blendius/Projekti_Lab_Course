import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { FeedbackToNxenesi } from "../models/feedbackToNxenesi";
import { v4 as uuid } from 'uuid';

export default class FeedbackStore {
    profId: string | null = null;
    feedbackRegistry = new Map<string, FeedbackToNxenesi>();
    feedbackRegistryReplay = new Map<string, FeedbackToNxenesi>();
    selectedFeedback: FeedbackToNxenesi | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    modalMode = false;


    constructor() {
        makeAutoObservable(this)
    }
    get feedbackReplyByDate() {
        return Array.from(this.feedbackRegistryReplay.values()).sort((a, b) => Date.parse(a.messageSentDate) - Date.parse(b.messageSentDate))
    }

    get feedbackByDate() {
        return Array.from(this.feedbackRegistry.values()).sort((a, b) => Date.parse(a.messageSentDate) - Date.parse(b.messageSentDate));
    }
    loadFeedbacksProf = async (id: string | undefined) => {
        try {
            const feedbacks = await agent.FeedbackToNxenesit.listProf(id);

            feedbacks.forEach(feedbacks => {
                feedbacks.messageSentDate = feedbacks.messageSentDate.split('T')[0];

                if (feedbacks.isReply) {
                    this.feedbackRegistryReplay.set(feedbacks.feedbackID, feedbacks);
                } else {
                    this.feedbackRegistry.set(feedbacks.feedbackID, feedbacks);
                }
            })
            this.setLoadingInitial(false);
        }

        catch (error) {
            console.log(error);

            this.setLoadingInitial(false);
        }

    }
    // loadFeedbacksProf = async (id: string | undefined) => {
    //     try {
    //         const feedbacks = await agent.FeedbackToNxenesit.listProf(id);
    //         feedbacks.forEach(feedback => {
    //             feedback.messageSentDate = feedback.messageSentDate.split('T')[0];
    //             this.feedbackRegistry.set(feedback.feedbackID, feedback)
    //         })
    //         this.setLoadingInitial(false);
    //     }

    //     catch (error) {
    //         console.log(error);

    //         this.setLoadingInitial(false);

    //     }
    // }

   
    

    loadFeedbacksNxenesi = async (email:string | undefined)=>{
        try{
            const feedbacks = await agent.FeedbackToNxenesit.listNxenesi(email);
            
            feedbacks.forEach(feedback=>{
                feedback.messageSentDate = feedback.messageSentDate.split('T')[0];
                this.feedbackRegistry.set(feedback.feedbackID,feedback);
                
            })
            this.setLoadingInitial(false);
        }
        catch(error){
            console.log(error);
            this.setLoadingInitial(false);
            
        }
    }
    selectFeedbackReplay = (id: string) => {
        this.selectedFeedback = this.feedbackRegistryReplay.get(id);
        this.modalMode = true;
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectFeedback = (id: string) => {
        this.selectedFeedback = this.feedbackRegistry.get(id);
    }

    cancelSelectedFeedback = () => {
        this.selectedFeedback = undefined;

    }

    openForm = (id?: string) => {
        id ? this.selectFeedback(id) : this.cancelSelectedFeedback();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createFeedback = async (feedback: FeedbackToNxenesi) => {
        this.loading = true;
        feedback.feedbackID = uuid();
        try {
            await agent.FeedbackToNxenesit.create(feedback);
            runInAction(() => {
                this.feedbackRegistry.set(feedback.feedbackID, feedback)
                this.selectedFeedback = feedback;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })

        }
    }
    deleteFeedback = async (id: string) => {
        this.loading = true;
        try {
            await agent.FeedbackToNxenesit.delete(id);
            runInAction(() => {
                this.feedbackRegistry.delete(id);
                if (this.selectedFeedback?.feedbackID === id) this.cancelSelectedFeedback();
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }


}

