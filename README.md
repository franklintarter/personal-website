# Gatsby Starter ML

## Required Tools

- [Node](https://nodejs.org/en/) & [NVM](https://github.com/nvm-sh/nvm)
  - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash`
  - `nvm install 10.16.2`
  - `nvm use 10.16.2`
- [Gatsby CLI](https://www.gatsbyjs.org/tutorial/part-zero/) - `npm install -g gatsby-cli`

## New Project Setup

### Initialize The Starter

```shell
gatsby new <projectname> https://gitlab.com/mortar-labs/gatsby-starter-mortar-labs
cd <projectname>
code .
```

### Setup Gitlab Group and Gitlab project

- Create a new group in Gitlab.

- Ensure all team members have owner/admin rights to the group

  - franklintarter@gmail.com
  - christy@mortar-labs.com
  - ...Clients

- Create a new project in Gitlab

- Set origin (project source url from Gitlab)

```shell
git remote add origin <project-source-url>
git push push --set-upstream origina master
```

## Setup Firebase Hosting

## Setup Hosting & Continuous Deployment

- Follow steps outlined [here](https://gitlab.com/mortar-labs/docs/blob/master/technical/gitlab-firebase-ci.md)

## If CMS needed setup a Contentful team

- TODO

### Other Chores TODO

- Add Grep (cmd + shift + f) 'TODO' in the source to find where
- Replace default assets
  - Replace `static/img/mark.png` - this file is used to generate icons
  - Replace `static/favicon.ico`
- Replace the google[id].html by the HTML file provided by [Google Search Console](https://search.google.com/search-console/not-verified?original_url=/search-console/ownership&original_resource_id) - note: use the URL prefix option to verify with the HTML file
- Setup Google Tag Manager
- Replace favicon assets

### Post Launch Checklist

- Validate ownership of Google Search Console

## Development on this Starter Project

### Future Improvements

- Add gatsby layout, use more JS rather than MDX

- Add alias to absolute import paths to help eslint

**Note:** This starter uses [Gatsby v2](https://www.gatsbyjs.org/blog/2018-09-17-gatsby-v2/).
