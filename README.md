<div id="top"></div>
<br />
<div align="center">
  <h1 align="center">Translat3</h1>
  <p align="center">
    A Web3 powered Localization Platform
    <br />
    <a href="https://github.com/rakshit087/tranlsat3"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/rakshit087/translat3/issues">Report Bug</a>
    ·
    <a href="https://github.com/rakshit087/translat3/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Translat3 is a community powered platform that can help you localize your product. Since it runs on Web3, translat3 has no global boundaries thus enabling native speakers to translate your projects accurately and at a cheaper rate. 

Translat3 has four functionalities

1. Add Project: This is used to add a project to the platform. Anyone can add project to the platform. User can write a short description and kickstart the project with a few funds.
2. Fund Project: After a project is added it can be funded by anybody in the community. 
3. Translate: Once a project has enough funds, it can be moved to Translation phase, here translators from the community can translate the project, paragraph by paragraph.
4. Vote: If a paragraph has a valid translation, it can be voted by the community.

#### How are rewards distributed?
Each paragraph is given a value. For now, this value is ```Total Funds / No of Paragraphs```. For each paragraph, the translator with valid translation is given 50% of the paragraph's value and the rest 50% is distributed among the rightful validators. 

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [Next.js](https://nextjs.org/) :fire:
* [Chakra UI](https://chakra-ui.com/) :sparkles:
* [Rainbow Kit](https://www.rainbowkit.com/) 🌈
* [WAGMI Hooks](https://wagmi.sh/) 🔗
* [Solidity](https://docs.soliditylang.org/en/v0.8.13/) 
* [Polygon](https://polygon.technology/) 💜

<p align="right">(<a href="#top">back to top</a>)</p>

## How it Works?
![Untitled](https://user-images.githubusercontent.com/50898928/186194354-84da3730-017a-403d-ba2b-a7c79de2874b.png)

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* yarn

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/rakshit087/translat3
   ```

2. Install NPM packages

   ```sh
   yarn install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

First start a local instance of HardHat Node:  

```sh
  yarn hardhat node
```

Then deploy the smart contract by:

```sh
yarn hardhat run ".\src\hardhat\scripts\deploy.ts" --network localhost
```

Run the project using the following command:

```sh
   yarn run dev
```  

If you face any error, try Resetting your Metamask Account for Hardhat.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

* IPFS for storage.
* Biconomy for gasless transactions.
* Using zkProofs for calculating the distributions.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement" or "feature"
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Use the following branching structure for making contributions - 

* Production deployment on `main`
* Dev deployment on `dev`
* Feature branches should be like `feature/feature-name`
* Bug fixes and patch branches should be like `patch/patch-name`
* Improvement to code branches should be like `update/update-name`

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the GPL-3.0 License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://gist.github.com/rxaviers/7360908)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/labs-vision/Karyakram-frontend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/labs-vision/Karyakram-frontend/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/labs-vision/Karyakram-frontend/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/labs-vision/Karyakram-frontend/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/labs-vision/Karyakram-frontend/blob/main/LICENSE
