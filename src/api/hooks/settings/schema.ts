export interface ISettingsData {
  _id: string;
  contactNo: string;
  contactEmail: string;
  businessRegistrationNo: string;
  status: string;
  isDeleted: boolean;
}

export interface getResponse {
  statusCode: number;
  message: string;
  data: ISettingsData;
}

export interface IUpdatePayload {
  id: string;
  contactNo: string;
  contactEmail: string;
  businessRegistrationNo: string;
}
