PROTO_SRC=proto/trade.proto
GO_OUT=shared/gen/go
TS_OUT=shared/gen/ts

.PHONY: all gen-proto build-rust clean

all: gen-proto build-rust

gen-proto:
	mkdir -p $(GO_OUT) $(TS_OUT)
	protoc --go_out=. --go_opt=paths=source_relative $(PROTO_SRC)
	npx protoc-gen-ts --out $(TS_OUT) $(PROTO_SRC)

build-rust:
	cd core/validator && cargo build --release
	cp core/validator/target/release/libvalidator.a .
	cp core/validator/bridge.h .

clean:
	rm -rf shared/gen/*
	rm -f libvalidator.a bridge.h
	cd core/validator && cargo clean
