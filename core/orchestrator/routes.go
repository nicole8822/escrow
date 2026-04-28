package main

import (
"net/http"
"trustvault/core/orchestrator/handlers"
)

func SetupRoutes() {
http.HandleFunc("/trade/create", handlers.HandleCreateTrade)
http.HandleFunc("/logistics/track", handlers.HandleLogisticsStatus)
http.HandleFunc("/auth/verify", handlers.HandleAuth)
}
