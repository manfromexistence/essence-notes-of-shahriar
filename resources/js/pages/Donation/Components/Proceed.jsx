import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { router } from "@inertiajs/react";

const Proceed = ({ donation, pageSettings }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  // Calculate progress - parse amounts as numbers to handle decimal strings from backend
  const goalAmount = parseFloat(donation?.goal_amount) || 0;
  const raisedAmount = parseFloat(donation?.raised_amount) || 0;
  const progress = goalAmount > 0 
    ? (raisedAmount / goalAmount) * 100 
    : 0;

  const handleSubmit = () => {
    if (!selectedAmount || !formData.name || !formData.email) return;
    
    setIsSubmitting(true);
    
    router.post(`/donate-details/${donation.id}/submit`, {
      donor_name: formData.name,
      donor_email: formData.email,
      donor_mobile: formData.mobile,
      amount: selectedAmount,
      message: formData.message,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsModalOpen(true);
        setIsSubmitting(false);
      },
      onError: () => {
        setIsSubmitting(false);
        alert('Something went wrong. Please try again.');
      },
    });
  };

  return (
    <div className="bg-slate-50 py-18">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="mt-24">
          <h1 className="text-5xl font-semibold text-slate-900 mb-6">
            {donation?.title || "Donation Campaign"}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="w-full">
                <img
                  className="w-full h-[600px] object-cover rounded-2xl"
                  src={donation?.image || "/assets/donation/donate_card1.png"}
                  alt={donation?.title || "Donation"}
                />
              </div>
              
              {/* Progress section */}
              <div className="mt-6 bg-white rounded-xl p-6 shadow">
                <div className="flex justify-between text-lg mb-3">
                  <span className="text-slate-600">Raised: ${raisedAmount.toLocaleString()}</span>
                  <span className="text-slate-900 font-medium">Goal: ${goalAmount.toLocaleString()}</span>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-center mt-3 text-blue-600 font-semibold">{progress.toFixed(1)}% of goal reached</p>
              </div>

              {/* Description */}
              {donation?.description && (
                <div className="mt-6 bg-white rounded-xl p-6 shadow">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">About This Campaign</h2>
                  <p className="text-slate-700 leading-relaxed">{donation.description}</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow h-fit">
              <h1 className="text-2xl font-semibold text-slate-900 mb-4">
                Make a Donation
              </h1>
              <p className="text-slate-700 mb-6">
                Ready to make a difference? Your contribution helps us continue our mission and support those in need.
              </p>

              {/* Donation Amount Selection */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[50, 100, 200, 300].map((amount) => (
                  <button
                    key={amount}
                    className={`px-4 py-2 border rounded-lg text-blue-500 font-semibold transition ${
                      selectedAmount === amount
                        ? "bg-blue-100 border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedAmount(amount)}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <div className="space-y-4 mt-4">
                <input
                  type="text"
                  placeholder="Custom Amount ($)"
                  value={selectedAmount || ""}
                  onChange={(e) => setSelectedAmount(e.target.value)}
                  className="rounded-xl bg-slate-50 p-4 w-full text-slate-900"
                />

                <input
                  type="text"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="rounded-xl bg-slate-50 p-4 w-full text-slate-900"
                />

                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="rounded-xl bg-slate-50 p-4 w-full text-slate-900"
                />

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="rounded-xl bg-slate-50 p-4 w-full text-slate-900"
                />

                <textarea
                  placeholder="Message (Optional)"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={3}
                  className="rounded-xl bg-slate-50 p-4 w-full text-slate-900 resize-none"
                />

                <div className="flex items-center justify-center">
                  <button
                    className="bg-[#2E5AFF] text-white rounded-lg font-semibold px-8 py-3 w-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                    disabled={!selectedAmount || !formData.name || !formData.email || isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Donation Interest'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 z-50"
          onClick={() => setIsModalOpen(false)} 
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl transform transition-all duration-300 scale-95 sm:scale-100 mx-4"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Thank You!</h2>
            <p className="text-slate-600 mb-6">
              Your donation interest of <span className="font-semibold text-blue-600">${selectedAmount}</span> has been received. 
              We will contact you shortly with payment details.
            </p>
            
            {formData.name && (
              <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
                <h3 className="font-semibold text-slate-900 mb-2">Your Details:</h3>
                <p className="text-slate-700 text-sm">Name: {formData.name}</p>
                {formData.email && <p className="text-slate-700 text-sm">Email: {formData.email}</p>}
                {formData.mobile && <p className="text-slate-700 text-sm">Mobile: {formData.mobile}</p>}
              </div>
            )}

            <button
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition w-full"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proceed;
