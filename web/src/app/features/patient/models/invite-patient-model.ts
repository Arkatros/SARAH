import { UserPayload } from "../../../core/models/jwt-payload";


export interface InvitePatientModel {
  name: string;
  email: string;
  token?: UserPayload ;
}
