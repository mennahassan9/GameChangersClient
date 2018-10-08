import { InviteeModel } from "./inviteeModel";

export class TeamInviteModel
{
    teamName: String;
    members: Array<InviteeModel> = new Array<InviteeModel>();
    challenge: String;
}