import { CampaignService } from "@/services/campaign.service";
import { CampaignList } from "./components/CampaignList";
import { auth } from "@/auth";
import { Header } from "../components/Header";

export default async function Home() {
  const session = await auth();

  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.error("API URL is missing in .env.local");
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-gray-600">
          Please include `NEXT_PUBLIC_API_URL` in your environment variables.
        </p>
      </div>
    );
  }

  try {
    const res = await CampaignService.list({});

    return (
      <>
        <Header />
        <CampaignList
          data={(res || [])?.filter((el) => el.user === session?.user.token)}
        />
      </>
    );
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-gray-600">
          Failed to fetch campaigns. Please check your NEXT_PUBLIC_API_URL.
        </p>
      </div>
    );
  }
}
