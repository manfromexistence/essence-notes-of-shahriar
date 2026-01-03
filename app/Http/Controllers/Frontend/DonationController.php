<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\DonationPageSetting;
use App\Models\DonationRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Donation::where('is_active', true)
            ->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->get();

        $pageSettings = DonationPageSetting::first();

        return Inertia::render('Donation/Page/Donations', [
            'donations' => $donations,
            'pageSettings' => $pageSettings,
        ]);
    }

    public function show($id)
    {
        $donation = Donation::where('is_active', true)
            ->findOrFail($id);

        $pageSettings = DonationPageSetting::first();

        return Inertia::render('Donation/Page/DonationDetail', [
            'donation' => $donation,
            'pageSettings' => $pageSettings,
        ]);
    }

    public function storeDonationInterest(Request $request)
    {
        $validated = $request->validate([
            'donation_id' => 'nullable|exists:donations,id',
            'donor_name' => 'required|string|max:255',
            'donor_email' => 'required|email|max:255',
            'donor_mobile' => 'nullable|string|max:20',
            'amount' => 'required|numeric|min:1',
            'message' => 'nullable|string|max:1000',
        ]);

        DonationRecord::create($validated);

        return redirect()->back()->with('success', 'Thank you for your donation interest! We will contact you shortly.');
    }
}