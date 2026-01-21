import { TCommonSchema } from '@/types/common/common.schema';

export interface ICmsDoc {
  _id: string;
  title: string;
  slug: string;
  status: string;
  createdAt: string;
}

export interface ICmsDetail extends ICmsDoc {
  content: string;
  isDeleted: boolean;
  updatedAt: string;
}

export interface getAllCmsSuccessResponse {
    statusCode: number;
    message: string;
    data: {
      meta: TCommonSchema['BaseMetaResponse'];
      docs: ICmsDoc[];
    };
  }

export interface getCmsResponseById {
    statusCode: number;
    message: string;
    data: ICmsDetail;
  }

export interface IUpdatePayload {
    id: string;
    title: string;
    content: string;
  }

export interface IStatusChangePayload {
    id: string;
    status: string;
  }
