import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // make sure you install it

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
const JWT_SECRET = process.env.JWT_SECRET;


export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Missing or invalid token' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];

        const decoded: any = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        // Example response. You should fetch real user data from DB here
        return NextResponse.json({
            id: decoded.id,
            name: decoded.name,
            role: decoded.role, // must be 'lawyer' or 'user'
            email: decoded.email
        });

    } catch (err) {
        console.error('Profile route error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
