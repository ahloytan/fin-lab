<a name="readme-top"></a>
# FinLab

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.19.

## Development server

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Docs
- Slides (https://canva.link/sszyr87ku8mi4ku)
- [Tech Stack](#tech-stack)
- [Contact Me](#contact-me)

## Pre-requisites
1. Ensure you have [Node.js](https://nodejs.org/en/download) installed

## Tech Stack

### Frontend
1. Open command prompt, direct to the folder where this project is
2. If this is your first time setting up, type `npm i`
3. Create `environment.ts` in `src/environments` folder. Add the following line:
```bash 
export const ALPHA_VANTAGE_API_KEY="<enterApiKeyHere>"
```
You can get a free API key here (https://www.alphavantage.co/)
4. Launch the project using `npm run start`

#### Framework
[Angular.js](https://angular.dev/tools/cli), [Typescript](https://www.typescriptlang.org/) <br>
![My Skills](https://skillicons.dev/icons?i=angular,ts&perline=3)

#### Styling
[SASS](https://sass-lang.com/), [CSS](https://www.w3schools.com/css/), [Angular Material](https://material.angular.dev/)<br>
![My Skills](https://skillicons.dev/icons?i=sass,css,materialui&perline=3)

### Deployment
[Vercel](https://vercel.com/)<br>
![My Skills](https://skillicons.dev/icons?i=vercel&perline=3)

#### Github Actions
1. When committing into Github, Github Actions will automatically deploy the changes into Vercel
2. To ensure a successfull workflow run. Do ensure that following variables are in `Settings` --> `Secrets and variables` --> `Actions`
```
ALPHA_VANTAGE_API_KEY
VERCEL_ORG_ID
VERCEL_PROJECT_ID
VERCEL_TOKEN
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact Me
1. To explore more of my works, head over to [Portfolio Website](https://ahloytan.netlify.app)
2. Feel free to contact me if there are issues or if there are opportunities that I can help you with!
