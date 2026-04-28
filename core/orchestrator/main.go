package main

import (
"fmt"
"log"
"net/http"
)

func main() {
fmt.Println(" TrustVault Orchestrator Starting...")
fmt.Println("Listening for Logistics Signals & Escrow Events...")

// Future: Initialize gRPC handlers here
log.Fatal(http.ListenAndServe(":8080", nil))
}
