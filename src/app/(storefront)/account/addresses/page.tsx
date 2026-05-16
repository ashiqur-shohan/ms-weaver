import { AddressesContent } from "./AddressesContent";
import { customers } from "@/lib/mock/customers";

const mockUser = customers[0]!;

export default function AddressesPage() {
  return <AddressesContent addresses={mockUser.savedAddresses} />;
}
