// ./src/app/api/send-email/route.js

import sendMail from "@/marketing";

/**
 * @param {import('next/server').NextRequest} request
 * @returns Describe your return type here
 */
export async function POST(request) {
    const {to, subject, text} = await request.json();
    console.log(to, subject, text)

    const response = await sendMail({
        subject,
        text,
        to
    });

    // if (!response.ok) {
    //     return new Response('Something went wrong!', { status: 503 })
    // }

    return Response.json({ message: 'Email sent!' });
}