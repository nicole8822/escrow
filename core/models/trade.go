package models

import "time"

type Trade struct {
ID              string    `json:"id" db:"trade_id"`
BuyerAddress    string    `json:"buyer_address" db:"buyer_address"`
SellerAddress   string    `json:"seller_address" db:"seller_address"`
AmountFiat      float64   `json:"amount_fiat" db:"amount_fiat"`
InsuranceCrypto float64   `json:"insurance_crypto" db:"insurance_crypto"`
TrackingNumber  string    `json:"tracking_number" db:"tracking_number"`
Carrier         string    `json:"carrier" db:"carrier"`
Status          int       `json:"status" db:"status"`
VideoHash       string    `json:"video_hash" db:"video_hash"`
CreatedAt       time.Time `json:"created_at" db:"created_at"`
}
