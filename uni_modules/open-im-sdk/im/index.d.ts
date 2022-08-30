import Emitter from "../event";
import { InitConfig, WsResponse, AtMsgParams, ImageMsgParams, SoundMsgParams, VideoMsgParams, FileMsgParams, MergerMsgParams, LocationMsgParams, CustomMsgParams, QuoteMsgParams, SendMsgParams, GetHistoryMsgParams, InsertSingleMsgParams, TypingUpdateParams, MarkC2CParams, GetOneCveParams, SetDraftParams, PinCveParams, AddFriendParams, InviteGroupParams, GetGroupMemberParams, CreateGroupParams, JoinGroupParams, TransferGroupParams, AccessGroupParams, SplitParams, AccessFriendParams, GroupInfoParams, RemarkFriendParams, PartialUserItem, isRecvParams, SearchLocalParams, InsertGroupMsgParams } from "../types";
export default class OpenIMSDK extends Emitter {
    private ws;
    private uid;
    private token;
    private platform;
    private wsUrl;
    private lock;
    private logoutFlag;
    private timer;
    private ws2promise;
    private onceFlag;
    constructor();
    /**
     *
     * @description init and login OpenIMSDK
     * @param uid userID
     * @param token token
     * @param url service url
     * @param platformID platformID
     * @param operationID? unique operation ID
     * @returns
     */
    login(config: InitConfig): Promise<WsResponse>;
    private iLogin;
    logout(operationID?: string): Promise<WsResponse>;
    getLoginStatus: (operationID?: string | undefined) => Promise<WsResponse>;
    getLoginUser: (operationID?: string | undefined) => Promise<WsResponse>;
    getSelfUserInfo: (operationID?: string | undefined) => Promise<WsResponse>;
    getUsersInfo: (data: string[], operationID?: string | undefined) => Promise<WsResponse>;
    setSelfInfo: (data: PartialUserItem, operationID?: string | undefined) => Promise<WsResponse>;
    createTextMessage: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    createTextAtMessage: (data: AtMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    createImageMessage: (data: ImageMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    createSoundMessage: (data: SoundMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    createVideoMessage: (data: VideoMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    createFileMessage: (data: FileMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    createMergerMessage: (data: MergerMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    createForwardMessage: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    createLocationMessage: (data: LocationMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    createCustomMessage: (data: CustomMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    createQuoteMessage: (data: QuoteMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    createCardMessage: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    sendMessage: (data: SendMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    sendMessageNotOss: (data: SendMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    getHistoryMessageList: (data: GetHistoryMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    revokeMessage: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    deleteMessageFromLocalStorage: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    markSingleMessageHasRead: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    markGroupMessageHasRead: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    insertSingleMessageToLocalStorage: (data: InsertSingleMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    insertGroupMessageToLocalStorage: (data: InsertGroupMsgParams, operationID?: string | undefined) => Promise<WsResponse>;
    typingStatusUpdate: (data: TypingUpdateParams, operationID?: string | undefined) => Promise<WsResponse>;
    markC2CMessageAsRead: (data: MarkC2CParams, operationID?: string | undefined) => Promise<WsResponse>;
    clearC2CHistoryMessage: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    clearGroupHistoryMessage: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    getAllConversationList: (operationID?: string | undefined) => Promise<WsResponse>;
    getConversationListSplit: (data: SplitParams, operationID?: string | undefined) => Promise<WsResponse>;
    getOneConversation: (data: GetOneCveParams, operationID?: string | undefined) => Promise<WsResponse>;
    getConversationIDBySessionType: (data: GetOneCveParams, operationID?: string | undefined) => Promise<WsResponse>;
    getMultipleConversation: (data: string[], operationID?: string | undefined) => Promise<WsResponse>;
    deleteConversation: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    setConversationDraft: (data: SetDraftParams, operationID?: string | undefined) => Promise<WsResponse>;
    pinConversation: (data: PinCveParams, operationID?: string | undefined) => Promise<WsResponse>;
    getTotalUnreadMsgCount: (operationID?: string | undefined) => Promise<WsResponse>;
    getConversationRecvMessageOpt: (conversationIDList: string[], operationID?: string | undefined) => Promise<WsResponse>;
    setConversationRecvMessageOpt: (data: isRecvParams, operationID?: string | undefined) => Promise<WsResponse>;
    searchLocalMessages: (data: SearchLocalParams, operationID?: string | undefined) => Promise<WsResponse>;
    addFriend: (data: AddFriendParams, operationID?: string | undefined) => Promise<WsResponse>;
    getDesignatedFriendsInfo: (data: string[], operationID?: string | undefined) => Promise<WsResponse>;
    getRecvFriendApplicationList: (operationID?: string | undefined) => Promise<WsResponse>;
    getSendFriendApplicationList: (operationID?: string | undefined) => Promise<WsResponse>;
    getFriendList: (operationID?: string | undefined) => Promise<WsResponse>;
    setFriendRemark: (data: RemarkFriendParams, operationID?: string | undefined) => Promise<WsResponse>;
    checkFriend: (data: string[], operationID?: string | undefined) => Promise<WsResponse>;
    acceptFriendApplication: (data: AccessFriendParams, operationID?: string | undefined) => Promise<WsResponse>;
    refuseFriendApplication: (data: AccessFriendParams, operationID?: string | undefined) => Promise<WsResponse>;
    deleteFriend: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    addBlack: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    removeBlack: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    getBlackList: (operationID?: string | undefined) => Promise<WsResponse>;
    inviteUserToGroup: (data: InviteGroupParams, operationID?: string | undefined) => Promise<WsResponse>;
    kickGroupMember: (data: InviteGroupParams, operationID?: string | undefined) => Promise<WsResponse>;
    getGroupMembersInfo: (data: Omit<InviteGroupParams, "reason">, operationID?: string | undefined) => Promise<WsResponse>;
    getGroupMemberList: (data: GetGroupMemberParams, operationID?: string | undefined) => Promise<WsResponse>;
    getJoinedGroupList: (operationID?: string | undefined) => Promise<WsResponse>;
    createGroup: (data: CreateGroupParams, operationID?: string | undefined) => Promise<WsResponse>;
    setGroupInfo: (data: GroupInfoParams, operationID?: string | undefined) => Promise<WsResponse>;
    getGroupsInfo: (data: string[], operationID?: string | undefined) => Promise<WsResponse>;
    joinGroup: (data: JoinGroupParams, operationID?: string | undefined) => Promise<WsResponse>;
    quitGroup: (data: string, operationID?: string | undefined) => Promise<WsResponse>;
    transferGroupOwner: (data: TransferGroupParams, operationID?: string | undefined) => Promise<WsResponse>;
    getSendGroupApplicationList: (operationID?: string | undefined) => Promise<WsResponse>;
    getRecvGroupApplicationList: (operationID?: string | undefined) => Promise<WsResponse>;
    acceptGroupApplication: (data: AccessGroupParams, operationID?: string | undefined) => Promise<WsResponse>;
    refuseGroupApplication: (data: AccessGroupParams, operationID?: string | undefined) => Promise<WsResponse>;
    private wsSend;
    private getPlatform;
    private createWs;
    private reconnect;
}
