# mailchimp-node-demo
A quick demo of using direct API requests to MailChimp in a node app. I've setup a list with a custom merge field called "SUPERPOWER". The steps below will help you create a list to run this against. Then again, you can probably learn enough to build your own by looking at index.js.

## running this thing
1. Go to MailChimp and set up a list with a custom merge field called "SUPERPOWER".
2. Take note of the MailChimp list's
   1. [data center id](http://developer.mailchimp.com/documentation/mailchimp/guides/get-started-with-mailchimp-api-3/#resources)
   2. [list id](https://kb.mailchimp.com/lists/manage-contacts/find-your-list-id)
   3. [api key](https://kb.mailchimp.com/integrations/api-integrations/about-api-keys)
3. put your MailChimp account info in index.js
4. let `npm install` to do its magic
5. run the demo with `node index.js`
6. go to `/signup.html` to subscribe a new email to the list
8. add a superpower to that subscribers record at `/update.html`