interface BidsAsks {
    bids: string[],
    asks: string[]
}

export interface BinanceResponse extends BidsAsks {
    lastUpdateId: number
}

export interface KrakenResponse {
    error: any[],
    result: {
        XBTUSDT: BidsAsks
    },
} 

export interface HuobiResponse {
    ch: string,
    status: string,
    ts: number,
    tick: BidsAsks & {
        version: number,
        ts: number,
    },
} 