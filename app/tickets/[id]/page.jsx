/**
 * fetch API MUST return a response.json()
 * response is as object
 *
 * Server component that uses the fetch MUST be async and MUST need an await
 * to get params
 */

import { notFound } from "next/navigation";

export const dynamicParams = true; // default

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets/");
  const tickets = await res.json();

  return tickets.map((ticket) => ({
    id: ticket.id,
  }));
}

async function getTicket(id) {
  const res = await fetch("http://localhost:4000/tickets/" + id, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

// we automatically get a params property from props
export default async function TickeDetails({ params }) {
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
