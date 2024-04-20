import { User } from "@prisma/client";

interface IJWTData extends User {
  tokenType?: "access_token" | "refresh_token";
}
