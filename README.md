# 🚀 [Thumblify]

A full-stack, high-performance Thumbnail generation web application featuring a sleek UI, robust authentication, asynchronous email queues, and AI-powered media management.

Built with scalability and user experience in mind, this project leverages modern web technologies and generative AI to deliver a seamless experience.

## ✨ Features

- **Sleek UI Design:** Beautiful, responsive frontend crafted with components from [PrebuiltUI](https://prebuiltui.com).
- **Secure Authentication:** Powered by **NextAuth.js** for seamless social and credential-based logins.
- **Lightning-Fast OTPs:** OTP generation and validation cached instantly using **Redis** for ultra-low latency.
- **Asynchronous Mail Queue:** Reliable email delivery handled via background job queues and **Nodemailer**, lowering the loading time significantly.
- **Cloud Media Management:** Direct integration with **Cloudinary** for scalable image and asset hosting.
- **AI-Powered Custom Thumbnails:** Intelligent, highly customizable thumbnail generation powered by **Gemini 3.5 Pro**, allowing context-aware image processing and generation on the fly.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (React) |
| Authentication | NextAuth.js |
| UI Components | Tailwind CSS & PrebuiltUI |
| Caching | Redis (Upstash) |
| Queue System and Worker | QStash(Upstash) |
| Email Service | Nodemailer |
| Media Storage | Cloudinary |
| Generative AI | Google Gemini 3.5 Pro API |

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Redis](https://redis.io/) (running locally, or a cloud instance like Upstash)
- A [Cloudinary](https://cloudinary.com/) account
- An SMTP email server (e.g., Gmail, AWS SES, Resend SMTP)
- A [Google AI Studio](https://aistudio.google.com/) API key for Gemini

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SayanIndra83/Thumblify.git
cd repo-name
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env` or `.env.local` file in the root of your project and add the following keys:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_string

# Redis (for OTP and queues)
REDIS_URL=redis://localhost:6379

# Nodemailer / SMTP
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
EMAIL_FROM=noreply@yourdomain.com

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Gemini AI
GEMINI_API_KEY=your_gemini_3_5_pro_api_key
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Architecture Highlights

- **OTP Flow:** When a user requests an OTP, it is generated and stored in *Redis* with an expiration time (TTL). Validation checks Redis directly, skipping database overhead.
- **Mail Queue:** Email tasks (like sending welcome emails or OTPs) are pushed to a Redis-backed queue. A worker processes these jobs in the background using Nodemailer, ensuring the user's API request finishes instantly.
- **Custom AI Thumbnails:** Instead of basic cropping, Gemini 3.5 Pro acts as an intelligent processing layer. Users can pass specific prompts or contextual data, and Gemini drives the generation of highly customized, relevant thumbnails before they are finalized and stored in Cloudinary.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
## 🧑‍💻 Aurhor 
Sayan Indra
## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
