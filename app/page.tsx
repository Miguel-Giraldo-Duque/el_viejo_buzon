import { HomePage } from "@/components/home-page";
import { getSite } from "@/lib/content";

export default function Page() {
  return <HomePage site={getSite()} />;
}
