
  export interface CreatedBy {
    id: number;
    firstname: string;
    lastname: string;
    username?: any;
    email: string;
    password: string;
    resetPasswordToken?: any;
    registrationToken?: any;
    isActive: boolean;
    blocked?: any;
    preferedLanguage?: any;
  }

  export interface UpdatedBy {
    id: number;
    firstname: string;
    lastname: string;
    username?: any;
    email: string;
    password: string;
    resetPasswordToken?: any;
    registrationToken?: any;
    isActive: boolean;
    blocked?: any;
    preferedLanguage?: any;
  }

  export interface Slots {
    id: number;
    available: boolean;
    date: string;
    start: Date;
    end: Date;
    user?: any;
    booking?: any;
    tag?: any;
    account?: any;
    created_by: CreatedBy;
    updated_by: UpdatedBy;
    created_at: Date;
    updated_at: Date;
    label: string;
  }



