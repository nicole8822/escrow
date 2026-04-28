package integration

import (
"encoding/json"
"fmt"
"net/http"
"os"
)

type DHLPayload struct {
Shipments []struct {
Status struct {
Description string `json:"description"`
} `json:"status"`
TotalWeight float64 `json:"totalWeight"`
} `json:"shipments"`
}

func FetchDHLData(trackingNum string) (float64, string, error) {
apiKey := os.Getenv("DHL_API_KEY")
url := fmt.Sprintf("https://dhl.com", trackingNum)

req, _ := http.NewRequest("GET", url, nil)
req.Header.Set("DHL-API-Key", apiKey)

client := &http.Client{}
resp, err := client.Do(req)
if err != nil {
return 0, "", err
}
defer resp.Body.Close()

var data DHLPayload
if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
return 0, "", err
}

if len(data.Shipments) > 0 {
return data.Shipments[0].TotalWeight, data.Shipments[0].Status.Description, nil
}

return 0, "NOT_FOUND", fmt.Errorf("shipment not found")
}
