#!/bin/bash

subgraphs=("customers" "intents")

url_customers="http://localhost:4001/graphql"
url_intents="http://localhost:4002/graphql"

schema_customers="subgraphs/stripe-customers/src/customer.graphql"
schema_intents="subgraphs/stripe-intents/src/intents.graphql"

