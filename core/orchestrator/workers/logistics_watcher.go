package workers

import (
"encoding/json"
"fmt"
"net/http"
"trustvault/shared/gen/go" // DNA package
)

type DHLTrackingResponse struct {
ActualWeight float64 `json:"actualWeight"`
Unit         string  `json:"unit"`
}

func WatchShipment(trackingNum string) (float64, error) {
//  Pro-tip: Use your DHL Developer API Key
url := fmt.Sprintf("https://dhl.com", trackingNum)

req, _ := http.NewRequest("GET", url, nil)
req.Header.Set("DHL-API-Key", "YOUR_DHL_KEY")

client := &http.Client{}
resp, err := client.Do(req)
if err != nil {
return 0, err
}
defer resp.Body.Close()

var result DHLTrackingResponse
json.NewDecoder(resp.Body).Decode(&result)

fmt.Printf("📦 Logistics Signal: Tracking %s | Weight: %f %s\n", trackingNum, result.ActualWeight, result.Unit)
return result.ActualWeight, nil
}
