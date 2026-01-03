<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DonationRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationRecordController extends Controller
{
    public function index()
    {
        $records = DonationRecord::with('donation')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/donation-records/index', [
            'records' => $records,
        ]);
    }

    public function show(DonationRecord $donationRecord)
    {
        $donationRecord->load('donation');
        
        return Inertia::render('dashboard/donation-records/show', [
            'record' => $donationRecord,
        ]);
    }

    public function updateStatus(Request $request, DonationRecord $donationRecord)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,contacted,completed,cancelled',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        $donationRecord->update($validated);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }

    public function destroy(DonationRecord $donationRecord)
    {
        $donationRecord->delete();

        return redirect()->back()->with('success', 'Donation record deleted successfully!');
    }
}
