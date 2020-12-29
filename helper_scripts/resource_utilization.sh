#!/bin/bash

client=$1

nodes=$(oc get nodes —show-labels | grep $client | awk ‘{print $1}’)

for node in $nodes; do
   oc adm top node $node
done
