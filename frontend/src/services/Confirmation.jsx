import ExploreNavBar from "@/Components/Landing/Navbar";
import { CheckCircle, Calendar, Camera, Clock } from "lucide-react";

const ConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a1a]">
      <ExploreNavBar />

      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Success Header */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 text-green-600 rounded-full mb-6">
            <CheckCircle size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Request Received
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            Your request for **Professional Graduation Portraits** has been sent
            to Elena Sterling. You’ll receive a response within 24 hours.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-[#f9f9f9] rounded-2xl p-8 text-left border border-gray-100 mb-10">
          <h2 className="text-xl font-bold mb-6">Booking Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Camera className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                  Service
                </p>
                <p className="font-medium text-lg">
                  Graduation Portrait Session
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                  Duration
                </p>
                <p className="font-medium text-lg">90 – 180 Minutes</p>
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-200" />

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Estimated Total</p>
              <p className="text-2xl font-bold">$249.00</p>
            </div>
            <button className="bg-[#0a2612] text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
              View My Requests
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-sm text-gray-500">
          <p>
            Need to make a change?{" "}
            <span className="underline cursor-pointer">
              Message the Curator
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ConfirmationPage;
