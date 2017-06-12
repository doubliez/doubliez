#!/bin/sh

mix deps.get --only prod
MIX_ENV=prod mix compile
npm install
npm run webpack:prod
MIX_ENV=prod mix phoenix.digest
MIX_ENV=prod mix ecto.migrate
