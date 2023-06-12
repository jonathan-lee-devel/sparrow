# shellcheck disable=SC2046
source .env.api && cd ../../ && git pull && docker compose -f services/api/docker-compose.yml down -v && docker rmi $(docker images -q) && docker compose -f services/api/docker-compose.yml up -d
