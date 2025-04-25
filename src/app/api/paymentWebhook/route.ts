import { redis } from '@/utils/redis';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log('step 4, payment webhook started');
    const signature = req.headers.get('x-razorpay-signature');

    try {
        const bodyString = await req.text();
        console.log('step 5, body string:', bodyString);
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || '')
            .update(bodyString)
            .digest('hex');

        if (signature === expectedSignature) {
            const event = JSON.parse(bodyString);

            if (event.event === 'payment.captured') {
                const payment = event.payload.payment.entity;
                console.log('step 6, payment captured:', payment);
                (await redis).set(payment.id, JSON.stringify(payment), { EX: 600 }); // TTL 10 mins
            }
            if (event.event === 'payment.failed') {
                return NextResponse.redirect('/')
            }
            return NextResponse.json('OK', { status: 200 });
        }
        else {
            return NextResponse.json('Invalid signature', { status: 400 });
        }

    } catch (error) {
        console.error('Error handling webhook:', error);
        return NextResponse.json('Error handling webhook', { status: 500 });
    }
}