import { ProfileContent } from "./ProfileContent";
import { customers } from "@/lib/mock/customers";

const mockUser = customers[0]!;

export default function ProfilePage() {
  return <ProfileContent user={mockUser} />;
}
