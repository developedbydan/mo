// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   try {
//     const { name, email, message } = await req.json();

//     if (!process.env.RESEND_API_KEY) {
//       throw new Error("Missing RESEND_API_KEY environment variable");
//     }

//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const data = await resend.emails.send({
//       from: "Portfolio Contact <onboarding@resend.dev>",
//       to: ["developedbydane@gmail.com"],
//       subject: `New message from ${name}`,
//       replyTo: email,
//       text: `
// Name: ${name}
// Email: ${email}
// Message: ${message}
//       `,
//       html: `
// <h2>New Contact Form Message</h2>
// <p><strong>Name:</strong> ${name}</p>
// <p><strong>Email:</strong> ${email}</p>
// <p><strong>Message:</strong></p>
// <p>${message.replace(/\n/g, '<br>')}</p>
//       `,
//     });

//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Failed to send email" },
//       { status: 500 }
//     );
//   }
// }
