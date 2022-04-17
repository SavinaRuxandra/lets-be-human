import { CharityOrganization } from "../models/charity-organization.model";
import { Donor } from "../models/donor.model";
import { UserRole } from "../models/user-role.model";

export const LOGIN_URL = '/login';
export const ROOT_URL = '/';

export const loggedCharityOrganization : CharityOrganization | Donor | null = null;
export const loggedRole: UserRole | null = null;