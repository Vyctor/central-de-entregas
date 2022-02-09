#!/bin/bash
yarn --verbose
yarn run prisma db push
yarn run dev
