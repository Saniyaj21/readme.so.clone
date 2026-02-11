import { SectionTemplate } from "@/types";

export const sectionTemplates: SectionTemplate[] = [
  {
    slug: "blank",
    name: "New Blank",
    markdown: `
`,
  },
  {
    slug: "title-description",
    name: "Title & Description",
    markdown: `# Project Title

A brief description of what this project does and who it's for.
`,
  },
  {
    slug: "badges",
    name: "Badges",
    markdown: `## Badges

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
`,
  },
  {
    slug: "features",
    name: "Features",
    markdown: `## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform
`,
  },
  {
    slug: "tech-stack",
    name: "Tech Stack",
    markdown: `## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express
`,
  },
  {
    slug: "installation",
    name: "Installation",
    markdown: `## Installation

Install my-project with npm

\`\`\`bash
npm install my-project
cd my-project
\`\`\`
`,
  },
  {
    slug: "usage-examples",
    name: "Usage/Examples",
    markdown: `## Usage/Examples

\`\`\`javascript
import Component from 'my-project'

function App() {
  return <Component />
}
\`\`\`
`,
  },
  {
    slug: "environment-variables",
    name: "Environment Variables",
    markdown: `## Environment Variables

To run this project, you will need to add the following environment variables to your \`.env\` file:

\`API_KEY\`

\`ANOTHER_API_KEY\`
`,
  },
  {
    slug: "api-reference",
    name: "API Reference",
    markdown: `## API Reference

#### Get all items

\`\`\`
GET /api/items
\`\`\`

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| \`api_key\` | \`string\` | **Required**. Your API key |

#### Get item

\`\`\`
GET /api/items/\${id}
\`\`\`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`id\`      | \`string\` | **Required**. Id of item to fetch |
`,
  },
  {
    slug: "contributing",
    name: "Contributing",
    markdown: `## Contributing

Contributions are always welcome!

See \`contributing.md\` for ways to get started.

Please adhere to this project's \`code of conduct\`.
`,
  },
  {
    slug: "faq",
    name: "FAQ",
    markdown: `## FAQ

#### Question 1

Answer 1

#### Question 2

Answer 2
`,
  },
  {
    slug: "license",
    name: "License",
    markdown: `## License

[MIT](https://choosealicense.com/licenses/mit/)
`,
  },
  {
    slug: "authors",
    name: "Authors",
    markdown: `## Authors

- [@octokatherine](https://www.github.com/octokatherine)
`,
  },
  {
    slug: "acknowledgements",
    name: "Acknowledgements",
    markdown: `## Acknowledgements

- [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
`,
  },
];
