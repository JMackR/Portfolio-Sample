## AutoPay  Errors ###
An event driven email distribution cloud function to populate a firebase no-sql collection.


## AutoPay VM ###
A scheduled cron job setup with a simple sql query to pull today's due invoices then ship that publish the payload to a pub/sub

## Stripe Hook ###
A cloud function listening to Stripe's hook api for all transactions. Process the information then notify the appropriate service for next steps.

## MONO-REPO ##
- Apollo Federated Server
- Mobile Application
- Web Application
- Shared-Library 
- Modules

#### A Custom Mono-Repo designed to facilitate code sharing between web and mobile
80% of the feature code is housed in the modules folder structure... Each module being a self-contained feature with all of the core-ui and business logic. 

The mobile an web application impliments the feature based on layout configurations designed by product and business requirements.


This repo also includes a scalable graphql Apollo server using the federation specification to process payments from the mobile and web applications.

The Apollo server is setup to communicate with Stripes Rest api's to process payments and fetch payment status for the web and mobile applications.

