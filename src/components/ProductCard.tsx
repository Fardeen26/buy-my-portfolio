"use client"

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import axios from "axios";

interface RazorpayOptions {
    key: string | undefined;
    amount: string;
    currency: string;
    name: string;
    description: string;
    image: string;
    order_id: string;
    callback_url: string;
    theme: {
        color: string;
    };
}

interface Razorpay {
    new(options: RazorpayOptions): {
        open: () => void;
    };
}

declare global {
    interface Window {
        Razorpay: Razorpay;
    }
}

export default function ProductCard() {
    const handleCheckout = async () => {
        try {
            const response = await axios.post('/api/checkout', { price: 100 })
            if (response.status === 200) {
                const order = response.data.message;
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
                    amount: order.amount.toString(),
                    currency: "INR",
                    name: "Enrich Hair Salon",
                    description: 'damn ahh portfolio',
                    image: 'https://pbs.twimg.com/profile_images/1898061647660429312/j3NKy9AP_400x400.jpg',
                    order_id: order.id,
                    callback_url: `https://fardeen.tech`,
                    theme: {
                        "color": "#121212"
                    }
                };

                const razor = new window.Razorpay(options)
                razor.open();
            }
        } catch (error) {
            console.error('Checkout error:', error);
        }
    }

    return (
        <section>
            <Card className="max-w-md">
                <CardHeader className="flex justify-center px-0 w-full">
                    <Image src={'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg'} alt="sher" width={300} height={300} />
                </CardHeader>
                <CardContent>
                    <h2>Fardeen&apos;s Portfolio</h2>
                    <p>$19 only</p>
                    <div className="flex flex-wrap gap-3">
                        <Badge>Next.js</Badge>
                        <Badge>Shadcn</Badge>
                        <Badge>Prisma</Badge>
                        <Badge>Postgres</Badge>
                    </div>
                    <p className="whitespace-break-spaces">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab possimus minima tempore earum odit aut quia.</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full">Live Demo</Button>
                    <Button className="w-full" onClick={handleCheckout}>Buy Now</Button>
                </CardFooter>
            </Card>
        </section>
    )
}