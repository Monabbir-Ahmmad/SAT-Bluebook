# SAT-Bluebook

SAT-Bluebook is an online SAT exam platform built using Next.js.

## Features

- Create and manage SAT exam questions.
- Organize questions into sets for easy retrieval.
- Create and configure SAT exams for students.
- Dynamically generate exams with random questions.
- Allow students to take SAT exams assigned to them.
- View SAT exam results by section.
- Export exam results as CSV files.

## Technologies Used

- [Next.js](https://nextjs.org/) - A popular React framework for building modern web applications.
- [Mantine UI](https://mantine.dev/) - A modern React component library.
- [MongoDB](https://www.mongodb.com/) - A NoSQL database for storing exam questions and student information.
- [Mongoose](https://mongoosejs.com/) - An ODM for MongoDB, used for schema and data validation.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for styling.
- [NextAuth.js](https://next-auth.js.org/) - Authentication and authorization library for Next.js applications.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/SAT-Bluebook.git
cd SAT-Bluebook
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the environment variables:

Create a `.env.local` file in the project root and add the following variables:

```plaintext
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=your_app_base_url

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

MONGODB_URI=your_mongodb_uri

S3_BUCKET_NAME=your_s3_bucket_name
S3_REGION=your_s3_bucket_region
S3_ACCESS_KEY=your_s3_access_key
S3_SECRET_KEY=your_s3_secret_key
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

1. **Create Questions:** Use the admin dashboard to create SAT exam questions. These questions can be added to question sets for easy organization.

2. **Create Question Sets:** Group related questions into sets for creating exams. Question sets help in managing and assigning questions.

3. **Create Exams:** Configure and create SAT exams for students. Assign question sets to each exam.

4. **Student Access:** Students can log in using NextAuth.js and access assigned exams. They can take exams that are assigned to them or take dynamic exams, view results, and export results as CSV.

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow our [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

---

Enjoy using SAT-Bluebook to provide online SAT exams for students! If you encounter any issues or have any suggestions, please feel free to raise an issue on GitHub.
