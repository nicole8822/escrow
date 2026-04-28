package integration

import (
"bytes"
"encoding/json"
"net/http"
"os"
)

type PaystackInitResponse struct {
Status bool `json:"status"`
Data   struct {
AuthorizationURL string `json:"authorization_url"`
Reference        string `json:"reference"`
} `json:"data"`
}

func InitializeFiatEscrow(email string, amount float64) (*PaystackInitResponse, error) {
url := "https://api.paystack.co/transaction/initialize"
secretKey := os.Getenv("PAYSTACK_SECRET_KEY")

// Paystack amounts are in kobo (subunit)
payload, _ := json.Marshal(map[string]interface{}{
"email":  email,
"amount": int(amount * 100), 
})

req, _ := http.NewRequest("POST", url, bytes.NewBuffer(payload))
req.Header.Set("Authorization", "Bearer "+secretKey)
req.Header.Set("Content-Type", "application/json")

client := &http.Client{}
resp, err := client.Do(req)
if err != nil {
return nil, err
}
defer resp.Body.Close()

var result PaystackInitResponse
json.NewDecoder(resp.Body).Decode(&result)
return &result, nil
}
