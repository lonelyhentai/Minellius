export interface IJwtPayload {
  readonly id: number;
  readonly username: string;
  readonly isStaff: boolean;
  readonly isActive: boolean;
  readonly isSuperuser: boolean;
  readonly groups: { name: string }[];
  readonly iat: number;
  readonly exp: number;
}
