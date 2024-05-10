export interface UserSchema {
  id: string;
  username: string;
  points: string;
  profileImage: string;
}

export interface CouponSchema {
  id: string;
  userId: string;
  code: string;
  usedAt: string;
}

export interface PetInfoSchema {
  id: string;
  type: string;
  level: string;
}
