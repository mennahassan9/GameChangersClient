// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // Staging URL
  //apiUrl:'http://ias00nan5eba.corp.emc.com/gamechanger/staging/proxyphp/proxy.php?http://10.207.81.92:4040'
  // apiUrl: 'http://10.207.81.92:4444'
  apiUrl: 'http://localhost:4040'
};
