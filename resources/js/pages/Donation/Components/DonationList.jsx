import { Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const DonationList = ({ donations = [], pageSettings }) => {
  // Default donations if none provided
  const defaultDonations = [
    {
      id: 1,
      title: "Help Children Education",
      description: "Support education for underprivileged children",
      image: "/assets/donation/donate_card1.png",
      goal_amount: 10000,
      raised_amount: 7500,
      category: "Education"
    },
    {
      id: 2,
      title: "Medical Support Fund",
      description: "Provide medical assistance to those in need",
      image: "/assets/donation/donate_card2.png",
      goal_amount: 15000,
      raised_amount: 9000,
      category: "Healthcare"
    },
  ];

  const displayDonations = donations.length > 0 ? donations : defaultDonations;

  return (
    <div className="bg-slate-100 py-18">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <h2 className="text-4xl lg:text-5xl text-slate-900 font-bold mb-4 text-center">
          {pageSettings?.donate_section_title || 'Active Campaigns'}
        </h2>
        <p className="text-lg text-slate-600 text-center mb-12">
          {pageSettings?.donate_section_description || 'Choose a cause that matters to you and make a difference today'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayDonations.map((donation) => {
            // Parse amounts as numbers to handle decimal strings from backend
            const goalAmount = parseFloat(donation.goal_amount) || 0;
            const raisedAmount = parseFloat(donation.raised_amount) || 0;
            const progress = goalAmount > 0 
              ? (raisedAmount / goalAmount) * 100 
              : 0;

            return (
              <Card key={donation.id} className="overflow-hidden hover:shadow-lg transition-shadow p-0!">
                <div className="relative h-48">
                  <img
                    src={donation.image || "/assets/donation/donate_card1.png"}
                    alt={donation.title}
                    className="w-full h-full object-cover"
                  />
                  {donation.category && (
                    <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {donation.category}
                    </span>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {donation.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {donation.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Raised: ${raisedAmount.toLocaleString()}</span>
                      <span className="text-slate-900 font-medium">Goal: ${goalAmount.toLocaleString()}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <Link href={`/donate-details/${donation.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Donate Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DonationList;
