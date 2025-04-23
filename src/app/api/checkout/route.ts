import { razorpayInstance } from "@/utils/razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { price } = body;

    const options = {
        amount: price * 100,
        currency: "INR",
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        return NextResponse.json(
            {
                success: true,
                message: order
            },
            {
                status: 200
            }
        )
    } catch (error) {
        return NextResponse.json(
            {
                success: true,
                message: error instanceof Error ? error.message : 'Payment processing failed'
            },
            {
                status: 200
            }
        )
    }
}