#!/bin/bash

yarn

#Run migrations to ensure the database is updated
yarn make:migration

#Start development environment
yarn start:watch