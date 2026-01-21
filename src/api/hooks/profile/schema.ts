export type TProfileSchema = {
  IProfileUpdatePayload: FormData; // Accept FormData instead of an object

  IProfileUpdateResponse: {
    statusCode: number;
    message: string;
    data: Record<string, unknown>;
  };
  IPasswordChangePayload: {
    currentPassword: string;
    password: string;
  };
  IPasswordUpdateResponse: {
    statusCode: number;
    message: string;
    data: Record<string, unknown>;
  };
};
