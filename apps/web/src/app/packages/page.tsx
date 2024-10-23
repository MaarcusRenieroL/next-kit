import { PackageCard } from "@/components/pages/packages/package-card";

export default function PackagesPage() {
  const authentication = {
    title: "Authentication",
    description: "Libraries and services for user authentication.",
    packages: [
      {
        title: "Next Auth",
        description:
          "A flexible authentication solution for Next.js applications.",
      },
      {
        title: "Clerk",
        description:
          "A complete user management system for authentication and authorization.",
      },
      {
        title: "Kinde",
        description: "A tool for handling authentication and user access.",
      },
      {
        title: "Lucia",
        description:
          "A lightweight library for simple and customizable authentication.",
      },
    ],
  };

  const databases = {
    title: "Databases",
    description: "Database options for managing data.",
    packages: [
      {
        title: "PostgreSQL",
        description:
          "A powerful, open-source object-relational database system.",
      },
      {
        title: "MySQL",
        description: "A popular, open-source relational database.",
      },
      {
        title: "MongoDB",
        description: "A NoSQL database for high-volume, unstructured data.",
      },
      {
        title: "SQLite",
        description: "A lightweight, self-contained SQL database engine.",
      },
    ],
  };

  const orm = {
    title: "ORMs",
    description:
      "Object-Relational Mapping libraries for interacting with databases.",
    packages: [
      {
        title: "Prisma",
        description:
          "A modern database toolkit to query and interact with databases using TypeScript/JavaScript.",
      },
      {
        title: "Drizzle",
        description:
          "A lightweight ORM alternative for simplified database access.",
      },
    ],
  };

  const email = {
    title: "Email",
    description: "Services for sending and managing emails.",
    packages: [
      {
        title: "Resend",
        description: "An API for sending transactional emails.",
      },
      { title: "Sendgrid", description: "A scalable email delivery service." },
      {
        title: "Postmark",
        description: "A reliable service for sending transactional emails.",
      },
      { title: "Mailgun", description: "A powerful email API for developers." },
    ],
  };

  const analytics = {
    title: "Analytics",
    description: "Tools for tracking and analyzing website data.",
    packages: [
      {
        title: "Vercel Analytics",
        description: "Integrated analytics for Vercel-deployed applications.",
      },
      {
        title: "Google Analytics",
        description:
          "A comprehensive tool for tracking website traffic and user behavior.",
      },
    ],
  };

  const payments = {
    title: "Payments",
    description: "Payment gateways for handling transactions.",
    packages: [
      {
        title: "Stripe",
        description: "A popular online payment processing platform.",
      },
      {
        title: "Paypal",
        description:
          "A widely-used payment platform for businesses and individuals.",
      },
      {
        title: "RazorPay",
        description:
          "An online payment gateway for accepting payments in India.",
      },
      {
        title: "Lemon Squeezy",
        description:
          "A platform for handling payments for software and digital products.",
      },
    ],
  };

  const api = {
    title: "APIs",
    description: "Frameworks and protocols for building and consuming APIs.",
    packages: [
      {
        title: "Rest API",
        description:
          "A widely-used architectural style for designing networked applications.",
      },
      {
        title: "tRPC",
        description: "A library for building fully type-safe APIs.",
      },
      {
        title: "Hono.js",
        description: "A lightweight, fast web framework for developing APIs.",
      },
      {
        title: "GraphQL",
        description:
          "A query language for APIs that enables fetching specific data in a single request.",
      },
    ],
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-10 space-y-10">
      <h1 className="text-5xl font-bold">Packages</h1>
      <PackageCard service={api} direction="right" />
      <PackageCard service={authentication} direction="left" />
      <PackageCard service={databases} direction="right" />
      <PackageCard service={orm} direction="left" />
      <PackageCard service={email} direction="right" />
      <PackageCard service={payments} direction="left" />
      <PackageCard service={analytics} direction="right" />
    </div>
  );
}
