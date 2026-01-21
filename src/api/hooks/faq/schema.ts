import { TCommonSchema } from '@/types/common/common.schema';

export type TFaqModel = {
  IDoc: {
    _id: string;
    question: string;
    answer: string;
    type?: string;
    status: string;
    createdAt: string;
  };
  IFaqGetAllPayload: {
    page: number;
    limit: number;
    search?: string;
    type: string;
    status?: string;
    sortField?: string;
    sortOrder?: string;
  };
  IFaqGetAllResponse: {
    meta: TCommonSchema['BaseMetaResponse'];
    docs: TFaqModel['IDoc'][];
  };
  IFaqSavePayload: {
    question: string;
    answer: string;
    type: string;
  };
  IFaqDeleteResponse: {
    statusCode: number;
    message: string;
  };
  IFaqUpdatePayload: {
    id: string;
    type: string;
    question: string;
    answer: string;
  };
  IFaqStatusChangePayload: {
    id: string;
    status: string;
  };
  IFaqResponseBody: {
    _id: string;
    type: string;
    question: string;
    answer: string;
    status: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  getFaqResponseById: TCommonSchema['BaseApiResponse'] & {
    data: TFaqModel['IFaqResponseBody'];
  };
  getAllFaqSuccessResponse: TCommonSchema['BaseApiResponse'] & {
    data: TFaqModel['IFaqGetAllResponse'];
  };
};

export type TFaqCategoryModel = {
  IDoc: {
    _id: string;
    name: string;
    status: string;
    createdAt: string;
  };
  IFaqCategoryGetAllPayload: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    sortField?: string;
    sortOrder?: string;
  };
  IFaqCategoryGetAllResponse: {
    meta: TCommonSchema['BaseMetaResponse'];
    docs: TFaqCategoryModel['IDoc'][];
  };
  IFaqCategorySavePayload: {
    name: string;
  };
  IFaqCategoryDeleteResponse: {
    statusCode: number;
    message: string;
  };
  IFaqCategoryUpdatePayload: {
    id?: string;
    name: string;
  };
  IFaqCategoryStatusChangePayload: {
    id: string;
    status: string;
  };
  IFaqCategoryResponseBody: {
    _id: string;
    name: string;
    status: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  getFaqCategoryResponseById: TCommonSchema['BaseApiResponse'] & {
    data: TFaqCategoryModel['IFaqCategoryResponseBody'];
  };
  getAllFaqCategorySuccessResponse: TCommonSchema['BaseApiResponse'] & {
    data: TFaqCategoryModel['IFaqCategoryGetAllResponse'];
  };
};
