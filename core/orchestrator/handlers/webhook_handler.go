package handlers

import (
"crypto/hmac"
"crypto/sha512"
"encoding/hex"
"encoding/json"
"fmt"
"io"
"net/http"
"os"
)

type PaystackWebhook struct {
Event string `json:"event"`
Data  struct {
Reference string `json:"reference"`
Status    string `json:"status"`
Amount    int    `json:"amount"`
} `json:"data"`
}

func HandlePaystackWebhook(w http.ResponseWriter, r *http.Request) {
// 1. Security Check: Verify Paystack Signature
paystackSignature := r.Header.Get("x-paystack-signature")
secret := os.Getenv("PAYSTACK_SECRET_KEY")

body, _ := io.ReadAll(r.Body)
hash := hmac.New(sha512.New, []byte(secret))
hash.Write(body)
expectedSignature := hex.EncodeToString(hash.Sum(nil))

if paystackSignature != expectedSignature {
http.Error(w, "Fake Webhook Detected", http.StatusUnauthorized)
return
}

// 2. Parse the Signal
var event PaystackWebhook
json.Unmarshal(body, &event)

if event.Event == "charge.success" {
fmt.Printf("ESCROW ALERT: Funds Locked for Ref %s\n", event.Data.Reference)
//  DNA UPDATE: Here you update the DB status to 'FUNDS_LOCKED' (Status 1)
// and trigger the Logistics Watcher to start pings.
}

w.WriteHeader(http.StatusOK)
}
