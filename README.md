to run:
`npm start`

Run in docker container:
to build:
`docker build -t eslint-tester .`
to run:
`docker run -d -v [files/to/lint]:/lint-target eslint-tester`

This application automatically runs eslint upon start and fails if lint errors occur. 
