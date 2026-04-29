package handlers

import (
"encoding/json"
"net/http"
"trustvault/core/integration"
"trustvault/core/orchestrator/workers"
)

func HandleCreateTrade(w http.ResponseWriter, r *http.Request) {
var req struct {
TrackingNumber string  `json:"tracking_number"`
Carrier        string  `json:"carrier"`
Email          string  `json:"email"`
Amount         float64 `json:"amount"`
}

// 1. Decode the request from the Cinematic UI
if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
http.Error(w, "Invalid request payload", http.StatusBadRequest)
return
}

// 2. Initialize the Fiat Escrow via Paystack
paystackResp, err := integration.InitializeFiatEscrow(req.Email, req.Amount)
if err != nil {
http.Error(w, "Failed to initialize Paystack escrow", http.StatusInternalServerError)
return
}

// 3. Start the Logistics Watcher (Go Worker) in the background
// This monitors the DHL/FedEx weight signals while the user pays
go workers.WatchShipment(req.TrackingNumber)

// 4. Return the Payment URL and Watcher status
w.Header().Set("Content-Type", "application/json")
w.WriteHeader(http.StatusOK)
json.NewEncoder(w).Encode(map[string]interface{}{
"status":            "Watcher Initialized",
"authorization_url": paystackResp.Data.AuthorizationURL,
"reference":         paystackResp.Data.Reference,
})
}

func HandleLogisticsStatus(w http.ResponseWriter, r *http.Request) {
//  Logic for querying the Logistics Watcher's current state from the database
w.Write([]byte("Tracking active..."))
}
