<div id="top"></div>

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <h3 align="center">NodeJS Prisma Example</h3>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is an example, how to bootstrap a NodeJS project with TypeScript, Prisma, PostgreSQL and Swagger UI.

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Start postgres:

```sh
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ThomasCybulski/nodejs-prisma-example.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your DB configuration in `.env`
   ```
    DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/myapp?schema=public"
    POSTGRES_PASSWORD="mysecretpassword";
   ```

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

### Test

```sh
npm run test
```

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Thomas Cybulski - [@tho_cyb](https://twitter.com/tho_cyb)

<p align="right">(<a href="#top">back to top</a>)</p>

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/thomas-cybulski/
