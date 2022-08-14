#!/bin/bash
docker compose --env-file .env -f ./docker/docker-compose.dev.yml down
