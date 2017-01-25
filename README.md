Launchchimp
=================
Modification of https://github.com/timols/launchchimp to be called as a one-off script.   
Syncs Launchrock's email list with Mailchimp.

### Usage:

```
git clone https://github.com/robgraeber/launchchimp.git && cd launchchimp
npm install
(setup env variables)
npm start
```

#####Env variables:
```
LAUNCHCHIMP_LR_EMAIL        <---- Email address to login to Launchrock (required)
LAUNCHCHIMP_LR_PASSWORD     <---- Password used to login to Launchrock (required)
LAUNCHCHIMP_LR_PROJECT      <---- Name of the project id in Launchrock (required)
LAUNCHCHIMP_MC_ADMINS       <---- Comma separated list of emails to send a success email to (optional)
LAUNCHCHIMP_MC_API_KEY      <---- Your Mailchimp API key (required)
LAUNCHCHIMP_MC_LIST         <---- Name of the Mailchimp list to add subscribers to (required)
```
