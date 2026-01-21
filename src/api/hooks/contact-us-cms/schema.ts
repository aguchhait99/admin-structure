export interface IContactUsCmsData {
  _id: string;
  pageTitle: string;
  bannerImage: string;
  headerText: string;
  description: string;
  status: string;
  isDeleted: boolean;
}

export interface getResponse {
    statusCode: number;
    message: string;
    data: IContactUsCmsData;
  }

export interface IUpdatePayload {
    id: string;
    pageTitle: string;
    headerText: string;
    description: string;
    bannerImage?: File;
  }
