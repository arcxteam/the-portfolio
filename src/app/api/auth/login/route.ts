import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ============================================================
// ADMIN AUTHENTICATION
// Supports 2 modes:
//   1. ADMIN_PASSWORD      → plain text password (simple/dev)
//   2. ADMIN_PASSWORD_HASH → bcrypt hashed password (production)
// If both are set, ADMIN_PASSWORD takes priority.
// Default: admin / admin123
// ============================================================
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || null;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || null;
const JWT_SECRET = process.env.JWT_SECRET || "portfolio-secret-key-change-in-production";

// Fallback default hash for "admin123"
const DEFAULT_HASH = bcrypt.hashSync("admin123", 10);

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (username !== ADMIN_USERNAME) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Mode 1: Plain text password comparison
    let valid = false;
    if (ADMIN_PASSWORD) {
      valid = password === ADMIN_PASSWORD;
    } else {
      // Mode 2: Bcrypt hash comparison
      const hash = ADMIN_PASSWORD_HASH || DEFAULT_HASH;
      valid = await bcrypt.compare(password, hash);
    }

    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ username, role: "admin" }, JWT_SECRET, { expiresIn: "24h" });

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 24 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
