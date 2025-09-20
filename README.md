# Nairobi Navigator

Nairobi Navigator is a web application designed to assist individuals and families planning to relocate to Nairobi, Kenya. It provides comprehensive guides, personalized suburb recommendations, and premium relocation services to make the moving process smoother and more informed.

The application leverages the power of Google's AI through Genkit to offer dynamic content and personalized experiences.

![Nairobi Navigator Screenshot](https://picsum.photos/seed/nairobi-app-screenshot/1200/800)

## Key Features

- **Relocation Quiz:** An interactive, multi-step quiz that gathers user preferences on budget, lifestyle, and priorities.
- **AI-Powered Suburb Recommendations:** Based on the quiz results, the app uses a Genkit AI flow to analyze the user's needs and recommend the top 3 most suitable suburbs in Nairobi.
- **Explore Suburbs:** A searchable directory of Nairobi's key neighborhoods, each with its own detailed page.
- **Dynamic Content Generation:** Individual suburb and blog pages feature unique, in-depth content generated on-the-fly by an AI model, ensuring fresh and relevant information.
- **Blog:** An integrated blog with articles on life in Nairobi, from navigating the local matatu culture to finding the best cafes for remote work.
- **Premium Services:** A dedicated page outlining premium relocation packages, including personalized consultations and property matching.
- **Contact & Consultation:** A seamless contact form and a "Book a Consultation" modal that allows users to easily inquire about services.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

To get the application running locally, first install the dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

### Genkit Development

The AI flows are powered by Genkit. To run the Genkit development server and inspector, use:

```bash
npm run genkit:watch
```

This will start the Genkit inspector, typically on `http://localhost:4000`, allowing you to view and test your AI flows.
