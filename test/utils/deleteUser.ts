import { dbAuth } from "../../src";

export async function deleteUserAuth(email: string) {
  const user = await dbAuth.getUserByEmail(email);
  dbAuth.deleteUser(user.uid);
}
