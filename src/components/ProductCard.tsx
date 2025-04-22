import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function ProductCard() {
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
                    <Button className="w-full">Buy Now</Button>
                </CardFooter>
            </Card>
        </section>
    )
}