// import { redis } from "@/utils/redis";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//     console.log('step 2, payment verification started');

//     const bodyString = await req.text();
//     const params = new URLSearchParams(bodyString);
//     const razorpay_payment_id = params.get('razorpay_payment_id');

//     console.log("razorpay payment id", razorpay_payment_id)

//     if (!razorpay_payment_id) {
//         return Response.redirect('/');
//     }

//     const paymentRaw = await (await redis).get(razorpay_payment_id);

//     if (!paymentRaw) {
//         console.log("payment failed")
//         return Response.redirect('/');
//     }

//     // const booking = new Booking({
//     //     name: payment.notes.name,
//     //     email: payment.notes.email,
//     //     phone: payment.notes.phone,
//     //     service: payment.notes.service,
//     //     date: payment.notes.date,
//     //     time: payment.notes.time,
//     //     price: payment.amount / 100,
//     //     payment_id: payment.id,
//     //     payment: payment.status
//     // });

//     try {
//         // await booking.save();
//         (await redis).del(razorpay_payment_id); // delete after use

//         // Parse the paymentRaw string to access status
//         const payment = JSON.parse(paymentRaw);
//         if (payment.status === 'failed') {
//             console.log('step 3, payment failed');
//             return NextResponse.redirect('/');
//         }

//         console.log('step 3, payment success');
//         return NextResponse.redirect('/payment-success');

//     } catch (error) {
//         console.error('Error saving booking:', error);
//         return NextResponse.json({ error: 'Error on saving booking' }, { status: 500 });
//     }
// }



import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const generatedSignature = (
    razorpayOrderId: string,
    razorpayPaymentId: string
) => {
    const keySecret = process.env.RAZORPAY_SECRET_KEY;
    if (!keySecret) {
        throw new Error(
            'Razorpay key secret is not defined in environment variables.'
        );
    }
    const sig = crypto
        .createHmac('sha256', keySecret)
        .update(razorpayOrderId + '|' + razorpayPaymentId)
        .digest('hex');
    return sig;
};


export async function POST(request: NextRequest) {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } =
        await request.json();

    const signature = generatedSignature(orderCreationId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
        return NextResponse.json(
            { message: 'payment verification failed', isOk: false },
            { status: 400 }
        );
    }
    return NextResponse.json(
        { message: 'payment verified successfully', isOk: true },
        { status: 200 }
    );
}