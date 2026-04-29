package main

import (
"net/http"
"trustvault/core/orchestrator/handlers"
)

func SetupRoutes() {
// ── USER ORIENTED ROUTES ──
// Handles trade initiation and the "Pay Now" flow
http.HandleFunc("/trade/create", handlers.HandleCreateTrade)

// Returns real-time weight and logistics status to the UI
http.HandleFunc("/logistics/track", handlers.HandleLogisticsStatus)

// Gatekeeper for session and signature verification
http.HandleFunc("/auth/verify", handlers.HandleAuth)

// ── EXTERNAL ORACLE & PARTNER ROUTES ──
// Entry point for Paystack's automated "Payment Successful" signal
http.HandleFunc("/webhook/paystack", handlers.HandlePaystackWebhook)
}
